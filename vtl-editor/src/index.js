import React, { useEffect, useState, useCallback } from "react";
import { render } from "react-dom";
import { VtlEditor, createSourceHistoryManager } from "./editor";
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

const App = () => {
  const [source, setSource] = useState("");
  const [history, setHistory] = useState(undefined);
  const [cursor, setCursor] = useState({ row: 0, index: 0 });
  const [shortcuts, setShortcuts] = useState({});

  const onChange = useCallback(
    (newSource, events, { cursor, anchor, extent }) => {
      if (history) {
        history.pushHistory(events);
      }
      setSource(newSource);
      setCursor(cursor);
    },
    [history]
  );

  useEffect(() => {
    fetchContent().then(rule => {
      setSource(rule);
      setHistory(createSourceHistoryManager(rule));
    });
  }, []);

  useEffect(() => {
    if (history) {
      setShortcuts({
        "ctrl|z": () => {
          if (history.isChanges()) {
            const { source: ns, cursor: nc } = history.undo();
            setSource(ns);
            setCursor(nc);
          }
          return true;
        }
      });
    }
  }, [history]);

  return (
    <div className="application">
      <div className="container">
        <Paragraphe />
        <div className="editor">
          <VtlEditor
            source={source}
            onChange={onChange}
            shortcuts={shortcuts}
            cursor={cursor}
          />
        </div>
        <Paragraphe />
      </div>
    </div>
  );
};

render(<App />, document.getElementById("root"));
