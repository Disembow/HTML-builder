const { join, extname } = require('path');
const { mkdir, readdir, copyFile, readFile, writeFile, rm } = require('fs/promises');
const { createReadStream, createWriteStream } = require('fs');

async function init() {
  const targetFolder = join(__dirname, 'project-dist');
  await rm(targetFolder, { recursive: true, force: true });

  const newDirPath = join(targetFolder, 'assets');

  (async function copyFiles() {
    await mkdir(newDirPath, { recursive: true });

    try {
      const filesToCopy = await readdir(join(__dirname, 'assets'), {
        withFileTypes: true,
      });

      for (let i = 0; i < filesToCopy.length; i++) {
        if (filesToCopy[i].isDirectory()) {
          await mkdir(join(newDirPath, filesToCopy[i].name), {
            recursive: true,
          });

          const newFilesToCopy = await readdir(join(__dirname, 'assets', filesToCopy[i].name), {
            withFileTypes: true,
          });

          for (let j = 0; j < newFilesToCopy.length; j++) {
            await copyFile(
              join(__dirname, 'assets', filesToCopy[i].name, newFilesToCopy[j].name),
              join(newDirPath, filesToCopy[i].name, newFilesToCopy[j].name)
            );
          }
        }
      }
    } catch (err) {
      console.log(err);
    }
  })();

  (async function bundleFiles() {
    try {
      await mkdir(newDirPath, { recursive: true });

      const writableStream = createWriteStream(join(__dirname, 'project-dist', 'style.css'), {
        encoding: 'utf-8',
      });

      const filesToBundle = await readdir(join(__dirname, 'styles'), {
        withFileTypes: true,
      });

      filesToBundle.forEach((file) => {
        if (file.name.split('.')[1] === 'css' && file.isFile() === true) {
          let stream = createReadStream(join(__dirname, 'styles', file.name), 'utf-8');

          stream.on('data', (chunk) => writableStream.write(chunk));
          stream.on('error', (error) => console.error(error.message));
        }
      });
    } catch (err) {
      console.log(err);
    }
  })();

  (async function createHTML() {
    try {
      const init = await readFile(join(__dirname, 'template.html'));
      let initHTML = init.toString();

      const sections = await readdir(join(__dirname, 'components'), {
        withFileTypes: true,
      });

      let str = '';

      for (let i = 0; i < sections.length; i++) {
        if (sections[i].isFile() && extname(sections[i].name) === '.html') {
          str = await readFile(join(__dirname, 'components', `${sections[i].name}`));
          initHTML = initHTML.replace(`{{${sections[i].name.slice(0, -5)}}}`, str.toString());
        }
      }

      writeFile(join(__dirname, 'project-dist', 'index.html'), initHTML);
    } catch (err) {
      console.log(err);
    }
  })();
}

init();
