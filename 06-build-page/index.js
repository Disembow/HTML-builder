const path = require('path');
const fs = require('fs');

// COPY ASSETS FILES
const newDirPath = path.join(__dirname, 'project-dist', 'assets');
async function copyFiles() {
  let newDir = await fs.promises.mkdir(newDirPath, { recursive: true });
  try {
    let filesToCopy = await fs.promises.readdir(path.join(__dirname, 'assets'), { withFileTypes: true });
    for (let i = 0; i < filesToCopy.length; i++) {
      if (filesToCopy[i].isDirectory() === true) {
        newDir = await fs.promises.mkdir(path.join(newDirPath, filesToCopy[i].name), { recursive: true });
        let newfilesToCopy = await fs.promises.readdir(path.join(__dirname, 'assets', filesToCopy[i].name), { withFileTypes: true });
        for (let j = 0; j < newfilesToCopy.length; j++) {
          const copyFile = await fs.promises.copyFile(path.join(__dirname, 'assets', filesToCopy[i].name, newfilesToCopy[j].name), path.join(newDirPath, filesToCopy[i].name, newfilesToCopy[j].name));
        };
      };
    };
  } catch (err) {
    console.log((err));
  };
};

copyFiles();

// MERGE & WRITE STYLES

async function bundleFiles() {
  try {
    let newDir = await fs.promises.mkdir(newDirPath, { recursive: true });
    const writableStream = fs.createWriteStream(path.join(__dirname, 'project-dist', 'style.css'), {encoding: 'utf-8'});
    const filesToBundle = await fs.promises.readdir(path.join(__dirname, 'styles'), { withFileTypes: true });
    filesToBundle.forEach(el => {
      if (el.name.split('.')[1] === 'css' && el.isFile() === true) {
        let stream = fs.createReadStream(path.join(__dirname, 'styles', el.name), 'utf-8');
        stream.on('data', chunk => writableStream.write(chunk));
        stream.on('error', error => console.error(error.message));
      };
    });
  } catch (err) {
    console.log((err));
  };
};

bundleFiles();

// CREATE HTML LAYOUT

async function createHTML() {
  try {
    let init = await fs.promises.readFile(path.join(__dirname, 'template.html'));
    let initHTML = init.toString();
    let sections = await fs.promises.readdir(path.join(__dirname, 'components'), {withFileTypes: true});
    let str = '';
    for (let i = 0; i < sections.length; i++) {
      if (sections[i].isFile() && path.extname(sections[i].name) === '.html'){
        str = await fs.promises.readFile(path.join(__dirname, '/components/', `${sections[i].name}`));
        initHTML = initHTML.replace(`{{${sections[i].name.slice(0, -5)}}}`, str.toString());
      };
    };
    fs.promises.writeFile(path.join(__dirname, '/project-dist/index.html'), initHTML);
  } catch (err) {
    console.log((err));
  };
};

createHTML();