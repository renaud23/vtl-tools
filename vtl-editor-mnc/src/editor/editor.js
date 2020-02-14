import React from "react";
import MonacoEditor from "react-monaco-editor";
import monarch from "./editor-monarch";
import theme from "./editor-theme";
import "./editor.scss";

const VTL_LANGUAGE_ID = "vtlLanguage";
const VTL_THEME_DEFAULT = "vtlTheme";

function onMount(monaco) {
  monaco.languages.register({ id: VTL_LANGUAGE_ID });
  monaco.languages.setMonarchTokensProvider(VTL_LANGUAGE_ID, monarch);
  monaco.editor.defineTheme(VTL_THEME_DEFAULT, theme);
}

function Editor({ source = "" }) {
  return (
    <div className="editor">
      <MonacoEditor
        width="800"
        height="600"
        language="vtlLanguage"
        theme="vtlTheme"
        value={source}
        options={{}}
        onChange={() => null}
        editorWillMount={onMount}
      />
    </div>
  );
}

export default Editor;
