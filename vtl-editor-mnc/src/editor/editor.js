import React, { useRef, useState, useEffect } from "react";
import monaco from "./monaco.min";

import monarch from "./editor-monarch";
import theme from "./editor-theme";
import createFoldingProvider from "./editor-folding-range";
import "./editor.scss";

const VTL_LANGUAGE_ID = "vtlLanguage";
const VTL_THEME_DEFAULT = "vtlTheme";

monaco.languages.register({ id: VTL_LANGUAGE_ID });
monaco.languages.setMonarchTokensProvider(VTL_LANGUAGE_ID, monarch);
monaco.languages.registerFoldingRangeProvider(
  VTL_LANGUAGE_ID,
  createFoldingProvider(monaco)
);
monaco.editor.defineTheme(VTL_THEME_DEFAULT, theme);

function Editor({ source = "", onChange = () => null }) {
  const editorEl = useRef();
  const [editor, setEditor] = useState(undefined);

  useEffect(() => {
    if (editor) {
      editor.onDidChangeModelContent(() => {
        onChange(editor.getValue());
      });
    }
  }, [onChange, editor]);

  useEffect(() => {
    if (editorEl.current) {
      const e = monaco.editor.create(editorEl.current, {
        language: VTL_LANGUAGE_ID
      });
      monaco.editor.setTheme(VTL_THEME_DEFAULT);

      setEditor(e);
    }
  }, [editorEl]);

  useEffect(() => {
    if (editor) {
      editor.setValue(source);
    }
  }, [source, editor]);

  return <div className="vtl-editoe-mnc" ref={editorEl}></div>;
}

export default Editor;
