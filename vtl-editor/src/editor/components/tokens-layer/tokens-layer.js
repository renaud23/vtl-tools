import React from "react";
import Row from "./row";

function TokenLayer({ lines }) {
  return (
    <div className="vtl-editor-tokens">
      {lines.map((line, i) => (
        <Row key={i} line={line} />
      ))}
    </div>
  );
}

export default React.memo(TokenLayer);
