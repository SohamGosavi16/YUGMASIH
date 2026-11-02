const fs = require('fs');

const authJs = fs.readFileSync('js/auth.js', 'utf8');

const matches = [];
let re = /login|signup|redirect|window\.location/gi;
let m;
while ((m = re.exec(authJs)) !== null) {
  matches.push({
    index: m.index,
    snippet: authJs.substring(Math.max(0, m.index - 30), Math.min(authJs.length, m.index + 80))
  });
}
console.log('Matches in js/auth.js:', matches.length);
matches.forEach((item, i) => {
  if (i < 30) console.log(`[${i}] ${item.snippet}`);
});

