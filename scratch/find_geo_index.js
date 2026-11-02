const fs = require('fs');

const index = fs.readFileSync('index.html', 'utf8');

const matches = [];
let re = /geospatial/gi;
let m;
while ((m = re.exec(index)) !== null) {
  matches.push({
    index: m.index,
    snippet: index.substring(Math.max(0, m.index - 80), Math.min(index.length, m.index + 120))
  });
}
console.log('Geospatial in index.html:', matches);

