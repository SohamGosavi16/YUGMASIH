const fs = require('fs');

const index = fs.readFileSync('index.html', 'utf8');

const modalStart = index.indexOf('<div class="yugma-modal" id="arvr-modal">');
const modalEnd = index.indexOf('</div>\n  </div>', modalStart) + 15;
console.log('Modal start:', modalStart, 'Modal end:', modalEnd);
console.log(index.substring(modalStart, modalEnd));

