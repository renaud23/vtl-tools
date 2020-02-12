// const PUSHER_INTERVAL = 300;
// let ID = 0;

// const createWorkerCallback = (content, cally) => {
//   const start = new Date().getTime();
//   return e => {
//     const end = new Date();
//     console.log(
//       "%cparse (in millisec)",
//       "color: green;",
//       e.data.id,
//       end - start
//     );
//     cally(e.data);
//   };
// };

// export const createVtlTaksManager = () => {
//   const worker = new Worker("/worker-vtl-2.0-insee.js");
//   let currentIdTask = undefined;
//   let pusherTask = undefined;

//   return (content, callback) => {
//     if (!content.length) return;

//     if (pusherTask) {
//       window.clearTimeout(pusherTask);
//     }

//     pusherTask = window.setTimeout(() => {
//       // pusherTask = undefined;
//       const at = new Date().getTime();
//       const id = `${ID++}#${at}`;
//       worker.postMessage({ action: "tokenize", content, id });
//       worker.onmessage = createWorkerCallback(content, data => {
//         if (data.id === currentIdTask) {
//           callback({ ...data, errors: [] });
//         }
//         window.clearTimeout(pusherTask);
//         pusherTask = undefined;
//       });

//       currentIdTask = id;
//     }, PUSHER_INTERVAL);
//   };
// };
