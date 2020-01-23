import vtl from "./antlr-tools/vtl-2.0-Insee";
("use strict");
const antlr4 = require("antlr4/index");
(function() {
  onmessage = function(e) {
    const { action, content, root, id } = e.data;
    if (action && content) {
      switch (action) {
        case "tokenize":
          postMessage({ tokens: vtl.getTokens(content), id });
          break;
        case "parse":
          postMessage({ ...vtl.parse(content, root), id });
        default:
      }
    }
  };
})();
