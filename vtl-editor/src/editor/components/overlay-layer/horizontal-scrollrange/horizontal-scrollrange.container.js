import React, { useContext, useEffect, useState, useRef } from "react";

import HorizontalScrollrange from "./horizontal-scrollrange";
import { EditorContext, actions } from "../../../events";

function HorizontallScrollrangeContainer() {
  const { state, dispatch } = useContext(EditorContext);
  const { horizontalScrollrange: range = {}, maxLengthRow } = state;
  const { start, offset } = range;

  const [trackWidth, setTrackWidth] = useState(undefined);
  const [trackLeft, setTrackLeft] = useState(undefined);
  const [parentWidth, setParentWidth] = useState(0);
  const parentEl = useRef();
  useEffect(() => {
    if (parentEl.current) {
      const { width } = parentEl.current.getBoundingClientRect();
      if (maxLengthRow) {
        setTrackWidth(Math.round((offset / maxLengthRow) * width));
        setParentWidth(width);
      }
    }
  }, [parentEl, offset, maxLengthRow]);

  useEffect(() => {
    if (parentEl.current) {
      const { width } = parentEl.current.getBoundingClientRect();
      if (maxLengthRow) {
        setTrackLeft(Math.round((start / maxLengthRow) * width));
      }
    }
  }, [parentEl, start, maxLengthRow]);

  return (
    <HorizontalScrollrange
      trackWidth={trackWidth}
      trackLeft={trackLeft}
      ref={parentEl}
      onDrag={how => {
        const next = Math.min(
          Math.max(trackLeft + how, 0),
          parentWidth - trackWidth
        );
        const nextStart = Math.round((next / parentWidth) * maxLengthRow);
        dispatch(
          actions.changeHorizontalScrollrange({
            start: nextStart,
            stop: nextStart + offset - 1,
            offset
          })
        );
        // setTrackLeft(next);
      }}
    />
  );
}

export default HorizontallScrollrangeContainer;
