import React from "react";
import Overlay from "./overlay";
// import { EditorContext } from "../events";

const checkTokensLines = lines => tokens => {
  const nl = lines.map(({ value, start }) => {
    const lf = start + value.length;
    return {
      value,
      start,
      tokens: tokens.reduce((a, t) => {
        const tStart = Math.max(0, start - t.start);
        const tLength = Math.min(lf, t.stop) - Math.max(start, t.start) + 1;
        return Math.max(t.stop, lf) - Math.min(t.start, start) <=
          value.length + t.stop - t.start
          ? [
              ...a,
              {
                ...t,
                value: t.value.substr(tStart, tLength),
                start: Math.max(t.start, start) - start,
                stop: Math.min(t.stop, lf) - start
              }
            ]
          : a;
      }, [])
    };
  });

  return nl;
};

function OverlayContainer() {
  return <Overlay />;
}

export default OverlayContainer;
