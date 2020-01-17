import general from "./general.reducer";
import selection from "./selection.reducer";
import sourceEdit from "./source-edit.reducer";

/* */
const combine = (...callbacks) =>
  callbacks.reverse().reduce(
    (a, call) => {
      return (state, action) => a(call(state, action), action);
    },
    state => state
  );

const reducers = combine(general, selection, sourceEdit);

/** */
export default (state, action) => {
  const next = reducers(state, action);
  // console.debug(action, state, next);
  return next;
};
