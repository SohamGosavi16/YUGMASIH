const fs = require('fs');

const vga = fs.readFileSync('js/voiceGuideAccess.js', 'utf8');

const btnIdx = vga.indexOf('btn-vg-modal-signup');
console.log(vga.substring(btnIdx - 100, btnIdx + 2000));

