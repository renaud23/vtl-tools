import React, { useState, useEffect } from "react";
import TokensLayer from "./tokens-layer";

/**
 *
 * @param {*} hRange
 */
const filterLineTokens = hRange => line => {
  const tokenParts = line.tokens.reduce((a, t) => {
    const tStart = Math.max(t.start - line.start, 0);
    const tStop = Math.min(t.stop - line.start, line.value.length - 1);
    const tWidth = tStop - tStart + 1;
    const min = Math.min(hRange.start, tStart);
    const max = Math.max(hRange.stop, tStop);

    if (max - min + 1 < hRange.offset + tWidth) {
      const posTok = Math.max(line.start - t.start, 0);
      const partStart = Math.max(posTok + hRange.start - tStart, posTok);
      const partLength =
        Math.min(tStop, hRange.stop) - Math.max(hRange.start, tStart) + 1;

      return [
        ...a,
        {
          ...t,
          value: t.value.substr(partStart, partLength)
        }
      ];
    }
    return a;
  }, []);

  return { ...line, tokenParts };
};

/**
 *
 * @param {*} lines
 * @param {*} hRange
 */
const filterTokensWithVRange = lines => hRange => {
  const filter = filterLineTokens(hRange);
  return lines.map(filter);
};

function StepHRange({ visibles, horizontalScrollrange }) {
  const [linesFiltered, setLinesFiltered] = useState([]);
  useEffect(() => {
    setLinesFiltered(filterTokensWithVRange(visibles)(horizontalScrollrange));
  }, [visibles, horizontalScrollrange]);
  return <TokensLayer lines={linesFiltered} />;
}

export default React.memo(StepHRange);
