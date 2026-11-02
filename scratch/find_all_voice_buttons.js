const fs = require('fs');

const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));

const filesWithVoiceBtn = [];
for (const file of files) {
  const content = fs.readFileSync(file, 'utf8');
  if (content.includes('btn-voice-guide') || content.includes('voice-guide-fab') || content.includes('voice assist') || content.includes('VOICE GUIDE')) {
    filesWithVoiceBtn.push({
      file,
      is3d: file.endsWith('_3d.html') || file.endsWith('-vr.html') || file.endsWith('_vr.html'),
      hasFab: content.includes('btn-voice-guide') || content.includes('voice-guide-fab')
    });
  }
}

console.log('Files with voice button:', filesWithVoiceBtn.length);
const non3d = filesWithVoiceBtn.filter(f => !f.is3d);
console.log('Non-3D files with voice button:', non3d);

