import * as actions from "../actions";
import { getLineSeparator } from "../../tools";
import stringHash from "string-hash";

const prepareDefaultToken = content => [
  {
    value: content,
    start: 0,
    stop: content.length,
    className: "token unmapped"
  }
];

const reduceCharDown = (state, { payload: { char } }) => {
  const { cursor, lines, maxLengthRow } = state;
  const { row, index } = cursor;
  const newLines = lines.map((l, i) =>
    i === row ? `${l.substr(0, index)}${char}${l.substr(index)}` : l
  );
  const source = newLines.join(getLineSeparator());
  const tokens = prepareDefaultToken(source);

  return {
    ...state,
    lines: newLines,
    tokens,
    source,
    cursor: { row, index: index + 1 },
    maxLengthRow: Math.max(lines[row].length, maxLengthRow)
  };
};

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
