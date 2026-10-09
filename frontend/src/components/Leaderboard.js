/*
 * ==================================================================
 *  frontend/src/components/Leaderboard.js
 *  OWNER: Person 6 — Lobby UI & infrastructure
 * ==================================================================
 *
 *  WHAT THIS FILE IS
 *  -----------------
 *  Shows every player and their score. It is a "dumb" (presentational)
 *  component: it receives data via props and displays it. It does NOT
 *  talk to the socket — App.js does that and passes `players` down.
 *  This is the easiest component — a great first React file.
 *
 * ------------------------------------------------------------------
 *  PROPS IT RECEIVES (agree with App.js)
 * ------------------------------------------------------------------
 *  - players  : list of { id, name, score }
 *  - drawerId : (optional) to show a ✏️ next to the current drawer
 *  - myId     : (optional) to highlight "you"
 *
 * ------------------------------------------------------------------
 *  WHAT TO BUILD
 * ------------------------------------------------------------------
 *  - Make a SORTED COPY of players, highest score first.
 *    ⚠ Don't sort the props array directly — sort() changes the
 *    original array, and props must never be modified. Copy first
 *    (look up the spread syntax "[...array]").
 *  - Render a list: position number, name, score.
 *  - Use .map() to turn each player into a list item.
 *  - Every item needs a unique `key` prop — use the player's id.
 *    (React warns in the console if you forget.)
 *  - Highlight the drawer and/or "you" with a CSS class.
 *
 *  The same component can be reused on the Game Over screen with a
 *  "🏆 Winner" style for the first player.
 *
 *  DONE WHEN
 *  [ ] Scores update live when someone guesses
 *  [ ] Order changes when someone overtakes
 *  [ ] No "unique key" warning in the console
 *
 *  LOOK UP: react.dev -> "Rendering Lists"; MDN -> "Spread syntax",
 *  "Array.prototype.sort".
 */
