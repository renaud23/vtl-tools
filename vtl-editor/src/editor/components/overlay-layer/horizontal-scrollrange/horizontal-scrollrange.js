import React, { useEffect, useState, useCallback } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

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

function HorizontalScrollrange({ trackWidth, trackLeft, onDrag }, ref) {
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
      className={classnames("vtl-editor-horizontal-scrollrange", {
        "on-track": drag
      })}
    >
      <Track width={trackWidth} left={trackLeft} onDrag={cally} />
    </div>
  );
}

HorizontalScrollrange.propTypes = {
  start: PropTypes.number,
  stop: PropTypes.number,
  offset: PropTypes.number,
  width: PropTypes.number
};

HorizontalScrollrange.defaultProps = {
  start: undefined,
  stop: undefined,
  offset: undefined
};

export default React.forwardRef(HorizontalScrollrange);
