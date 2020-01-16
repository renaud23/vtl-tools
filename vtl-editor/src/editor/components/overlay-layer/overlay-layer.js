import React from "react";

const layer = React.forwardRef(function OverlayLayer(
  { children, onMouseDown, onMouseUp },
  ref
) {
  return (
    <div
      ref={ref}
      className="vtl-editor-overlay"
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
    >
      {children}
    </div>
  );
});

export default React.memo(layer);
