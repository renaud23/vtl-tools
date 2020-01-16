import React from "react";

function Selection({ blocs }) {
  return blocs.map(({ top, left, width }, i) => (
    <span
      key={i}
      className="vtl-editor-selection-bloc"
      style={{ top, left, width }}
    />
  ));
}

export default Selection;
