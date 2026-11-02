const fs = require('fs');

let index = fs.readFileSync('index.html', 'utf8');

console.log('Original index.html length:', index.length);

// 1. Update CSS in <head>
const oldCssMatch = 'html.yugma-session-restored #yugma-auth {';
const newCssMatch = 'html.yugma-session-restored #yugma-auth:not(.auth-active) {';
if (index.includes(oldCssMatch)) {
  index = index.replace(oldCssMatch, newCssMatch);
  console.log('1. Updated CSS rule in <head>');
} else {
  console.warn('1. Warning: oldCssMatch not found');
}

// 2. Extract card from arvr-modal and place it standalone before arvr-modal
const cardStart = '<!-- ══ 15-LANGUAGE HERITAGE VOICE GUIDE CARD ══ -->';
const cardEnd = '<div id="arvr-multi-models"';
const c1 = index.indexOf(cardStart);
const c2 = index.indexOf(cardEnd, c1);

if (c1 !== -1 && c2 !== -1) {
  // Cut card out of arvr-modal
  index = index.substring(0, c1) + index.substring(c2);
  console.log('2. Removed voice guide card from inside arvr-modal');
} else {
  console.warn('2. Warning: voice guide card block not found in arvr-modal');
}

// 3. Insert standalone Voice Guide HTML right before `<!-- AR/VR Modal -->`
const standaloneHtml = `
  <!-- ════ STANDALONE HERITAGE VOICE GUIDE (INDEPENDENT OF 3D DRAWER) ════ -->
  <button id="btn-voice-guide" class="yugma-standalone-vg-fab" title="Heritage Voice Guide" aria-label="Toggle Heritage Voice Guide">
    <span class="vg-fab-icon">🎙️</span>
    <span class="vg-fab-label">VOICE GUIDE</span>
  </button>

  <div id="yugma-standalone-voice-guide" class="yugma-standalone-vg-panel" role="region" aria-label="Heritage Voice Guide Player">
    <div class="modal-voice-guide-card standalone" id="arvr-vg-card">
      <div class="standalone-vg-header">
        <div style="display:flex; align-items:center; gap: 10px;">
          <span class="vg-header-icon">🎙️</span>
          <div>
            <div style="display:flex; align-items:center; gap:8px; flex-wrap:wrap;">
              <span class="vg-header-title">Heritage Voice Guide</span>
              <span id="arvr-vg-badge" data-vg-badge></span>
            </div>
            <div id="arvr-vg-status" class="vg-header-status">Select language &amp; click Play to listen</div>
          </div>
        </div>
        <button type="button" id="arvr-vg-close" class="vg-close-pill" aria-label="Minimize Voice Guide" title="Minimize Voice Guide">✕</button>
      </div>

      <div class="vg-lang-row">
        <label for="arvr-vg-lang" class="vg-lang-label">NARRATION LANGUAGE:</label>
        <select id="arvr-vg-lang" class="vg-lang-select">
          <option value="en">🇬🇧 English</option>
          <option value="hi">🇮🇳 Hindi (हिन्दी)</option>
          <option value="gu">🇮🇳 Gujarati (ગુજરાતી)</option>
          <option value="ta">🇮🇳 Tamil (தமிழ்)</option>
          <option value="te">🇮🇳 Telugu (తెలుగు)</option>
          <option value="bn">🇮🇳 Bengali (বাংলা)</option>
          <option value="mr">🇮🇳 Marathi (मराठी)</option>
          <option value="kn">🇮🇳 Kannada (ಕನ್ನಡ)</option>
          <option value="ml">🇮🇳 Malayalam (മലയാളം)</option>
          <option value="pa">🇮🇳 Punjabi (ਪੰਜਾਬੀ)</option>
          <option value="fr">🇫🇷 French (Français)</option>
          <option value="es">🇪🇸 Spanish (Español)</option>
          <option value="de">🇩🇪 German (Deutsch)</option>
          <option value="ja">🇯🇵 Japanese (日本語)</option>
          <option value="zh">🇨🇳 Mandarin (中文)</option>
        </select>
      </div>
      
      <!-- Play / Pause Controls & Progress -->
      <div style="display:flex; align-items:center; gap: 10px; margin-bottom: 12px;">
        <button type="button" id="arvr-vg-play" class="vg-play-button">
          <span id="arvr-vg-play-icon" style="font-size:1rem;">▶</span>
          <span id="arvr-vg-play-label">Play Voice Narration</span>
        </button>
        <button type="button" id="arvr-vg-stop" class="vg-stop-button" disabled>
          ⏹ Stop
        </button>
      </div>

      <!-- Progress Bar -->
      <div class="vg-progress-bar-wrap">
        <div id="arvr-vg-progress" class="vg-progress-bar-fill"></div>
      </div>

      <!-- Live Subtitles Box -->
      <div id="arvr-vg-subtitles" class="vg-subtitles-box" aria-live="polite">
        Click Play to start the spoken audio guide with live synchronized subtitles...
      </div>
    </div>
  </div>

`;

