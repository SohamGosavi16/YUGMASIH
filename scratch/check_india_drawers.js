const fs = require('fs');

const india = fs.readFileSync('india_3d_map.html', 'utf8');

console.log('india_3d_map.html has arvr-modal?', india.includes('arvr-modal'));
console.log('india_3d_map.html has arvr-vg-card?', india.includes('arvr-vg-card'));
console.log('india_3d_map.html has state-drawer?', india.includes('state-drawer'));

