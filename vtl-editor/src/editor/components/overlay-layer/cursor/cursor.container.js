import React, { useContext } from "react";
import { EditorContext } from "../../../events";
import Cursor from "./cursor";

function CursorContainer() {
  const { state } = useContext(EditorContext);
  const {
    cursor,
    horizontalScrollrange: hr,
    verticalScrollrange: vr,
    fontMetric: fm
  } = state;
  if (cursor) {
    const { row, index } = cursor;
    const top = (row - vr.start) * fm.height;
    const left = (index - hr.start) * fm.width;
    return top >= 0 && left >= 0 ? <Cursor top={top} left={left} /> : null;
  }
  return null;
}

export default CursorContainer;
