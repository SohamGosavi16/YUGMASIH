const fs = require('fs');

const index = fs.readFileSync('index.html', 'utf8');

const sIdx = index.indexOf('function markUserLoggedIn(user) {');
const eIdx = index.indexOf('function continueAsGuest() {', sIdx);
console.log('markUserLoggedIn:\n', index.substring(sIdx, eIdx));

const sIdx2 = index.indexOf('function logoutUser() {');
const eIdx2 = index.indexOf('const btnNavLogout', sIdx2);
console.log('logoutUser:\n', index.substring(sIdx2, eIdx2));

const sIdx3 = index.indexOf('window.yugmaAuth = {');
const eIdx3 = index.indexOf('})();', sIdx3);
console.log('window.yugmaAuth:\n', index.substring(sIdx3, eIdx3));

