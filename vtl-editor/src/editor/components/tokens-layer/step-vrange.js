import React, { useState, useContext, useEffect } from "react";
import { EditorContext } from "../../events";
import { getLineSeparator } from "../../tools";
import StepFilterTokens from "./step-filter-tokens";

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
const getVisiblesLines = vRange => lines => {
  const l = lines.reduce(
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

  return l;
};

function StepVRange({ lines }) {
  const { state } = useContext(EditorContext);
  const { verticalScrollrange } = state;
  const [visibles, setVisibles] = useState([]);
  useEffect(() => {
    setVisibles(getVisiblesLines(verticalScrollrange)(lines));
  }, [lines, verticalScrollrange]);
  return <StepFilterTokens lines={visibles} />;
}

export default StepVRange;
