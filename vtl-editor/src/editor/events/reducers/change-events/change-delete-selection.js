import { computeSourcePosition, orderingSelection } from "../../../tools";
import { deleteFragment, appendTemporyChange } from "../source-events";

function changeDeleteSelection(state) {
  const { anchor, extent, lines, source } = state;
  if (!anchor || !extent) return state;
  const { first, last } = orderingSelection(anchor, extent);
  const [{ pos: start }, { pos: stop }] = computeSourcePosition(
    lines,
    first,
    last
  );

  const event = deleteFragment(
    start,
    stop - 1,
    source.substr(start, stop - start)
  );

  const nextSource = `${source.substr(0, start)}${source.substr(stop)}`;
  const next = {
    ...state,
    source: nextSource,
    anchor: undefined,
    extent: undefined,
    cursor: first
    // post: { cursor: first }
  };

  return appendTemporyChange(next, event);
}

export default changeDeleteSelection;
