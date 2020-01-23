import {
  getLineSeparator,
  computeSourcePosition,
  updateState
} from "../../../tools";

function keyEnter(state) {
  const update = updateState(state);
  const { cursor, lines, source } = update;
  const [{ pos, row, index }] = computeSourcePosition(lines, cursor);
  const nextSource = `${source.substr(
    0,
    pos
  )}${getLineSeparator()}${source.substr(pos)}`;

  return {
    ...update,
    source: nextSource,
    waiting: true,
    post: { cursor: { row: row + 1, index: 0 } }
  };
}

export default keyEnter;
