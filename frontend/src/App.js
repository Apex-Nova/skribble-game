/*
 * ==================================================================
 *  frontend/src/App.js
 *  OWNER: Person 6 — Lobby UI & infrastructure
 * ==================================================================
 *
 *  WHAT THIS FILE IS
 *  -----------------
 *  The frontend switchboard (the twin of backend/server.js).
 *  It imports every component, holds the "big" shared state, and
 *  decides WHICH SCREEN to show. It should contain very little
 *  drawing or chat logic itself.
 *
 *  The frontend uses ES modules: `import X from "./..."` and
 *  `export default X`. (The backend uses require/module.exports.)
 *
 * ------------------------------------------------------------------
 *  STEP 1 — Imports
 * ------------------------------------------------------------------
 *  - React hooks you need: useState, useEffect.
 *  - The shared socket from "./socket" (never create a second one).
 *  - Components: Lobby, Canvas, ChatBox, Leaderboard (Toolbar is used
 *    inside Canvas by Person 3, so App may not need it — ask them).
 *  - The stylesheet "./styles/main.css".
 *
 * ------------------------------------------------------------------
 *  STEP 2 — State that lives here (useState)
 * ------------------------------------------------------------------
 *  - screen       : "lobby" | "game" | "gameOver"
 *  - playerName   : what this person typed in the lobby
 *  - roomCode     : the room they're in
 *  - players      : list of { id, name, score } from the server
 *  - drawer       : who is drawing this round
 *  - isDrawer     : true if THIS browser is the drawer
 *                   (compare drawer's id with socket.id)
 *  - word / hint  : the secret word (drawer only) or "_ _ _ _" (others)
 *  - timeLeft     : seconds remaining
 *
 *  Rule of thumb: state goes in the LOWEST component that needs it.
 *  If two siblings need it (e.g. players -> Leaderboard AND ChatBox),
 *  it lives here in App and is passed down as props.
 *
 * ------------------------------------------------------------------
 *  STEP 3 — Listen to the server (useEffect)
 * ------------------------------------------------------------------
 *  In ONE useEffect with an empty dependency list:
 *    - "roomJoined"    -> save roomCode + players, switch screen to "game"
 *    - "roomError"     -> show the message (alert is fine at first)
 *    - "playersUpdate" -> replace players
 *    - "roundStart"    -> save drawer, timeLeft, work out isDrawer
 *    - "yourWord"      -> save word (only the drawer ever receives this)
 *    - "timer"         -> update timeLeft
 *    - "roundEnd"      -> briefly show the real word
 *    - "gameOver"      -> switch screen to "gameOver"
 *
 *  ⚠ VERY IMPORTANT: the useEffect must RETURN a cleanup function that
 *  removes every listener you added (socket.off for each event).
 *  React (in development "StrictMode") runs effects twice; without
 *  cleanup every message arrives TWICE. This is the #1 React +
 *  Socket.IO bug — it will happen to Persons 3 and 4 too. Tell them.
 *
 * ------------------------------------------------------------------
 *  STEP 4 — Render (the JSX you return)
 * ------------------------------------------------------------------
 *  - If screen is "lobby"   -> show <Lobby />, pass it playerName setter.
 *  - If screen is "game"    -> a layout with:
 *        top bar: room code, timer, word or hint
 *        left:  <Leaderboard players=... />
 *        middle:<Canvas isDrawer=... />
 *        right: <ChatBox playerName=... isDrawer=... />
 *        a "Start game" button visible only to the host, before playing
 *  - If screen is "gameOver"-> final <Leaderboard /> + "play again".
 *  Look up "conditional rendering" on react.dev.
 *
 * ------------------------------------------------------------------
 *  PROPS CONTRACT — write it down in docs/API_CONTRACTS.md
 * ------------------------------------------------------------------
 *  Each teammate needs to know what props their component receives.
 *  Agree names on Day 1 (e.g. Canvas gets `isDrawer`; ChatBox gets
 *  `playerName`, `isDrawer`; Leaderboard gets `players`).
 *
 *  DONE WHEN
 *  [ ] Lobby shows first; joining a room switches to the game screen
 *  [ ] All four components appear on the game screen
 *  [ ] Messages never arrive twice
 *
 *  LOOK UP: react.dev -> "Your First Component", "Passing Props",
 *  "Conditional Rendering", "Sharing State Between Components",
 *  "Synchronizing with Effects" (the cleanup part!).
 */
