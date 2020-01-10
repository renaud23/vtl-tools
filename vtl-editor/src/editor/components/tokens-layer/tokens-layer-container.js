import React, { useContext, useEffect, useState } from "react";
import TokensLayer from "./tokens-layer";
import { EditorContext } from "../../events";
import { getLineSeparator } from "../../tools";

/**
 *
 * @param {*} l
 * @param {*} tokens
 */
const consumeTokens = (l, tokens) => {
  const [t, ...rest] = tokens;
  if (t) {
    if (t.stop < l.start) {
      return consumeTokens(l, rest);
    }
    const min = Math.min(l.start, t.start);
    const max = Math.max(l.stop, t.stop);
    const limite = l.stop - l.start + t.stop - t.start;
    if (max - min <= limite) {
      const nl = { ...l, tokens: [...l.tokens, t] };
      if (t.stop === l.stop) {
        return [nl, rest];
      }
      if (t.stop > l.stop) {
        return [nl, tokens];
      }
      if (t.stop < l.stop) {
        return consumeTokens(nl, rest);
      }
    }

    return [l, rest];
  }

  return [l, rest];
};

/**
 *
 * @param {*} lines
 * @param {*} tokens
 */
const fillLinesWithTokens = lines => tokens => {
  if (tokens.length) {
    return lines.reduce(
      ({ stack, toks }, l) => {
        const [lineWithToken, tokensLeft] = consumeTokens(l, toks);

        return {
          stack: [...stack, lineWithToken],
          toks: tokensLeft
        };
      },
      { stack: [], toks: [...tokens] }
    ).stack;
  }
  return lines;
};

/**
 *
 * @param {*} i
 * @param {*} param1
 */
const isInRange = (i, { start, offset }) =>
  i >= start && i <= start + offset - 1;

/**
 *
 * @param {*} lines
 * @param {*} hRange
 */
const getVisiblesLines = vRange => lines =>
  lines.reduce(
    ({ stack, next }, l, i) => ({
      stack: isInRange(i, vRange)
        ? [
            ...stack,
            {
              value: l,
              start: next,
              stop: next + l.length - 1,
              tokens: []
            }
          ]
        : stack,
      next: l.length + next + getLineSeparator().length
    }),
    { stack: [], next: 0 }
  ).stack;

/**
 *
 * @param {*} lines
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
      const partStart = Math.max(hRange.start - tStart, 0);
      const partLength = Math.min(
        hRange.stop - partStart + 1,
        tStop - partStart + 1
      );
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

/* ************ */
function StepHRange({ lines }) {
  const { state } = useContext(EditorContext);
  const { horizontalScrollrange } = state;
  const [linesFiltered, setLinesFiltered] = useState([]);
  useEffect(() => {
    setLinesFiltered(filterTokensWithVRange(lines)(horizontalScrollrange));
  }, [lines, horizontalScrollrange]);
  return <TokensLayer lines={linesFiltered} />;
}

function StepFilterTokens({ lines }) {
  const { state } = useContext(EditorContext);
  const { tokens } = state;
  const [linesWithTokens, setLinesWithTokens] = useState([]);
  useEffect(() => {
    setLinesWithTokens(fillLinesWithTokens(lines)(tokens));
  }, [lines, tokens]);

  return <StepHRange lines={linesWithTokens} />;
}

function StepVRange({ lines }) {
  const { state } = useContext(EditorContext);
  const { verticalScrollrange } = state;
  const [visibles, setVisibles] = useState([]);
  useEffect(() => {
    setVisibles(getVisiblesLines(verticalScrollrange)(lines));
  }, [lines, verticalScrollrange]);
  return <StepFilterTokens lines={visibles} />;
}

function TokensContainer() {
  const { state } = useContext(EditorContext);
  const { lines } = state;
  return <StepVRange lines={lines} />;
}

export default TokensContainer;
