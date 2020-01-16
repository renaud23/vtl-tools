import React, { useRef, useContext } from "react";
import Overlay from "./overlay-layer";
import { EditorContext, actions } from "../../events";
import HorizontalScrollrange from "./horizontal-scrollrange";
import VerticalScrollrange from "./vertical-scrollrange";
import Cursor from "./cursor";

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
  const containerEl = useRef();

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
