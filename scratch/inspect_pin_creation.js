const fs = require('fs');

const index = fs.readFileSync('index.html', 'utf8');

const jsIdx = index.indexOf("el.className = 'globe-state-pin';");
if (jsIdx !== -1) {
  console.log(index.substring(jsIdx - 100, jsIdx + 1200));
}

