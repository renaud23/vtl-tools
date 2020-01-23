import React from "react";
import Token from "./token";

/**
 *
 * @param {*} rowStart
 * @param {*} valueRow
 * @param {*} token
 */

function Row({ line }) {
  return (
    <div className="row">
      {line.tokenParts.map((t, i) => (
        <Token key={i} value={t.value} className={t.className} />
      ))}
    </div>
  );
}

export default React.memo(Row); //, (next, prev) => next.value === prev.value);
