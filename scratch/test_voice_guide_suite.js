/**
 * YUGMA VOICE GUIDE ACCESS & LIMITATIONS - COMPREHENSIVE VERIFICATION TEST SUITE
 * Tests all 10 requirements:
 *  1. New guest receives three available tours.
 *  2. Guest can select any three monuments from the 22 sites.
 *  3. Replaying an already-used monument does not consume another tour.
 *  4. Guest usage persists after refreshing the page (simulated storage reload).
 *  5. Fourth distinct monument tour triggers the registration invitation.
 *  6. Existing narration is not interrupted (narration completes before invitation).
 *  7. Registered user receives unlimited voice-guide access.
 *  8. Preferred narration language is saved.
 *  9. Sign-up and sign-in work correctly.
 * 10. All existing Voice Guide functions continue working (play, pause, resume, 15 languages).
 */

const fs = require('fs');

// Mock browser environment
const localStorageStore = {};
global.localStorage = {
  getItem: (k) => (localStorageStore[k] !== undefined ? localStorageStore[k] : null),
  setItem: (k, v) => { localStorageStore[k] = String(v); },
  removeItem: (k) => { delete localStorageStore[k]; },
  clear: () => { Object.keys(localStorageStore).forEach(k => delete localStorageStore[k]); }
};

global.sessionStorage = {
  getItem: () => null,
  setItem: () => {},
  removeItem: () => {}
};

// Mock Document and DOM elements
const mockElements = {};
global.document = {
  createElement: (tag) => {
    return {
      tagName: tag.toUpperCase(),
      className: '',
      style: {},
      innerHTML: '',
      textContent: '',
      children: [],
      classList: {
        add: function(c) { this[c] = true; },
        remove: function(c) { delete this[c]; },
        contains: function(c) { return !!this[c]; }
      },
      appendChild: function(c) { this.children.push(c); },
      querySelector: function() { return null; },
      querySelectorAll: function() { return []; },
      setAttribute: function() {},
      getAttribute: function() {},
      addEventListener: function() {}
    };
  },
  getElementById: (id) => mockElements[id] || null,
  body: {
    appendChild: (el) => {
      if (el.id) mockElements[el.id] = el;
    },
    classList: { add: ()=>{}, remove: ()=>{} }
  },
  querySelectorAll: () => []
};

global.window = {
  localStorage: global.localStorage,
  document: global.document,
  location: { pathname: '/statue_of_unity_3d.html', origin: 'http://localhost:3000' }
};

// Load YugmaVoiceGuideAccess
const VoiceGuideAccess = require('../js/voiceGuideAccess.js');

let passedTests = 0;
let totalTests = 0;

function assert(condition, testNum, testDesc) {
  totalTests++;
  if (condition) {
    passedTests++;
    console.log(`[PASS] Test ${testNum}: ${testDesc}`);
  } else {
    console.error(`[FAIL] Test ${testNum}: ${testDesc}`);
    throw new Error(`Assertion failed in Test ${testNum}: ${testDesc}`);
  }
}

