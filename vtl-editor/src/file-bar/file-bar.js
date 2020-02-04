import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import "./file-bar.scss";

function FileBar({ files, active, onSelect }) {
  return (
    <div className="vtl-file-bar">
      {files.map(({ name }, i) => (
        <span
          key={i}
          className={classnames("vtl-file-bar-item", { active: active === i })}
          onClick={e => {
            e.stopPropagation();
            onSelect(i, name);
          }}
        >
          {name}
        </span>
      ))}
    </div>
  );
}
FileBar.propTypes = {
  files: PropTypes.arrayOf(
    PropTypes.shape({ name: PropTypes.string.isRequired })
  ).isRequired,
  active: PropTypes.number.isRequired,
  onSelect: PropTypes.func.isRequired
};
FileBar.defaultProps = {
  FileBar: []
};

export default FileBar;
