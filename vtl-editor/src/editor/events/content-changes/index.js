/** */
export const INSERT_TEXT = "content-change/insert-text";
export const insertText = (cursor, text) => ({
  type: INSERT_TEXT,
  payload: { cursor, text }
});

export const reduceInsertText = (lines, { cursor, text }) => {
  const { row } = cursor;
  // const line = lines[cursor.row];
  // const tokens = line.tokens.map(t => {
  //   const start = t.start - line.start;
  //   const stop = t.stop - line.start;

  //   if (index >= start && index <= stop) {
  //     return { ...t, stop: stop + text.length };
  //   }
  //   return t;
  // });

  lines.map(line => {
    if (row === line.row) {
      const tokens = line.tokens.map(t => {
        return t;
      });
      return { ...line, tokens };
    }
    if (row > line.row) {
      return { line };
    }

    return line;
  });
  return lines;
};
