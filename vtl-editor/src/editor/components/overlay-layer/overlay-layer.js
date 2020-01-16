import React from "react";

const layer = React.forwardRef(function OverlayLayer(
  { children, onMouseDown, onMouseUp, onMouseMove },
  ref
) {
  return (
    <div
      ref={ref}
      className="vtl-editor-overlay"
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
      onMouseMove={onMouseMove}
      onDragStart={e => e.preventDefault()}
    >
      {children}
    </div>
  );
});

export default React.memo(layer);
