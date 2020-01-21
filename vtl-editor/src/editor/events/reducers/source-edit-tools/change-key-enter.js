import { getLineSeparator, computeSourcePosition } from "../../../tools";

function computeSource(state) {
  const { source, lines, cursor } = state;
  if (!cursor) return state;
  const [{ row, pos }] = computeSourcePosition(lines, cursor);

  const newSource = `${source.substr(
    0,
    pos
  )}${getLineSeparator()}${source.substr(pos)}`;
  const newLines = newSource.split(getLineSeparator());

  return {
    ...state,
    source: newSource,
    lines: newLines,
    cursor: { row: row + 1, index: 0 }
  };
}

function computeTokens(state) {
  const { tokens } = state;

  return { ...state, tokens };
}

function keyEnter(state) {
  return computeTokens(computeSource(state));
}

export default keyEnter;
