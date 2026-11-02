const fs = require('fs');

const index = fs.readFileSync('index.html', 'utf8');

// Check bottom-left / bottom-right controls or UI elements in index.html
console.log('Searching for buttons/panels in index.html...');
const patterns = ['bharat-geospatial', 'control-bar', 'map-controls', 'drawer', 'arvr-modal', 'voice-guide'];
patterns.forEach(p => {
  const matches = [];
  let pos = 0;
  while (true) {
    const idx = index.toLowerCase().indexOf(p, pos);
    if (idx === -1) break;
    matches.push(idx);
    pos = idx + p.length + 5;
  }
  console.log(`Pattern "${p}": ${matches.length} occurrences`);
});

