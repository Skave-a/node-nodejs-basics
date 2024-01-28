import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const rename = async () => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const filePath = path.join(__dirname, 'files');
  const srcPath = path.join(filePath, 'wrongFilename.txt');
  const destPath = path.join(filePath, 'properFilename.md');

  try {
    await fs.promises.access(srcPath);
    await fs.promises.access(destPath);
    throw new Error('FS operation failed');
  } catch (error) {
    if (error.code === 'ENOENT') {
      try {
        await fs.promises.rename(srcPath, destPath);
      } catch (error) {
        throw new Error('FS operation failed');
      }
    } else {
      throw error;
    }
  }
};

await rename();
  