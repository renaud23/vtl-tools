import * as actions from "../actions";
import { validateVisibleLines } from "./state-validator";

const reduceChangeVerticalScrollrange = (state, { payload: { range } }) => ({
  ...state,
  verticalScrollrange: range
});

const reduceChangeHorizontalScrollrange = (state, { payload: { range } }) => ({
  ...state,
  horizontalScrollrange: range
});

const reduceChangeScrollrange = (
  state,
  { payload: { vertical, horizontal } }
) => ({
  ...state,
  verticalScrollrange: vertical,
  horizontalScrollrange: horizontal
});

/** */
const reducer = (state, action) => {
  switch (action.type) {
    case actions.CHANGE_VERTICAL_SCROLLRANGE: {
      return validateVisibleLines(
        reduceChangeVerticalScrollrange(state, action)
      );
    }
    case actions.CHANGE_SCROLLRANGE: {
      return reduceChangeScrollrange(state, action);
    }
    case actions.CHANGE_HORIZONTAL_SCROLLRANGE: {
      return reduceChangeHorizontalScrollrange(state, action);
    }
    default:
      return state;
  }
};

export default reducer;
