import { computeSourcePosition, orderingSelection } from "../../../tools";

function changeDeleteSelection(state) {
  const { anchor, extent, lines, source } = state;
  if (!anchor || !extent) return state;
  const { first, last } = orderingSelection(anchor, extent);
  const [{ pos: start }, { pos: stop }] = computeSourcePosition(
    lines,
    first,
    last
  );

  const nextSource = `${source.substr(0, start)}${source.substr(stop)}`;
  return {
    ...state,
    source: nextSource,
    anchor: undefined,
    extent: undefined,
    post: { cursor: first }
  };
}

export default changeDeleteSelection;
