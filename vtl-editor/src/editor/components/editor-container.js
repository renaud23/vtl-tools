import React, { useReducer, useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import stringHash from "string-hash";
import Editor from "./editor";
import { createVtlTaksManager } from "../tokenizer";
import { reducers, initialState, EditorContext, actions } from "../events";

import FontMetric from "./font-metric";

const TEMPLATE_FONT_METRIC = "font_FONTyuyiyoproorot***@Mm";
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
  const containerEl = useRef(null);
  useEffect(() => {
    if (containerEl.current && !fontMetric) {
      const { width, height } = containerEl.current.getBoundingClientRect();
      setFontMetric({ width: width / TEMPLATE_FONT_METRIC.length, height });
    }
  }, [fontMetric, containerEl]);

  return fontMetric ? (
    <EditorContainer
      content={content}
      fontMetric={fontMetric}
      zIndex={zIndex}
    />
  ) : (
    <FontMetric value={TEMPLATE_FONT_METRIC} ref={containerEl} />
  );
}

EditorRoot.propTypes = {
  content: PropTypes.string,
  zIndex: PropTypes.number
};
EditorRoot.defaultProps = { content: "", zIndex: 0 };

export default EditorRoot;
