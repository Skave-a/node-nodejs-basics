import os from 'os';
import { Worker } from 'worker_threads';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const workerPath = path.resolve(__dirname, 'worker.js');

const createWorkers = async () => {
  const numCores = os.cpus().length;
  const workers = [];

  for (let i = 0; i < numCores; i++) {
    const worker = new Worker(workerPath);
    workers.push(worker);

    const data = {
      n: 10 + i
    };

    worker.postMessage({ data });
  }

  const results = await Promise.all(
    workers.map(worker => {
      return new Promise((resolve, reject) => {
        worker.on('message', result => {
          resolve(result);
        });

        worker.on('error', error => {
          reject(error);
        });
      });
    })
  );

  return results;
};

const performCalculations = async () => {
  const results = await createWorkers();
  console.log(results);
};

performCalculations();
