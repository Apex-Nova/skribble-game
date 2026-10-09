/*
 * ==================================================================
 *  frontend/src/components/Toolbar.js
 *  OWNER: Person 3 — Canvas / drawing
 * ==================================================================
 *
 *  WHAT THIS FILE IS
 *  -----------------
 *  The row of buttons above the canvas: colors, brush sizes, eraser,
 *  clear. It does NOT draw anything and does NOT use the socket for
 *  colors — it only changes values that Canvas.js owns.
 *  (Exception: the Clear button needs to tell the server — see below.)
 *
 * ------------------------------------------------------------------
 *  PROPS IT RECEIVES (from Canvas.js)
 * ------------------------------------------------------------------
 *  - color, setColor
 *  - brushSize, setBrushSize
 *  - onClear : a function Canvas gives you that clears locally AND
 *              emits "clearCanvas" to the server
 *
 *  This is called "lifting state up": the parent (Canvas) holds the
 *  value, the child (Toolbar) gets the value + a function to change it.
 *
 * ------------------------------------------------------------------
 *  WHAT TO BUILD
 * ------------------------------------------------------------------
 *  - A list of ~8–12 colors kept as data (an array of color strings).
 *    Render one round button per color with .map(); background = that
 *    color; clicking calls setColor. Show which one is selected
 *    (e.g. a thicker border when it equals the current color).
 *  - Brush sizes: 3–4 buttons (small/medium/large) OR a range slider
 *    (<input type="range">). Clicking calls setBrushSize.
 *  - Eraser: simplest trick — set the color to the canvas background
 *    (white). Show it as "selected" when color is white.
 *  - Clear: calls onClear. Maybe ask "Are you sure?" first.
 *
 *  Keep the color names the same format everywhere (e.g. hex codes like
 *  "#000000") because they travel over the network inside "draw".
 *
 *  DONE WHEN
 *  [ ] Changing color/size immediately changes the next line drawn
 *  [ ] Eraser works, Clear clears every player's canvas
 *  [ ] The selected tool is visibly highlighted
 *
 *  LOOK UP: react.dev -> "Sharing State Between Components",
 *  "Rendering Lists"; MDN -> "<input type=range>".
 */
