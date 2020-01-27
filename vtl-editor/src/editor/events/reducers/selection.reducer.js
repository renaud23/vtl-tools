import * as actions from "../actions";
import { validateVisibleLines } from "./state-validator";

function reduceMouseDown(state, { payload: { row, index } }) {
  return {
    ...state,
    cursor: { row, index },
    anchor: { row, index },
    extent: undefined
  };
}

function reduceMouseUp(state, { payload: { row, index } }) {
  const { anchor } = state;
  if (!anchor) {
    return state;
  }
  if (anchor.row === row && anchor.index === index) {
    return { ...state, anchor: undefined };
  }
  return { ...state, cursor: { row, index }, extent: { row, index } };
}

function reduceMouseDrag(state, { payload: { row, index } }) {
  const { anchor } = state;
  if (anchor && (anchor.index !== index || anchor.row !== row)) {
    return { ...state, extent: { row, index } };
  }
  return state;
}

function reduceSelectionExpandUp(state) {
  const { extent = {}, verticalScrollrange } = state;
  const { row } = extent;
  const { offset } = verticalScrollrange;
  if (extent && row) {
    const nextRow = row - 1;
    return validateVisibleLines({
      ...state,
      extent: {
        row: nextRow,
        index: 0
      },
      verticalScrollrange: {
        start: nextRow,
        stop: nextRow + offset - 1,
        offset
      }
    });
  }
  return state;
}

function reduceSelectionExpandDown(state) {
  const { extent = {}, verticalScrollrange, lines } = state;
  const { row } = extent;
  const { offset } = verticalScrollrange;
  if (extent && row < lines.length - 1) {
    const nextRow = row + 1;
    return validateVisibleLines({
      ...state,
      extent: {
        row: nextRow,
        index: 0
      },
      verticalScrollrange: {
        start: nextRow - offset + 1,
        stop: nextRow,
        offset
      }
    });
  }
  return state;
}

/** */
const reducer = (state, action) => {
  switch (action.type) {
    case actions.MOUSE_DOWN: {
      return reduceMouseDown(state, action);
    }
    case actions.MOUSE_UP: {
      return reduceMouseUp(state, action);
    }
    case actions.MOUSE_DRAG: {
      return reduceMouseDrag(state, action);
    }
    case actions.SELECTION_EXPAND_UP: {
      return reduceSelectionExpandUp(state, action);
    }
    case actions.SELECTION_EXPAND_DOWN: {
      return reduceSelectionExpandDown(state, action);
    }
    default:
      return state;
  }
};

export default reducer;
