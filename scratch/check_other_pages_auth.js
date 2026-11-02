const fs = require('fs');

const gw = fs.readFileSync('gateway_of_india_3d.html', 'utf8');
console.log('gateway_of_india_3d.html has yugma-auth:', gw.includes('yugma-auth'));
console.log('gateway_of_india_3d.html has auth.html reference:', gw.includes('auth.html'));

const india = fs.readFileSync('india_3d_map.html', 'utf8');
console.log('india_3d_map.html has yugma-auth:', india.includes('yugma-auth'));
console.log('india_3d_map.html has auth.html reference:', india.includes('auth.html'));

