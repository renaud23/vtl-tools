import { getShiftSelection } from "./tools";

export function changeKeyHome(state, { shiftKey }) {
  const { cursor, anchor } = state;
  if (cursor) {
    const { row } = cursor;
    const nextIndex = 0;
    const nextCursor = { row, index: nextIndex };

    return {
      ...state,
      ...getShiftSelection(shiftKey, anchor || cursor, nextCursor),
      cursor: nextCursor
    };
  }
  return state;
}

export function changeKeyEnd(state, { shiftKey }) {
  const { cursor, lines, anchor } = state;
  if (cursor) {
    const { row } = cursor;
    const nextIndex = lines[row].length;
    const nextCursor = { row, index: nextIndex };

    return {
      ...state,
      ...getShiftSelection(shiftKey, anchor || cursor, nextCursor),
      cursor: nextCursor
    };
  }
  return state;
}
