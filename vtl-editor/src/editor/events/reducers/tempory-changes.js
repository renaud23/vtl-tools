import * as actions from "../actions";
import * as contentChanges from "../content-changes";

const reduceCharDown = (state, { payload: { char } }) => {
  const { cursor } = state;
  const temporyContentChanges = [];
  if (cursor) {
    temporyContentChanges.push(contentChanges.insertText(cursor, `${char}`));
  }
  return { ...state, temporyContentChanges };
};

const reducer = (state, action) => {
  switch (action.type) {
    case actions.CHAR_DOWN: {
      return reduceCharDown(state, action);
    }
    default:
      return state;
  }
};

export default reducer;
