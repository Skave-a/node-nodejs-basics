import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const copy  = async () => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const srcPath = path.join(__dirname, 'files');
  const destPath = path.join(__dirname, 'files_copy');

  try {
    await fs.stat(srcPath);
  } catch (error) {
    throw new Error('FS operation failed');
  }

  try {
    await fs.stat(destPath);
    throw new Error('FS operation failed');
  } catch (error) {
    if (error.code === 'ENOENT') {
      await fs.mkdir(destPath);
      const files = await fs.readdir(srcPath);

      for (const file of files) {
        const srcFilePath = path.join(srcPath, file);
        const destFilePath = path.join(destPath, file);
        const fileStats = await fs.stat(srcFilePath);

        if (fileStats.isDirectory()) {
          await copy(srcFilePath, destFilePath);
        } else {
          await fs.copyFile(srcFilePath, destFilePath);
        }
      }
    } else {
      throw error;
    }
  }
}


await copy();
