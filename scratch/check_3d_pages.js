const fs = require('fs');

const files = fs.readdirSync('.').filter(f => f.endsWith('.html') && !f.includes('backup') && f !== 'index.html' && f !== 'india_3d_map.html' && f !== 'auth.html');
const vgPages = [];
for (const f of files) {
  const content = fs.readFileSync(f, 'utf8');
  if (content.includes('vg-panel') || content.includes('btn-voice-guide') || content.includes('VG_SCRIPTS')) {
    const hasSupabase = content.includes('supabase');
    const hasAuth = content.includes('auth.js');
    vgPages.push({ file: f, hasSupabase, hasAuth });
  }
}
console.log('Standalone 3D pages with VG:', vgPages.length);
console.log(vgPages);

