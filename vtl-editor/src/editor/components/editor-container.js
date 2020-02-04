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
  cursor,
  onChange,
  shortcuts,
  history
}) {
  const [state, dispatch] = useReducer(reducers, {
    ...initialState,
    zIndex,
    fontMetric
  });
  const { source } = state;

  useEffect(() => {
    if (sourceFromProps) {
      dispatch(actions.updateSource(sourceFromProps));
    }
  }, [sourceFromProps]);

  useEffect(() => {
    dispatch(actions.setOnChange(onChange));
  }, [onChange]);

  useEffect(() => {
    if (cursor) {
      const { row, index } = cursor;
      dispatch(actions.setCursor(row, index));
    } else {
      dispatch(actions.setCursor(undefined));
    }
  }, [cursor]);

  useEffect(() => {
    parseVtl(source, ({ tokens = [] } = {}) => {
      dispatch(actions.parsingEnd(tokens, stringHash(source)));
    });
  }, [source]);

  useEffect(() => {
    dispatch(actions.setHistory(history));
  }, [history]);

  return (
    <EditorContext.Provider value={{ state, dispatch, shortcuts }}>
      <Editor />
    </EditorContext.Provider>
  );
}

function EditorRoot({ source, zIndex, onChange, shortcuts, cursor, history }) {
  const [fontMetric, setFontMetric] = useState(undefined);
  return fontMetric ? (
    <EditorContainer
      source={source}
      fontMetric={fontMetric}
      zIndex={zIndex}
      onChange={onChange}
      shortcuts={shortcuts}
      cursor={cursor}
      history={history}
    />
  ) : (
    <FontMetric onLoad={fm => setFontMetric(fm)} />
  );
}

EditorRoot.propTypes = {
  content: PropTypes.string,
  zIndex: PropTypes.number,
  shortcuts: PropTypes.object,
  onChange: PropTypes.func,
  history: PropTypes.arrayOf(
    PropTypes.shape({ type: PropTypes.string.isRequired })
  ),
  cursor: PropTypes.shape({
    row: PropTypes.number.isRequired,
    index: PropTypes.number.isRequired
  })
};
EditorRoot.defaultProps = {
  source: "",
  zIndex: 0,
  onChange: () => null,
  shortcuts: {},
  cursor: undefined,
  history: []
};

export default EditorRoot;
