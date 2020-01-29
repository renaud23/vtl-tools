import * as actions from "../actions";
import { changeDoubleClick } from "./change-events";
import { validateClearHighlights } from "./state-validator";

/** */
const reducer = (state, action) => {
  switch (action.type) {
    case actions.CHAR_DOWN:
    case actions.MOUSE_DOWN:
    case actions.KEY_DOWN: {
      return validateClearHighlights(state);
    }
    case actions.DOUBLE_CLICK: {
      return changeDoubleClick(state);
    }

    default:
      return state;
  }
};

export default reducer;
