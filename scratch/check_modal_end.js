const fs = require('fs');

const indexHtml = fs.readFileSync('index.html', 'utf8');

const modalStart = indexHtml.indexOf('<div class="yugma-modal" id="arvr-modal">');
console.log('modalStart:', modalStart);

// Let's print 1500 chars from modalStart
const slice = indexHtml.substring(modalStart, modalStart + 1500);
console.log('arvr-modal full content:\n', slice);

