import { getTokenAtCursor, getHighlight } from "../../../tools";

function changeDoubleClick(state) {
  const token = getTokenAtCursor(state);
  if (token) {
    const bloc = getHighlight(token);
    if (bloc) {
      const { row, index, length, highlight } = bloc;
      const anchor = { row, index };
      const extent = { row, index: index + length };
      return {
        ...state,
        highlights: highlight ? [bloc] : [],
        anchor,
        extent,
        cursor: extent
      };
    }
  }

  return state;
}

export default changeDoubleClick;
