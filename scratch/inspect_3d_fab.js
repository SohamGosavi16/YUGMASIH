const fs = require('fs');

const sou = fs.readFileSync('statue_of_unity_3d.html', 'utf8');

const fabIdx = sou.indexOf('id="btn-voice-guide"');
console.log('statue_of_unity_3d.html fab snippet:');
console.log(sou.substring(fabIdx - 50, fabIdx + 200));

const gw = fs.readFileSync('gateway_of_india_3d.html', 'utf8');
const gwFabIdx = gw.indexOf('id="btn-voice-guide"');
console.log('gateway_of_india_3d.html fab snippet:');
console.log(gw.substring(gwFabIdx - 50, gwFabIdx + 200));

