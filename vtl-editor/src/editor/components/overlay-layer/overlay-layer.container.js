import React, { useRef, useContext, useEffect, useState } from "react";
import Overlay from "./overlay-layer";
import { EditorContext, actions, createKeydownCallback } from "../../events";
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
 * @param {*} el
 */
const getRelativePos = el => e => {
  const { pageX, pageY } = e;
  const { top, left } = el.getBoundingClientRect();
  return {
    x: pageX - left - window.scrollX,
    y: pageY - top - window.scrollY
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
  const { fontMetric, zIndex } = state;
  const [drag, setDrag] = useState(false);
  const containerEl = useRef();

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
      e.stopPropagation();
      if (drag) {
        const how = getCursorPosition(state)(
          getRelativePos(containerEl.current)(e)
        );

        // console.log(how);
      }
    };
    window.addEventListener("mousemove", mousemove);

    return () => {
      window.removeEventListener("mousemove", mousemove);
    };
  }, [drag, state]);

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
          const { row, index } = getCursorPosition(state)(
            getRelativePos(containerEl.current)(e)
          );
          dispatch(actions.mouseUp(row, index));
          setDrag(false);
        }
      }}
      onMouseMove={e => {
        // e.stopPropagation();
        if (drag) {
          const { row, index } = getCursorPosition(state)(
            getRelativePos(containerEl.current)(e)
          );
          dispatch(actions.mouseDrag(row, index));
        }
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
