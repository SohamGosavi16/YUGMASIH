const fs = require('fs');

const india = fs.readFileSync('india_3d_map.html', 'utf8');

const vgIdx = india.indexOf('id="state-vg-card"');
if (vgIdx !== -1) {
  console.log('Parent container in india_3d_map.html:');
  console.log(india.substring(vgIdx - 1000, vgIdx));
}

