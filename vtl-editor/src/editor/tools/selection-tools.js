import { getLineSeparator } from "./split-lines";

/**
 *
 * @param {*} anchor
 * @param {*} extent
 */
export function orderingSelection(anchor, extent) {
  if (
    anchor.row > extent.row ||
    (anchor.row === extent.row && extent.index < anchor.index)
  ) {
    return { first: extent, last: anchor };
  }
  return { first: anchor, last: extent };
}

export function computeSourcePosition(lines, ...cursors) {
  return lines.reduce(
    (a, line, i) => {
      return a.map(c => {
        if (i < c.row) {
          return {
            ...c,
            pos: (c.pos || 0) + line.length + getLineSeparator().length
          };
        }
        if (c.row === i) {
          return { ...c, pos: (c.pos || 0) + c.index };
        }

        return c;
      });
    },
    [...cursors]
  );
}
