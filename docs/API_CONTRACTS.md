# API Contracts

The agreed shapes of every message between frontend and backend. **If it's not in this file, it doesn't exist.** Change this file only through a Pull Request that the whole team sees.

How to read this with Socket.IO: the `type` is the event name. So `{ type: "guess", ... }` means the sender writes `socket.emit("guess", { ... })` and the receiver listens with `socket.on("guess", ...)`. Keeping `type` inside the object too is fine (helps when logging).

---

## 1. Original agreed contracts (from README)

```js
{ type: "draw", x: 120, y: 240, color: "black", brushSize: 4 }
{ type: "guess", player: "Rahul", text: "elephant" }
{ type: "score", player: "Rahul", points: 100 }
{ type: "roundStart", drawer: "Aman", timeLimit: 60 }
```

---

## 2. ⚠ Proposed additions — discuss and agree on Day 1

The four messages above aren't enough to build the whole game. These are the gaps, with suggested fixes.

### 2a. `draw` should send a line segment, not a point

With only `x, y`, the receiver gets separate dots and gaps when the mouse moves fast. Suggested:

```js
{ type: "draw", x0: 118, y0: 236, x1: 120, y1: 240, color: "#000000", brushSize: 4 }
```

Also agree on: **fixed canvas size 800 × 600 for everyone**, and **colors as hex strings**.

### 2b. Rooms (Person 2 + Person 6)

| Direction | Event | Data |
|---|---|---|
| client → server | `createRoom` | `{ playerName }` |
| client → server | `joinRoom` | `{ roomCode, playerName }` |
| server → that client | `roomJoined` | `{ roomCode, players, hostId }` |
| server → that client | `roomError` | `{ message }` |
| server → room | `playersUpdate` | `{ players: [{ id, name, score }] }` |

### 2c. Game flow (Person 5)

| Direction | Event | Data |
|---|---|---|
| client → server | `startGame` | `{}` (host only) |
| server → room | `roundStart` | `{ drawer, drawerId, timeLimit, round, totalRounds, wordLength }` |
| server → drawer only | `yourWord` | `{ word }` |
| server → room | `timer` | `{ timeLeft }` |
| server → room | `roundEnd` | `{ word }` |
| server → room | `gameOver` | `{ players }` (sorted, highest first) |

`roundStart` gains `drawerId` because names can repeat; ids can't.

### 2d. Chat (Person 4)

| Direction | Event | Data |
|---|---|---|
| client → server | `guess` | `{ type: "guess", player, text }` |
| server → room | `chatMessage` | `{ player, text }` (wrong guesses / normal chat) |
| server → room | `correctGuess` | `{ player }` — **never include the text** |
| server → room | `score` | `{ player, points }` |

### 2e. Canvas (Person 3)

| Direction | Event | Data |
|---|---|---|
| client → server → others | `draw` | see 2a |
| client → server → others | `clearCanvas` | `{}` |

---

## 3. Backend handler pattern (Persons 1, 4, 5)

Every file in `backend/socketHandlers/` exports one function that takes `(io, socket)`. `server.js` calls each one inside `io.on("connection", ...)`.

| File | Exported register function | Other exports |
|---|---|---|
| drawingEvents.js | `registerDrawingEvents` | — |
| chatEvents.js | `registerChatEvents` | — |
| gameEvents.js | `registerGameEvents` | `startRound`, `endRound`, `endGame` |

## 4. Room data shape (Person 2 writes this, others read it)

_To be filled in by Person 2 on Day 1 — list every field on a room and on a player._

## 5. Frontend props (Person 6 writes this, others read it)

| Component | Props |
|---|---|
| Lobby | `onNameChosen` |
| Canvas | `isDrawer` |
| Toolbar | `color`, `setColor`, `brushSize`, `setBrushSize`, `onClear` |
| ChatBox | `playerName`, `isDrawer` |
| Leaderboard | `players`, `drawerId`, `myId` |

## 6. Scoring rule (Person 5 writes this)

_To be filled in: the exact formula for `calculatePoints(timeLeft, timeLimit)`._
