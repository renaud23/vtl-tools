import React, { useReducer, useEffect, useState } from "react";
import PropTypes from "prop-types";
import stringHash from "string-hash";
import Editor from "./editor";
import { createVtlTaksManager } from "../tokenizer";
import { reducers, initialState, EditorContext, actions } from "../events";

import FontMetric from "./font-metric";

const parseVtl = createVtlTaksManager();

/** */
function EditorContainer({ content, fontMetric, zIndex }) {
  const [state, dispatch] = useReducer(reducers, {
    ...initialState,
    zIndex,
    fontMetric
  });

  const { source } = state;

  useEffect(() => {
    dispatch(actions.updateSource(content));
  }, [content]);

  useEffect(() => {
    if (source) {
      parseVtl(source, ({ tokens = [], errors = [] } = {}) => {
        dispatch(actions.parsingEnd(tokens, errors, stringHash(source)));
      });
    }
  }, [source]);

  return (
    <EditorContext.Provider value={{ state, dispatch }}>
      <Editor />
    </EditorContext.Provider>
  );
}

function EditorRoot({ content, zIndex }) {
  const [fontMetric, setFontMetric] = useState(undefined);

  return fontMetric ? (
    <EditorContainer
      content={content}
      fontMetric={fontMetric}
      zIndex={zIndex}
    />
  ) : (
    <FontMetric onLoad={fm => setFontMetric(fm)} />
  );
}

EditorRoot.propTypes = {
  content: PropTypes.string,
  zIndex: PropTypes.number
};
EditorRoot.defaultProps = { content: "", zIndex: 0 };

export default EditorRoot;
