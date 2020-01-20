const validator = state => {
  const { cursor, horizontalScrollrange: hr, verticalScrollrange: vr } = state;
  if (!cursor) {
    return state;
  }
  const { index } = cursor;
  return { ...state, horizontalScrollrange: { ...hr } };
};

export default validator;
