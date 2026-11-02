const fs = require('fs');

const india = fs.readFileSync('india_3d_map.html', 'utf8');

const vgIdx = india.indexOf('id="state-vg-card"');
if (vgIdx !== -1) {
  console.log('Snippet around state-vg-card in india_3d_map.html:');
  console.log(india.substring(vgIdx - 200, vgIdx + 1200));
}

