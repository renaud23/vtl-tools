import { getShiftSelection } from "./tools";

export function changeKeyUp(state, { shiftKey }) {
  const { cursor, lines, anchor } = state;
  if (!cursor) {
    return state;
  }
  const { row, index } = cursor;
  const nextRow = Math.max(0, row - 1);
  const nextIndex = Math.min(index, lines[nextRow].length);
  const nextCursor = { row: nextRow, index: nextIndex };
  return {
    ...state,
    ...getShiftSelection(shiftKey, anchor || cursor, nextCursor),
    cursor: nextCursor
  };
}

export function changeKeyDown(state, { shiftKey }) {
  const { cursor, lines, anchor } = state;
  if (!cursor) {
    return state;
  }
  const { row, index } = cursor;
  const nextRow = Math.min(lines.length ? lines.length - 1 : 0, row + 1);
  const nextIndex = Math.min(index, lines[nextRow].length);
  const nextCursor = { row: nextRow, index: nextIndex };
  return {
    ...state,
    ...getShiftSelection(shiftKey, anchor || cursor, nextCursor),
    cursor: nextCursor
  };
}

export function changeKeyLeft(state, { shiftKey }) {
  const { cursor, lines, anchor } = state;
  if (!cursor) {
    return state;
  }
  const { row, index } = cursor;
  if (!row && !index) {
    return state;
  }
  const nextRow = index === 0 ? Math.max(0, row - 1) : row;
  const nextIndex = index === 0 ? lines[nextRow].length : index - 1;
  const nextCursor = { row: nextRow, index: nextIndex };
  return {
    ...state,
    ...getShiftSelection(shiftKey, anchor || cursor, nextCursor),
    cursor: nextCursor
  };
}

export function changeKeyRight(state, { shiftKey }) {
  const { cursor, lines, anchor } = state;
  if (!cursor) {
    return state;
  }
  const { row, index } = cursor;
  if (
    row === Math.max(0, lines.length - 1) &&
    index === lines[Math.max(0, lines.length - 1)].length
  ) {
    return state;
  }
  const nextRow =
    index === lines[row].length
      ? Math.min(lines.length ? lines.length - 1 : 0, row + 1)
      : row;
  const nextIndex = index === lines[row].length ? 0 : index + 1;
  const nextCursor = { row: nextRow, index: nextIndex };
  return {
    ...state,
    ...getShiftSelection(shiftKey, anchor || cursor, nextCursor),
    cursor: nextCursor
  };
}
