import {
  getLineSeparator,
  computeSourcePosition,
  updateState
} from "../../../tools";
import { produceSourceEvent, insertFragment } from "../source-events";

function keyEnter(state) {
  const update = updateState(state);
  const { cursor, lines, source } = update;
  const [{ pos, row }] = computeSourcePosition(lines, cursor);
  const event = insertFragment(pos, getLineSeparator());

  const nextSource = `${source.substr(
    0,
    pos
  )}${getLineSeparator()}${source.substr(pos)}`;

  const next = {
    ...update,
    source: nextSource,
    waiting: true,
    post: { cursor: { row: row + 1, index: 0 } }
  };

  return produceSourceEvent(next, event);
}

export default keyEnter;
