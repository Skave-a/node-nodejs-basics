const parseEnv = () => {
  const prefix = 'RSS_';
  const envVariables = [];

  for (const [key, value] of Object.entries(process.env)) {
    if (key.startsWith(prefix)) {
      envVariables.push(`${key}=${value}`);
    }
  }

  const formattedEnvVariables = envVariables.join('; ');
  console.log(formattedEnvVariables);
};

parseEnv();
