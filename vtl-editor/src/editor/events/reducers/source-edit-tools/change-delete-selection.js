import { orderingSelection, mergeLine } from "../../../tools";

function computeSource(state, first, last) {
  const { lines } = state;

  const nl = lines.reduce((a, l, i) => {
    if (i < first.row || i > last.row) {
      return [...a, l];
    }
    if (i === first.row && last.row !== first.row) {
      return [
        ...a,
        `${l.substr(0, first.index)}${lines[i + 1].substr(last.index)}`
      ];
    }
    if (i === last.row && last.row === first.row) {
      return [...a, l.substr(last.index)];
    }
    return a;
  }, []);
  const ns = mergeLine(nl);

  return {
    ...state,
    lines: nl,
    source: ns,
    cursor: first,
    anchor: undefined,
    extent: undefined
  };
}

function computeTokens(state) {
  return state;
}

function changeDeleteSelection(state) {
  const { anchor, extent } = state;
  if (!anchor || !extent) {
    return state;
  }
  const { first, last } = orderingSelection(anchor, extent);
  return computeTokens(computeSource(state, first, last), first, last);
}

export default changeDeleteSelection;
