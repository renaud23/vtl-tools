import React, { useState, useCallback } from "react";

import classnames from "classnames";
import Track from "./track";

function VerticalScrollrange(
  { trackHeight, trackTop, onDrag, zIndex, children },
  ref
) {
  const [drag, setDrag] = useState(false);
  const cally = useCallback(
    (state, how) => {
      setDrag(state);
      if (state) {
        onDrag(how);
      }
    },
    [onDrag]
  );
  return (
    <div
      ref={ref}
      style={{ zIndex: zIndex + 1 }}
      className={classnames("vtl-editor-vertical-scrollrange", {
        "on-track": drag
      })}
    >
      <Track height={trackHeight} top={trackTop} onDrag={cally} />
      {children}
    </div>
  );
}

export default React.forwardRef(VerticalScrollrange);
