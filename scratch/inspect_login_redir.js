const fs = require('fs');

const authJs = fs.readFileSync('js/auth.js', 'utf8');

const sIdx = authJs.indexOf('if (loginSuccess');
console.log(authJs.substring(sIdx, sIdx + 1200));

