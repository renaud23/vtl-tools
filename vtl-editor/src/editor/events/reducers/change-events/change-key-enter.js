import { getLineSeparator, computeSourcePosition } from "../../../tools";
import { insertFragment, appendTemporyChange } from "../source-events";

function keyEnter(state) {
  const { cursor, lines, source } = state;
  const [{ pos, row }] = computeSourcePosition(lines, cursor);
  const event = insertFragment(
    pos,
    pos + getLineSeparator().length - 1,
    getLineSeparator()
  );

  const nextSource = `${source.substr(
    0,
    pos
  )}${getLineSeparator()}${source.substr(pos)}`;

  const next = {
    ...state,
    source: nextSource,
    waiting: true,
    post: { cursor: { row: row + 1, index: 0 } }
  };

  return appendTemporyChange(next, event);
}

export default keyEnter;
