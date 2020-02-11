import { DELETE_FRAGMENT, INSERT_FRAGMENT } from "../source-events";

function alterDeleteFragment(tokens, change, state) {
  return tokens;
}

export function alterInsertFragment(tokens, change, state) {
  const { start, stop, fragment } = change;
  const length = stop - start + 1;

  const ns = tokens.map(t => {
    if (start >= t.start && start <= t.stop) {
      return {
        ...t,
        start: t.start,
        stop: t.stop + length,
        value: `${t.value.substr(
          0,
          start - t.start
        )}${fragment}${t.value.substr(start - t.start)}`
      };
    }
    if (start < t.start) {
      return {
        ...t,
        start: t.start + length,
        stop: t.stop + length
      };
    }
    return t;
  });

  return ns;
}

export function alterTokens(state, temporyChanges) {
  const { tokens } = state;

  const ns = temporyChanges.reduce(
    (curr, change) => {
      const { type, payload } = change;
      switch (type) {
        case DELETE_FRAGMENT:
          return alterDeleteFragment(curr, payload, state);
        case INSERT_FRAGMENT:
          return alterInsertFragment(curr, payload, state);
        default:
          return curr;
      }
    },
    [...tokens]
  );
  //   console.log(ns);
  return ns;
}
