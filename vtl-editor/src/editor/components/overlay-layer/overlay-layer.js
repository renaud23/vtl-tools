import React from "react";

const layer = React.forwardRef(function OverlayLayer(
  { children, onMouseDown, onMouseUp, onMouseMove, zIndex },
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
      style={{ zIndex }}
    >
      {children}
    </div>
  );
});

export default React.memo(layer);
