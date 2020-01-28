export function getShiftSelection(shiftKey, anchor, extent) {
  if (shiftKey) {
    return { anchor, extent };
  }
  return { anchor: undefined, extent: undefined };
}
