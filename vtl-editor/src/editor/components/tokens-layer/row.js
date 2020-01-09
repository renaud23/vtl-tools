import React from "react";
import Token from "./token";

/**
 *
 * @param {*} rowStart
 * @param {*} valueRow
 * @param {*} token
 */
const computeTokenValue = (rowStart, valueRow, token, columnStart = 1) => {
  const { start, stop, value } = token;

  return value.substr(
    Math.max(0, rowStart - start),
    Math.min(valueRow.length, stop - start + 1)
  );
};

function Row({ value, start, tokens, columnStart, columnStop }) {
  return (
    <div className="row">
      {tokens.map((t, i) => (
        <Token
          key={i}
          value={computeTokenValue(start, value, t, columnStart)}
          className={t.className}
        />
      ))}
    </div>
  );
}

export default React.memo(Row);
