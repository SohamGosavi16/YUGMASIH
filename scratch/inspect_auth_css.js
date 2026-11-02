const fs = require('fs');

const index = fs.readFileSync('index.html', 'utf8');

const authCssIdx = index.indexOf('yugma-session-restored');
console.log(index.substring(authCssIdx - 100, authCssIdx + 400));

