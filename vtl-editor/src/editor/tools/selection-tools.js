import { getLineSeparator } from "./split-lines";

/**
 *
 * @param {*} anchor
 * @param {*} extent
 */
export function orderingSelection(anchor, extent) {
  if (
    anchor.row > extent.row ||
    (anchor.row === extent.row && extent.index < anchor.index)
  ) {
    return { first: extent, last: anchor };
  }
  return { first: anchor, last: extent };
}

export function computeSourcePosition(lines, ...cursors) {
  return lines.reduce(
    (a, line, i) => {
      return a.map(c => {
        if (i < c.row) {
          return {
            ...c,
            pos: (c.pos || 0) + line.length + getLineSeparator().length
          };
        }
        if (c.row === i) {
          return { ...c, pos: (c.pos || 0) + c.index };
        }

        return c;
      });
    },
    [...cursors]
  );
}

export function updateState(state) {
  const { post = {} } = state;
  return { ...state, ...post };
}

function consumeTokens(tokens = [], index) {
  const [token, ...rest] = tokens;
  if (!token) {
    return { token: undefined, rest };
  }

  const { start, stop } = token;
  if (index >= start && index <= stop) {
    return { token, rest };
  }
  if (start > index) {
    return { token: undefined, rest: [token, ...rest] };
  }

  return consumeTokens(rest, index);
}

/**
 *
 * @param {*} state
 */
export function getTokenAtCursor(state) {
  const { tokens, lines, cursor } = state;
  if (cursor) {
    const { row, index } = cursor;

    let witch = undefined;
    lines.reduce(
      (a, line, i) => {
        if (i <= row) {
          const { lineStart, toks } = a;
          const lineEnd = lineStart + line.length;
          const { rest, token } = consumeTokens(
            toks,
            row === i
              ? Math.min(lineStart + index, lineStart + line.length - 1)
              : lineEnd
          );
          if (token) {
            witch = { ...token, row: i, index: token.start - lineStart };
          }

          return {
            lineStart: lineEnd + getLineSeparator().length,
            toks: rest
          };
        }

        return a;
      },
      { toks: [...tokens], lineStart: 0 }
    );
    return witch;
  }
  return undefined;
}
