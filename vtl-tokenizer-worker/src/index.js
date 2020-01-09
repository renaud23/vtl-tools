import vtl from "./antlr-tools/vtl-2.0-Insee";

const antlr4 = require("antlr4/index");
(function() {
  use "strict";
  onmessage = function(e) {
    const { action, content } = e.data;
    if (action && content) {
      switch (action) {
        case "tokenize":
          vtl.getTokens(content).then((...args) => postMessage(...args));
          break;
        case "parse":
          postMessage(vtl.parse(content));
        default:
      }
    }
  };
})();
