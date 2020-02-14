import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import Editor from "./editor";

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
    <div classNAme="application">
      <Editor source={source} />
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
