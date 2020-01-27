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
import { getRelativePos } from "../../../tools";

const MIN_TRACK_HEIGHT = 5;
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

  const quant = useCallback(
    trackHeight =>
      (parentHeight - trackHeight) / (lines.length + MARGIN - offset),
    [offset, lines, parentHeight]
  );

  const calc = useCallback(
    function(pos) {
      return Math.round(quant(trackHeight) * pos);
    },
    [quant, trackHeight]
  );

  const scrollTo = useCallback(
    function(y) {
      const nextStart = Math.min(
        Math.round(y / quant(trackHeight)),
        lines.length - offset + MARGIN
      );
      return {
        start: nextStart,
        stop: nextStart + offset - 1,
        offset
      };
    },
    [offset, quant, lines, trackHeight]
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
    setTrackTop(calc(start));
  }, [parentHeight, start, calc]);

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
      onMouseDown={e => {
        e.stopPropagation();
        const { y } = getRelativePos(parentEl.current)(e);
        setTrackTop(y);
        dispatch(actions.changeVerticalScrollrange(scrollTo(y)));
      }}
      ref={parentEl}
      onDrag={how => {
        if (lines.length > offset && how) {
          const next = Math.min(
            Math.max(trackTop + how, 0),
            parentHeight - trackHeight
          );
          setTrackTop(next);
          dispatch(actions.changeVerticalScrollrange(scrollTo(next)));
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
