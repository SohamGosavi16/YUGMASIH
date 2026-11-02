const fs = require('fs');

const css = fs.readFileSync('css/voiceGuideAccess.css', 'utf8');

// Check for yugma-standalone-vg in css
const idx = css.indexOf('.yugma-standalone-vg-fab');
console.log('yugma-standalone-vg-fab index in css:', idx);

