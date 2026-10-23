import json
import re
import sys, os
sys.stdout.reconfigure(encoding='utf-8')

# Load scripts
with open('scratch/monument_scripts_data.json', 'r', encoding='utf-8') as f:
    monument_scripts = json.load(f)

# Load styles
with open('scratch/lepakshi_vg_styles.html', 'r', encoding='utf-8') as f:
    vg_styles = f.read().strip()

# Load suffix
with open('scratch/vg_engine_suffix.txt', 'r', encoding='utf-8') as f:
    engine_suffix = f.read().strip()

# Target file
target = 'taj_mahal_3d.html'
with open(target, 'r', encoding='utf-8', errors='ignore') as f:
    content = f.read()

monument_key = 'taj_mahal'
mdata = monument_scripts[monument_key]
title = mdata.get('title', 'Taj Mahal')

# 15 languages
langs = ['en', 'hi', 'ta', 'te', 'bn', 'mr', 'gu', 'kn', 'ml', 'pa', 'fr', 'es', 'de', 'ja', 'zh']
scripts_dict = {}
for l in langs:
    if l in mdata:
        scripts_dict[l] = mdata[l]
    else:
        scripts_dict[l] = mdata.get('en', '')

json_scripts = json.dumps(scripts_dict, ensure_ascii=False)

# Build body snippet
body_snippet = f'''
  <!-- ══ VOICE GUIDE TRIGGER (ICON-ONLY MICROPHONE, SAME POSITION) ══ -->
  <button id="btn-voice-guide" class="voice-guide-fab" title="Heritage Voice Guide" aria-label="Heritage Voice Guide">
    <i class="fa-solid fa-microphone-lines"></i>
  </button>

  <!-- ══ MULTILINGUAL VOICE GUIDE (DOCKED RIGHT-SIDE MIDDLE POSITION) ══ -->
  <div id="voice-guide-panel" class="vg-panel" role="dialog" aria-label="Heritage Voice Guide">
    <div class="vg-panel-inner">
      <div class="vg-header">
        <div class="vg-header-left">
          <div class="vg-icon-badge">🎧</div>
          <div class="vg-title-group">
            <h3>{title} · Audio Guide</h3>
            <p>500+ Word Scholarly Narrative &amp; Subtitle Tracker</p>
          </div>
        </div>
        <div class="vg-header-right">
          <button type="button" class="vg-hud-toggle-btn active" id="vg-hud-toggle" title="Toggle Live Subtitle HUD">
            <i class="fa-solid fa-closed-captioning"></i> HUD: ON
          </button>
          <button type="button" class="vg-close-btn" id="vg-close" aria-label="Close Voice Guide">✕</button>
        </div>
      </div>

      <!-- Language selector pills -->
      <div class="vg-lang-row" id="vg-lang-row"></div>

      <!-- Script Box with Subtitle Tracker -->
      <div class="vg-script-box" id="vg-script-box" aria-live="polite"></div>

      <!-- Audio Controls -->
      <div class="vg-controls">
        <button class="vg-btn vg-play" id="vg-play">
          <span id="vg-play-icon">▶</span>
          <span id="vg-play-label">Play Audio Guide</span>
        </button>
        <button class="vg-btn vg-stop" id="vg-stop" disabled>
          <span>⏹ Stop</span>
        </button>
      </div>

      <!-- Progress Bar -->
      <div class="vg-progress-wrap">
        <div class="vg-progress-bar" id="vg-progress-bar"></div>
      </div>

      <!-- Speed Timeline -->
      <div class="vg-bottom-row">
        <div class="vg-rate-row">
          <span>Speed:</span>
          <button class="vg-rate-btn" data-rate="0.75">0.75x</button>
          <button class="vg-rate-btn active" data-rate="1.0">1.0x</button>
          <button class="vg-rate-btn" data-rate="1.25">1.25x</button>
          <button class="vg-rate-btn" data-rate="1.5">1.5x</button>
          <button class="vg-rate-btn" data-rate="1.75">1.75x</button>
        </div>
        <div class="vg-voice-info" id="vg-voice-info">🔊 Voice Ready</div>
      </div>
    </div>
  </div>

  <!-- ══ THEMED FLOATING CINEMA SUBTITLE HUD ON 3D VIEWPORT ══ -->
  <div id="vg-subtitle-hud" class="vg-subtitle-hud" style="display:none;" aria-live="polite">
    <div class="vg-hud-header">
      <div class="vg-hud-badge">
        <span class="vg-hud-dot"></span>
        <span id="vg-hud-lang-label">ENGLISH</span>
      </div>
      <div class="vg-hud-title">{title} · Synchronized Subtitles</div>
      <button type="button" class="vg-hud-close" id="vg-hud-close" title="Hide Subtitles">✕</button>
    </div>
    <div class="vg-hud-content" id="vg-hud-content">
      Click Play to start the voice guide narration with live synchronized subtitles.
    </div>
  </div>

  <script id="vg-engine-script">
  (function () {{
    "use strict";

    var SITE_NAME = "{title}";
    var SUPPORTED_LANGS = [
      {{ key: 'en', code: 'en-IN', fallback: 'en-US', label: 'English', flag: '🇬🇧' }},
      {{ key: 'hi', code: 'hi-IN', fallback: 'hi', label: 'हिन्दी', flag: '🇮🇳' }},
      {{ key: 'ta', code: 'ta-IN', fallback: 'ta', label: 'தமிழ்', flag: '🇮🇳' }},
      {{ key: 'te', code: 'te-IN', fallback: 'te', label: 'తెలుగు', flag: '🇮🇳' }},
      {{ key: 'bn', code: 'bn-IN', fallback: 'bn', label: 'বাংলা', flag: '🇮🇳' }},
      {{ key: 'mr', code: 'mr-IN', fallback: 'mr', label: 'मराठी', flag: '🇮🇳' }},
      {{ key: 'gu', code: 'gu-IN', fallback: 'gu', label: 'ગુજરાતી', flag: '🇮🇳' }},
      {{ key: 'kn', code: 'kn-IN', fallback: 'kn', label: 'ಕನ್ನಡ', flag: '🇮🇳' }},
      {{ key: 'ml', code: 'ml-IN', fallback: 'ml', label: 'മലയാളം', flag: '🇮🇳' }},
      {{ key: 'pa', code: 'pa-IN', fallback: 'pa', label: 'ਪੰਜਾਬੀ', flag: '🇮🇳' }},
      {{ key: 'fr', code: 'fr-FR', fallback: 'fr', label: 'Français', flag: '🇫🇷' }},
      {{ key: 'es', code: 'es-ES', fallback: 'es', label: 'Español', flag: '🇪🇸' }},
      {{ key: 'de', code: 'de-DE', fallback: 'de', label: 'Deutsch', flag: '🇩🇪' }},
      {{ key: 'ja', code: 'ja-JP', fallback: 'ja', label: '日本語', flag: '🇯🇵' }},
      {{ key: 'zh', code: 'zh-CN', fallback: 'zh', label: '中文', flag: '🇨🇳' }}
    ];

    var VG_SCRIPTS = {json_scripts};

    {engine_suffix}
  }})();
  </script>
'''

