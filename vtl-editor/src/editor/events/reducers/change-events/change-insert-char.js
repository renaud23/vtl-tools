import { computeSourcePosition, updateState } from "../../../tools";
import { produceSourceEvent, insertFragment } from "../source-events";

function changeInsertChar(state, char) {
  const update = updateState(state);
  const { source, lines, cursor } = update;
  const { row, index } = cursor;
  const [{ pos }] = computeSourcePosition(lines, cursor);
  const event = insertFragment(pos, char);

  const next = {
    ...state,
    source: `${source.substr(0, pos)}${char}${source.substr(pos)}`,
    post: { cursor: { row, index: index + 1 } },
    waiting: true
  };

  return produceSourceEvent(next, event);
}

export default changeInsertChar;
