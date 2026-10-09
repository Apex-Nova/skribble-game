/*
 * ==================================================================
 *  backend/roomManager.js
 *  OWNER: Person 2 — Room management
 * ==================================================================
 *
 *  WHAT THIS FILE IS
 *  -----------------
 *  The "memory" of the game. There is no database, so ALL rooms and
 *  players live in one JavaScript object inside this file. Other
 *  files never touch that object directly — they call YOUR functions.
 *  That rule keeps bugs in one place.
 *
 *  This file does NOT talk to sockets. It only stores and returns
 *  data. (server.js does the socket.join / emit part.) That makes it
 *  the easiest file to test: you can call your functions from a tiny
 *  test script and console.log the results.
 *
 * ------------------------------------------------------------------
 *  STEP 1 — Design the data shape FIRST (on paper)
 * ------------------------------------------------------------------
 *  One top-level object, keyed by room code. Suggested shape:
 *
 *    rooms
 *      "ABCD" ->
 *         players       : list of { id, name, score, hasGuessed }
 *                         (id = the player's socket.id)
 *         hostId        : id of the player who created the room
 *         drawerIndex   : which position in `players` is drawing now
 *         currentWord   : the secret word (null between rounds)
 *         round         : current round number
 *         roundStartedAt: timestamp when round began (for scoring)
 *         timer         : the interval/timeout id (so it can be stopped)
 *         isPlaying     : has the host pressed "start"?
 *
 *  Write this shape in docs/API_CONTRACTS.md so Persons 4 and 5 know
 *  exactly which fields exist. They will read `currentWord`, `players`,
 *  `hasGuessed`, etc.
 *
 * ------------------------------------------------------------------
 *  STEP 2 — Functions to build and export
 *  (each one gets a ONE-LINE comment above it: what it takes, what it returns)
 * ------------------------------------------------------------------
 *  generateRoomCode()
 *    - Make a short random code (4–5 uppercase letters).
 *    - Keep generating until it's not already used by another room.
 *    - Look up: Math.random, Math.floor, String.fromCharCode, or
 *      picking random characters from a string of "ABCDEFGH...".
 *
 *  createRoom(hostId, hostName)
 *    - Make a new room with the shape above, with the host as the
 *      first player (score 0). Return the room code.
 *
 *  joinRoom(code, playerId, playerName)
 *    - Codes should be case-insensitive: convert to uppercase first.
 *    - If the room doesn't exist -> return an error result
 *      (e.g. an object with an `error` message) instead of crashing.
 *    - Optional rules: max players (8?), no duplicate names,
 *      no joining mid-round (or allow it — decide with Person 5).
 *    - Otherwise add the player and return success.
 *
 *  leaveRoom(playerId)
 *    - Find which room this player is in, remove them.
 *    - If the room is empty -> STOP its timer, then delete the room.
 *    - If the host left -> make the next player the host.
 *    - Return the room code (so server.js can notify the room) and
 *      whether the leaver was the drawer.
 *
 *  getRoom(code)                 -> the whole room object (or undefined)
 *  getPlayers(code)              -> the players list
 *  getRoomCodeOfPlayer(playerId) -> which room a socket is in
 *    (Alternative used by many Socket.IO apps: server.js stores the
 *     code on the socket itself via `socket.data`. Agree on ONE way.)
 *
 *  getCurrentDrawer(code)        -> the player object who is drawing
 *
 *  nextDrawer(code)
 *    - Move drawerIndex forward by one; wrap back to 0 at the end
 *      (look up the % "remainder" operator — perfect for this).
 *    - Return the new drawer player object.
 *    - Edge case: a player left and the index is now past the end.
 *
 *  Export them all at the bottom with module.exports = { ... }.
 *
 * ------------------------------------------------------------------
 *  THINGS THAT WILL BITE YOU
 * ------------------------------------------------------------------
 *  - Two players in different tabs have different socket ids even if
 *    they type the same name. Always identify players by id, not name.
 *  - When a player refreshes the page they get a NEW socket id and
 *    appear as a new player. That's acceptable for version 1.
 *  - Never send the whole room object to browsers — it contains
 *    `currentWord` and a timer. Send only safe fields.
 *
 * ------------------------------------------------------------------
 *  HOW TO TEST WITHOUT THE FRONTEND
 * ------------------------------------------------------------------
 *  Make a throwaway file (don't commit it), require this file, call
 *  createRoom, joinRoom twice, nextDrawer three times, leaveRoom, and
 *  console.log the results after each step. Run it with `node`.
 *
 *  DONE WHEN
 *  [ ] Two rooms get different codes
 *  [ ] Joining a wrong code returns an error, not a crash
 *  [ ] nextDrawer cycles A -> B -> C -> A
 *  [ ] Last player leaving deletes the room
 *
 *  LOOK UP: MDN "Working with objects", "Array.prototype.find",
 *           "Array.prototype.filter", "findIndex", "Remainder (%)".
 */
