import React from "react";
import EditorContent from "./editor-content";
import "./editor.scss";

export default React.forwardRef(function Editor({ content }, ref) {
  return (
    <pre className="vtl-editor" ref={ref}>
      <EditorContent content={content} />
    </pre>
  );
});
