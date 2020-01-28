import { getShiftSelection } from "./tools";

export function changeKeyPageUp(state, { shiftKey }) {
  const { cursor, verticalScrollrange, anchor } = state;
  if (cursor) {
    const { offset } = verticalScrollrange;
    const { row } = cursor;
    const nextRow = Math.max(0, row - offset);
    const nextCursor = { row: nextRow, index: 0 };

    return {
      ...state,
      ...getShiftSelection(shiftKey, anchor || cursor, nextCursor),
      cursor: nextCursor
    };
  }
  return state;
}

export function changeKeyPageDown(state, { shiftKey }) {
  const { cursor, verticalScrollrange, anchor, lines } = state;
  if (cursor) {
    const { offset } = verticalScrollrange;
    const { row } = cursor;
    const nextRow = Math.min(lines.length - 1, row + offset);
    const nextCursor = { row: nextRow, index: 0 };

    return {
      ...state,
      ...getShiftSelection(shiftKey, anchor || cursor, nextCursor),
      cursor: nextCursor
    };
  }
  return state;
}
