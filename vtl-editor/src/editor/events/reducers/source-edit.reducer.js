import * as actions from "../actions";
import { getLineSeparator } from "../../tools";
import { KEY } from "../event-callbacks";
import {
  changeInsertChar,
  changeDeleteSelection,
  changeKeyEnter,
  changeKeyBackSpace,
  changeKeyDelete
} from "./change-events";
import { updateState } from "../../tools";
import { validateVisibleLines, validateScrollrange } from "./state-validator";
import { consumeSourceEvents } from "./source-events";

const reduceKeyDown = (state, { payload: { key } }) => {
  switch (key) {
    case KEY.ENTER: {
      return changeKeyEnter(changeDeleteSelection(state));
    }
    case KEY.BACK_SPACE: {
      return changeKeyBackSpace(state);
    }
    case KEY.DELETE: {
      return changeKeyDelete(state);
    }
    case KEY.TAB: {
      return changeInsertChar(changeDeleteSelection(state), "\t");
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

const reduceParsingEnd = (state, { payload: { tokens, hash } }) => {
  const update = updateState(state);
  const { source } = update;
  const lines = source.split(getLineSeparator());
  const maxLengthRow = lines.reduce((a, l) => (l.length > a ? l.length : a), 0);
  const next = validateVisibleLines(
    validateScrollrange({
      ...update,
      lines,
      maxLengthRow,
      post: undefined,
      tokens,
      waiting: false
    })
  );
  // console.log(next);
  return next;
};

const reducer = (state, action) => {
  switch (action.type) {
    case actions.PARSING_END: {
      return reduceParsingEnd(state, action);
    }
    case actions.CHAR_DOWN: {
      return consumeSourceEvents(reduceCharDown(state, action));
    }
    case actions.KEY_DOWN: {
      return consumeSourceEvents(reduceKeyDown(state, action));
    }
    case actions.UPDATE_SOURCE: {
      return reduceUpdateSource(state, action);
    }
    default:
      return state;
  }
};

export default reducer;
