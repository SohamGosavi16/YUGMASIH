const fs = require('fs');

const sou = fs.readFileSync('statue_of_unity_3d.html', 'utf8');

const matches = [];
let pos = 0;
while (true) {
  const idx = sou.indexOf('voice-guide-fab', pos);
  if (idx === -1) break;
  matches.push(idx);
  pos = idx + 15;
}
console.log('Matches for voice-guide-fab in statue_of_unity_3d.html:', matches);
matches.forEach((idx, i) => {
  console.log('--- Match ' + i + ' ---');
  console.log(sou.substring(Math.max(0, idx - 40), Math.min(sou.length, idx + 400)));
});

// Let's also search for vg-panel in statue_of_unity_3d.html
const pMatches = [];
pos = 0;
while (true) {
  const idx = sou.indexOf('vg-panel', pos);
  if (idx === -1) break;
  pMatches.push(idx);
  pos = idx + 10;
}
console.log('Matches for vg-panel in statue_of_unity_3d.html:', pMatches);
pMatches.forEach((idx, i) => {
  console.log('--- vg-panel Match ' + i + ' ---');
  console.log(sou.substring(Math.max(0, idx - 40), Math.min(sou.length, idx + 400)));
});

