import { computeSourcePosition, updateState } from "../../../tools";
import { insertFragment, appendTemporyChange } from "../source-events";

function changeInsertChar(state, char) {
  const update = updateState(state);
  const { source, lines, cursor } = update;
  const { row, index } = cursor;
  const [{ pos }] = computeSourcePosition(lines, cursor);
  const nextCursor = { row, index: index + 1 };
  const event = insertFragment(pos, char);

  const next = {
    ...state,
    source: `${source.substr(0, pos)}${char}${source.substr(pos)}`,
    post: { cursor: nextCursor },
    waiting: true
  };

  return appendTemporyChange(next, event);
}

export default changeInsertChar;
