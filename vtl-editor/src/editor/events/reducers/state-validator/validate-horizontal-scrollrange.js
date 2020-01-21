const validator = state => {
  const { cursor, horizontalScrollrange: hr } = state;
  if (!cursor) {
    return state;
  }
  const { offset } = hr;
  const { index } = cursor;
  const newStart = Math.max(Math.min(hr.start, index), index - offset + 1);
  return {
    ...state,
    horizontalScrollrange: {
      offset,
      start: newStart,
      stop: newStart + offset - 1
    }
  };
};

export default validator;
