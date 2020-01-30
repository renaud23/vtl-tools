function createUnmappedToken(start, stop, value) {
  return {
    start,
    stop,
    value: value.substr(start, stop - start + 1),
    className: "vtl-unmapped",
    name: "UNMAPPED"
  };
}

/* */
export function fillUnmappedToken(source = "", tokens = []) {
  if (typeof source === "string" || Array.isArray(tokens)) {
    if (tokens.length === 0 && source.length > 0) {
      return [createUnmappedToken(0, source.length - 1, source)];
    }

    const { toks, pos } = tokens.reduce(
      ({ toks, pos }, t) => {
        const { start, stop } = t;
        if (start !== pos) {
          return {
            toks: [...toks, createUnmappedToken(pos, start - 1, source), t],
            pos: stop + 1
          };
        }

        return { toks: [...toks, t], pos: stop + 1 };
      },
      { toks: [], pos: 0 }
    );
    if (pos < source.length) {
      return [...toks, createUnmappedToken(pos, source.length - 1, source)];
    }
    return toks;
  }
  return [];
}
