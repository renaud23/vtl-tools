import changeDeleteSelection from "./change-delete-selection";
import { computeSourcePosition } from "../../../tools";

function changeBackSpaceKey(state) {
  const { anchor, extent, cursor, lines, source } = state;
  if (anchor && extent) {
    return changeDeleteSelection(state);
  }
  const [{ pos }] = computeSourcePosition(lines, cursor);
  const { row, index } = cursor;
  if (pos > 0) {
    const nextSource = `${source.substr(0, pos - 1)}${source.substr(pos)}`;

    return {
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
  }
  return state;
}

export default changeBackSpaceKey;
