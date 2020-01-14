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
