const pushHistory = stack => events => {
  stack.push(events);
};

const logHistory = stack => () => console.log(stack);

const replayExceptLast = (source, stack) => () => {
  return source;
};

function createHistoryManager(source) {
  const stack = [];

  return {
    pushHistory: pushHistory(stack),
    logHistory: logHistory(stack),
    replayExceptLast: replayExceptLast(source, stack)
  };
}

export default createHistoryManager;
