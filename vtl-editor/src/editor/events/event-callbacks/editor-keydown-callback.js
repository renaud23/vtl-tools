import KEY from "./key-binding";
import * as actions from "../actions";

let could = true;
/* */
const stopAndPrevent = e => {
  e.stopPropagation();
  e.preventDefault();
};

/* */
const keyDownOverlayCallback = dispatch => e => {
  stopAndPrevent(e);
  if (could) {
    could = false;
    window.setTimeout(() => (could = true), 30);
    if (KEY.isUnbindedKey(e.key)) return false;
    if (KEY.isCharCode(e.key)) {
      dispatch(actions.charDown(e.key));
      return false;
    }
    dispatch(actions.keyDown(e.key));
    return false;
  }
};

/* */
export default dispatch => keyDownOverlayCallback(dispatch);
