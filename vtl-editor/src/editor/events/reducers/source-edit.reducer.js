import * as actions from "../actions";
import { getLineSeparator } from "../../tools";
import stringHash from "string-hash";
import { KEY } from "../event-callbacks";
import {
  changeInsertChar,
  changeDeleteSelection,
  changeKeyEnter,
  changeBackSpaceKey
} from "./change-events";
import { updateState } from "../../tools";
import { validateVisibleLines, validateScrollrange } from "./state-validator";

const reduceKeyDown = (state, { payload: { key } }) => {
  switch (key) {
    case KEY.ENTER: {
      return changeKeyEnter(changeDeleteSelection(state));
    }
    case KEY.BACK_SPACE: {
      return changeBackSpaceKey(state);
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
  const update = updateState(state);
  const { source } = update;
  const currentHash = stringHash(source);
  if (currentHash !== hash) return state;
  const lines = source.split(getLineSeparator());
  const maxLengthRow = lines.reduce((a, l) => (l.length > a ? l.length : a), 0);
  return validateVisibleLines(
    validateScrollrange({
      ...update,
      errors,
      lines,
      maxLengthRow,
      post: undefined,
      tokens,
      waiting: false
    })
  );
};

const reducer = (state, action) => {
  switch (action.type) {
    case actions.PARSING_END: {
      return reduceParsingEnd(state, action);
    }
    case actions.CHAR_DOWN: {
      return reduceCharDown(state, action);
    }
    case actions.KEY_DOWN: {
      return reduceKeyDown(state, action);
    }
    case actions.UPDATE_SOURCE: {
      return reduceUpdateSource(state, action);
    }
    default:
      return state;
  }
};

export default reducer;
