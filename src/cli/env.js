const parseEnv = () => {
  const prefix = 'RSS_';
  const envVariables = [];

  // process.env представляет собой объект, который содержит переменные окружения операционной системы
  // Объект process.env предоставляет доступ в виде свойств объекта. Ключами объекта являются имена переменных окружения, а значениями - соответствующие значения.
  for (const [key, value] of Object.entries(process.env)) {
    if (key.startsWith(prefix)) {
      envVariables.push(`${key}=${value}`);
    }
  }

  const formattedEnvVariables = envVariables.join('; ');
  console.log(formattedEnvVariables);
};

parseEnv();
