const fs = require('fs');

const authJs = fs.readFileSync('js/auth.js', 'utf8');

const lIdx = authJs.indexOf('/* =========================================\n   LOGIN');
console.log(authJs.substring(lIdx, lIdx + 2000));

