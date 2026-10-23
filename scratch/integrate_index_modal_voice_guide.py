# -*- coding: utf-8 -*-
"""
Integrate interactive 15-Language Voice Guide into index.html's AR/VR Modal.
"""

import os
import re

workspace_dir = r"c:\Users\LENOVO\Downloads\new sih-20260903T160606Z-1-001\new sih"
index_path = os.path.join(workspace_dir, "index.html")

with open(index_path, 'r', encoding='utf-8') as f:
    content = f.read()

# 1. HTML Card to insert into #arvr-content
MODAL_VG_HTML = '''        <!-- ══ 15-LANGUAGE HERITAGE VOICE GUIDE CARD ══ -->
        <div class="modal-voice-guide-card" id="arvr-vg-card" style="margin: 18px 0; padding: 16px; background: linear-gradient(135deg, rgba(16, 22, 38, 0.98), rgba(9, 13, 24, 0.98)); border: 1.5px solid rgba(245, 158, 11, 0.5); border-radius: 14px; box-shadow: 0 10px 28px rgba(0,0,0,0.6), 0 0 20px rgba(245, 158, 11, 0.15);">
          <div style="display:flex; align-items:center; justify-content:space-between; margin-bottom: 12px; flex-wrap: wrap; gap: 10px;">
            <div style="display:flex; align-items:center; gap: 10px;">
              <span style="font-size: 1.4rem; display:inline-flex; align-items:center; justify-content:center; width:36px; height:36px; background:rgba(245,158,11,0.18); border-radius:50%; border:1px solid rgba(245,158,11,0.4);">🎙️</span>
              <div>
                <div style="font-size: 0.88rem; font-weight: 800; color: #ffd56b; letter-spacing: 0.06em; text-transform: uppercase;">15-Language Voice Guide</div>
                <div id="arvr-vg-status" style="font-size: 0.74rem; color: #94a3b8; font-weight: 500;">Select language &amp; click Play to listen</div>
              </div>
            </div>
            <div style="display:flex; align-items:center; gap: 6px;">
              <label for="arvr-vg-lang" style="font-size: 0.74rem; color: #94a3b8; font-weight: 600;">LANG:</label>
              <select id="arvr-vg-lang" style="background: rgba(8,12,24,0.95); border: 1px solid rgba(245, 158, 11, 0.45); color: #f1f5f9; padding: 6px 10px; border-radius: 8px; font-size: 0.8rem; font-weight: 600; cursor: pointer; outline: none;">
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
          </div>
          
          <!-- Play / Pause Controls & Progress -->
          <div style="display:flex; align-items:center; gap: 10px; margin-bottom: 12px;">
            <button type="button" id="arvr-vg-play" style="flex:1; display:flex; align-items:center; justify-content:center; gap: 8px; padding: 11px 18px; background: linear-gradient(135deg, #f59e0b, #d97706); border:none; border-radius:10px; color:#0b0f19; font-weight:800; font-size:0.88rem; cursor:pointer; box-shadow:0 4px 16px rgba(245,158,11,0.4); transition:all 0.2s cubic-bezier(0.16, 1, 0.3, 1);">
              <span id="arvr-vg-play-icon" style="font-size:1rem;">▶</span>
              <span id="arvr-vg-play-label">Play Voice Narration</span>
            </button>
            <button type="button" id="arvr-vg-stop" style="display:flex; align-items:center; justify-content:center; padding: 11px 16px; background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.15); border-radius:10px; color:#cbd5e1; font-weight:600; font-size:0.86rem; cursor:pointer;" disabled>
              ⏹ Stop
            </button>
          </div>

          <!-- Progress Bar -->
          <div style="width:100%; height:4px; background:rgba(255,255,255,0.08); border-radius:2px; margin-bottom:10px; overflow:hidden;">
            <div id="arvr-vg-progress" style="width:0%; height:100%; background:linear-gradient(90deg, #f59e0b, #ffd56b); transition:width 0.15s ease;"></div>
          </div>

          <!-- Live Subtitles Box -->
          <div id="arvr-vg-subtitles" style="background: rgba(0,0,0,0.5); border: 1px solid rgba(245,158,11,0.25); border-radius: 8px; padding: 12px 14px; font-size: 0.86rem; line-height: 1.6; color: #e2e8f0; min-height: 58px; max-height: 100px; overflow-y: auto;">
            Click Play to start the spoken audio guide with live synchronized subtitles...
          </div>
        </div>
'''

