const fs = require('fs');

let map = fs.readFileSync('india_3d_map.html', 'utf8');

// 1. In <head>, add voiceGuideAccess
if (!map.includes('voiceGuideAccess.css')) {
  const target = '</head>';
  const addition = `  <link rel="stylesheet" href="css/voiceGuideAccess.css">\n  <script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>\n  <script src="js/voiceGuideAccess.js"></script>\n</head>`;
  map = map.replace(target, addition);
  console.log('[OK] Added voiceGuideAccess scripts/css to india_3d_map.html <head>');
}

// 2. Add badge inside .state-vg-titles
if (!map.includes('id="state-vg-badge"')) {
  const target = `<span class="state-vg-status" id="state-vg-status">Ready · Auto-Detect</span>`;
  const replacement = `<span class="state-vg-status" id="state-vg-status">Ready · Auto-Detect</span>\n                <span id="state-vg-badge" data-vg-badge style="margin-top:4px; display:inline-block;"></span>`;
  map = map.replace(target, replacement);
  console.log('[OK] Added state-vg-badge to india_3d_map.html');
}

// 3. Update playVoiceGuide with entitlement check
const playTarget = `      stopVoiceGuide();\n      mapAudioSessionId++;\n\n      const nativeVoice = getNativeVoice(currentSpeakingLang);`;
const playReplacement = `      if (window.YugmaVoiceGuideAccess) {
        const key = (currentSpeakingState || 'delhi').toLowerCase().replace(/\\s+/g, '_');
        const check = window.YugmaVoiceGuideAccess.canPlay(key);
        if (!check.allowed && check.reason === 'limit_reached') {
          window.YugmaVoiceGuideAccess.showRegistrationModal({
            monumentKey: key,
            language: currentSpeakingLang,
            triggerReason: 'limit_reached',
            onSuccess: () => { playVoiceGuide(); }
          });
          return;
        }
        window.YugmaVoiceGuideAccess.recordTourStart(key, currentSpeakingLang);
        window.YugmaVoiceGuideAccess.updateUIElements(document, key);
      }

      stopVoiceGuide();
      mapAudioSessionId++;

      const nativeVoice = getNativeVoice(currentSpeakingLang);`;

if (map.includes(playTarget)) {
  map = map.replace(playTarget, playReplacement);
  console.log('[OK] Added entitlement check to playVoiceGuide in india_3d_map.html');
}

// 4. Update onPlaybackFinished with recordTourComplete
const finTarget = `    function onPlaybackFinished() {\n      stopVoiceGuide();\n      if (progressBar) progressBar.style.width = '100%';`;
const finReplacement = `    function onPlaybackFinished() {
      stopVoiceGuide();
      if (progressBar) progressBar.style.width = '100%';
      if (window.YugmaVoiceGuideAccess) {
        const key = (currentSpeakingState || 'delhi').toLowerCase().replace(/\\s+/g, '_');
        window.YugmaVoiceGuideAccess.recordTourComplete(key, currentSpeakingLang);
        window.YugmaVoiceGuideAccess.updateUIElements(document, key);
      }`;

if (map.includes(finTarget)) {
  map = map.replace(finTarget, finReplacement);
  console.log('[OK] Added recordTourComplete to onPlaybackFinished in india_3d_map.html');
}

// 5. When state changes, update badge
const stateChangeTarget = `    function renderStateVoiceGuide(stateName) {`;
const stateChangeReplacement = `    function renderStateVoiceGuide(stateName) {
      if (window.YugmaVoiceGuideAccess) {
        const k = (stateName || 'delhi').toLowerCase().replace(/\\s+/g, '_');
        window.YugmaVoiceGuideAccess.updateUIElements(document, k);
      }`;

if (map.includes(stateChangeTarget)) {
  map = map.replace(stateChangeTarget, stateChangeReplacement);
  console.log('[OK] Added badge update to renderStateVoiceGuide in india_3d_map.html');
}

fs.writeFileSync('india_3d_map.html', map, 'utf8');
console.log('india_3d_map.html patch applied successfully.');

