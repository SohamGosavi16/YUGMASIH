const fs = require('fs');

const content = fs.readFileSync('index.html', 'utf8');
const start = content.indexOf('const YUGMA_STATES = {');
const end = content.indexOf('const STATE_COLORS = {', start);
const sub = content.substring(start, end);
const regex = /([a-zA-Z0-9_]+):\s*\{[\s\S]*?heritage:\s*['"`]([^'"`]+)['"`][\s\S]*?(?:arvr|vrPath):\s*['"`]([^'"`]+)['"`]/g;
let m;
const sites = [];
while ((m = regex.exec(sub)) !== null) {
  sites.push({ key: m[1], heritage: m[2], path: m[3] });
}
console.log('Total sites found in YUGMA_STATES:', sites.length);
console.log(sites);

