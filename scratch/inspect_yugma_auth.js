const fs = require('fs');

const index = fs.readFileSync('index.html', 'utf8');

const openAuthIdx = index.indexOf('window.yugmaAuth');
console.log('window.yugmaAuth in index.html:');
if (openAuthIdx !== -1) {
  console.log(index.substring(openAuthIdx - 50, openAuthIdx + 1500));
} else {
  console.log('Not found in index.html');
}

const authJs = fs.readFileSync('js/auth.js', 'utf8');
const authJsIdx = authJs.indexOf('window.yugmaAuth');
console.log('window.yugmaAuth in js/auth.js:');
if (authJsIdx !== -1) {
  console.log(authJs.substring(authJsIdx - 50, authJsIdx + 1500));
}

