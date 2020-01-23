let ID = 0;

const QUEUE = [];
let ON_WORK = false;

const getId = () => {
  const at = new Date().getTime();
  return `${ID++}#${at}`;
};

const createWorkerCallback = (content, cally) => {
  const start = new Date().getTime();
  return e => {
    const end = new Date();
    console.log(
      "%cparse (in millisec)",
      "color: green;",
      e.data.id,
      end - start
    );
    cally(e.data);
  };
};

const doIt = worker => {
  const { content, id, callback } = QUEUE.pop();
  worker.onmessage = createWorkerCallback(content, data => {
    callback({ ...data, errors: [] });
    // ON_WORK = false;
    if (QUEUE.length) {
      doIt(worker);
    } else {
      ON_WORK = false;
    }
  });
  worker.postMessage({ action: "tokenize", content, id });
};

export const createVtlTaksManager = () => {
  const worker = new Worker("/worker-vtl-2.0-insee.js");
  // worker.postMessage({ action: "tokenize", content, id });

  return (content, callback) => {
    if (!content.length) return;
    QUEUE.push({ content, callback, id: getId() });

    if (!ON_WORK) {
      ON_WORK = true;
      doIt(worker);
    }
  };
};
