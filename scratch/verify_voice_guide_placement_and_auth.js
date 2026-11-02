const fs = require('fs');
const assert = require('assert');

console.log('═══════════════════════════════════════════════════════════════════');
console.log('   VERIFYING VOICE ASSIST BUTTON PLACEMENT ONLY IN 3D MODELS      ');
console.log('═══════════════════════════════════════════════════════════════════');

const indexHtml = fs.readFileSync('index.html', 'utf8');
const vgaJs = fs.readFileSync('js/voiceGuideAccess.js', 'utf8');
const vgaCss = fs.readFileSync('css/voiceGuideAccess.css', 'utf8');
const authJs = fs.readFileSync('js/auth.js', 'utf8');

// ── TEST 1: Voice assist button is completely removed from index.html (the website)
assert(!indexHtml.includes('id="btn-voice-guide"'), 'index.html must NOT contain btn-voice-guide');
assert(!indexHtml.includes('yugma-standalone-vg-fab'), 'index.html must NOT contain yugma-standalone-vg-fab');
assert(!indexHtml.includes('id="yugma-standalone-voice-guide"'), 'index.html must NOT contain yugma-standalone-voice-guide');
console.log('[PASS] Test 1: Voice assist button and panel completely removed from website (index.html)');

// ── TEST 2: Voice assist button is present in 3D model viewer pages ────────
const modelPages = ['statue_of_unity_3d.html', 'gateway_of_india_3d.html', 'ajanta_caves_3d.html', 'amber_fort_3d.html', 'konark_3d.html'];
modelPages.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');
  assert(content.includes('id="btn-voice-guide"'), file + ' has btn-voice-guide');
  assert(content.includes('class="voice-guide-fab"'), file + ' has voice-guide-fab');
  assert(content.includes('id="voice-guide-panel"'), file + ' has voice-guide-panel');
});
console.log('[PASS] Test 2: Voice assist button is present ONLY in 3D model viewers (' + modelPages.length + ' sampled)');

// ── TEST 3: 3D drawer (#arvr-modal) remains clean without embedded voice guide
const modalStart = indexHtml.indexOf('<div class="yugma-modal" id="arvr-modal">');
const modalEnd = indexHtml.indexOf('<!-- YUGMA 3D Tradition Studio -->', modalStart);
const modalSlice = indexHtml.substring(modalStart, modalEnd);
assert(!modalSlice.includes('id="arvr-vg-card"'), 'arvr-modal must NOT contain arvr-vg-card');
assert(!modalSlice.includes('15-Language Voice Guide'), 'arvr-modal must NOT contain Voice Guide title');
console.log('[PASS] Test 3: 3D monument drawer is completely clean');

// ── TEST 4: Auth modal and redirection handlers remain intact ────────────────
assert(indexHtml.includes('html.yugma-session-restored #yugma-auth:not(.auth-active)'), 'CSS prevents blocking when .auth-active is present');
assert(vgaCss.includes('#yugma-auth.auth-active'), 'voiceGuideAccess.css defines #yugma-auth.auth-active overrides');
assert(vgaJs.includes("signupBtn.addEventListener('click'"), 'signupBtn click handler exists');
assert(vgaJs.includes("loginBtn.addEventListener('click'"), 'loginBtn click handler exists');
assert(authJs.includes("urlParams.get('signup') === 'true'"), 'auth.js auto-switches to signup on ?signup=true');
assert(authJs.includes("urlParams.get('login') === 'true'"), 'auth.js auto-switches to login on ?login=true');
console.log('[PASS] Test 4: Auth modal overrides and login/signup redirection intact');

console.log('═══════════════════════════════════════════════════════════════════');
console.log('   ALL AUDIT CHECKS PASSED! 🎉                                    ');
console.log('═══════════════════════════════════════════════════════════════════');
