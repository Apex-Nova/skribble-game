/*
 * ==================================================================
 *  frontend/src/components/Canvas.js
 *  OWNER: Person 3 — Canvas / drawing
 * ==================================================================
 *
 *  WHAT THIS FILE IS
 *  -----------------
 *  The shared drawing board. Two jobs:
 *    1. If I'm the drawer: turn my mouse movements into lines on my
 *       canvas AND send each line to the server.
 *    2. Always: listen for lines from the server and draw them.
 *  Toolbar (colors/size/eraser) sits on top and is rendered from here.
 *
 *  TIP: before touching React, build a plain HTML page with a canvas
 *  you can draw on with the mouse. Once that works, move it into React.
 *
 * ------------------------------------------------------------------
 *  PROPS IT RECEIVES
 * ------------------------------------------------------------------
 *  - isDrawer : true/false. If false, ignore the mouse completely and
 *               hide the toolbar.
 *
 * ------------------------------------------------------------------
 *  REFS AND STATE
 * ------------------------------------------------------------------
 *  - canvasRef (useRef): a handle to the real <canvas> element, so you
 *    can call getContext("2d") on it. React can't draw for you.
 *  - isDrawingRef (useRef): is the mouse button currently held down?
 *  - lastPointRef (useRef): where the mouse was a moment ago.
 *    Why refs and not state? These change dozens of times a second;
 *    useState would re-render the component every time (slow) and
 *    doesn't need to show on screen.
 *  - color, brushSize (useState): chosen in Toolbar, so they live here
 *    and are passed to Toolbar together with their setter functions.
 *
 * ------------------------------------------------------------------
 *  THE CANVAS ELEMENT
 * ------------------------------------------------------------------
 *  - Fixed size for EVERYONE, e.g. width 800, height 600, set as
 *    attributes on the element (not only via CSS, which stretches it
 *    and makes the mouse position wrong).
 *  - White background, a border.
 *
 * ------------------------------------------------------------------
 *  A SMALL HELPER: drawLine(x0, y0, x1, y1, color, size)
 *  ------------------------------------------------------------------
 *  Used for BOTH my own strokes and strokes from the server — so they
 *  look identical. Uses the context: beginPath, moveTo, lineTo,
 *  set strokeStyle + lineWidth, lineCap = "round" (smooth joins),
 *  stroke.
 *
 * ------------------------------------------------------------------
 *  MOUSE EVENTS (only when isDrawer is true)
 * ------------------------------------------------------------------
 *  onMouseDown  -> isDrawing = true, remember this point as "last".
 *  onMouseMove  -> if drawing: drawLine(last -> current) locally,
 *                  emit "draw" with both points + color + size,
 *                  then set last = current.
 *  onMouseUp / onMouseLeave -> isDrawing = false.
 *
 *  Mouse position INSIDE the canvas: the event gives page coordinates;
 *  subtract the canvas's position (look up getBoundingClientRect).
 *
 *  ⚠ Why send TWO points? If you only send (x, y), receivers get dots
 *  with gaps when the mouse moves fast. Sending each segment (from-to)
 *  draws smooth lines. See the proposed "draw" shape in
 *  docs/API_CONTRACTS.md and get the team to agree.
 *
 * ------------------------------------------------------------------
 *  RECEIVING STROKES (useEffect)
 * ------------------------------------------------------------------
 *  - On mount: socket.on("draw", ...) -> call drawLine with the data.
 *  - socket.on("clearCanvas") and socket.on("roundStart") -> clear
 *    (look up clearRect, or fill the whole canvas white).
 *  - RETURN a cleanup that calls socket.off for each — otherwise every
 *    stroke gets drawn twice (see note in App.js).
 *
 * ------------------------------------------------------------------
 *  LATER / OPTIONAL
 * ------------------------------------------------------------------
 *  - Touch support for phones (onTouchStart/Move/End).
 *  - Throttle emits if the network struggles (send every ~16ms max).
 *  - Undo, fill bucket.
 *
 *  DONE WHEN
 *  [ ] I can draw smooth lines with my mouse
 *  [ ] Another tab sees my drawing live, same colors and sizes
 *  [ ] Non-drawers can't draw
 *  [ ] Canvas clears at the start of each round
 *
 *  LOOK UP: MDN -> "Canvas tutorial" (Basic usage, Drawing shapes ->
 *  Paths), "MouseEvent.clientX", "getBoundingClientRect";
 *  react.dev -> "useRef", "Manipulating the DOM with Refs".
 */
