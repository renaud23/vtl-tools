import { DELETE_FRAGMENT, INSERT_FRAGMENT } from "../source-events";
import { getLineSeparator } from "../../../tools/split-lines";

function computeInsertFragment(source, diff) {
  const { start, fragment } = diff;
  return `${source.substr(0, start)}${fragment}${source.substr(start)}`;
}

function computeDeleteFragment(source, diff) {
  const { start, stop } = diff;
  return `${source.substr(0, start)}${source.substr(stop + 1)}`;
}

function computeDiff(origin, diff) {
  const next = diff.reduce((source, one, i) => {
    const { type, payload } = one;
    switch (type) {
      case DELETE_FRAGMENT:
        return computeDeleteFragment(source, payload);
      case INSERT_FRAGMENT:
        return computeInsertFragment(source, payload);
      default:
        return source;
    }
  }, origin);

  return next;
}

function getCursor(source, pos) {
  return source.split(getLineSeparator()).reduce(
    ({ row, index, acc }, l, i) => {
      const nextAcc = acc + l.length + getLineSeparator().length;
      if (acc && pos >= acc && pos <= nextAcc) {
        return { row: i, index: pos - acc };
      }
      return { row, index, acc: nextAcc };
    },
    { row: 0, index: 0, acc: 0 }
  );
}

export function undo(state) {
  const { origin, history } = state;
  const source = history.reduce((current, diff, i) => {
    if (i < history.length - 1) {
      return computeDiff(current, diff);
    }
    return current;
  }, origin);

  const nextHistory = [...history];
  const omitted = nextHistory.pop();

  const { row, index } = getCursor(
    source,
    omitted.reduce((a, { payload: { start } }) => start, 0)
  );

  const next = {
    ...state,
    source,
    history: nextHistory,
    cursor: { row, index }
  };

  return next;
}

function changeUndo(state) {
  const { history } = state;
  if (history.length) {
    return undo(state);
  }
  return state;
}

export default changeUndo;
