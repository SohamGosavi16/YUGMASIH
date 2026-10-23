import os
import re

card_bar_add = """      <div class="model-card" data-id="rajgad_fort" data-region="West">
        <img src="https://media.sketchfab.com/models/ae06291e8d79463b950c0f71d28ad90f/thumbnails/bfbc59c0a7674cb8bd03a1b95736639a/4898be59901f4985abf93108f81c2703.jpeg" alt="Rajgad Fort" class="card-thumb">
        <div class="card-meta">
          <span class="card-state">Maharashtra</span>
          <span class="card-title">Rajgad Fort</span>
          <span class="card-creator">17th Century CE</span>
        </div>
      </div>
      <div class="model-card" data-id="red_fort" data-region="North">
        <img src="https://media.sketchfab.com/models/f8128f84fe3d4439b2d77acda6d90207/thumbnails/4b565d7b0b74400f9ff52fbcec9f3db8/dfdd29871dc04b2faf48dc71fec0ed65.jpeg" alt="Red Fort (Lal Qila)" class="card-thumb">
        <div class="card-meta">
          <span class="card-state">Delhi</span>
          <span class="card-title">Red Fort (Lal Qila)</span>
          <span class="card-creator">1638–1648 CE</span>
        </div>
      </div>
      <div class="model-card" data-id="qutub_minar" data-region="North">
        <img src="https://media.sketchfab.com/models/cf4f8f1bcdbd4cb49056c688f8739e77/thumbnails/c4cd636b1fab4686b3f683b4d7ad99aa/c6a7665c35dc48dfbf42fc630539614a.jpeg" alt="Qutub Minar" class="card-thumb">
        <div class="card-meta">
          <span class="card-state">Delhi</span>
          <span class="card-title">Qutub Minar</span>
          <span class="card-creator">1199–1220 CE</span>
        </div>
      </div>
      <div class="model-card" data-id="humayuns_tomb" data-region="North">
        <img src="https://media.sketchfab.com/models/4315d7041d75471ba98902174a11b33d/thumbnails/4edbfa84bc9245e283c45258b72c1345/0e9a5784573848ce86cea145a754ee20.jpeg" alt="Humayun's Tomb" class="card-thumb">
        <div class="card-meta">
          <span class="card-state">Delhi</span>
          <span class="card-title">Humayun's Tomb</span>
          <span class="card-creator">1565–1572 CE</span>
        </div>
      </div>"""

