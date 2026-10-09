/*
 * ==================================================================
 *  frontend/src/components/Lobby.js
 *  OWNER: Person 6 — Lobby UI & infrastructure
 * ==================================================================
 *
 *  WHAT THIS FILE IS
 *  -----------------
 *  The home screen. The player types a name, then either CREATES a new
 *  room or JOINS one with a code. Nothing else.
 *
 * ------------------------------------------------------------------
 *  WHAT TO BUILD
 * ------------------------------------------------------------------
 *  State (useState):
 *    - name      : text in the "Your name" box
 *    - codeInput : text in the "Room code" box
 *    - error     : message to show if joining fails (optional)
 *
 *  UI:
 *    - A title (game name).
 *    - Input: your name. Required — disable both buttons while empty.
 *    - Button: "Create room"
 *        -> emit "createRoom" { playerName: name }
 *    - Input: room code  +  Button: "Join room"
 *        -> emit "joinRoom" { roomCode, playerName: name }
 *    - Optional: pressing Enter in the code box also joins.
 *
 *  Inputs must be "controlled": their value comes from state, and
 *  onChange updates state. Look up "controlled input" on react.dev.
 *
 *  After emitting, Lobby does NOT switch screens itself. App.js
 *  listens for "roomJoined" from the server and switches. That way the
 *  screen only changes when the server says "yes, you're in".
 *  Lobby needs to tell App the player's name -> receive a setter
 *  function as a prop (e.g. onNameChosen) and call it.
 *
 *  Show the room code BIG on the game screen later so the host can
 *  share it (that's App's job, but remind Person 6 = you).
 *
 *  Export the component as default.
 *
 *  DONE WHEN
 *  [ ] Create room -> lands on the game screen with a code shown
 *  [ ] Second tab joins with that code -> both see 2 players
 *  [ ] Wrong code -> visible error, stays on lobby
 *  [ ] Empty name can't submit
 *
 *  LOOK UP: react.dev -> "Responding to Events", "State: A Component's
 *  Memory", "Reacting to Input with State".
 */
