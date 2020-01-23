import React from "react";

function RowNum({ start, offset }) {
  const rows = new Array(offset).fill(start).map((s, i) => (
    <div key={s + i} className="vtl-editor-rownum">
      {s + i + 1}
    </div>
  ));

  return <div className="vtl-editor-rownums">{rows}</div>;
}

export default React.memo(RowNum);
