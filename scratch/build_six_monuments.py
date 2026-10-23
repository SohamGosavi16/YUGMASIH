import os
import json
import re

MONUMENT_DEFINITIONS = [
    {
        "id": "sanchi_stupa",
        "title": "Great Stupa of Sanchi",
        "hindi": "साँची का महान स्तूप",
        "state": "Madhya Pradesh",
        "region": "Central",
        "era": "3rd Century BCE (Emperor Ashoka)",
        "uid": "2fd62cd6ee804455bda1ad0a324080cb",
        "whom_made": "Lord Buddha (Relic Stupa commissioned by Emperor Ashoka)",
        "picked_from": "Sanchi, Raisen District, Madhya Pradesh (Betwa River)",
        "file": "sanchistupa-vr.html",
        "alias": "sanchi_stupa_3d.html",
        "thumb": "https://media.sketchfab.com/models/2fd62cd6ee804455bda1ad0a324080cb/thumbnails/589443649eb54bcd9f9687e709f2ab54/407dc95007634820b398cbaeee45927c.jpeg",
        "badge": "UNESCO World Heritage · Ashokan Sanctuary",
        "desc": "The oldest stone structure in India, originally commissioned by Emperor Ashoka over the sacred relics of the Buddha. Crowning a hilltop in Sanchi, its hemispherical dome is encircled by a stone balustrade and four exquisitely carved Torana ceremonial gateways illustrating the Jataka tales.",
        "drone_freqs": [110.00, 164.81, 220.00, 329.63],
        "lat": 23.4795,
        "lng": 77.7397,
        "tag": "UNESCO ASHOKAN STUPA",
        "color": "#10b981",
        "cam_presets": {
            "orbit": {"desc": "Panoramic Orbital View", "eye": [0, -18, 12], "target": [0, 0, 2]},
            "torana": {"desc": "Carved Torana Gateway", "eye": [0, -9, 4], "target": [0, -2, 3]},
            "dome": {"desc": "Harmika & Central Dome", "eye": [7, -10, 8], "target": [0, 0, 5]},
            "walk": {"desc": "Circumambulation Path", "eye": [-9, -7, 2], "target": [0, 0, 1]}
        }
    },
    {
        "id": "gateway_of_india",
        "title": "Gateway of India",
        "hindi": "गेटवे ऑफ़ इंडिया",
        "state": "Maharashtra",
        "region": "West",
        "era": "1911–1924 CE",
        "uid": "bee1163781e7474486007915a3f430ed",
        "whom_made": "King George V & Queen Mary (Architect George Wittet)",
        "picked_from": "Apollo Bunder Waterfront, Mumbai, Maharashtra",
        "file": "gatewayofindia-vr.html",
        "alias": "gateway_of_india_3d.html",
        "thumb": "https://media.sketchfab.com/models/bee1163781e7474486007915a3f430ed/thumbnails/300f54ee1f6c419088c7600377310c23/953b2aefd27b4d2484a351913cd45d65.jpeg",
        "badge": "Indo-Saracenic Triumphal Basalt Arch",
        "desc": "Erected at Apollo Bunder overlooking the Arabian Sea, this 26-meter triumphal arch fuses 16th-century Gujarati architectural elements with classical Indo-Saracenic grandeur. Built from yellow basalt and reinforced concrete, it served as the ceremonial entrance for British viceroys and the ceremonial exit for the final British troops departing India in 1948.",
        "drone_freqs": [123.47, 185.00, 246.94, 370.00],
        "lat": 18.9220,
        "lng": 72.8347,
        "tag": "HISTORIC ARABIAN HARBOR ARCH",
        "color": "#f59e0b",
        "cam_presets": {
            "orbit": {"desc": "Full Arabian Harbor View", "eye": [0, -20, 12], "target": [0, 0, 4]},
            "arch": {"desc": "Central Basalt Archway", "eye": [0, -10, 5], "target": [0, 0, 6]},
            "dome": {"desc": "Indo-Saracenic Dome", "eye": [7, -10, 14], "target": [0, 0, 10]},
            "sea": {"desc": "Harbor Esplanade Angle", "eye": [-14, -8, 6], "target": [0, 0, 4]}
        }
    },
    {
        "id": "golden_temple",
        "title": "Golden Temple (Sri Harmandir Sahib)",
        "hindi": "श्री हरिमन्दिर साहिब (स्वर्ण मंदिर)",
        "state": "Punjab",
        "region": "North",
        "era": "1581–1604 CE & 1830 CE",
        "uid": "f1d25df7f2f841209ae81468241a15d4",
        "whom_made": "Guru Arjan Dev Ji & Maharaja Ranjit Singh",
        "picked_from": "Amritsar, Punjab (Amrit Sarovar Pool)",
        "file": "goldentemple-vr.html",
        "alias": "golden_temple_3d.html",
        "thumb": "https://media.sketchfab.com/models/f1d25df7f2f841209ae81468241a15d4/thumbnails/9422a2b26ee4485cbf68e6105a91e578/88e144e6cda24f4eae6fbb0af1d3905a.jpeg",
        "badge": "Supreme Spiritual Center of Sikhism",
        "desc": "Standing serenely in the centre of the sacred Amrit Sarovar ('Pool of Nectar'), Sri Harmandir Sahib was designed by Guru Arjan Dev Ji with four entrances welcoming people of all faiths. Rebuilt with gleaming gold-gilded copper plates and white marble inlays by Maharaja Ranjit Singh in 1830, embodying equality, peace, and eternal divine light.",
        "drone_freqs": [138.59, 207.65, 277.18, 415.30],
        "lat": 31.6200,
        "lng": 74.8765,
        "tag": "SACRED GOLDEN SANCTUARY",
        "color": "#ffd700",
        "cam_presets": {
            "orbit": {"desc": "Amrit Sarovar Panoramic View", "eye": [0, -22, 14], "target": [0, 0, 3]},
            "sanctum": {"desc": "Gilded Inner Sanctum", "eye": [0, -9, 4], "target": [0, 0, 3]},
            "dome": {"desc": "Fluted Golden Dome", "eye": [6, -9, 10], "target": [0, 0, 7]},
            "causeway": {"desc": "Guru's Bridge (Causeway)", "eye": [-12, -12, 5], "target": [0, 0, 2]}
        }
    },
    {
        "id": "south_indian_gopuram",
        "title": "South Indian Temple Gopuram",
        "hindi": "दक्षिण भारतीय मंदिर गोपुरम",
        "state": "Tamil Nadu",
        "region": "South",
        "era": "Classical Dravidian Architecture",
        "uid": "be86255d48eb4be9bb5504d698871326",
        "whom_made": "Sacred Deities & Dravidian Temple Guilds (Pandya & Nayaka Style)",
        "picked_from": "Madurai / Thanjavur, Tamil Nadu",
        "file": "templegopuram-vr.html",
        "alias": "temple_gopuram_3d.html",
        "thumb": "https://media.sketchfab.com/thumbnails/4c57687b657445e1b46c83b35e494ad4/1024.jpg",
        "badge": "Monumental Dravidian Gate Tower",
        "desc": "The towering pyramidal entrance gateway that defines the sacred landscape of South Indian temple complexes. Adorned with tiers of intricately sculpted polychrome stucco deities, celestial Gandharvas, Yalis, and episodes from Hindu epics, crowned with golden Kalasam finials.",
        "drone_freqs": [146.83, 220.00, 293.66, 440.00],
        "lat": 9.9195,
        "lng": 78.1193,
        "tag": "MONUMENTAL DRAVIDIAN GOPURAM",
        "color": "#ec4899",
        "cam_presets": {
            "orbit": {"desc": "Full Pyramidal Tower View", "eye": [0, -24, 18], "target": [0, 0, 10]},
            "sculptures": {"desc": "Polychrome Mythological Tiers", "eye": [0, -11, 12], "target": [0, 0, 10]},
            "kalasam": {"desc": "Golden Kalasam Finials", "eye": [5, -9, 22], "target": [0, 0, 18]},
            "gateway": {"desc": "Grand Entrance Gateway", "eye": [0, -8, 3], "target": [0, 0, 3]}
        }
    },
    {
        "id": "lotus_temple",
        "title": "Lotus Temple (Bahá'í House of Worship)",
        "hindi": "कमल मंदिर (लोटस टेम्पल)",
        "state": "Delhi",
        "region": "North",
        "era": "1986 CE",
        "uid": "bf5edd0ef1a74bc3be8c2a52ac2f0362",
        "whom_made": "Universal Unity & Humanity (Architect Fariborz Sahba)",
        "picked_from": "Kalkaji, New Delhi, National Capital Territory",
        "file": "lotustemple-vr.html",
        "alias": "lotus_temple_3d.html",
        "thumb": "https://media.sketchfab.com/models/bf5edd0ef1a74bc3be8c2a52ac2f0362/thumbnails/120f21befbba49a2b3bfe680bbf56c9a/635f60e309b04499b4e856b92d438109.jpeg",
        "badge": "Global Symbol of Peace & Oneness",
        "desc": "Composed of 27 free-standing petals crafted of pristine white Grecian Pentelic marble arranged in clusters of three, forming a lotus flower unfurling above nine tranquil ponds. Designed by Iranian-Canadian architect Fariborz Sahba, this award-winning sanctuary has welcomed over 100 million visitors in silent meditation.",
        "drone_freqs": [130.81, 196.00, 261.63, 392.00],
        "lat": 28.5535,
        "lng": 77.2588,
        "tag": "MARBLE LOTUS OF UNIVERSAL PEACE",
        "color": "#38bdf8",
        "cam_presets": {
            "orbit": {"desc": "Panoramic Marble Blossom", "eye": [0, -22, 14], "target": [0, 0, 4]},
            "petals": {"desc": "Curved Pentelic Marble Petals", "eye": [8, -10, 8], "target": [0, 0, 6]},
            "crown": {"desc": "Skylight & Inner Dome", "eye": [0, -5, 18], "target": [0, 0, 8]},
            "ponds": {"desc": "Reflecting Pool Perspective", "eye": [-14, -12, 4], "target": [0, 0, 3]}
        }
    },
    {
        "id": "red_fort_glory",
        "title": "Red Fort Glory (Lal Qila)",
        "hindi": "लाल क़िला वैभव",
        "state": "Delhi",
        "region": "North",
        "era": "1638–1648 CE (Shah Jahan)",
        "uid": "dbf7f5dacd28431ab585aede35b4ce3e",
        "whom_made": "Mughal Emperor Shah Jahan & Royal Master Builders",
        "picked_from": "Old Delhi (Shahjahanabad), Delhi (Yamuna Riverfront)",
        "file": "redfortglory-vr.html",
        "alias": "red_fort_glory_3d.html",
        "thumb": "https://media.sketchfab.com/models/dbf7f5dacd28431ab585aede35b4ce3e/thumbnails/dc0c1bb7fa9747a4a119aa6ee52f3c80/1c15e1f1fba94f4e87c162d98079028f.jpeg",
        "badge": "AI Photogrammetry Digital Twin",
        "desc": "Ultra-detailed AI photogrammetric reconstruction of the iconic Lal Qila fortress pavilions, capturing the ornate cusped arches, chhatri turrets, and battlements of Shah Jahan's sovereign seat.",
        "drone_freqs": [138.59, 207.65, 277.18, 415.30],
        "lat": 28.6562,
        "lng": 77.2410,
        "tag": "MUGHAL IMPERIAL PAVILIONS",
        "color": "#ef4444",
        "cam_presets": {
            "orbit": {"desc": "Imperial Citadel Overview", "eye": [0, -22, 14], "target": [0, 0, 4]},
            "arches": {"desc": "Cusped Sandstone Arches", "eye": [0, -10, 5], "target": [0, 0, 4]},
            "chhatri": {"desc": "Royal Chhatri Turrets", "eye": [8, -9, 10], "target": [0, 0, 6]},
            "courtyard": {"desc": "Diwan-i-Aam Court Angle", "eye": [-12, -10, 4], "target": [0, 0, 3]}
        }
    }
]

