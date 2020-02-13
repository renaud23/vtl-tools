import React, { useEffect, useState, useCallback } from "react";
import { render } from "react-dom";
import FileBar from "./file-bar";
import VtlConsole from "./console";
import VtlEditor from "./editor";
import "./application.scss";
import "./vtl-tokens.scss";

const fetchContent = () => fetch("/rule.vtl").then(response => response.text());

const createFile = (name, source) => ({
  name,
  source,
  history: [],
  state: { cursor: undefined, extent: undefined, anchor: undefined }
});

const FILES = [
  createFile("first file", "a := 5;"),
  createFile("other one", "// No one is innocent !\r\ncalc(50);")
];

const App = () => {
  const [source, setSource] = useState("");
  const [state, setState] = useState(undefined);
  const [active, setActive] = useState(0);
  const [files, setFiles] = useState(FILES);
  const [loaded, setLoaded] = useState(false);

  const onChange = useCallback(src => {
    setSource(src);
  }, []);

  const onStateChange = useCallback(s => {
    setState({ ...s });
  }, []);

  useEffect(() => {
    if (!loaded) {
      fetchContent().then(rule => {
        setFiles([...files, createFile("from file", rule)]);
        // setActive(files.length);
      });
      setLoaded(true);
    }
  }, [files, loaded]);

  return (
    <div className="application">
      <div className="container">
        <FileBar
          files={files}
          active={active}
          onSelect={(index, name) => {
            const nf = files.map(f => {
              if (f.name === files[active].name) {
                return { ...f, source, state };
              }
              return f;
            });
            setFiles(nf);
            setActive(index);
          }}
        />

        <div className="editor">
          <VtlEditor
            source={files[active].source}
            onChange={onChange}
            onStateChange={onStateChange}
            state={files[active].state}
          />
        </div>
        <VtlConsole source={source} filter={active} />
      </div>
    </div>
  );
};

render(<App />, document.getElementById("root"));
