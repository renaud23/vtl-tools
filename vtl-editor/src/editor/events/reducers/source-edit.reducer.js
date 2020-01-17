import * as actions from "../actions";
import { getLineSeparator } from "../../tools";
import stringHash from "string-hash";
import { changeInsertChar, changeDeleteSelection } from "./source-edit-tools";

const reduceCharDown = (state, { payload: { char } }) =>
  changeInsertChar(changeDeleteSelection(state), char);

const reduceUpdateSource = (state, { payload: { source } }) => {
  const lines = source.split(getLineSeparator());
  const maxLengthRow = lines.reduce((a, l) => (l.length > a ? l.length : a), 0);
  return { ...state, source, lines, maxLengthRow };
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
      return reduceCharDown(state, action);
    }
    case actions.UPDATE_SOURCE: {
      return reduceUpdateSource(state, action);
    }
    default:
      return state;
  }
};

export default reducer;
