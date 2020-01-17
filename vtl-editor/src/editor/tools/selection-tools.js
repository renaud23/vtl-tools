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
