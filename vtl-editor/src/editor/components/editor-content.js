import React from "react";
import { TokensLayer } from "./tokens-layer";
import { OverlayLayer } from "./overlay-layer";

function EditorContent({ content }) {
  return (
    <>
      <div className="vtl-editor-rownum" />
      <div className="vtl-editor-container">
        <OverlayLayer />
        <TokensLayer />
      </div>
    </>
  );
}

export default EditorContent;
