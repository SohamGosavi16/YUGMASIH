const fs = require('fs');

const indiaHtml = fs.readFileSync('india_3d_map.html', 'utf8');

const matches = [];
const re = /voice|assist|speech|state-vg/gi;
let m;
while ((m = re.exec(indiaHtml)) !== null) {
  matches.push({
    index: m.index,
    snippet: indiaHtml.substring(Math.max(0, m.index - 50), Math.min(indiaHtml.length, m.index + 100))
  });
}
console.log('Matches in india_3d_map.html:', matches.length);
matches.forEach((item, i) => {
  console.log(`[${i}] pos ${item.index}: ${JSON.stringify(item.snippet)}`);
});

