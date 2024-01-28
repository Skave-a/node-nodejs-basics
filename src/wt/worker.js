import { parentPort } from 'worker_threads';

const nthFibonacci = (n) => n < 2 ? n : nthFibonacci(n - 1) + nthFibonacci(n - 2);

const sendResult = (result) => {
  parentPort.postMessage(result);
};

parentPort.on('message', (event) => {
  const data = event.data;
  const n = data.n;

  try {
    const result = nthFibonacci(n);
    sendResult({ status: 'resolved', data: result });
  } catch (error) {
    sendResult({ status: 'error', data: null });
  }
});
