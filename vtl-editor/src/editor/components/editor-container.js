import React, { useReducer, useEffect, useRef, useState } from "react";
import Editor from "./editor";
import { tokenizerWorker } from "../tokenizer";
import { reducers, initialState, EditorContext, actions } from "../events";
import FontMetric from "./font-metric";

const TEMPLATE_FONT_METRIC = "font_FONTyuyiyoproorot***@Mm";

/** */
function EditorContainer({ content, fontMetric }) {
  const [state, dispatch] = useReducer(reducers, {
    ...initialState,
    fontMetric
  });

  useEffect(() => {
    tokenizerWorker.parse(content).then(({ errors, tokens }) => {
      dispatch(actions.parsingEnd(content, tokens, errors));
    });
    dispatch(
      actions.parsingEnd(
        content,
        [
          {
            value: content,
            start: 0,
            stop: content.length,
            className: "unmapped"
          }
        ],
        []
      )
    );
  }, [content]);

  return (
    <EditorContext.Provider value={{ state, dispatch }}>
      <Editor content={content} />
    </EditorContext.Provider>
  );
}

function EditorRoot({ content }) {
  const [fontMetric, setFontMetric] = useState(undefined);
  const containerEl = useRef(null);
  useEffect(() => {
    if (containerEl.current && !fontMetric) {
      const { width, height } = containerEl.current.getBoundingClientRect();
      setFontMetric({ width: width / TEMPLATE_FONT_METRIC.length, height });
    }
  }, [fontMetric, containerEl]);

  return fontMetric ? (
    <EditorContainer content={content} fontMetric={fontMetric} />
  ) : (
    <FontMetric value={TEMPLATE_FONT_METRIC} ref={containerEl} />
  );
}

export default EditorRoot;
