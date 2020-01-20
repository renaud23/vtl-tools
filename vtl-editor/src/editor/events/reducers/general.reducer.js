import * as actions from "../actions";
import { computeVisibleLines } from "./source-edit-tools";

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
      return computeVisibleLines(
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
