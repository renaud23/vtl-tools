import * as actions from "../actions";
import { validateVisibleLines } from "./state-validator";
import {
  changeKeyRight,
  changeKeyLeft,
  changeKeyUp,
  changeKeyDown
} from "./change-events";
import { KEY } from "../event-callbacks";

function reduceChangeVerticalScrollrange(state, { payload: { range } }) {
  return {
    ...state,
    verticalScrollrange: range
  };
}

function reduceChangeHorizontalScrollrange(state, { payload: { range } }) {
  return {
    ...state,
    horizontalScrollrange: range
  };
}

function reduceChangeScrollrange(state, { payload: { vertical, horizontal } }) {
  return {
    ...state,
    verticalScrollrange: vertical,
    horizontalScrollrange: horizontal
  };
}

function reduceKeyDown(state, { payload: { key } }) {
  switch (key) {
    case KEY.ARROW_RIGHT: {
      return changeKeyRight(state);
    }
    case KEY.ARROW_LEFT: {
      return changeKeyLeft(state);
    }
    case KEY.ARROW_UP: {
      return changeKeyUp(state);
    }
    case KEY.ARROW_DOWN: {
      return changeKeyDown(state);
    }
    default:
      return state;
  }
}

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
    case actions.KEY_DOWN: {
      return reduceKeyDown(state, action);
    }
    default:
      return state;
  }
};

export default reducer;
