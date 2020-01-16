import React from "react";

function Selection({ blocs, zIndex }) {
  return blocs.map(({ top, left, width }, i) => (
    <span
      key={i}
      className="vtl-editor-selection-bloc"
      style={{ top, left, width, zIndex }}
    />
  ));
}

export default Selection;
