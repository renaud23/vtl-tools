import changeDeleteSelection from "./change-delete-selection";
import { computeSourcePosition } from "../../../tools";

function changeKeyDelete(state) {
  const { anchor, extent, cursor, lines, source } = state;
  if (anchor && extent) {
    return changeDeleteSelection(state);
  }
  const [{ pos }] = computeSourcePosition(lines, cursor);
  console.log(pos, source.length);
  if (pos < source.length - 1) {
    const nextSource = `${source.substr(0, pos)}${source.substr(pos + 1)}`;

    return {
      ...state,
      waiting: true,
      source: nextSource
    };
  }
  return state;
}

export default changeKeyDelete;
