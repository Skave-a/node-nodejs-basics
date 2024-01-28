import zlib from 'zlib';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import { createReadStream, createWriteStream } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const filePath = path.join(__dirname, 'files', 'fileToCompress.txt');
const filePathToGz = path.join(__dirname, 'files', 'archive.gz');

const compress = async () => {
  const gzip = zlib.createGzip();

  const readStream = createReadStream(filePath);
  const writeStream = createWriteStream(filePathToGz);

  readStream.pipe(gzip).pipe(writeStream);

  return new Promise((resolve, reject) => {
    writeStream.on('finish', resolve);
    writeStream.on('error', reject);
  });
};

await compress();
