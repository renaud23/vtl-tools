let ID = 0;

// const QUEUE = [];
// let ON_WORK = false;

function getId() {
  const at = new Date().getTime();
  return `${ID++}#${at}`;
}

// const createWorkerCallback = (content, cally) => {
//   const start = new Date().getTime();
//   return e => {
//     const end = new Date();
//     console.log(
//       `%cTokenize%c\t${e.data.id}%c\t${end - start} ms`,
//       "color: white; background-color: blue;padding: 5px 5px 3px 5px;border-radius: 5px;font-weight: bolder;",
//       "color: red;",
//       "color:blue;"
//     );
//     cally(e.data);
//   };
// };

// const doIt = worker => {
//   const { content, id, callback } = QUEUE.pop();
//   worker.onmessage = createWorkerCallback(content, data => {
//     callback({ ...data });
//     if (QUEUE.length) {
//       doIt(worker);
//     } else {
//       ON_WORK = false;
//     }
//   });
//   worker.postMessage({ action: "tokenize", content, id });
// };

// export const createVtlTaksManager = () => {
//   const worker = new Worker("/worker-vtl-2.0-insee.js");

//   return (content, callback) => {
//     if (!content.length) {
//       callback({ tokens: [], id: getId() });
//       return;
//     }
//     QUEUE.push({ content, callback, id: getId() });

//     if (!ON_WORK) {
//       ON_WORK = true;
//       doIt(worker);
//     }
//   };
// };

let CURRENT = undefined;

export const createVtlTaksManager = () => {
  const worker = new Worker("/worker-vtl-2.0-insee.js");

  return (content, callback) => {
    const id = getId();
    CURRENT = id;

    worker.onmessage = function(e) {
      if (e.data.id === CURRENT) {
        callback({ ...e.data });
      }
    };

    worker.postMessage({ action: "tokenize", content, id });
  };
};
