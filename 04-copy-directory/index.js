const path = require('path');
const fs = require('fs');
const fsPromise = require('fs/promises');

async function copyFiles() {
  const newDirPath = path.join(__dirname, 'files-copy');
  if (newDirPath) {
    const copies = await fsPromise.readdir('04-copy-directory/files-copy', {withFileTypes: true});
    for (let copy of copies){
      fs.unlink(`04-copy-directory/files-copy/${copy.name}`, function(err){
        if (err) {
          console.log(err);
        };
      });
    }
  }
  const newDir = await fs.promises.mkdir(newDirPath, { recursive: true });
  const filesToCopy = await fs.promises.readdir(path.join(__dirname, 'files'));
  for (let i = 0; i < filesToCopy.length; i++) {
    const copyFile = await fs.promises.copyFile(path.join(__dirname, 'files', filesToCopy[i]), path.join(newDirPath, filesToCopy[i]));
  };
};

copyFiles().catch(console.error);