/*
 * ==================================================================
 *  frontend/src/components/ChatBox.js
 *  OWNER: Person 4 — Chat & guessing (frontend half)
 * ==================================================================
 *
 *  WHAT THIS FILE IS
 *  -----------------
 *  The chat panel: a scrolling list of messages and a text box to type
 *  guesses. It never decides if a guess is right — the SERVER does
 *  that (backend/socketHandlers/chatEvents.js, also yours).
 *
 * ------------------------------------------------------------------
 *  PROPS IT RECEIVES (from App.js)
 * ------------------------------------------------------------------
 *  - playerName : who I am
 *  - isDrawer   : if true, disable the input (placeholder: "You're drawing!")
 *
 * ------------------------------------------------------------------
 *  STATE (useState)
 * ------------------------------------------------------------------
 *  - messages : list of message objects. Give each a kind, e.g.
 *               normal chat / correct-guess announcement / system
 *               ("Aman is drawing now"), so you can style them
 *               differently (green for correct, grey for system).
 *  - text     : what's currently typed (controlled input)
 *  - hasGuessed (optional): after I guess right, show "You got it!"
 *
 * ------------------------------------------------------------------
 *  SENDING
 * ------------------------------------------------------------------
 *  - Wrap the input in a <form>. On submit:
 *       1. preventDefault (otherwise the page reloads!)
 *       2. ignore if text is empty after trim
 *       3. emit "guess" { type: "guess", player: playerName, text }
 *       4. clear the input
 *  - Using a form means pressing Enter sends automatically.
 *
 * ------------------------------------------------------------------
 *  RECEIVING (useEffect + cleanup with socket.off!)
 * ------------------------------------------------------------------
 *  - "chatMessage"  { player, text }  -> add as normal message
 *  - "correctGuess" { player }        -> add "player guessed the word!"
 *  - "roundStart"   { drawer }        -> add system "drawer is drawing"
 *  - "roundEnd"     { word }          -> add system "The word was ..."
 *
 *  ⚠ Adding to a list in state: never push() into the existing array.
 *  Create a NEW array containing the old messages plus the new one.
 *  Inside a socket listener, use the "updater function" form of the
 *  setter (setMessages(prev => ...)) — otherwise you'll read a stale,
 *  empty list and only ever see the latest message. Classic bug.
 *  Look up "stale closure" and "updating arrays in state" on react.dev.
 *
 * ------------------------------------------------------------------
 *  POLISH
 * ------------------------------------------------------------------
 *  - Auto-scroll to the newest message (useRef on the list's end +
 *    scrollIntoView, triggered by a useEffect on messages).
 *  - Keep only the last ~100 messages.
 *
 *  DONE WHEN
 *  [ ] Messages appear for everyone, in order, exactly once
 *  [ ] Enter sends; empty messages are ignored
 *  [ ] Correct guess shows the announcement, NOT the word
 *  [ ] Drawer can't type
 *
 *  LOOK UP: react.dev -> "Updating Arrays in State",
 *  "Queueing a Series of State Updates"; MDN -> "Event.preventDefault".
 */
