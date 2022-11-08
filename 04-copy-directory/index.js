const fs = require('fs');
const path = require('path');
const newDir =  path.resolve('04-copy-directory', 'files-copy');
const oldDir =  path.resolve('04-copy-directory', 'files');
const fsPromise = require('fs/promises');

fs.mkdir(newDir, { recursive: true }, err => {
  if(err) console.log(err);
});

async function copyFiles(){
  try {
    const copies = await fsPromise.readdir(newDir, {withFileTypes: true});
    for (let copy of copies){
      fs.unlink(`${newDir}/${copy.name}`, function(err){
        if (err) {
          console.log(err);
        };
      });
    };

    const item = await fsPromise.readdir(path.join('04-copy-directory', 'files'), {withFileTypes: true});
    for (const items of item) {
      if (items.isFile()){
        fs.copyFile(path.join('04-copy-directory', 'files', `${items.name}`), path.join('04-copy-directory', 'files-copy', `${items.name}`), (err) => {
          if (err) {
            console.log(err);
          };
        });
      };
    };
  } catch(err) {
    console.log((err));
  };
};

copyFiles();