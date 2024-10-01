import { spawn } from 'child_process';

import { fileURLToPath } from 'url';
import path, { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const scriptPath = path.join(__dirname, 'files', 'script.js');

const spawnChildProcess = async (args) => {
  const child = spawn('node', [scriptPath, ...args], {
    stdio: ['pipe', 'pipe', 'pipe', 'ipc']
  });

  process.stdin.pipe(child.stdin);

  child.stdout.on('data', (data) => {
    process.stdout.write(data);
  });

  child.on('exit', (code, signal) => {
    console.log(`code ${code} and signal ${signal}`);
  });
};

spawnChildProcess(['arg1', 'arg2']);
