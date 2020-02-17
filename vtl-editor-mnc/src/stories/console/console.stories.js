import React, { useState, useEffect } from "react";
import { storiesOf } from "@storybook/react";
import Console from "console";

const stories = storiesOf("Console", module);

function App() {
  const [source, setSource] = useState("");
  useEffect(function() {
    fetch("/rule.vtl")
      .then(r => r.text())
      .then(rule => {
        setSource(rule);
      });
  }, []);
  return <Console source={source} />;
}

stories.add("Editor", () => (
  <div>
    <App />
  </div>
));
