const fs = require('fs');

const index = fs.readFileSync('index.html', 'utf8');

// Check head tag
console.log('head has voiceGuideAccess.css:', index.includes('voiceGuideAccess.css'));
console.log('head has voiceGuideAccess.js:', index.includes('voiceGuideAccess.js'));

// Check arvr-vg-card in arvr-modal
console.log('has arvr-vg-card:', index.includes('id="arvr-vg-card"'));

// Check playModalVoiceGuide
console.log('has playModalVoiceGuide:', index.includes('function playModalVoiceGuide('));

