const fs = require('fs');

const content = fs.readFileSync('index.html', 'utf8');
const start = content.indexOf('const ARVR_MONUMENT_SCRIPTS = {');
const end = content.indexOf('const ARVR_SUPPORTED_LANGS = [', start);
console.log('start:', start, 'end:', end);
const sub = content.substring(start, end);
const regex = /^\s*["']?([a-zA-Z0-9_]+)["']?:\s*\{/gm;
let m;
const keys = [];
while ((m = regex.exec(sub)) !== null) {
  if (m[1] !== 'ARVR_MONUMENT_SCRIPTS') {
    keys.push(m[1]);
  }
}
console.log('Total keys in ARVR_MONUMENT_SCRIPTS:', keys.length);
console.log('Keys:', keys);

