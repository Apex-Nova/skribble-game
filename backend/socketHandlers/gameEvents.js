/*
 * ==================================================================
 *  backend/socketHandlers/gameEvents.js
 *  OWNER: Person 5 — Scoring & game flow
 * ==================================================================
 *
 *  WHAT THIS FILE IS
 *  -----------------
 *  The referee. It controls the LIFECYCLE of a game:
 *
 *    lobby -> start game -> [ round: pick drawer, pick word, countdown,
 *    end round, show answer ] x N -> game over -> leaderboard
 *
 *  This is the hardest backend file because of TIMERS. Draw that
 *  lifecycle on paper before writing anything.
 *
 *  Pattern: export registerGameEvents(io, socket) for the listeners,
 *  PLUS export plain functions like endRound(io, roomCode) so
 *  chatEvents.js and server.js can call them.
 *
 * ------------------------------------------------------------------
 *  LISTENER: "startGame"
 * ------------------------------------------------------------------
 *  - Only the HOST may start. Need at least 2 players.
 *  - Reset every score to 0, set round to 1, mark the room as playing.
 *  - Call startRound.
 *
 * ------------------------------------------------------------------
 *  FUNCTION: startRound(io, roomCode)
 *  ------------------------------------------------------------------
 *  1. Pick the drawer (roomManager.nextDrawer — Person 2).
 *  2. Pick a random word from data/words.js (Math.random + Math.floor).
 *     Avoid repeating a word already used this game.
 *  3. Store the word + start time on the room. Reset everyone's
 *     hasGuessed to false.
 *  4. Tell the room "roundStart" { drawer, timeLimit, ... }
 *     — this tells every client to clear its canvas.
 *  5. Send the WORD PRIVATELY to the drawer only: "yourWord"
 *     via io.to(drawerSocketId). Everyone else gets only the length
 *     (e.g. "_ _ _ _ _") so they know how many letters.
 *  6. Start the countdown (see TIMERS below).
 *
 * ------------------------------------------------------------------
 *  FUNCTION: endRound(io, roomCode)
 *  ------------------------------------------------------------------
 *  1. STOP the timer first (clearInterval / clearTimeout). If you
 *     forget, the old timer keeps firing and rounds overlap — the most
 *     common bug in this kind of game.
 *  2. Guard: if the round already ended, do nothing (endRound might be
 *     called twice: by the timer AND by "everyone guessed").
 *  3. Optionally give the drawer points (scoring.calculateDrawerPoints).
 *  4. Broadcast "roundEnd" { word } — NOW it's safe to reveal it.
 *  5. Wait a few seconds (setTimeout) so players see the answer, then:
 *       - if every player has drawn the planned number of times
 *         -> endGame
 *       - otherwise -> round + 1 and startRound again.
 *
 * ------------------------------------------------------------------
 *  FUNCTION: endGame(io, roomCode)
 *  ------------------------------------------------------------------
 *  - Broadcast "gameOver" with players sorted by score (highest first).
 *  - Mark room as not playing, so the host can start again.
 *
 * ------------------------------------------------------------------
 *  TIMERS — read twice
 * ------------------------------------------------------------------
 *  - setInterval runs every N ms until you clear it. Use it to count
 *    timeLeft down once per second and broadcast "timer" { timeLeft }.
 *    When it hits 0 -> endRound.
 *  - setInterval returns an ID. SAVE IT ON THE ROOM OBJECT, because
 *    clearing it requires that ID — and every room has its own timer.
 *    Never use one shared global timer: two rooms would fight over it.
 *  - Simpler alternative: broadcast only the end time once, and let
 *    every client count down by itself; server uses a single setTimeout.
 *
 * ------------------------------------------------------------------
 *  EDGE CASES (handle after the happy path works)
 * ------------------------------------------------------------------
 *  - Drawer disconnects mid-round -> endRound immediately.
 *  - Players drop to 1 -> endGame.
 *  - Room deleted while a timer is running -> timer must be cleared
 *    (coordinate with Person 2's leaveRoom).
 *
 *  DONE WHEN
 *  [ ] Host clicks start -> round 1 begins, drawer sees word, others see blanks
 *  [ ] Timer counts down on every screen and ends the round at 0
 *  [ ] Drawer rotates each round, game ends after the last round
 *  [ ] Starting a second game in the same room works
 *
 *  LOOK UP: MDN "setInterval", "clearInterval", "setTimeout",
 *           "Array.prototype.sort" (sorting numbers needs a compare fn!).
 */
