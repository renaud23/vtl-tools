import validateHorizontalScrollrange from "./validate-horizontal-scrollrange";
import validateVerticalScrollrange from "./validate-vertical-scrollrange";

function validator(state) {
  return validateHorizontalScrollrange(validateVerticalScrollrange(state));
}

export default validator;
