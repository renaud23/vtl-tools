import { getLineSeparator } from "../../../tools";

function computeSourceChange(state, char) {
  const { cursor, lines, maxLengthRow } = state;
  const { row, index } = cursor;
  const newLines = lines.map((l, i) =>
    i === row ? `${l.substr(0, index)}${char}${l.substr(index)}` : l
  );
  const source = newLines.join(getLineSeparator());
  return {
    ...state,
    lines: newLines,
    source,
    cursor: { row, index: index + 1 },
    maxLengthRow: Math.max(lines[row].length, maxLengthRow)
  };
}

function computeTokens(state, char) {
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

function changeInsertChar(state, char) {
  return computeTokens(computeSourceChange(state, char), char);
}

export default changeInsertChar;
