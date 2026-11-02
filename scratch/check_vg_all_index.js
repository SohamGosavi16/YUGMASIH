const fs = require('fs');

const indexHtml = fs.readFileSync('index.html', 'utf8');

// Check every occurrence of "btn-voice" or "voice-guide" or "yugma-standalone-vg"
const matches = [];
let pos = 0;
while (true) {
  const idx = indexHtml.indexOf('voice-guide', pos);
  if (idx === -1) break;
  matches.push(idx);
  pos = idx + 11;
}
console.log('Matches for "voice-guide" in index.html:', matches);
matches.forEach((idx, i) => {
  console.log(`[${i}] pos ${idx}:`, JSON.stringify(indexHtml.substring(Math.max(0, idx - 40), Math.min(indexHtml.length, idx + 80))));
});

