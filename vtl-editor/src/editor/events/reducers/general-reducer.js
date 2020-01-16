import * as actions from "../actions";
import { splitLines } from "../../tools";

const reduceParsingEnd = (state, { payload: { source, errors, tokens } }) => {
  const lines = splitLines(source);
  const maxLengthRow = lines.reduce(
    (max, line) => (line.length > max ? line.length : max),
    0
  );
  return {
    ...state,
    source,
    lines,
    errors,
    tokens,
    maxLengthRow
  };
};

const reduceChangeVerticalScrollrange = (state, { payload: { range } }) => ({
  ...state,
  verticalScrollrange: range
});

const reduceChangeHorizontalScrollrange = (state, { payload: { range } }) => ({
  ...state,
  horizontalScrollrange: range
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
    case actions.CHANGE_HORIZONTAL_SCROLLRANGE: {
      return reduceChangeHorizontalScrollrange(state, action);
    }
    default:
      return state;
  }
};

export default reducer;
