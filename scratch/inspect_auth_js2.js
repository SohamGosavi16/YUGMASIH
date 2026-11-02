const fs = require('fs');

const authJs = fs.readFileSync('js/auth.js', 'utf8');

const domIdx = authJs.indexOf("window.addEventListener('DOMContentLoaded'");
console.log(authJs.substring(domIdx, domIdx + 2000));

