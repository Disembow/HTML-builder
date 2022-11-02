const path = require('path');
const fs = require('fs');
const { stdin, stdout } = process;


const writableStream = fs.createWriteStream(path.join(__dirname, 'message.txt'), {encoding: 'utf-8'});

stdout.write('Please, enter your message\n');
stdin.on('data', data => {
  if (data.toString().trim() === 'exit') {
    stdout.write('Удачи в изучении Node.js!')
    process.exit();
  }
  stdout.write('Please, enter your message or press Ctrl + C to exit\n');
  writableStream.write(data);
  writableStream.on('error', (e) => console.log(e));
});
process.on('SIGINT', () => {
  stdout.write('Удачи в изучении Node.js!')
  process.exit();
});