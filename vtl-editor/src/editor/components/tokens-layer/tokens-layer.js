import React from "react";
import Row from "./row";
import classnames from "classnames";

function TokenLayer({ lines }) {
  return (
    <div className={classnames("vtl-editor-tokens", "noselect")}>
      {lines.map((line, i) => (
        <Row key={i} line={line} />
      ))}
    </div>
  );
}

export default React.memo(TokenLayer);
