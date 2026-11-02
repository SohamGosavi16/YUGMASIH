const fs = require('fs');

const index = fs.readFileSync('index.html', 'utf8');

const pIdx = index.indexOf('function playModalVoiceGuide');
console.log(index.substring(pIdx, pIdx + 1200));

