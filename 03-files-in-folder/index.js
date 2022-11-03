const path = require('path');
const fs = require('fs');
const { stdout } = process;

const secretFolder = path.join(__dirname, 'secret-folder')

async function readSecretDir (folderPath) {
  const files = await fs.promises.readdir(folderPath, { withFileTypes: true });
  for (let i = 0; i < files.length; i++) {
    if (files[i].isDirectory() === false) {
      let name = files[i].name.split('.');
      let size = 0;
      fs.stat(path.join(secretFolder, `./${files[i].name}`), (err, stats) => {
        if (err) {
          throw err;
        }
        size = Math.round(stats.size / 1024 * 1000) / 1000;
        stdout.write(`${name[0]} - ${name[1]} - ${size}kb\n`);
      });
    };
  };
};

readSecretDir(secretFolder);
