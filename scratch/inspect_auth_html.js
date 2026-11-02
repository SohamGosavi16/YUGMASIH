const fs = require('fs');

const authHtml = fs.readFileSync('auth.html', 'utf8');
console.log('auth.html length:', authHtml.length);
console.log(authHtml.substring(0, 1500));

