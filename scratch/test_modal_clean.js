const fs = require('fs');

const indexHtml = fs.readFileSync('index.html', 'utf8');

const modalStart = indexHtml.indexOf('<div class="yugma-modal" id="arvr-modal">');
// Find the next section or container after arvr-modal
const nextSection = indexHtml.indexOf('<!-- Book / Manuscript Modal -->', modalStart);
console.log('modalStart:', modalStart);
console.log('nextSection (Book Modal):', nextSection);

const modalContent = indexHtml.substring(modalStart, nextSection);
console.log('arvr-modal content length:', modalContent.length);
console.log('Does arvr-modal content contain arvr-vg-card?', modalContent.includes('arvr-vg-card'));
console.log('Does arvr-modal content contain arvr-vg-play?', modalContent.includes('arvr-vg-play'));
console.log('arvr-modal content:\n', modalContent);

