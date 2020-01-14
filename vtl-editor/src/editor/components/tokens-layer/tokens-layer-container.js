import React, { useContext } from "react";
import { EditorContext } from "../../events";
import StepVRange from "./step-vrange";

function TokensContainer() {
  const { state } = useContext(EditorContext);
  const { lines } = state;
  return <StepVRange lines={lines} />;
}

export default TokensContainer;
