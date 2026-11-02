const fs = require('fs');

let index = fs.readFileSync('index.html', 'utf8');

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

// 1. Replace setupModalVoiceGuide
const newSetup = `function setupModalVoiceGuide(key, s) {
      stopModalVoiceGuide();
      const modal = document.getElementById('arvr-modal');
      if (modal) modal.dataset.currentMonument = key;
      const statusEl = document.getElementById('arvr-vg-status');
      const langSel = document.getElementById('arvr-vg-lang');
      const subEl = document.getElementById('arvr-vg-subtitles');
      const progEl = document.getElementById('arvr-vg-progress');
      if (progEl) progEl.style.width = '0%';

      if (langSel) {
        let preferred = 'en';
        if (window.YugmaVoiceGuideAccess && typeof window.YugmaVoiceGuideAccess.getPreferredLanguage === 'function') {
          preferred = window.YugmaVoiceGuideAccess.getPreferredLanguage();
        }
        if (preferred && preferred !== 'en' && ARVR_SUPPORTED_LANGS.some(l => l.key === preferred)) {
          modalVgCurrentLang = preferred;
        } else if (key === 'statue_of_unity' || key === 'gujarat') modalVgCurrentLang = 'gu';
        else if (key === 'maharashtra' || key === 'rajgad_fort') modalVgCurrentLang = 'mr';
        else if (key === 'tamil_nadu') modalVgCurrentLang = 'ta';
        else if (key === 'punjab') modalVgCurrentLang = 'pa';
        else modalVgCurrentLang = preferred || 'en';
        langSel.value = modalVgCurrentLang;
      }

      if (window.YugmaVoiceGuideAccess) {
        window.YugmaVoiceGuideAccess.updateUIElements(modal, key);
        const check = window.YugmaVoiceGuideAccess.canPlay(key);
        if (!check.allowed && check.reason === 'limit_reached') {
          updateModalPlayControls(false, false, true);
        } else {
          updateModalPlayControls(false, false, false);
        }
      }

      const script = getModalMonumentScript(key, modalVgCurrentLang);
      if (subEl) subEl.textContent = script.substring(0, 150) + (script.length > 150 ? '…' : '');
      if (statusEl) statusEl.textContent = 'Ready · ' + getModalLangLabel(modalVgCurrentLang);
    }

    `;

index = replaceBetween(index, 'function setupModalVoiceGuide(key, s) {', 'function getModalLangLabel(code) {', newSetup, 'setupModalVoiceGuide');

// 2. Replace playModalVoiceGuide through start of playModalCloudAudio
const newPlay = `function playModalVoiceGuide() {
      if (modalVgIsPlaying && !modalVgIsPaused) {
        // Pause
        modalVgIsPaused = true;
        if (modalVgAudio) modalVgAudio.pause();
        if (window.speechSynthesis) window.speechSynthesis.pause();
        updateModalPlayControls(false, true);
        return;
      }
      if (modalVgIsPaused) {
        // Resume
        modalVgIsPaused = false;
        modalVgIsPlaying = true;
        updateModalPlayControls(true, false);
        if (modalVgAudio) modalVgAudio.play().catch(()=>{});
        if (window.speechSynthesis) window.speechSynthesis.resume();
        return;
      }

      const modal = document.getElementById('arvr-modal');
      const key = (modal && (modal.dataset.currentMonument || modal.dataset.stateId)) || 'statue_of_unity';
      const langSel = document.getElementById('arvr-vg-lang');
      modalVgCurrentLang = langSel ? langSel.value : 'en';

      // ── Entitlement & Limit Check ──
      if (window.YugmaVoiceGuideAccess) {
        const check = window.YugmaVoiceGuideAccess.canPlay(key);
        if (!check.allowed && check.reason === 'limit_reached') {
          // Block 4th tour for guests, show registration modal
          window.YugmaVoiceGuideAccess.showRegistrationModal({
            monumentKey: key,
            language: modalVgCurrentLang,
            triggerReason: 'limit_reached',
            onSuccess: () => {
              setupModalVoiceGuide(key);
              playModalVoiceGuide();
            }
          });
          return;
        }

        // Record tour start (distinct tour consumed)
        window.YugmaVoiceGuideAccess.recordTourStart(key, modalVgCurrentLang);
        window.YugmaVoiceGuideAccess.updateUIElements(modal, key);
      }

      stopModalVoiceGuide();
      modalVgSessionId++;
      const session = modalVgSessionId;

      const script = getModalMonumentScript(key, modalVgCurrentLang);
      modalVgAllWords = script.trim().split(/\\s+/);

      const subEl = document.getElementById('arvr-vg-subtitles');
      if (subEl) {
        subEl.innerHTML = modalVgAllWords.map((w, i) => '<span id="mvg-w-' + i + '" class="mvg-word" style="transition:color 0.15s ease;">' + escapeHtmlModal(w) + ' </span>').join('');
      }

      modalVgIsPlaying = true;
      modalVgIsPaused = false;
      updateModalPlayControls(true, false);

      const statusEl = document.getElementById('arvr-vg-status');
      const nativeVoice = getModalNativeVoice(modalVgCurrentLang);

      if (nativeVoice) {
        if (statusEl) statusEl.textContent = '🔊 Playing (' + nativeVoice.name + ') · Synced Subtitles';
        playModalNativeSynthesis(script, nativeVoice, session);
      } else {
        if (statusEl) statusEl.textContent = '☁️ Streaming ' + getModalLangLabel(modalVgCurrentLang) + ' · Cloud Audio';
        playModalCloudAudio(script, session);
      }
    }

    `;

