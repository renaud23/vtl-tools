import {
  DELETE_FRAGMENT,
  INSERT_FRAGMENT
} from "../events/reducers/source-events";
import { getLineSeparator } from "./split-lines";

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

const pushHistory = stack => events => {
  stack.push(events);
};

const logHistory = stack => () => console.log(stack);

const isChanges = stack => () => stack.length > 0;

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

const undo = (origin, stack) => () => {
  if (stack.length) {
    const source = stack.reduce((next, diff, i) => {
      if (i < stack.length - 1) {
        return computeDiff(next, diff);
      }
      return next;
    }, origin);

    const last = stack.pop();

    const { row, index } = getCursor(
      origin,
      last.reduce((a, { payload: { start } }) => start, 0)
    );

    return { source, cursor: { row, index } };
  }
  return { source: origin };
};

function createHistoryManager(source) {
  const stack = [];

  return {
    pushHistory: pushHistory(stack),
    logHistory: logHistory(stack),
    isChanges: isChanges(stack),
    undo: undo(source, stack)
  };
}

export default createHistoryManager;
