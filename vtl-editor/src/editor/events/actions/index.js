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
