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
  onChange
}) {
  const [state, dispatch] = useReducer(reducers, {
    ...initialState,
    zIndex,
    fontMetric,
    onChange
  });

  const { source } = state;

  useEffect(() => {
    if (sourceFromProps) {
      dispatch(actions.updateSource(sourceFromProps));
    }
  }, [sourceFromProps]);

  useEffect(() => {
    parseVtl(source, ({ tokens = [] } = {}) => {
      dispatch(actions.parsingEnd(tokens, stringHash(source)));
    });
  }, [source]);

  return (
    <EditorContext.Provider value={{ state, dispatch }}>
      <Editor />
    </EditorContext.Provider>
  );
}

function EditorRoot({ source, zIndex, onChange }) {
  const [fontMetric, setFontMetric] = useState(undefined);

  return fontMetric ? (
    <EditorContainer
      source={source}
      fontMetric={fontMetric}
      zIndex={zIndex}
      onChange={onChange}
    />
  ) : (
    <FontMetric onLoad={fm => setFontMetric(fm)} />
  );
}

EditorRoot.propTypes = {
  content: PropTypes.string,
  zIndex: PropTypes.number,
  onChange: () => null
};
EditorRoot.defaultProps = { source: "", zIndex: 0, onChange: PropTypes.func };

export default EditorRoot;
