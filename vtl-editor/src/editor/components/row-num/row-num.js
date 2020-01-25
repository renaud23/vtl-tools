import React from "react";
import classnames from "classnames";

function RowNum({ start, offset }) {
  const rows = new Array(offset).fill(start).map((s, i) => (
    <div key={s + i} className="vtl-editor-rownum">
      {s + i + 1}
    </div>
  ));

  return (
    <div className={classnames("vtl-editor-rownums", "noselect")}>{rows}</div>
  );
}

export default React.memo(RowNum);
