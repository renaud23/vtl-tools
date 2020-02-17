let WORKER = undefined;

function cleanWorker() {
  if (WORKER) {
    WORKER.terminate();
    WORKER = undefined;
  }
}

function createWorker() {
  cleanWorker();
  WORKER = new Worker("/vtl-workers/worker-vtl-2.0-insee.js");
}

const launch = ({ content, id, level = "start" }) => {
  createWorker();
  return new Promise(function(resolve, reject) {
    WORKER.onmessage = function(e) {
      resolve({ ...e.data, id });
    };
    WORKER.postMessage({ action: "parse", content, root: level, id });
  });
};

async function post(content, id) {
  if (content.length) {
    return launch({ content, id });
  }
  return { errors: [], id };
}

export default post;
