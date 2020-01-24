import React from "react";

function SelectionView({ display, top, height }) {
  if (display) {
    return (
      <div
        className="vtl-editor-vertical-scrollrange-selection"
        style={{ top, height }}
      ></div>
    );
  }
  return null;
}

export default React.memo(SelectionView);
