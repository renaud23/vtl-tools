import React from "react";

function Token({ className, value }) {
  return <span className={className}>{value}</span>;
}

export default React.memo(Token);
