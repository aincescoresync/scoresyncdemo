// Minimal mocked Firestore SDK, shared by ScoreSync's internal test harness
// AND the public Judge Portal demo (demo.scoresync.net). Backs onto
// window.__mock.db, a plain { collectionName: { docId: data } } object —
// seeded via page.addInitScript() in tests, or via firebase-app.js reading
// window.DEMO_SEED / localStorage on the demo site. Same shape/conventions
// either way, so judge-index.html's own script never needs to know which
// context it's running in.

function db() { return window.__mock.db; }

export function getFirestore(app) { return { app }; }

export function collection(d, path) { return { __type: 'collection', path }; }

export function doc(d, path, id) { return { __type: 'doc', path, id }; }

export function serverTimestamp() {
  const ms = Date.now();
  return { __serverTimestamp: true, toMillis: () => ms };
}

export function deleteField() { return { __deleteField: true }; }

export function arrayUnion(...values) { return { __arrayUnion: true, values }; }

// Real Firestore resolves FieldValue sentinels (deleteField(), arrayUnion(),
// serverTimestamp()) wherever they appear in the data tree passed to
// set()/update() — not just at the top level. A caller can, and
// judge-index.html's scoring code does, replace a whole map field
// ({ scores: { '0-0': 3, '0-1': deleteField(), ... } }) with individual
// unset entries marked via a nested deleteField(). This walks the value
// being assigned to a field and omits any key whose value is a deleteField
// sentinel, at any depth, so a nested sentinel resolves the same way a
// top-level one does instead of being stored as a literal placeholder
// object.
function resolveSentinelsDeep(value) {
  if (value && value.__deleteField) return { __omit: true };
  if (value && (value.__arrayUnion || value.__serverTimestamp)) return value;
  if (Array.isArray(value)) return value.map(resolveSentinelsDeep);
  if (value && typeof value === 'object') {
    const out = {};
    Object.keys(value).forEach(k => {
      const resolved = resolveSentinelsDeep(value[k]);
      if (resolved && resolved.__omit) return; // nested deleteField() — key omitted entirely
      out[k] = resolved;
    });
    return out;
  }
  return value;
}

function applyFieldValues(target, data) {
  Object.keys(data).forEach(k => {
    const v = data[k];
    if (v && v.__deleteField) { delete target[k]; }
    else if (v && v.__arrayUnion) {
      const cur = Array.isArray(target[k]) ? target[k] : [];
      const merged = [...cur];
      v.values.forEach(x => { if (!merged.includes(x)) merged.push(x); });
      target[k] = merged;
    }
    else { target[k] = resolveSentinelsDeep(v); }
  });
}

export function getDoc(ref) {
  const col = db()[ref.path] || {};
  const data = col[ref.id];
  return Promise.resolve({
    exists: () => data !== undefined,
    id: ref.id,
    data: () => data,
    get: (field) => data ? data[field] : undefined
  });
}

export function getDocs(q) {
  const results = runQuery(q);
  const payload = {
    docs: results.map(([id, data]) => ({ id, data: () => data, exists: () => true })),
    empty: results.length === 0,
    size: results.length,
    forEach(cb) { results.forEach(([id, data]) => cb({ id, data: () => data, exists: () => true })); }
  };
  // Opt-in artificial delay, for tests that need to reproduce a real async
  // race (e.g. rapid navigation while a query is still in flight). Absent for
  // every existing test, so this is a no-op unless a test explicitly opts in.
  // window.__mock.artificialDelayMs = { panels: 150 } delays every getDocs
  // against that collection path by 150ms. A more specific key
  // "<path>:<where-clause-value>" (e.g. "panels:evtA") wins over the bare
  // path, so two queries against the same collection (e.g. per-eventId panel
  // lookups) can be given different delays to control resolution order.
  const delayMap = window.__mock.artificialDelayMs;
  let delay = delayMap && delayMap[q.path];
  if (delayMap) {
    (q.clauses || []).forEach(c => {
      if (c.__type === 'where') {
        const key = `${q.path}:${c.value}`;
        if (delayMap[key] !== undefined) delay = delayMap[key];
      }
    });
  }
  if (delay) return new Promise(resolve => setTimeout(() => resolve(payload), delay));
  return Promise.resolve(payload);
}

