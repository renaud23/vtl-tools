import React from "react";
import EditorContent from "./editor-content";
import "./editor.scss";

function Editor({ content }) {
  return (
    <pre className="vtl-editor">
      <EditorContent content={content} />
    </pre>
  );
}

export default React.memo(Editor);
