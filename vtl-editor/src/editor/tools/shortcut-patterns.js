import * as clipboard from "clipboard-polyfill";
import { actions } from "../events";
import { getSelection } from "./selection-tools";
const SHORT_CUTS = new Map();

/** */
const unmappedPattern = pattern => () => {
  console.debug(`unmapped pattern: ${pattern}`);
  return false;
};

/** copy to clipboard */
const copy = state => {
  const selection = getSelection(state);
  if (selection) {
    clipboard.writeText(selection);
  }
  return true;
};

/**  cut to clipboard */
const cut = (state, dispatch) => {
  const selection = getSelection(state);
  if (selection) {
    clipboard.writeText(selection);
    dispatch(actions.onKeyShortcut("ctrl|x"));
  }
  return true;
};

/**  paste clipboard */
const paste = (state, dispatch) => {
  clipboard.readText().then(text => {
    dispatch(actions.onKeyShortcut("ctrl|v", { text }));
  });
  return true;
};

/** select all */
const selectAll = (state, dispatch) => {
  dispatch(actions.onKeyShortcut("ctrl|a"));
  return true;
};

/** undo */
const undo = (state, dispatch) => {
  dispatch(actions.onKeyShortcut("ctrl|z"));
  return true;
};

/* MAPPING */
SHORT_CUTS.set("ctrl|x", cut);
SHORT_CUTS.set("ctrl|c", copy);
SHORT_CUTS.set("ctrl|v", paste);
SHORT_CUTS.set("ctrl|a", selectAll);
SHORT_CUTS.set("ctrl|z", undo);

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