export function setDoc(ref, data, opts) {
  db()[ref.path] = db()[ref.path] || {};
  if (opts && opts.merge) {
    const existing = db()[ref.path][ref.id] || {};
    applyFieldValues(existing, data);
    db()[ref.path][ref.id] = existing;
  } else {
    const clean = {};
    applyFieldValues(clean, data);
    db()[ref.path][ref.id] = clean;
  }
  window.__mockNotify();
  return Promise.resolve();
}

export function updateDoc(ref, data) {
  db()[ref.path] = db()[ref.path] || {};
  const existing = db()[ref.path][ref.id];
  if (!existing) return Promise.reject(new Error(`No document to update at ${ref.path}/${ref.id}`));
  applyFieldValues(existing, data);
  window.__mockNotify();
  return Promise.resolve();
}

export function deleteDoc(ref) {
  if (db()[ref.path]) delete db()[ref.path][ref.id];
  window.__mockNotify();
  return Promise.resolve();
}

let autoIdCounter = 1;
export function addDoc(colRef, data) {
  db()[colRef.path] = db()[colRef.path] || {};
  const id = 'auto' + (autoIdCounter++);
  const clean = {};
  applyFieldValues(clean, data);
  db()[colRef.path][id] = clean;
  window.__mockNotify();
  return Promise.resolve({ id });
}

// ── Query building ──────────────────────────────────────────────────────
// where()/or()/orderBy()/limit() all just return plain descriptor objects;
// query() bundles them onto the collection ref. Filtering/sorting itself
// happens in runQuery() below, re-evaluated fresh on every onSnapshot fire
// (simplest correct thing for a small mocked dataset — no incremental
// diffing needed).
export function where(field, op, value) { return { __type: 'where', field, op, value }; }
export function or(...clauses) { return { __type: 'or', clauses }; }
export function orderBy(field, direction) { return { __type: 'orderBy', field, direction: direction || 'asc' }; }
export function limit(n) { return { __type: 'limit', n }; }

export function query(colRef, ...clauses) {
  return { __type: 'collection', path: colRef.path, clauses };
}

function getField(data, field) {
  return field.split('.').reduce((acc, k) => (acc == null ? undefined : acc[k]), data);
}

function matchesWhere(data, clause) {
  const v = getField(data, clause.field);
  switch (clause.op) {
    case '==': return v === clause.value;
    case '!=': return v !== clause.value;
    case '<': return v < clause.value;
    case '<=': return v <= clause.value;
    case '>': return v > clause.value;
    case '>=': return v >= clause.value;
    case 'in': return Array.isArray(clause.value) && clause.value.includes(v);
    case 'not-in': return Array.isArray(clause.value) && !clause.value.includes(v);
    case 'array-contains': return Array.isArray(v) && v.includes(clause.value);
    case 'array-contains-any': return Array.isArray(v) && Array.isArray(clause.value) && clause.value.some(x => v.includes(x));
    default: return true;
  }
}

function matchesClause(data, clause) {
  if (clause.__type === 'where') return matchesWhere(data, clause);
  if (clause.__type === 'or') return clause.clauses.some(c => matchesClause(data, c));
  return true; // orderBy/limit are handled separately, not filters
}

function runQuery(q) {
  const col = db()[q.path] || {};
  let entries = Object.entries(col);
  const clauses = q.clauses || [];
  clauses.filter(c => c.__type === 'where' || c.__type === 'or').forEach(c => {
    entries = entries.filter(([id, data]) => matchesClause(data, c));
  });
  const orderClause = clauses.find(c => c.__type === 'orderBy');
  if (orderClause) {
    entries.sort((a, b) => {
      const av = getField(a[1], orderClause.field), bv = getField(b[1], orderClause.field);
      const cmp = av < bv ? -1 : av > bv ? 1 : 0;
      return orderClause.direction === 'desc' ? -cmp : cmp;
    });
  }
  const limitClause = clauses.find(c => c.__type === 'limit');
  if (limitClause) entries = entries.slice(0, limitClause.n);
  return entries;
}

