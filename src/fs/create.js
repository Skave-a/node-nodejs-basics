import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const create = async () => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const filePath = path.join(__dirname, "files", "fresh.txt");
  const fileContent = "I am fresh and young";

  try {
    // access - проверяет доступность файла или папки
    await fs.promises.access(filePath);
    throw new Error("FS operation failed");
  } catch (error) {
    // ошибка ENOENT - файл не существует
    if (error.code === "ENOENT") {
      await fs.promises.writeFile(filePath, fileContent);
    } else {
      throw error;
    }
  }
};

await create();