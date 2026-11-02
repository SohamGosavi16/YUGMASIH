const fs = require('fs');

const content = fs.readFileSync('index.html', 'utf8');
const lines = content.split('\n');
for (let i = 0; i < lines.length; i++) {
  if (lines[i].includes('id="state-drawer"') || lines[i].includes('class="state-drawer"')) {
    console.log('Drawer at line:', i+1);
    for (let j = Math.max(0, i-5); j < Math.min(lines.length, i + 50); j++) {
      console.log((j+1) + ': ' + lines[j].substring(0, 100));
    }
    break;
  }
}

