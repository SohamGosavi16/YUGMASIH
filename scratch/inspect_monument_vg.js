const fs = require('fs');

const content = fs.readFileSync('gateway_of_india_3d.html', 'utf8');

const p1 = content.indexOf('voice-guide-fab');
console.log('FAB snippet:');
console.log(content.substring(p1 - 50, p1 + 300));

const p2 = content.indexOf('id="voice-guide-panel"');
console.log('Panel snippet:');
console.log(content.substring(p2, p2 + 2500));