def make_vr_template(m):
    return f"""<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
  <title>{m['title']} — 3D Virtual Heritage Portal | YUGMA</title>
  <meta name="description" content="Explore {m['title']} in {m['state']}, India in ultra-photorealistic 3D WebXR. {m['desc'][:140]}">

  <!-- Google Fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@600;700;900&family=Cormorant+Garamond:wght@600;700&family=Inter:wght@300;400;500;600;700&family=Space+Grotesk:wght@500;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
  <script type="text/javascript" src="https://static.sketchfab.com/api/sketchfab-viewer-1.12.1.js"></script>

  <style>
    :root {{
      --bg-dark: #07090e;
      --gold: #dfa753;
      --gold-bright: #ffd56b;
      --gold-glow: rgba(223, 167, 83, 0.45);
      --glass-bg: rgba(9, 14, 23, 0.82);
      --glass-border: rgba(223, 167, 83, 0.32);
      --glass-card: rgba(13, 20, 32, 0.90);
      --ease: cubic-bezier(0.16, 1, 0.3, 1);
    }}

    * {{
      box-sizing: border-box;
      margin: 0;
      padding: 0;
      user-select: none;
      -webkit-user-select: none;
    }}

    html, body {{
      width: 100%;
      height: 100%;
      overflow: hidden;
      background: var(--bg-dark);
      font-family: 'Inter', system-ui, -apple-system, sans-serif;
      color: #f8fafc;
    }}

    /* Main 3D Viewport Frame */
    #viewer-stage {{
      position: fixed;
      inset: 0;
      width: 100%;
      height: 100%;
      overflow: hidden;
      z-index: 1;
      background: radial-gradient(circle at 50% 40%, #151d2a 0%, #080a0f 85%, #040507 100%);
      transition: filter 0.8s ease;
    }}

    #sketchfab-frame {{
      position: absolute;
      top: -54px;
      left: 0;
      width: 100%;
      height: calc(100% + 108px);
      border: none;
      display: block;
    }}

    /* Atmospheric Filters */
    .filter-dawn {{ filter: sepia(0.28) hue-rotate(-20deg) saturate(1.22) contrast(1.05) brightness(0.96); }}
    .filter-noon {{ filter: contrast(1.08) saturate(1.1) brightness(1.04); }}
    .filter-sunset {{ filter: sepia(0.48) saturate(1.6) hue-rotate(-35deg) contrast(1.15) brightness(0.92); }}
    .filter-moonlight {{ filter: hue-rotate(185deg) saturate(0.7) contrast(1.2) brightness(0.78); }}

    /* Corner Shields to eliminate owner avatar/name in top-left and Sketchfab logo in bottom-left */
    .brand-shield-top-left {{
      position: fixed;
      top: 0;
      left: 0;
      width: 260px;
      height: 62px;
      z-index: 11;
      pointer-events: none;
      background: linear-gradient(135deg, rgba(7, 9, 14, 0.96) 0%, rgba(7, 9, 14, 0.72) 45%, transparent 100%);
    }}

    .brand-shield-bottom-left {{
      position: fixed;
      bottom: 0;
      left: 0;
      min-width: 210px;
      height: 52px;
      z-index: 12;
      pointer-events: auto;
      display: flex;
      align-items: center;
      padding-left: 20px;
      padding-bottom: 4px;
      background: linear-gradient(45deg, rgba(7, 9, 14, 0.96) 0%, rgba(7, 9, 14, 0.75) 50%, transparent 100%);
      border-top-right-radius: 12px;
      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px);
    }}
    .brand-shield-badge {{
      display: inline-flex;
      align-items: center;
      gap: 7px;
      font-family: 'Cinzel', serif;
      font-size: 10px;
      letter-spacing: 0.15em;
      color: var(--gold-bright);
      text-transform: uppercase;
      font-weight: 700;
    }}
    .brand-shield-badge i {{
      color: var(--gold);
      font-size: 11px;
    }}

    /* Top Floating HUD */
    .top-hud {{
      position: fixed;
      top: 18px;
      left: 20px;
      right: 20px;
      z-index: 20;
      display: flex;
      justify-content: space-between;
      align-items: center;
      pointer-events: none;
    }}

    .brand-group {{
      pointer-events: auto;
      display: flex;
      align-items: center;
      gap: 12px;
      text-decoration: none;
      background: var(--glass-bg);
      border: 1px solid var(--glass-border);
      padding: 9px 18px 9px 14px;
      border-radius: 50px;
      backdrop-filter: blur(16px);
      -webkit-backdrop-filter: blur(16px);
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.45);
      transition: all 0.3s var(--ease);
    }}

    .brand-group:hover {{
      border-color: var(--gold-bright);
      box-shadow: 0 10px 35px var(--gold-glow);
      transform: translateY(-1px);
    }}

    .brand-icon {{
      width: 32px;
      height: 32px;
      border-radius: 50%;
      background: linear-gradient(135deg, var(--gold) 0%, #b8860b 100%);
      display: flex;
      align-items: center;
      justify-content: center;
      color: #07090e;
      font-size: 14px;
    }}

    .brand-title {{
      font-family: 'Cinzel', serif;
      font-size: 15px;
      font-weight: 700;
      letter-spacing: 0.12em;
      color: #f8fafc;
    }}

    .brand-title span {{
      color: var(--gold-bright);
    }}

    .hud-controls {{
      pointer-events: auto;
      display: flex;
      align-items: center;
      gap: 10px;
    }}

    .hud-btn {{
      height: 42px;
      padding: 0 16px;
      border-radius: 50px;
      background: var(--glass-bg);
      border: 1px solid var(--glass-border);
      color: #f8fafc;
      font-size: 12px;
      font-weight: 600;
      letter-spacing: 0.04em;
      display: inline-flex;
      align-items: center;
      gap: 8px;
      cursor: pointer;
      backdrop-filter: blur(16px);
      -webkit-backdrop-filter: blur(16px);
      transition: all 0.25s var(--ease);
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.35);
      text-decoration: none;
    }}

    .hud-btn:hover {{
      background: rgba(223, 167, 83, 0.15);
      border-color: var(--gold-bright);
      color: var(--gold-bright);
      transform: translateY(-2px);
    }}

    .hud-btn-primary {{
      background: linear-gradient(135deg, rgba(223, 167, 83, 0.32) 0%, rgba(184, 134, 11, 0.25) 100%);
      border-color: var(--gold);
      color: var(--gold-bright);
    }}

    /* Main Info Card (Top-Right / Collapsible) */
    .info-card {{
      position: fixed;
      top: 78px;
      right: 20px;
      width: 370px;
      max-width: calc(100vw - 40px);
      z-index: 20;
      background: var(--glass-card);
      border: 1px solid var(--glass-border);
      border-radius: 20px;
      padding: 22px;
      backdrop-filter: blur(24px);
      -webkit-backdrop-filter: blur(24px);
      box-shadow: 0 20px 45px rgba(0, 0, 0, 0.6);
      transition: all 0.4s var(--ease);
      overflow: hidden;
    }}

    .info-card.collapsed .info-body {{
      display: none;
    }}

    .info-header {{
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      gap: 12px;
      margin-bottom: 12px;
    }}

    .info-title {{
      font-family: 'Cinzel', serif;
      font-size: 19px;
      font-weight: 700;
      color: #ffd56b;
      line-height: 1.25;
      text-shadow: 0 2px 8px rgba(0,0,0,0.5);
    }}

    .info-hindi {{
      font-size: 13px;
      font-family: 'Inter', sans-serif;
      color: #94a3b8;
      font-weight: 400;
      margin-top: 3px;
    }}

    .badge {{
      display: inline-block;
      font-size: 10px;
      font-weight: 700;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      padding: 4px 9px;
      border-radius: 20px;
      background: rgba(223, 167, 83, 0.15);
      border: 1px solid rgba(223, 167, 83, 0.4);
      color: var(--gold-bright);
      margin-bottom: 8px;
    }}

    .collapse-btn {{
      background: transparent;
      border: none;
      color: #94a3b8;
      cursor: pointer;
      font-size: 15px;
      padding: 4px 6px;
      border-radius: 8px;
      transition: all 0.2s;
    }}
    .collapse-btn:hover {{
      color: #fff;
      background: rgba(255, 255, 255, 0.08);
    }}

    .info-desc {{
      font-size: 12.5px;
      line-height: 1.6;
      color: #cbd5e1;
      margin-bottom: 14px;
    }}

    .meta-grid {{
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 10px;
      padding-top: 12px;
      border-top: 1px solid rgba(223, 167, 83, 0.18);
      margin-bottom: 14px;
    }}

    .meta-item {{
      display: flex;
      flex-direction: column;
      gap: 3px;
    }}

    .meta-label {{
      font-size: 10px;
      text-transform: uppercase;
      letter-spacing: 0.06em;
      color: #94a3b8;
      font-weight: 600;
    }}

    .meta-val {{
      font-size: 12px;
      color: #f8fafc;
      font-weight: 600;
    }}

    /* Camera Preset Buttons */
    .cam-presets {{
      display: flex;
      gap: 6px;
      margin-top: 10px;
      padding-top: 12px;
      border-top: 1px solid rgba(223, 167, 83, 0.18);
    }}

    .cam-btn {{
      flex: 1;
      background: rgba(255, 255, 255, 0.06);
      border: 1px solid rgba(223, 167, 83, 0.22);
      border-radius: 8px;
      color: #cbd5e1;
      font-size: 11px;
      font-weight: 600;
      padding: 7px 4px;
      cursor: pointer;
      transition: all 0.2s var(--ease);
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 4px;
    }}

    .cam-btn:hover, .cam-btn.active {{
      background: var(--gold);
      color: #07090e;
      border-color: var(--gold-bright);
    }}

    /* Bottom Control Bar */
    .bottom-bar {{
      position: fixed;
      bottom: 20px;
      left: 50%;
      transform: translateX(-50%);
      z-index: 20;
      display: flex;
      align-items: center;
      gap: 10px;
      background: var(--glass-bg);
      border: 1px solid var(--glass-border);
      padding: 8px 16px;
      border-radius: 50px;
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
      box-shadow: 0 15px 40px rgba(0, 0, 0, 0.5);
    }}

    .atmo-group {{
      display: flex;
      align-items: center;
      gap: 6px;
      border-right: 1px solid rgba(223, 167, 83, 0.25);
      padding-right: 12px;
      margin-right: 4px;
    }}

    .atmo-btn {{
      width: 34px;
      height: 34px;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid rgba(223, 167, 83, 0.2);
      color: #cbd5e1;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      font-size: 13px;
      transition: all 0.2s;
    }}

    .atmo-btn:hover, .atmo-btn.active {{
      background: var(--gold);
      color: #07090e;
      border-color: var(--gold-bright);
      transform: scale(1.08);
    }}

    /* Toast Notification */
    #toast {{
      position: fixed;
      bottom: 84px;
      left: 50%;
      transform: translateX(-50%) translateY(30px);
      background: rgba(13, 20, 32, 0.95);
      border: 1px solid var(--gold);
      color: #ffd56b;
      padding: 9px 20px;
      border-radius: 30px;
      font-size: 12px;
      font-weight: 600;
      letter-spacing: 0.04em;
      z-index: 99;
      opacity: 0;
      pointer-events: none;
      transition: all 0.35s var(--ease);
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.6);
    }}

    #toast.show {{
      opacity: 1;
      transform: translateX(-50%) translateY(0);
    }}

    @media (max-width: 768px) {{
      .top-hud {{ top: 12px; left: 12px; right: 12px; }}
      .brand-title {{ font-size: 13px; }}
      .info-card {{
        top: auto;
        bottom: 80px;
        right: 12px;
        left: 12px;
        width: auto;
        padding: 16px;
      }}
      .bottom-bar {{ bottom: 12px; }}
    }}
  </style>
</head>
<body>

  <!-- 3D Viewer Container -->
  <div id="viewer-stage">
    <iframe
      id="sketchfab-frame"
      src="https://sketchfab.com/models/{m['uid']}/embed?autostart=1&internal=1&tracking=0&ui_ar=1&ui_infos=0&ui_snapshots=1&ui_stop=0&ui_theatre=1&ui_watermark=0&ui_theme=dark&camera=0&preload=1"
      allow="autoplay; fullscreen; vr; xr; xr-spatial-tracking"
      allowfullscreen>
    </iframe>
  </div>

  <!-- Corner Shields to conceal Sketchfab watermark & user overlay -->
  <div class="brand-shield-top-left"></div>
  <div class="brand-shield-bottom-left">
    <div class="brand-shield-badge">
      <i class="fa-solid fa-atom"></i> YUGMA 3D DIGITAL TWIN
    </div>
  </div>

  <!-- Top Floating HUD -->
  <header class="top-hud">
    <a href="all_3d_models.html" class="brand-group" title="Back to 3D Heritage Vault">
      <div class="brand-icon"><i class="fa-solid fa-arrow-left"></i></div>
      <div class="brand-title">3D VAULT · <span>{m['title']}</span></div>
    </a>

    <div class="hud-controls">
      <button class="hud-btn" id="btn-audio" title="Toggle Spatial Ambience">
        <i class="fa-solid fa-volume-high" id="audio-icon"></i>
        <span id="audio-text">SOUND ON</span>
      </button>
      <a href="all_3d_models.html" class="hud-btn" title="View all 27 models">
        <i class="fa-solid fa-layer-group"></i> 27 VAULT
      </a>
      <a href="india_3d_map.html" class="hud-btn hud-btn-primary" title="Return to 3D India Map">
        <i class="fa-solid fa-globe"></i> INDIA MAP
      </a>
    </div>
  </header>

  <!-- Main Info Card -->
  <div class="info-card" id="info-card">
    <div class="info-header">
      <div>
        <span class="badge">{m['badge']}</span>
        <h1 class="info-title">{m['title']}</h1>
        <div class="info-hindi">{m['hindi']}</div>
      </div>
      <button class="collapse-btn" id="collapse-btn" title="Toggle Details">
        <i class="fa-solid fa-chevron-up"></i>
      </button>
    </div>

    <div class="info-body">
      <p class="info-desc">{m['desc']}</p>

      <div class="meta-grid">
        <div class="meta-item">
          <span class="meta-label">State / Region</span>
          <span class="meta-val">{m['state']} ({m['region']} India)</span>
        </div>
        <div class="meta-item">
          <span class="meta-label">Historical Era</span>
          <span class="meta-val">{m['era']}</span>
        </div>
        <div class="meta-item" style="grid-column: span 2;">
          <span class="meta-label">Commissioned / Dedicated To</span>
          <span class="meta-val" style="color:#ffd56b;">{m['whom_made']}</span>
        </div>
        <div class="meta-item" style="grid-column: span 2;">
          <span class="meta-label">Geospatial Origin</span>
          <span class="meta-val">{m['picked_from']}</span>
        </div>
      </div>

      <div style="font-size:10px; font-weight:700; color:#94a3b8; text-transform:uppercase; letter-spacing:0.06em; margin-bottom:4px;">
        Vantage Angle Presets
      </div>
      <div class="cam-presets">
        <button class="cam-btn active" data-preset="orbit"><i class="fa-solid fa-circle-nodes"></i> Panorama</button>
        <button class="cam-btn" data-preset="arch"><i class="fa-solid fa-eye"></i> Detail</button>
        <button class="cam-btn" data-preset="dome"><i class="fa-solid fa-mountain"></i> Summit</button>
        <button class="cam-btn" data-preset="sea"><i class="fa-solid fa-compass"></i> Plaza</button>
      </div>
    </div>
  </div>

  <!-- Bottom Atmosphere Bar -->
  <div class="bottom-bar">
    <div class="atmo-group">
      <button class="atmo-btn" data-filter="filter-dawn" title="Dawn Sunlight"><i class="fa-solid fa-cloud-sun"></i></button>
      <button class="atmo-btn active" data-filter="filter-noon" title="Zenith Daylight"><i class="fa-solid fa-sun"></i></button>
      <button class="atmo-btn" data-filter="filter-sunset" title="Golden Sunset"><i class="fa-solid fa-sun-plant-wilt"></i></button>
      <button class="atmo-btn" data-filter="filter-moonlight" title="Moonlight Night"><i class="fa-solid fa-moon"></i></button>
    </div>

    <button class="hud-btn" id="btn-fullscreen" title="Toggle Fullscreen" style="height:34px; padding:0 12px; font-size:11px;">
      <i class="fa-solid fa-expand"></i> FULLSCREEN
    </button>
  </div>

  <!-- Toast -->
  <div id="toast">Perspective Updated</div>

  <script>
    (function() {{
      "use strict";

      const stage = document.getElementById('viewer-stage');
      const toast = document.getElementById('toast');
      const infoCard = document.getElementById('info-card');
      const collapseBtn = document.getElementById('collapse-btn');
      const audioBtn = document.getElementById('btn-audio');
      const audioIcon = document.getElementById('audio-icon');
      const audioText = document.getElementById('audio-text');
      const fullscreenBtn = document.getElementById('btn-fullscreen');

      function showToast(msg) {{
        toast.textContent = msg;
        toast.classList.add('show');
        clearTimeout(toast._timer);
        toast._timer = setTimeout(() => toast.classList.remove('show'), 2000);
      }}

      // Atmosphere Filter Swapping
      document.querySelectorAll('.atmo-btn').forEach(btn => {{
        btn.addEventListener('click', () => {{
          document.querySelectorAll('.atmo-btn').forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          const filter = btn.getAttribute('data-filter');
          stage.className = '';
          if (filter) stage.classList.add(filter);
          showToast(btn.title + ' Applied');
        }});
      }});

      // Card Collapse Toggle
      collapseBtn.addEventListener('click', () => {{
        infoCard.classList.toggle('collapsed');
        const isCollapsed = infoCard.classList.contains('collapsed');
        collapseBtn.innerHTML = isCollapsed ? '<i class=\"fa-solid fa-chevron-down\"></i>' : '<i class=\"fa-solid fa-chevron-up\"></i>';
      }});

      // Fullscreen Toggle
      fullscreenBtn.addEventListener('click', () => {{
        if (!document.fullscreenElement) {{
          document.documentElement.requestFullscreen().catch(() => {{}});
          fullscreenBtn.innerHTML = '<i class=\"fa-solid fa-compress\"></i> EXIT';
        }} else {{
          document.exitFullscreen().catch(() => {{}});
          fullscreenBtn.innerHTML = '<i class=\"fa-solid fa-expand\"></i> FULLSCREEN';
        }}
      }});

      // Sketchfab API Client Integration
      let apiInstance = null;
      const iframe = document.getElementById('sketchfab-frame');
      const client = new window.Sketchfab(iframe);

      const CAM_PRESETS = {json.dumps(m['cam_presets'])};

      client.init('{m['uid']}', {{
        success: function(api) {{
          apiInstance = api;
          api.start();
          api.addEventListener('viewerready', function() {{
            console.log('Sketchfab Viewer ready for {m['title']}');
            api.setFov(45);
          }});
        }},
        error: function() {{
          console.warn('Sketchfab API init fallback');
        }},
        autostart: 1,
        ui_ar: 1,
        ui_infos: 0,
        ui_theatre: 1,
        ui_watermark: 0,
        ui_theme: 'dark'
      }});

      document.querySelectorAll('.cam-btn').forEach(btn => {{
        btn.addEventListener('click', () => {{
          document.querySelectorAll('.cam-btn').forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          const key = btn.getAttribute('data-preset');
          const p = CAM_PRESETS[key];
          if (p && apiInstance) {{
            apiInstance.setCameraLookAt(p.eye, p.target, 2.0, function() {{
              showToast(p.desc);
            }});
          }} else if (p) {{
            showToast(p.desc);
          }}
        }});
      }});

      // Ambient Audio Synthesizer
      let audioCtx = null;
      let isAudioPlaying = false;
      let ambientNodes = [];

      function startAmbience() {{
        try {{
          const AudioContext = window.AudioContext || window.webkitAudioContext;
          if (!audioCtx) audioCtx = new AudioContext();
          if (audioCtx.state === 'suspended') audioCtx.resume();

          const masterGain = audioCtx.createGain();
          masterGain.gain.setValueAtTime(0.01, audioCtx.currentTime);
          masterGain.gain.exponentialRampToValueAtTime(0.20, audioCtx.currentTime + 3);
          masterGain.connect(audioCtx.destination);
          ambientNodes.push(masterGain);

          const baseFreqs = {m['drone_freqs']};
          baseFreqs.forEach((f, idx) => {{
            const osc = audioCtx.createOscillator();
            const oscGain = audioCtx.createGain();
            osc.type = idx % 2 === 0 ? 'sine' : 'triangle';
            osc.frequency.setValueAtTime(f, audioCtx.currentTime);

            const lfo = audioCtx.createOscillator();
            lfo.frequency.setValueAtTime(0.2 + idx * 0.1, audioCtx.currentTime);
            const lfoGain = audioCtx.createGain();
            lfoGain.gain.setValueAtTime(1.5, audioCtx.currentTime);
            lfo.connect(lfoGain);
            lfoGain.connect(osc.frequency);
            lfo.start();

            oscGain.gain.setValueAtTime(0.04 / (idx + 1), audioCtx.currentTime);
            osc.connect(oscGain);
            oscGain.connect(masterGain);
            osc.start();
            ambientNodes.push(osc, lfo);
          }});

          isAudioPlaying = true;
          audioIcon.className = 'fa-solid fa-volume-high';
          audioText.textContent = 'SOUND ON';
          audioBtn.style.borderColor = 'var(--gold-bright)';
          audioBtn.style.color = 'var(--gold-bright)';
          showToast('{m['title']} Ambience Playing');
        }} catch(e) {{
          console.warn('Audio not allowed:', e);
        }}
      }}

      function stopAmbience() {{
        ambientNodes.forEach(n => {{
          try {{ if (n.stop) n.stop(); if (n.disconnect) n.disconnect(); }} catch(e) {{}}
        }});
        ambientNodes = [];
        isAudioPlaying = false;
        audioIcon.className = 'fa-solid fa-volume-xmark';
        audioText.textContent = 'MUTED';
        audioBtn.style.borderColor = 'var(--glass-border)';
        audioBtn.style.color = '#f8fafc';
        showToast('Ambience Muted');
      }}

      audioBtn.addEventListener('click', () => {{
        if (!isAudioPlaying) startAmbience();
        else stopAmbience();
      }});

      // Auto start audio on user first click anywhere
      window.addEventListener('click', function initSoundOnce() {{
        if (!isAudioPlaying && !audioCtx) startAmbience();
        window.removeEventListener('click', initSoundOnce);
      }}, {{ once: true }});

    }})();
  </script>
</body>
</html>"""

