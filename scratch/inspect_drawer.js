const fs = require('fs');

const index = fs.readFileSync('index.html', 'utf8');

// Find openStateDrawer
const openDrawerIdx = index.indexOf('function openStateDrawer');
console.log('openStateDrawer idx:', openDrawerIdx);
if (openDrawerIdx !== -1) {
  console.log(index.substring(openDrawerIdx, openDrawerIdx + 1200));
}

// Find state-drawer in HTML
const drawerIdx = index.indexOf('id="state-drawer"');
console.log('state-drawer idx:', drawerIdx);
if (drawerIdx !== -1) {
  console.log(index.substring(drawerIdx - 100, drawerIdx + 1200));
}

