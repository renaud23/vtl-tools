import * as actions from "../actions";
import { getLineSeparator } from "../../tools";
import stringHash from "string-hash";
import { KEY } from "../event-callbacks";
import { changeInsertChar, changeDeleteSelection } from "./source-edit-tools";
import {
  validateVisibleLines,
  validateCursorHorizontalScrollrange
} from "./state-validator";

const reduceKeyDown = (state, { payload: { key } }) => {
  switch (key) {
    case KEY.ENTER: {
      return changeDeleteSelection(state);
    }
    default:
      return state;
  }
};

const reduceCharDown = (state, { payload: { char } }) =>
  changeInsertChar(changeDeleteSelection(state), char);

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
  const { source } = state;
  const currentHash = stringHash(source);
  if (currentHash !== hash) return state;
  return {
    ...state,
    errors,
    tokens
  };
};

const reducer = (state, action) => {
  switch (action.type) {
    case actions.PARSING_END: {
      return reduceParsingEnd(state, action);
    }
    case actions.CHAR_DOWN: {
      return validateVisibleLines(
        validateCursorHorizontalScrollrange(reduceCharDown(state, action))
      );
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
