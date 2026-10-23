
  (function () {
    "use strict";

    var SITE_NAME = "Taj Mahal";
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

    var VG_SCRIPTS = {"en": "Welcome to the Taj Mahal, a UNESCO World Heritage marvel and one of the Seven Wonders of the World, standing gracefully on the southern banks of the Yamuna River in Agra, Uttar Pradesh. Commissioned in 1632 by the fifth Mughal Emperor Shah Jahan as the eternal resting place for his beloved Empress Mumtaz Mahal, this monumental mausoleum represents the supreme zenith of Mughal art and Indo-Islamic architecture. Built entirely of lustrous white Makrana marble quarried from Rajasthan, the central octagonal tomb rises upon a square sandstone plinth, flanked by four 40-meter minarets that were ingeniously tilted outward by a fraction of a degree to protect the main dome in the event of an earthquake. The monument is globally renowned for its flawless bilateral symmetry, culminating in the monumental central onion dome and finial, encircled by four smaller chhatris. Its facade is adorned with sublime Quranic calligraphy carved in black marble and exquisite Pietra Dura pietra inlays utilizing over 28 varieties of precious and semi-precious gemstones from across Asia, including lapis lazuli, jade, turquoise, and carnelian. Within the Charbagh paradise garden, the reflecting pool mirrors the monument at dawn and moonlight. Explore this digital twin to inspect every archway, minaret, and sacred marble panel in 360 degrees.", "hi": "ताज महल में आपका स्वागत है, जो यूनेस्को की विश्व धरोहर और दुनिया के सात आश्चर्यों में से एक है। यह उत्तर प्रदेश के आगरा में पवित्र यमुना नदी के तट पर स्थित है। 1632 ईस्वी में पांचवें मुगल सम्राट शाहजहाँ द्वारा अपनी बेगम मुमताज़ महल की याद में बनवाया गया यह स्मारक मुग़ल वास्तुकला का सर्वोत्कृष्ट शिखर है। राजस्थान के मकराना से लाए गए सफेद संगमरमर से निर्मित, यह मक़बरा पूर्ण सममिति और उत्कृष्ट ज्यामिति का प्रतीक है। इसके चारों कोनों पर 40 मीटर ऊंची मीनारें स्थित हैं, जिन्हें भूकंप के समय मुख्य गुंबद की सुरक्षा के लिए थोड़ा बाहर की ओर झुकाकर बनाया गया था। इसकी दीवारों पर 28 से अधिक प्रकार के बहुमूल्य रत्नों की पच्चीकारी (पिएट्रा ड्यूरा) की गई है, जिसमें लापिस लाजुली, जेड और फ़िरोज़ा शामिल हैं। चारबाग शैली के सुंदर उद्यान और जलकुंड में इसका प्रतिबिंब अद्भुत प्रतीत होता है। 360 डिग्री में ताज महल के संगमरमरी वैभव का अन्वेषण करें।", "ta": "தாஜ் மஹாலை வரவேற்கிறோம். இது உலக பாரம்பரிய தளமாகவும் உலகின் ஏழு அதிசயங்களில் ஒன்றாகவும் திகழ்கிறது. 1632 ஆம் ஆண்டு முகலாய பேரரசர் ஷாஜஹான் தனது மனைவி மும்தாஜ் மஹாலின் நினைவாக இந்த வெள்ளை பளிங்கு கல்லறையை கட்டினார். பரிபூரண சமச்சீர் வடிவமைப்பு மற்றும் விலைமதிப்பற்ற நவரத்தினக் கற்கள் பதிக்கப்பட்ட இந்த அற்புதத்தை 360 டிகிரியில் ஆராயுங்கள்.", "te": "తాజ్ మహల్ కి స్వాగతం. ఇది ప్రపంచ వింతలలో ఒకటి మరియు యునెస్కో ప్రపంచ వారసత్వ ప్రదేశం. ఆగ్రాలోని యమునా నది ఒడ్డున ముఘల్ చక్రవర్తి షాజహాన్ ముంతాజ్ మహల్ జ్ఞాపకార్థం తెల్లని మక్రానా పాలరాతితో 1632 లో నిర్మించారు. అద్భుతమైన సమరూపత మరియు విలువైన రత్నాల అలంకరణతో కూడిన ఈ కట్టడాన్ని 3D లో వీక్షించండి.", "bn": "তাজমহলে আপনাকে স্বাগতম, যা ইউনেস্কো বিশ্ব ঐতিহ্য এবং পৃথিবীর সপ্তম আশ্চর্যের অন্যতম। আগ্রার যমুনা নদীর তীরে মুঘল সম্রাট শাহজাহান তাঁর প্রিয়তমা পত্নী মমতাজ মহলের স্মরণে ১৬৩২ সালে এই শুভ্র শ্বেতপাথরের সৌধ নির্মাণ করেন। চারবাগ উদ্যান, নিখুঁত প্রতিসাম্য এবং মূল্যবান পাথরের খোদাই করা এই অপূর্ব স্মৃতিসৌধটি ৩৬০ ডিগ্রিতে অন্বেষণ করুন।", "mr": "ताजमहालमध्ये आपले स्वागत आहे, जी युनेस्कोची जागतिक वारसा वास्तू आणि जगातील सात आश्चर्यांपैकी एक आहे. आग्रा येथे यमुना नदीच्या तीरावर स्थित ही संगमरवरी वास्तू मुघल सम्राट शाहजहानने मुमताज महलच्या स्मरणार्थ १६३२ मध्ये बांधली. चारबाग बागेत उभारलेली ही वास्तू परिपूर्ण सममिती आणि पिएट्रा ड्युरा रत्नजडित नक्षीकामासाठी जगप्रसिद्ध आहे.", "gu": "તાજમહેલમાં આપનું સ્વાગત છે, જે યુનેસ્કો વર્લ્ડ હેરિટેજ અને વિશ્વની અજાયબીઓમાંનું એક છે. મુઘલ સમ્રાટ શાહજહાં દ્વારા મુમતાઝ મહેલની યાદમાં આરસપહાણમાંથી ૧૬૩૨માં આ ભવ્ય સ્મારકનું નિર્માણ કરવામાં આવ્યું હતું. ઉત્કૃષ્ટ સપ્રમાણતા અને કલાત્મક પચ્ચીકારી ધરાવતા આ સ્મારકનો ૩૬૦ ડિગ્રીમાં અનુભવ કરો.", "kn": "ತಾಜ್ ಮಹಲ್‌ಗೆ ಸುಸ್ವಾಗತ. ಇದು ವಿಶ್ವ ಪರಂಪರೆ ತಾಣ ಮತ್ತು ವಿಶ್ವದ ಏಳು ಅದ್ಭುತಗಳಲ್ಲಿ ಒಂದಾಗಿದೆ. ಆಗ್ರಾದ ಯಮುನಾ ನದಿ ದಂಡೆಯ ಮೇಲೆ ಮೊಘಲ್ ಚಕ್ರವರ್ತಿ ಷಹಜಹಾನ್ ಮುಮ್ತಾಜ್ ಮಹಲ್ ಸ್ಮರಣಾರ್ಥ ಬಿಳಿ ಅಮೃತಶಿಲೆಯಿಂದ ನಿರ್ಮಿಸಿದ ಈ ಅದ್ಭುತ ವಾಸ್ತುಶಿಲ್ಪವನ್ನು 360 ಡಿಗ್ರಿಯಲ್ಲಿ ಕಣ್ತುಂಬಿಕೊಳ್ಳಿ.", "ml": "താജ് മഹലിലേക്ക് സ്വാഗതം. യുനെസ്കോ ലോക പൈതൃക കേന്ദ്രവും ലോകത്തിലെ ഏഴ് അത്ഭുതങ്ങളിൽ ഒന്നുമായ ഈ വെണ്ണക്കൽ സ്മാരകം ഷാജഹാൻ ചക്രവർത്തി മുംതാസ് മഹലിന്റെ ഓർമ്മയ്ക്കായി പണികഴിപ്പിച്ചതാണ്. മനോഹരമായ വാസ്തുവിദ്യയും സംതുലിതാവസ്ഥയും തുളുമ്പുന്ന ഈ സ്മാരകം 360 ഡിഗ്രിയിൽ അനുഭവിച്ചറിയൂ.", "pa": "ਤਾਜ ਮਹਿਲ ਵਿੱਚ ਤੁਹਾਡਾ ਸੁਆਗਤ ਹੈ, ਜੋ ਯੂਨੈਸਕੋ ਦੀ ਵਿਸ਼ਵ ਵਿਰਾਸਤ ਅਤੇ ਦੁਨੀਆ ਦੇ ਸੱਤ ਅਜੂਬਿਆਂ ਵਿੱਚੋਂ ਇੱਕ ਹੈ। ਆਗਰਾ ਵਿੱਚ ਯਮੁਨਾ ਕੰਢੇ ਮੁਗ਼ਲ ਬਾਦਸ਼ਾਹ ਸ਼ਾਹਜਹਾਂ ਵੱਲੋਂ ਮੁਮਤਾਜ਼ ਮਹਿਲ ਦੀ ਯਾਦ ਵਿੱਚ ਬਣਾਇਆ ਗਿਆ ਇਹ ਚਿੱਟੇ ਸੰਗਮਰਮਰ ਦਾ ਮਕਬਰਾ ਆਪਣੀ ਸੰਪੂਰਨ ਖੂਬਸੂਰਤੀ ਲਈ ਵਿਸ਼ਵ ਪ੍ਰਸਿੱਧ ਹੈ।", "fr": "Bienvenue au Taj Mahal, chef-d'œuvre du patrimoine mondial de l'UNESCO et merveille du monde érigée sur les rives de la Yamuna à Agra. Commandé en 1632 par l'empereur moghol Shah Jahan en hommage à son épouse Mumtaz Mahal, ce mausolée en marbre blanc de Makrana incarne la perfection de la symétrie moghole et la beauté des incrustations de pierres semi-précieuses en Pietra Dura.", "es": "Bienvenidos al Taj Mahal, joya del patrimonio mundial de la UNESCO y maravilla del mundo situada junto al río Yamuna en Agra. Erigido en 1632 por el emperador mogol Shah Jahan para su amada Mumtaz Mahal, este mausoleo de mármol blanco deslumbra por su simetría geométrica perfecta y sus exquisitas incrustaciones de piedras semipreciosas.", "de": "Willkommen im Taj Mahal, UNESCO-Weltkulturerbe und eines der sieben Weltwunder am Ufer der Yamuna in Agra. 1632 von Mogulkaiser Shah Jahan für seine Gemahlin Mumtaz Mahal erbaut, besticht dieses Meisterwerk aus weißem Makrana-Marmor durch absolute Symmetrie, kunstvolle Pietra-Dura-Einlegearbeiten und seine vier elegant geneigten Minarette.", "ja": "アグラのヤムナー川のほとりに佇む世界遺産、タージ・マハルへようこそ。1632年にムガル帝国第5代皇帝シャー・ジャハーンが愛妃ムムターズ・マハルのために白大理石で建設したこの霊廟は、完璧な左右対称性と壮麗なピエトラ・ドゥーラ象嵌細工で知られています。360度の3Dモデルでその美しさをご堪能ください。", "zh": "欢迎来到泰姬陵，联合国教科文组织世界文化遗产与世界新七大奇迹之一。这座宏伟的白色大理石陵墓坐落在阿格拉亚穆纳河畔，由莫卧儿皇帝沙贾汗于1632年为纪念挚爱爱妃穆姆塔兹·玛哈尔而建。以其完美的轴对称布局、巨大的中央穹顶和精致的宝石镶嵌工艺闻名于世。请在360度全景中探索这件人类建筑艺术的巅峰之作。"};

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
  