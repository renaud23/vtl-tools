import React, { useReducer, useEffect, useRef, useState } from "react";
import Editor from "./editor";
import { tokenizerWorker } from "../tokenizer";
import { reducers, initialState, EditorContext, actions } from "../events";
import FontMetric from "./font-metric";

const TEMPLATE_FONT_METRIC = "font_FONT\t";

/**
 *
 * @param {*} parentEl
 * @param {*} rowHeight
 */
const computeVerticalScrollrange = (parentEl, rowHeight) => {
  const { height } = parentEl.getBoundingClientRect();
  const offset = Math.round(height / rowHeight);
  return { start: 0, stop: offset - 1, offset };
};

const computeHorizontaleScrollrange = (parentel, charWidth) => {};

/** */
function EditorContainer({ content, fontMetric }) {
  const [state, dispatch] = useReducer(reducers, {
    ...initialState,
    fontMetric
  });
  const containerEl = useRef(null);

  useEffect(() => {
    tokenizerWorker.parse(content).then(({ errors, tokens }) => {
      dispatch(actions.parsingEnd(content, tokens, errors));
    });
  }, [content]);

  useEffect(() => {
    if (containerEl.current) {
      dispatch(
        actions.changeVerticalScrollrange(
          computeVerticalScrollrange(containerEl.current, 22)
        )
      );
    }
  }, [containerEl]);
  return (
    <EditorContext.Provider value={{ state, dispatch }}>
      <Editor content={content} ref={containerEl} />
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
