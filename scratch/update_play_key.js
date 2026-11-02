const fs = require('fs');

let index = fs.readFileSync('index.html', 'utf8');

const target = `      const modal = document.getElementById('arvr-modal');
      const key = (modal && (modal.dataset.currentMonument || modal.dataset.stateId)) || 'statue_of_unity';`;
const targetCRLF = target.replace(/\n/g, '\r\n');

const replacement = `      const vgPanel = document.getElementById('yugma-standalone-voice-guide');
      if (vgPanel) vgPanel.classList.add('active');

      const card = document.getElementById('arvr-vg-card');
      const modal = document.getElementById('arvr-modal');
      const key = (card && card.dataset.currentMonument) || (modal && (modal.dataset.currentMonument || modal.dataset.stateId)) || currentDrawerStateKey || 'statue_of_unity';`;
const replacementCRLF = replacement.replace(/\n/g, '\r\n');

if (index.includes(targetCRLF)) {
  index = index.replace(targetCRLF, replacementCRLF);
  console.log('Updated playModalVoiceGuide key extraction and panel activation (CRLF)');
} else if (index.includes(target)) {
  index = index.replace(target, replacement);
  console.log('Updated playModalVoiceGuide key extraction (LF)');
} else {
  console.warn('Target not found in playModalVoiceGuide');
}

fs.writeFileSync('index.html', index, 'utf8');
console.log('Updated index.html');

