import React from "react";
import MonacoEditor from "react-monaco-editor";
import monarch from "./monarch";
import "./editor.scss";

function onMount(monaco) {
  monaco.languages.register({ id: "vtlLanguage" });

  monaco.languages.setMonarchTokensProvider("vtlLanguage", monarch);

  monaco.editor.defineTheme("vtlTheme", {
    base: "vs-dark",
    inherit: false,
    rules: [
      { token: "comment", foreground: "00cc00", fontStyle: "italic ligther" },

      { token: "string", foreground: "ff8c1a" },
      /* operators */
      { token: "operator", foreground: "b1b1cd" },
      { token: "comparison", foreground: "d0d0e1" },
      {
        token: "booleanOperator",
        foreground: "d9b38c",
        fontStyle: "bold"
      },
      { token: "functionnalOperator", foreground: "ffb3ff" },
      /* */
      { token: "keyword", foreground: "80dfff" },
      { token: "function", foreground: "ff99ff" },
      /* */
      { token: "identifier", foreground: "ffe6b3" },
      /* numerics */
      { token: "number", foreground: "ccffb3" },
      { token: "number.float", foreground: "ccffb3" },
      { token: "number.hex", foreground: "ccffb3" },
      /* delimiters */
      { token: "delimiter", foreground: "ffff00" }
    ]
  });
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
