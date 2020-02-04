import changeDeleteSelection from "./change-delete-selection";
import { computeSourcePosition, getLineSeparator } from "../../../tools";
import { deleteFragment, appendTemporyChange } from "../source-events";

function changeBackSpaceKey(state) {
  const { anchor, extent, cursor, lines, source } = state;
  if (anchor && extent) {
    return changeDeleteSelection(state);
  }
  const [{ pos }] = computeSourcePosition(lines, cursor);
  if (pos > 0) {
    const { row, index } = cursor;
    const length = index ? 1 : getLineSeparator().length;
    const nextSource = `${source.substr(0, pos - length)}${source.substr(pos)}`;
    const event = deleteFragment(pos - length, pos - 1);
    const next = {
      ...state,
      source: nextSource,
      waiting: true,
      post: {
        cursor: {
          row: Math.max(0, index === 0 ? row - 1 : row),
          index: index === 0 ? lines[row - 1].length : index - 1
        }
      }
    };
    return appendTemporyChange(next, event);
  }
  return state;
}

export default changeBackSpaceKey;
