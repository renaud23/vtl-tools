import { mergeTemporyChanges } from "./source-events";
import { validateVisibleLines } from "./state-validator";

function reducer(state, action) {
  const { type } = action;
  switch (type) {
    default:
      return validateVisibleLines(mergeTemporyChanges(state));
  }
}

export default reducer;
