const fs = require('fs');

const index = fs.readFileSync('index.html', 'utf8');

const mIdx = index.indexOf('function markUserLoggedIn');
console.log(index.substring(mIdx, mIdx + 1200));

