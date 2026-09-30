# ScoreSync Judge Portal — Practice Demo

A self-contained, static practice version of the ScoreSync Judge Portal, for
judges to try out before conference day. No backend, no real accounts, no
real scores — everything lives in the browser's own storage on the judge's
device.

**Live site:** `https://demo.scoresync.net` (once deployed — see below)
**Real portal:** `https://judge.scoresync.net`

## What's in here

This is the real Judge Portal (`judge-index.html` from the production repo),
byte-for-byte identical except for three import lines at the top of its
`<script type="module">` block. Everything a judge sees and does — scoring,
the rubric, Live Ranking, comments, the timer — is the same app they'll use
for real.

```
index.html          The Judge Portal itself (full-fidelity copy)
demo-seed.js         Sample data: two events, sample participants, partial scores
demo-tour.js         Welcome screen, guided tour, and the floating "Demo" menu
vendor/
  firebase-app.js       Reads/writes demo data to localStorage instead of Firestore
  firebase-auth.js      Stands in for Firebase Auth (instant sign-in, no email link)
  firebase-firestore.js Stands in for Firestore's query/read/write API
CNAME                GitHub Pages custom domain (demo.scoresync.net)
robots.txt           Keeps the demo out of search engines
```

No build step. No dependencies to install. It's a static site — open
`index.html` in a browser (or serve the folder with any static file server)
and it runs.

### How the data works

`vendor/firebase-app.js` gives `index.html` the exact same
`getFirestore`/`onSnapshot`/`setDoc`/etc. API the real app calls — the app's
own code has no idea it isn't talking to real Firestore. Instead, every read
comes from (and every write goes to) a plain object kept in
`localStorage`, seeded on first visit from `demo-seed.js`.

That means: scores a visiting judge enters stick around across a page
reload, but never leave their browser and never touch the real ScoreSync
database. The floating "Demo" menu (bottom-left) has a **Reset Demo Data**
option that wipes local storage and reloads back to the original sample
data.

### The sample events

Two events are seeded, matching the two rubric types judges will see for
real:

- **Chapter Yearbook** — a *Contest*. Ties are allowed; Live Ranking never
  flags one.
- **Children's Literature K-3 English (JV & V)** — a *Competition*, split
  into Junior Varsity and Varsity divisions. Two Varsity entries are
  seeded to an exact, deliberate tie so the tour can show a judge exactly
  what a TIE badge looks like without needing them to score anything
  themselves first.

The signed-in demo judge (`Demo Judge`) starts with nothing scored on
either event — the two other judges on each panel are pre-scored so Live
Ranking and the tie are visible right away, but there's still real,
meaningful scoring work for a visitor to try.

All schools, students, and chapters in the seed data are fictional.

### The guided tour

`demo-tour.js` shows a welcome screen on first visit, offering to start a
7-step guided tour (or "Just Look Around" instead). The tour walks through
picking an event, reading the rubric, entering a score, watching the
running total update, reading Live Ranking, and understanding why a
Competition can show ties when a Contest never does. It ends with an offer
to jump straight into the Contest event for comparison.

The tour can be replayed any time from the floating **Demo** menu
(bottom-left corner), which also has a link straight to the real Judge
Portal.

## Deploying to GitHub Pages with a custom domain

1. Push this folder to a GitHub repo (as the repo root, or under `/docs` —
   just point GitHub Pages at whichever you use).
2. In the repo's **Settings → Pages**, set the source to that
   branch/folder.
3. The `CNAME` file in this folder already contains `demo.scoresync.net` —
   GitHub Pages will pick it up automatically once Pages is enabled.
4. At your DNS provider, add a `CNAME` record for `demo` pointing at
   `<your-github-username>.github.io` (GitHub's own custom-domain docs have
   the exact record if this is a new setup).
5. Once DNS resolves, turn on **Enforce HTTPS** in the same Pages settings
   page.

No further build or deploy step is needed — it's a static site.
