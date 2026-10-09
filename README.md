<<<<<<< HEAD
# 🎨 Skribbl-Style Multiplayer Drawing Game

A real-time multiplayer drawing and guessing game. One player draws a secret word on a shared canvas while everyone else races to guess it in chat. Fastest correct guess earns the most points. Built by a team of 6 as a first collaborative project.

---

## 🎮 How the Game Works

1. A player creates a room and shares the room code with friends.
2. Everyone joins the room using that code.
3. Each round, one player is picked to **draw** a secret word.
4. The drawer sketches on a shared canvas — everyone sees it live.
5. Other players type guesses in chat. Correct guesses score points (faster = more points).
6. After the timer ends, the next player becomes the drawer. Repeat.
7. A leaderboard tracks scores across all rounds.

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Backend runtime | Node.js |
| Web server | Express |
| Real-time communication | Socket.IO |
| Frontend | React |
| Drawing surface | HTML5 Canvas API |
| Version control | Git + GitHub |

*No database in the first version — game state is kept in memory.*

---

## 📁 Project File Tree

```
skribbl-game/
├── backend/
│   ├── server.js                  # MAIN backend file — wires everything together
│   ├── roomManager.js             # Create/join rooms, track players, whose turn
│   ├── scoring.js                 # Points calculation logic
│   ├── socketHandlers/
│   │   ├── drawingEvents.js       # Receives + broadcasts draw strokes
│   │   ├── chatEvents.js          # Handles guesses + chat messages
│   │   └── gameEvents.js          # Round flow, timer, rotating the drawer
│   ├── data/
│   │   └── words.js               # List of words to draw
│   └── package.json               # (created on Day 1 with `npm init -y`)
├── frontend/
│   ├── public/
│   │   └── index.html             # Base HTML page
│   ├── src/
│   │   ├── index.js               # React entry point (renders App)
│   │   ├── App.js                 # MAIN frontend file — connects all components
│   │   ├── socket.js              # Shared Socket.IO connection
│   │   ├── components/
│   │   │   ├── Lobby.js           # Home screen: create/join room
│   │   │   ├── Canvas.js          # The drawing surface
│   │   │   ├── ChatBox.js         # Guessing + chat area
│   │   │   ├── Leaderboard.js     # Scores display
│   │   │   └── Toolbar.js         # Colors, brush size, eraser
│   │   └── styles/
│   │       └── main.css           # Shared styling
│   └── package.json               # (created on Day 1 by the project generator)
├── docs/
│   ├── API_CONTRACTS.md           # Agreed message shapes
│   └── TEAM_ROLES.md              # Who owns what
├── .github/workflows/ci.yml       # Auto-checks on every Pull Request
├── .gitignore
└── README.md
```

> Every file currently contains **only comments** describing what its owner should build. Read your files first.

---

## 🤝 API Contracts

See [docs/API_CONTRACTS.md](docs/API_CONTRACTS.md). Agree on these **before** coding.

---

## 🚀 Getting Started

### 1. Install the tools
- [Node.js](https://nodejs.org) (LTS) — check with `node --version`
- [Git](https://git-scm.com) — check with `git --version`
- [VS Code](https://code.visualstudio.com)

### 2. Clone
```bash
git clone https://github.com/OWNER/skribbl-game.git
cd skribbl-game
```

### 3. Run the backend
```bash
cd backend
npm install
node server.js
```

### 4. Run the frontend (second terminal)
```bash
cd frontend
npm install
npm start
```
(If the team chooses Vite, the command is `npm run dev`.)

### 5. Test multiplayer
Open the frontend in two browser windows (one normal, one private/incognito) and join the same room.

---

## 🔄 Daily Git Workflow

```bash
git checkout main
git pull
git checkout -b feature/my-task
# ... code ...
git add .
git commit -m "feat: describe what you did"
git push origin feature/my-task
# → open a Pull Request → review → merge
```

**Golden rule:** never push directly to `main`.

---

## 👥 Team

| Role | Responsibility |
|---|---|
| Person 1 | Backend / WebSocket lead |
| Person 2 | Room management |
| Person 3 | Canvas / drawing |
| Person 4 | Chat & guessing |
| Person 5 | Scoring & game flow |
| Person 6 | Lobby UI & infrastructure |

Full breakdown: [docs/TEAM_ROLES.md](docs/TEAM_ROLES.md).

---

## 📝 Commit Message Style

| Prefix | Use for |
|---|---|
| `feat:` | A new feature |
| `fix:` | A bug fix |
| `docs:` | Documentation changes |
| `refactor:` | Code cleanup, no behavior change |
| `style:` | Formatting only |
# skribble-game
=======
# skribble-game
A team project for college
>>>>>>> 3d8e479589de38d4e47e9863e2695a469da8f484
