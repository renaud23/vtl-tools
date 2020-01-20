import React, { useContext } from "react";
import { EditorContext } from "../../events";
import StepFilterTokens from "./step-filter-tokens";

function TokensContainer() {
  const { state } = useContext(EditorContext);
  const { visibles, horizontalScrollrange, tokens } = state;

  return (
    <StepFilterTokens
      visibles={visibles}
      tokens={tokens}
      horizontalScrollrange={horizontalScrollrange}
    />
  );
}

export default TokensContainer;
