import { getLineSeparator } from "../../../tools";

/**
 *
 * @param {*} i
 * @param {*} param1
 */
const isInRange = (i, { start, offset }) =>
  i >= start && i <= start + offset - 1;

/**
 *
 * @param {*} lines
 * @param {*} hRange
 */
const getVisibleLines = vRange => lines => {
  const { stack } = lines.reduce(
    ({ stack, next }, l, i) => ({
      stack: isInRange(i, vRange)
        ? [
            ...stack,
            {
              value: l,
              row: i,
              start: next,
              stop: next + Math.max(l.length - 1, 0),
              tokens: []
            }
          ]
        : stack,
      next: l.length + next + getLineSeparator().length
    }),
    { stack: [], next: 0 }
  );

  return stack;
};

const computeVisibleLines = state => {
  const { lines, verticalScrollrange } = state;
  return { ...state, visibles: getVisibleLines(verticalScrollrange)(lines) };
};

export default computeVisibleLines;
