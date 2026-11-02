const fs = require('fs');

const index = fs.readFileSync('index.html', 'utf8');

const matches = [];
let idx = 0;
while ((idx = index.indexOf('#yugma-auth', idx)) !== -1) {
  matches.push(index.substring(idx, idx + 200));
  idx += 11;
}
console.log('Matches for #yugma-auth:\n', matches);

