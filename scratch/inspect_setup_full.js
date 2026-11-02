const fs = require('fs');

const index = fs.readFileSync('index.html', 'utf8');

const setupIdx = index.indexOf('function setupModalVoiceGuide');
console.log(index.substring(setupIdx, setupIdx + 2000));

