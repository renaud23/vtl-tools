export default {
  /** general */
  zIndex: 0,
  source: "",
  lines: [""],
  visibles: [{ value: "", start: 0, stopb: 0, row: 0, tokens: [] }],
  tokens: [],
  verticalScrollrange: { start: 0, stop: 0, offset: 1 },
  horizontalScrollrange: { start: 0, stop: 0, offset: 0 },
  fontMetric: undefined,
  maxLengthRow: 0,
  /** selection */
  overlaySize: { width: undefined, height: undefined },
  cursor: undefined,
  anchor: undefined,
  extent: undefined,
  /** content change */
  temporyContentChanges: [] // before parse
};
