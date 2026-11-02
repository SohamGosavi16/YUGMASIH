const fs = require('fs');

const index = fs.readFileSync('index.html', 'utf8');

// Find arvr-modal
const modalIdx = index.indexOf('id="arvr-modal"');
console.log('arvr-modal index:', modalIdx);
if (modalIdx !== -1) {
  console.log('Snippet before & after arvr-modal:');
  console.log(index.substring(modalIdx - 200, modalIdx + 600));
}

// Find openArVrModal in index.html
const openIdx = index.indexOf('function openArVrModal');
if (openIdx !== -1) {
  console.log('openArVrModal snippet:');
  console.log(index.substring(openIdx, openIdx + 800));
}

