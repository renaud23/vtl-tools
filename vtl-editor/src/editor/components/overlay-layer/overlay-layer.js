import React from "react";

const layer = React.forwardRef(function OverlayLayer(
  {
    children,
    onMouseDown,
    onMouseUp,
    onMouseMove,
    zIndex,
    onKeydown,
    onWheel,
    onDoubleClick
  },
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
      onDoubleClick={onDoubleClick}
      onDragStart={e => {
        e.preventDefault();
        e.stopPropagation();
      }}
      onKeyDown={onKeydown}
      onFocus={() => {}}
      onWheel={onWheel}
      style={{ zIndex }}
    >
      {children}
    </div>
  );
});

export default React.memo(layer);
