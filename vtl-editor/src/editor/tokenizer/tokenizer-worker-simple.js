const PUSHER_INTERVAL = 200;
let ID = 0;

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

const createTask = content => ({
  id: `${ID++}#${new Date().getTime()}`,
  content
});

export const createVtlTaksManager = () => {
  const worker = new Worker("/worker-vtl-2.0-insee.js");
  let currentIdTask = undefined;
  let pusherTask = undefined;

  return (content, callback) => {
    if (!content.length) return;

    if (pusherTask) {
      console.log("clear", pusherTask);
      window.clearTimeout(pusherTask);
    }

    pusherTask = window.setTimeout(() => {
      pusherTask = undefined;
      const at = new Date().getTime();
      const id = `${ID++}#${at}`;
      worker.postMessage({ action: "parse", content, id });
      worker.onmessage = createWorkerCallback(content, data => {
        if (data.id === currentIdTask) {
          callback(data);
        }
        pusherTask = undefined;
      });

      currentIdTask = id;
    }, PUSHER_INTERVAL);
  };
};
