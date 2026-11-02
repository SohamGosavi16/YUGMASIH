const fs = require('fs');

let index = fs.readFileSync('index.html', 'utf8');

// 1. Add voiceGuideAccess.css and voiceGuideAccess.js in <head>
if (!index.includes('voiceGuideAccess.css')) {
  const target = '<script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>';
  const replacement = target + '\n  <link rel="stylesheet" href="css/voiceGuideAccess.css">\n  <script src="js/voiceGuideAccess.js"></script>';
  if (index.includes(target)) {
    index = index.replace(target, replacement);
    console.log('[OK] Added voiceGuideAccess.css and js to <head>');
  } else {
    console.error('[FAIL] Could not find Supabase script tag in <head>');
  }
}

// 2. Insert 15-Language Voice Guide card inside #arvr-modal before #arvr-multi-models
if (!index.includes('id="arvr-vg-card"')) {
  const vgCardHtml = `        <!-- ══ 15-LANGUAGE HERITAGE VOICE GUIDE CARD ══ -->
        <div class="modal-voice-guide-card" id="arvr-vg-card" style="margin: 18px 0; padding: 16px; background: linear-gradient(135deg, rgba(16, 22, 38, 0.98), rgba(9, 13, 24, 0.98)); border: 1.5px solid rgba(245, 158, 11, 0.5); border-radius: 14px; box-shadow: 0 10px 28px rgba(0,0,0,0.6), 0 0 20px rgba(245, 158, 11, 0.15);">
          <div style="display:flex; align-items:center; justify-content:space-between; margin-bottom: 12px; flex-wrap: wrap; gap: 10px;">
            <div style="display:flex; align-items:center; gap: 10px;">
              <span style="font-size: 1.4rem; display:inline-flex; align-items:center; justify-content:center; width:36px; height:36px; background:rgba(245,158,11,0.18); border-radius:50%; border:1px solid rgba(245,158,11,0.4);">🎙️</span>
              <div>
                <div style="display:flex; align-items:center; gap:8px; flex-wrap:wrap;">
                  <span style="font-size: 0.88rem; font-weight: 800; color: #ffd56b; letter-spacing: 0.06em; text-transform: uppercase;">15-Language Voice Guide</span>
                  <span id="arvr-vg-badge" data-vg-badge></span>
                </div>
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
        </div>`;
  const target = '<div id="arvr-multi-models" style="display:none; margin: 15px 0;"></div>';
  if (index.includes(target)) {
    index = index.replace(target, vgCardHtml + '\n\n        ' + target);
    console.log('[OK] Inserted arvr-vg-card into #arvr-modal');
  } else {
    console.error('[FAIL] Could not find #arvr-multi-models in index.html');
  }
}

fs.writeFileSync('index.html', index, 'utf8');
console.log('[OK] index.html updated successfully with HTML markup');

