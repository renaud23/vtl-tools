import React from "react";

export default React.forwardRef(function FontMetrique({ value }, ref) {
  return (
    <pre className="vtl-editor">
      <span className="font-metric" ref={ref}>
        {value}
      </span>
    </pre>
  );
});
