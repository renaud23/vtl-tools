import React, { useContext } from "react";
import { EditorContext } from "../../../events";
import Cursor from "./cursor";

function CursorContainer() {
  const { state } = useContext(EditorContext);

  const {
    cursor,
    horizontalScrollrange: hr,
    verticalScrollrange: vr,
    fontMetric: fm,
    zIndex
  } = state;
  if (cursor) {
    const { row, index } = cursor;
    const top = (row - vr.start) * fm.height;
    const left = (index - hr.start) * fm.width;
    return index >= hr.start &&
      index <= hr.stop &&
      row >= vr.start &&
      row <= vr.stop ? (
      <Cursor top={top} left={left} zIndex={zIndex} />
    ) : null;
  }
  return null;
}

export default CursorContainer;
