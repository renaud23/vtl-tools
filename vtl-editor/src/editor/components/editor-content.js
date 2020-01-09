import React from "react";
import PropTypes from "prop-types";
import { TokensLayer } from "./tokens-layer";
import { OverlayLayer } from "./overlay-layer";

function EditorContent({ content, fontMetric }) {
  return (
    <>
      <div className="vtl-editor-rownum" />
      <div className="vtl-editor-container">
        <OverlayLayer />
        <TokensLayer />
      </div>
    </>
  );
}

EditorContent.propTypes = {
  content: PropTypes.string
  // fontMetric: PropTypes.shape({
  //   width: PropTypes.number.isRequired,
  //   height: PropTypes.number.isRequired
  // }).isRequired
};
EditorContent.defaultProps = { content: "" };

export default EditorContent;
