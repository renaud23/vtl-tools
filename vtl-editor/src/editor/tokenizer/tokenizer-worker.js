// const PUSHER_INTERVAL = 200;
// let ID = 0;

// const createWorkerCallback = (content, id, cally, start) => e => {
//   const end = new Date();
//   console.log("%cparse (in millisec)", "color: green;", id, end - start);
//   cally(e.data);
// };

// const createTask = content => ({
//   id: `${ID++}#${new Date().getTime()}`,
//   content
// });

// export const createVtlTaksManager = () => {
//   let TASKS = { current: undefined, waiting: undefined };
//   const worker = new Worker("/worker-vtl-2.0-insee.js");
//   let pusherTask = undefined;

//   function postFirst(content, callback) {
//     if (pusherTask) {
//       window.clearTimeout(pusherTask);
//     }
//     pusherTask = window.setTimeout(() => {
//       TASKS.current = createTask(content);
//       worker.onmessage = createWorkerCallback(
//         TASKS.current.content,
//         TASKS.current.id,
//         (...args) => {
//           TASKS.current = undefined;
//           if (TASKS.waiting) {
//             waiting();
//           } else {
//             callback(...args);
//           }
//           pusherTask = undefined;
//         },
//         new Date()
//       );
//       worker.postMessage({ action: "parse", content });
//     }, PUSHER_INTERVAL);
//   }

//   function waiting() {
//     const { content, callback } = TASKS.waiting;
//     TASKS.waiting = undefined;
//     postFirst(content, callback);
//   }

//   return (content, callback) => {
//     if (content.length === 0) return;

//     if (!TASKS.current) {
//       postFirst(content, callback);
//     } else {
//       TASKS.waiting = { content, callback };
//     }
//   };
// };