# Check if arvr-vg-card already exists
if 'id="arvr-vg-card"' not in content:
    target_needle = '<div id="arvr-multi-models" style="display:none; margin: 15px 0;"></div>'
    if target_needle in content:
        content = content.replace(target_needle, MODAL_VG_HTML + '\n        ' + target_needle, 1)
        print(" [OK] Injected modal voice guide HTML card into index.html")
    else:
        print(" [WARN] Could not find arvr-multi-models in index.html")

# 2. Add the JS engine for Modal Voice Guide
MODAL_VG_JS = '''
    // ══════════════════════════════════════════════════════════════════════════
    // AR/VR MODAL 15-LANGUAGE VOICE GUIDE ENGINE
    // ══════════════════════════════════════════════════════════════════════════
    const ARVR_SUPPORTED_LANGS = [
      { key: 'en', code: 'en-IN', fallback: 'en-US', label: 'English' },
      { key: 'hi', code: 'hi-IN', fallback: 'hi', label: 'हिन्दी' },
      { key: 'gu', code: 'gu-IN', fallback: 'gu', label: 'ગુજરાતી' },
      { key: 'ta', code: 'ta-IN', fallback: 'ta', label: 'தமிழ்' },
      { key: 'te', code: 'te-IN', fallback: 'te', label: 'తెలుగు' },
      { key: 'bn', code: 'bn-IN', fallback: 'bn', label: 'বাংলা' },
      { key: 'mr', code: 'mr-IN', fallback: 'mr', label: 'मराठी' },
      { key: 'kn', code: 'kn-IN', fallback: 'kn', label: 'ಕನ್ನಡ' },
      { key: 'ml', code: 'ml-IN', fallback: 'ml', label: 'മലയാളം' },
      { key: 'pa', code: 'pa-IN', fallback: 'pa', label: 'ਪੰਜਾਬੀ' },
      { key: 'fr', code: 'fr-FR', fallback: 'fr', label: 'Français' },
      { key: 'es', code: 'es-ES', fallback: 'es', label: 'Español' },
      { key: 'de', code: 'de-DE', fallback: 'de', label: 'Deutsch' },
      { key: 'ja', code: 'ja-JP', fallback: 'ja', label: '日本語' },
      { key: 'zh', code: 'zh-CN', fallback: 'zh', label: '中文' }
    ];

    let modalVgSessionId = 0;
    let modalVgAudio = null;
    let modalVgIsPlaying = false;
    let modalVgIsPaused = false;
    let modalVgCurrentLang = 'en';
    let modalVgChunks = [];
    let modalVgChunkIdx = 0;
    let modalVgAllWords = [];
    let modalVgWordIdx = 0;
    let modalVgTimer = null;
    let modalVgKeepAlive = null;

    // Rich multi-monument scripts for the modal voice guide
    const ARVR_MONUMENT_SCRIPTS = {
      statue_of_unity: {
        en: "Welcome to the Statue of Unity, the world's tallest monument, rising an astounding 182 meters above the sacred Narmada River on Sadhu Bet island in Kevadia, Gujarat. Dedicated to Sardar Vallabhbhai Patel, the 'Iron Man of India' who unified 562 princely states into one sovereign democratic republic. Designed by master sculptor Ram V. Sutar and constructed by Larsen and Toubro, this colossal masterpiece features two reinforced concrete cores enveloped by 1,700 tonnes of high-grade bronze plates divided into 6,500 individual cast panels.",
        hi: "विश्व की सबसे ऊंची प्रतिमा, स्टैच्यू ऑफ यूनिटी में आपका हार्दिक स्वागत है। गुजरात के नर्मदा जिले में केवडिया स्थित साधु बेट द्वीप पर पवित्र नर्मदा नदी के तट पर स्थित यह विशाल स्मारक 182 मीटर की ऐतिहासिक ऊंचाई पर गर्व से खड़ा है। भारत के 'लौह पुरुष' सरदार वल्लभभाई पटेल को समर्पित यह स्मारक राष्ट्रीय एकता और इक्कीसवीं सदी की उत्कृष्ट सिविल इंजीनियरिंग का एक अद्वितीय प्रतीक है।",
        gu: "વિશ્વના સૌથી ઊંચા સ્મારક સ્ટેચ્યુ ઓફ યુનિટીમાં આપનું હાર્દિક સ્વાગત છે. ગુજરાતના નર્મદા જિલ્લામાં કેવડિયા ખાતે સાધુ બેટ ટાપુ પર પવિત્ર નર્મદા નદીના કાંઠે સ્થિત આ ભવ્ય પ્રતિમા 182 મીટરની ઐતિહાસિક ઊંચાઈ સાથે ગૌરવભેર ઊભી છે. ભારતના લોખંડી પુરુષ સરદાર વલ્લભભાઈ પટેલને સમર્પિત આ પ્રતિમા અખંડ ભારતની એકતા અને અજોડ ઇજનેરી કૌશલ્યનું જીવંત પ્રતીક છે."
      },
      delhi: {
        en: "Welcome to Delhi's Imperial Heritage. Explore the world-renowned white marble Lotus Temple, the historic red sandstone Red Fort citadel, the soaring 72.5-meter Qutub Minar, and Humayun's timeless Charbagh garden tomb. Each monument chronicles centuries of architectural mastery, royal dynasties, and cultural synthesis in the heart of India's capital.",
        hi: "दिल्ली के ऐतिहासिक वैभव में आपका स्वागत है। विश्व प्रसिद्ध श्वेत संगमरमर के लोटस टेम्पल, ऐतिहासिक लाल किले, 72.5 मीटर ऊंचे कुतुब मीनार और हुमायूं के चारबाग मकबरे का अनुभव करें। यह धरोहर सदियों के स्थापत्य कौशल और समृद्ध इतिहास का सजीव प्रमाण है।"
      },
      punjab: {
        en: "Welcome to Sri Harmandir Sahib, the Golden Temple in Amritsar, Punjab. Revered across the world as the spiritual and cultural heart of Sikhism. Built around the sacred Amrit Sarovar pool, the sanctum sanctorum is adorned with magnificent 24-karat gold foil, marble inlays, and timeless spiritual serenity.",
        hi: "पंजाब के अमृतसर में स्थित श्री हरमंदिर साहिब, स्वर्ण मंदिर में आपका हार्दिक स्वागत है। पवित्र अमृत सरोवर के मध्य स्थित यह पावन गुरुद्वारा अपनी 24 कैरेट स्वर्ण आभा, संगमरमर की नक्काशी और आध्यात्मिक शांति के लिए विश्वविख्यात है।"
      },
      madhya_pradesh: {
        en: "Welcome to the Great Stupa of Sanchi in Madhya Pradesh, India's oldest monumental stone structure commissioned by Emperor Ashoka the Great in the 3rd century BCE. Crowned with the sacred umbrella and four masterfully carved Torana gateways illustrating the life and Jataka tales of Lord Buddha.",
        hi: "मध्य प्रदेश के साँची स्तूप में आपका स्वागत है। ईसा पूर्व तीसरी शताब्दी में सम्राट अशोक महान द्वारा निर्मित यह भारत की सबसे प्राचीन पाषाण संरचना है। इसके चार अलंकृत तोरण द्वार तथा स्तूप बौद्ध धर्म के शांति और ज्ञान का शाश्वत संदेश देते हैं।"
      },
      gateway_of_india: {
        en: "Welcome to the Gateway of India, Mumbai's iconic Indo-Saracenic basalt archway erected on Apollo Bunder overlooking the Arabian Sea. Designed by architect George Wittet, it blends traditional 16th-century Gujarati architectural motifs with classical Roman triumphal arches.",
        hi: "मुंबई के प्रसिद्ध गेटवे ऑफ इंडिया में आपका स्वागत है। अरब सागर के तट पर अपोलो बंदर पर स्थित यह इंडो-সারାસેનિક स्थापत्य का एक भव्य उदाहरण है, जो मुंबई के समृद्ध वाणिज्यिक और ऐतिहासिक गौरव का प्रवेश द्वार है।"
      },
      rajgad_fort: {
        en: "Welcome to Rajgad Fort, the legendary 'King of Forts' and sovereign capital of Chhatrapati Shivaji Maharaj's Hindavi Swarajya for over 26 years. Perched 4,514 feet above sea level in the Sahyadri mountains of Maharashtra, featuring the impregnable Bale Killa citadel, Sujvela, and Sanjeevani machis.",
        hi: "छत्रपति शिवाजी महाराज की ऐतिहासिक राजधानी राजगड दुर्ग में आपका स्वागत है। सह्याद्रि की चोटियों पर 4,514 फीट की ऊंचाई पर स्थित यह अजेय दुर्ग मराठा साम्राज्य के शौर्य, स्वाभिमान और युद्ध कौशल का जीवंत प्रतीक है।"
      }
    };

    function getModalMonumentScript(key, lang) {
      const mon = ARVR_MONUMENT_SCRIPTS[key] || ARVR_MONUMENT_SCRIPTS['statue_of_unity'];
      if (mon[lang]) return mon[lang];
      if (mon['en']) return mon['en'];
      const s = YUGMA_STATES[key] || {};
      return s.heritage ? `Experience the sacred architecture and historical significance of ${s.heritage}. Navigate in 360 degrees and explore interactive cultural lore.` : 'Welcome to this sacred Indian cultural monument.';
    }

    function setupModalVoiceGuide(key, s) {
      stopModalVoiceGuide();
      const statusEl = document.getElementById('arvr-vg-status');
      const langSel = document.getElementById('arvr-vg-lang');
      const subEl = document.getElementById('arvr-vg-subtitles');
      const progEl = document.getElementById('arvr-vg-progress');
      if (progEl) progEl.style.width = '0%';

      if (langSel) {
        // If state has specific regional language, auto-suggest
        if (key === 'statue_of_unity' || key === 'gujarat') modalVgCurrentLang = 'gu';
        else if (key === 'maharashtra' || key === 'rajgad_fort') modalVgCurrentLang = 'mr';
        else if (key === 'tamil_nadu') modalVgCurrentLang = 'ta';
        else if (key === 'punjab') modalVgCurrentLang = 'pa';
        else modalVgCurrentLang = 'en';
        langSel.value = modalVgCurrentLang;
      }

      const script = getModalMonumentScript(key, modalVgCurrentLang);
      if (subEl) subEl.textContent = script.substring(0, 150) + (script.length > 150 ? '…' : '');
      if (statusEl) statusEl.textContent = `Ready · ${getModalLangLabel(modalVgCurrentLang)}`;
    }

    function getModalLangLabel(code) {
      const m = ARVR_SUPPORTED_LANGS.find(l => l.key === code);
      return m ? m.label : code.toUpperCase();
    }

    function getModalNativeVoice(langCode) {
      if (!window.speechSynthesis) return null;
      const voices = window.speechSynthesis.getVoices() || [];
      const meta = ARVR_SUPPORTED_LANGS.find(l => l.key === langCode);
      if (!meta) return null;
      const target = (meta.code || '').toLowerCase().replace('_', '-');
      const pref = meta.key.toLowerCase();

      let v = voices.find(item => (item.lang || '').toLowerCase().replace('_', '-') === target);
      if (v) return v;
      v = voices.find(item => (item.lang || '').toLowerCase().replace('_', '-').startsWith(pref + '-'));
      if (v) return v;
      return null;
    }

    function splitTextForModalCloud(text, maxChars = 80) {
      const rawSentences = text.match(/[^.!?।৷\\n]+[.!?।৷\\n]*/g) || [text];
      const chunks = [];
      let cur = '';
      for (let s of rawSentences) {
        s = s.trim();
        if (!s) continue;
        if ((cur ? cur + ' ' + s : s).length <= maxChars) {
          cur = cur ? cur + ' ' + s : s;
        } else {
          if (cur) chunks.push(cur.trim());
          if (s.length > maxChars) {
            const words = s.split(/\\s+/);
            let sub = '';
            for (let w of words) {
              if ((sub ? sub + ' ' + w : w).length <= maxChars) {
                sub = sub ? sub + ' ' + w : w;
              } else {
                if (sub) chunks.push(sub.trim());
                sub = w;
              }
            }
            cur = sub;
          } else {
            cur = s;
          }
        }
      }
      if (cur && cur.trim()) chunks.push(cur.trim());
      return chunks;
    }

    function playModalVoiceGuide() {
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

      stopModalVoiceGuide();
      modalVgSessionId++;
      const session = modalVgSessionId;

      const modal = document.getElementById('arvr-modal');
      const key = (modal && modal.dataset.stateId) || 'statue_of_unity';
      const langSel = document.getElementById('arvr-vg-lang');
      modalVgCurrentLang = langSel ? langSel.value : 'en';

      const script = getModalMonumentScript(key, modalVgCurrentLang);
      modalVgAllWords = script.trim().split(/\\s+/);

      const subEl = document.getElementById('arvr-vg-subtitles');
      if (subEl) {
        subEl.innerHTML = modalVgAllWords.map((w, i) => `<span id="mvg-w-${i}" class="mvg-word" style="transition:color 0.15s ease;">${escapeHtmlModal(w)} </span>`).join('');
      }

      modalVgIsPlaying = true;
      modalVgIsPaused = false;
      updateModalPlayControls(true, false);

      const statusEl = document.getElementById('arvr-vg-status');
      const nativeVoice = getModalNativeVoice(modalVgCurrentLang);

      if (nativeVoice) {
        if (statusEl) statusEl.textContent = `🔊 Playing (${nativeVoice.name}) · Synced Subtitles`;
        playModalNativeSynthesis(script, nativeVoice, session);
      } else {
        if (statusEl) statusEl.textContent = `☁️ Streaming ${getModalLangLabel(modalVgCurrentLang)} · Cloud Audio`;
        playModalCloudAudio(script, session);
      }
    }

    function playModalCloudAudio(script, session) {
      const rawChunks = splitTextForModalCloud(script, 80);
      modalVgChunks = [];
      let curOffset = 0;
      rawChunks.forEach(c => {
        const cnt = c.trim().split(/\\s+/).length;
        modalVgChunks.push({ text: c, startWord: curOffset, wordCount: cnt });
        curOffset += cnt;
      });

      modalVgChunkIdx = 0;
      playNextModalCloudChunk(session);
    }

    function playNextModalCloudChunk(session) {
      if (session !== modalVgSessionId || !modalVgIsPlaying || modalVgChunkIdx >= modalVgChunks.length) {
        if (session === modalVgSessionId) onModalPlaybackFinished();
        return;
      }

      const chunk = modalVgChunks[modalVgChunkIdx];
      const ttsLang = modalVgCurrentLang === 'zh' ? 'zh-CN' : modalVgCurrentLang;
      const url = `https://translate.google.com/translate_tts?ie=UTF-8&tl=${ttsLang}&client=tw-ob&q=${encodeURIComponent(chunk.text)}`;

      if (!modalVgAudio) {
        modalVgAudio = document.createElement('audio');
        modalVgAudio.id = 'modal-vg-audio-element';
        modalVgAudio.setAttribute('referrerpolicy', 'no-referrer');
        modalVgAudio.style.display = 'none';
        document.body.appendChild(modalVgAudio);
      }

      modalVgAudio.pause();
      modalVgAudio.removeAttribute('src');
      modalVgAudio.setAttribute('referrerpolicy', 'no-referrer');
      modalVgAudio.src = url;

      modalVgAudio.onplay = () => {
        if (session !== modalVgSessionId) return;
        startModalWordTicker(chunk);
      };

      modalVgAudio.ontimeupdate = () => {
        if (session !== modalVgSessionId || !modalVgAudio.duration) return;
        const progress = modalVgAudio.currentTime / modalVgAudio.duration;
        const wIdx = Math.min(chunk.wordCount - 1, Math.floor(progress * chunk.wordCount));
        updateModalHighlights(chunk.startWord + wIdx);
      };

      modalVgAudio.onended = () => {
        if (session !== modalVgSessionId) return;
        if (modalVgTimer) clearInterval(modalVgTimer);
        modalVgChunkIdx++;
        if (modalVgChunkIdx < modalVgChunks.length && modalVgIsPlaying) {
          playNextModalCloudChunk(session);
        } else {
          onModalPlaybackFinished();
        }
      };

      modalVgAudio.onerror = (e) => {
        if (session !== modalVgSessionId) return;
        console.warn('Cloud audio stream notice, falling back:', e);
        if (modalVgTimer) clearInterval(modalVgTimer);
        // Fallback: Default voice speaking English with synchronized subtitles
        const def = (window.speechSynthesis && window.speechSynthesis.getVoices().find(v => (v.lang||'').toLowerCase().startsWith('en'))) || (window.speechSynthesis && window.speechSynthesis.getVoices()[0]);
        if (def) {
          const statusEl = document.getElementById('arvr-vg-status');
          if (statusEl) statusEl.textContent = `🔊 English Voice (${getModalLangLabel(modalVgCurrentLang)} Subtitles)`;
          const enScript = getModalMonumentScript(document.getElementById('arvr-modal')?.dataset?.stateId || 'statue_of_unity', 'en');
          playModalNativeSynthesis(enScript, def, session);
        } else {
          modalVgChunkIdx++;
          if (modalVgChunkIdx < modalVgChunks.length && modalVgIsPlaying) {
            setTimeout(() => playNextModalCloudChunk(session), 80);
          } else {
            onModalPlaybackFinished();
          }
        }
      };

      const p = modalVgAudio.play();
      if (p !== undefined) {
        p.catch(err => {
          if (session !== modalVgSessionId) return;
          console.warn('Audio play notice:', err);
        });
      }
    }

    function playModalNativeSynthesis(script, voice, session) {
      if (window.speechSynthesis) {
        try {
          window.speechSynthesis.cancel();
          if (window.speechSynthesis.paused) window.speechSynthesis.resume();
        } catch(e) {}
      }

      const utt = new SpeechSynthesisUtterance(script);
      utt.voice = voice;
      utt.lang = voice.lang || 'en-US';
      utt.rate = 1.0;

      utt.onboundary = (e) => {
        if (session !== modalVgSessionId) return;
        if (e.name === 'word') {
          const ratio = e.charIndex / (script.length || 1);
          const wIdx = Math.min(modalVgAllWords.length - 1, Math.floor(ratio * modalVgAllWords.length));
          updateModalHighlights(wIdx);
        }
      };

      utt.onend = () => {
        if (session !== modalVgSessionId) return;
        onModalPlaybackFinished();
      };

      utt.onerror = (err) => {
        if (session !== modalVgSessionId) return;
        if (err.error === 'canceled' || err.error === 'interrupted') return;
        console.warn('Modal synthesis error notice:', err);
        onModalPlaybackFinished();
      };

      setTimeout(() => {
        if (session !== modalVgSessionId || !modalVgIsPlaying) return;
        try {
          if (window.speechSynthesis.paused) window.speechSynthesis.resume();
          window.speechSynthesis.speak(utt);
        } catch(e) {}
      }, 50);
    }

    function startModalWordTicker(chunk) {
      if (modalVgTimer) clearInterval(modalVgTimer);
      const wCount = chunk.wordCount;
      const stepMs = Math.max(90, (wCount / 145) * 60 * 1000 / Math.max(1, wCount));
      let tick = 0;
      modalVgTimer = setInterval(() => {
        if (!modalVgIsPlaying || modalVgIsPaused) return;
        tick++;
        if (tick < wCount) {
          updateModalHighlights(chunk.startWord + tick);
        }
      }, stepMs);
    }

    function updateModalHighlights(idx) {
      modalVgWordIdx = Math.max(0, Math.min(idx, modalVgAllWords.length - 1));
      const subEl = document.getElementById('arvr-vg-subtitles');
      if (!subEl) return;

      const words = subEl.querySelectorAll('.mvg-word');
      words.forEach((w, i) => {
        if (i < modalVgWordIdx) {
          w.style.color = '#94a3b8';
          w.style.fontWeight = '400';
        } else if (i === modalVgWordIdx) {
          w.style.color = '#ffd56b';
          w.style.fontWeight = '800';
          w.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        } else {
          w.style.color = '#e2e8f0';
          w.style.fontWeight = '400';
        }
      });

      const prog = document.getElementById('arvr-vg-progress');
      if (prog && modalVgAllWords.length > 1) {
        const pct = Math.min(100, Math.round((modalVgWordIdx / (modalVgAllWords.length - 1)) * 100));
        prog.style.width = pct + '%';
      }
    }

    function stopModalVoiceGuide() {
      modalVgSessionId++;
      modalVgIsPlaying = false;
      modalVgIsPaused = false;
      if (modalVgTimer) clearInterval(modalVgTimer);
      if (modalVgAudio) {
        try {
          modalVgAudio.pause();
          modalVgAudio.removeAttribute('src');
        } catch(e) {}
      }
      if (window.speechSynthesis) {
        try {
          window.speechSynthesis.cancel();
          if (window.speechSynthesis.paused) window.speechSynthesis.resume();
        } catch(e) {}
      }
      updateModalPlayControls(false, false);
      const prog = document.getElementById('arvr-vg-progress');
      if (prog) prog.style.width = '0%';
    }

    function onModalPlaybackFinished() {
      modalVgIsPlaying = false;
      modalVgIsPaused = false;
      if (modalVgTimer) clearInterval(modalVgTimer);
      updateModalPlayControls(false, false);
      const prog = document.getElementById('arvr-vg-progress');
      if (prog) prog.style.width = '100%';
      const statusEl = document.getElementById('arvr-vg-status');
      if (statusEl) statusEl.textContent = `Narration Complete · ${getModalLangLabel(modalVgCurrentLang)}`;
    }

    function updateModalPlayControls(playing, paused) {
      const playBtn = document.getElementById('arvr-vg-play');
      const icon = document.getElementById('arvr-vg-play-icon');
      const lbl = document.getElementById('arvr-vg-play-label');
      const stopBtn = document.getElementById('arvr-vg-stop');
      if (!playBtn) return;

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

    function escapeHtmlModal(s) {
      return (s || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    }
'''

