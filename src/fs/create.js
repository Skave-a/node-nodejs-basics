import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const create = async () => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const filePath = path.join(__dirname, "files", "fresh.txt");
  const fileContent = "I am fresh and young";

  const dirPath = path.dirname(filePath);
  await fs.promises.mkdir(dirPath, { recursive: true });

  try {
    await fs.promises.access(filePath);
    throw new Error("FS operation failed");
  } catch (error) {
    if (error.code === "ENOENT") {
      await fs.promises.writeFile(filePath, fileContent);
    } else {
      throw error;
    }
  }
};

await create();