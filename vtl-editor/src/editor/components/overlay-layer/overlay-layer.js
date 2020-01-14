import React from "react";

const OverlayLayer = React.forwardRef(function OverlayLayer({ children }, ref) {
  return (
    <div className="vtl-editor-overlay" ref={ref}>
      {children}
    </div>
  );
});

export default React.memo(OverlayLayer);
