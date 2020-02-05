import React, { useEffect, useState, useCallback } from "react";
import { render } from "react-dom";
import FileBar from "./file-bar";
import { VtlEditor } from "./editor";
import "./application.scss";
import "./vtl-tokens.scss";

const Paragraphe = () => (
  <p className="paragraphe">
    At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis
    praesentium voluptatum deleniti atque corrupti quos dolores et quas
    molestias excepturi sint occaecati cupiditate non provident, similique sunt
    in culpa qui officia deserunt mollitia animi, id est laborum et dolorum
    fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero
    tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus
    id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis
    dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut
    rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et
    molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente
    delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut
    perferendis doloribus asperiores repellat.
  </p>
);

const fetchContent = () => fetch("/rule.vtl").then(response => response.text());

const createFile = (name, source) => ({
  name,
  source,
  history: [],
  state: { cursor: undefined, extent: undefined, anchor: undefined }
});

const FILES = [
  createFile("first file", "a := 5;"),
  createFile("other one", "toto")
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
        <Paragraphe />

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
        <Paragraphe />
      </div>
    </div>
  );
};

render(<App />, document.getElementById("root"));
