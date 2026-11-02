const fs = require('fs');

const index = fs.readFileSync('index.html', 'utf8');

// Search for monument click or pin click
const re = /openArVrModal|onMonumentClick|flyTo/gi;
let m;
while ((m = re.exec(index)) !== null) {
  console.log(index.substring(Math.max(0, m.index - 40), Math.min(index.length, m.index + 120)));
  if (re.lastIndex > 265000) break;
}

