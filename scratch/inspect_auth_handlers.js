const fs = require('fs');

const authJs = fs.readFileSync('js/auth.js', 'utf8');

const loginIdx = authJs.indexOf('handleLogin');
console.log(authJs.substring(loginIdx - 50, loginIdx + 2500));

