const fs = require('fs');

const authHtml = fs.readFileSync('auth.html', 'utf8');

const scriptIdx = authHtml.indexOf('<script');
console.log('Scripts in auth.html:');
console.log(authHtml.substring(scriptIdx));

