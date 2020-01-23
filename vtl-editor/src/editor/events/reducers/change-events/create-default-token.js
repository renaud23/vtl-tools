export const createDefaultToken = content => [
  {
    value: content,
    start: 0,
    stop: content.length,
    className: "token unmapped"
  }
];
