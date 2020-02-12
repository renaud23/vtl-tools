import React, { useEffect, useState } from "react";
import postTask from "./worker-task";
import stringHash from "string-hash";
import "./console.scss";

function Errors({ errors = [] }) {
  return errors.map(({ msg, line, column, stack }, i) => (
    <div key={`${i}-${line}${column}`} className="vtl-console-error">
      <span className="vtl-console-line">{`Line ${line}:${column}`}</span>
      <span className="vtl-console-message">{msg}</span>
    </div>
  ));
}

function getErrors() {}

function Console({ source, filter }) {
  const [errors, setErrors] = useState({});
  useEffect(() => {
    postTask(source, `Parse#${new Date().getTime()}`).then(
      ({ errors: errs }) => {
        setErrors({
          ...errors,
          [filter]: errors[filter] ? [...errors[filter], ...errs] : errs
        });
      }
    );
  }, [source]);

  return (
    <div className="vtl-console">
      <Errors errors={filter in errors ? errors[filter] : undefined} />
    </div>
  );
}

export default React.memo(Console);
