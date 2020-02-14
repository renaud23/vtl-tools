function foldingProvider(monaco) {
  return {
    provideFoldingRanges: function(model, context, token) {
      return "prout";
      //   return [
      //     {
      //       start: 5,
      //       end: 7,
      //       kind: monaco.languages.FoldingRangeKind.Comment
      //     },
      //     // comment2
      //     {
      //       start: 13,
      //       end: 17,
      //       kind: monaco.languages.FoldingRangeKind.Comment
      //     }
      //   ];
    }
  };
}

export default foldingProvider;
