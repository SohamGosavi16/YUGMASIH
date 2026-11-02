const fs = require('fs');

const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));
const matches = [];
files.forEach(f => {
  const c = fs.readFileSync(f, 'utf8');
  if (c.includes('arvr-vg-card')) {
    matches.push(f);
  }
});
console.log('Files containing arvr-vg-card:', matches);

