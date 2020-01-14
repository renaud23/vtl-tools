import React, { useEffect, useState, useCallback } from "react";

let START_DRAG_X = 0;

function Track({ left, width, onDrag }) {
  const [drag, setDrag] = useState(false);
  const mousemove = useCallback(
    e => {
      if (drag) {
        onDrag(true, e.clientX - START_DRAG_X);
        START_DRAG_X = e.clientX;
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

  return (
    <div
      className="track noselect"
      style={{ left, width }}
      onDragStart={() => false}
      onMouseDown={e => {
        e.stopPropagation();
        START_DRAG_X = e.clientX;
        setDrag(true);
        onDrag(true, 0);
      }}
    ></div>
  );
}

export default React.memo(Track);
