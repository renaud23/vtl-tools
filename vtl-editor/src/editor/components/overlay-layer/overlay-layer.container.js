import React, { useRef, useContext, useEffect } from "react";
import Overlay from "./overlay-layer";
import { EditorContext, actions } from "../../events";
import HorizontalScrollrange from "./horizontal-scrollrange";
import VerticalScrollrange from "./vertical-scrollrange";
import Cursor from "./cursor";

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
  const { x, y } = el.getBoundingClientRect();
  return { x: pageX - x - window.scrollX, y: pageY - y - window.scrollY };
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
  const index = Math.min(
    hr.start + Math.trunc(x / fm.width),
    lines[row].length
  );
  return { row, index };
};

/* **/
function OverlayLayerContainer() {
  const { state, dispatch } = useContext(EditorContext);
  const { fontMetric } = state;
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

  return (
    <Overlay
      ref={containerEl}
      onMouseDown={e => {
        const { row, index } = getCursorPosition(state)(
          getRelativePos(containerEl.current)(e)
        );
        dispatch(actions.mouseDown(row, index));
      }}
      onMouseUp={e => {
        const { row, index } = getCursorPosition(state)(
          getRelativePos(containerEl.current)(e)
        );
        dispatch(actions.mouseUp(row, index));
      }}
    >
      <HorizontalScrollrange />
      <VerticalScrollrange />
      <Cursor />
    </Overlay>
  );
}

export default OverlayLayerContainer;
