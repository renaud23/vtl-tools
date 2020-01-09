import React, { useContext, useEffect, useState } from "react";
import Tokens from "./tokens-layer";
import Row from "./row";
import { EditorContext } from "../../events";
import { getLineSeparator } from "../../tools";

/**
 *
 * @param {*} i
 * @param {*} param1
 */
const isInRange = (i, { start, offset }) =>
  i >= start && i <= start + offset - 1;

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

const filterTokensOutoffHRange = line => hRange => {
  return line;
};

/**
 *
 * @param {*} lines
 * @param {*} tokens
 */
const fillLinesWithTokens = (lines, tokens, hRange) => {
  if (tokens.length) {
    return lines.reduce(
      ({ stack, toks }, l) => {
        const [lineWithToken, tokensLeft] = consumeTokens(l, toks);

        return {
          stack: [...stack, filterTokensOutoffHRange(lineWithToken)(hRange)],
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
 * @param {*} lines
 * @param {*} vRange
 * @param {*} tokens
 */
const getTokensLines = (lines, vRange, hRange, tokens) => {
  const visibles = lines.reduce(
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

  return fillLinesWithTokens(visibles, tokens, hRange);
};

function TokensContainer() {
  const { state } = useContext(EditorContext);
  const { verticalScrollrange, horizontalScrollrange, lines, tokens } = state;
  const [visibles, setVisibles] = useState([]);

  useEffect(() => {
    setVisibles(
      getTokensLines(lines, verticalScrollrange, horizontalScrollrange, tokens)
    );
  }, [lines, verticalScrollrange, horizontalScrollrange, tokens]);
  return (
    <Tokens>
      {visibles.map((line, i) => (
        <Row
          key={i}
          {...line}
          columnStart={horizontalScrollrange.start}
          columnStop={horizontalScrollrange.stop}
        />
      ))}
    </Tokens>
  );
}

export default TokensContainer;
