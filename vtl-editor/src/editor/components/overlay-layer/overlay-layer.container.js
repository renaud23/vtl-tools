import React from "react";
import Overlay from "./overlay-layer";
import { HorizontalScrollrange } from "./horizontal-scrollrange";
import VerticalScrollrange from "./vertical-scrollrange";

function OverlayLayerContainer() {
  return (
    <Overlay>
      <HorizontalScrollrange />
      <VerticalScrollrange />
    </Overlay>
  );
}

export default OverlayLayerContainer;
