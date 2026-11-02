const fs = require('fs');

const index = fs.readFileSync('index.html', 'utf8');
const s = index.indexOf('id="yugma-auth"');
console.log('yugma-auth HTML:\n', index.substring(s, s + 3500));

