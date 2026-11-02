const fs = require('fs');

let map = fs.readFileSync('india_3d_map.html', 'utf8');

function replaceBetween(content, startMarker, endMarker, newBlock, label) {
  const sIdx = content.indexOf(startMarker);
  if (sIdx === -1) {
    console.error(`[FAIL] Could not find startMarker: "${startMarker}" for ${label}`);
    return content;
  }
  const eIdx = content.indexOf(endMarker, sIdx);
  if (eIdx === -1) {
    console.error(`[FAIL] Could not find endMarker: "${endMarker}" for ${label}`);
    return content;
  }
  console.log(`[OK] Replaced ${label} (pos ${sIdx} to ${eIdx})`);
  return content.substring(0, sIdx) + newBlock + content.substring(eIdx);
}

// Update playVoiceGuide
const newPlayVoice = `function playVoiceGuide() {
      if (isPlaying && !isPaused) {
        // Pause
        if (isCloudMode && currentAudioEl) {
          currentAudioEl.pause();
        } else if (window.speechSynthesis) {
          window.speechSynthesis.pause();
        }
        isPaused = true;
        updatePlayControls(false, true);
        return;
      }

      if (isPaused) {
        // Resume
        if (isCloudMode && currentAudioEl) {
          currentAudioEl.play().catch(()=>{});
        } else if (window.speechSynthesis) {
          window.speechSynthesis.resume();
        }
        isPaused = false;
        isPlaying = true;
        updatePlayControls(true, false);
        return;
      }

      if (window.YugmaVoiceGuideAccess) {
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

      const nativeVoice = getNativeVoice(currentSpeakingLang);
      if (nativeVoice) {
        playNativeSynthesis(nativeVoice);
      } else {
        playCloudAudio();
      }
    }

    `;

map = replaceBetween(map, 'function playVoiceGuide() {', 'function stopVoiceGuide() {', newPlayVoice, 'playVoiceGuide in india_3d_map.html');

// Update onPlaybackFinished
const newFin = `function onPlaybackFinished() {
      stopVoiceGuide();
      if (progressBar) progressBar.style.width = '100%';
      if (hudContent) {
        hudContent.textContent = 'Narration complete. Click Play to listen again.';
      }
      if (window.YugmaVoiceGuideAccess) {
        const key = (currentSpeakingState || 'delhi').toLowerCase().replace(/\\s+/g, '_');
        window.YugmaVoiceGuideAccess.recordTourComplete(key, currentSpeakingLang);
        window.YugmaVoiceGuideAccess.updateUIElements(document, key);
      }
    }

    `;

map = replaceBetween(map, 'function onPlaybackFinished() {', 'function updatePlayControls(playing, paused) {', newFin, 'onPlaybackFinished in india_3d_map.html');

fs.writeFileSync('india_3d_map.html', map, 'utf8');
console.log('india_3d_map.html flexible patch applied.');

