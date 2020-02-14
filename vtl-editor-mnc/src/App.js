import React, { useEffect, useState } from "react";
import Editor from "./editor";
import "./App.css";

function App() {
  const [source, setSource] = useState("");
  useEffect(() => {
    fetch("/rule.vtl")
      .then(r => r.text())
      .then(src => {
        setSource(src || "");
      });
  }, []);
  return <Editor source={source} />;
}

export default App;
