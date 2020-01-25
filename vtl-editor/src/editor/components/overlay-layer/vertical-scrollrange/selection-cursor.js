import React from "react";

function SelectionCursor({ display, top }) {
  if (display) {
    return (
      <div
        className="vtl-editor-vertical-scrollrange-cursor"
        style={{ top }}
      ></div>
    );
  }
  return null;
}

export default React.memo(SelectionCursor);
