const fs = require('fs');

const authJs = fs.readFileSync('js/auth.js', 'utf8');

console.log('auth.js length:', authJs.length);
console.log(authJs.substring(0, 1500));

