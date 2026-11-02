const fs = require('fs');

const index = fs.readFileSync('index.html', 'utf8');

const sIdx = index.indexOf('// Form submissions');
console.log('Form submission in index.html:');
if (sIdx !== -1) {
  console.log(index.substring(sIdx, sIdx + 2000));
} else {
  const fIdx = index.indexOf('auth-form');
  console.log(index.substring(fIdx - 50, fIdx + 1500));
}

