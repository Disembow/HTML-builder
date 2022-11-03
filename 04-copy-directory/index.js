const path = require('path');
const fs = require('fs');

async function copyFiles() {
  const newDirPath = path.join(__dirname, 'files-copy');
  const newDir = await fs.promises.mkdir(newDirPath, { recursive: true });
  const filesToCopy = await fs.promises.readdir(path.join(__dirname, 'files'));
  for (let i = 0; i < filesToCopy.length; i++) {
    const copyFile = await fs.promises.copyFile(path.join(__dirname, 'files', filesToCopy[i]), path.join(newDirPath, filesToCopy[i]));
  };
};

copyFiles().catch(console.error);