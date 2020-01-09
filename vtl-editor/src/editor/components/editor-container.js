import React, { useReducer, useEffect, useRef } from "react";
import Editor from "./editor";
import { tokenizerWorker } from "../tokenizer";
import { reducers, initialState, EditorContext, actions } from "../events";

/**
 *
 * @param {*} parentEl
 * @param {*} rowHeight
 */
const computeVerticalScrollRange = (parentEl, rowHeight) => {
  const { height } = parentEl.getBoundingClientRect();
  const offset = Math.round(height / rowHeight);
  return { start: 0, stop: offset - 1, offset };
};

/** */
function EditorContainer({ content }) {
  const [state, dispatch] = useReducer(reducers, initialState);
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
          computeVerticalScrollRange(containerEl.current, 22)
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

export default EditorContainer;
