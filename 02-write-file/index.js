const { join } = require('path');
const { createWriteStream } = require('fs');
const { stdin, stdout } = process;

const pathToFile = join(__dirname, 'message.txt');
const writableStream = createWriteStream(pathToFile, {
  encoding: 'utf-8',
});

const welcomeMessage = 'Please, enter your message\n';
const farewellMessage = 'Good luck finding Node.js!';
const runMessage = 'Please, enter your message or press Ctrl + C to exit\n';

stdout.write(welcomeMessage);

stdin.on('data', (data) => {
  if (data.toString().toLowerCase().trim() === 'exit') {
    stdout.write(farewellMessage);
    process.exit();
  }

  stdout.write(runMessage);
  writableStream.write(data);
  writableStream.on('error', (e) => console.log(e));
});

process.on('SIGINT', () => {
  stdout.write(farewellMessage);
  process.exit();
});
