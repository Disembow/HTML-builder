const { mkdir, unlink, copyFile } = require('fs');
const path = require('path');
const { readdir } = require('fs/promises');

const newDir = path.resolve('04-copy-directory', 'files-copy');

mkdir(newDir, { recursive: true }, (err) => {
  if (err) console.log(err);
});

async function copyFiles() {
  try {
    const copies = await readdir(newDir, { withFileTypes: true });

    for (let copy of copies) {
      unlink(`${newDir}/${copy.name}`, function (err) {
        if (err) console.log(err);
      });
    }

    const item = await readdir(path.join('04-copy-directory', 'files'), {
      withFileTypes: true,
    });

    for (const items of item) {
      if (items.isFile()) {
        const pathToInitialFiles = path.join('04-copy-directory', 'files', `${items.name}`);
        const pathToTargetDir = path.join('04-copy-directory', 'files-copy', `${items.name}`);

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
