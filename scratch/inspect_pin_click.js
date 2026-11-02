const fs = require('fs');

const index = fs.readFileSync('index.html', 'utf8');

const pinIdx = index.indexOf('globe-state-pin');
if (pinIdx !== -1) {
  console.log(index.substring(pinIdx - 100, pinIdx + 1200));
}

