import React from "react";

function Cursor({ top, left }) {
  return (
    <div
      className="vtl-editor-cursor"
      style={{ top, left }}
      onDragStart={e => e.preventDefault()}
    />
  );
}

export default React.memo(Cursor);
