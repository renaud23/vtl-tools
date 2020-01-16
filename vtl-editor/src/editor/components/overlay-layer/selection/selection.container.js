import React, { useContext, useEffect, useState } from "react";
import { EditorContext } from "../../../events";
import Selection from "./selection";

const MAX_LENGTH = 9999999;

const getBlocsOnMultiRowSelection = (first, last) => {
  const length = last.row - first.row + 1;
  const blocs = new Array(length).fill({}).map((_, i) => {
    if (i === 0) {
      return { row: first.row, index: first.index, length: MAX_LENGTH };
    }
    if (i === length - 1) {
      return { row: last.row, index: 0, length: last.index };
    }
    return { row: first.row + i, index: 0, length: MAX_LENGTH };
  });
  return blocs;
};

const getBlocsOnSingleRowSelection = (first, last) => [
  {
    row: first.row,
    index: first.index,
    length: last.index - first.index
  }
];

/** */
const getBlocs = (first, last) => {
  return first.row === last.row
    ? getBlocsOnSingleRowSelection(first, last)
    : getBlocsOnMultiRowSelection(first, last);
};

/**
 *
 * @param {*} hr
 * @param {*} vr
 */
const rangifyBlocs = (hr, vr) => blocs => {
  const visibles = blocs.reduce((a, bloc) => {
    const { index, row, length } = bloc;
    if (row >= vr.start && row <= vr.stop) {
      const range =
        Math.max(hr.stop, index + length) - Math.min(hr.start, index);
      if (range < hr.offset + length) {
        return [
          ...a,
          {
            row: row - vr.start,
            index: Math.max(index - hr.start, 0),
            length: Math.min(length, hr.offset)
          }
        ];
      }
    }

    return a;
  }, []);
  return visibles;
};

/**
 *
 * @param {*} anchor
 * @param {*} extent
 */
function orderingSelection(anchor, extent) {
  if (
    anchor.row > extent.row ||
    (anchor.row === extent.row && extent.index < anchor.index)
  ) {
    return { first: extent, last: anchor };
  }
  return { first: anchor, last: extent };
}

/**
 *
 * @param {*} blocs
 * @param {*} fontMetric
 */
const computeBlocs = (blocs, { width, height }) =>
  blocs.map(({ row, index, length }) => ({
    left: index * width,
    width: length * width,
    top: row * height
  }));

/* **/
function SelectionContainer() {
  const { state } = useContext(EditorContext);
  const {
    anchor,
    extent,
    horizontalScrollrange: hr,
    verticalScrollrange: vr,
    fontMetric,
    zIndex
  } = state;
  const [blocs, setBlocs] = useState([]);
  const [visibles, setVisibles] = useState([]);

  useEffect(() => {
    if (extent && anchor) {
      const { first, last } = orderingSelection(anchor, extent);
      setBlocs(getBlocs(first, last));
    } else {
      setBlocs([]);
    }
  }, [anchor, extent]);

  useEffect(() => {
    if (blocs.length) {
      setVisibles(rangifyBlocs(hr, vr)(blocs));
    }
  }, [blocs, hr, vr]);

  if (extent && anchor) {
    return (
      <Selection blocs={computeBlocs(visibles, fontMetric)} zIndex={zIndex} />
    );
  }
  return null;
}

export default SelectionContainer;
