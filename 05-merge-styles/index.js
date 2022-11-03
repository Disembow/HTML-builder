const path = require('path');
const fs = require('fs');
const { stdout } = process;

const writableStream = fs.createWriteStream(path.join(__dirname, 'project-dist', 'bundle.css'), {encoding: 'utf-8'});

async function bundleFiles() {
  const filesToBundle = await fs.promises.readdir(path.join(__dirname, 'styles'), { withFileTypes: true });
  let str = '';
  filesToBundle.forEach(el => {
    if (el.name.split('.')[1] === 'css' && el.isFile() === true) {
      let stream = fs.createReadStream(path.join(__dirname, 'styles', el.name), 'utf-8');
      stream.on('data', chunk => writableStream.write(chunk));
      stream.on('error', error => console.error(error.message));
    };
  });
}

bundleFiles();