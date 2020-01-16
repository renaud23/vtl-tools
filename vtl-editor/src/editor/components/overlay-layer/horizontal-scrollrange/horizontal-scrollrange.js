import React, { useState, useCallback } from "react";

import classnames from "classnames";
import Track from "./track";

function HorizontalScrollrange({ trackWidth, trackLeft, onDrag, zIndex }, ref) {
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
      className={classnames("vtl-editor-horizontal-scrollrange", {
        "on-track": drag
      })}
    >
      <Track width={trackWidth} left={trackLeft} onDrag={cally} />
    </div>
  );
}

export default React.forwardRef(HorizontalScrollrange);
