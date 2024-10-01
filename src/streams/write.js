import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const write = () => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const filePath = path.join(__dirname, "files", "fileToWrite.txt");

  const writeStream = fs.createWriteStream(filePath);

  writeStream.on('error', (error) => {
    console.error("An error occurred:", error.message);
    throw new Error('Write operation failed');
  });

  process.stdin.pipe(writeStream);
};

write();