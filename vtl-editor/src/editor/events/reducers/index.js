import general from "./general.reducer";
import selection from "./selection.reducer";
import sourceEdit from "./source-edit.reducer";
import highlight from "./highlights-reducer";
import keyShortchut from "./key-shortcut.reducer";
import history from "./history-reducer";

/* */
function combine(...callbacks) {
  return callbacks.reverse().reduce(
    (a, call) => {
      return (state, action) => a(call(state, action), action);
    },
    state => state
  );
}

const reducers = combine(
  general,
  selection,
  sourceEdit,
  highlight,
  keyShortchut,
  history
);

/** */
export default (state, action) => {
  const next = reducers(state, action);
  // console.log(action.type, state, next);
  return next;
};
