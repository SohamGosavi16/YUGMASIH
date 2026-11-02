const fs = require('fs');

const vga = fs.readFileSync('js/voiceGuideAccess.js', 'utf8');

const updateIdx = vga.indexOf('updateUIElements: function');
console.log(vga.substring(updateIdx, updateIdx + 1200));

