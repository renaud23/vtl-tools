import React, { useContext, useState, useEffect } from "react";
import Highlights from "./highlights";
import { EditorContext } from "../../../events";

function filterHighlights(highlights, vRange, hRange, fm) {
  const visibles = highlights.reduce((a, h) => {
    const { row, index, length, label: title } = h;
    if (row >= vRange.start && row <= vRange.stop) {
      const min = Math.min(hRange.start, index);
      const max = Math.max(hRange.stop, index + length);

      if (max - min <= hRange.offset + length) {
        const top = (row - vRange.start) * fm.height;
        const left = (index - hRange.start) * fm.width;
        const width = length * fm.width;

        return [...a, { top, left, width, title }];
      }
    }
    return a;
  }, []);
  return visibles;
}

function HighlightsContainer() {
  const { state } = useContext(EditorContext);
  const {
    highlights,
    verticalScrollrange,
    horizontalScrollrange,
    fontMetric
  } = state;
  const [visibles, setVisibles] = useState([]);

  useEffect(() => {
    setVisibles(
      filterHighlights(
        highlights,
        verticalScrollrange,
        horizontalScrollrange,
        fontMetric
      )
    );
  }, [highlights, verticalScrollrange, horizontalScrollrange, fontMetric]);

  return <Highlights blocs={visibles} />;
}

export default HighlightsContainer;
