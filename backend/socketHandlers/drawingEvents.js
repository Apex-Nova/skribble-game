/*
 * ==================================================================
 *  backend/socketHandlers/drawingEvents.js
 *  OWNER: ⚠ NOT ASSIGNED in TEAM_ROLES.md — decide on Day 1.
 *         Suggested: Person 3 (they define the draw data on the
 *         frontend) or Person 1 (it's tiny and server-side).
 * ==================================================================
 *
 *  WHAT THIS FILE IS
 *  -----------------
 *  A RELAY. The drawer's browser sends stroke data to the server;
 *  this file passes it on to everyone else in the same room.
 *  The server does NOT draw anything — it never touches a canvas.
 *
 *     drawer's browser --"draw"--> server --"draw"--> other browsers
 *
 * ------------------------------------------------------------------
 *  THE PATTERN (same for every file in socketHandlers/)
 * ------------------------------------------------------------------
 *  Export ONE function, e.g. registerDrawingEvents, that takes
 *  (io, socket). server.js calls it once for every new connection.
 *  Inside it, you add listeners with socket.on(...).
 *
 * ------------------------------------------------------------------
 *  LISTENERS TO ADD INSIDE THAT FUNCTION
 * ------------------------------------------------------------------
 *  "draw"
 *    - Receives one stroke segment (shape in docs/API_CONTRACTS.md).
 *    - Find which room this socket is in (roomManager, or socket.data).
 *    - SECURITY CHECK: is this socket actually the current drawer?
 *      If not, ignore the message. (Otherwise anyone could scribble
 *      on the canvas by sending fake events from the browser console.)
 *    - Forward it to everyone in the room EXCEPT the sender
 *      (the sender already drew it locally). -> socket.to(room).emit
 *
 *  "clearCanvas"
 *    - Same drawer check, then tell everyone else to clear.
 *
 *  (Optional, later) "undo", "fill".
 *
 * ------------------------------------------------------------------
 *  NICE-TO-HAVE: late joiners
 * ------------------------------------------------------------------
 *  A player who joins mid-round sees a blank canvas. Fix: keep a list
 *  of this round's strokes on the room object, and send the whole list
 *  to a new player when they join. Empty the list when a round starts.
 *  Skip this until the core game works.
 *
 *  DONE WHEN
 *  [ ] Drawing in tab A appears in tab B in real time
 *  [ ] A non-drawer sending "draw" from the console changes nothing
 *  [ ] Clear button clears everyone's canvas
 *
 *  LOOK UP: socket.io docs -> "Broadcasting events", "Rooms".
 */
