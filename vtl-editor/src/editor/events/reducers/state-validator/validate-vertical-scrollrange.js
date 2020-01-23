function validator(state) {
  const { cursor, verticalScrollrange: vr } = state;
  if (!cursor) {
    return state;
  }
  const { offset } = vr;
  const { row } = cursor;
  const newStart = Math.max(Math.min(vr.start, row), row - offset + 1);
  return {
    ...state,
    verticalScrollrange: {
      offset,
      start: newStart,
      stop: newStart + offset - 1
    }
  };
}

export default validator;
