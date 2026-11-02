const fs = require('fs');
const path = require('path');

const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));
console.log('Total HTML files:', files.length);

const vgFiles = [];
for (const file of files) {
  const content = fs.readFileSync(file, 'utf8');
  if (content.includes('voice-guide') || content.includes('Voice Guide') || content.includes('vg-panel')) {
    vgFiles.push(file);
  }
}
console.log('HTML files with voice guide / vg-panel:', vgFiles.length, vgFiles.slice(0, 15));
