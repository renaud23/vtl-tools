const SHORT_CUTS = new Map();

/* */
const unmappedPattern = pattern => () => {
  console.debug(`unmapped pattern: ${pattern}`);
  return false;
};

/* copy to clipboard */
const copy = () => {
  return true;
};

/* cut to clipboard */
const cut = () => {
  return true;
};

/* paste clipboard */
const paste = () => {
  return true;
};

/* select all */
const selectAll = () => {
  console.log("crtl|a");
  return true;
};

/* MAPPING */
SHORT_CUTS.set("ctrl|x", cut);
SHORT_CUTS.set("ctrl|c", copy);
SHORT_CUTS.set("ctrl|v", paste);
SHORT_CUTS.set("ctrl|a", selectAll);
// SHORT_CUTS.set("ctrl|ArrowLeft", controlLeft);
// SHORT_CUTS.set("ctrl|ArrowRight", controlRight);
// SHORT_CUTS.set("shift|ArrowLeft", shiftLeft);
// SHORT_CUTS.set("shift|ArrowRight", shiftRight);
// SHORT_CUTS.set("shift|ArrowUp", shiftUp);
// SHORT_CUTS.set("shift|ArrowDown", shiftDown);

const getPattern = ({ altKey, shiftKey, ctrlKey, key }) =>
  `${altKey ? "alt|" : ""}${shiftKey ? "shift|" : ""}${
    ctrlKey ? "ctrl|" : ""
  }${key || ""}`;

const createShortcutsProvider = shortcutsMap => ({
  get: (model = {}) => {
    const pattern = getPattern(model);
    return {
      execute: shortcutsMap.has(pattern)
        ? shortcutsMap.get(pattern)
        : unmappedPattern(pattern)
    };
  }
});

/* */
export const composeShortcuts = (patterns = {}, erase = false) => {
  const newMap = Object.entries(patterns).reduce((map, [pattern, action]) => {
    if ((erase || !map.has(pattern)) && typeof action === "function") {
      map.set(pattern, action);
    }

    return map;
  }, new Map(SHORT_CUTS));

  return createShortcutsProvider(newMap);
};

/* */
export default () => composeShortcuts(SHORT_CUTS);
