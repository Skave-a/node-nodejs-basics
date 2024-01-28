import fs from 'fs';

const create = async () => {
  const filePath = './files/fresh.txt';
  const fileContent = 'I am fresh and young';

  try {
    // access - проверяет доступность файла или папки
    await fs.promises.access(filePath);
    throw new Error('FS operation failed');
  } catch (error) {
    // ошибка ENOENT - файл не существует
    if (error.code === 'ENOENT') {
      await fs.promises.writeFile(filePath, fileContent);
    } else {
      throw error;
    }
  }
};

await create();
