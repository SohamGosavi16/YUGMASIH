const fs = require('fs');

let css = fs.readFileSync('css/voiceGuideAccess.css', 'utf8');

const targetStart = '/* ════ STANDALONE HERITAGE VOICE GUIDE SYSTEM ════ */';
const targetAuth = '/* ── AUTH MODAL OVERRIDE WHEN ACTIVE ─────────────────────────────────────── */';

const p1 = css.indexOf(targetStart);
const p2 = css.indexOf(targetAuth);

if (p1 !== -1 && p2 !== -1) {
  css = css.substring(0, p1) + css.substring(p2);
  fs.writeFileSync('css/voiceGuideAccess.css', css, 'utf8');
  console.log('Cleaned up standalone vg styles from css/voiceGuideAccess.css while keeping auth override!');
} else {
  console.log('Markers not found');
}

