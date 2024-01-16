const { createReadStream } = require('fs');
const { join } = require('path');
const { stdout } = process;

const pathToFile = join(__dirname, 'text.txt');
const stream = createReadStream(pathToFile, 'utf-8');

let str = '';

stream.on('data', (chunk) => (str += chunk));
stream.on('end', () => stdout.write(str));
stream.on('error', (error) => console.error(error.message));
