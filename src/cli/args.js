const parseArgs = () => {
  const args = process.argv.slice(2);
  const newArgs = {};
  
  for (let i = 0; i < args.length; i += 2) {
    const name = args[i].slice(2);
    const value = args[i + 1];
    newArgs[name] = value;
  }
  
  for (const [name, value] of Object.entries(newArgs)) {
    console.log(`${name} is ${value}`);
  }
};
  
parseArgs();
