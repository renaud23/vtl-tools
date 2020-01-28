import * as actions from "../actions";

/* */
const onWheelCallback = (_, dispatch) => e => {
  e.preventDefault();
  e.stopPropagation();
  const { deltaY } = e;
  if (deltaY < 0) {
    dispatch(actions.onWheelUp());
  } else if (deltaY > 0) {
    dispatch(actions.onWheelDown());
  }
};

/* */
export default (state, dispatch) => onWheelCallback(state, dispatch);
