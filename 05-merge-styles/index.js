const { join } = require('path');
const { createWriteStream, createReadStream, promises } = require('fs');

const writableStream = createWriteStream(join(__dirname, 'project-dist', 'bundle.css'), {
  encoding: 'utf-8',
});

async function bundleFiles() {
  const pathToFilesToBundle = join(__dirname, 'styles');
  const filesToBundle = await promises.readdir(pathToFilesToBundle, {
    withFileTypes: true,
  });

  filesToBundle.forEach((file) => {
    if (file.name.split('.')[1] === 'css' && file.isFile()) {
      const pathToFile = join(__dirname, 'styles', file.name);
      let stream = createReadStream(pathToFile, 'utf-8');

      stream.on('data', (chunk) => writableStream.write(chunk));
      stream.on('error', (error) => console.error(error.message));
    }
  });
}

bundleFiles();
