import React, { useEffect, useState, useCallback } from "react";

let START_DRAG_Y = 0;

function Track({ top, height, onDrag }) {
  const [drag, setDrag] = useState(false);
  const mousemove = useCallback(
    e => {
      if (drag) {
        onDrag(true, e.clientY - START_DRAG_Y);
        START_DRAG_Y = e.clientY;
      }
    },
    [drag, onDrag]
  );
  useEffect(() => {
    const mouseup = e => {
      setDrag(false);
      onDrag(false);
    };
    window.addEventListener("mouseup", mouseup);
    window.addEventListener("mousemove", mousemove);
    return () => {
      window.removeEventListener("mouseup", mouseup);
      window.removeEventListener("mousemove", mousemove);
    };
  }, [mousemove, onDrag]);

  return height ? (
    <div
      className="track noselect"
      style={{ top, height }}
      onMouseDown={e => {
        e.stopPropagation();
        START_DRAG_Y = e.clientY;
        setDrag(true);
        onDrag(true, 0);
      }}
    ></div>
  ) : null;
}

export default React.memo(Track);
