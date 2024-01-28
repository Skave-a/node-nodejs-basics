import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const copy  = async () => {
  // fileURLToPath(import.meta.url) используется для получения пути к текущему файлу
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const srcPath = path.join(__dirname, 'files');
  const destPath = path.join(__dirname, 'files_copy');

  try {
    //  fs.stat возвращает объект, который содержит информацию о файле или папке, 
    // такую как размер, дату создания, дату изменения, права доступа и другие сведения.
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

        // является ли файл или папка директорией (папкой).
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
