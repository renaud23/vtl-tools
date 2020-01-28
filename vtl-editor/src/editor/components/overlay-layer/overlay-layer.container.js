import React, { useRef, useContext, useEffect, useState } from "react";
import Overlay from "./overlay-layer";
import useInterval from "use-interval";
import {
  EditorContext,
  actions,
  createKeydownCallback,
  createOnWheelCallback
} from "../../events";
import { getRelativePos } from "../../tools";
import HorizontalScrollrange from "./horizontal-scrollrange";
import VerticalScrollrange from "./vertical-scrollrange";
import Cursor from "./cursor";
import Selection from "./selection";

const computeVerticalScrollrange = (height, fontMetric) => {
  const offset = Math.round(height / fontMetric.height);
  return { start: 0, stop: offset - 1, offset };
};

const computeHorizontalScrollrange = (width, fontMetric) => {
  const offset = Math.round(width / fontMetric.width);
  return { start: 0, stop: offset - 1, offset };
};

const computeScrollrange = (parentEl, fontMetric) => {
  const { height, width } = parentEl.getBoundingClientRect();
  return {
    verticalScrollrange: computeVerticalScrollrange(height, fontMetric),
    horizontalScrollrange: computeHorizontalScrollrange(width, fontMetric)
  };
};

/**
 *
 * @param {*} param0
 */
const getCursorPosition = ({
  verticalScrollrange: vr,
  horizontalScrollrange: hr,
  fontMetric: fm,
  lines
}) => ({ x, y }) => {
  const row = Math.min(vr.start + Math.trunc(y / fm.height), lines.length - 1);
  if (row < 0 || row >= lines.length) {
    return { row: -1, index: -1 };
  }
  const index = Math.min(
    hr.start + Math.trunc(x / fm.width),
    lines[row].length
  );
  return { row, index };
};

/* **/
function OverlayLayerContainer() {
  const { state, dispatch } = useContext(EditorContext);
  const {
    fontMetric,
    zIndex,
    verticalScrollrange,
    horizontalScrollrange,
    lines
  } = state;
  const [drag, setDrag] = useState(false);
  const [dragOutDirection, setDragOutDirection] = useState(undefined);
  const containerEl = useRef();

  useInterval(
    () => {
      if (dragOutDirection === "up") {
        dispatch(actions.selectionExpandUp());
      } else if (dragOutDirection === "down") {
        dispatch(actions.selectionExpandDown());
      }
    },
    dragOutDirection ? 50 : null
  );

  useEffect(() => {
    if (containerEl.current) {
      const { verticalScrollrange, horizontalScrollrange } = computeScrollrange(
        containerEl.current,
        fontMetric
      );
      dispatch(
        actions.changeScrollrange(verticalScrollrange, horizontalScrollrange)
      );
    }
  }, [containerEl, fontMetric, dispatch]);

  useEffect(() => {
    const mousemove = e => {
      if (drag) {
        e.stopPropagation();
        e.preventDefault();
        const { start, stop } = verticalScrollrange;
        const { row, index } = getCursorPosition({
          verticalScrollrange,
          horizontalScrollrange,
          fontMetric,
          lines
        })(getRelativePos(containerEl.current)(e));
        if (row < start) {
          setDragOutDirection("up");
        } else if (row > stop) {
          setDragOutDirection("down");
        } else {
          setDragOutDirection(undefined);
          dispatch(actions.mouseDrag(row, Math.max(index, 0)));
        }
      }
    };
    window.addEventListener("mousemove", mousemove);
    return () => {
      window.removeEventListener("mousemove", mousemove);
    };
  }, [
    drag,
    verticalScrollrange,
    horizontalScrollrange,
    fontMetric,
    lines,
    dispatch
  ]);

  useEffect(() => {
    const mouseup = () => {
      if (drag) {
        setDragOutDirection(undefined);
        setDrag(false);
      }
    };
    window.addEventListener("mouseup", mouseup);
    return () => window.removeEventListener("mouseup", mouseup);
  }, [drag]);

  useEffect(() => {
    if (containerEl.current) {
      const onWheel = createOnWheelCallback(undefined, dispatch);
      containerEl.current.addEventListener("wheel", onWheel, {
        passive: false
      });
    }
  }, [containerEl, dispatch]);

  return (
    <Overlay
      ref={containerEl}
      zIndex={zIndex}
      onMouseDown={e => {
        const { row, index } = getCursorPosition(state)(
          getRelativePos(containerEl.current)(e)
        );
        dispatch(actions.mouseDown(row, index));
        setDrag(true);
      }}
      onMouseUp={e => {
        if (drag) {
          setDragOutDirection(undefined);
          const { row, index } = getCursorPosition(state)(
            getRelativePos(containerEl.current)(e)
          );
          dispatch(actions.mouseUp(row, index));
          setDrag(false);
        }
      }}
      onMouseMove={e => {
        setDragOutDirection(undefined);
      }}
      onKeydown={createKeydownCallback(state, dispatch)}
    >
      <HorizontalScrollrange />
      <VerticalScrollrange />
      <Cursor />
      <Selection />
    </Overlay>
  );
}

export default OverlayLayerContainer;
