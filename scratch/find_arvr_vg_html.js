const fs = require('fs');

const files = fs.readdirSync('.').concat(fs.readdirSync('scratch').map(f => 'scratch/' + f));
for (const f of files) {
  if (!fs.statSync(f).isFile()) continue;
  const content = fs.readFileSync(f, 'utf8');
  if (content.includes('arvr-vg-play')) {
    console.log('File with arvr-vg-play:', f);
  }
}

