/** */
export const DELETE_FRAGMENT = "source-edit/delete-fragment";
export const deleteFragment = (start, stop, fragment) => ({
  type: DELETE_FRAGMENT,
  payload: { start, stop, fragment }
});

/** */
export const INSERT_FRAGMENT = "source-edit/insert-fragment";
export const insertFragment = (start, stop, fragment) => ({
  type: INSERT_FRAGMENT,
  payload: { start, stop, fragment }
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
