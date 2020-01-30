import changeDeleteSelection from "./change-delete-selection";
import { computeSourcePosition } from "../../../tools";
import { getLineSeparator } from "../../../tools";

function changeKeyDelete(state) {
  const { anchor, extent, cursor, lines, source } = state;
  if (anchor && extent) {
    return changeDeleteSelection(state);
  }
  const [{ pos, row, index }] = computeSourcePosition(lines, cursor);
  if (pos < source.length) {
    const length = index === lines[row].length ? getLineSeparator().length : 1;
    const nextSource = `${source.substr(0, pos)}${source.substr(pos + length)}`;

    return {
      ...state,
      waiting: true,
      source: nextSource
    };
  }
  return state;
}

export default changeKeyDelete;
