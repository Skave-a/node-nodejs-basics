import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const read = async () => {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    const filePath = path.join(__dirname, 'files', 'fileToRead.txt');

    try {
      await fs.promises.access(filePath);
      const fileContent = await fs.promises.readFile(filePath, 'utf-8');
      console.log(fileContent);
    } catch (error) {
      if (error.code === 'ENOENT') {
        throw new Error('FS operation failed');
      } else {
        throw error;
      }
    }
  };

  await read();
