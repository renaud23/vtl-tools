import React from "react";

function TokenLayer({ children }) {
  return <div className="vtl-editor-tokens">{children}</div>;
}

export default React.memo(TokenLayer);
