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

const FILES = [
  { name: "rule 1", source: "first", history: [] },
  { name: "rule 2", source: "two", history: [] }
];

const SOURCES = {};
SOURCES[0] = "fsfsdf";
SOURCES[1] = "aaaaaa";

const App = () => {
  const [source, setSource] = useState("");
  const [active, setActive] = useState(0);
  const [files, setFiles] = useState(FILES);
  const [history, setHistory] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [cursor] = useState({ row: 0, index: 0 });

  const onChange = useCallback((src, history) => {
    // console.log(active);
    // SOURCES[active] = src;
    // console.log(active, src);
    // setSource(src);
  }, []);

  useEffect(() => {
    if (!loaded) {
      fetchContent().then(rule => {
        setFiles([...files, { name: "from file" }]);
        setSource(rule);
        SOURCES[files.length] = rule;
        setActive(files.length);
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
          onSelect={(i, name) => {
            setActive(i);
            setSource(SOURCES[i] || "");
          }}
        />
        <div className="editor">
          <VtlEditor
            source={source}
            onChange={onChange}
            cursor={cursor}
            history={history}
          />
        </div>
        <Paragraphe />
      </div>
    </div>
  );
};

render(<App />, document.getElementById("root"));
