const fs = require('fs');
const path = require('path');

function searchAll(dir) {
  for (const f of fs.readdirSync(dir)) {
    const full = path.join(dir, f);
    if (fs.statSync(full).isDirectory()) {
      if (f !== '.git' && f !== '.gemini') searchAll(full);
    } else if (f.endsWith('.js') || f.endsWith('.py') || f.endsWith('.html') || f.endsWith('.css') || f.endsWith('.txt')) {
      const c = fs.readFileSync(full, 'utf8');
      if (c.includes('voice-guide-fab') || c.includes('voice-guide-panel') || c.includes('state-vg-card') || c.includes('btn-voice-guide') || c.includes('modal-voice-guide-card')) {
        console.log(`Found VG in: ${full}`);
      }
    }
  }
}

searchAll('.');

