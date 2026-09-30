// Minimal mocked Firebase Auth SDK, shared by ScoreSync's internal test
// harness AND the public Judge Portal demo (demo.scoresync.net) — both just
// need window.__mockSignIn() to work, never a real magic-email-link round
// trip, so the send/verify functions here just need to exist and not throw,
// not be fully faithful.
export function getAuth(app) {
  return { app, get currentUser() { return window.__mock.authUser; } };
}

export function onAuthStateChanged(auth, cb) {
  window.__mock.authListeners.push(cb);
  // Fire immediately with current state, matching real Firebase Auth's
  // "replay last known state to a new subscriber" behavior.
  cb(window.__mock.authUser);
  return () => {
    const i = window.__mock.authListeners.indexOf(cb);
    if (i >= 0) window.__mock.authListeners.splice(i, 1);
  };
}

export function signOut(auth) {
  window.__mock.authUser = null;
  window.__mockNotifyAuth();
  return Promise.resolve();
}

export function sendSignInLinkToEmail(auth, email, settings) {
  window.__mock.calls.push({ type: 'sendSignInLinkToEmail', email });
  return Promise.resolve();
}

export function isSignInWithEmailLink(auth, url) {
  return false; // tests drive sign-in via __mockSignIn, never a real redirect
}

export function signInWithEmailLink(auth, email, url) {
  return Promise.reject(new Error('signInWithEmailLink is not exercised in tests — use window.__mockSignIn instead'));
}
