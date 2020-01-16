import * as actions from "../actions";

const reduceMouseDown = (state, { payload: { row, index } }) => ({
  ...state,
  cursor: { row, index },
  anchor: { row, index },
  extent: undefined
});

const reduceMouseUp = (state, { payload: { row, index } }) => {
  const { anchor, cursor } = state;
  if (!anchor) {
    return state;
  }
  if (anchor.row === row && anchor.index === index) {
    return { ...state, anchor: undefined };
  }
  return { ...state, cursor: { row, index }, extent: { row, index } };
};

const reducer = (state, action) => {
  switch (action.type) {
    case actions.MOUSE_DOWN: {
      return reduceMouseDown(state, action);
    }
    case actions.MOUSE_UP: {
      return reduceMouseUp(state, action);
    }
    default:
      return state;
  }
};

export default reducer;
