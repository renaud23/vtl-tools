const CR = "\r";
const LF = "\n";
const CRLF = `${CR}${LF}`;

export const removeEndLine = content => content.replace(CRLF, "");

export const getLineSeparator = () => CRLF;

export const splitLines = content =>
  typeof content === "string" ? content.split(CRLF) : content;

export const mergeLine = lines => lines.join(getLineSeparator());
