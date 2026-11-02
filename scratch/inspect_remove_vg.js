const fs = require('fs');

const indexHtml = fs.readFileSync('index.html', 'utf8');

const fabIdx = indexHtml.indexOf('<button id="btn-voice-guide"');
console.log('fabIdx:', fabIdx);
const commentIdx = indexHtml.lastIndexOf('<!-- ════ STANDALONE HERITAGE VOICE GUIDE', fabIdx);
console.log('commentIdx:', commentIdx);
const endIdx = indexHtml.indexOf('<!-- AR/VR Modal -->', fabIdx);
console.log('endIdx:', endIdx);

console.log('Exact block to remove:');
console.log(indexHtml.substring(commentIdx, endIdx));

