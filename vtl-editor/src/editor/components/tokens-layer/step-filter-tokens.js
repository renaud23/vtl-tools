import React, { useState, useContext, useEffect } from "react";
import { EditorContext } from "../../events";
import StepHRange from "./step-hrange";

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

const filteringUtilsTokens = lines => tokens => {
  const lStart = lines[0].start;
  const lStop = lines[lines.length - 1].stop;
  return tokens.filter(t => {
    if (t.start + t.value.length > lStart && t.stop < lStop) {
      return true;
    }
    return false;
  });
};

/**
 *
 * @param {*} lines
 * @param {*} tokens
 */
const fillLinesWithTokens = lines => tokens => {
  if (tokens.length && lines.length) {
    const tokensFiltered = filteringUtilsTokens(lines)(tokens);
    return lines.reduce(
      ({ stack, toks }, l) => {
        const [lineWithToken, tokensLeft] = consumeTokens(l, toks);

        return {
          stack: [...stack, lineWithToken],
          toks: tokensLeft
        };
      },
      { stack: [], toks: [...tokensFiltered] }
    ).stack;
  }
  return lines;
};

/**
 *
 * @param {*} lines
 * @param {*} hRange
 */

function StepFilterTokens({ lines }) {
  const { state } = useContext(EditorContext);
  const { tokens } = state;
  const [linesWithTokens, setLinesWithTokens] = useState([]);
  useEffect(() => {
    setLinesWithTokens(fillLinesWithTokens(lines)(tokens));
  }, [lines, tokens]);

  return <StepHRange lines={linesWithTokens} />;
}

export default StepFilterTokens;
