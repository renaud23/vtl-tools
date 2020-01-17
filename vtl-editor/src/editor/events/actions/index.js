/** */
export const PARSING_END = "vtl-editor/parsing-end";
export const parsingEnd = (source, tokens, errors) => ({
  type: PARSING_END,
  payload: { source, tokens, errors }
});

/** */
export const CHANGE_VERTICAL_SCROLLRANGE =
  "vtl-editor/change-vertical-scrollrange";
export const changeVerticalScrollrange = range => ({
  type: CHANGE_VERTICAL_SCROLLRANGE,
  payload: { range }
});

/** */
export const CHANGE_HORIZONTAL_SCROLLRANGE =
  "vtl-editor/change-horizontal-scrollrange";
export const changeHorizontalScrollrange = range => ({
  type: CHANGE_HORIZONTAL_SCROLLRANGE,
  payload: { range }
});

/** */
export const CHANGE_SCROLLRANGE = "vtl-editor/change-scrollrange";
export const changeScrollrange = (vertical, horizontal) => ({
  type: CHANGE_SCROLLRANGE,
  payload: { vertical, horizontal }
});

/** */
export const MOUSE_DOWN = "vtl-editor/mouse-down";
export const mouseDown = (row, index) => ({
  type: MOUSE_DOWN,
  payload: { row, index }
});

/** */
export const MOUSE_DRAG = "vtl-editor/mouse-drag";
export const mouseDrag = (row, index) => ({
  type: MOUSE_DRAG,
  payload: { row, index }
});

/** */
export const MOUSE_UP = "vtl-editor/mouse-up";
export const mouseUp = (row, index) => ({
  type: MOUSE_UP,
  payload: { row, index }
});

/** */
export const CHAR_DOWN = "vtl-editor/char-down";
export const charDown = char => ({ type: CHAR_DOWN, payload: { char } });

/** */
export const CONSUME_CONTENT_TEMPORY_CHANGE =
  "vtl-editor/consume-content-tempory-change";
export const consumeContentTemporyChange = () => ({
  type: CONSUME_CONTENT_TEMPORY_CHANGE
});
