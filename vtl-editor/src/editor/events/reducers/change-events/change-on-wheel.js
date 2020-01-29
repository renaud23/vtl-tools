import { getVerticalScrollrangeMargin } from "../../../components/overlay-layer";

export function changeOnWheelUp(state) {
  const { verticalScrollrange, lines } = state;
  const { start, offset } = verticalScrollrange;
  const nextStart = Math.max(start - Math.trunc(0.02 * lines.length + 1), 0);
  const nextStop = nextStart + offset - 1;
  return {
    ...state,
    verticalScrollrange: { start: nextStart, stop: nextStop, offset }
  };
}

export function changeOnWheelDown(state) {
  const { verticalScrollrange, lines } = state;
  const { start, offset } = verticalScrollrange;
  const nextStart = Math.min(
    start + Math.trunc(0.02 * (lines.length + 1)),
    lines.length - offset + getVerticalScrollrangeMargin()
  );
  const nextStop = nextStart + offset - 1;
  return {
    ...state,
    verticalScrollrange: { start: nextStart, stop: nextStop, offset }
  };
}
