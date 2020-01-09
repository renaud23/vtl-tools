import * as actions from "../actions";
import { splitLines } from "../../tools";

/* */
// const compose = (...callbacks) =>
//   callbacks.reduce(
//     (a, call) => {
//       return (state, action) => a(call(state, action), action);
//     },
//     state => state
//   );

const reduceParsingEnd = (state, { payload: { source, errors, tokens } }) => {
  return {
    ...state,
    source,
    lines: splitLines(source),
    errors,
    tokens
  };
};

const reduceChangeVerticalScrollrange = (state, { payload: { range } }) => ({
  ...state,
  verticalScrollrange: range
});

const reduceChangeScrollrange = (
  state,
  { payload: { vertical, horizontal } }
) => ({
  ...state,
  verticalScrollrange: vertical,
  horizontalScrollrange: horizontal
});

/** */
const reducer = (state, action) => {
  switch (action.type) {
    case actions.PARSING_END: {
      return reduceParsingEnd(state, action);
    }
    case actions.CHANGE_VERTICAL_SCROLLRANGE: {
      return reduceChangeVerticalScrollrange(state, action);
    }
    case actions.CHANGE_SCROLLRANGE: {
      return reduceChangeScrollrange(state, action);
    }
    default:
      return state;
  }
};

/** */
export default (state, action) => {
  const next = reducer(state, action);
  console.debug(action, state, next);
  return next;
};