const modalComment = '<!-- AR/VR Modal -->';
if (index.includes(modalComment)) {
  index = index.replace(modalComment, standaloneHtml + '  ' + modalComment);
  console.log('3. Inserted standalone Voice Guide before AR/VR Modal');
} else {
  console.warn('3. Warning: <!-- AR/VR Modal --> not found');
}

// 4. Update closeARVRModal to NOT stop the voice guide
const oldClose = `function closeARVRModal() {
      const modal = document.getElementById('arvr-modal');
      if (modal) modal.classList.remove('active');
      stopModalVoiceGuide();
    }`;

const newClose = `function closeARVRModal() {
      const modal = document.getElementById('arvr-modal');
      if (modal) modal.classList.remove('active');
      // Voice Guide operates independently of 3D drawer
    }`;

// Check with CRLF
const oldCloseCRLF = oldClose.replace(/\n/g, '\r\n');
const newCloseCRLF = newClose.replace(/\n/g, '\r\n');

if (index.includes(oldCloseCRLF)) {
  index = index.replace(oldCloseCRLF, newCloseCRLF);
  console.log('4. Updated closeARVRModal to not stop voice guide');
} else if (index.includes(oldClose)) {
  index = index.replace(oldClose, newClose);
  console.log('4. Updated closeARVRModal (LF)');
} else {
  console.warn('4. Warning: closeARVRModal not found exactly');
}

// 5. In setupModalVoiceGuide: set currentMonument on standalone card and panel
const setupTarget = `const modal = document.getElementById('arvr-modal');
      if (modal) modal.dataset.currentMonument = key;`;
const setupTargetCRLF = setupTarget.replace(/\n/g, '\r\n');

const setupReplacement = `const modal = document.getElementById('arvr-modal');
      if (modal) modal.dataset.currentMonument = key;
      const card = document.getElementById('arvr-vg-card');
      if (card) card.dataset.currentMonument = key;
      const panel = document.getElementById('yugma-standalone-voice-guide');
      if (panel) panel.dataset.currentMonument = key;`;
const setupReplacementCRLF = setupReplacement.replace(/\n/g, '\r\n');

if (index.includes(setupTargetCRLF)) {
  index = index.replace(setupTargetCRLF, setupReplacementCRLF);
  console.log('5. Updated setupModalVoiceGuide with dataset.currentMonument on card and panel');
} else if (index.includes(setupTarget)) {
  index = index.replace(setupTarget, setupReplacement);
  console.log('5. Updated setupModalVoiceGuide (LF)');
}

// 6. In playModalVoiceGuide: open standalone panel when playback starts
const playTarget = `modalVgTimer = setInterval(updateModalVoiceGuideProgress, 100);`;
const playTargetCRLF = playTarget.replace(/\n/g, '\r\n');
const playReplacement = `modalVgTimer = setInterval(updateModalVoiceGuideProgress, 100);
      const vgPanel = document.getElementById('yugma-standalone-voice-guide');
      if (vgPanel) vgPanel.classList.add('active');`;
const playReplacementCRLF = playReplacement.replace(/\n/g, '\r\n');

if (index.includes(playTargetCRLF)) {
  index = index.replace(playTargetCRLF, playReplacementCRLF);
  console.log('6. Updated playModalVoiceGuide to show standalone panel when playing');
} else if (index.includes(playTarget)) {
  index = index.replace(playTarget, playReplacement);
  console.log('6. Updated playModalVoiceGuide (LF)');
}

// 7. In openStateDrawer: setup voice guide for current state/monument
const openDrawerTarget = `renderStateDrawerContent(key, currentDrawerLang);`;
const openDrawerTargetCRLF = openDrawerTarget.replace(/\n/g, '\r\n');
const openDrawerReplacement = `renderStateDrawerContent(key, currentDrawerLang);
      if (typeof setupModalVoiceGuide === 'function') {
        setupModalVoiceGuide(key, s);
      }`;
const openDrawerReplacementCRLF = openDrawerReplacement.replace(/\n/g, '\r\n');

if (index.includes(openDrawerTargetCRLF)) {
  index = index.replace(openDrawerTargetCRLF, openDrawerReplacementCRLF);
  console.log('7. Updated openStateDrawer to prime voice guide');
} else if (index.includes(openDrawerTarget)) {
  index = index.replace(openDrawerTarget, openDrawerReplacement);
  console.log('7. Updated openStateDrawer (LF)');
}

