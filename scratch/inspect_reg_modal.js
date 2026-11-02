const fs = require('fs');

const vga = fs.readFileSync('js/voiceGuideAccess.js', 'utf8');

const regIdx = vga.indexOf('showRegistrationModal: function');
console.log(vga.substring(regIdx, regIdx + 2000));

