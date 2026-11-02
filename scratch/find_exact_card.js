const fs = require('fs');

const index = fs.readFileSync('index.html', 'utf8');

const startMarker = '<!-- ══ 15-LANGUAGE HERITAGE VOICE GUIDE CARD ══ -->';
const startIdx = index.indexOf(startMarker);
console.log('startIdx:', startIdx);

// Look for the end of the card: it ends right before `<div id="arvr-multi-models"`
const nextMarker = '<div id="arvr-multi-models"';
const nextIdx = index.indexOf(nextMarker, startIdx);
console.log('nextIdx:', nextIdx);

console.log('Exact block to extract:');
console.log(index.substring(startIdx, nextIdx));

