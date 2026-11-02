const fs = require('fs');

let index = fs.readFileSync('index.html', 'utf8');

// 1. Check CSS replacement
const oldCss = `    /* Prevent flash of auth overlay when session exists */
    html.yugma-session-restored #yugma-auth {
      display: none !important;
      opacity: 0 !important;
      visibility: hidden !important;
      pointer-events: none !important;
    }`;

const newCss = `    /* Prevent flash of auth overlay when session exists */
    html.yugma-session-restored #yugma-auth:not(.auth-active) {
      display: none !important;
      opacity: 0 !important;
      visibility: hidden !important;
      pointer-events: none !important;
    }`;

console.log('Includes oldCss?', index.includes(oldCss));

// 2. Check arvr-vg-card in arvr-modal
const cardStart = '<!-- ══ 15-LANGUAGE HERITAGE VOICE GUIDE CARD ══ -->';
const cardEnd = '<div id="arvr-multi-models"';
const c1 = index.indexOf(cardStart);
const c2 = index.indexOf(cardEnd, c1);
console.log('cardStart index:', c1, 'cardEnd index:', c2);

// 3. Check closeARVRModal stopModalVoiceGuide
const oldClose = `    function closeARVRModal() {
      const modal = document.getElementById('arvr-modal');
      if (modal) modal.classList.remove('active');
      stopModalVoiceGuide();
    }`;

const newClose = `    function closeARVRModal() {
      const modal = document.getElementById('arvr-modal');
      if (modal) modal.classList.remove('active');
      // Note: Voice guide operates independently of the 3D drawer
    }`;
console.log('Includes oldClose?', index.includes(oldClose));

// 4. Check window.yugmaAuth openSignup / openLogin
const oldAuthObj = `        openSignup: () => {
          auth.style.display = 'flex';
          auth.classList.remove('auth-hidden');
          document.body.classList.add('yugma-screen-locked');
          showAuth();
          setMode('signup');
        },
        openLogin: () => {
          auth.style.display = 'flex';
          auth.classList.remove('auth-hidden');
          document.body.classList.add('yugma-screen-locked');
          showAuth();
          setMode('login');
        }`;
console.log('Includes oldAuthObj?', index.includes(oldAuthObj));

