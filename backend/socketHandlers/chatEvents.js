/*
 * ==================================================================
 *  backend/socketHandlers/chatEvents.js
 *  OWNER: Person 4 — Chat & guessing (backend half)
 * ==================================================================
 *
 *  WHAT THIS FILE IS
 *  -----------------
 *  Every chat message passes through here. For each one you decide:
 *  is it a CORRECT guess, a CLOSE guess, or just chat? Then you tell
 *  the room the right thing — WITHOUT ever leaking the secret word.
 *
 *  Same pattern as the other handler files: export ONE function
 *  (e.g. registerChatEvents) that takes (io, socket) and adds
 *  socket.on(...) listeners inside it.
 *
 * ------------------------------------------------------------------
 *  THE "guess" LISTENER — step by step
 * ------------------------------------------------------------------
 *  Incoming shape: { type: "guess", player, text }
 *
 *  1. Find the room this socket belongs to. No room -> ignore.
 *  2. Clean the text: trim spaces, ignore empty messages, cap length
 *     (e.g. 100 characters) so nobody spams a novel.
 *  3. If no round is running (no currentWord) -> it's just chat:
 *     broadcast as "chatMessage" to the whole room. Done.
 *  4. If the sender IS the drawer -> don't let them guess. Either
 *     block the message or only let them chat if it doesn't contain
 *     the word (simplest: block it).
 *  5. If the sender ALREADY guessed correctly this round -> ignore,
 *     or only show their message to other players who have guessed.
 *  6. Compare to the secret word, case-insensitive
 *     ("Elephant", " elephant " and "ELEPHANT" all count).
 *     Look up: toLowerCase, trim.
 *  7. CORRECT:
 *       - Mark player.hasGuessed = true (on the room data).
 *       - Work out time left (use the round's start time + time limit).
 *       - points = scoring.calculatePoints(timeLeft, timeLimit)  [Person 5]
 *       - Add points to the player's score.
 *       - Broadcast "correctGuess" with ONLY the player's name.
 *         ⚠ NEVER broadcast the guess text — it IS the answer.
 *       - Broadcast "score" { player, points } and "playersUpdate".
 *       - If EVERY non-drawer has now guessed -> ask gameEvents to end
 *         the round early (agree on the function name with Person 5).
 *  8. WRONG -> broadcast as a normal "chatMessage" { player, text }.
 *
 *  Optional polish: "close guess" — if the guess is 1 letter off,
 *  privately tell ONLY that player "so close!" (socket.emit, not io.to).
 *
 * ------------------------------------------------------------------
 *  SECURITY THINKING (a real-world habit)
 * ------------------------------------------------------------------
 *  Don't trust the `player` name sent by the browser — anyone can type
 *  a fake one in the console. Look up the name from roomManager using
 *  socket.id instead.
 *
 * ------------------------------------------------------------------
 *  BUILDING BEFORE PERSON 5 IS DONE
 * ------------------------------------------------------------------
 *  If scoring.js isn't merged yet, temporarily give a fixed 100 points
 *  and leave a "TODO: use calculatePoints" comment. Swap it later.
 *
 *  DONE WHEN
 *  [ ] Normal messages appear for everyone
 *  [ ] Correct guess shows "X guessed the word!" — word NOT shown
 *  [ ] Same player can't score twice in a round
 *  [ ] Drawer can't score
 *  [ ] Round ends early once everyone guessed
 *
 *  LOOK UP: MDN "String.prototype.trim", "toLowerCase", "Strict equality".
 */
