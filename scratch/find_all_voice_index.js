const fs = require('fs');

const indexHtml = fs.readFileSync('index.html', 'utf8');

// Search for any button or element with voice / speech / mic in index.html
const matches = [];
const re = /voice|assist|speech|microphone|vg-fab|vg-card|btn-voice-guide/gi;
let m;
while ((m = re.exec(indexHtml)) !== null) {
  matches.push({
    index: m.index,
    snippet: indexHtml.substring(Math.max(0, m.index - 50), Math.min(indexHtml.length, m.index + 100))
  });
}
console.log('Total matches in index.html:', matches.length);
matches.forEach((item, i) => {
  console.log(`[${i}] pos ${item.index}: ${JSON.stringify(item.snippet)}`);
});

