const fs = require('fs');

const css = fs.readFileSync('css/voiceGuideAccess.css', 'utf8');
console.log(css.substring(4000));

