import React from "react";

function Cursor({ top, left, zIndex }) {
  return (
    <div
      className="vtl-editor-cursor"
      style={{ top, left, zIndex: zIndex + 1 }}
      onDragStart={e => e.preventDefault()}
    />
  );
}

export default React.memo(Cursor);
