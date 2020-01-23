import React, { useEffect, useRef } from "react";

const TEMPLATE_FONT_METRIC = "font_FONTyuyiyoproorot***@Mm";

export default function FontMetrique({ onLoad }) {
  const spanEl = useRef();
  useEffect(() => {
    window.onload = function() {
      const { width, height } = spanEl.current.getBoundingClientRect();
      onLoad({ width: width / TEMPLATE_FONT_METRIC.length, height });
    };
  }, [onLoad]);

  return (
    <pre className="vtl-editor">
      <div className="vtl-editor-container">
        <span className="font-metric" ref={spanEl}>
          {TEMPLATE_FONT_METRIC}
        </span>
      </div>
    </pre>
  );
}
