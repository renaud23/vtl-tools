import React from "react";
import TokensLayer from "./tokens-layer";
import OverlayLayer from "./overlay-layer";
import "./editor.scss";

function Editor() {
  return (
    <pre className="vtl-editor">
      <div className="vtl-editor-rownum" />
      <div className="vtl-editor-container">
        <OverlayLayer />
        <TokensLayer />
      </div>
    </pre>
  );
}

export default React.memo(Editor);
