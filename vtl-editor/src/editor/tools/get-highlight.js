const TYPE_KEYWORD = "keyword";
const TYPE_COMMON = "common";
const TYPE_VAR = "var";
const TYPE_OPE = "ope";
const TYPE_INT = "int";
const TYPE_FLOAT = "float";
const TYPE_FUNC = "func";
const TYPE_BOOL = "boolean";

function computeHighlight(token) {
  const { typeName, value } = token;
  switch (typeName) {
    case TYPE_FUNC:
    case TYPE_BOOL:
    case TYPE_FLOAT:
    case TYPE_INT:
    case TYPE_OPE:
    case TYPE_VAR:
    case TYPE_KEYWORD: {
      return { highlight: true, label: `${typeName}: ${value.substr(0, 10)}` };
    }
    default:
      return { highlight: false };
  }
}

function computeBloc(token) {
  const { row, index, value } = token;
  return { row, index, length: value.length, ...computeHighlight(token) };
}

export function getHighlight(token) {
  switch (token.typeName) {
    case TYPE_FUNC:
    case TYPE_BOOL:
    case TYPE_FLOAT:
    case TYPE_INT:
    case TYPE_OPE:
    case TYPE_VAR:
    case TYPE_COMMON:
    case TYPE_KEYWORD: {
      return computeBloc(token);
    }
    default:
      return undefined;
  }
}
