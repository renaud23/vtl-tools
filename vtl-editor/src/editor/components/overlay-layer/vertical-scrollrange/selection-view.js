import React from "react";

function SelectionView({ top, height }) {
  return (
    <div
      className="vtl-editor-vertical-scrollrange-selection"
      style={{ top, height }}
    ></div>
  );
}

export default SelectionView;
