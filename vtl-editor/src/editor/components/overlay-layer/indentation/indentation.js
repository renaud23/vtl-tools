import React from "react";

function Indentation({ tabs }) {
  return (
    <>
      {tabs.map(({ top, left, width }, i) => (
        <span
          className="vtl-editor-tabulation"
          key={i}
          style={{ top, left, width }}
        />
      ))}
    </>
  );
}

export default React.memo(Indentation);
