function getAnchor(shiftKey, anchor, cursor) {
  if (shiftKey) {
    return anchor ? anchor : cursor;
  }
  return undefined;
}

function getExtent(shiftKey, next) {
  if (shiftKey) {
    return next;
  }
  return undefined;
}

export function changeKeyUp(state) {
  const { cursor, lines } = state;
  if (!cursor) {
    return state;
  }
  const { row, index } = cursor;
  const nextRow = Math.max(0, row - 1);
  const nextIndex = Math.min(index, lines[nextRow].length);
  return {
    ...state,
    cursor: { row: nextRow, index: nextIndex },
    extent: undefined,
    anchor: undefined
  };
}

export function changeKeyDown(state, { shiftKey }) {
  const { cursor, lines, extent, anchor } = state;
  if (!cursor) {
    return state;
  }
  const { row, index } = cursor;
  const nextRow = Math.min(lines.length ? lines.length - 1 : 0, row + 1);
  const nextIndex = Math.min(index, lines[nextRow].length);
  const nextCursor = { row: nextRow, index: nextIndex };
  return {
    ...state,
    cursor: nextCursor,
    extent: getExtent(shiftKey, nextCursor),
    anchor: getAnchor(shiftKey, anchor, cursor)
  };
}

export function changeKeyLeft(state) {
  const { cursor, lines } = state;
  if (!cursor) {
    return state;
  }
  const { row, index } = cursor;
  if (!row && !index) {
    return state;
  }
  const nextRow = index === 0 ? Math.max(0, row - 1) : row;
  const nextIndex = index === 0 ? lines[nextRow].length : index - 1;
  return {
    ...state,
    extent: undefined,
    cursor: { row: nextRow, index: nextIndex },
    anchor: undefined
  };
}

export function changeKeyRight(state) {
  const { cursor, lines } = state;
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
  return {
    ...state,
    extent: undefined,
    cursor: { row: nextRow, index: nextIndex },
    anchor: undefined
  };
}
