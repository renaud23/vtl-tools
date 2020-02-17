import React, { useEffect, useState } from "react";
import postTask from "./worker-task";
import PropTypes from "prop-types";
import "./console.scss";

function Errors({ errors = [] }) {
  return errors.map(({ msg, line, column, stack }, i) => (
    <div key={`${i}-${line}${column}`} className="vtl-console-error">
      <span className="vtl-console-line">{`Line ${line}:${column}`}</span>
      <span className="vtl-console-message">{msg}</span>
    </div>
  ));
}

function Console({ source, level }) {
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    postTask(source, `Parse#${new Date().getTime()}`).then(
      ({ errors = [] }) => {
        setErrors(errors);
      }
    );
  }, [source]);

  return (
    <div className="vtl-console">
      <Errors errors={errors} />
    </div>
  );
}

Console.defaultProps = {
  source: "",
  level: "start"
};

Console.propTypes = {
  source: PropTypes.string,
  level: PropTypes.string
};

export default React.memo(Console);
