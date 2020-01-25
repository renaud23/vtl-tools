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

const MIN_TRACK_HEIGHT = 15;
const MARGIN = 10;

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
  const [trackHeight, setTrackHeight] = useState(0);
  const [selection, setSelection] = useState(undefined);
  const [cursorPosition, setCursorPosition] = useState(undefined);
  const [trackTop, setTrackTop] = useState(0);
  const [parentHeight, setParentHeight] = useState(0);

  const calc = useCallback(
    function(pos) {
      return Math.round(
        ((parentHeight - trackHeight) / (lines.length + MARGIN)) * pos
      );
    },
    [parentHeight, trackHeight, lines.length]
  );

  const parentEl = useRef();

  useEffect(() => {
    if (parentEl.current && lines.length > offset) {
      const { height } = parentEl.current.getBoundingClientRect();
      setTrackHeight(
        Math.max(
          Math.round((height / (lines.length + MARGIN)) * offset),
          MIN_TRACK_HEIGHT
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
        Math.round(
          ((parentHeight - trackHeight) / (lines.length + MARGIN - offset)) *
            start
        )
      );
    }
  }, [parentHeight, start, lines, trackHeight, offset]);

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
            Math.round(
              next /
                ((parentHeight - trackHeight) /
                  (lines.length + MARGIN - offset))
            ),
            lines.length - offset + MARGIN
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
