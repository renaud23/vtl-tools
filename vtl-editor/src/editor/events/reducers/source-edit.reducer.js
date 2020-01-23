import * as actions from "../actions";
import { getLineSeparator } from "../../tools";
import stringHash from "string-hash";
import { KEY } from "../event-callbacks";
import {
  changeInsertChar,
  changeDeleteSelection,
  changeKeyEnter
} from "./source-edit-tools";
import {
  validateVisibleLines,
  validateCursorHorizontalScrollrange
} from "./state-validator";

const reduceKeyDown = (state, { payload: { key } }) => {
  switch (key) {
    case KEY.ENTER: {
      return validateVisibleLines(changeKeyEnter(changeDeleteSelection(state)));
    }
    default:
      return state;
  }
};

const reduceCharDown = (state, { payload: { char } }) =>
  changeInsertChar(state, char);

const reduceUpdateSource = (state, { payload: { source } }) => {
  const lines = source.split(getLineSeparator());
  const maxLengthRow = lines.reduce((a, l) => (l.length > a ? l.length : a), 0);
  return {
    ...state,
    source,
    lines,
    maxLengthRow
  };
};

const reduceParsingEnd = (state, { payload: { errors, tokens, hash } }) => {
  const { source, post = {} } = state;
  const currentHash = stringHash(source);
  if (currentHash !== hash) return state;
  const lines = source.split(getLineSeparator());
  return {
    ...state,
    ...post,
    errors,
    lines,
    post: undefined,
    tokens,
    waiting: false
  };
};

const reducer = (state, action) => {
  switch (action.type) {
    case actions.PARSING_END: {
      return validateVisibleLines(reduceParsingEnd(state, action));
    }
    case actions.CHAR_DOWN: {
      return validateCursorHorizontalScrollrange(reduceCharDown(state, action));
    }
    case actions.KEY_DOWN: {
      return validateVisibleLines(
        validateCursorHorizontalScrollrange(reduceKeyDown(state, action))
      );
    }
    case actions.UPDATE_SOURCE: {
      return validateVisibleLines(reduceUpdateSource(state, action));
    }
    default:
      return state;
  }
};

export default reducer;
