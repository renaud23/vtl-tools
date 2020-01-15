import React, { useState, useCallback } from "react";

import classnames from "classnames";
import Track from "./track";

function VerticalScrollrange({ trackHeight, trackTop, onDrag }, ref) {
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
      className={classnames("vtl-editor-vertical-scrollrange", {
        "on-track": drag
      })}
    >
      <Track height={trackHeight} top={trackTop} onDrag={cally} />
    </div>
  );
}

export default React.forwardRef(VerticalScrollrange);