grid_cards_add = """      <div class="grid-card">
        <img src="https://media.sketchfab.com/models/ae06291e8d79463b950c0f71d28ad90f/thumbnails/bfbc59c0a7674cb8bd03a1b95736639a/4898be59901f4985abf93108f81c2703.jpeg" alt="Rajgad Fort" class="grid-card-img">
        <div class="grid-card-body">
          <span class="grid-card-tag">West India · Maharashtra</span>
          <h3 class="grid-card-title">Rajgad Fort</h3>
          <p class="grid-card-desc">Known as the 'King of Forts', Rajgad served as the sovereign capital of the Maratha Empire under Chhatrapati Shivaji Maharaj for over 26 years. Perched atop the Sahyadris at 4,514 ft, featuring invincible machis (Sujvela, Padmavati, Sanjeevani) and the fortified central Bale Killa citadel.</p>
          <div style="margin-bottom:12px; font-size:11px; color:#cbd5e1; display:flex; flex-direction:column; gap:4px; border-top:1px solid rgba(223,167,83,0.15); padding-top:8px;">
            <div><span style="color:#94a3b8; font-size:9px; text-transform:uppercase; font-weight:600;">Built For:</span> <strong style="color:#ffd56b;">Chhatrapati Shivaji Maharaj & The Maratha Empire</strong></div>
            <div><span style="color:#94a3b8; font-size:9px; text-transform:uppercase; font-weight:600;">Picked From:</span> <strong style="color:#ffd56b;">Pune District, Maharashtra (Sahyadri Western Ghats)</strong></div>
          </div>
          <div style="display:flex; gap:8px;">
            <button class="grid-card-btn select-monument-btn" data-id="rajgad_fort" style="flex:1; cursor:pointer; border:none;">
              <i class="fa-solid fa-eye"></i> View on Stage
            </button>
            <a href="rajgadfort-vr.html" class="grid-card-btn" style="background:rgba(255,255,255,0.08); color:#ffd56b; border:1px solid rgba(223,167,83,0.3);">
              <i class="fa-solid fa-arrow-up-right-from-square"></i>
            </a>
          </div>
        </div>
      </div>
      <div class="grid-card">
        <img src="https://media.sketchfab.com/models/f8128f84fe3d4439b2d77acda6d90207/thumbnails/4b565d7b0b74400f9ff52fbcec9f3db8/dfdd29871dc04b2faf48dc71fec0ed65.jpeg" alt="Red Fort (Lal Qila)" class="grid-card-img">
        <div class="grid-card-body">
          <span class="grid-card-tag">North India · Delhi</span>
          <h3 class="grid-card-title">Red Fort (Lal Qila)</h3>
          <p class="grid-card-desc">Constructed in massive red sandstone by Emperor Shah Jahan when he shifted the Mughal capital from Agra to Shahjahanabad. Enclosing the Diwan-i-Aam, Diwan-i-Khas, and Lahori Gate, it stands today as the supreme symbol of Indian national independence.</p>
          <div style="margin-bottom:12px; font-size:11px; color:#cbd5e1; display:flex; flex-direction:column; gap:4px; border-top:1px solid rgba(223,167,83,0.15); padding-top:8px;">
            <div><span style="color:#94a3b8; font-size:9px; text-transform:uppercase; font-weight:600;">Built For:</span> <strong style="color:#ffd56b;">Mughal Emperor Shah Jahan & Architect Ustad Ahmad Lahori</strong></div>
            <div><span style="color:#94a3b8; font-size:9px; text-transform:uppercase; font-weight:600;">Picked From:</span> <strong style="color:#ffd56b;">Old Delhi (Shahjahanabad), Delhi (Yamuna Riverfront)</strong></div>
          </div>
          <div style="display:flex; gap:8px;">
            <button class="grid-card-btn select-monument-btn" data-id="red_fort" style="flex:1; cursor:pointer; border:none;">
              <i class="fa-solid fa-eye"></i> View on Stage
            </button>
            <a href="redfort-vr.html" class="grid-card-btn" style="background:rgba(255,255,255,0.08); color:#ffd56b; border:1px solid rgba(223,167,83,0.3);">
              <i class="fa-solid fa-arrow-up-right-from-square"></i>
            </a>
          </div>
        </div>
      </div>
      <div class="grid-card">
        <img src="https://media.sketchfab.com/models/cf4f8f1bcdbd4cb49056c688f8739e77/thumbnails/c4cd636b1fab4686b3f683b4d7ad99aa/c6a7665c35dc48dfbf42fc630539614a.jpeg" alt="Qutub Minar" class="grid-card-img">
        <div class="grid-card-body">
          <span class="grid-card-tag">North India · Delhi</span>
          <h3 class="grid-card-title">Qutub Minar</h3>
          <p class="grid-card-desc">Standing 72.5 meters tall, this five-storey fluted red sandstone and marble minaret is the tallest brick minaret in the world. Founded by Qutb-ud-din Aibak with project balconies supported by intricate muqarnas corbels and Calligraphic Quranic inscriptions.</p>
          <div style="margin-bottom:12px; font-size:11px; color:#cbd5e1; display:flex; flex-direction:column; gap:4px; border-top:1px solid rgba(223,167,83,0.15); padding-top:8px;">
            <div><span style="color:#94a3b8; font-size:9px; text-transform:uppercase; font-weight:600;">Built For:</span> <strong style="color:#ffd56b;">Qutb-ud-din Aibak & Shams-ud-din Iltutmish</strong></div>
            <div><span style="color:#94a3b8; font-size:9px; text-transform:uppercase; font-weight:600;">Picked From:</span> <strong style="color:#ffd56b;">Mehrauli, New Delhi (Qutb Complex)</strong></div>
          </div>
          <div style="display:flex; gap:8px;">
            <button class="grid-card-btn select-monument-btn" data-id="qutub_minar" style="flex:1; cursor:pointer; border:none;">
              <i class="fa-solid fa-eye"></i> View on Stage
            </button>
            <a href="qutubminar-vr.html" class="grid-card-btn" style="background:rgba(255,255,255,0.08); color:#ffd56b; border:1px solid rgba(223,167,83,0.3);">
              <i class="fa-solid fa-arrow-up-right-from-square"></i>
            </a>
          </div>
        </div>
      </div>
      <div class="grid-card">
        <img src="https://media.sketchfab.com/models/4315d7041d75471ba98902174a11b33d/thumbnails/4edbfa84bc9245e283c45258b72c1345/0e9a5784573848ce86cea145a754ee20.jpeg" alt="Humayun's Tomb" class="grid-card-img">
        <div class="grid-card-body">
          <span class="grid-card-tag">North India · Delhi</span>
          <h3 class="grid-card-title">Humayun's Tomb</h3>
          <p class="grid-card-desc">The earliest example of Mughal garden tomb architecture on the Indian subcontinent, commissioned by senior empress Bega Begum and designed by Persian architect Mirak Mirza Ghiyas. Its monumental Persian charbagh layout and white marble double dome served as the direct inspiration for the Taj Mahal.</p>
          <div style="margin-bottom:12px; font-size:11px; color:#cbd5e1; display:flex; flex-direction:column; gap:4px; border-top:1px solid rgba(223,167,83,0.15); padding-top:8px;">
            <div><span style="color:#94a3b8; font-size:9px; text-transform:uppercase; font-weight:600;">Built For:</span> <strong style="color:#ffd56b;">Mughal Emperor Humayun (Commissioned by Empress Bega Begum / Haji Begum)</strong></div>
            <div><span style="color:#94a3b8; font-size:9px; text-transform:uppercase; font-weight:600;">Picked From:</span> <strong style="color:#ffd56b;">Nizamuddin East, New Delhi (Yamuna Riverbank)</strong></div>
          </div>
          <div style="display:flex; gap:8px;">
            <button class="grid-card-btn select-monument-btn" data-id="humayuns_tomb" style="flex:1; cursor:pointer; border:none;">
              <i class="fa-solid fa-eye"></i> View on Stage
            </button>
            <a href="humayunstomb-vr.html" class="grid-card-btn" style="background:rgba(255,255,255,0.08); color:#ffd56b; border:1px solid rgba(223,167,83,0.3);">
              <i class="fa-solid fa-arrow-up-right-from-square"></i>
            </a>
          </div>
        </div>
      </div>"""

