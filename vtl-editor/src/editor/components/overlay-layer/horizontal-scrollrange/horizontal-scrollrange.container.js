import React, { useContext, useEffect, useState, useRef } from "react";

import HorizontalScrollrange from "./horizontal-scrollrange";
import { EditorContext, actions } from "../../../events";

const LEFT_BORDER_MARGIN = 2; // in char

function HorizontallScrollrangeContainer() {
  const { state, dispatch } = useContext(EditorContext);
  const { horizontalScrollrange: range = {}, maxLengthRow } = state;
  const { start, offset } = range;
  const [limite, setLimite] = useState(0);
  const [trackWidth, setTrackWidth] = useState(0);
  const [trackLeft, setTrackLeft] = useState(0);
  const [parentWidth, setParentWidth] = useState(0);
  const parentEl = useRef();
  useEffect(() => {
    if (parentEl.current) {
      const { width } = parentEl.current.getBoundingClientRect();
      if (maxLengthRow) {
        setTrackWidth(
          Math.round((offset / (maxLengthRow + LEFT_BORDER_MARGIN)) * width)
        );
        setParentWidth(width);
      }
    }
  }, [parentEl, offset, maxLengthRow]);

  useEffect(() => {
    if (parentEl.current) {
      const { width } = parentEl.current.getBoundingClientRect();
      if (maxLengthRow) {
        setTrackLeft(
          Math.round(
            (start / (maxLengthRow + LEFT_BORDER_MARGIN - offset)) *
              (width - trackWidth)
          )
        );
      }
    }
  }, [parentEl, start, maxLengthRow, offset, trackWidth]);

  useEffect(() => {
    setLimite(parentWidth - trackWidth);
  }, [parentWidth, trackWidth]);

  return (
    <HorizontalScrollrange
      trackWidth={trackWidth}
      trackLeft={trackLeft}
      ref={parentEl}
      onDrag={how => {
        const next = Math.min(Math.max(trackLeft + how, 0), limite);
        const nextStart = Math.round(
          (next / limite) * (maxLengthRow + LEFT_BORDER_MARGIN - offset)
        );
        dispatch(
          actions.changeHorizontalScrollrange({
            start: nextStart,
            stop: nextStart + offset - 1,
            offset
          })
        );
        setTrackLeft(next);
      }}
    />
  );
}

export default HorizontallScrollrangeContainer;
