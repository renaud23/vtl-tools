import general from "./general.reducer";
import selection from "./selection.reducer";
import sourceEdit from "./source-edit.reducer";
import highlight from "./highlights-reducer";
import keyShortchut from "./key-shortcut.reducer";

/* */
const combine = (...callbacks) =>
  callbacks.reverse().reduce(
    (a, call) => {
      return (state, action) => a(call(state, action), action);
    },
    state => state
  );

const reducers = combine(
  general,
  selection,
  sourceEdit,
  highlight,
  keyShortchut
);

/** */
export default (state, action) => {
  const next = reducers(state, action);
  // console.info(action, state, next);
  return next;
};