index = replaceBetween(index, 'function playModalVoiceGuide() {', 'function playModalCloudAudio(script, session) {', newPlay, 'playModalVoiceGuide');

// 3. In updateModalHighlights, save tour progress
const hlTarget = 'updateModalHighlights(chunk.startWord + wIdx);';
if (index.includes(hlTarget) && !index.includes('saveTourProgress')) {
  const hlRep = `updateModalHighlights(chunk.startWord + wIdx);
        if (window.YugmaVoiceGuideAccess) {
          const m = document.getElementById('arvr-modal');
          const k = (m && (m.dataset.currentMonument || m.dataset.stateId)) || 'statue_of_unity';
          window.YugmaVoiceGuideAccess.saveTourProgress(k, modalVgCurrentLang, chunk.startWord + wIdx, modalVgAllWords.length);
        }`;
  index = index.replace(hlTarget, hlRep);
  console.log('[OK] Added saveTourProgress to updateModalHighlights cloud path');
}

// 4. Replace onModalPlaybackFinished and updateModalPlayControls
const newFinAndCtrl = `function onModalPlaybackFinished() {
      modalVgIsPlaying = false;
      modalVgIsPaused = false;
      if (modalVgTimer) clearInterval(modalVgTimer);
      updateModalPlayControls(false, false);
      const prog = document.getElementById('arvr-vg-progress');
      if (prog) prog.style.width = '100%';
      const statusEl = document.getElementById('arvr-vg-status');
      if (statusEl) statusEl.textContent = 'Narration Complete · ' + getModalLangLabel(modalVgCurrentLang);

      const modal = document.getElementById('arvr-modal');
      const key = (modal && (modal.dataset.currentMonument || modal.dataset.stateId)) || 'statue_of_unity';
      if (window.YugmaVoiceGuideAccess) {
        window.YugmaVoiceGuideAccess.recordTourComplete(key, modalVgCurrentLang);
        window.YugmaVoiceGuideAccess.updateUIElements(modal, key);
      }
    }

    function updateModalPlayControls(playing, paused, isLocked) {
      const playBtn = document.getElementById('arvr-vg-play');
      const icon = document.getElementById('arvr-vg-play-icon');
      const lbl = document.getElementById('arvr-vg-play-label');
      const stopBtn = document.getElementById('arvr-vg-stop');
      if (!playBtn) return;

      if (isLocked) {
        if (icon) icon.textContent = '🔒';
        if (lbl) lbl.textContent = 'Tour Limit Reached · Unlock Free';
        if (stopBtn) stopBtn.disabled = true;
        playBtn.style.background = 'linear-gradient(135deg, rgba(239, 68, 68, 0.85), rgba(185, 28, 28, 0.95))';
        playBtn.style.boxShadow = '0 4px 16px rgba(239, 68, 68, 0.35)';
        return;
      }

      playBtn.style.background = '';
      playBtn.style.boxShadow = '';

      if (playing) {
        if (icon) icon.textContent = '⏸';
        if (lbl) lbl.textContent = 'Pause Narration';
        if (stopBtn) stopBtn.disabled = false;
      } else if (paused) {
        if (icon) icon.textContent = '▶';
        if (lbl) lbl.textContent = 'Resume Narration';
        if (stopBtn) stopBtn.disabled = false;
      } else {
        if (icon) icon.textContent = '▶';
        if (lbl) lbl.textContent = 'Play Voice Narration';
        if (stopBtn) stopBtn.disabled = true;
      }
    }

    `;

index = replaceBetween(index, 'function onModalPlaybackFinished() {', 'function escapeHtmlModal(s) {', newFinAndCtrl, 'onModalPlaybackFinished & updateModalPlayControls');

// 5. In openARVRModal, ensure modal.dataset.currentMonument is set
const openTarget = `modal.dataset.stateId = (key === 'statue_of_unity' ? 'gujarat' : (key === 'rajgad_fort' ? 'maharashtra' : key));`;
const openReplacement = `modal.dataset.currentMonument = key;
        modal.dataset.stateId = (key === 'statue_of_unity' ? 'gujarat' : (key === 'rajgad_fort' ? 'maharashtra' : key));`;
if (index.includes(openTarget)) {
  index = index.replace(openTarget, openReplacement);
  console.log('[OK] Updated openARVRModal with dataset.currentMonument');
}

// 6. In arvrLangSel change event, save preferred language
const langTarget = `modalVgCurrentLang = arvrLangSel.value;`;
const langReplacement = `modalVgCurrentLang = arvrLangSel.value;
        if (window.YugmaVoiceGuideAccess) {
          window.YugmaVoiceGuideAccess.savePreferredLanguage(modalVgCurrentLang);
        }`;
if (index.includes(langTarget)) {
  index = index.replace(langTarget, langReplacement);
  console.log('[OK] Added savePreferredLanguage to arvrLangSel change event');
}

fs.writeFileSync('index.html', index, 'utf8');
console.log('Voice guide functions replacement completed successfully.');

