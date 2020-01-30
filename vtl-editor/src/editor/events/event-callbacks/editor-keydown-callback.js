import KEY from "./key-binding";
import * as actions from "../actions";

const compose = (...opts) => (...callbacks) =>
  callbacks.reverse().reduce(
    (a, call) => e => {
      if (!call(...opts)(e)) a(e);
    },
    () => false
  );

let could = true;
/* */
const stopAndPrevent = e => {
  e.stopPropagation();
  e.preventDefault();
};

/* */
const keyDownCallback = (state, dispatch) => e => {
  stopAndPrevent(e);

  const { waiting } = state;
  if (waiting) return;
  if (could) {
    could = false;
    window.setTimeout(() => (could = true), 20);
    if (KEY.isUnbindedKey(e.key)) return false;
    if (KEY.isCharCode(e.key)) {
      dispatch(actions.charDown(e.key));
      return false;
    }
    dispatch(actions.keyDown(e.key, { shiftKey: e.shiftKey }));
    return false;
  }
};

/* */
const keyDownShorcutCallback = (state, dispatch, shortcutPatterns) => e => {
  const { altKey, shiftKey, ctrlKey, key } = e;
  if (ctrlKey || altKey || shiftKey) {
    if (key !== KEY.ALT && key !== KEY.SHIFT && key !== KEY.CONTROL) {
      stopAndPrevent(e);
      return shortcutPatterns
        .get({ altKey, shiftKey, ctrlKey, key })
        .execute(state, dispatch);
    }
  }
  return false;
};

/* */
// export default (state, dispatch) => keyDownCallback(state, dispatch);

export default (dispatch, state, shortcutPatterns) =>
  compose(
    dispatch,
    state,
    shortcutPatterns
  )(keyDownShorcutCallback, keyDownCallback);
