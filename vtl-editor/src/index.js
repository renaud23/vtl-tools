import React, { useEffect, useState } from "react";
import { render } from "react-dom";
import { VtlEditor } from "./editor";
import "./application.scss";

const fetchContent = () => fetch("/rule.vtl").then(response => response.text());

const App = () => {
  const [content, setContent] = useState("");
  useEffect(() => {
    fetchContent().then(rule => setContent(rule));
  }, []);
  return (
    <div className="application">
      <div className="editor">
        <VtlEditor content={content} />
      </div>
    </div>
  );
};

render(<App />, document.getElementById("root"));