monuments_arr_add = """  {
    "id": "rajgad_fort",
    "title": "Rajgad Fort",
    "hindi": "\\u0930\\u093e\\u091c\\u0917\\u0921 \\u0915\\u093f\\u0932\\u094d\\u0932\\u093e",
    "state": "Maharashtra",
    "region": "West",
    "era": "17th Century CE",
    "uid": "ae06291e8d79463b950c0f71d28ad90f",
    "whom_made": "Chhatrapati Shivaji Maharaj & The Maratha Empire",
    "picked_from": "Pune District, Maharashtra (Sahyadri Western Ghats)",
    "file": "rajgadfort-vr.html",
    "thumb": "https://media.sketchfab.com/models/ae06291e8d79463b950c0f71d28ad90f/thumbnails/bfbc59c0a7674cb8bd03a1b95736639a/4898be59901f4985abf93108f81c2703.jpeg",
    "badge": "King of Forts · Capital of Hindavi Swarajya",
    "desc": "Known as the 'King of Forts', Rajgad served as the sovereign capital of the Maratha Empire under Chhatrapati Shivaji Maharaj for over 26 years. Perched atop the Sahyadris at 4,514 ft, featuring invincible machis (Sujvela, Padmavati, Sanjeevani) and the fortified central Bale Killa citadel.",
    "type": "sketchfab",
    "drone_freqs": [
      116.54,
      174.61,
      233.08,
      349.23
    ]
  },
  {
    "id": "red_fort",
    "title": "Red Fort (Lal Qila)",
    "hindi": "\\u0932\\u093e\\u0932 \\u0958\\u093f\\u0932\\u093e",
    "state": "Delhi",
    "region": "North",
    "era": "1638–1648 CE",
    "uid": "f8128f84fe3d4439b2d77acda6d90207",
    "whom_made": "Mughal Emperor Shah Jahan & Architect Ustad Ahmad Lahori",
    "picked_from": "Old Delhi (Shahjahanabad), Delhi (Yamuna Riverfront)",
    "file": "redfort-vr.html",
    "thumb": "https://media.sketchfab.com/models/f8128f84fe3d4439b2d77acda6d90207/thumbnails/4b565d7b0b74400f9ff52fbcec9f3db8/dfdd29871dc04b2faf48dc71fec0ed65.jpeg",
    "badge": "UNESCO World Heritage · Sovereign Citadel",
    "desc": "Constructed in massive red sandstone by Emperor Shah Jahan when he shifted the Mughal capital from Agra to Shahjahanabad. Enclosing the Diwan-i-Aam, Diwan-i-Khas, and Lahori Gate, it stands today as the supreme symbol of Indian national independence.",
    "type": "sketchfab",
    "drone_freqs": [
      138.59,
      207.65,
      277.18,
      415.3
    ]
  },
  {
    "id": "qutub_minar",
    "title": "Qutub Minar",
    "hindi": "\\u0958\\u0941\\u0924\\u0941\\u092c \\u092e\\u0940\\u0928\\u093e\\u0930",
    "state": "Delhi",
    "region": "North",
    "era": "1199–1220 CE",
    "uid": "cf4f8f1bcdbd4cb49056c688f8739e77",
    "whom_made": "Qutb-ud-din Aibak & Shams-ud-din Iltutmish",
    "picked_from": "Mehrauli, New Delhi (Qutb Complex)",
    "file": "qutubminar-vr.html",
    "thumb": "https://media.sketchfab.com/models/cf4f8f1bcdbd4cb49056c688f8739e77/thumbnails/c4cd636b1fab4686b3f683b4d7ad99aa/c6a7665c35dc48dfbf42fc630539614a.jpeg",
    "badge": "UNESCO 72.5m Fluted Brick Minaret",
    "desc": "Standing 72.5 meters tall, this five-storey fluted red sandstone and marble minaret is the tallest brick minaret in the world. Founded by Qutb-ud-din Aibak with project balconies supported by intricate muqarnas corbels and Calligraphic Quranic inscriptions.",
    "type": "sketchfab",
    "drone_freqs": [
      146.83,
      220.0,
      293.66,
      440.0
    ]
  },
  {
    "id": "humayuns_tomb",
    "title": "Humayun's Tomb",
    "hindi": "\\u0939\\u0941\\u092e\\u093e\\u092f\\u0942\\u0901 \\u0915\\u093e \\u092e\\u0958\\u092c\\u0930\\u093e",
    "state": "Delhi",
    "region": "North",
    "era": "1565–1572 CE",
    "uid": "4315d7041d75471ba98902174a11b33d",
    "whom_made": "Mughal Emperor Humayun (Commissioned by Empress Bega Begum / Haji Begum)",
    "picked_from": "Nizamuddin East, New Delhi (Yamuna Riverbank)",
    "file": "humayunstomb-vr.html",
    "thumb": "https://media.sketchfab.com/models/4315d7041d75471ba98902174a11b33d/thumbnails/4edbfa84bc9245e283c45258b72c1345/0e9a5784573848ce86cea145a754ee20.jpeg",
    "badge": "UNESCO First Garden Tomb of the Subcontinent",
    "desc": "The earliest example of Mughal garden tomb architecture on the Indian subcontinent, commissioned by senior empress Bega Begum and designed by Persian architect Mirak Mirza Ghiyas. Its monumental Persian charbagh layout and white marble double dome served as the direct inspiration for the Taj Mahal.",
    "type": "sketchfab",
    "drone_freqs": [
      130.81,
      196.0,
      261.63,
      392.0
    ]
  }"""

