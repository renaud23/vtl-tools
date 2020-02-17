import React, { useState, useEffect } from "react";
import { storiesOf } from "@storybook/react";
import Editor from "editor";

const stories = storiesOf("Editor", module);

function App() {
  const [source, setSource] = useState("");
  useEffect(function() {
    fetch("/rule.vtl")
      .then(r => r.text())
      .then(rule => {
        setSource(rule);
      });
  }, []);
  return <Editor source={source} />;
}

stories.add("Editor", () => (
  <div style={{ width: 600, height: 280 }}>
    <App />
  </div>
));