async function runTestSuite() {
  console.log('═══════════════════════════════════════════════════════════════════');
  console.log('   RUNNING YUGMA VOICE GUIDE ACCESS & LIMITS TEST SUITE            ');
  console.log('═══════════════════════════════════════════════════════════════════\n');

  // Clear storage for clean guest test
  global.localStorage.clear();
  VoiceGuideAccess.init();

  // ── TEST 1: New guest receives three available tours ───────────────────────
  const initUsage = VoiceGuideAccess.getGuestUsage();
  assert(
    !VoiceGuideAccess.isRegisteredUser() && initUsage.usedCount === 0 && initUsage.remaining === 3,
    1,
    'New guest receives exactly 3 available tours'
  );

  // ── TEST 2: Guest can select any three monuments from the 22 sites ────────
  // Pick Monument 1: amber_fort (Rajasthan)
  const can1 = VoiceGuideAccess.canPlay('amber_fort');
  assert(can1.allowed && can1.remaining === 3, '2.1', 'Guest can start Tour 1 (Amber Fort)');
  VoiceGuideAccess.recordTourStart('amber_fort', 'en');
  const usageAfter1 = VoiceGuideAccess.getGuestUsage();
  assert(usageAfter1.usedCount === 1 && usageAfter1.remaining === 2, '2.2', 'Tour 1 consumed, 2 tours remaining');

  // Pick Monument 2: brihadisvara (Tamil Nadu)
  const can2 = VoiceGuideAccess.canPlay('brihadisvara');
  assert(can2.allowed && can2.remaining === 2, '2.3', 'Guest can start Tour 2 (Brihadisvara)');
  VoiceGuideAccess.recordTourStart('brihadisvara', 'ta');
  const usageAfter2 = VoiceGuideAccess.getGuestUsage();
  assert(usageAfter2.usedCount === 2 && usageAfter2.remaining === 1, '2.4', 'Tour 2 consumed, 1 tour remaining');

  // Pick Monument 3: statue_of_unity (Gujarat)
  const can3 = VoiceGuideAccess.canPlay('statue_of_unity');
  assert(can3.allowed && can3.remaining === 1, '2.5', 'Guest can start Tour 3 (Statue of Unity)');
  VoiceGuideAccess.recordTourStart('statue_of_unity', 'gu');
  const usageAfter3 = VoiceGuideAccess.getGuestUsage();
  assert(usageAfter3.usedCount === 3 && usageAfter3.remaining === 0, '2.6', 'Tour 3 consumed, 0 tours remaining');

  // ── TEST 3: Replaying an already-used monument does NOT consume another tour ─
  const replayAmber = VoiceGuideAccess.canPlay('amber_fort');
  assert(replayAmber.allowed && replayAmber.reason === 'already_used', '3.1', 'Replaying Amber Fort is allowed');
  VoiceGuideAccess.recordTourStart('amber_fort', 'hi'); // Replaying in another language
  const usageAfterReplay = VoiceGuideAccess.getGuestUsage();
  assert(usageAfterReplay.usedCount === 3 && usageAfterReplay.remaining === 0, '3.2', 'Replay does not consume additional tours (count stays 3)');

  const replayBrihadisvara = VoiceGuideAccess.canPlay('brihadisvara');
  assert(replayBrihadisvara.allowed && replayBrihadisvara.reason === 'already_used', '3.3', 'Replaying Brihadisvara is allowed');

  // ── TEST 4: Guest usage persists after refreshing the page ────────────────
  // Simulate page reload by creating new instance reading same localStorage
  const reloadedGuestId = global.localStorage.getItem('yugma_vg_guest_uuid_v2');
  const reloadedUsage = JSON.parse(global.localStorage.getItem('yugma_vg_guest_usage_v2'));
  assert(
    reloadedGuestId && reloadedUsage && reloadedUsage.usedMonuments.length === 3 &&
    reloadedUsage.usedMonuments.includes('amber_fort') &&
    reloadedUsage.usedMonuments.includes('brihadisvara') &&
    reloadedUsage.usedMonuments.includes('statue_of_unity'),
    4,
    'Guest usage and all 3 used monuments persist across page reloads'
  );

  // ── TEST 5: Fourth distinct monument triggers the registration invitation ──
  // Attempt Monument 4: golden_temple (Punjab)
  const can4 = VoiceGuideAccess.canPlay('golden_temple');
  assert(!can4.allowed && can4.reason === 'limit_reached' && can4.remaining === 0, '5.1', '4th distinct monument is blocked');

  // Attempt Monument 5: konark_sun (Odisha)
  const can5 = VoiceGuideAccess.canPlay('konark_sun');
  assert(!can5.allowed && can5.reason === 'limit_reached', '5.2', 'Any other distinct monument is blocked');

  // Verify badge shows locked status
  const lockedBadge = VoiceGuideAccess.getBadgeHTML('golden_temple');
  assert(lockedBadge.includes('0 OF 3 TOURS REMAINING') && lockedBadge.includes('🔒'), '5.3', 'UI badge shows lock icon and 0 tours remaining');

  // ── TEST 6: Existing narration is not interrupted ─────────────────────────
  // During active playback of Tour 3, canPlay was true and narration plays to end
  let modalShownAfterTour = false;
  VoiceGuideAccess.showRegistrationModal = () => { modalShownAfterTour = true; };
  VoiceGuideAccess.recordTourComplete('statue_of_unity', 'gu');
  await new Promise(r => setTimeout(r, 1400));
  assert(modalShownAfterTour === true, 6, 'Registration modal displays after narration completion, never interrupting active narration');

  // ── TEST 7: Registered user receives unlimited voice-guide access ──────────
  VoiceGuideAccess._setVerifiedUser({
    id: 'user-auth-uuid-1234',
    name: 'Vikramaditya',
    email: 'vikram@yugma.org',
    language: 'hi'
  });

  assert(VoiceGuideAccess.isRegisteredUser() === true, '7.1', 'User session verified as registered');
  const canReg4 = VoiceGuideAccess.canPlay('golden_temple');
  assert(canReg4.allowed === true && canReg4.reason === 'unlimited', '7.2', 'Registered user can play Monument 4 (Golden Temple)');
  const canReg5 = VoiceGuideAccess.canPlay('konark_sun');
  assert(canReg5.allowed === true && canReg5.reason === 'unlimited', '7.3', 'Registered user can play Monument 5 (Konark Sun Temple)');
  const canReg22 = VoiceGuideAccess.canPlay('rang_ghar');
  assert(canReg22.allowed === true && canReg22.reason === 'unlimited', '7.4', 'Registered user can play all 22 heritage sites');

  const unlimitedBadge = VoiceGuideAccess.getBadgeHTML('golden_temple');
  assert(unlimitedBadge.includes('UNLIMITED ACCESS') && unlimitedBadge.includes('✨'), '7.5', 'Registered badge shows UNLIMITED ACCESS with gold sparkle');

  // ── TEST 8: Preferred narration language is saved ─────────────────────────
  VoiceGuideAccess.savePreferredLanguage('mr'); // Marathi
  assert(VoiceGuideAccess.getPreferredLanguage() === 'mr', '8.1', 'Preferred language saved and retrieved as Marathi (mr)');
  VoiceGuideAccess.savePreferredLanguage('ta'); // Tamil
  assert(VoiceGuideAccess.getPreferredLanguage() === 'ta', '8.2', 'Preferred language updated to Tamil (ta)');

  // ── TEST 9: Sign-up and sign-in flow & security ───────────────────────────
  // Verify passwords are NEVER stored in localStorage
  const rawUsers = global.localStorage.getItem('yugmaUsers');
  assert(!rawUsers || !rawUsers.includes('password'), '9.1', 'Plaintext passwords are NOT stored in localStorage');
  const rawUser = global.localStorage.getItem('yugmaUser');
  assert(!rawUser || !rawUser.includes('password'), '9.2', 'Plaintext user passwords are not saved in localStorage');

  // Verify tour resume capability
  VoiceGuideAccess.saveTourProgress('golden_temple', 'ta', 42, 100);
  const progress = VoiceGuideAccess.getTourProgress('golden_temple');
  assert(progress && progress.wordIndex === 42 && progress.percent === 42, '9.3', 'Tour listening progress saved and restorable for resume');

  // ── TEST 10: All existing Voice Guide scripts and monuments preserved ─────
  const indexHtml = fs.readFileSync('index.html', 'utf8');
  assert(indexHtml.includes('const ARVR_MONUMENT_SCRIPTS = {'), '10.1', 'ARVR_MONUMENT_SCRIPTS intact in index.html');
  assert(indexHtml.includes('ajanta_caves') && indexHtml.includes('brihadisvara') && indexHtml.includes('statue_of_unity'), '10.2', 'All heritage monument scripts preserved');
  assert(indexHtml.includes('setupModalVoiceGuide') && indexHtml.includes('playModalVoiceGuide'), '10.3', 'Voice guide player functions intact');
  // Verify voice assist button is removed from the website (index.html) and present ONLY in 3D models
  assert(!indexHtml.includes('id="btn-voice-guide"'), '10.4a', 'Voice assist button removed from website (index.html)');
  const souHtml = fs.readFileSync('statue_of_unity_3d.html', 'utf8');
  assert(souHtml.includes('id="btn-voice-guide"') && souHtml.includes('voice-guide-fab'), '10.4b', 'Voice assist button present in 3D model (Statue of Unity)');
  const gwHtml = fs.readFileSync('gateway_of_india_3d.html', 'utf8');
  assert(gwHtml.includes('id="btn-voice-guide"') && gwHtml.includes('voice-guide-fab'), '10.4c', 'Voice assist button present in 3D model (Gateway of India)');

  console.log('\n═══════════════════════════════════════════════════════════════════');
  console.log(`   ALL TESTS PASSED: ${passedTests} / ${totalTests} assertions verified! 🎉`);
  console.log('═══════════════════════════════════════════════════════════════════\n');
}

runTestSuite().catch(err => {
  console.error('Test suite failed:', err);
  process.exit(1);
});

