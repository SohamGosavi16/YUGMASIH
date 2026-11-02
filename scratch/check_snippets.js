const fs = require('fs');

const index = fs.readFileSync('index.html', 'utf8');

const p1 = index.indexOf('html.yugma-session-restored #yugma-auth');
console.log('CSS snippet:', JSON.stringify(index.substring(p1 - 20, p1 + 180)));

const p2 = index.indexOf('function closeARVRModal');
console.log('close snippet:', JSON.stringify(index.substring(p2, p2 + 200)));

const p3 = index.indexOf('openSignup: () =>');
console.log('openSignup snippet:', JSON.stringify(index.substring(p3 - 10, p3 + 300)));

