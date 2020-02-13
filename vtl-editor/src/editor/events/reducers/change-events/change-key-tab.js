import { computeSourcePosition, orderingSelection } from "../../../tools";

function moveRight(pos) {
  return { ...pos, index: pos.index + 1 };
}

function moveLeft(pos) {
  return { ...pos, index: Math.max(pos.index - 1, 0) };
}

function more(stack, line, extent, anchor, cursor) {
  const { next, na, ne, nc, n } = stack;
  const { row, start } = line;
  return {
    next: `${next.substr(0, start + n)}\t${next.substr(start + n)}`,
    na: row === anchor.row ? moveRight(anchor) : na,
    ne: row === extent.row ? moveRight(extent) : ne,
    nc: row === cursor.row ? moveRight(cursor) : nc,
    n: n + 1
  };
}

function less(stack, line, extent, anchor, cursor) {
  const { next, na, ne, nc, n } = stack;
  const { row, start, value } = line;
  const is = value.startsWith("\t");

  if (is) {
    const ns = `${next.substr(0, start + n)}${next.substr(start + 1 + n)}`;
    const nna = row === anchor.row && is ? moveLeft(anchor) : na;
    const nne = row === extent.row ? moveLeft(extent) : ne;
    const nnc = row === cursor.row ? moveLeft(cursor) : nc;
    return {
      next: ns,
      na: nna,
      ne: nne,
      nc: nnc,
      n: n - 1
    };
  }
  return stack;
}

function indent(state, { shiftKey }) {
  const { anchor, extent, visibles, source, cursor } = state;
  const { first, last } = orderingSelection(anchor, extent);

  const { next, na, ne, nc } = visibles.reduce(
    (a, line) => {
      const { row } = line;
      if (row >= first.row && row <= last.row) {
        if (shiftKey) {
          return less(a, line, extent, anchor, cursor);
        } else {
          return more(a, line, extent, anchor, cursor);
        }
      }
      return a;
    },
    { next: source, na: anchor, ne: extent, nc: cursor, n: 0 }
  );
  // const nextAnchor = { ...anchor, index: anchor.index + 1 };
  // const nextExtent = { ...extent, index: extent.index + 1 };
  // const nextCursor = { ...cursor, index: cursor.index + 1 };

  return {
    ...state,
    source: next,
    anchor: na,
    extent: ne,
    cursor: nc
  };
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
  const { anchor, extent } = state;
  if (anchor && extent) {
    return indent(state, data);
  }
  return insertTab(state);
}

export default changeKetTab;
