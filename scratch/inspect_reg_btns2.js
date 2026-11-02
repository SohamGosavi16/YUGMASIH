const fs = require('fs');

const vga = fs.readFileSync('js/voiceGuideAccess.js', 'utf8');

const btnIdx = vga.indexOf('signupBtn.addEventListener');
console.log(vga.substring(btnIdx, btnIdx + 2000));

