import React from "react";

export default React.forwardRef(function FontMetrique({ value }, ref) {
  return (
    <pre className="vtl-editor">
      <div className="vtl-editor-container">
        <span className="font-metric" ref={ref}>
          {value}
        </span>
      </div>
    </pre>
  );
});
