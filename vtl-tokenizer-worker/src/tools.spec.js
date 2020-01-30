import { fillUnmappedToken } from "./tools";
import vtl from "./antlr-tools/vtl-2.0-Insee";

describe("tools", function() {
  describe("fillUnmappedToken", function() {
    it("missing tokens", function() {
      // GIVEN
      const source = "aa||bb";
      const tokensInitial = [
        { start: 0, stop: 1, value: "aa" },
        { start: 4, stop: 5, value: "bb" }
      ];
      // WHEN
      const tokensFilled = fillUnmappedToken(source, tokensInitial);
      // THEN
      expect(tokensFilled).not.toBeUndefined();
      expect(Array.isArray(tokensFilled)).toBe(true);
      expect(tokensFilled.length).toBe(3);
      expect(tokensFilled[1]).toEqual(
        expect.objectContaining({
          start: 2,
          stop: 3,
          value: "||"
        })
      );
    });
    it("empty tokens", function() {
      const source = '"';
      const tokens = fillUnmappedToken(source, vtl.getTokens(source));
      expect(tokens).not.toBeUndefined();
      expect(Array.isArray(tokens)).toBe(true);
      expect(tokens.length).toBe(1);
      expect(tokens[0]).toEqual(
        expect.objectContaining({
          start: 0,
          stop: 0,
          value: '"'
        })
      );
    });
    //
    it("missing ending token", function() {
      const source = "aabb";
      const tokens = fillUnmappedToken(source, [
        { start: 0, stop: 1, value: "aa" }
      ]);
      expect(tokens).not.toBeUndefined();
      expect(Array.isArray(tokens)).toBe(true);
      expect(tokens.length).toBe(2);
      expect(tokens[1]).toEqual(
        expect.objectContaining({
          start: 2,
          stop: 3,
          value: "bb"
        })
      );
    });
    //
  });
});
