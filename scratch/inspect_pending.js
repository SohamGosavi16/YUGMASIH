const fs = require('fs');

const vga = fs.readFileSync('js/voiceGuideAccess.js', 'utf8');

const pIdx = vga.indexOf('setPendingMonument');
console.log(vga.substring(pIdx - 50, pIdx + 1200));

