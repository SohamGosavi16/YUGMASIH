const fs = require('fs');

const index = fs.readFileSync('index.html', 'utf8');

const cIdx = index.indexOf('function closeAuthModal');
console.log(index.substring(cIdx, cIdx + 800));

