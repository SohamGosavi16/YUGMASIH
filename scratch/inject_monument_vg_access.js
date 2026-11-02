const fs = require('fs');

const files = fs.readdirSync('.').filter(f => f.endsWith('.html') && !f.includes('backup') && f !== 'index.html' && f !== 'india_3d_map.html' && f !== 'auth.html');

let injectedCount = 0;
for (const f of files) {
  let content = fs.readFileSync(f, 'utf8');
  if (content.includes('voice-guide-panel') || content.includes('id="btn-voice-guide"') || content.includes('VG_SCRIPTS')) {
    if (!content.includes('voiceGuideAccess.js')) {
      const headIdx = content.indexOf('</head>');
      if (headIdx !== -1) {
        const addition = `  <link rel="stylesheet" href="css/voiceGuideAccess.css">\n  <script src="js/voiceGuideAccess.js"></script>\n`;
        content = content.substring(0, headIdx) + addition + content.substring(headIdx);
        fs.writeFileSync(f, content, 'utf8');
        injectedCount++;
        console.log(`[OK] Injected voiceGuideAccess into ${f}`);
      }
    }
  }
}

console.log(`Total 3D monument files injected: ${injectedCount}`);

