import * as actions from "../actions";
import { validateScrollrange, validateVisibleLines } from "./state-validator";
import {
  changeKeyRight,
  changeKeyLeft,
  changeKeyUp,
  changeKeyDown,
  changeKeyHome,
  changeKeyEnd,
  changeKeyPageUp,
  changeKeyPageDown,
  changeOnWheelUp,
  changeOnWheelDown
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

function reduceKeyDown(state, { payload: { key, data } }) {
  switch (key) {
    case KEY.ARROW_RIGHT: {
      return changeKeyRight(state, data);
    }
    case KEY.ARROW_LEFT: {
      return changeKeyLeft(state, data);
    }
    case KEY.ARROW_UP: {
      return changeKeyUp(state, data);
    }
    case KEY.ARROW_DOWN: {
      return changeKeyDown(state, data);
    }
    case KEY.HOME: {
      return changeKeyHome(state, data);
    }
    case KEY.END: {
      return changeKeyEnd(state, data);
    }
    case KEY.PAGE_UP: {
      return changeKeyPageUp(state, data);
    }
    case KEY.PAGE_DOWN: {
      return changeKeyPageDown(state, data);
    }

    default:
      return state;
  }
}

const reduceSetOnChange = (state, { payload: { onChange } }) => ({
  ...state,
  onChange
});

const reduceSetCursor = (state, { payload: { row, index } }) => {
  return {
    ...state,
    cursor:
      row !== undefined && index !== undefined ? { row, index } : undefined
  };
};

const reduceSetHistory = (state, { payload: { history } }) => ({
  ...state,
  history
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
    case actions.KEY_DOWN: {
      return validateVisibleLines(
        validateScrollrange(reduceKeyDown(state, action))
      );
    }
    case actions.ON_WHEEL_UP: {
      return validateVisibleLines(changeOnWheelUp(state, action));
    }
    case actions.ON_WHEEL_DOWN: {
      return validateVisibleLines(changeOnWheelDown(state, action));
    }
    case actions.SET_ON_CHANGE: {
      return reduceSetOnChange(state, action);
    }
    case actions.SET_CURSOR: {
      return reduceSetCursor(state, action);
    }
    case actions.setHistory: {
      return reduceSetHistory(state, action);
    }
    default:
      return state;
  }
};

export default reducer;