# Check if modal voice guide JS already exists
if 'ARVR_SUPPORTED_LANGS' not in content:
    # Insert right before openARVRModal
    needle = '// ── AR/VR Experience Modal ───────────────────────────────'
    if needle in content:
        content = content.replace(needle, MODAL_VG_JS + '\n    ' + needle, 1)
        print(" [OK] Injected modal voice guide JS engine into index.html")
    else:
        print(" [WARN] Could not find AR/VR Experience Modal marker in index.html")

# Update openARVRModal and closeARVRModal in index.html
if 'setupModalVoiceGuide' not in content:
    content = content.replace(
        "if (modal) {\n        modal.dataset.stateId = (key === 'statue_of_unity' ? 'gujarat' : (key === 'rajgad_fort' ? 'maharashtra' : key));\n        modal.classList.add('active');\n      }",
        "if (modal) {\n        modal.dataset.stateId = (key === 'statue_of_unity' ? 'gujarat' : (key === 'rajgad_fort' ? 'maharashtra' : key));\n        modal.classList.add('active');\n        setupModalVoiceGuide(key, s);\n      }",
        1
    )
    print(" [OK] Connected setupModalVoiceGuide to openARVRModal")

if 'stopModalVoiceGuide' not in content or 'modal.classList.remove(\'active\');\n      stopModalVoiceGuide();' not in content:
    content = content.replace(
        "function closeARVRModal() {\n      const modal = document.getElementById('arvr-modal');\n      if (modal) modal.classList.remove('active');\n    }",
        "function closeARVRModal() {\n      const modal = document.getElementById('arvr-modal');\n      if (modal) modal.classList.remove('active');\n      stopModalVoiceGuide();\n    }",
        1
    )
    print(" [OK] Connected stopModalVoiceGuide to closeARVRModal")

