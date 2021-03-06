import vtl from "./antlr-tools/vtl-2.0-Insee";
import { fillUnmappedToken } from "./tools";

("use strict");
const antlr4 = require("antlr4/index");
(function() {
  onmessage = function(e) {
    const { action, content, root, id } = e.data;
    if (action) {
      switch (action) {
        case "tokenize":
          postMessage({
            tokens: fillUnmappedToken(content, vtl.getTokens(content)),
            id
          });
          break;
        case "parse":
          postMessage(
            content ? { ...vtl.parse(content, root), id } : { errors: [], id }
          );
          break;
        case "dictionnary":
          postMessage({ dictionnary: vtl.getDictionnary() });
          break;
        default:
          postMessage({});
      }
    }
  };
})();
