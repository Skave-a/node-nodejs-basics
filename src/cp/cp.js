import { spawn } from 'child_process';

import { fileURLToPath } from 'url';
import path, { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const scriptPath = path.join(__dirname, 'files', 'script.js');

const spawnChildProcess = async (args) => {
  const child = spawn('node', [scriptPath, ...args], { stdio: ['pipe', 'pipe', 'inherit'] });

  process.stdin.pipe(child.stdin);

  child.stdout.on('data', (data) => {
    process.stdout.write(data);
  });

  child.on('exit', (code, signal) => {
    console.log(`Child process exited with code ${code} and signal ${signal}`);
  });
};

spawnChildProcess(['someArgument1', 'someArgument2']);
