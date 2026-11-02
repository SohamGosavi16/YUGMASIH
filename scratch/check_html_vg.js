const fs = require('fs');

const content = fs.readFileSync('index.html', 'utf8');
const lines = content.split('\n');
let insideScript = false;
let foundOutside = [];
for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  if (line.includes('<script')) insideScript = true;
  if (line.includes('</script>')) { insideScript = false; continue; }
  if (!insideScript && (line.includes('arvr-vg') || line.includes('vg-') || line.includes('Voice Guide') || line.includes('voice-guide'))) {
    foundOutside.push({ line: i + 1, text: line.trim() });
  }
}
console.log('Found outside script tags:', foundOutside);

