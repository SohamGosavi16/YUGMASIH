const fs = require('fs');

const files = fs.readdirSync('.').filter(f => f.endsWith('.html') && !f.includes('backup') && f !== 'index.html' && f !== 'india_3d_map.html');
const matched = [];
for (const f of files) {
  const content = fs.readFileSync(f, 'utf8');
  if (content.includes('voice-guide-panel') || content.includes('id="btn-voice-guide"') || content.includes('VG_SCRIPTS')) {
    matched.push(f);
  }
}
console.log('Monument pages with voice guide panel (' + matched.length + '):', matched);