// 8. Update window.yugmaAuth.openSignup and openLogin
const authObjOld = `        openSignup: () => {
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
const authObjOldCRLF = authObjOld.replace(/\n/g, '\r\n');

const authObjNew = `        openSignup: () => {
          document.documentElement.classList.remove('yugma-session-restored');
          auth.classList.remove('auth-hidden');
          auth.classList.add('auth-active');
          auth.style.display = 'flex';
          auth.style.opacity = '1';
          auth.style.visibility = 'visible';
          auth.style.pointerEvents = 'auto';
          document.body.classList.add('yugma-screen-locked');
          showAuth();
          setMode('signup');
        },
        openLogin: () => {
          document.documentElement.classList.remove('yugma-session-restored');
          auth.classList.remove('auth-hidden');
          auth.classList.add('auth-active');
          auth.style.display = 'flex';
          auth.style.opacity = '1';
          auth.style.visibility = 'visible';
          auth.style.pointerEvents = 'auto';
          document.body.classList.add('yugma-screen-locked');
          showAuth();
          setMode('login');
        }`;
const authObjNewCRLF = authObjNew.replace(/\n/g, '\r\n');

if (index.includes(authObjOldCRLF)) {
  index = index.replace(authObjOldCRLF, authObjNewCRLF);
  console.log('8. Updated window.yugmaAuth.openSignup & openLogin (CRLF)');
} else if (index.includes(authObjOld)) {
  index = index.replace(authObjOld, authObjNew);
  console.log('8. Updated window.yugmaAuth.openSignup & openLogin (LF)');
}

// 9. Update openExperience
const expOld = `      function openExperience() {
        document.body.classList.remove('yugma-screen-locked');
        auth.classList.add('auth-hidden');

        setTimeout(() => {
          auth.style.display = 'none';
        }, 300);
      }`;
const expOldCRLF = expOld.replace(/\n/g, '\r\n');

const expNew = `      function openExperience() {
        document.body.classList.remove('yugma-screen-locked');
        auth.classList.add('auth-hidden');
        auth.classList.remove('auth-active');
        document.documentElement.classList.add('yugma-session-restored');

        setTimeout(() => {
          auth.style.display = 'none';
        }, 300);
      }`;
const expNewCRLF = expNew.replace(/\n/g, '\r\n');

if (index.includes(expOldCRLF)) {
  index = index.replace(expOldCRLF, expNewCRLF);
  console.log('9. Updated openExperience (CRLF)');
} else if (index.includes(expOld)) {
  index = index.replace(expOld, expNew);
  console.log('9. Updated openExperience (LF)');
}

// 10. Wire up FAB toggle and close button & restoreSession query params
const wireTarget = `    // Modal Voice Guide Bindings`;
const wireTargetCRLF = wireTarget.replace(/\n/g, '\r\n');

const wireAddition = `    // Standalone Voice Guide FAB & Panel Controls
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

    // Modal Voice Guide Bindings`;
const wireAdditionCRLF = wireAddition.replace(/\n/g, '\r\n');

if (index.includes(wireTargetCRLF)) {
  index = index.replace(wireTargetCRLF, wireAdditionCRLF);
  console.log('10. Added FAB & Close event listeners (CRLF)');
} else if (index.includes(wireTarget)) {
  index = index.replace(wireTarget, wireAddition);
  console.log('10. Added FAB & Close event listeners (LF)');
}

// 11. In restoreSession, check URL query params for ?auth=signup & ?monument=...
const restoreTarget = `restoreSession();`;
const restoreTargetCRLF = restoreTarget.replace(/\n/g, '\r\n');
const restoreAddition = `restoreSession();
      try {
        const urlParams = new URLSearchParams(window.location.search);
        const authReq = urlParams.get('auth');
        const monReq = urlParams.get('monument');
        if (authReq === 'signup') {
          setTimeout(() => window.yugmaAuth && window.yugmaAuth.openSignup(), 100);
        } else if (authReq === 'login') {
          setTimeout(() => window.yugmaAuth && window.yugmaAuth.openLogin(), 100);
        }
        if (monReq && typeof setupModalVoiceGuide === 'function') {
          setTimeout(() => setupModalVoiceGuide(monReq), 150);
        }
      } catch (e) {}`;
const restoreAdditionCRLF = restoreAddition.replace(/\n/g, '\r\n');

if (index.includes(restoreTargetCRLF)) {
  index = index.replace(restoreTargetCRLF, restoreAdditionCRLF);
  console.log('11. Added query params check in restoreSession (CRLF)');
} else if (index.includes(restoreTarget)) {
  index = index.replace(restoreTarget, restoreAddition);
  console.log('11. Added query params check in restoreSession (LF)');
}

fs.writeFileSync('index.html', index, 'utf8');
console.log('Saved index.html successfully! New length:', index.length);

