import React from "react";
import Token from "./token";

function Row({ value, start, tokens }) {
  return (
    <div className="row">
      {tokens.map((t, i) => (
        <Token key={i} value={t.value} className={t.className} />
      ))}
    </div>
  );
}

export default React.memo(Row);
