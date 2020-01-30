import { computeSourcePosition, updateState } from "../../../tools";

function changeKetTab(state) {
  const update = updateState(state);
  const { cursor, lines, source } = update;
  const [{ pos, index, row }] = computeSourcePosition(lines, cursor);
  const nextSource = `${source.substr(0, pos)}\t${source.substr(pos)}`;

  return {
    ...update,
    source: nextSource,
    waiting: true,
    post: { cursor: { row, index: index + 1 } }
  };
}

export default changeKetTab;
