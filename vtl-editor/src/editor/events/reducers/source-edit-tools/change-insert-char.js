import { getLineSeparator, computeSourcePosition } from "../../../tools";

function changeInsertChar(state, char) {
  const { source, lines, cursor } = state;
  const { row, index } = cursor;
  const [{ pos }] = computeSourcePosition(lines, cursor);

  return {
    ...state,
    source: `${source.substr(0, pos)}${char}${source.substr(pos)}`,
    post: { cursor: { row, index: index + 1 } },
    waiting: true
  };
}

export default changeInsertChar;
