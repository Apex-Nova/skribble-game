# Who Codes What — File-by-File Breakdown

Each team member owns specific files. Nobody edits another person's files — pieces connect through `docs/API_CONTRACTS.md`.

The whole project is JavaScript. Backend: Node.js + Express + Socket.IO (`require` / `module.exports`). Frontend: React + Canvas API (`import` / `export`).

Every project file already contains a detailed comment explaining what goes in it. **Read your files' comments first.**

---

## Person 1 — Backend / WebSocket lead
- `backend/server.js` (MAIN backend file)
- `backend/package.json` — generate with `npm init -y`, then `npm install express socket.io`

Set up Express + Socket.IO, wire in everyone's backend files, handle connect/disconnect. **Push the skeleton on Day 1.**

## Person 2 — Room management
- `backend/roomManager.js`

Create/join rooms, room codes, player lists, whose turn. Exports `createRoom`, `joinRoom`, `leaveRoom`, `getPlayers`, `nextDrawer`, …

## Person 3 — Canvas / drawing
- `frontend/src/components/Canvas.js`
- `frontend/src/components/Toolbar.js`

Draw with the mouse, send strokes, render others' strokes. Toolbar: colors, size, eraser, clear.

## Person 4 — Chat & guessing
- `frontend/src/components/ChatBox.js`
- `backend/socketHandlers/chatEvents.js`

Chat UI; on the backend, check guesses and award points using Person 5's `calculatePoints`.

## Person 5 — Scoring & game flow
- `backend/scoring.js`
- `backend/socketHandlers/gameEvents.js`
- `backend/data/words.js`

Points formula, rounds, word picking, countdown timer, rotating the drawer, game over.

## Person 6 — Lobby UI & infrastructure
- `frontend/src/App.js` (MAIN frontend file)
- `frontend/src/index.js` *(added — React's entry file, made by the generator)*
- `frontend/src/socket.js`
- `frontend/src/components/Lobby.js`
- `frontend/src/components/Leaderboard.js`
- `frontend/src/styles/main.css`
- `frontend/public/index.html`
- `frontend/package.json` — made by the project generator, then `npm install socket.io-client`
- `.github/workflows/ci.yml`
- `.gitignore`

---

## ⚠ Unassigned — decide on Day 1
- `backend/socketHandlers/drawingEvents.js` — not listed under anyone in the original plan. Suggested owner: Person 3 (defines the draw data) or Person 1.

---

## How the pieces connect
- `server.js` (P1) imports P2, P4, P5's backend files and `drawingEvents.js`.
- `App.js` (P6) imports P3, P4, P6's components.
- Any function others use must: have a clear name, a one-line comment (takes → returns), and be exported.

## Can we work at the same time?
- **Day 1:** Person 1 pushes the running skeleton; Person 6 pushes the React app skeleton + `.gitignore`. Everyone else reads docs and builds practice versions.
- **After Day 1:** yes — separate files, no conflicts. If a piece you need isn't merged yet, use fake data and a `TODO` comment.
