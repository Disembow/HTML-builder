const fs = require('fs');
const path = require('path');
const { stdout } = process;

const stream = fs.createReadStream(path.join(__dirname, 'text.txt'), 'utf-8');
let str = ''
stream.on('data', chunk => str += chunk);
stream.on('end', () => stdout.write(str));
stream.on('error', error => console.error(error.message));