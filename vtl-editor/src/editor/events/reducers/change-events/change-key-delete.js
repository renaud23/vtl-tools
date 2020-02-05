import changeDeleteSelection from "./change-delete-selection";
import { computeSourcePosition } from "../../../tools";
import { getLineSeparator } from "../../../tools";
import { deleteFragment, appendTemporyChange } from "../source-events";

function changeKeyDelete(state) {
  const { anchor, extent, cursor, lines, source } = state;
  if (anchor && extent) {
    return changeDeleteSelection(state);
  }
  const [{ pos, row, index }] = computeSourcePosition(lines, cursor);
  if (pos < source.length) {
    const length = index === lines[row].length ? getLineSeparator().length : 1;
    const fragment =
      index === lines[row].length ? getLineSeparator() : source.charAt(pos);
    const nextSource = `${source.substr(0, pos)}${source.substr(pos + length)}`;
    const event = deleteFragment(pos, pos + length - 1, fragment);

    const next = {
      ...state,
      waiting: true,
      source: nextSource
    };
    return appendTemporyChange(next, event);
  }
  return state;
}

export default changeKeyDelete;
