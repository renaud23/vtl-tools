import React, { useRef } from "react";
import Overlay from "./overlay-layer";
import { HorizontalScrollrange } from "./horizontal-scrollrange";

function OverlayLayerContainer() {
  const containerRef = useRef();

  return (
    <Overlay ref={containerRef}>
      <HorizontalScrollrange parentEl={containerRef.current} />
    </Overlay>
  );
}

export default OverlayLayerContainer;
