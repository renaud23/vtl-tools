import * as actions from "../actions";
import { changeDeleteSelection, changeInsertText } from "./change-events";
import { changeUndo } from "./change-events";

function reduceCut(state, action) {
  const next = changeDeleteSelection(state);
  return { ...next, waiting: true };
}

function reduceSelectAll(state, action) {
  const { lines } = state;
  const extent = {
    row: lines.length - 1,
    index: lines[lines.length - 1].length
  };
  return { ...state, anchor: { row: 0, index: 0 }, extent };
}

function reducePaste(state, { payload: { text } }) {
  if (text) {
    return changeInsertText(changeDeleteSelection(state), text);
  }
  return state;
}

/** */
function reducer(state, action) {
  if (action.type === actions.ON_KEY_SHORTCUT) {
    const {
      payload: { pattern }
    } = action;
    switch (pattern) {
      case "ctrl|a": {
        return reduceSelectAll(state, action);
      }
      case "ctrl|x": {
        return reduceCut(state, action);
      }
      case "ctrl|v": {
        return reducePaste(state, action);
      }
      case "ctrl|z": {
        return changeUndo(state, action);
      }
      default:
    }
  }

  return state;
}

export default reducer;
