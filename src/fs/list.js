import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const list = async () => {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    const folderPath = path.join(__dirname, 'files');
  
    try {
      await fs.promises.access(folderPath);
      const fileNames = await fs.promises.readdir(folderPath);
      console.log(fileNames);
    } catch (error) {
      if (error.code === 'ENOENT') {
        throw new Error('FS operation failed');
      } else {
        throw error;
      }
    }
  };
  
  await list();
  