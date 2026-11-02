const fs = require('fs');

const index = fs.readFileSync('index.html', 'utf8');
const lines = index.split('\n');

for (let i = 0; i < lines.length; i++) {
  if (lines[i].includes('function setupModalVoiceGuide(')) {
    console.log('setupModalVoiceGuide at line:', i+1);
  }
  if (lines[i].includes('function playModalVoiceGuide(')) {
    console.log('playModalVoiceGuide at line:', i+1);
  }
  if (lines[i].includes('function onModalPlaybackFinished(')) {
    console.log('onModalPlaybackFinished at line:', i+1);
  }
  if (lines[i].includes('function updateModalPlayControls(')) {
    console.log('updateModalPlayControls at line:', i+1);
  }
  if (lines[i].includes('function openARVRModal(')) {
    console.log('openARVRModal at line:', i+1);
  }
  if (lines[i].includes('// YUGMA OPENING FLOW + SUPABASE AUTH')) {
    console.log('YUGMA OPENING FLOW at line:', i+1);
  }
}