# 1. Update all_3d_models.html and models_hub.html
for filename in ['all_3d_models.html', 'models_hub.html']:
    if not os.path.exists(filename):
        print(f"Skipping {filename}: not found")
        continue
    with open(filename, 'r', encoding='utf-8') as f:
        content = f.read()

    # Meta descriptions & headers
    content = content.replace('between 16 interactive national monuments', 'between 21 interactive national monuments')
    content = content.replace('between 17 interactive national monuments', 'between 21 interactive national monuments')
    content = content.replace('All 17 National 3D Models', 'All 21 National 3D Models')
    content = content.replace('All 16 National 3D Models', 'All 21 National 3D Models')

    # Card Bar
    if 'data-id="rajgad_fort"' not in content:
        # insert right before </div><!-- /#model-bar --> or after neermahal
        neer_needle = 'data-id="neermahal_palace"'
        idx = content.find(neer_needle)
        if idx != -1:
            end_card = content.find('</div>', idx)
            # Find the closing tag of this model-card (it has inner divs)
            # The model-card has <div class="card-meta">...</div> and then </div>
            card_end = content.find('</div>\n    </div>\n  </div>', idx)
            if card_end == -1:
                card_end = content.find('</div>\r\n    </div>\r\n  </div>', idx)
            if card_end != -1:
                content = content[:card_end+6] + '\n' + card_bar_add + content[card_end+6:]
                print(f"[OK] Added model-bar cards to {filename}")
            else:
                # Alternative: find </div>\n  </div>\n\n  <!-- Grid Catalog Modal -->
                alt = content.find('  <!-- Grid Catalog Modal -->')
                if alt != -1:
                    pre_div = content.rfind('</div>', 0, alt)
                    pre_pre_div = content.rfind('</div>', 0, pre_div)
                    content = content[:pre_pre_div] + card_bar_add + '\n    ' + content[pre_pre_div:]
                    print(f"[OK] Inserted model-bar cards before modal in {filename}")

    # Grid Cards
    if 'data-id="rajgad_fort"' in content and 'alt="Rajgad Fort" class="grid-card-img"' not in content:
        grid_target = 'data-id="neermahal_palace"'
        idx = content.rfind(grid_target)
        if idx != -1:
            # find end of grid-card: </div>\n        </div>\n      </div>
            c_end = content.find('</div>\n        </div>\n      </div>', idx)
            if c_end == -1:
                c_end = content.find('</div>\r\n        </div>\r\n      </div>', idx)
            if c_end != -1:
                end_pos = c_end + len('</div>\n        </div>\n      </div>')
                content = content[:end_pos] + '\n' + grid_cards_add + content[end_pos:]
                print(f"[OK] Added gallery-grid cards to {filename}")
            else:
                # fallback before </div>\n  </div>\n\n  <div id="toast">
                toast_idx = content.find('<div id="toast">')
                if toast_idx != -1:
                    ins = content.rfind('</div>', 0, toast_idx)
                    ins2 = content.rfind('</div>', 0, ins)
                    content = content[:ins2] + grid_cards_add + '\n    ' + content[ins2:]
                    print(f"[OK] Fallback gallery-grid cards added in {filename}")

    # MONUMENTS array
    if '"id": "rajgad_fort"' not in content:
        m_idx = content.find('"id": "neermahal_palace"')
        if m_idx != -1:
            # find end of this object '}'
            obj_end = content.find('}', m_idx)
            # find subsequent ']'
            arr_end = content.find(']', obj_end)
            content = content[:obj_end+1] + ',\n' + monuments_arr_add + '\n' + content[arr_end:]
            print(f"[OK] Added MONUMENTS array entries to {filename}")

    with open(filename, 'w', encoding='utf-8') as f:
        f.write(content)

print("[DONE] Updated 3D Vault pages.")
