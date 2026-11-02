const fs = require('fs');

const index = fs.readFileSync('index.html', 'utf8');
const s = index.indexOf('id="yugma-auth-screen"');
console.log('auth-screen HTML:\n', index.substring(s, s + 3000));

