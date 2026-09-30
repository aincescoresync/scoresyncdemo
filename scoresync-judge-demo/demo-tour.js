// Demo-only chrome layered on top of the real Judge Portal for
// demo.scoresync.net: a first-visit welcome screen, a guided step-by-step
// tour of the scoring workflow (with the Contest-vs-Competition tie
// behavior called out explicitly), and a small floating "Demo" menu to
// replay the tour, reset the sample data, or jump to the other event type.
// type="module" only so this runs deferred, after the app's own module
// script above it has finished its synchronous setup (window.__mockSignIn
// etc. need to exist first) — nothing here is an ES module import/export.
(function () {
  'use strict';

  const REAL_PORTAL_URL = 'https://judge.scoresync.net';
  const TOUR_SEEN_KEY = 'scoresyncDemo.tourSeen.v1';
  const COMPETITION_EVENT_ID = 'evtLit';   // Children's Literature — Competition, has the seeded tie
  const CONTEST_EVENT_ID = 'evtYearbook';  // Chapter Yearbook — Contest, never flags ties

  function byId(id) { return document.getElementById(id); }
  function qs(sel) { return document.querySelector(sel); }

  // ── Styles ────────────────────────────────────────────────────────────
  const style = document.createElement('style');
  style.textContent = `
    .ss-demo-overlay {
      position: fixed; inset: 0; z-index: 100000;
      background: rgba(14, 22, 18, 0.72);
      display: flex; align-items: center; justify-content: center;
      padding: 20px; font-family: 'DM Sans', -apple-system, sans-serif;
    }
    .ss-demo-card {
      background: #fff; color: #17241c; border-radius: 16px;
      max-width: 460px; width: 100%; padding: 28px 26px 24px;
      box-shadow: 0 24px 60px rgba(0,0,0,0.35);
    }
    html.dark .ss-demo-card { background: #16231a; color: #eaf3ec; }
    .ss-demo-eyebrow {
      font-size: 11px; font-weight: 800; letter-spacing: 0.08em; text-transform: uppercase;
      color: #02a246; margin-bottom: 8px;
    }
    .ss-demo-title { font-size: 21px; font-weight: 800; margin-bottom: 10px; line-height: 1.3; }
    .ss-demo-body { font-size: 14px; line-height: 1.55; color: #445048; margin-bottom: 8px; }
    html.dark .ss-demo-body { color: #aebdb3; }
    .ss-demo-body strong { color: inherit; }
    .ss-demo-list { margin: 10px 0 16px; padding-left: 20px; font-size: 13.5px; line-height: 1.7; color: #445048; }
    html.dark .ss-demo-list { color: #aebdb3; }
    .ss-demo-actions { display: flex; gap: 10px; margin-top: 18px; flex-wrap: wrap; }
    .ss-demo-btn {
      font-family: inherit; font-size: 14px; font-weight: 700; border-radius: 10px;
      padding: 11px 18px; cursor: pointer; border: 1px solid transparent; transition: transform .08s;
    }
    .ss-demo-btn:active { transform: scale(0.97); }
    .ss-demo-btn-primary { background: #02a246; color: #fff; }
    .ss-demo-btn-primary:hover { background: #028f3d; }
    .ss-demo-btn-ghost { background: transparent; color: #445048; border-color: #d8e0da; }
    html.dark .ss-demo-btn-ghost { color: #aebdb3; border-color: #2c3a32; }
    .ss-demo-fineprint { font-size: 11.5px; color: #7c887f; margin-top: 16px; line-height: 1.5; }
    .ss-demo-fineprint a { color: #02a246; font-weight: 700; text-decoration: none; }
    .ss-demo-fineprint a:hover { text-decoration: underline; }

    /* Floating demo menu — deliberately NOT part of the fixed header/
       progress-bar layout system (which reserves space via --progress-h /
       116px calc() offsets throughout this file's CSS); floating free in a
       corner avoids touching any of that. */
    .ss-demo-fab-wrap { position: fixed; left: 16px; bottom: 16px; z-index: 90000; font-family: 'DM Sans', -apple-system, sans-serif; }
    .ss-demo-fab {
      display: flex; align-items: center; gap: 7px; background: #17241c; color: #fff;
      border: none; border-radius: 999px; padding: 10px 16px 10px 12px; cursor: pointer;
      font-size: 12.5px; font-weight: 700; letter-spacing: 0.02em; box-shadow: 0 6px 18px rgba(0,0,0,0.28);
    }
    .ss-demo-fab-dot { width: 7px; height: 7px; border-radius: 50%; background: #02a246; flex-shrink: 0; }
    .ss-demo-menu {
      position: absolute; left: 0; bottom: calc(100% + 10px); width: 250px;
      background: #fff; border-radius: 12px; box-shadow: 0 14px 40px rgba(0,0,0,0.3);
      padding: 8px; display: none;
    }
    html.dark .ss-demo-menu { background: #1c2a21; }
    .ss-demo-menu.open { display: block; }
    .ss-demo-menu-label {
      font-size: 10px; font-weight: 800; letter-spacing: 0.07em; text-transform: uppercase;
      color: #8b968e; padding: 8px 10px 4px;
    }
    .ss-demo-menu-item {
      display: flex; align-items: center; gap: 9px; width: 100%; text-align: left;
      background: none; border: none; font-family: inherit; font-size: 13px; font-weight: 600;
      color: #17241c; padding: 9px 10px; border-radius: 8px; cursor: pointer;
    }
    html.dark .ss-demo-menu-item { color: #eaf3ec; }
    .ss-demo-menu-item:hover { background: #f0f4f1; }
    html.dark .ss-demo-menu-item:hover { background: #26362c; }
    .ss-demo-menu-sep { height: 1px; background: #e6ebe8; margin: 6px 4px; }
    html.dark .ss-demo-menu-sep { background: #2c3a32; }
    .ss-demo-menu-item.ss-demo-danger { color: #c84b2f; }

    /* Guided tour */
    .ss-tour-backdrop { position: fixed; inset: 0; z-index: 95000; pointer-events: none; }
    .ss-tour-dim {
      position: fixed; inset: 0; z-index: 95000;
      background: rgba(10, 16, 13, 0.55);
      clip-path: none;
      transition: clip-path .18s ease;
    }
    .ss-tour-ring {
      position: fixed; z-index: 95001; border-radius: 12px;
      box-shadow: 0 0 0 4px #02a246, 0 0 0 9999px rgba(10, 16, 13, 0.55);
      pointer-events: none; transition: all .18s ease;
    }
    .ss-tour-card {
      position: fixed; z-index: 95002; background: #fff; color: #17241c;
      border-radius: 14px; padding: 18px 18px 14px; width: 300px; max-width: calc(100vw - 32px);
      box-shadow: 0 20px 50px rgba(0,0,0,0.35); font-family: 'DM Sans', -apple-system, sans-serif;
      transition: top .18s ease, left .18s ease;
    }
    html.dark .ss-tour-card { background: #16231a; color: #eaf3ec; }
    .ss-tour-step-label { font-size: 10.5px; font-weight: 800; letter-spacing: 0.06em; text-transform: uppercase; color: #02a246; margin-bottom: 6px; }
    .ss-tour-title { font-size: 15px; font-weight: 800; margin-bottom: 6px; line-height: 1.35; }
    .ss-tour-body { font-size: 13px; line-height: 1.55; color: #445048; }
    html.dark .ss-tour-body { color: #aebdb3; }
    .ss-tour-footer { display: flex; align-items: center; justify-content: space-between; margin-top: 14px; }
    .ss-tour-dots { display: flex; gap: 5px; }
    .ss-tour-dot { width: 6px; height: 6px; border-radius: 50%; background: #d8e0da; }
    html.dark .ss-tour-dot { background: #364539; }
    .ss-tour-dot.active { background: #02a246; }
    .ss-tour-btns { display: flex; gap: 8px; }
    .ss-tour-btn { font-family: inherit; font-size: 12.5px; font-weight: 700; border-radius: 8px; padding: 7px 13px; cursor: pointer; border: 1px solid transparent; }
    .ss-tour-btn-next { background: #02a246; color: #fff; }
    .ss-tour-btn-skip { background: transparent; color: #8b968e; }
    .ss-tour-btn-back { background: transparent; color: #445048; border-color: #d8e0da; }
    html.dark .ss-tour-btn-back { color: #aebdb3; border-color: #2c3a32; }
  `;
  document.head.appendChild(style);

  // ── Welcome overlay ──────────────────────────────────────────────────
  function showWelcome(onEnter) {
    const overlay = document.createElement('div');
    overlay.className = 'ss-demo-overlay';
    overlay.innerHTML = `
      <div class="ss-demo-card">
        <div class="ss-demo-eyebrow">ScoreSync — Interactive Demo</div>
        <div class="ss-demo-title">Try the Judge Portal before conference day</div>
        <div class="ss-demo-body">You're signed in as a <strong>demo judge</strong> with two sample events already loaded and partly scored by two other demo judges:</div>
        <ul class="ss-demo-list">
          <li><strong>Chapter Yearbook</strong> — a <strong>Contest</strong>, 5 sample chapters.</li>
          <li><strong>Children's Literature K-3 English</strong> — a <strong>Competition</strong> split into Varsity &amp; Junior Varsity, so you can see how ties get flagged.</li>
        </ul>
        <div class="ss-demo-body">Nothing you do here saves anywhere but <strong>this browser</strong> — reset it any time from the Demo menu in the corner.</div>
        <div class="ss-demo-actions">
          <button class="ss-demo-btn ss-demo-btn-primary" id="ssDemoEnterBtn">Enter Demo &amp; Start Tour</button>
          <button class="ss-demo-btn ss-demo-btn-ghost" id="ssDemoEnterNoTourBtn">Just Look Around</button>
        </div>
        <div class="ss-demo-fineprint">Judging at a real conference? Head to <a href="${REAL_PORTAL_URL}" target="_blank" rel="noopener">${REAL_PORTAL_URL.replace('https://','')}</a> instead.</div>
      </div>`;
    document.body.appendChild(overlay);
    byId('ssDemoEnterBtn').addEventListener('click', () => { overlay.remove(); onEnter(true); });
    byId('ssDemoEnterNoTourBtn').addEventListener('click', () => { overlay.remove(); onEnter(false); });
  }

  // ── Floating demo menu ───────────────────────────────────────────────
  function buildFab(startTour) {
    const wrap = document.createElement('div');
    wrap.className = 'ss-demo-fab-wrap';
    wrap.innerHTML = `
      <div class="ss-demo-menu" id="ssDemoMenu">
        <div class="ss-demo-menu-label">This is a demo</div>
        <button class="ss-demo-menu-item" id="ssDemoReplayTour">▶ Replay Tour</button>
        <button class="ss-demo-menu-item" id="ssDemoSwitchEvent">⇄ Try the Other Event Type</button>
        <div class="ss-demo-menu-sep"></div>
        <button class="ss-demo-menu-item" id="ssDemoRealPortal">↗ Go to the Real Judges Portal</button>
        <div class="ss-demo-menu-sep"></div>
        <button class="ss-demo-menu-item ss-demo-danger" id="ssDemoReset">↺ Reset Demo Data</button>
      </div>
      <button class="ss-demo-fab" id="ssDemoFabBtn"><span class="ss-demo-fab-dot"></span> Demo</button>
    `;
    document.body.appendChild(wrap);
    const menu = byId('ssDemoMenu');
    byId('ssDemoFabBtn').addEventListener('click', () => menu.classList.toggle('open'));
    document.addEventListener('click', (e) => {
      if (!wrap.contains(e.target)) menu.classList.remove('open');
    });
    byId('ssDemoReplayTour').addEventListener('click', () => { menu.classList.remove('open'); startTour(); });
    byId('ssDemoRealPortal').addEventListener('click', () => window.open(REAL_PORTAL_URL, '_blank'));
    byId('ssDemoReset').addEventListener('click', () => {
      if (confirm('Reset all demo scores and start fresh? This only affects this browser.')) {
        window.resetScoreSyncDemo();
      }
    });
    byId('ssDemoSwitchEvent').addEventListener('click', () => {
      menu.classList.remove('open');
      goHomeThenOpenEvent(currentlyOnCompetition() ? CONTEST_EVENT_ID : COMPETITION_EVENT_ID);
    });
  }

  function currentlyOnCompetition() {
    // Division tabs only ever render for a Competition with splitByDivision
    // on (see currentEventSplitByDivision() in the app script above) — a
    // simple, already-there DOM signal, no need to reach into app internals.
    const tabs = byId('rankDivisionTabs');
    return !!(tabs && !tabs.hidden && tabs.children.length > 0);
  }

  function waitFor(check, timeoutMs) {
    return new Promise((resolve) => {
      const start = Date.now();
      (function poll() {
        const el = check();
        if (el) return resolve(el);
        if (Date.now() - start > (timeoutMs || 8000)) return resolve(null);
        requestAnimationFrame(poll);
      })();
    });
  }

  async function goHomeThenOpenEvent(eventId) {
    // If we're inside an event, the header chevron / "HOME" control returns
    // to Home — reuse whichever is currently on screen and visible.
    const returnBtn = byId('returnHomeBtn');
    if (returnBtn && getComputedStyle(returnBtn).display !== 'none') {
      returnBtn.click();
    }
    const card = await waitFor(() => {
      const el = document.querySelector(`.home-event-card[data-home-event-id="${eventId}"]`);
      return (el && !el.disabled) ? el : null;
    });
    if (card) card.click();
  }

  // ── Guided tour ──────────────────────────────────────────────────────
  function buildTourChrome() {
    const dim = document.createElement('div');
    dim.className = 'ss-tour-dim';
    dim.style.display = 'none';
    const ring = document.createElement('div');
    ring.className = 'ss-tour-ring';
    ring.style.display = 'none';
    const card = document.createElement('div');
    card.className = 'ss-tour-card';
    card.style.display = 'none';
    document.body.appendChild(dim);
    document.body.appendChild(ring);
    document.body.appendChild(card);
    return { dim, ring, card };
  }

  function positionOn(el, ring, card) {
    const r = el.getBoundingClientRect();
    const pad = 8;
    ring.style.left = (r.left - pad) + 'px';
    ring.style.top = (r.top - pad) + 'px';
    ring.style.width = (r.width + pad * 2) + 'px';
    ring.style.height = (r.height + pad * 2) + 'px';

    const cardW = 300, margin = 14;
    let top = r.bottom + margin;
    let left = Math.min(Math.max(r.left, margin), window.innerWidth - cardW - margin);
    if (top + 160 > window.innerHeight) top = Math.max(r.top - 160 - margin, margin);
    card.style.top = top + 'px';
    card.style.left = left + 'px';
  }

  function runTour() {
    const chrome = buildTourChrome();
    let stepIndex = 0;
    let cancelled = false;

    const steps = [
      {
        label: 'Step 1 of 7', title: 'Pick an event', body: "You'll land on Home first. Let's open the Children's Literature event — it's a <strong>Competition</strong>, which behaves a little differently from a Contest.",
        find: () => document.querySelector(`.home-event-card[data-home-event-id="${COMPETITION_EVENT_ID}"]`),
        onEnter: async () => { await goHomeThenOpenEvent(COMPETITION_EVENT_ID); }
      },
      {
        label: 'Step 2 of 7', title: 'The rubric', body: 'Each criterion shows the judge-facing description and its performance levels. Tap a level to score it — same motion for every criterion on every event.',
        find: () => document.querySelector('.criterion .levels'),
      },
      {
        label: 'Step 3 of 7', title: 'Prefer typing?', body: "Use +/- or type a number directly — it snaps to the nearest score the rubric actually allows, so you can't land on an invalid value.",
        find: () => document.querySelector('.score-stepper'),
      },
      {
        label: 'Step 4 of 7', title: 'Your running score', body: 'Updates live as you score, out of this rubric\'s own total (not always 100).',
        find: () => byId('hMyScore'),
      },
      {
        label: 'Step 5 of 7', title: 'Live Ranking', body: 'See every entry in this division ranked in real time as scores come in from all judges — not just you.',
        find: () => byId('rankingCard'),
      },
      {
        label: 'Step 6 of 7', title: "This is why it's a Competition", body: "See the <strong>TIE</strong> badge? Two entries here are dead even. <strong>Competitions</strong> flag that — a <strong>Contest</strong> (like Chapter Yearbook) never does, since ties are perfectly fine there.",
        find: () => document.querySelector('.tie-row .rank-pip-tie') || document.querySelector('#rankingCard'),
        fallbackBody: "No tie showing right now in this view — but that's the idea: <strong>Competitions</strong> can flag a TIE badge here when two entries are dead even; a <strong>Contest</strong> never does. Try switching divisions with the tabs above the table, or check the other event from the Demo menu.",
      },
      {
        label: 'Step 7 of 7', title: 'Move between entries', body: "Use these arrows, or tap the entry's name up top to jump straight to another one from the list.",
        find: () => byId('entryPrev'),
      },
    ];

    function finish() {
      chrome.dim.style.display = 'none';
      chrome.ring.style.display = 'none';
      chrome.card.remove();
      chrome.dim.remove();
      chrome.ring.remove();
      try { localStorage.setItem(TOUR_SEEN_KEY, '1'); } catch (e) { /* ignore */ }
      // Closing nudge toward the Contest side, so both event types actually
      // get seen per Austin's ask, not just whichever the tour opened.
      const nudge = document.createElement('div');
      nudge.className = 'ss-demo-overlay';
      nudge.innerHTML = `
        <div class="ss-demo-card">
          <div class="ss-demo-eyebrow">Tour complete</div>
          <div class="ss-demo-title">Now compare it to a Contest</div>
          <div class="ss-demo-body">Open <strong>Chapter Yearbook</strong> and check its Live Ranking panel — same scoring flow, but you'll never see a TIE badge there, since Contests are allowed to tie.</div>
          <div class="ss-demo-actions">
            <button class="ss-demo-btn ss-demo-btn-primary" id="ssDemoGoContest">Open Chapter Yearbook</button>
            <button class="ss-demo-btn ss-demo-btn-ghost" id="ssDemoStayPut">I'll explore on my own</button>
          </div>
        </div>`;
      document.body.appendChild(nudge);
      byId('ssDemoGoContest').addEventListener('click', () => { nudge.remove(); goHomeThenOpenEvent(CONTEST_EVENT_ID); });
      byId('ssDemoStayPut').addEventListener('click', () => nudge.remove());
    }

    async function showStep(i) {
      if (cancelled) return;
      if (i >= steps.length) { finish(); return; }
      stepIndex = i;
      const step = steps[i];
      if (step.onEnter) await step.onEnter();
      const el = await waitFor(step.find, 6000);
      if (cancelled) return;
      chrome.dim.style.display = 'block';
      if (el) {
        chrome.ring.style.display = 'block';
        el.scrollIntoView({ block: 'center', behavior: 'smooth' });
        await new Promise(r => setTimeout(r, 220));
        positionOn(el, chrome.ring, chrome.card);
      } else {
        chrome.ring.style.display = 'none';
        chrome.card.style.top = '50%';
        chrome.card.style.left = '50%';
        chrome.card.style.transform = 'translate(-50%,-50%)';
      }
      chrome.card.style.display = 'block';
      chrome.card.innerHTML = `
        <div class="ss-tour-step-label">${step.label}</div>
        <div class="ss-tour-title">${step.title}</div>
        <div class="ss-tour-body">${(!el && step.fallbackBody) ? step.fallbackBody : step.body}</div>
        <div class="ss-tour-footer">
          <div class="ss-tour-dots">${steps.map((_, di) => `<span class="ss-tour-dot${di === i ? ' active' : ''}"></span>`).join('')}</div>
          <div class="ss-tour-btns">
            <button class="ss-tour-btn ss-tour-btn-skip" id="ssTourSkip">Skip</button>
            ${i > 0 ? '<button class="ss-tour-btn ss-tour-btn-back" id="ssTourBack">Back</button>' : ''}
            <button class="ss-tour-btn ss-tour-btn-next" id="ssTourNext">${i === steps.length - 1 ? 'Finish' : 'Next'}</button>
          </div>
        </div>`;
      byId('ssTourSkip').addEventListener('click', () => { cancelled = true; finish(); });
      byId('ssTourNext').addEventListener('click', () => showStep(i + 1));
      const backBtn = byId('ssTourBack');
      if (backBtn) backBtn.addEventListener('click', () => showStep(i - 1));
    }

    showStep(0);
  }

  // ── Boot ─────────────────────────────────────────────────────────────
  function boot() {
    buildFab(runTour);
    const alreadySignedIn = !!(window.__mock && window.__mock.authUser);
    const tourAlreadySeen = (() => { try { return localStorage.getItem(TOUR_SEEN_KEY) === '1'; } catch (e) { return false; } })();

    function enterApp() {
      if (!window.__mock || !window.__mock.authUser) {
        window.__mockSignIn({ uid: 'demoJudge', email: 'demo@judge.scoresync.net', displayName: 'Demo Judge' });
      }
    }

    if (alreadySignedIn) {
      // Returning visitor (page refresh) — no welcome screen, straight in.
      if (!tourAlreadySeen) {
        waitFor(() => document.querySelector('.home-event-card'), 8000).then((el) => { if (el) runTour(); });
      }
    } else {
      showWelcome((wantsTour) => {
        enterApp();
        if (wantsTour) {
          waitFor(() => document.querySelector('.home-event-card'), 8000).then((el) => { if (el) runTour(); });
        } else {
          try { localStorage.setItem(TOUR_SEEN_KEY, '1'); } catch (e) { /* ignore */ }
        }
      });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
