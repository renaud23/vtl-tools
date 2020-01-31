import {
  DELETE_FRAGMENT,
  INSERT_FRAGMENT
} from "../events/reducers/source-events";

function computeInsertFragment(source, diff) {
  const { pos, fragment } = diff;
  return `${source.substr(0, pos)}${fragment}${source.substr(pos)}`;
}

function computeDeleteFragment(source, diff) {
  const { start, stop } = diff;
  return `${source.substr(0, start)}${source.substr(stop)}`;
}

function computeDiff(source, diff) {
  return diff.reduce((src, one, i) => {
    const { type, payload } = one;
    switch (type) {
      case DELETE_FRAGMENT:
        return computeDeleteFragment(src, payload);
      case INSERT_FRAGMENT:
        return computeInsertFragment(src, payload);
      default:
        return src;
    }
  }, source);
}

const pushHistory = stack => events => {
  stack.push(events);
};

const logHistory = stack => () => console.log(stack);

const undo = (source, stack) => () => {
  const newSource = stack.reduce((src, diff, i) => {
    if (i < stack.length - 1) {
      return computeDiff(src, diff);
    }
    return src;
  }, source);

  stack.pop();
  return newSource;
};

function createHistoryManager(source) {
  const stack = [];

  return {
    pushHistory: pushHistory(stack),
    logHistory: logHistory(stack),
    undo: undo(source, stack)
  };
}

export default createHistoryManager;
