/*
 * ==================================================================
 *  backend/server.js
 *  OWNER: Person 1 — Backend / WebSocket lead
 * ==================================================================
 *
 *  WHAT THIS FILE IS
 *  -----------------
 *  The entry point of the whole backend. When someone runs
 *  `node server.js`, this is the first file that executes.
 *  It starts a web server, attaches Socket.IO to it, and plugs in
 *  everyone else's backend files. Think of it as a SWITCHBOARD:
 *  it connects calls, it does not hold conversations. Almost no
 *  game logic should live here.
 *
 *  BUILD THIS FIRST (Day 1). Your first push should ONLY start the
 *  server and log "user connected" / "user disconnected". Everyone
 *  else branches off that version.
 *
 * ------------------------------------------------------------------
 *  STEP 1 — Imports (top of the file)
 * ------------------------------------------------------------------
 *  - Bring in three things: the `express` package, Node's built-in
 *    `http` module, and the `Server` class from the `socket.io` package.
 *  - Bring in teammates' files using RELATIVE paths, e.g.
 *    "./roomManager" and "./socketHandlers/chatEvents".
 *  - The backend uses CommonJS style: `require(...)` to import and
 *    `module.exports = ...` to export.
 *    (The frontend uses `import` / `export` instead. Don't mix them.)
 *
 * ------------------------------------------------------------------
 *  STEP 2 — Create the servers
 * ------------------------------------------------------------------
 *  - Create an Express app.
 *  - Wrap the Express app in a plain http server (Socket.IO needs the
 *    raw http server, not the Express app directly).
 *  - Create a Socket.IO Server attached to that http server.
 *  - CORS: the React app runs on a DIFFERENT port (3000 or 5173), so
 *    the browser will block the connection unless you pass a `cors`
 *    option that allows that origin. Search: "socket.io v4 cors".
 *    This is the #1 Day-1 bug — expect it.
 *
 * ------------------------------------------------------------------
 *  STEP 3 — A health-check route
 * ------------------------------------------------------------------
 *  - Add one GET route on "/" that replies with plain text like
 *    "server is running". Open http://localhost:3001 in the browser
 *    to prove the server is alive. Useful for debugging forever.
 *
 * ------------------------------------------------------------------
 *  STEP 4 — The connection handler (the heart of this file)
 * ------------------------------------------------------------------
 *  - `io.on("connection", ...)` runs ONCE PER BROWSER TAB that connects.
 *    It hands you a `socket` object = that one player's private line.
 *  - Inside it, in this order:
 *      a. console.log the socket.id so you can SEE connections happen.
 *      b. Room events ("createRoom", "joinRoom") — these call Person 2's
 *         roomManager functions. Decide on Day 1 whether YOU write these
 *         two listeners here, or Person 2 gives you a handler file.
 *      c. For each handler file, call its register function and pass it
 *         (io, socket). Agreed pattern (see docs/API_CONTRACTS.md):
 *            drawingEvents  -> relays strokes
 *            chatEvents     -> Person 4
 *            gameEvents     -> Person 5
 *      d. `socket.on("disconnect", ...)`:
 *            - ask roomManager to remove this player,
 *            - send the room the updated player list ("playersUpdate"),
 *            - if the player who left was the DRAWER, ask gameEvents to
 *              end the round early,
 *            - if the room is now empty, roomManager deletes it.
 *
 * ------------------------------------------------------------------
 *  STEP 5 — Start listening
 * ------------------------------------------------------------------
 *  - Use port 3001 (React uses 3000, Vite uses 5173 — avoid clashes).
 *  - Let an environment variable (process.env.PORT) override it, so it
 *    can be deployed later.
 *  - Log "Server listening on port ..." once it starts.
 *
 * ------------------------------------------------------------------
 *  SOCKET.IO CHEAT-SHEET (memorise these 5 — the whole game uses them)
 * ------------------------------------------------------------------
 *  - socket.emit(event, data)           -> to THIS player only
 *  - socket.to(room).emit(event, data)  -> everyone in room EXCEPT this player
 *  - io.to(room).emit(event, data)      -> everyone in room INCLUDING this player
 *  - socket.join(roomCode)              -> put this player into a room
 *  - io.to(socket.id).emit(...)         -> private message to one specific player
 *
 * ------------------------------------------------------------------
 *  RULES FOR THIS FILE
 * ------------------------------------------------------------------
 *  - No game logic here. Checking guesses, counting points, timers ->
 *    those belong in other people's files.
 *  - You review every Pull Request that changes how handlers are wired.
 *  - If the server crashes, it's usually because a teammate's file
 *    throws on import. Read the error's FIRST line + file name.
 *
 * ------------------------------------------------------------------
 *  DONE WHEN
 * ------------------------------------------------------------------
 *  [ ] `node server.js` prints the listening message
 *  [ ] http://localhost:3001 shows the health-check text
 *  [ ] Frontend open in 2 tabs -> terminal shows 2 different socket ids
 *  [ ] Closing a tab logs a disconnect
 *  [ ] All handler files are wired in and the server still starts
 *
 *  LOOK UP: socket.io.com/docs/v4 -> "Server initialization",
 *           "Emit cheatsheet", "Rooms".  expressjs.com -> "Hello world".
 */
