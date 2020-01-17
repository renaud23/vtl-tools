import React, { useReducer, useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import Editor from "./editor";
import { createVtlTaksManager } from "../tokenizer";
import { reducers, initialState, EditorContext, actions } from "../events";
import FontMetric from "./font-metric";

const TEMPLATE_FONT_METRIC = "font_FONTyuyiyoproorot***@Mm";
const parseVtl = createVtlTaksManager();

const prepareDefaultToken = content => [
  {
    value: content,
    start: 0,
    stop: content.length,
    className: "unmapped"
  }
];

/** */
function EditorContainer({ content, fontMetric, zIndex }) {
  const [state, dispatch] = useReducer(reducers, {
    ...initialState,
    zIndex,
    fontMetric,
    parseVtl
  });

  useEffect(() => {
    parseVtl(content, ({ tokens = [], errors = [] } = {}) => {
      dispatch(actions.parsingEnd(content, tokens, errors));
    });
    dispatch(actions.parsingEnd(content, prepareDefaultToken(content), []));
  }, [content]);

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
