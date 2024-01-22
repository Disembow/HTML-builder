const { join } = require('path');
const { stat } = require('fs');
const { readdir } = require('fs/promises');
const { stdout } = process;

const secretFolder = join(__dirname, 'secret-folder');

async function readSecretDir(folderPath) {
  const files = await readdir(folderPath, { withFileTypes: true });

  for (let i = 0; i < files.length; i++) {
    if (!files[i].isDirectory()) {
      const pathToFile = join(secretFolder, `${files[i].name}`);

      stat(pathToFile, (err, stats) => {
        if (err) {
          throw err;
        }

        const size = Math.round((stats.size / 1024) * 1000) / 1000;

        const [filename, ext] = files[i].name.split('.');
        stdout.write(`${filename} - ${ext} - ${size}kb\n`);
      });
    }
  }
}

readSecretDir(secretFolder);
