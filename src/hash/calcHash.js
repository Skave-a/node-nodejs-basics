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
      console.log('\x1b[33m\x1b[1m%s\x1b[0m', hexHash);
      resolve();
    });

    stream.on('error', (err) => {
      reject(err);
    });
  });
};

(async () => {
  try {
    await calculateHash();
  } catch (error) {
    console.error("Error calculating hash:", error.message || 'Hash calculation failed');
    throw new Error('Hash operation failed');
  }
})();
