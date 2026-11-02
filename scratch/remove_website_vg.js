const fs = require('fs');

let indexHtml = fs.readFileSync('index.html', 'utf8');

// 1. Remove HTML markup of standalone voice guide
const startMarker = '<!-- ════ STANDALONE HERITAGE VOICE GUIDE (INDEPENDENT OF 3D DRAWER) ════ -->';
const endMarker = '<!-- AR/VR Modal -->';

const idx1 = indexHtml.indexOf(startMarker);
const idx2 = indexHtml.indexOf(endMarker, idx1);

if (idx1 !== -1 && idx2 !== -1) {
  indexHtml = indexHtml.substring(0, idx1) + indexHtml.substring(idx2);
  console.log('1. Removed standalone Voice Guide markup from index.html');
} else {
  console.warn('1. Markup block not found!');
}

// 2. Remove JS event listeners for standalone FAB and Close button
const jsBlock = `    // Standalone Voice Guide FAB & Panel Controls
    const vgFabBtn = document.getElementById('btn-voice-guide');
    const vgPanelEl = document.getElementById('yugma-standalone-voice-guide');
    const vgCloseBtn = document.getElementById('arvr-vg-close');
    if (vgFabBtn && vgPanelEl) {
      vgFabBtn.addEventListener('click', () => {
        vgPanelEl.classList.toggle('active');
      });
    }
    if (vgCloseBtn && vgPanelEl) {
      vgCloseBtn.addEventListener('click', () => {
        vgPanelEl.classList.remove('active');
      });
    }

`;

const jsBlockCRLF = jsBlock.replace(/\n/g, '\r\n');

if (indexHtml.includes(jsBlockCRLF)) {
  indexHtml = indexHtml.replace(jsBlockCRLF, '');
  console.log('2. Removed JS event listeners from index.html (CRLF)');
} else if (indexHtml.includes(jsBlock)) {
  indexHtml = indexHtml.replace(jsBlock, '');
  console.log('2. Removed JS event listeners from index.html (LF)');
} else {
  console.warn('2. JS listener block not found exactly, searching substring...');
  const fabIdx = indexHtml.indexOf("const vgFabBtn = document.getElementById('btn-voice-guide');");
  if (fabIdx !== -1) {
    const nextBind = indexHtml.indexOf('// Modal Voice Guide Bindings', fabIdx);
    indexHtml = indexHtml.substring(0, fabIdx) + indexHtml.substring(nextBind);
    console.log('2. Removed JS block via substring');
  }
}

// 3. Remove references to yugma-standalone-voice-guide in setupModalVoiceGuide and playModalVoiceGuide
const panelRef1 = `      const panel = document.getElementById('yugma-standalone-voice-guide');\r\n      if (panel) panel.dataset.currentMonument = key;\r\n`;
const panelRef1LF = `      const panel = document.getElementById('yugma-standalone-voice-guide');\n      if (panel) panel.dataset.currentMonument = key;\n`;
if (indexHtml.includes(panelRef1)) {
  indexHtml = indexHtml.replace(panelRef1, '');
  console.log('3. Removed panelRef1 (CRLF)');
} else if (indexHtml.includes(panelRef1LF)) {
  indexHtml = indexHtml.replace(panelRef1LF, '');
  console.log('3. Removed panelRef1 (LF)');
}

const panelRef2 = `      const vgPanel = document.getElementById('yugma-standalone-voice-guide');\r\n      if (vgPanel) vgPanel.classList.add('active');\r\n\r\n`;
const panelRef2LF = `      const vgPanel = document.getElementById('yugma-standalone-voice-guide');\n      if (vgPanel) vgPanel.classList.add('active');\n\n`;
if (indexHtml.includes(panelRef2)) {
  indexHtml = indexHtml.replace(panelRef2, '');
  console.log('4. Removed panelRef2 (CRLF)');
} else if (indexHtml.includes(panelRef2LF)) {
  indexHtml = indexHtml.replace(panelRef2LF, '');
  console.log('4. Removed panelRef2 (LF)');
}

// Check if any voice button exists in index.html
const stillHasFab = indexHtml.includes('btn-voice-guide');
console.log('Still has btn-voice-guide in index.html?', stillHasFab);
const stillHasStandalone = indexHtml.includes('yugma-standalone-voice-guide');
console.log('Still has yugma-standalone-voice-guide in index.html?', stillHasStandalone);

fs.writeFileSync('index.html', indexHtml, 'utf8');
console.log('Saved index.html successfully!');

