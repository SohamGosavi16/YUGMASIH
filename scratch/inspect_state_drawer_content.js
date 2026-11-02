const fs = require('fs');

const index = fs.readFileSync('index.html', 'utf8');

// Check inside state-drawer in HTML
const drawerStart = index.indexOf('id="state-drawer"');
const drawerEnd = index.indexOf('</aside>', drawerStart);
const drawerHtml = index.substring(drawerStart, drawerEnd);
console.log('Voice in state-drawer HTML?', /voice|vg-/i.test(drawerHtml));

// Check in renderStateDrawerContent
const renderIdx = index.indexOf('function renderStateDrawerContent');
if (renderIdx !== -1) {
  const renderCode = index.substring(renderIdx, renderIdx + 3000);
  console.log('Voice in renderStateDrawerContent?', /voice|vg-/i.test(renderCode));
  console.log('Snippet of renderStateDrawerContent:');
  console.log(renderCode.substring(0, 1000));
}

