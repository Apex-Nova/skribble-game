/*
 * ==================================================================
 *  frontend/src/socket.js
 *  OWNER: Person 6 — Lobby UI & infrastructure
 * ==================================================================
 *
 *  WHAT THIS FILE IS
 *  -----------------
 *  Creates ONE Socket.IO connection to the backend and exports it.
 *  Every component imports this same connection. If two components
 *  each made their own, the server would think they were two players.
 *
 *  WHAT GOES HERE (about 3 lines)
 *  ------------------------------
 *  - Import `io` from the "socket.io-client" package
 *    (install it in the FRONTEND folder: it's a different package
 *     from the server's "socket.io").
 *  - Call io(...) with the backend address: http://localhost:3001
 *    (must match the port in backend/server.js).
 *  - Export the result as the default export.
 *
 *  BETTER (later): put the address in an environment variable so it
 *  can change when the game is deployed. Not needed this week.
 *
 *  HOW OTHER FILES USE IT
 *  ----------------------
 *  Components import it, then:
 *    socket.emit("eventName", data)   -> send to server
 *    socket.on("eventName", handler)  -> listen (inside useEffect!)
 *    socket.off("eventName", handler) -> stop listening (cleanup)
 *    socket.id                        -> this browser's unique id
 *
 *  DONE WHEN
 *  [ ] Opening the app makes the backend terminal log "user connected"
 *  [ ] No CORS error in the browser console (if there is one, it's
 *      fixed on the BACKEND in server.js, not here)
 *
 *  LOOK UP: socket.io docs -> "Client Initialization",
 *           "How to use with React".
 */
