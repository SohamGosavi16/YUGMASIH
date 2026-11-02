const fs = require('fs');

const css = fs.readFileSync('css/voiceGuideAccess.css', 'utf8');
console.log('voiceGuideAccess.css length:', css.length);
console.log(css.substring(0, 1500));

