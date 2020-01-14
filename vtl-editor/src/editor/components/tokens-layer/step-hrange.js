import React, { useState, useContext, useEffect } from "react";
import { EditorContext } from "../../events";
import TokensLayer from "./tokens-layer";

/**
 *
 * @param {*} hRange
 */
const filterLineTokens = hRange => line => {
  const tokenParts = line.tokens.reduce((a, t) => {
    const tStart = Math.max(t.start - line.start, 0);
    const tStop = Math.min(t.stop - line.start, line.value.length);
    const tWidth = tStop - tStart + 1;
    const min = Math.min(hRange.start, tStart);
    const max = Math.max(hRange.stop, tStop);

    if (max - min + 1 < hRange.offset + tWidth) {
      const posTok = Math.max(line.start - t.start, 0);
      const partStart = Math.max(hRange.start - tStart, posTok);
      const partLength = Math.min(tStop, hRange.stop) - tStart + 1;
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
  return lines.map(l => filter(l));
};

function StepHRange({ lines }) {
  const { state } = useContext(EditorContext);
  const { horizontalScrollrange } = state;
  const [linesFiltered, setLinesFiltered] = useState([]);
  useEffect(() => {
    setLinesFiltered(filterTokensWithVRange(lines)(horizontalScrollrange));
  }, [lines, horizontalScrollrange]);
  return <TokensLayer lines={linesFiltered} />;
}

export default StepHRange;
