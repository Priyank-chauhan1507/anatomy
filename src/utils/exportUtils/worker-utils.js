import { uniqueId } from "lodash";

const findAWorkerWhichHasLessJob = (workers) => {
  const sortedWorkers = workers.sort((a, b) => a.jobCount - b.jobCount);
  return sortedWorkers[0];
};

export default function createMultipleWorker(
  workerPath,
  workerOpts,
  workerCount
) {
  var workers = [];

  for (let i = 0; i < workerCount; i++) {
    const worker = new Worker(workerPath, workerOpts);
    workers.push({ worker, jobCount: 0, cbMap: {} });

    worker.onmessage = (e) => {
      const key = e.data.key;
      const cb = workers[i].cbMap[key];
      if (cb) {
        cb(e);
        workers[i].jobCount--;
        delete workers[i].cbMap[key];
      }
    };
  }
  return (message, postCbMessage) => {
    const freeWorker = findAWorkerWhichHasLessJob(workers);

    const key = uniqueId();
    freeWorker.worker.postMessage({ ...message, key });
    freeWorker.cbMap[key] = postCbMessage;
    freeWorker.jobCount++;
  };
}
