import { computeSourcePosition, getLineSeparator } from "../../../tools";
import { insertFragment, appendTemporyChange } from "../source-events";

function changeInsertText(state, text) {
  const { source, lines, cursor } = state;
  const { row, index } = cursor;
  const [{ pos }] = computeSourcePosition(lines, cursor);
  const tmp = text.split(getLineSeparator());
  const nextCursor = {
    row: row + Math.max(tmp.length - 1, 0),
    index:
      tmp.length > 1
        ? tmp[tmp.length - 1].length
        : index + tmp[tmp.length - 1].length
  };
  const event = insertFragment(pos, pos + text.length - 1, text);
  const nextSource = `${source.substr(0, pos)}${text}${source.substr(pos)}`;
  const next = {
    ...state,
    source: nextSource,
    post: { cursor: nextCursor },
    waiting: true
  };

  return appendTemporyChange(next, event);
}

export default changeInsertText;
