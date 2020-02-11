import { DELETE_FRAGMENT, INSERT_FRAGMENT } from "../source-events";
import { getCursor } from "../../../tools";

function reduceDeleteFragment(source, diff) {
  const { start, fragment } = diff;
  return `${source.substr(0, start)}${fragment}${source.substr(start)}`;
}

function reduceInsertFragment(source, diff) {
  const { start, stop } = diff;
  return `${source.substr(0, start)}${source.substr(stop + 1)}`;
}

function reduceDiff(source, diff) {
  const { type, payload } = diff;
  switch (type) {
    case DELETE_FRAGMENT:
      return reduceDeleteFragment(source, payload);
    case INSERT_FRAGMENT:
      return reduceInsertFragment(source, payload);
    default:
      return source;
  }
}

export function undo(state) {
  const { source, history } = state;
  if (history.length) {
    const nh = [...history];
    const last = nh.pop();
    const ns = last
      .reverse()
      .reduce((curr, diff) => reduceDiff(curr, diff), source);
    const cursor = getCursor(
      source,
      last.reduce((a, { payload: { start } }) => start, 0)
    );
    return { ...state, source: ns, history: nh, cursor };
  }

  return state;
}

function changeUndo(state) {
  const { history } = state;
  if (history.length) {
    return undo(state);
  }
  return state;
}

export default changeUndo;
