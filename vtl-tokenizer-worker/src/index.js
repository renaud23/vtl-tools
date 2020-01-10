import vtl from "./antlr-tools/vtl-2.0-Insee";
("use strict");
const antlr4 = require("antlr4/index");
(function() {
  onmessage = function(e) {
    const { action, content, root } = e.data;
    if (action && content) {
      switch (action) {
        case "tokenize":
          vtl.getTokens(content).then((...args) => postMessage(...args));
          break;
        case "parse":
          postMessage(vtl.parse(content, root));
        default:
      }
    }
  };
})();
