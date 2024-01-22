const { join } = require('path');
const { readdir, rm, mkdir, copyFile } = require('fs/promises');
const { stdout } = process;

const oldDir = join(__dirname, 'files');
const newDir = join(__dirname, 'files-copy');

async function copyFiles(oldDir, newDir) {
  try {
    await rm(newDir, { recursive: true, force: true });

    await mkdir(newDir, { recursive: true }, (err) => {
      if (err) console.log(err);
    });

    const items = await readdir(oldDir, {
      withFileTypes: true,
    });

    for (const item of items) {
      const pathToInitialFiles = join(oldDir, `${item.name}`);
      const pathToTargetDir = join(newDir, `${item.name}`);

      if (item.isFile()) {
        await copyFile(pathToInitialFiles, pathToTargetDir);
      }

      if (item.isDirectory()) {
        await copyFiles(pathToInitialFiles, pathToTargetDir);
      }
    }

    stdout.write('Сopying is done');
  } catch (err) {
    console.log(err);
  }
}

copyFiles(oldDir, newDir);