export function onSnapshot(q, onNext, onError) {
  const isCollectionQuery = q.__type === 'collection';
  function fire() {
    try {
      if (isCollectionQuery) {
        const results = runQuery(q);
        onNext({
          docs: results.map(([id, data]) => ({ id, data: () => data, exists: () => true })),
          empty: results.length === 0,
          size: results.length,
          forEach(cb) { results.forEach(([id, data]) => cb({ id, data: () => data, exists: () => true })); }
        });
      } else {
        const col = db()[q.path] || {};
        const data = col[q.id];
        onNext({ exists: () => data !== undefined, id: q.id, data: () => data });
      }
    } catch (e) {
      if (onError) onError(e); else console.error('[mock onSnapshot error]', e);
    }
  }
  window.__mock.listeners.push(fire);
  // Opt-in artificial delay before the FIRST fire only (subsequent fires,
  // driven by __mockNotify() after a write, stay synchronous) — simulates
  // real Firestore's listener-attach latency, which this mock otherwise
  // hides by firing the initial snapshot synchronously. Same key format as
  // getDocs' artificialDelayMs (see above): window.__mock.artificialSnapshotDelayMs
  // = { 'entries:evtA': 200 }.
  const snapDelayMap = window.__mock.artificialSnapshotDelayMs;
  let snapDelay = snapDelayMap && snapDelayMap[q.path];
  if (snapDelayMap) {
    (q.clauses || []).forEach(c => {
      if (c.__type === 'where') {
        const key = `${q.path}:${c.value}`;
        if (snapDelayMap[key] !== undefined) snapDelay = snapDelayMap[key];
      }
    });
  }
  if (snapDelay) { setTimeout(fire, snapDelay); } else { fire(); } // real Firestore fires an initial snapshot immediately too (when no artificial delay is set)
  return () => {
    const i = window.__mock.listeners.indexOf(fire);
    if (i >= 0) window.__mock.listeners.splice(i, 1);
  };
}

// ── writeBatch / runTransaction ──────────────────────────────────────────
// Neither needs real atomicity for a single-process mock — just apply the
// operations in order and notify once at the end.
export function writeBatch(d) {
  const ops = [];
  return {
    set(ref, data, opts) { ops.push(() => { db()[ref.path] = db()[ref.path] || {}; if (opts && opts.merge) { const e = db()[ref.path][ref.id] || {}; applyFieldValues(e, data); db()[ref.path][ref.id] = e; } else { const clean = {}; applyFieldValues(clean, data); db()[ref.path][ref.id] = clean; } }); return this; },
    update(ref, data) { ops.push(() => { const e = db()[ref.path] && db()[ref.path][ref.id]; if (e) applyFieldValues(e, data); }); return this; },
    delete(ref) { ops.push(() => { if (db()[ref.path]) delete db()[ref.path][ref.id]; }); return this; },
    commit() { ops.forEach(fn => fn()); window.__mockNotify(); return Promise.resolve(); }
  };
}

export function runTransaction(d, updateFn) {
  const tx = {
    get(ref) {
      const col = db()[ref.path] || {};
      const data = col[ref.id];
      return Promise.resolve({ exists: () => data !== undefined, id: ref.id, data: () => data });
    },
    set(ref, data, opts) {
      db()[ref.path] = db()[ref.path] || {};
      if (opts && opts.merge) { const e = db()[ref.path][ref.id] || {}; applyFieldValues(e, data); db()[ref.path][ref.id] = e; }
      else { const clean = {}; applyFieldValues(clean, data); db()[ref.path][ref.id] = clean; }
    },
    update(ref, data) {
      const e = db()[ref.path] && db()[ref.path][ref.id];
      if (!e) throw new Error(`No document to update at ${ref.path}/${ref.id}`);
      applyFieldValues(e, data);
    },
    delete(ref) { if (db()[ref.path]) delete db()[ref.path][ref.id]; }
  };
  return Promise.resolve(updateFn(tx)).then(result => { window.__mockNotify(); return result; });
}
