const fs = require('fs');

const files = fs.readdirSync('.').filter(f => f.endsWith('.html') || f.endsWith('.js') || f.endsWith('.css'));
const matches = [];
files.forEach(f => {
  const c = fs.readFileSync(f, 'utf8');
  if (c.toLowerCase().includes('bharat') && c.toLowerCase().includes('geospatial')) {
    matches.push(f);
  }
});
console.log('Files with BHARAT GEOSPATIAL:', matches);

