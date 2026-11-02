const fs = require('fs');

const testSuite = fs.readFileSync('scratch/test_voice_guide_suite.js', 'utf8');
console.log('test_voice_guide_suite.js length:', testSuite.length);
// print occurrences of arvr- or modal
const lines = testSuite.split('\n').filter(l => l.includes('arvr') || l.includes('vg-') || l.includes('voice-guide'));
console.log('Lines in test suite matching arvr/vg:\n', lines.slice(0, 30).join('\n'));

