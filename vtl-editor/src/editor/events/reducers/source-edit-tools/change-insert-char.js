import { getLineSeparator } from "../../../tools";

export function changeInsertChar(state, char) {
  const { tokens, cursor, lines } = state;
  const { row, index } = cursor;

  const pos = lines.reduce((a, l, i) => {
    if (i < row) {
      return a + l.length + getLineSeparator().length;
    }
    if (i === row) {
      return a + index - 1;
    }
    return a;
  }, 0);

  const nl = tokens.map(t => {
    const { start, stop, value } = t;
    if (pos >= start && pos <= stop) {
      return {
        ...t,
        stop: stop + 1,
        value: `${value.substr(0, pos - start)}${char}${value.substr(
          pos - start
        )}`
      };
    }
    if (pos < start) {
      return { ...t, stop: stop + 1, start: start + 1 };
    }
    return t;
  });

  return { ...state, tokens: nl };
}
