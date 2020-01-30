import * as actions from "../actions";
import { updateState, computeSourcePosition } from "../../tools";
import { changeDeleteSelection } from "./change-events";

function reduceCut(state, action) {
  const next = updateState(changeDeleteSelection(state));

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
    const next = changeDeleteSelection(state);
    const { source, cursor, lines } = next;
    const [{ pos }] = computeSourcePosition(lines, cursor);
    const nextSource = `${source.substr(0, pos)}${text}$${source.substr(pos)}`;

    return { ...next, post: undefined, source: nextSource, highlights: [] };
  }
  return state;
}

/** */
const reducer = (state, action) => {
  if (action.type === actions.ON_KEY_SHORTCUT) {
    const {
      payload: { pattern }
    } = action;
    switch (pattern) {
      case "ctrl|a": {
        return reduceSelectAll(state, action);
      }
      case "ctrl|x":
        return reduceCut(state, action);
      case "ctrl|v":
        return reducePaste(state, action);
      default:
    }
  }

  return state;
};

export default reducer;
