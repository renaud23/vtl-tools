import React, { useReducer, useEffect, useState } from "react";
import PropTypes from "prop-types";
import stringHash from "string-hash";
import Editor from "./editor";
import { createVtlTaksManager } from "../tokenizer";
import { reducers, initialState, EditorContext, actions } from "../events";

import FontMetric from "./font-metric";

const parseVtl = createVtlTaksManager();

/** */
function EditorContainer({
  source: sourceFromProps,
  fontMetric,
  zIndex,
  onChange,
  shortcuts,
  onStateChange,
  state: stateFromProps
}) {
  const [state, dispatch] = useReducer(reducers, {
    ...initialState,
    zIndex,
    fontMetric
  });
  const {
    source,
    history,
    verticalScrollrange,
    horizontalScrollrange,
    cursor,
    extent,
    anchor,
    highlights
  } = state;

  useEffect(() => {
    dispatch(actions.updateSource(sourceFromProps));
  }, [sourceFromProps]);

  useEffect(() => {
    onStateChange({
      history,
      verticalScrollrange,
      horizontalScrollrange,
      cursor,
      anchor,
      extent,
      highlights
    });
  }, [
    history,
    verticalScrollrange,
    horizontalScrollrange,
    cursor,
    onStateChange,
    extent,
    anchor,
    highlights
  ]);

  useEffect(() => {
    dispatch(actions.setState(stateFromProps));
  }, [stateFromProps]);

  useEffect(() => {
    parseVtl(source, ({ tokens = [] } = {}) => {
      dispatch(actions.parsingEnd(tokens, stringHash(source)));
      onChange(source);
    });
  }, [source, onChange]);

  return (
    <EditorContext.Provider value={{ state, dispatch, shortcuts }}>
      <Editor />
    </EditorContext.Provider>
  );
}

function EditorRoot({
  source,
  zIndex,
  onChange,
  shortcuts,
  onStateChange,
  state
}) {
  const [fontMetric, setFontMetric] = useState(undefined);
  return fontMetric ? (
    <EditorContainer
      source={source}
      fontMetric={fontMetric}
      zIndex={zIndex}
      onChange={onChange}
      shortcuts={shortcuts}
      onStateChange={onStateChange}
      state={state}
    />
  ) : (
    <FontMetric onLoad={fm => setFontMetric(fm)} />
  );
}

EditorRoot.propTypes = {
  source: PropTypes.string,
  zIndex: PropTypes.number,
  shortcuts: PropTypes.object,
  onChange: PropTypes.func,
  onStateChange: PropTypes.func
  // history: PropTypes.arrayOf(
  //   PropTypes.arrayOf(PropTypes.shape({ type: PropTypes.string.isRequired }))
  // ),
  // cursor: PropTypes.shape({
  //   row: PropTypes.number.isRequired,
  //   index: PropTypes.number.isRequired
  // })
};
EditorRoot.defaultProps = {
  source: "",
  zIndex: 0,
  onChange: () => null,
  onStateChange: () => null,
  shortcuts: {}
};

export default EditorRoot;
