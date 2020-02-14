import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import Editor from "./editor";
import "./application.scss";

function App() {
  const [source, setSource] = useState("");
  useEffect(function() {
    fetch("/rule.vtl")
      .then(r => r.text())
      .then(rule => {
        setSource(rule);
      });
  }, []);
  return (
    <div className="application">
      <Editor source={source} />
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
