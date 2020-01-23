import { computeSourcePosition, updateState } from "../../../tools";

function changeInsertChar(state, char) {
  const update = updateState(state);
  const { source, lines, cursor } = update;
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
