// Local, browser-storage-backed stand-in for the Firebase App SDK, used only
// by the ScoreSync Judge Portal DEMO (demo.scoresync.net). It gives the demo
// page the exact same window.__mock / onSnapshot / getDoc / setDoc surface
// the real judge-index.html already calls — nothing in the app's own script
// needed to change — except every write is also persisted to
// localStorage instead of a live Firestore project, so a judge's demo
// session survives a refresh but never touches anything real.
//
// Seed data comes from demo-seed.js (loaded as a plain <script> before this
// module runs, so window.DEMO_SEED is already set). First visit: seeded
// fresh. Later visits: whatever's in localStorage (including any scores the
// judge has entered) is restored. window.resetScoreSyncDemo() wipes the
// saved copy and reloads to a clean seed — wired to the "Reset Demo Data"
// control in the banner this page adds on top of judge-index.html.

const STORAGE_KEY = 'scoresyncDemo.db.v1';
const AUTH_KEY = 'scoresyncDemo.auth.v1';

function loadDb() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.warn('[ScoreSync demo] could not read saved demo data, reseeding', e);
  }
  // Deep clone so repeated resets always start from the same pristine seed
  // object, never a version some earlier session already mutated in place.
  // window.DEMO_SEED is the whole seed wrapper ({db, listeners, calls,
  // authUser, authListeners}) — window.__mock.db must be just its .db
  // collections object, not the wrapper itself.
  const seed = window.DEMO_SEED || { db: {} };
  return JSON.parse(JSON.stringify(seed.db || {}));
}

function loadAuth() {
  try {
    const raw = localStorage.getItem(AUTH_KEY);
    if (raw) return JSON.parse(raw);
  } catch (e) { /* ignore — falls through to signed-out */ }
  return null;
}

function persistDb() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(window.__mock.db));
  } catch (e) {
    console.warn('[ScoreSync demo] could not save demo data to this browser', e);
  }
}

function persistAuth() {
  try {
    if (window.__mock.authUser) localStorage.setItem(AUTH_KEY, JSON.stringify(window.__mock.authUser));
    else localStorage.removeItem(AUTH_KEY);
  } catch (e) { /* ignore */ }
}

export function initializeApp(config) {
  window.__mock = window.__mock || {};
  window.__mock.db = loadDb();
  window.__mock.listeners = [];
  window.__mock.calls = [];
  window.__mock.authListeners = [];
  window.__mock.authUser = loadAuth();

  function notifyAll() {
    persistDb();
    window.__mock.listeners.slice().forEach(l => { try { l(); } catch (e) { console.error('[ScoreSync demo] listener error', e); } });
  }
  function notifyAuth() {
    persistAuth();
    window.__mock.authListeners.slice().forEach(l => { try { l(window.__mock.authUser); } catch (e) { console.error('[ScoreSync demo] auth listener error', e); } });
  }
  window.__mockNotify = notifyAll;
  window.__mockNotifyAuth = notifyAuth;
  window.__mockSignIn = function (user) {
    window.__mock.authUser = user;
    notifyAuth();
  };
  window.__mockSignOut = function () {
    window.__mock.authUser = null;
    notifyAuth();
  };

  // Public reset hook for the demo banner's "Reset Demo Data" control —
  // wipes everything back to the original seed (scores, flags, comments,
  // timer state) but keeps the judge signed in, since re-clicking through
  // "Enter Demo" every time you just want a clean slate is friction nobody
  // wants during a live walkthrough.
  window.resetScoreSyncDemo = function () {
    try { localStorage.removeItem(STORAGE_KEY); } catch (e) { /* ignore */ }
    location.reload();
  };

  return { config };
}
