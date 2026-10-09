/*
 * ==================================================================
 *  backend/data/words.js
 *  OWNER: Person 5 — Scoring & game flow
 * ==================================================================
 *
 *  WHAT THIS FILE IS
 *  -----------------
 *  Just DATA: one exported list (array) of words players will draw.
 *  No functions needed here — gameEvents.js does the random picking.
 *
 *  WHAT TO PUT IN IT
 *  -----------------
 *  - 100+ words, all lowercase, no trailing spaces.
 *    (Lowercase makes Person 4's comparison easy.)
 *  - Pick DRAWABLE nouns: apple, bicycle, rainbow, snowman, guitar...
 *    Avoid abstract words (freedom, idea) — nobody can draw them.
 *  - Avoid words with spaces at first ("ice cream"); they complicate
 *    the "_ _ _" hint. Add them later once everything works.
 *  - Mix difficulty: easy (sun, cat), medium (lighthouse), hard (volcano).
 *    Later you could split into three lists and let the drawer choose.
 *  - No duplicates.
 *
 *  HOW TO EXPORT
 *  -------------
 *  module.exports = the array (or an object containing it).
 *  Tell Person 4 and Person 5 which one you chose — it changes how
 *  they write the require line.
 *
 *  DONE WHEN
 *  [ ] Requiring this file from a test script prints the list
 *  [ ] Every word is lowercase and drawable
 */
