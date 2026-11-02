const fs = require('fs');

const testSuite = fs.readFileSync('scratch/test_voice_guide_suite.js', 'utf8');

const lines = testSuite.split('\n').filter(l => l.includes('assert('));
console.log('All assertions in test suite:');
lines.forEach(l => console.log(l.trim()));

