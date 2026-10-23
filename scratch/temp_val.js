
  (function () {
    "use strict";

    var SITE_NAME = "Rani Ki Vav";
    var SUPPORTED_LANGS = [
      { key: 'en', code: 'en-IN', fallback: 'en-US', label: 'English', flag: '🇬🇧' },
      { key: 'hi', code: 'hi-IN', fallback: 'hi', label: 'हिन्दी', flag: '🇮🇳' },
      { key: 'ta', code: 'ta-IN', fallback: 'ta', label: 'தமிழ்', flag: '🇮🇳' },
      { key: 'te', code: 'te-IN', fallback: 'te', label: 'తెలుగు', flag: '🇮🇳' },
      { key: 'bn', code: 'bn-IN', fallback: 'bn', label: 'বাংলা', flag: '🇮🇳' },
      { key: 'mr', code: 'mr-IN', fallback: 'mr', label: 'मराठी', flag: '🇮🇳' },
      { key: 'gu', code: 'gu-IN', fallback: 'gu', label: 'ગુજરાતી', flag: '🇮🇳' },
      { key: 'kn', code: 'kn-IN', fallback: 'kn', label: 'ಕನ್ನಡ', flag: '🇮🇳' },
      { key: 'ml', code: 'ml-IN', fallback: 'ml', label: 'മലയാളം', flag: '🇮🇳' },
      { key: 'pa', code: 'pa-IN', fallback: 'pa', label: 'ਪੰਜਾਬੀ', flag: '🇮🇳' },
      { key: 'fr', code: 'fr-FR', fallback: 'fr', label: 'Français', flag: '🇫🇷' },
      { key: 'es', code: 'es-ES', fallback: 'es', label: 'Español', flag: '🇪🇸' },
      { key: 'de', code: 'de-DE', fallback: 'de', label: 'Deutsch', flag: '🇩🇪' },
      { key: 'ja', code: 'ja-JP', fallback: 'ja', label: '日本語', flag: '🇯🇵' },
      { key: 'zh', code: 'zh-CN', fallback: 'zh', label: '中文', flag: '🇨🇳' }
    ];

    var VG_SCRIPTS = {"en": "Welcome to Rani Ki Vav, Queen Udayamati's Stepwell, a breathtaking UNESCO World Heritage monument situated in Patan, Gujarat, on the banks of the ancient Saraswati River. Commissioned in the 11th century CE by Queen Udayamati as a water reservoir and memorial for her deceased consort, King Bhima I of the Solanki or Chaulukya dynasty, this subterranean architectural triumph is conceived not merely as a utilitarian water source, but as an inverted underground temple honouring the sacred sanctity of water. Descending through seven stepped subterranean storeys to a depth of 27 meters, the stepwell measures 65 meters long and 20 meters wide, flanked by elaborately carved pillared pavilions. Over 500 principal sculptures and more than 1,000 minor religious carvings adorn its sculpted walls, depicting the Dashavatara (the ten avatars of Lord Vishnu), Sheshashayi Vishnu reclining on the thousand-headed serpent Sheshanaga, apsaras applying cosmetics, and celestial deities rendered in the finest Maru-Gurjara style. Silted over for centuries by flood deposits, its pristine rediscovery preserved its exquisite sandstone detail from climatic weathering. Step inside this digital model to explore seven tiers of sacred underground water architecture.", "hi": "रानी की वाव में आपका स्वागत है, जो गुजरात के पाटण में सरस्वती नदी के तट पर स्थित यूनेस्को की विश्व धरोहर है। ११वीं शताब्दी में सोलंकी वंश की रानी उदयमति ने अपने पति राजा भीमदेव प्रथम की स्मृति में इस भव्य बावड़ी का निर्माण करवाया था। यह केवल जल संचयन का साधन नहीं, बल्कि जल की पवित्रता को समर्पित एक उल्टा भूमिगत मंदिर है। यह वाव सात मंजिलों में २७ मीटर गहरी है, जिसमें ५०० से अधिक मुख्य मूर्तियां और १०০০ से अधिक लघु मूर्तियां उत्कीर्ण हैं। इसमें भगवान विष्णु के दशावतार, शेषशायी विष्णु और मारू-गुर्जर शैली में अलंकृत अप्सराओं की प्रतिमाएं दर्शनीय हैं। शताब्दियों तक रेत में दबे रहने के कारण इसकी मूर्तियां आज भी सजीव प्रतीत होती हैं। सात मंजिला भूमिगत वास्तुशिल्प का अनुभव करें।", "ta": "ராணி கி வாவ் படிக்கிணற்றுக்கு நல்வரவு. குஜராத்தின் பதான் நகரில் சோலங்கி வம்சத்து ராணி உதயமதி 11 ஆம் நூற்றாண்டில் கட்டிய இந்த ஏழு அடுக்கு நிலத்தடி படிக்கிணறு யுனெஸ்கோ உலக பாரம்பரிய தளமாகும். விஷ்ணுவின் தசாவதார சிலைகளும் கலைநயமிக்க சிற்பங்களும் நிறைந்த இந்த தலைகீழ் கோவிலை 3D இல் காண்க.", "te": "రాణీ కీ వావ్ కు స్వాగతం. గుజరాత్ లోని పటాన్ లో సరస్వతీ నది ఒడ్డున 11వ శతాబ్దంలో రాణి ఉదయమతి నిర్మించిన ఏడు అంతస్తుల మెట్ల బావి ఇది. నీటి పవిత్రతను చాటే ఈ భూగర్భ దేవాలయంలో విష్ణుమూర్తి దశావతారాల అపురూప శిల్పాలు 500కు పైగా ఉన్నాయి.", "bn": "রানি কি ভাও-এ স্বাগতম। গুজরাটের পাটনে অবস্থিত এই ১১শ শতাব্দীর রাজকীয় সিঁড়িযুক্ত কূপটি ইউনেস্কো বিশ্ব ঐতিহ্য। রানি উদয়মতি কর্তৃক নির্মিত এই সপ্তস্তরীয় ভূগর্ভস্থ মন্দিরটিতে ভগবান বিষ্ণুর দশাবতার সহ ৫০০টিরও বেশি অনবদ্য ভাস্কর্য খোদাই করা রয়েছে।", "mr": "गुजरातमधील पाटण येथील राणी की वाव मध्ये आपले स्वागत आहे. ११ व्या शतकात सोलंकी राणी उदयमतीने बांधलेली ही पायऱ्यांची विहीर म्हणजे एक उलटे भूगर्भीय मंदिरच आहे. सात मजले खोल असलेल्या या विहिरीत विष्णूचे दशावतार आणि मारू-गुर्जर शिल्पकलेचा अद्भुत संगम पाहायला मिळतो.", "gu": "રાણકી વાવ, પાટણમાં આપનું હાર્દિક સ્વાગત છે. ૧૧મી સદીમાં સોલંકી વંશની રાણી ઉદયમતીએ રાજા ભીમદેવ પ્રથમની સ્મૃતિમાં બંધાવેલી આ સાત માળની વાવ યુનેસ્કો વર્લ્ડ હેરિટેજ છે. જળ મંદિર સમાન આ વાવમાં વિષ્ણુના દશાવતાર અને મારુ-ગુર્જર શૈલીની ૫૦૦થી વધુ અજોડ મૂર્તિઓ કંડારેલી છે.", "kn": "ರಾಣಿ ಕಿ ವಾವ್ ಮೆಟ್ಟಿಲುಬಾವಿಗೆ ಸುಸ್ವಾಗತ. ಗುಜರಾತಿನ ಪಟಾನ್‌ನಲ್ಲಿ 11ನೇ ಶತಮಾನದಲ್ಲಿ ಸೋಲಂಕಿ ರಾಣಿ ಉದಯಮತಿ ನಿರ್ಮಿಸಿದ ಈ 7 ಹಂತಗಳ ಭೂಗರ್ಭ ದೇವಾಲಯ ಯುನೆಸ್ಕೋ ವಿಶ್ವ ಪರಂಪರೆ ತಾಣವಾಗಿದೆ. ವಿಷ್ಣುವಿನ ದಶಾವತಾರಗಳ ಅದ್ಭುತ ಶಿಲ್ಪಕಲೆಗಳನ್ನು ಇಲ್ಲಿ ಕಣ್ತುಂಬಿಕೊಳ್ಳಿ.", "ml": "ഗുജറാത്തിലെ പഠാനിലുള്ള റാണി കി വാവിലേക്ക് സ്വാഗതം. പതിനൊന്നാം നൂറ്റാണ്ടിൽ ഉദയമതി രാജ്ഞി നിർമ്മിച്ച ഈ ഏഴ് നിലകളുള്ള പടവുക്കിണർ ജലത്തിന്റെ വിശുദ്ധിയെ വണങ്ങുന്ന ഒരു ഭൂഗർഭ ക്ഷേത്രമാണ്. വിഷ്ണുവിന്റെ ദശാവതാരങ്ങൾ ഉൾക്കൊള്ളുന്ന ശില്പകലകൾ ഇതിൽ കാണാം.", "pa": "ਰਾਣੀ ਕੀ ਵਾਵ ਵਿੱਚ ਸੁਆਗਤ ਹੈ। ਗੁਜਰਾਤ ਦੇ ਪਾਟਣ ਵਿੱਚ ਸਥਿਤ ਇਹ 11ਵੀਂ ਸਦੀ ਦੀ ਬਾਵੜੀ ਯੂਨੈਸਕੋ ਵਿਸ਼ਵ ਵਿਰਾਸਤ ਹੈ। ਸੱਤ ਮੰਜ਼ਿਲਾਂ ਡੂੰਘੀ ਇਸ ਬਾਵੜੀ ਵਿੱਚ ਭਗਵਾਨ ਵਿਸ਼ਨੂੰ ਦੇ ਦਸ ਅਵਤਾਰਾਂ ਅਤੇ ਮਾਰੂ-ਗੁਰਜਰ ਕਲਾ ਦੀਆਂ ਸ਼ਾਨਦਾਰ ਮੂਰਤੀਆਂ ਉੱਕਰੀਆਂ ਹੋਈਆਂ ਹਨ।", "fr": "Bienvenue à Rani Ki Vav, le puits à degrés de la reine à Patan, Gujarat, chef-d'œuvre de l'UNESCO. Construit au XIe siècle par la reine Udayamati, cet ensemble souterrain de sept niveaux étagés est conçu comme un temple inversé célébrant la sainteté de l'eau avec plus de 500 statues magistrales de Vishnou.", "es": "Bienvenidos a Rani Ki Vav, el pozo escalonado de la reina en Patan, Gujarat. Construido en el siglo XI por la reina Udayamati, este templo invertido subterráneo de siete niveles desciende 27 metros y alberga más de 500 esculturas monumentales dedicadas a las encarnaciones del dios Vishnu.", "de": "Willkommen im Rani Ki Vav, dem Stufenbrunnen der Königin in Patan, Gujarat. Im 11. Jahrhundert von Königin Udayamati erbaut, ist dieses unterirdische, siebenstöckige UNESCO-Bauwerk als umgekehrter Tempel konzipiert und mit über 500 meisterhaften Skulpturen der Gottheit Vishnu verziert.", "ja": "グジャラート州パータンにある世界遺産の階段井戸、ラーニー・キ・ヴァーヴ（王妃の階段井戸）へようこそ。11世紀にウダヤマティ王妃によって建立された深さ27メートルの7層からなるこの地下建造物は、水を神聖視する逆さの寺院として設計され、ヴィシュヌ神の化身像など500以上の精緻な彫刻で満たされています。", "zh": "欢迎来到古吉拉特邦帕坦的王后阶梯井。这座建于11世纪的联合国教科文组织世界遗产由乌达亚玛蒂王后为纪念夫君而筑。深达27米、共分七层的地下梯井宛如一座倒置的神庙，雕刻着500多尊主神毗湿奴十种化身的高超石雕，堪称地下水利建筑与神圣雕刻艺术的巅峰之作。"};

    var currentLang = 'en';
    var isPlaying = false;
    var isPaused = false;
    var selectedRate = 1.0;
    var showHud = true;
    var currentEngine = 'native'; // 'native' or 'cloud'
    var audioSessionId = 0;

    // Trackers
    var wordSpans = [];
    var allWords = [];
    var activeWordIndex = 0;
    var wordTimer = null;
    var keepAliveTimer = null;
    var synth = ('speechSynthesis' in window) ? window.speechSynthesis : null;
    var currentUtterance = null;
    var speechChunks = [];
    var currentChunkIdx = 0;
    var cloudChunks = [];
    var currentAudioEl = null;

    // DOM Elements
    var playBtn = document.getElementById('vg-play');
    var playIcon = document.getElementById('vg-play-icon');
    var playLabel = document.getElementById('vg-play-label');
    var stopBtn = document.getElementById('vg-stop');
    var scriptBox = document.getElementById('vg-script-box');
    var progressBar = document.getElementById('vg-progress-bar');
    var voiceInfo = document.getElementById('vg-voice-info');
    var panel = document.getElementById('voice-guide-panel');
    var hud = document.getElementById('vg-subtitle-hud');
    var hudContent = document.getElementById('vg-hud-content');
    var hudLangLabel = document.getElementById('vg-hud-lang-label');
    var hudToggleBtn = document.getElementById('vg-hud-toggle');
    var hudCloseBtn = document.getElementById('vg-hud-close');
    var mainTrigger = document.getElementById('btn-voice-guide');
    var navTrigger = document.getElementById('btn-nav-voice-guide');
    var closeBtn = document.getElementById('vg-close');

    function detectLanguage() {
      try {
        var raw = (navigator.language || navigator.userLanguage || 'en').toLowerCase();
        var code = raw.split('-')[0];
        var match = SUPPORTED_LANGS.find(function (l) { return l.key === code; });
        return match ? match.key : 'en';
      } catch (e) {
        return 'en';
      }
    }

    function buildLangPills() {
      var row = document.getElementById('vg-lang-row');
      if (!row) return;
      row.innerHTML = '';
      SUPPORTED_LANGS.forEach(function (lang) {
        var btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'vg-lang-pill' + (lang.key === currentLang ? ' active' : '');
        btn.dataset.lang = lang.key;
        btn.textContent = lang.flag + ' ' + lang.label;
        btn.addEventListener('click', function () {
          var wasPlaying = isPlaying;
          stopGuide();
          currentLang = lang.key;
          document.querySelectorAll('.vg-lang-pill').forEach(function (p) { p.classList.remove('active'); });
          btn.classList.add('active');
          renderScript(currentLang);
          updateEngineIndicator();
          if (wasPlaying) {
            setTimeout(function () { playGuide(0); }, 60);
          }
        });
        row.appendChild(btn);
      });
    }

    function escapeHtml(s) {
      return (s || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    }

    function renderScript(langKey) {
      var sc = VG_SCRIPTS[langKey] || VG_SCRIPTS['en'] || '';
      allWords = sc.trim().split(/\s+/);
      if (scriptBox) {
        scriptBox.innerHTML = allWords.map(function (w, i) {
          return '<span class="vg-word" id="vg-w-' + i + '" data-idx="' + i + '">' + escapeHtml(w) + ' </span>';
        }).join('');
        wordSpans = allWords.map(function (_, i) {
          return document.getElementById('vg-w-' + i);
        });
        scriptBox.scrollTop = 0;
      }
      if (hudContent && !isPlaying) {
        hudContent.textContent = sc.substring(0, 140) + (sc.length > 140 ? '…' : '');
      }
      var meta = SUPPORTED_LANGS.find(function(l) { return l.key === langKey; }) || SUPPORTED_LANGS[0];
      if (hudLangLabel && meta) {
        hudLangLabel.textContent = meta.label.toUpperCase();
      }
      activeWordIndex = 0;
      updateHighlights(0);
      if (progressBar) progressBar.style.width = '0%';
    }

    function updateEngineIndicator(customStatus) {
      if (!voiceInfo) return;
      var meta = SUPPORTED_LANGS.find(function (l) { return l.key === currentLang; }) || SUPPORTED_LANGS[0];
      if (customStatus) {
        voiceInfo.textContent = customStatus;
      } else {
        var hasNative = !!getNativeVoice(currentLang);
        var icon = hasNative ? '🔊' : '☁️';
        var type = hasNative ? 'Native' : 'Cloud';
        voiceInfo.textContent = icon + ' ' + meta.label + ' (' + type + ' · ' + selectedRate + 'x)';
      }
    }

    function updateHighlights(idx) {
      activeWordIndex = Math.max(0, Math.min(idx, allWords.length - 1));

      for (var i = 0; i < wordSpans.length; i++) {
        var span = wordSpans[i];
        if (!span) continue;
        if (i < activeWordIndex) {
          span.className = 'vg-word vg-word-spoken';
        } else if (i === activeWordIndex) {
          span.className = 'vg-word vg-word-active';
          if (isPlaying && scriptBox) {
            span.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
          }
        } else {
          span.className = 'vg-word';
        }
      }

      if (hud && hudContent && showHud) {
        var windowSize = 9;
        var start = Math.max(0, activeWordIndex - 3);
        var end = Math.min(allWords.length, start + windowSize);
        if (end - start < windowSize && start > 0) {
          start = Math.max(0, end - windowSize);
        }
        var hudHtml = '';
        for (var k = start; k < end; k++) {
          var cls = (k < activeWordIndex) ? 'vg-hud-word spoken' : (k === activeWordIndex ? 'vg-hud-word active' : 'vg-hud-word pending');
          hudHtml += '<span class="' + cls + '">' + escapeHtml(allWords[k]) + ' </span>';
        }
        hudContent.innerHTML = hudHtml;
      }

      if (progressBar && allWords.length > 1) {
        var pct = Math.min(100, Math.round((activeWordIndex / (allWords.length - 1)) * 100));
        progressBar.style.width = pct + '%';
      }
    }

    // ── Voice Detection ───────────────────────────────────────────────────
    function getNativeVoice(langKey) {
      if (!synth) return null;
      var voices = synth.getVoices() || [];
      if (!voices.length) return null;

      var meta = SUPPORTED_LANGS.find(function(l) { return l.key === langKey; }) || SUPPORTED_LANGS[0];
      var targetCode = (meta.code || '').toLowerCase().replace('_', '-');
      var fallbackCode = (meta.fallback || '').toLowerCase().replace('_', '-');
      var langPrefix = meta.key.toLowerCase();

      // 1. Exact match (e.g. en-IN or hi-IN)
      var v = voices.find(function(item) {
        var l = (item.lang || '').toLowerCase().replace('_', '-');
        return l === targetCode;
      });
      if (v) return v;

      // 2. Prefix match (e.g. en or hi)
      v = voices.find(function(item) {
        var l = (item.lang || '').toLowerCase().replace('_', '-');
        return l.startsWith(langPrefix + '-') || l === langPrefix;
      });
      if (v) return v;

      // 3. Fallback code match
      if (fallbackCode) {
        v = voices.find(function(item) {
          var l = (item.lang || '').toLowerCase().replace('_', '-');
          return l.startsWith(fallbackCode) || l === fallbackCode;
        });
        if (v) return v;
      }
      return null;
    }

    function getDefaultVoice() {
      if (!synth) return null;
      var voices = synth.getVoices() || [];
      if (!voices.length) return null;
      return voices.find(function(v) {
        var l = (v.lang || '').toLowerCase();
        return l.startsWith('en');
      }) || voices[0];
    }

    // ── Chunk text for Cloud Audio (< 80 chars guarantees 200 OK) ─────────
    function splitTextForCloud(text, maxChars) {
      maxChars = maxChars || 80;
      var rawSentences = text.match(/[^.!?।৷\n]+[.!?।৷\n]*/g) || [text];
      var chunks = [];
      var cur = '';
      for (var i = 0; i < rawSentences.length; i++) {
        var s = rawSentences[i].trim();
        if (!s) continue;
        if ((cur ? cur + ' ' + s : s).length <= maxChars) {
          cur = cur ? cur + ' ' + s : s;
        } else {
          if (cur) chunks.push(cur.trim());
          if (s.length > maxChars) {
            var words = s.split(/\s+/);
            var sub = '';
            for (var j = 0; j < words.length; j++) {
              var w = words[j];
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

    // ── Primary Play Controller ───────────────────────────────────────────
    function playGuide(startFromWord) {
      // Toggle Pause
      if (isPlaying && !isPaused && arguments.length === 0) {
        pauseGuide();
        return;
      }

      // Toggle Resume
      if (isPaused && arguments.length === 0) {
        resumeGuide();
        return;
      }

      startFromWord = typeof startFromWord === 'number' ? startFromWord : activeWordIndex;
      startPlayback(startFromWord);
    }

    function pauseGuide() {
      isPaused = true;
      if (currentEngine === 'cloud' && currentAudioEl) {
        try { currentAudioEl.pause(); } catch (e) {}
      } else if (synth) {
        try { synth.pause(); } catch (e) {}
      }
      if (wordTimer) { clearInterval(wordTimer); wordTimer = null; }
      updatePlayControls(false, true);
    }

    function resumeGuide() {
      isPaused = false;
      isPlaying = true;
      updatePlayControls(true, false);
      if (currentEngine === 'cloud' && currentAudioEl) {
        try { currentAudioEl.play().catch(function(e) { console.warn('Resume notice:', e); }); } catch (e) {}
      } else if (synth) {
        try { synth.resume(); } catch (e) {}
        resumeWordTicker();
      }
    }

    function stopGuide() {
      audioSessionId++;
      isPlaying = false;
      isPaused = false;
      if (wordTimer) { clearInterval(wordTimer); wordTimer = null; }
      if (keepAliveTimer) { clearInterval(keepAliveTimer); keepAliveTimer = null; }

      if (synth) {
        try {
          synth.cancel();
          if (synth.paused) synth.resume();
        } catch (e) {}
      }
      if (currentAudioEl) {
        try {
          currentAudioEl.pause();
          currentAudioEl.removeAttribute('src');
          currentAudioEl.onplay = null;
          currentAudioEl.ontimeupdate = null;
          currentAudioEl.onended = null;
          currentAudioEl.onerror = null;
        } catch (e) {}
      }

      activeWordIndex = 0;
      updatePlayControls(false, false);
      updateHighlights(0);
      if (progressBar) progressBar.style.width = '0%';
    }

    function onPlaybackFinished() {
      isPlaying = false;
      isPaused = false;
      if (wordTimer) { clearInterval(wordTimer); wordTimer = null; }
      if (keepAliveTimer) { clearInterval(keepAliveTimer); keepAliveTimer = null; }
      updatePlayControls(false, false);
      if (allWords.length > 0) updateHighlights(allWords.length - 1);
      if (progressBar) progressBar.style.width = '100%';
      if (hudContent) {
        hudContent.textContent = 'Voice guide narration complete. Click Play to listen again.';
      }
    }

    function updatePlayControls(playing, paused) {
      if (!playBtn) return;
      if (playing) {
        playBtn.classList.add('playing');
        if (playIcon) playIcon.textContent = '⏸';
        if (playLabel) playLabel.textContent = 'Pause Narration';
        if (stopBtn) stopBtn.disabled = false;
      } else if (paused) {
        playBtn.classList.remove('playing');
        if (playIcon) playIcon.textContent = '▶';
        if (playLabel) playLabel.textContent = 'Resume Narration';
        if (stopBtn) stopBtn.disabled = false;
      } else {
        playBtn.classList.remove('playing');
        if (playIcon) playIcon.textContent = '▶';
        if (playLabel) playLabel.textContent = 'Play Audio Guide';
        if (stopBtn) stopBtn.disabled = true;
      }
    }

    // ── Start Audio Playback Dispatcher ───────────────────────────────────
    function startPlayback(startIdx) {
      audioSessionId++;
      var session = audioSessionId;

      // Clean up previous speech
      if (synth) {
        try {
          synth.cancel();
          if (synth.paused) synth.resume();
        } catch (e) {}
      }
      if (currentAudioEl) {
        try {
          currentAudioEl.pause();
          currentAudioEl.removeAttribute('src');
          currentAudioEl.onplay = null;
          currentAudioEl.ontimeupdate = null;
          currentAudioEl.onended = null;
          currentAudioEl.onerror = null;
        } catch (e) {}
      }
      if (wordTimer) { clearInterval(wordTimer); wordTimer = null; }

      activeWordIndex = Math.max(0, Math.min(startIdx, allWords.length - 1));
      updateHighlights(activeWordIndex);

      var remainingWords = allWords.slice(activeWordIndex);
      var remainingText = remainingWords.join(' ');
      if (!remainingText.trim()) {
        onPlaybackFinished();
        return;
      }

      isPlaying = true;
      isPaused = false;
      updatePlayControls(true, false);
      if (hud && showHud) hud.style.display = 'block';

      // ── Select Best Engine ──
      var nativeVoice = getNativeVoice(currentLang);
      if (nativeVoice) {
        // Mode A: Native Web Speech API
        currentEngine = 'native';
        updateEngineIndicator();
        playNativeStream(remainingText, activeWordIndex, nativeVoice, session);
      } else {
        // Mode B: High-Fidelity Cloud Audio
        currentEngine = 'cloud';
        updateEngineIndicator();
        playCloudStream(remainingText, activeWordIndex, session);
      }
    }

    // ── Engine 1: Native Speech Synthesis ─────────────────────────────────
    function playNativeStream(text, wordOffset, voice, session) {
      speechChunks = [];
      var rawSentences = text.match(/[^.!?।৷\n]+[.!?।৷\n]*/g) || [text];
      var curOffset = wordOffset;
      rawSentences.forEach(function (s) {
        var sTrim = s.trim();
        if (!sTrim) return;
        var count = sTrim.split(/\s+/).length;
        speechChunks.push({
          text: sTrim,
          startWord: curOffset,
          wordCount: count
        });
        curOffset += count;
      });

      currentChunkIdx = 0;
      startKeepAlive();
      // 50ms delay avoids Chromium synchronous cancellation race condition
      setTimeout(function () {
        if (session !== audioSessionId || !isPlaying) return;
        playNextNativeChunk(voice, session);
      }, 50);
    }

    function playNextNativeChunk(voice, session) {
      if (session !== audioSessionId || !isPlaying || currentChunkIdx >= speechChunks.length) {
        if (session === audioSessionId) onPlaybackFinished();
        return;
      }

      var chunk = speechChunks[currentChunkIdx];
      var utt = new SpeechSynthesisUtterance(chunk.text);
      currentUtterance = utt; // prevent GC bug
      utt.voice = voice;
      utt.lang = voice.lang || 'en-US';
      utt.rate = selectedRate;
      utt.pitch = 1.0;
      utt.volume = 1.0;

      startWordTickerForChunk(chunk);

      utt.onboundary = function (e) {
        if (session !== audioSessionId) return;
        if (e.name === 'word') {
          var ratio = e.charIndex / (chunk.text.length || 1);
          var wIdx = Math.min(chunk.wordCount - 1, Math.floor(ratio * chunk.wordCount));
          updateHighlights(chunk.startWord + wIdx);
        }
      };

      utt.onend = function () {
        if (session !== audioSessionId) return;
        if (wordTimer) { clearInterval(wordTimer); wordTimer = null; }
        currentChunkIdx++;
        if (currentChunkIdx < speechChunks.length && isPlaying) {
          playNextNativeChunk(voice, session);
        } else {
          onPlaybackFinished();
        }
      };

      utt.onerror = function (err) {
        if (session !== audioSessionId) return;
        if (err.error === 'canceled' || err.error === 'interrupted') return;
        console.warn('Native speech notice:', err);
        if (wordTimer) { clearInterval(wordTimer); wordTimer = null; }
        // Fallback: If native speech encounters an error, switch to cloud audio
        var remainingWords = allWords.slice(chunk.startWord);
        if (remainingWords.length > 0 && isPlaying) {
          currentEngine = 'cloud';
          updateEngineIndicator();
          playCloudStream(remainingWords.join(' '), chunk.startWord, session);
        } else {
          onPlaybackFinished();
        }
      };

      try {
        if (synth.paused) synth.resume();
        synth.speak(utt);
      } catch (e) {
        console.warn('SpeechSynthesis speak notice:', e);
      }
    }

    // ── Engine 2: Cloud Native Audio Stream ───────────────────────────────
    function playCloudStream(text, wordOffset, session) {
      var rawChunks = splitTextForCloud(text, 80);
      cloudChunks = [];
      var curOffset = wordOffset;
      rawChunks.forEach(function (c) {
        var count = c.trim().split(/\s+/).length;
        cloudChunks.push({
          text: c,
          startWord: curOffset,
          wordCount: count
        });
        curOffset += count;
      });

      currentChunkIdx = 0;
      playNextCloudChunk(session);
    }

    function playNextCloudChunk(session) {
      if (session !== audioSessionId || !isPlaying || currentChunkIdx >= cloudChunks.length) {
        if (session === audioSessionId) onPlaybackFinished();
        return;
      }

      var chunk = cloudChunks[currentChunkIdx];
      var meta = SUPPORTED_LANGS.find(function (l) { return l.key === currentLang; }) || SUPPORTED_LANGS[0];
      var ttsLang = meta.key === 'zh' ? 'zh-CN' : meta.key;
      var url = 'https://translate.google.com/translate_tts?ie=UTF-8&tl=' + ttsLang + '&client=tw-ob&q=' + encodeURIComponent(chunk.text);

      if (!currentAudioEl) {
        currentAudioEl = document.createElement('audio');
        currentAudioEl.id = 'vg-cloud-audio-element';
        currentAudioEl.setAttribute('referrerpolicy', 'no-referrer');
        currentAudioEl.style.display = 'none';
        document.body.appendChild(currentAudioEl);
      }

      currentAudioEl.pause();
      currentAudioEl.removeAttribute('src');
      currentAudioEl.playbackRate = selectedRate;
      currentAudioEl.setAttribute('referrerpolicy', 'no-referrer');
      currentAudioEl.src = url;

      currentAudioEl.onplay = function () {
        if (session !== audioSessionId) return;
        startWordTickerForChunk(chunk);
      };

      currentAudioEl.ontimeupdate = function () {
        if (session !== audioSessionId || !currentAudioEl.duration) return;
        var progress = currentAudioEl.currentTime / currentAudioEl.duration;
        var wIdx = Math.min(chunk.wordCount - 1, Math.floor(progress * chunk.wordCount));
        updateHighlights(chunk.startWord + wIdx);
      };

      currentAudioEl.onended = function () {
        if (session !== audioSessionId) return;
        if (wordTimer) { clearInterval(wordTimer); wordTimer = null; }
        currentChunkIdx++;
        if (currentChunkIdx < cloudChunks.length && isPlaying) {
          playNextCloudChunk(session);
        } else {
          onPlaybackFinished();
        }
      };

      currentAudioEl.onerror = function (e) {
        if (session !== audioSessionId) return;
        console.warn('Cloud audio notice, activating system voice fallback:', e);
        if (wordTimer) { clearInterval(wordTimer); wordTimer = null; }
        
        // Mode C Fallback: If cloud audio fails (e.g. offline sandbox), use default English voice with subtitle sync
        var defVoice = getDefaultVoice();
        if (defVoice) {
          currentEngine = 'native';
          var isEnglishVoice = (defVoice.lang || '').toLowerCase().startsWith('en');
          var textToSpeak = (isEnglishVoice && currentLang !== 'en')
            ? (VG_SCRIPTS['en'] || '').trim()
            : allWords.slice(chunk.startWord).join(' ');
          
          var metaLang = SUPPORTED_LANGS.find(function (l) { return l.key === currentLang; }) || SUPPORTED_LANGS[0];
          var badgeText = (isEnglishVoice && currentLang !== 'en')
            ? '🔊 English Narration (' + metaLang.label + ' Subtitles)'
            : '🔊 System Audio (' + selectedRate + 'x)';
          updateEngineIndicator(badgeText);
          
          playNativeStream(textToSpeak, (isEnglishVoice && currentLang !== 'en') ? 0 : chunk.startWord, defVoice, session);
        } else {
          currentChunkIdx++;
          if (currentChunkIdx < cloudChunks.length && isPlaying) {
            setTimeout(function() { playNextCloudChunk(session); }, 60);
          } else {
            onPlaybackFinished();
          }
        }
      };

      var p = currentAudioEl.play();
      if (p !== undefined) {
        p.catch(function (err) {
          if (session !== audioSessionId) return;
          console.warn('Audio play notice:', err);
        });
      }
    }

    // ── Word Ticker for Smooth Subtitle Tracking ──────────────────────────
    function startWordTickerForChunk(chunk) {
      if (wordTimer) clearInterval(wordTimer);
      var wordsInChunk = chunk.wordCount;
      var wpm = 145 * selectedRate;
      var totalSec = (wordsInChunk / wpm) * 60;
      var stepMs = Math.max(80, (totalSec * 1000) / Math.max(1, wordsInChunk));
      var tick = 0;

      wordTimer = setInterval(function () {
        if (!isPlaying || isPaused) return;
        tick++;
        if (tick < wordsInChunk) {
          updateHighlights(chunk.startWord + tick);
        }
      }, stepMs);
    }

    function resumeWordTicker() {
      if (currentEngine === 'native' && currentChunkIdx < speechChunks.length) {
        startWordTickerForChunk(speechChunks[currentChunkIdx]);
      } else if (currentEngine === 'cloud' && currentChunkIdx < cloudChunks.length) {
        startWordTickerForChunk(cloudChunks[currentChunkIdx]);
      }
    }

    function startKeepAlive() {
      if (keepAliveTimer) clearInterval(keepAliveTimer);
      keepAliveTimer = setInterval(function () {
        if (!isPlaying || isPaused || currentEngine !== 'native') return;
        if (synth && synth.speaking) {
          synth.pause();
          synth.resume();
        }
      }, 10000);
    }

    // ── Interactive Themed HUD Toggle ─────────────────────────────────────
    function toggleHud() {
      showHud = !showHud;
      if (hudToggleBtn) {
        hudToggleBtn.classList.toggle('active', showHud);
        hudToggleBtn.innerHTML = showHud 
          ? '<i class="fa-solid fa-closed-captioning"></i> HUD: ON' 
          : '<i class="fa-solid fa-closed-captioning"></i> HUD: OFF';
      }
      if (hud) {
        hud.style.display = showHud ? 'block' : 'none';
        if (showHud) {
          updateHighlights(activeWordIndex);
        }
      }
    }

    // ── Open / Close Right-Side Dock Panel ────────────────────────────────
    function openPanel() {
      if (panel) panel.classList.add('open');
      renderScript(currentLang);
      updateEngineIndicator();
    }

    function closePanel() {
      if (panel) panel.classList.remove('open');
    }

    // ── Event Bindings ────────────────────────────────────────────────────
    if (playBtn) {
      playBtn.addEventListener('click', function() {
        // Unlock audio elements and speech synthesis on user interaction
        if (!currentAudioEl) {
          currentAudioEl = document.createElement('audio');
          currentAudioEl.id = 'vg-cloud-audio-element';
          currentAudioEl.setAttribute('referrerpolicy', 'no-referrer');
          currentAudioEl.style.display = 'none';
          document.body.appendChild(currentAudioEl);
        }
        if (synth && synth.paused) {
          try { synth.resume(); } catch (e) {}
        }
        playGuide();
      });
    }

    if (stopBtn) stopBtn.addEventListener('click', function() { stopGuide(); });

    if (mainTrigger) {
      mainTrigger.addEventListener('click', function() {
        if (panel && panel.classList.contains('open')) closePanel();
        else openPanel();
      });
    }

    if (navTrigger) {
      navTrigger.addEventListener('click', function() {
        if (panel && panel.classList.contains('open')) closePanel();
        else openPanel();
      });
    }

    if (closeBtn) closeBtn.addEventListener('click', closePanel);

    if (hudToggleBtn) hudToggleBtn.addEventListener('click', toggleHud);
    if (hudCloseBtn) hudCloseBtn.addEventListener('click', function() {
      showHud = false;
      if (hudToggleBtn) {
        hudToggleBtn.classList.remove('active');
        hudToggleBtn.innerHTML = '<i class="fa-solid fa-closed-captioning"></i> HUD: OFF';
      }
      if (hud) hud.style.display = 'none';
    });

    // Rate button handling: IMMEDIATE audible change
    document.querySelectorAll('.vg-rate-btn').forEach(function (btn) {
      btn.addEventListener('click', function () {
        document.querySelectorAll('.vg-rate-btn').forEach(function (b) { b.classList.remove('active'); });
        btn.classList.add('active');
        selectedRate = parseFloat(btn.dataset.rate) || 1.0;
        updateEngineIndicator();

        if (currentEngine === 'cloud' && currentAudioEl) {
          currentAudioEl.playbackRate = selectedRate;
        } else if (currentEngine === 'native' && isPlaying && !isPaused) {
          startPlayback(activeWordIndex);
        }
      });
    });

    // Click on words in script box to jump playback
    if (scriptBox) {
      scriptBox.addEventListener('click', function (e) {
        var wordEl = e.target.closest('.vg-word');
        if (!wordEl) return;
        var idx = parseInt(wordEl.dataset.idx, 10);
        if (!isNaN(idx)) {
          updateHighlights(idx);
          if (isPlaying) {
            startPlayback(idx);
          }
        }
      });
    }

    // Initialization
    function init() {
      currentLang = detectLanguage();
      buildLangPills();
      renderScript(currentLang);

      function onVoicesLoaded() {
        updateEngineIndicator();
      }
      if (synth) {
        if (synth.getVoices().length > 0) onVoicesLoaded();
        else if ('addEventListener' in synth) {
          synth.addEventListener('voiceschanged', onVoicesLoaded);
        } else {
          synth.onvoiceschanged = onVoicesLoaded;
        }
      } else {
        updateEngineIndicator();
      }
    }

    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', init);
    } else {
      init();
    }



  })();
  