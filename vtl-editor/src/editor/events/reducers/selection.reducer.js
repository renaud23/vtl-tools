import * as actions from "../actions";
// import { validateScrollrange } from "./state-validator";

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

// function reduceMouseDragOut(state) {
//   const { extent, anchor, lines } = state;
//   if (anchor && extent) {
//     // const { index, row } = extent;
//     // const nextRow = Math.min(lines.length ? lines.length - 1 : 0, row + 1);
//     // const nextIndex = Math.min(index, lines[nextRow].length);
//     // const nextExtent = { row: nextRow, index: nextIndex };
//     // return { ...state, extent: nextExtent };
//   }
//   return state;
// }

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
    // case actions.MOUSE_DRAG_OUT: {
    //   return reduceMouseDragOut(state);
    // }

    default:
      return state;
  }
};

export default reducer;
