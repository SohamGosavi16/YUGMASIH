const fs = require('fs');

const index = fs.readFileSync('index.html', 'utf8');
const lines = index.split('\n');

for (let i = 0; i < lines.length; i++) {
  if (lines[i].includes('function setupModalVoiceGuide(')) {
    for (let j = i; j < i + 25; j++) {
      console.log(JSON.stringify(lines[j]));
    }
    break;
  }
}

