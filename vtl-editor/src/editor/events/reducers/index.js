import general from "./general-reducer";
import selection from "./selection-reducer";
import contentChange from "./content-change";

/* */
const combine = (...callbacks) =>
  callbacks.reverse().reduce(
    (a, call) => {
      return (state, action) => a(call(state, action), action);
    },
    state => state
  );

const reducers = combine(general, selection, contentChange);

/** */
export default (state, action) => {
  const next = reducers(state, action);
  // console.debug(action, state, next);
  return next;
};
