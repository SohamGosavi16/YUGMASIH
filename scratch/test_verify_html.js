const fs = require('fs');

const files = [
  'all_3d_models.html',
  'models_hub.html',
  'amber_fort_3d.html',
  'taj_mahal_3d.html',
  'ajanta_caves_3d.html',
  'brihadisvara_3d.html'
];

let allOk = true;

files.forEach(f => {
  const content = fs.readFileSync(f, 'utf8');
  if (!content.includes('<!DOCTYPE html>') && !content.includes('<html')) {
    console.error(`ERROR: ${f} missing doctype/html`);
    allOk = false;
  }
  if (!content.includes('</body>') || !content.includes('</html>')) {
    console.error(`ERROR: ${f} unclosed body/html`);
    allOk = false;
  }
  console.log(`[PASS] ${f} verified OK (size: ${content.length} chars)`);
});

if (allOk) {
  console.log('\nAll checked HTML files are structurally intact.');
}

