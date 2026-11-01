const fs = require('fs');
const path = require('path');

const rootDir = path.join(__dirname, '..');
const files = fs.readdirSync(rootDir).filter(f => f.endsWith('.html') && !f.includes('backup'));

let modifiedCount = 0;

files.forEach(file => {
  const filePath = path.join(rootDir, file);
  let content = fs.readFileSync(filePath, 'utf8');

  let hasChanged = false;
  if (content.includes('preload=1')) {
    content = content.replaceAll('preload=1', 'preload=0');
    hasChanged = true;
  }
  if (content.includes('preload: 1')) {
    content = content.replaceAll('preload: 1', 'preload: 0');
    hasChanged = true;
  }

  if (hasChanged) {
    fs.writeFileSync(filePath, content, 'utf8');
    modifiedCount++;
    console.log(`Optimized preload in: ${file}`);
  }
});

console.log(`\nSuccessfully optimized Sketchfab preload across ${modifiedCount} active pages.`);

