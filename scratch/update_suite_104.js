const fs = require('fs');

let testCode = fs.readFileSync('scratch/test_voice_guide_suite.js', 'utf8');

const old104 = `assert(indexHtml.includes('id="arvr-vg-card"'), '10.4', 'Voice guide modal card present in index.html');`;
const new104 = `// Verify voice assist button is removed from the website (index.html) and present ONLY in 3D models
  assert(!indexHtml.includes('id="btn-voice-guide"'), '10.4a', 'Voice assist button removed from website (index.html)');
  const souHtml = fs.readFileSync('statue_of_unity_3d.html', 'utf8');
  assert(souHtml.includes('id="btn-voice-guide"') && souHtml.includes('voice-guide-fab'), '10.4b', 'Voice assist button present in 3D model (Statue of Unity)');
  const gwHtml = fs.readFileSync('gateway_of_india_3d.html', 'utf8');
  assert(gwHtml.includes('id="btn-voice-guide"') && gwHtml.includes('voice-guide-fab'), '10.4c', 'Voice assist button present in 3D model (Gateway of India)');`;

if (testCode.includes(old104)) {
  testCode = testCode.replace(old104, new104);
  fs.writeFileSync('scratch/test_voice_guide_suite.js', testCode, 'utf8');
  console.log('Updated test 10.4 in scratch/test_voice_guide_suite.js');
} else {
  console.log('old104 not found');
}

