import KEY from "./key-binding";

/* */
const stopAndPrevent = e => {
  e.stopPropagation();
  e.preventDefault();
};

/* */
const keyDownOverlayCallback = dispatch => e => {
  if (KEY.isUnbindedKey(e.key)) return false;
};

/* */
export default dispatch => keyDownOverlayCallback(dispatch);
