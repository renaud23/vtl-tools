/** */
export const DELETE_FRAGMENT = "source-edit/delete-fragment";
export const deleteFragment = (start, stop) => ({
  type: DELETE_FRAGMENT,
  payload: { start, stop }
});

/** */
export const INSERT_FRAGMENT = "source-edit/insert-fragment";
export const insertFragment = (start, fragment) => ({
  type: INSERT_FRAGMENT,
  payload: { start, fragment }
});

/**
 *
 * @param {*} state
 * @param {*} event
 */
export function produceSourceEvent(state, event) {
  if (Array.isArray(state.sourceEvents)) {
    state.sourceEvents.push(event);
  } else {
    state.sourceEvents = [event];
  }
  return state;
}

/**
 *
 */
export function consumeSourceEvents(state) {
  const { onChange, cursor, anchor, extent } = state;
  if (typeof onChange === "function") {
    onChange(state.source, state.sourceEvents, { cursor, anchor, extent });
  }
  state.sourceEvents = undefined;
  return state;
}

export const createConsumeReducer = reducer => (state, action) => {
  return consumeSourceEvents(reducer(state, action));
};
