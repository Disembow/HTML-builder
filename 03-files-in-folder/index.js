const { join } = require('path');
const { promises, stat } = require('fs');
const { stdout } = process;

const secretFolder = join(__dirname, 'secret-folder');

async function readSecretDir(folderPath) {
  const files = await promises.readdir(folderPath, { withFileTypes: true });

  for (let i = 0; i < files.length; i++) {
    if (!files[i].isDirectory()) {
      const pathToFile = join(secretFolder, `./${files[i].name}`);

      let name = files[i].name.split('.');
      let size = 0;

      stat(pathToFile, (err, stats) => {
        if (err) {
          throw err;
        }

        size = Math.round((stats.size / 1024) * 1000) / 1000;
        stdout.write(`${name[0]} - ${name[1]} - ${size}kb\n`);
      });
    }
  }
}

readSecretDir(secretFolder);
