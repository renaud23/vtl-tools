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
export function appendTemporyChange(state, event) {
  if (event) {
    const { temporyChanges } = state;
    if (temporyChanges) {
      return { ...state, temporyChanges: [...temporyChanges, event] };
    }
    return { ...state, temporyChanges: [event] };
  }
  return state;
}

export function mergeTemporyChanges(state) {
  const { temporyChanges, history } = state;
  if (temporyChanges) {
    return {
      ...state,
      temporyChanges: undefined,
      history: [...history, temporyChanges]
    };
  }
  return state;
}
