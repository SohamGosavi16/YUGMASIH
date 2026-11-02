const fs = require('fs');

const indexHtml = fs.readFileSync('index.html', 'utf8');

const modalStart = indexHtml.indexOf('<div class="yugma-modal" id="arvr-modal">');
console.log('modalStart:', modalStart);

const modalClose = indexHtml.indexOf('</div>\n  </div>', modalStart);
console.log('modalClose:', modalClose);

// Let's find where arvr-vg-card is
const cardIdx = indexHtml.indexOf('id="arvr-vg-card"');
console.log('cardIdx:', cardIdx);

console.log('Is cardIdx before or after modalStart?');
console.log('cardIdx < modalStart?', cardIdx < modalStart);
console.log('Snippet around cardIdx:');
console.log(indexHtml.substring(cardIdx - 100, cardIdx + 300));
console.log('Snippet around modalStart:');
console.log(indexHtml.substring(modalStart, modalStart + 400));

