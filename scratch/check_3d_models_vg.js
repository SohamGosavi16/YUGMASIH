const fs = require('fs');

const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));

const model3dPages = files.filter(f => f.endsWith('_3d.html'));
console.log('Total _3d.html pages:', model3dPages.length);

const results = [];
for (const file of model3dPages) {
  const content = fs.readFileSync(file, 'utf8');
  const hasFab = content.includes('id="btn-voice-guide"') || content.includes('voice-guide-fab');
  const hasPanel = content.includes('id="voice-guide-panel"') || content.includes('vg-panel');
  results.push({ file, hasFab, hasPanel });
}

console.log('Results for _3d.html pages:');
results.forEach(r => {
  if (!r.hasFab || !r.hasPanel) {
    console.log(`MISSING in ${r.file}: hasFab=${r.hasFab}, hasPanel=${r.hasPanel}`);
  }
});
console.log('Checked all _3d.html pages! Total with voice assist button:', results.filter(r => r.hasFab && r.hasPanel).length, '/', results.length);

