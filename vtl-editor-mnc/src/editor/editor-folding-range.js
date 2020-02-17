function foldingProvider(monaco) {
  return {
    provideFoldingRanges: function(model, context, token) {
      return [
        {
          start: 1,
          end: 3,
          kind: monaco.languages.FoldingRangeKind.Comment
        }
      ];
    }
  };
}

export default foldingProvider;
