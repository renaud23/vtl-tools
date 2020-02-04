import { mergeTemporyChanges } from "./source-events";

function reducer(state, action) {
  const { type } = action;
  switch (type) {
    default:
      return mergeTemporyChanges(state);
  }
}

export default reducer;
