import React from "react";
import Highlight from "./highlight";

function Highlights({ blocs }) {
  return (
    <>
      {blocs.map(({ top, width, left, title }, i) => (
        <Highlight key={i} top={top} width={width} left={left} title={title} />
      ))}
    </>
  );
}

export default React.memo(Highlights);
