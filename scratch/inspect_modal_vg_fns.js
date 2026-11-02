const fs = require('fs');

const index = fs.readFileSync('index.html', 'utf8');

const matches = [];
let re = /modalVg|setupModalVoiceGuide|playModalVoiceGuide|stopModalVoiceGuide/g;
let m;
while ((m = re.exec(index)) !== null) {
  matches.push({
    index: m.index,
    snippet: index.substring(Math.max(0, m.index - 50), Math.min(index.length, m.index + 120))
  });
}
console.log('Matches for modalVg functions:', matches.length);
matches.forEach((item, i) => {
  console.log(`[${i}] ${JSON.stringify(item.snippet)}`);
});

