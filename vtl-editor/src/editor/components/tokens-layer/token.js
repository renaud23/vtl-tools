import React from "react";

function Token({ className, value }) {
  return <span className={className}>{value.replace(/\t/g, " ")}</span>;
}

export default React.memo(Token);
