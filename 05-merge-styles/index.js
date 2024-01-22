const { join } = require('path');
const { createWriteStream, createReadStream } = require('fs');
const { readdir, rm } = require('fs/promises');

async function bundleFiles() {
  try {
    const pathToTargetCssFile = join(__dirname, 'project-dist', 'bundle.css');

    await rm(pathToTargetCssFile, { recursive: true, force: true });

    const writableStream = createWriteStream(pathToTargetCssFile, {
      encoding: 'utf-8',
    });

    const pathToFilesToBundle = join(__dirname, 'styles');
    const filesToBundle = await readdir(pathToFilesToBundle, {
      withFileTypes: true,
    });

    filesToBundle.forEach((file) => {
      if (file.name.split('.')[1] === 'css' && file.isFile()) {
        const pathToFile = join(__dirname, 'styles', file.name);
        const stream = createReadStream(pathToFile, 'utf-8');

        stream.on('data', (chunk) => writableStream.write(chunk));
        stream.on('error', (error) => console.error(error.message));
      }
    });
  } catch (err) {
    process.stdout.write(err);
  }
}

bundleFiles();
