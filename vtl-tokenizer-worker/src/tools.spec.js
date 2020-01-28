import { createTokensMap } from "./tools";
import vtl from "./antlr-tools/vtl-2.0-Insee";

describe("tools", function() {
  it("tokensSourceMap", function() {
    const source =
      '/**\r\n * Welcome to VTL\r\n **/\r\n a := "one way ticket";\r\n';
    const map = createTokensMap(vtl.getTokens(source), source);

    expect(true).toEqual(true);
  });
});
