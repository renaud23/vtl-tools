import React, { useContext, useEffect, useState } from "react";
import { EditorContext } from "../../../events";
import Indentation from "./indentation";

function getTabs(visibles, vr, hr, { width, height }) {
  const tabs = visibles.reduce((a, l, i) => {
    if (l.row >= vr.start && l.row <= vr.stop) {
      const how = l.value.split(/[^\t]/)[0].length;
      if (how) {
        const newTabs = new Array(how).fill(null).reduce((b, _, j) => {
          if (j >= hr.start && j <= hr.stop) {
            return [...b, { top: i * height, left: j * width, width }];
          }
          return b;
        }, []);

        return [...a, ...newTabs];
      }
    }
    return a;
  }, []);
  return tabs;
}

/* **/
function IndentationContainer() {
  const { state } = useContext(EditorContext);
  const {
    visibles,
    fontMetric,
    verticalScrollrange,
    horizontalScrollrange
  } = state;
  const [tabs, setTabs] = useState([]);
  useEffect(() => {
    setTabs(
      getTabs(visibles, verticalScrollrange, horizontalScrollrange, fontMetric)
    );
  }, [visibles, verticalScrollrange, horizontalScrollrange, fontMetric]);

  return <Indentation tabs={tabs} />;
}

export default IndentationContainer;
