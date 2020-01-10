import React from "react";
import Token from "./token";

/**
 *
 * @param {*} rowStart
 * @param {*} valueRow
 * @param {*} token
 */
// const computeTokenValue = ({ value: rowValue, start: rowStart }) => token => {
//   const { start, stop, value } = token;

//   return value.substr(
//     Math.max(0, rowStart - start),
//     Math.min(rowValue.length, stop - start + 1)
//   );
// };

function Row({ line }) {
  // const compute = computeTokenValue(line);
  return (
    <div className="row">
      {line.tokenParts.map((t, i) => (
        <Token key={i} value={t.value} className={t.className} />
      ))}
    </div>
  );
}

export default React.memo(Row);
