const fs = require('fs');

const index = fs.readFileSync('index.html', 'utf8');

const navIdx = index.indexOf('<nav class="nav');
if (navIdx !== -1) {
  console.log('Nav HTML:\n', index.substring(navIdx, navIdx + 2000));
}

// Search for any button in index.html
const btnMatches = index.match(/<button[^>]+>/g) || [];
console.log('Total buttons in index.html:', btnMatches.length);
const vgBtns = btnMatches.filter(b => b.includes('voice') || b.includes('audio') || b.includes('vg') || b.includes('guide'));
console.log('Voice/Audio buttons in index.html:', vgBtns);