def main():
    # 1. Write Standalone VR pages and aliases
    for m in MONUMENT_DEFINITIONS:
        html = make_vr_template(m)
        with open(m['file'], 'w', encoding='utf-8') as f:
            f.write(html)
        print(f" [OK] Built {m['file']} (UID: {m['uid']})")
        if m.get('alias'):
            with open(m['alias'], 'w', encoding='utf-8') as f:
                f.write(html)
            print(f" [OK] Built alias {m['alias']}")

    # 2. Update all_3d_models.html and models_hub.html
    # Build snippets
    card_bars = []
    grid_cards = []
    monument_objs = []

    for m in MONUMENT_DEFINITIONS:
        card_bars.append(f"""      <div class="model-card" data-id="{m['id']}" data-region="{m['region']}">
        <img src="{m['thumb']}" alt="{m['title']}" class="card-thumb">
        <div class="card-meta">
          <span class="card-state">{m['state']}</span>
          <span class="card-title">{m['title']}</span>
          <span class="card-creator">{m['era'][:22]}</span>
        </div>
      </div>""")

        grid_cards.append(f"""      <div class="grid-card">
        <img src="{m['thumb']}" alt="{m['title']}" class="grid-card-img">
        <div class="grid-card-body">
          <span class="grid-card-tag">{m['region']} India · {m['state']}</span>
          <h3 class="grid-card-title">{m['title']}</h3>
          <p class="grid-card-desc">{m['desc']}</p>
          <div style="margin-bottom:12px; font-size:11px; color:#cbd5e1; display:flex; flex-direction:column; gap:4px; border-top:1px solid rgba(223,167,83,0.15); padding-top:8px;">
            <div><span style="color:#94a3b8; font-size:9px; text-transform:uppercase; font-weight:600;">Built For:</span> <strong style="color:#ffd56b;">{m['whom_made']}</strong></div>
            <div><span style="color:#94a3b8; font-size:9px; text-transform:uppercase; font-weight:600;">Picked From:</span> <strong style="color:#ffd56b;">{m['picked_from']}</strong></div>
          </div>
          <div style="display:flex; gap:8px;">
            <button class="grid-card-btn select-monument-btn" data-id="{m['id']}" style="flex:1; cursor:pointer; border:none;">
              <i class="fa-solid fa-eye"></i> View on Stage
            </button>
            <a href="{m['file']}" class="grid-card-btn" style="background:rgba(255,255,255,0.08); color:#ffd56b; border:1px solid rgba(223,167,83,0.3);">
              <i class="fa-solid fa-arrow-up-right-from-square"></i>
            </a>
          </div>
        </div>
      </div>""")

        monument_objs.append({
            "id": m["id"],
            "title": m["title"],
            "hindi": m["hindi"],
            "state": m["state"],
            "region": m["region"],
            "era": m["era"],
            "uid": m["uid"],
            "whom_made": m["whom_made"],
            "picked_from": m["picked_from"],
            "file": m["file"],
            "thumb": m["thumb"],
            "badge": m["badge"],
            "desc": m["desc"],
            "type": "sketchfab",
            "drone_freqs": m["drone_freqs"]
        })

    cards_bar_joined = "\n".join(card_bars)
    grid_cards_joined = "\n".join(grid_cards)

    for target_vault in ['all_3d_models.html', 'models_hub.html']:
        if not os.path.exists(target_vault):
            continue
        with open(target_vault, 'r', encoding='utf-8') as f:
            v_content = f.read()

        # Update numbers from 21 to 27
        v_content = v_content.replace('between 21 interactive national monuments', 'between 27 interactive national monuments')
        v_content = v_content.replace('All 21 National 3D Models', 'All 27 National 3D Models')

        # Insert model cards before end of #model-bar
        if 'data-id="sanchi_stupa"' not in v_content:
            # find humayuns_tomb card in model bar
            needle = 'data-id="humayuns_tomb"'
            idx = v_content.find(needle)
            if idx != -1:
                end_div = v_content.find('</div>', idx) # inner card-meta
                end_div2 = v_content.find('</div>', end_div + 6) # model-card
                end_pos = end_div2 + 6
                v_content = v_content[:end_pos] + '\n' + cards_bar_joined + v_content[end_pos:]
                print(f" [OK] Added model-bar cards to {target_vault}")

        # Insert grid cards into gallery-grid
        if 'data-id="sanchi_stupa"' in v_content and 'alt="Great Stupa of Sanchi" class="grid-card-img"' not in v_content:
            needle = 'data-id="humayuns_tomb"'
            idx = v_content.rfind(needle)
            if idx != -1:
                # end of grid-card
                c_end = v_content.find('</div>\n        </div>\n      </div>', idx)
                if c_end == -1:
                    c_end = v_content.find('</div>\r\n        </div>\r\n      </div>', idx)
                if c_end != -1:
                    end_pos = c_end + len('</div>\n        </div>\n      </div>')
                    v_content = v_content[:end_pos] + '\n' + grid_cards_joined + v_content[end_pos:]
                    print(f" [OK] Added grid-cards to {target_vault}")

        # Update MONUMENTS array
        if '"id": "sanchi_stupa"' not in v_content:
            # parse JSON array from MONUMENTS = [ ... ];
            m_match = re.search(r'const MONUMENTS = (\[[\s\S]*?\]);', v_content)
            if m_match:
                existing_arr = json.loads(m_match.group(1))
                existing_ids = {item['id'] for item in existing_arr}
                for new_m in monument_objs:
                    if new_m['id'] not in existing_ids:
                        existing_arr.append(new_m)
                new_json_str = json.dumps(existing_arr, indent=2)
                v_content = v_content[:m_match.start()] + f"const MONUMENTS = {new_json_str};" + v_content[m_match.end():]
                print(f" [OK] Updated MONUMENTS array in {target_vault} (Total: {len(existing_arr)} models)")

        with open(target_vault, 'w', encoding='utf-8') as f:
            f.write(v_content)

    # 3. Update india_3d_map.html
    if os.path.exists('india_3d_map.html'):
        with open('india_3d_map.html', 'r', encoding='utf-8') as f:
            m_content = f.read()

        # Add pins to MONUMENT_PINS
        if 'id: \'sanchi_stupa\'' not in m_content:
            new_pins_code = ""
            for m in MONUMENT_DEFINITIONS:
                new_pins_code += f"""        {{
          id: '{m['id']}',
          name: '{m['title'].split('(')[0].strip()}',
          state: '{m['state']}',
          tag: '{m['tag']}',
          desc: '{m['picked_from'].split('(')[0].strip()}',
          lat: {m['lat']},
          lng: {m['lng']},
          color: '{m['color']}',
          vrPath: '{m['file']}'
        }},
"""
            needle_pin = "id: 'humayuns_tomb',"
            p_idx = m_content.find(needle_pin)
            if p_idx != -1:
                # find end of humayuns_tomb pin: },
                obj_end = m_content.find('}', p_idx)
                ins_pos = obj_end + 2 # after '},\n'
                m_content = m_content[:ins_pos] + '\n' + new_pins_code.rstrip() + m_content[ins_pos:]
                print(" [OK] Added pins to MONUMENT_PINS in india_3d_map.html")

        # Add Punjab & Madhya Pradesh to ARVR_STATE_MAP
        if "'Punjab': 'goldentemple-vr.html'" not in m_content:
            m_content = m_content.replace(
                "'Delhi': 'redfort-vr.html',",
                "'Delhi': 'redfort-vr.html',\n      'Punjab': 'goldentemple-vr.html',\n      'Madhya Pradesh': 'sanchistupa-vr.html',"
            )
            print(" [OK] Added Punjab & Madhya Pradesh to ARVR_STATE_MAP in india_3d_map.html")

        with open('india_3d_map.html', 'w', encoding='utf-8') as f:
            f.write(m_content)

    # 4. Update index.html
    if os.path.exists('index.html'):
        with open('index.html', 'r', encoding='utf-8') as f:
            idx_content = f.read()

        if "punjab: {" not in idx_content:
            new_states_code = """      punjab: { name: 'Punjab', nameHindi: 'पंजाब (अमृतसर)', heritage: 'Golden Temple (Harmandir Sahib)', tradition: 'Bhangra & Giddha', region: 'North', tagline: 'The Celestial Gilded Sanctuary of Amrit Sarovar & Eternal Divine Peace', lat: 31.6200, lng: 74.8765, monumentLat: 31.6200, monumentLng: 74.8765, themeColor: '#ffd700', vrPath: 'goldentemple-vr.html', videoUrl: 'https://www.youtube-nocookie.com/embed/hpKtU21PVu0', youtubeId: 'hpKtU21PVu0', pinTag: 'SACRED GOLDEN SANCTUARY' },
      madhya_pradesh: { name: 'Madhya Pradesh', nameHindi: 'मध्य प्रदेश (साँची)', heritage: 'Great Stupa of Sanchi', tradition: 'Matki & Karma', region: 'Central', tagline: "India's Oldest Stone Sanctuary Crowned with Ashokan Torana Gateways", lat: 23.4795, lng: 77.7397, monumentLat: 23.4795, monumentLng: 77.7397, themeColor: '#10b981', vrPath: 'sanchistupa-vr.html', videoUrl: 'https://www.youtube-nocookie.com/embed/hpKtU21PVu0', youtubeId: 'hpKtU21PVu0', pinTag: 'UNESCO ASHOKAN STUPA' },
      gateway_of_india: { name: 'Maharashtra', nameHindi: 'महाराष्ट्र (मुंबई)', heritage: 'Gateway of India', heritageHindi: 'गेटवे ऑफ़ इंडिया', tradition: 'Koli & Lavani', region: 'West', tagline: 'Indo-Saracenic Triumphal Basalt Arch Overlooking the Arabian Sea', lat: 18.9220, lng: 72.8347, monumentLat: 18.9220, monumentLng: 72.8347, themeColor: '#f59e0b', vrPath: 'gatewayofindia-vr.html', videoUrl: 'https://www.youtube-nocookie.com/embed/Kh4MU4EonkI', youtubeId: 'Kh4MU4EonkI', pinTag: 'HISTORIC HARBOR ARCH' },
      lotus_temple: { name: 'Delhi', nameHindi: 'दिल्ली (लोटस टेम्पल)', heritage: 'Lotus Temple', heritageHindi: 'कमल मंदिर', tradition: 'Kathak & Sufi Qawwali', region: 'North', tagline: 'Pristine White Marble Blossom of Global Unity & Universal Meditation', lat: 28.5535, lng: 77.2588, monumentLat: 28.5535, monumentLng: 77.2588, themeColor: '#38bdf8', vrPath: 'lotustemple-vr.html', videoUrl: 'https://www.youtube-nocookie.com/embed/hpKtU21PVu0', youtubeId: 'hpKtU21PVu0', pinTag: 'MARBLE LOTUS OF PEACE' },"""

            idx_needle = "      rajgad_fort: {"
            idx_pos = idx_content.find(idx_needle)
            if idx_pos != -1:
                line_end = idx_content.find('\n', idx_pos)
                idx_content = idx_content[:line_end+1] + new_states_code + '\n' + idx_content[line_end+1:]
                print(" [OK] Added new states to YUGMA_STATES in index.html")

        # Update normalizeKey
        if "s === 'punjab'" not in idx_content:
            norm_add = """      if (s === 'punjab' || s.includes('punjab') || s.includes('amritsar')) return 'punjab';
      if (s === 'madhya_pradesh' || s.includes('sanchi') || (s.includes('madhya') && !s.includes('uttar'))) return 'madhya_pradesh';
      if (s === 'gateway_of_india' || s.includes('gateway')) return 'gateway_of_india';
      if (s === 'lotus_temple' || s.includes('lotus')) return 'lotus_temple';
"""
            idx_content = idx_content.replace(
                "if (s === 'rajgad_fort' || s.includes('rajgad')) return 'rajgad_fort';",
                norm_add + "      if (s === 'rajgad_fort' || s.includes('rajgad')) return 'rajgad_fort';"
            )
            print(" [OK] Added normalizeKey mappings in index.html")

        # Update getRegionForStateKey
        if "'punjab'" not in idx_content:
            idx_content = idx_content.replace(
                "['rajasthan', 'uttar_pradesh', 'uttarakhand', 'delhi'].includes(key)",
                "['rajasthan', 'uttar_pradesh', 'uttarakhand', 'delhi', 'punjab', 'lotus_temple'].includes(key)"
            )
            idx_content = idx_content.replace(
                "['maharashtra', 'gujarat', 'statue_of_unity', 'rajgad_fort'].includes(key)",
                "['maharashtra', 'gujarat', 'statue_of_unity', 'rajgad_fort', 'gateway_of_india'].includes(key)"
            )
            idx_content = idx_content.replace(
                "['chhattisgarh'].includes(key)",
                "['chhattisgarh', 'madhya_pradesh'].includes(key)"
            )
            print(" [OK] Updated getRegionForStateKey in index.html")

        # Update openARVRModal features & buttons
        if "key === 'punjab'" not in idx_content:
            custom_features = """        } else if (key === 'punjab') {
          featuresEl.textContent = `Experience Sri Harmandir Sahib (The Golden Temple) in photorealistic 3D. Explore the sanctum sanctorum adorned with gold leaf, the marble parikrama walkway, and the sacred Amrit Sarovar pool.`;
        } else if (key === 'madhya_pradesh') {
          featuresEl.textContent = `Explore the Great Stupa of Sanchi, India's oldest stone structure. Inspect the Ashokan hemispherical dome, stone balustrades, and the four intricately carved Torana gateways illustrating the Jataka tales in 3D.`;
        } else if (key === 'gateway_of_india') {
          featuresEl.textContent = `Explore Mumbai's iconic Gateway of India at Apollo Bunder in photorealistic 3D. Inspect the Indo-Saracenic basalt archway, central dome, and harbor promenades.`;
        } else if (key === 'lotus_temple') {
          featuresEl.textContent = `Explore New Delhi's famous Lotus Temple in 3D WebXR. Inspect the 27 free-standing Greek marble petals, tranquil reflecting ponds, and central prayer hall designed for universal peace and meditation.`;"""

            idx_content = idx_content.replace(
                "} else if (key === 'rajgad_fort') {",
                custom_features + "\n        } else if (key === 'rajgad_fort') {"
            )

            custom_btns = """: (key === 'punjab')
            ? `✨ LAUNCH GOLDEN TEMPLE 3D VR`
            : (key === 'madhya_pradesh')
            ? `☸️ LAUNCH SANCHI STUPA 3D VR`
            : (key === 'gateway_of_india')
            ? `🏛️ LAUNCH GATEWAY OF INDIA 3D VR`
            : (key === 'lotus_temple')
            ? `🪷 LAUNCH LOTUS TEMPLE 3D VR`"""

            idx_content = idx_content.replace(
                ": (key === 'rajgad_fort')",
                custom_btns + "\n            : (key === 'rajgad_fort')"
            )
            print(" [OK] Updated openARVRModal custom descriptions & buttons in index.html")

        with open('index.html', 'w', encoding='utf-8') as f:
            f.write(idx_content)

    print("\nAll 6 monuments built and integrated successfully!")

if __name__ == '__main__':
    main()
