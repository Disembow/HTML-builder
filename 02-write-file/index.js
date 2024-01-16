const { join } = require('path');
const { createWriteStream } = require('fs');
const { stdin, stdout } = process;

const pathToFile = join(__dirname, 'message.txt');
const writableStream = createWriteStream(pathToFile, {
  encoding: 'utf-8',
});

stdout.write('Please, enter your message\n');

stdin.on('data', (data) => {
  if (data.toString().trim() === 'exit') {
    stdout.write('Good luck finding Node.js!');
    process.exit();
  }

  stdout.write('Please, enter your message or press Ctrl + C to exit\n');
  writableStream.write(data);
  writableStream.on('error', (e) => console.log(e));
});

process.on('SIGINT', () => {
  stdout.write('Good luck finding Node.js!');
  process.exit();
});
