import React, { useEffect, useState, useCallback } from "react";

let START_DRAG_X = 0;

function Track({ left, width, onDrag }) {
  const [drag, setDrag] = useState(false);
  const mousemove = useCallback(
    e => {
      e.stopPropagation();
      if (drag) {
        onDrag(true, e.clientX - START_DRAG_X);
        START_DRAG_X = e.clientX;
      }
    },
    [drag, onDrag]
  );

  const mouseup = useCallback(
    e => {
      e.stopPropagation();
      setDrag(false);
      onDrag(false);
    },
    [onDrag]
  );

  useEffect(() => {
    window.addEventListener("mouseup", mouseup);
    window.addEventListener("mousemove", mousemove);
    return () => {
      window.removeEventListener("mouseup", mouseup);
      window.removeEventListener("mousemove", mousemove);
    };
  }, [mousemove, mouseup, onDrag]);

  return (
    <div
      className="track noselect"
      style={{ left, width }}
      onMouseDown={e => {
        e.stopPropagation();
        START_DRAG_X = e.clientX;
        setDrag(true);
        onDrag(true, 0);
      }}
      onMouseMove={mousemove}
      onMouseUp={e => {
        mouseup(e);
      }}
    ></div>
  );
}

export default React.memo(Track);
