import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const read = async () => {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    const filePath = path.join(__dirname, 'files', 'fileToRead.txt');

    const readableStream = fs.createReadStream(filePath);

    readableStream.on('error', (error) => {
        console.error('Failed to open or read file:', error.message);
        throw new Error('Read operation failed');
    });

    readableStream.pipe(process.stdout);
};

(async () => {
    try {
        await read();
    } catch (error) {
        console.error('Failed to print file content:', error.message);
    }
})();