# Add event listeners for modal voice guide buttons
BINDINGS_JS = '''
    // Modal Voice Guide Bindings
    const arvrPlayBtn = document.getElementById('arvr-vg-play');
    if (arvrPlayBtn) arvrPlayBtn.addEventListener('click', playModalVoiceGuide);
    const arvrStopBtn = document.getElementById('arvr-vg-stop');
    if (arvrStopBtn) arvrStopBtn.addEventListener('click', stopModalVoiceGuide);
    const arvrLangSel = document.getElementById('arvr-vg-lang');
    if (arvrLangSel) {
      arvrLangSel.addEventListener('change', () => {
        const was = modalVgIsPlaying;
        stopModalVoiceGuide();
        modalVgCurrentLang = arvrLangSel.value;
        const modal = document.getElementById('arvr-modal');
        const k = (modal && modal.dataset.stateId) || 'statue_of_unity';
        const sc = getModalMonumentScript(k, modalVgCurrentLang);
        const sub = document.getElementById('arvr-vg-subtitles');
        if (sub) sub.textContent = sc.substring(0, 150) + (sc.length > 150 ? '…' : '');
        const st = document.getElementById('arvr-vg-status');
        if (st) st.textContent = `Ready · ${getModalLangLabel(modalVgCurrentLang)}`;
        if (was) setTimeout(playModalVoiceGuide, 80);
      });
    }
'''

if 'arvrPlayBtn' not in content:
    bind_needle = 'const arvrCloseBtn = document.getElementById(\'arvr-close\');'
    if bind_needle in content:
        content = content.replace(bind_needle, BINDINGS_JS + '\n    ' + bind_needle, 1)
        print(" [OK] Injected modal voice guide button bindings into index.html")

with open(index_path, 'w', encoding='utf-8') as f:
    f.write(content)

print("\nindex.html update finished!")
