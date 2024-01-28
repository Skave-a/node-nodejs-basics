import { createReadStream } from 'fs';
import { createHash } from 'crypto';
import path from 'path';
import { fileURLToPath } from 'url';

const calculateHash = async () => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const filePath = path.join(__dirname, 'files', 'fileToCalculateHashFor.txt');

  const hash = createHash('sha256');

  const stream = createReadStream(filePath);

  return new Promise((resolve, reject) => {
    stream.on('data', (data) => {
      hash.update(data);
    });

    stream.on('end', () => {
      const hexHash = hash.digest('hex');
      console.log(hexHash);
      resolve();
    });

    stream.on('error', (err) => {
      reject(err);
    });
  });
};

await calculateHash();
