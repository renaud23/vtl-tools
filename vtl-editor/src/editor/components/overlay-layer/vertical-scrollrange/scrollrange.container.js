import React, { useContext, useEffect, useState, useRef } from "react";

import VerticalScrollrange from "./scrollrange";
import { EditorContext, actions } from "../../../events";

function VerticalScrollrangeContainer() {
  const { state, dispatch } = useContext(EditorContext);
  const { verticalScrollrange: range = {}, lines } = state;
  const { start, offset } = range;

  const [trackHeight, setTrackHeight] = useState(undefined);
  const [trackTop, setTrackTop] = useState(undefined);
  const [parentHeight, setParentHeight] = useState(0);
  const parentEl = useRef();
  const margin = 0;

  useEffect(() => {
    if (parentEl.current && lines.length > offset) {
      const { height } = parentEl.current.getBoundingClientRect();
      setTrackHeight(
        Math.max(Math.round((offset / (lines.length + margin)) * height), 15)
      );
      setParentHeight(height);
    }
  }, [parentEl, offset, lines]);

  useEffect(() => {
    if (parentEl.current && lines.length) {
      const { height } = parentEl.current.getBoundingClientRect();
      setTrackTop(Math.round((start / (lines.length + margin)) * height));
    }
  }, [parentEl, start, lines]);

  return (
    <VerticalScrollrange
      trackHeight={trackHeight}
      trackTop={trackTop}
      ref={parentEl}
      onDrag={how => {
        if (lines.length > offset) {
          const next = Math.min(
            Math.max(trackTop + how, 0),
            parentHeight - trackHeight
          );
          const nextStart = Math.round(
            (next / parentHeight) * (lines.length + margin)
          );
          setTrackTop(next);
          dispatch(
            actions.changeVerticalScrollrange({
              start: nextStart,
              stop: nextStart + offset - 1,
              offset
            })
          );
        }
      }}
    />
  );
}

export default VerticalScrollrangeContainer;
