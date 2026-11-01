const fs = require('fs');
const path = require('path');

const rootDir = path.join(__dirname, '..');
const files = fs.readdirSync(rootDir).filter(f => f.endsWith('.html'));

const sketchfabRegex = /sketchfab\.com\/models\/([a-zA-Z0-9_-]+)/;
const glbRegex = /["']([^"']+\.glb)["']/g;

const results = [];

files.forEach(file => {
  const content = fs.readFileSync(path.join(rootDir, file), 'utf8');
  const sfMatch = content.match(sketchfabRegex);
  const glbMatches = [...content.matchAll(glbRegex)].map(m => m[1]);
  const hasThree = content.includes('three.js') || content.includes('three.module.js') || content.includes('THREE.');
  const hasModelViewer = content.includes('model-viewer');

  if (sfMatch || glbMatches.length > 0 || hasModelViewer) {
    results.push({
      file,
      sketchfabUid: sfMatch ? sfMatch[1] : null,
      glbRefs: glbMatches,
      hasThree,
      hasModelViewer
    });
  }
});

console.log(`Found ${results.length} 3D-related HTML pages:`);
results.forEach(r => {
  console.log(`- ${r.file}: ${r.sketchfabUid ? 'Sketchfab (' + r.sketchfabUid + ')' : ''} ${r.glbRefs.length ? 'GLB (' + r.glbRefs.join(', ') + ')' : ''} ${r.hasModelViewer ? 'model-viewer' : ''}`);
});

console.log('\nTotal unique Sketchfab UIDs:', new Set(results.filter(r => r.sketchfabUid).map(r => r.sketchfabUid)).size);

