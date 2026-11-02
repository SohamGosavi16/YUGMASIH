const fs = require('fs');

const index = fs.readFileSync('index.html', 'utf8');

const openStateIdx = index.indexOf('function openStateDrawer');
console.log(index.substring(openStateIdx, openStateIdx + 1200));

