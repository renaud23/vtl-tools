import React, {
  useContext,
  useEffect,
  useState,
  useRef,
  useCallback
} from "react";

import VerticalScrollrange from "./scrollrange";
import { EditorContext, actions } from "../../../events";
import SelectionView from "./selection-view";
import SelectionCursor from "./selection-cursor";

function VerticalScrollrangeContainer() {
  const { state, dispatch } = useContext(EditorContext);
  const {
    verticalScrollrange: range = {},
    lines,
    cursor,
    zIndex,
    anchor,
    extent
  } = state;
  const { start, offset } = range;
  const margin = 10;
  const [trackHeight, setTrackHeight] = useState(0);
  const [selection, setSelection] = useState(undefined);
  const [cursorPosition, setCursorPosition] = useState(undefined);
  const [trackTop, setTrackTop] = useState(0);
  const [parentHeight, setParentHeight] = useState(0);

  const calc = useCallback(
    function(pos) {
      return Math.round(
        ((parentHeight - trackHeight) / (lines.length + margin)) * pos
      );
    },
    [parentHeight, trackHeight, lines.length, margin]
  );

  const parentEl = useRef();

  useEffect(() => {
    if (parentEl.current && lines.length > offset) {
      const { height } = parentEl.current.getBoundingClientRect();
      setTrackHeight(
        Math.max(
          Math.round(((height - 15) / (lines.length + margin)) * offset),
          15
        )
      );
      setParentHeight(height);
    } else {
      setTrackHeight(0);
    }
  }, [parentEl, offset, lines]);

  useEffect(() => {
    if (parentHeight) {
      setTrackTop(
        Math.round(((parentHeight - 15) / (lines.length + 10)) * start)
      );
    }
  }, [parentHeight, start, lines, trackHeight]);

  useEffect(() => {
    if (anchor && extent) {
      const selHeigh = calc(Math.abs(extent.row - anchor.row));
      const selTop = calc(Math.min(extent.row, anchor.row));
      setSelection({ top: selTop, height: selHeigh });
    } else {
      setSelection(undefined);
    }
  }, [extent, anchor, calc]);

  useEffect(() => {
    if (cursor) {
      setCursorPosition(calc(cursor.row));
    } else {
      setCursorPosition(undefined);
    }
  }, [calc, cursor]);

  return (
    <VerticalScrollrange
      zIndex={zIndex}
      trackHeight={trackHeight}
      trackTop={trackTop}
      ref={parentEl}
      onDrag={how => {
        if (lines.length > offset && how) {
          const next = Math.min(
            Math.max(trackTop + how, 0),
            parentHeight - trackHeight
          );
          const nextStart = Math.min(
            Math.round(next / ((parentHeight - 15) / (lines.length + margin))),
            lines.length - offset + margin
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
    >
      <SelectionView display={selection !== undefined} {...selection} />
      <SelectionCursor
        display={cursorPosition !== undefined}
        top={cursorPosition}
      />
    </VerticalScrollrange>
  );
}

export default VerticalScrollrangeContainer;
