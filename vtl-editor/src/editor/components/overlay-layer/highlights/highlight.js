import React from "react";

function Highlight({ top, width, left, title }) {
  return (
    <span
      className="vtl-editor-highlight"
      style={{ top, width, left }}
      title={title}
    />
  );
}

export default Highlight;