# 1. Ensure meta referrer
if 'name="referrer"' not in content and "name='referrer'" not in content:
    content = content.replace('<head>', '<head>\n  <meta name="referrer" content="no-referrer">', 1)

# 2. Inject styles before </head>
if 'id="vg-master-styles"' not in content:
    content = content.replace('</head>', f'{vg_styles}\n</head>', 1)

# 3. Inject nav button into nav-right if not present
nav_btn = '<button type="button" class="badge-btn" id="btn-nav-voice-guide" title="Heritage Voice Guide" style="background: rgba(223, 167, 83, 0.2); border: 1px solid rgba(223, 167, 83, 0.4); color: #dfa753;"><i class="fa-solid fa-microphone-lines"></i> <span>VOICE GUIDE</span></button>'
if 'id="btn-nav-voice-guide"' not in content:
    if '<div class="nav-right">' in content:
        content = content.replace('<div class="nav-right">', f'<div class="nav-right">\n        {nav_btn}', 1)

# 4. Update index.html return links
content = re.sub(r'href=["\']index\.html["\']', 'href="index.html?guest=true"', content)

# 5. Inject body snippet before </body>
if 'id="voice-guide-panel"' not in content:
    content = content.replace('</body>', f'{body_snippet}\n</body>', 1)

with open(target, 'w', encoding='utf-8') as f:
    f.write(content)

print(f"Successfully injected voice guide into {target}!")
