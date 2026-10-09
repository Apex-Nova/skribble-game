/*
 * ==================================================================
 *  backend/scoring.js
 *  OWNER: Person 5 — Scoring & game flow
 * ==================================================================
 *
 *  WHAT THIS FILE IS
 *  -----------------
 *  Pure math. No sockets, no rooms, no timers — just functions that
 *  take numbers and return numbers. This is the smallest file in the
 *  project: do it FIRST so Person 4 can use it immediately.
 *
 *  A "pure function" = same input always gives the same output, and it
 *  changes nothing outside itself. Easy to test, impossible to break
 *  other files.
 *
 * ------------------------------------------------------------------
 *  FUNCTIONS TO BUILD AND EXPORT
 * ------------------------------------------------------------------
 *  calculatePoints(timeLeft, timeLimit)
 *    - Takes: seconds left on the clock, and the round length (e.g. 60).
 *    - Returns: a whole number of points for a correct guess.
 *    - Rule: faster guess = more points. Ideas (pick ONE, write it down
 *      in API_CONTRACTS.md so everyone knows):
 *        * proportional: max points scaled by the fraction of time left
 *        * with a floor: never less than some minimum (e.g. 10)
 *        * bonus for being the FIRST to guess (needs an extra input)
 *    - Round the result (look up Math.round / Math.max).
 *    - Guard against weird input: negative timeLeft -> treat as 0.
 *
 *  calculateDrawerPoints(numberWhoGuessed, totalGuessers)   (optional)
 *    - The drawer should earn something when people guess their drawing,
 *      otherwise nobody wants to draw. Example rule: a fixed amount per
 *      correct guesser.
 *
 *  Export with module.exports = { calculatePoints, ... }.
 *
 * ------------------------------------------------------------------
 *  WHO CALLS THIS
 * ------------------------------------------------------------------
 *  - Person 4 (chatEvents.js) calls calculatePoints when a guess is right.
 *  - Person 5 (gameEvents.js) may call calculateDrawerPoints at round end.
 *
 *  HOW TO TEST
 *  -----------
 *  Throwaway file: require this, console.log calculatePoints(60, 60),
 *  (30, 60), (1, 60), (0, 60), (-5, 60). Do the numbers feel fair?
 *
 *  DONE WHEN
 *  [ ] Faster guesses always score more than slower ones
 *  [ ] Never returns a negative number, NaN, or a decimal
 *  [ ] Scoring rule written in docs/API_CONTRACTS.md
 *
 *  LOOK UP: MDN "Math.round", "Math.max", "Math.min", "Functions".
 */
