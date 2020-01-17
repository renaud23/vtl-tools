import React from "react";

const layer = React.forwardRef(function OverlayLayer(
  { children, onMouseDown, onMouseUp, onMouseMove, zIndex, onKeydown },
  ref
) {
  return (
    <div
      ref={ref}
      tabIndex="0"
      className="vtl-editor-overlay"
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
      onMouseMove={onMouseMove}
      onDragStart={e => e.preventDefault()}
      onKeyDown={onKeydown}
      style={{ zIndex }}
    >
      {children}
    </div>
  );
});

export default React.memo(layer);
