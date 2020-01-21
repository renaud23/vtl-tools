import {
  orderingSelection,
  computeSourcePosition,
  mergeLine
} from "../../../tools";
import { validateVisibleLines } from "../state-validator";

function computeSource(state, first, last) {
  const { lines } = state;

  const nl = lines.reduce((a, l, i) => {
    if (i < first.row || i > last.row) {
      return [...a, l];
    }
    if (i === first.row && last.row !== first.row) {
      return [
        ...a,
        `${l.substr(0, first.index)}${lines[last.row].substr(last.index)}`
      ];
    }

    if (i === first.row && last.row === first.row) {
      return [...a, `${l.substr(0, first.index)}${l.substr(last.index)}`];
    }

    return a;
  }, []);
  const ns = mergeLine(nl);
  return {
    ...state,
    lines: nl,
    source: ns,
    cursor: first,
    anchor: undefined,
    extent: undefined
  };
}

function filteringTokens(tokens, first, last) {
  const { rest } = tokens.reduce(
    ({ rest, how }, t) => {
      const { start, stop } = t;

      if (start >= first.pos && stop < last.pos) {
        return { rest, how: how + t.value.length };
      }
      if (first.pos >= start && first.pos <= stop) {
        const value = t.value.substr(0, first.pos - start);
        return {
          rest: [
            ...rest,
            {
              ...t,
              value,
              start,
              stop: first.pos - 1
            }
          ],
          how: how + t.value.length - value.length
        };
      }

      if (last.pos >= start && last.pos < stop) {
        const value = t.value.substr(last.pos - start);
        return {
          rest: [
            ...rest,
            {
              ...t,
              value,
              start: first.pos,
              stop: first.pos + value.length - 1
            }
          ],
          how: how + t.value.length - value.length
        };
      }

      return {
        rest: [...rest, { ...t, start: start - how, stop: stop - how }],
        how
      };
    },
    { rest: [], how: 0 }
  );
  return rest;
}

function computeTokens(state, first, last) {
  const { tokens } = state;

  return { ...state, tokens: filteringTokens(tokens, first, last) };
}

function changeDeleteSelection(state) {
  const { anchor, extent, lines } = state;
  if (!anchor || !extent) {
    return state;
  }
  const { first, last } = orderingSelection(anchor, extent);
  const [firstEx, lastEx] = computeSourcePosition(lines, first, last);

  return validateVisibleLines(
    computeTokens(computeSource(state, first, last), firstEx, lastEx)
  );
}

export default changeDeleteSelection;
