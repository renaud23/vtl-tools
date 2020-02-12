import {
  computeSourcePosition,
  updateState,
  orderingSelection
} from "../../../tools";

function indent(state, { shiftKey }) {
  // && value.startsWith("\t")
  const { anchor, extent, visibles, source } = state;
  const { first, last } = orderingSelection(anchor, extent);
  const nextSource = visibles.reduce((next, { row, start, value }) => {
    if (row >= first.row && row <= last.row) {
      console.log(shiftKey);
    }
    return next;
  }, source);

  return state;
}

function insertTab(state) {
  const { cursor, lines, source } = state;
  const [{ pos, index, row }] = computeSourcePosition(lines, cursor);
  const nextSource = `${source.substr(0, pos)}\t${source.substr(pos)}`;

  return {
    ...state,
    source: nextSource,
    waiting: true,
    post: { cursor: { row, index: index + 1 } }
  };
}

function changeKetTab(state, data) {
  const update = updateState(state);
  const { anchor, extent } = update;
  if (anchor && extent) {
    return indent(update, data);
  }
  return insertTab(update);
}

export default changeKetTab;
