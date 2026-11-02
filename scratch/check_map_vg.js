const fs = require('fs');

const map = fs.readFileSync('india_3d_map.html', 'utf8');

console.log('has voiceGuideAccess.js:', map.includes('voiceGuideAccess.js'));
console.log('has state-vg-card:', map.includes('id="state-vg-card"'));
console.log('has playVoiceGuide:', map.includes('function playVoiceGuide('));
console.log('has stopVoiceGuide:', map.includes('function stopVoiceGuide('));

