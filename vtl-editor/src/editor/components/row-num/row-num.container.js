import React, { useContext } from "react";
import { EditorContext } from "../../events";
import RowNum from "./row-num";

function RowNumContainer() {
  const { state } = useContext(EditorContext);

  const { verticalScrollrange, lines } = state;

  if (verticalScrollrange) {
    const { start, offset } = verticalScrollrange;
    return (
      <RowNum start={start} offset={Math.min(offset, lines.length - start)} />
    );
  }
  return null;
}

export default RowNumContainer;
