const fs = require('fs');

const content = fs.readFileSync('statue_of_unity_3d.html', 'utf8');

const sIdx = content.indexOf('function playGuide(');
const eIdx = content.indexOf('function pauseGuide(', sIdx);
console.log('playGuide in statue_of_unity_3d.html:\n', content.substring(sIdx, eIdx));

const sIdx2 = content.indexOf('function onPlaybackFinished(');
const eIdx2 = content.indexOf('function updatePlayControls(', sIdx2);
console.log('onPlaybackFinished in statue_of_unity_3d.html:\n', content.substring(sIdx2, eIdx2));

