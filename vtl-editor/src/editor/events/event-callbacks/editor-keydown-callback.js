import KEY from "./key-binding";
import * as actions from "../actions";

/* */
const stopAndPrevent = e => {
  e.stopPropagation();
  e.preventDefault();
};

/* */
const keyDownOverlayCallback = dispatch => e => {
  stopAndPrevent(e);
  if (KEY.isUnbindedKey(e.key)) return false;
  if (KEY.isCharCode(e.key)) {
    dispatch(actions.charDown(e.key));
  }
};

/* */
export default dispatch => keyDownOverlayCallback(dispatch);
