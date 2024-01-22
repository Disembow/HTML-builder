const { mkdir, unlink, copyFile } = require('fs');
const { join } = require('path');
const { readdir } = require('fs/promises');

async function copyFiles() {
  try {
    const newDir = join(__dirname, 'files-copy');

    mkdir(newDir, { recursive: true }, (err) => {
      if (err) console.log(err);
    });

    const copies = await readdir(newDir, { withFileTypes: true });

    for (let copy of copies) {
      unlink(`${newDir}/${copy.name}`, function (err) {
        if (err) console.log(err);
      });
    }

    const item = await readdir(join('04-copy-directory', 'files'), {
      withFileTypes: true,
    });

    for (const items of item) {
      if (items.isFile()) {
        const pathToInitialFiles = join('04-copy-directory', 'files', `${items.name}`);
        const pathToTargetDir = join('04-copy-directory', 'files-copy', `${items.name}`);

        copyFile(pathToInitialFiles, pathToTargetDir, (err) => {
          if (err) console.log(err);
        });
      }
    }
  } catch (err) {
    console.log(err);
  }
}

copyFiles();
