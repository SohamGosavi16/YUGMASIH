
    // ════════════════════════════════════════════════════════════
    //  YUGMA — 3D Globe & Scroll Storytelling Engine
    //  Exact orbital hero positioning + smooth scroll centering
    // ════════════════════════════════════════════════════════════


    // ── Preloader Dismissal ──────────────────────────────────
    function dismissPreloader() {
      const p = document.getElementById('preloader');
      if (p && !p.classList.contains('done')) {
        p.classList.add('done');
        setTimeout(() => { p.style.display = 'none'; }, 800);
      }
    }
    setTimeout(dismissPreloader, 600);
    window.addEventListener('load', dismissPreloader);

    // ── Audio Toggle ─────────────────────────────────────────
    const audioBtn = document.getElementById('btn-audio-toggle');
    const audioLabel = document.getElementById('audio-label');
    if (audioBtn) {
      audioBtn.addEventListener('click', () => {
        audioBtn.classList.toggle('active');
        const isActive = audioBtn.classList.contains('active');
        audioLabel.textContent = isActive ? 'SOUND' : 'MUTED';
        if (window.yugmaAudio) {
          window.yugmaAudio.toggleMute();
        }
      });
    }

    // ── Living Tradition Showcase Videos Registry ──
    const TRADITION_VIDEOS = {
      maharashtra: { id: "Kh4MU4EonkI", url: "https://www.youtube-nocookie.com/embed/Kh4MU4EonkI", title: "Maharashtra — Lavani Cultural Showcase", tradition: "Lavani" },
      state_01: { id: "Kh4MU4EonkI", url: "https://www.youtube-nocookie.com/embed/Kh4MU4EonkI", title: "Maharashtra — Lavani Cultural Showcase", tradition: "Lavani" },
      gujarat: { id: "gZjNpNuaPLw", url: "https://www.youtube-nocookie.com/embed/gZjNpNuaPLw", title: "Gujarat — Garba Cultural Showcase", tradition: "Garba" },
      state_02: { id: "gZjNpNuaPLw", url: "https://www.youtube-nocookie.com/embed/gZjNpNuaPLw", title: "Gujarat — Garba Cultural Showcase", tradition: "Garba" },
      uttar_pradesh: { id: "hpKtU21PVu0", url: "https://www.youtube-nocookie.com/embed/hpKtU21PVu0", title: "Uttar Pradesh — Kathak Classical Showcase", tradition: "Kathak" },
      state_04: { id: "hpKtU21PVu0", url: "https://www.youtube-nocookie.com/embed/hpKtU21PVu0", title: "Uttar Pradesh — Kathak Classical Showcase", tradition: "Kathak" },
      west_bengal: { id: "QqJU_YpGeNs", url: "https://www.youtube-nocookie.com/embed/QqJU_YpGeNs", title: "West Bengal — Baul Folk Showcase", tradition: "Baul" },
      state_05: { id: "QqJU_YpGeNs", url: "https://www.youtube-nocookie.com/embed/QqJU_YpGeNs", title: "West Bengal — Baul Folk Showcase", tradition: "Baul" },
      tamil_nadu: { id: "2-9Lt01xY-k", url: "https://www.youtube-nocookie.com/embed/2-9Lt01xY-k", title: "Tamil Nadu — Bharatanatyam Classical Showcase", tradition: "Bharatanatyam" },
      state_06: { id: "2-9Lt01xY-k", url: "https://www.youtube-nocookie.com/embed/2-9Lt01xY-k", title: "Tamil Nadu — Bharatanatyam Classical Showcase", tradition: "Bharatanatyam" },
      karnataka: { id: "qUYWZXHL8JU", url: "https://www.youtube-nocookie.com/embed/qUYWZXHL8JU", title: "Karnataka — Yakshagana Cultural Showcase", tradition: "Yakshagana" },
      state_07: { id: "qUYWZXHL8JU", url: "https://www.youtube-nocookie.com/embed/qUYWZXHL8JU", title: "Karnataka — Yakshagana Cultural Showcase", tradition: "Yakshagana" },
      kerala: { id: "lnNieCUG4G4", url: "https://www.youtube-nocookie.com/embed/lnNieCUG4G4", title: "Kerala — Theyyam Cultural Showcase", tradition: "Theyyam" },
      state_08: { id: "lnNieCUG4G4", url: "https://www.youtube-nocookie.com/embed/lnNieCUG4G4", title: "Kerala — Theyyam Cultural Showcase", tradition: "Theyyam" },
      odisha: { id: "Uqmc0891L2U", url: "https://www.youtube-nocookie.com/embed/Uqmc0891L2U", title: "Odisha — Odissi Cultural Showcase", tradition: "Odissi" },
      state_09: { id: "Uqmc0891L2U", url: "https://www.youtube-nocookie.com/embed/Uqmc0891L2U", title: "Odisha — Odissi Cultural Showcase", tradition: "Odissi" },
      andhra_pradesh: { id: "ko5sKNuSLbs", url: "https://www.youtube-nocookie.com/embed/ko5sKNuSLbs", title: "Andhra Pradesh — Kuchipudi Classical Showcase", tradition: "Kuchipudi" },
      state_11: { id: "ko5sKNuSLbs", url: "https://www.youtube-nocookie.com/embed/ko5sKNuSLbs", title: "Andhra Pradesh — Kuchipudi Classical Showcase", tradition: "Kuchipudi" },
      bihar: { id: "FhvLY9ZnbzI", url: "https://www.youtube-nocookie.com/embed/FhvLY9ZnbzI", title: "Bihar — Madhubani / Mithila Art Showcase", tradition: "Madhubani / Mithila Art" },
      state_12: { id: "FhvLY9ZnbzI", url: "https://www.youtube-nocookie.com/embed/FhvLY9ZnbzI", title: "Bihar — Madhubani / Mithila Art Showcase", tradition: "Madhubani / Mithila Art" },
      goa: { id: "EokuS_QbkEM", url: "https://www.youtube-nocookie.com/embed/EokuS_QbkEM", title: "Goa — Fugdi Folk Showcase", tradition: "Fugdi" },
      state_13: { id: "EokuS_QbkEM", url: "https://www.youtube-nocookie.com/embed/EokuS_QbkEM", title: "Goa — Fugdi Folk Showcase", tradition: "Fugdi" },
      chhattisgarh: { id: "Qe6_Vy2hleg", url: "https://www.youtube-nocookie.com/embed/Qe6_Vy2hleg", title: "Chhattisgarh — Panthi Folk Showcase", tradition: "Panthi" },
      state_14: { id: "Qe6_Vy2hleg", url: "https://www.youtube-nocookie.com/embed/Qe6_Vy2hleg", title: "Chhattisgarh — Panthi Folk Showcase", tradition: "Panthi" }
    };

    // ── State Registry (Authoritative Geo, Monument & VR Map) ─
    const YUGMA_STATES = {
      maharashtra: { name: 'Maharashtra', nameHindi: 'महाराष्ट्र', heritage: 'Ajanta & Ellora Caves', tradition: 'Lavani', region: 'West', tagline: 'Sanctuary of Ancient Buddhist Frescoes & Monolithic Kailasa Temple', lat: 19.75, lng: 75.71, monumentLat: 20.55, monumentLng: 75.70, themeColor: '#e0231c', vrPath: 'ajanta-ellora-caves.html', videoUrl: 'https://www.youtube-nocookie.com/embed/Kh4MU4EonkI', youtubeId: 'Kh4MU4EonkI' },
      gujarat: { name: 'Gujarat', nameHindi: 'ગુજરાત', heritage: 'Rani ki Vav', tradition: 'Garba', region: 'West', tagline: 'The Inverted Subterranean Temple of Sacred Water', lat: 22.25, lng: 71.19, monumentLat: 23.85, monumentLng: 72.10, themeColor: '#c9a24a', vrPath: 'rani_ki_vav.html', videoUrl: 'https://www.youtube-nocookie.com/embed/gZjNpNuaPLw', youtubeId: 'gZjNpNuaPLw' },
      statue_of_unity: { name: 'Gujarat', nameHindi: 'ગુજરાત (નર્મદા)', heritage: 'Statue of Unity', heritageHindi: 'સ્ટેચ્યુ ઓફ યુનિટી (૧૮૨ મીટર)', tradition: 'Garba / National Unity', region: 'West', tagline: "World's Tallest Colossus (182m) Dedicated to Sardar Vallabhbhai Patel", lat: 21.8380, lng: 73.7191, monumentLat: 21.8380, monumentLng: 73.7191, themeColor: '#f59e0b', vrPath: 'statue_of_unity_3d.html', videoUrl: 'https://www.youtube-nocookie.com/embed/gZjNpNuaPLw', youtubeId: 'gZjNpNuaPLw', pinTag: "WORLD'S TALLEST COLOSSUS (182M)" },
      uttar_pradesh: { name: 'Uttar Pradesh', nameHindi: 'उत्तर प्रदेश', heritage: 'Taj Mahal', tradition: 'Kathak', region: 'North', tagline: 'The Monumental Epitaph of Translucent Marble & Eternal Love', lat: 26.84, lng: 80.94, monumentLat: 27.17, monumentLng: 78.04, themeColor: '#38bdf8', vrPath: 'taj_mahal_3d.html', videoUrl: 'https://www.youtube-nocookie.com/embed/hpKtU21PVu0', youtubeId: 'hpKtU21PVu0' },
      west_bengal: { name: 'West Bengal', nameHindi: 'पश्चिम बंगाल', heritage: 'Victoria Memorial', tradition: 'Baul', region: 'East', tagline: 'The Grand Marble Edifice of Kolkata’s Cultural Renaissance', lat: 22.98, lng: 87.85, monumentLat: 22.54, monumentLng: 88.34, themeColor: '#818cf8', vrPath: 'victoriamemorial-vr.html', videoUrl: 'https://www.youtube-nocookie.com/embed/QqJU_YpGeNs', youtubeId: 'QqJU_YpGeNs' },
      tamil_nadu: { name: 'Tamil Nadu', nameHindi: 'तमिलनाडु', heritage: 'Brihadisvara Temple', tradition: 'Bharatanatyam', region: 'South', tagline: 'The Granitic Wonder of Chola Imperial Architecture', lat: 11.12, lng: 78.65, monumentLat: 10.78, monumentLng: 79.13, themeColor: '#fbbf24', vrPath: 'brihadisvara-vr.html', videoUrl: 'https://www.youtube-nocookie.com/embed/2-9Lt01xY-k', youtubeId: '2-9Lt01xY-k' },
      karnataka: { name: 'Karnataka', nameHindi: 'कर्नाटक', heritage: 'Hampi', tradition: 'Yakshagana', region: 'South', tagline: 'The Boulder-Strewn Capital of the Vijayanagara Empire', lat: 15.31, lng: 75.71, monumentLat: 15.33, monumentLng: 76.46, themeColor: '#34d399', vrPath: 'hampi_precise.html', videoUrl: 'https://www.youtube-nocookie.com/embed/qUYWZXHL8JU', youtubeId: 'qUYWZXHL8JU' },
      kerala: { name: 'Kerala', nameHindi: 'केरल', heritage: 'Padmanabhapuram Palace', tradition: 'Theyyam', region: 'South', tagline: "Asia's Largest Monolithic Teak & Rosewood Palace", lat: 10.85, lng: 76.27, monumentLat: 8.25, monumentLng: 77.33, themeColor: '#f43f5e', vrPath: 'padmanabhapuram-vr.html', videoUrl: 'https://www.youtube-nocookie.com/embed/lnNieCUG4G4', youtubeId: 'lnNieCUG4G4' },
      odisha: { name: 'Odisha', nameHindi: 'ओडिशा', heritage: 'Konark Sun Temple', tradition: 'Odissi', region: 'East', tagline: 'The Black Pagoda: Cosmic Chariot of the Sun God', lat: 20.95, lng: 85.09, monumentLat: 19.88, monumentLng: 86.09, themeColor: '#a855f7', vrPath: 'odisha_precise.html', videoUrl: 'https://www.youtube-nocookie.com/embed/Uqmc0891L2U', youtubeId: 'Uqmc0891L2U' },
      andhra_pradesh: { name: 'Andhra Pradesh', nameHindi: 'आंध्र प्रदेश', heritage: 'Lepakshi Temple', tradition: 'Kuchipudi', region: 'South', tagline: 'The 16th-Century Hanging Pillar & Monolithic Nandi Wonder', lat: 13.8044, lng: 77.6053, monumentLat: 13.8044, monumentLng: 77.6053, themeColor: '#c99a3d', vrPath: 'lepakshi_temple_3d.html', videoUrl: 'https://www.youtube-nocookie.com/embed/ko5sKNuSLbs', youtubeId: 'ko5sKNuSLbs' },
      bihar: { name: 'Bihar', nameHindi: 'बिहार', heritage: 'Mahabodhi Temple', tradition: 'Madhubani / Mithila Art', region: 'East', tagline: "The Sacred Sanctuary of Buddha's Supreme Enlightenment", lat: 24.6961, lng: 84.9911, monumentLat: 24.6961, monumentLng: 84.9911, themeColor: '#d8b25a', vrPath: 'mahabodhi_explorer.html', videoUrl: 'https://www.youtube-nocookie.com/embed/FhvLY9ZnbzI', youtubeId: 'FhvLY9ZnbzI' },
      goa: { name: 'Goa', nameHindi: 'गोवा', heritage: 'Basilica of Bom Jesus', tradition: 'Fugdi', region: 'West', tagline: 'UNESCO Baroque Monument & Relic Shrine of St. Francis Xavier', lat: 15.2993, lng: 74.1240, monumentLat: 15.5009, monumentLng: 73.9116, themeColor: '#06b6d4', vrPath: 'bom_jesus_vr.html', videoUrl: 'https://www.youtube-nocookie.com/embed/EokuS_QbkEM', youtubeId: 'EokuS_QbkEM' },
      chhattisgarh: { name: 'Chhattisgarh', nameHindi: 'छत्तीसगढ़', heritage: 'Sirpur Lakshmana Temple', tradition: 'Panthi', region: 'Central', tagline: 'Sacred 7th-Century Terracotta Brick Sanctuary & Nagara Heritage', lat: 21.2787, lng: 81.8661, monumentLat: 21.3432, monumentLng: 82.1793, themeColor: '#f97316', vrPath: 'sirpur_lakshmana_vr.html', videoUrl: 'https://www.youtube-nocookie.com/embed/Qe6_Vy2hleg', youtubeId: 'Qe6_Vy2hleg' },
      delhi: { name: 'Delhi', nameHindi: 'दिल्ली (राष्ट्रीय राजधानी)', heritage: "Lotus Temple (Bahá'í House of Worship)", heritageHindi: 'कमल मंदिर (लोटस टेम्पल)', tradition: 'Kathak & Sufi Qawwali', region: 'North', tagline: 'Imperial Capital: Pristine Marble Lotus Temple, Historic Red Fort & Qutub Minar', lat: 28.6139, lng: 77.2090, monumentLat: 28.5535, monumentLng: 77.2588, themeColor: '#38bdf8', vrPath: 'lotustemple-vr.html', videoUrl: 'https://www.youtube-nocookie.com/embed/hpKtU21PVu0', youtubeId: 'hpKtU21PVu0', pinTag: 'MARBLE LOTUS OF PEACE' },
      rajgad_fort: { name: 'Maharashtra', nameHindi: 'महाराष्ट्र (राजगड)', heritage: 'Rajgad Fort', heritageHindi: 'राजगड किल्ला (स्वराज्याची राजधानी)', tradition: 'Powada & Lavani', region: 'West', tagline: "King of Forts & First Sovereign Capital of Chhatrapati Shivaji Maharaj's Hindavi Swarajya", lat: 18.2562, lng: 73.6828, monumentLat: 18.2562, monumentLng: 73.6828, themeColor: '#f97316', vrPath: 'rajgadfort-vr.html', videoUrl: 'https://www.youtube-nocookie.com/embed/Kh4MU4EonkI', youtubeId: 'Kh4MU4EonkI', pinTag: 'KING OF HILL FORTS' },
      punjab: { name: 'Punjab', nameHindi: 'पंजाब (अमृतसर)', heritage: 'Golden Temple (Harmandir Sahib)', tradition: 'Bhangra & Giddha', region: 'North', tagline: 'The Celestial Gilded Sanctuary of Amrit Sarovar & Eternal Divine Peace', lat: 31.6200, lng: 74.8765, monumentLat: 31.6200, monumentLng: 74.8765, themeColor: '#ffd700', vrPath: 'goldentemple-vr.html', videoUrl: 'https://www.youtube-nocookie.com/embed/hpKtU21PVu0', youtubeId: 'hpKtU21PVu0', pinTag: 'SACRED GOLDEN SANCTUARY' },
      madhya_pradesh: { name: 'Madhya Pradesh', nameHindi: 'मध्य प्रदेश (साँची)', heritage: 'Great Stupa of Sanchi', tradition: 'Matki & Karma', region: 'Central', tagline: "India's Oldest Stone Sanctuary Crowned with Ashokan Torana Gateways", lat: 23.4795, lng: 77.7397, monumentLat: 23.4795, monumentLng: 77.7397, themeColor: '#10b981', vrPath: 'sanchistupa-vr.html', videoUrl: 'https://www.youtube-nocookie.com/embed/hpKtU21PVu0', youtubeId: 'hpKtU21PVu0', pinTag: 'UNESCO ASHOKAN STUPA' },
      gateway_of_india: { name: 'Maharashtra', nameHindi: 'महाराष्ट्र (मुंबई)', heritage: 'Gateway of India', heritageHindi: 'गेटवे ऑफ़ इंडिया', tradition: 'Koli & Lavani', region: 'West', tagline: 'Indo-Saracenic Triumphal Basalt Arch Overlooking the Arabian Sea', lat: 18.9220, lng: 72.8347, monumentLat: 18.9220, monumentLng: 72.8347, themeColor: '#f59e0b', vrPath: 'gatewayofindia-vr.html', videoUrl: 'https://www.youtube-nocookie.com/embed/Kh4MU4EonkI', youtubeId: 'Kh4MU4EonkI', pinTag: 'HISTORIC HARBOR ARCH' },
      lotus_temple: { name: 'Delhi', nameHindi: 'दिल्ली (लोटस टेम्पल)', heritage: "Lotus Temple (Bahá'í House of Worship)", heritageHindi: 'कमल मंदिर (लोटस टेम्पल)', tradition: 'Kathak & Sufi Qawwali', region: 'North', tagline: 'Pristine White Marble Blossom of Global Unity & Universal Meditation', lat: 28.5535, lng: 77.2588, monumentLat: 28.5535, monumentLng: 77.2588, themeColor: '#38bdf8', vrPath: 'lotustemple-vr.html', videoUrl: 'https://www.youtube-nocookie.com/embed/hpKtU21PVu0', youtubeId: 'hpKtU21PVu0', pinTag: 'MARBLE LOTUS OF PEACE' },
    };

    // Enrich state metadata with rich cultural datasets if loaded
    if (window.YUGMA_STATES_DATA) {
      Object.keys(YUGMA_STATES).forEach(k => {
        const cult = window.YUGMA_STATES_DATA[k];
        if (cult) {
          YUGMA_STATES[k].cultural = cult;
          if (!YUGMA_STATES[k].tradition && cult.tradition) YUGMA_STATES[k].tradition = cult.tradition;
          if (cult.videoUrl) YUGMA_STATES[k].videoUrl = cult.videoUrl;
          if (cult.youtubeId) YUGMA_STATES[k].youtubeId = cult.youtubeId;
        }
      });
    }

    const GEOJSON_URLS = [
      'https://raw.githubusercontent.com/geohacker/india/master/state/india_state.geojson',
      'https://raw.githubusercontent.com/Subhash9325/GeoJson-Data-of-Indian-States/master/Indian_States',
      'https://raw.githubusercontent.com/datameet/maps/master/States/states.geojson',
    ];

    const STATE_COLORS = [
      '#e0231c', '#c9a24a', '#ff5a3c', '#38bdf8', '#818cf8',
      '#fbbf24', '#34d399', '#f43f5e', '#a855f7', '#059669',
      '#0d9488', '#9333ea', '#16a34a', '#dc2626', '#7c3aed'
    ];
    const colorMap = new Map();
    let colorIdx = 0;

    function getColor(name) {
      const key = normalizeKey(name);
      if (YUGMA_STATES[key] && YUGMA_STATES[key].themeColor) return YUGMA_STATES[key].themeColor;
      if (!colorMap.has(name)) { colorMap.set(name, STATE_COLORS[colorIdx++ % STATE_COLORS.length]); }
      return colorMap.get(name);
    }

    function getStateName(feat) {
      const p = feat.properties || {};
      return p.NAME_1 || p.name || p.NAME || p.st_nm || p.state || p.ST_NM || p.dtname || 'Region';
    }

    function hexToRgba(hex, a) {
      if (!hex || hex[0] !== '#') return `rgba(201,162,74,${a})`;
      const r = parseInt(hex.slice(1, 3), 16), g = parseInt(hex.slice(3, 5), 16), b = parseInt(hex.slice(5, 7), 16);
      return `rgba(${r},${g},${b},${a})`;
    }

    function normalizeKey(name) {
      if (!name) return '';
      const raw = String(name).toLowerCase().trim();
      const s = raw.replace(/[^a-z0-9]/g, '_');
            if (s === 'punjab' || s.includes('punjab') || s.includes('amritsar')) return 'punjab';
      if (s === 'madhya_pradesh' || s.includes('sanchi') || (s.includes('madhya') && !s.includes('uttar'))) return 'madhya_pradesh';
      if (s === 'gateway_of_india' || s.includes('gateway')) return 'gateway_of_india';
      if (s === 'lotus_temple' || s.includes('lotus')) return 'lotus_temple';
      if (s === 'rajgad_fort' || s.includes('rajgad')) return 'rajgad_fort';
      if (s === 'delhi' || s.includes('delhi') || s.includes('nct')) return 'delhi';
      if (s === 'statue_of_unity' || s.includes('unity') || s.includes('statue')) return 'statue_of_unity';
      if (s === 'state_01' || s === 'state_1' || s.includes('maha')) return 'maharashtra';
      if (s === 'state_02' || s === 'state_2' || s.includes('guja')) return 'gujarat';
      if (s === 'state_03' || s === 'state_3' || s.includes('raja')) return 'rajasthan';
      if (s === 'state_04' || s === 'state_4' || ((s.includes('uttar') || s.includes('uttar_p')) && !s.includes('uttarakhand') && !s.includes('uttaran'))) return 'uttar_pradesh';
      if (s === 'state_05' || s === 'state_5' || s.includes('bengal')) return 'west_bengal';
      if (s === 'state_06' || s === 'state_6' || s.includes('tamil')) return 'tamil_nadu';
      if (s === 'state_07' || s === 'state_7' || s.includes('karna')) return 'karnataka';
      if (s === 'state_08' || s === 'state_8' || s.includes('keral')) return 'kerala';
      if (s === 'state_09' || s === 'state_9' || s.includes('odis') || s.includes('oris')) return 'odisha';
      if (s === 'state_10' || s.includes('assa')) return 'assam';
      if (s === 'state_11' || s.includes('andhra') || s.includes('lepakshi')) return 'andhra_pradesh';
      if (s === 'state_12' || s.includes('bihar')) return 'bihar';
      if (s === 'state_13' || s.includes('goa')) return 'goa';
      if (s === 'state_14' || s.includes('chhattisgarh')) return 'chhattisgarh';
      if (s.includes('uttarakhand') || s.includes('uttaran')) return 'uttarakhand';
      if (s.includes('tripura')) return 'tripura';
      return s;
    }

    // ── Globe Global State ───────────────────────────────────
    let globe = null;
    let allFeatures = [];
    let hoveredState = null;
    let selectedState = null;
    let isUserInteracting = false;
    let isAutoRotating = false; // Static by default
    let currentPolygonAlpha = 0; // Starts at 0 (invisible on hero)

    const globeWrapper = document.getElementById('globe-wrapper');
    const globeHud = document.getElementById('globe-hud');
    const heroContent = document.getElementById('hero-content-block');
    const scrollHint = document.getElementById('scroll-hint');

    // ── High-Performance Polygon Opacity Caching (Zero Recursive Scene Traversal) ─
    let cachedPolygonMaterials = [];
    function cachePolygonMaterials() {
      if (!globe) return;
      const scene = globe.scene ? globe.scene() : null;
      if (!scene) return;
      cachedPolygonMaterials = [];
      scene.traverse(obj => {
        if (obj.isMesh && obj.__data && (obj.__data.properties || obj.__data.geometry || obj.__data.type === 'Feature')) {
          if (obj.material) {
            const mats = Array.isArray(obj.material) ? obj.material : [obj.material];
            mats.forEach(m => {
              if (cachedPolygonMaterials.indexOf(m) === -1) {
                cachedPolygonMaterials.push(m);
              }
            });
          }
        }
      });
    }

    function updatePolygonSceneOpacity(alpha) {
      if (cachedPolygonMaterials.length === 0) {
        cachePolygonMaterials();
      }
      const targetOpacity = Math.min(1, alpha * 0.9);
      const isVis = alpha > 0.01;
      for (let i = 0; i < cachedPolygonMaterials.length; i++) {
        const m = cachedPolygonMaterials[i];
        m.transparent = true;
        m.opacity = targetOpacity;
        m.visible = isVis;
      }
    }

    // ── Initialize Globe ─────────────────────────────────────
    async function initGlobe() {
      try {
        const container = document.getElementById('globeViz');
        if (!container || typeof Globe === 'undefined') {
          console.warn('[YUGMA] Globe.gl not loaded or container missing');
          dismissPreloader();
          return;
        }

        const W = window.innerWidth;
        const H = window.innerHeight;

        globe = Globe({ animateIn: false })(container)
          .width(W)
          .height(H)
          .globeImageUrl('https://unpkg.com/three-globe/example/img/earth-blue-marble.jpg')
          .bumpImageUrl('https://unpkg.com/three-globe/example/img/earth-topology.png')
          .backgroundImageUrl('https://unpkg.com/three-globe/example/img/night-sky.png')
          .showAtmosphere(true)
          .atmosphereColor('rgba(65, 185, 255, 0.45)')
          .atmosphereAltitude(0.24)
          .polygonAltitude(feat => {
            const name = getStateName(feat);
            if (name === selectedState) return 0.048;
            if (name === hoveredState) return 0.038;
            return 0.006;
          })
          .polygonCapColor(feat => {
            const name = getStateName(feat);
            const c = getColor(name);
            if (name === selectedState) return hexToRgba(c, 0.22);
            if (name === hoveredState) return hexToRgba(c, 0.14);
            return 'rgba(0, 0, 0, 0)'; // Transparent: No solid color overlay on states
          })
          .polygonSideColor(feat => {
            const name = getStateName(feat);
            const c = getColor(name);
            if (name === selectedState) return hexToRgba(c, 0.6);
            if (name === hoveredState) return hexToRgba(c, 0.45);
            return 'rgba(255, 255, 255, 0.02)';
          })
          .polygonStrokeColor(feat => {
            const name = getStateName(feat);
            if (name === selectedState) return '#ffffff';
            if (name === hoveredState) return '#ffd700'; // Dynamic bright gold border highlight on drag/hover
            return 'rgba(255, 255, 255, 0.35)'; // Clean subtle border
          })
          .polygonLabel(feat => {
            if (currentPolygonAlpha < 0.3) return '';
            const name = getStateName(feat);
            const c = getColor(name);
            const key = normalizeKey(name);
            const meta = YUGMA_STATES[key];
            return `
              <div class="glob-tip">
                <div class="glob-tip-head">
                  <span class="glob-tip-swatch" style="background:${c}"></span>
                  <span class="glob-tip-name">${name}</span>
                </div>
                <div class="glob-tip-meta">
                  ${meta ? `🏛 <b>${meta.heritage}</b><br>🎭 <b>${meta.tradition}</b>` : `Sacred Cultural Region`}
                </div>
              </div>
            `;
          })
          .onPolygonHover(hoverD => {
            if (currentPolygonAlpha < 0.15) return;
            const prev = hoveredState;
            hoveredState = hoverD ? getStateName(hoverD) : null;
            if (prev !== hoveredState) {
              globe.polygonAltitude(globe.polygonAltitude());
              globe.polygonCapColor(globe.polygonCapColor());
              globe.polygonSideColor(globe.polygonSideColor());
              globe.polygonStrokeColor(globe.polygonStrokeColor());
            }
          })
          .onPolygonClick(feat => {
            if (!feat || currentPolygonAlpha < 0.2) return;
            isUserInteracting = true;
            if (typeof closeARVRModal === 'function') closeARVRModal();
            selectStateByGlobeName(getStateName(feat));
          });

        // Controls - static globe on hero (auto-rotate disabled)
        const ctrl = globe.controls ? globe.controls() : null;
        if (ctrl) {
          ctrl.autoRotate = false;
          ctrl.autoRotateSpeed = -0.55;
          ctrl.enableDamping = true;
          ctrl.dampingFactor = 0.08;
          ctrl.zoomSpeed = 0.9;
          ctrl.minDistance = 110;
          ctrl.maxDistance = 900;
        }

        // Cap pixel ratio for silky 60-120fps performance on high-DPI/Retina displays
        if (globe.renderer) {
          const r = globe.renderer();
          if (r && r.setPixelRatio) {
            r.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.25));
          }
        }

        // Initial static orbital hero POV
        globe.pointOfView({ lat: 10, lng: 55, altitude: 0.92 }, 0);

        // Resize handler with debouncing
        let resizeTimer;
        window.addEventListener('resize', () => {
          clearTimeout(resizeTimer);
          resizeTimer = setTimeout(() => {
            if (globe && container) {
              globe.width(window.innerWidth).height(window.innerHeight);
            }
          }, 120);
        }, { passive: true });

        // Controls and zoom state are efficiently driven by the unified master animation loop

        // Load boundaries & Pins
        await loadBoundaries();
        buildPins();

        console.log('[YUGMA] Orbital Globe Engine initialized successfully ✓');
      } catch (err) {
        console.error('[YUGMA] Globe initialization error:', err);
      } finally {
        dismissPreloader();
      }
    }

    async function loadBoundaries() {
      for (const url of GEOJSON_URLS) {
        try {
          const res = await fetch(url);
          if (!res.ok) continue;
          const data = await res.json();
          if (data && data.features && data.features.length > 0) {
            allFeatures = data.features;
            globe.polygonsData(allFeatures);
            console.log('[YUGMA] GeoJSON loaded from:', url);
            setTimeout(() => {
              cachePolygonMaterials();
              updatePolygonSceneOpacity(0);
            }, 150);
            return;
          }
        } catch (e) {
          console.warn('[YUGMA] GeoJSON mirror fallback:', url);
        }
      }
    }

    // ── Region Mapping Helper ───────────────────────────────
    function getRegionForStateKey(key) {
      if (!key) return 'Other';
      if (['maharashtra', 'gujarat', 'statue_of_unity', 'rajgad_fort', 'gateway_of_india'].includes(key)) return 'West';
      if (['rajasthan', 'uttar_pradesh', 'uttarakhand', 'delhi', 'punjab', 'lotus_temple'].includes(key)) return 'North';
      if (['tamil_nadu', 'karnataka', 'kerala', 'andhra_pradesh'].includes(key)) return 'South';
      if (['west_bengal', 'odisha', 'assam', 'tripura', 'bihar'].includes(key)) return 'East';
      if (['chhattisgarh', 'madhya_pradesh'].includes(key)) return 'Central';
      return 'Other';
    }

    function buildPins() {
      const pins = Object.keys(YUGMA_STATES).map(key => {
        const s = YUGMA_STATES[key];
        const stateName = s.name || s.state || key;
        const region = s.region || getRegionForStateKey(key) || 'Other';
        return {
          id: key,
          name: stateName,
          heritage: s.heritage || `${stateName} Monument`,
          region: region,
          lat: s.monumentLat || s.lat || 20.0,
          lng: s.monumentLng || s.lng || 78.0,
          color: s.themeColor || '#c9a24a',
          pinTag: s.pinTag || (key === 'statue_of_unity' ? "WORLD'S TALLEST COLOSSUS (182M)" : 'SACRED MONUMENT')
        };
      });

      globe
        .htmlElementsData(pins)
        .htmlElement(d => {
          const el = document.createElement('div');
          el.className = 'globe-state-pin';
          el.dataset.id = d.id;
          el.dataset.region = d.region;
          el.style.setProperty('--pin-color', d.color);
          const safeName = (d.name || 'HERITAGE').toUpperCase();
          const safeHeritage = d.heritage || 'Sacred Heritage Site';
          const safeTag = d.pinTag || 'SACRED MONUMENT';
          el.innerHTML = `
            <div class="pin-card">
              <div class="pin-tag">${safeTag}</div>
              <div class="pin-monument">${safeHeritage}</div>
              <div class="pin-state">${safeName}</div>
            </div>
            <div class="pin-beacon">
              <span class="pin-dot"></span>
              <span class="pin-wave"></span>
            </div>
          `;
          el.addEventListener('click', e => {
            e.stopPropagation();
            isUserInteracting = true;
            // 1. Dismiss/remove the left side drawer if open
            closeStateDrawer();
            // 2. Open the AR/VR experience box directly
            openARVRModal(d.id);
          });
          return el;
        });
    }

    // ════════════════════════════════════════════════════════════
    //  HIGH-PERFORMANCE SCROLL INTERPOLATION CONTROLLER
    //  - Smooth 60-120fps hardware-accelerated transform
    //  - Single CSS variable updates for pin opacity
    //  - Zero CPU polygon re-generation
    // ════════════════════════════════════════════════════════════

    let currentProgress = 0;
    let targetProgress = 0;
    let lastAppliedProgress = -1;
    let isScrollDrivenPOV = true;

    function lerp(start, end, factor) {
      return start + (end - start) * factor;
    }

    function updateScrollProgress() {
      const scrollY = window.scrollY || window.pageYOffset;
      const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      targetProgress = Math.min(1, Math.max(0, scrollY / maxScroll));
    }

    // ── Layout-Thrash-Free HUD Title Tracking ───────────────
    let presTitleOffsetTop = 0;
    function updatePresTitleOffset() {
      const presTitle = document.querySelector('.preservation-title') || document.querySelector('.preservation-header');
      if (presTitle) {
        const rect = presTitle.getBoundingClientRect();
        presTitleOffsetTop = rect.top + (window.scrollY || window.pageYOffset);
      }
    }

    function updateHudVisibility() {
      if (!globeHud) return;

      const scrollY = window.scrollY || window.pageYOffset;
      if (presTitleOffsetTop === 0) {
        updatePresTitleOffset();
      }

      // Pure arithmetic comparison: 0 DOM layout reflows!
      const reachedPreservationTitle = presTitleOffsetTop > 0
        ? (scrollY + window.innerHeight * 0.85 >= presTitleOffsetTop)
        : false;

      const isFocusingIndiaMap = currentProgress > 0.28 || scrollY > window.innerHeight * 0.45;

      if (reachedPreservationTitle) {
        if (!globeHud.classList.contains('preservation-hidden')) {
          globeHud.classList.add('preservation-hidden');
          globeHud.classList.remove('visible');
          document.body.classList.add('in-preservation');
        }
      } else if (isFocusingIndiaMap) {
        if (!globeHud.classList.contains('visible') || globeHud.classList.contains('preservation-hidden')) {
          globeHud.classList.remove('preservation-hidden');
          document.body.classList.remove('in-preservation');
          globeHud.classList.add('visible');
        }
      } else {
        if (globeHud.classList.contains('visible')) {
          globeHud.classList.remove('preservation-hidden');
          document.body.classList.remove('in-preservation');
          globeHud.classList.remove('visible');
        }
      }
    }

    window.addEventListener('scroll', () => {
      updateScrollProgress();
      if (targetProgress < 0.85) {
        isUserInteracting = false;
        isScrollDrivenPOV = true;
      }
      updateHudVisibility();
    }, { passive: true });

    let lastAppliedPinAlpha = null;
    let lastPinsPointer = null;
    let lastInteractiveMode = null;
    let lastZoomedState = null;
    let zoomCheckCounter = 0;

    (function unifiedMasterLoop() {
      requestAnimationFrame(unifiedMasterLoop);

      // 0. Skip processing entirely if user has backgrounded the tab to save GPU/CPU
      if (document.hidden) return;

      // 1. Always update OrbitControls momentum/damping smoothly
      if (globe && globe.controls) {
        globe.controls().update();
      }

      // 2. Throttled real-time zoom detection (evaluated every 6 frames = ~10Hz)
      zoomCheckCounter++;
      if (zoomCheckCounter % 6 === 0 && globe && globeWrapper) {
        const pov = globe.pointOfView();
        const isZoomed = !!(pov && typeof pov.altitude === 'number' && pov.altitude <= 1.35);
        if (isZoomed !== lastZoomedState) {
          lastZoomedState = isZoomed;
          globeWrapper.classList.toggle('globe-zoomed-in', isZoomed);
        }
      }

      // 3. Smooth lerp for scroll-driven camera & scene transitions
      const diff = targetProgress - currentProgress;
      if (Math.abs(diff) < 0.0003 && Math.abs(currentProgress - lastAppliedProgress) < 0.0003) {
        return; // Idle when no scroll movement - zero CPU/GPU overhead!
      }

      currentProgress += diff * 0.095;
      const p = currentProgress; // 0 (Hero) to 1 (Explorer)
      lastAppliedProgress = p;

      // 3a. Interactive mode and Pin opacity on full-screen wrapper across all scenes
      if (globeWrapper) {
        // Pins visible in Scene 3 (Explorer), smoothly dimming in Scene 4 (Preservation)
        let pinAlpha = 0;
        if (p <= 0.62) {
          pinAlpha = Math.max(0, Math.min(1, (p - 0.22) / 0.35));
        } else {
          pinAlpha = Math.max(0, 1 - (p - 0.62) / 0.22);
        }

        const pinAlphaStr = pinAlpha.toFixed(2);
        if (pinAlphaStr !== lastAppliedPinAlpha) {
          lastAppliedPinAlpha = pinAlphaStr;
          globeWrapper.style.setProperty('--pins-opacity', pinAlphaStr);
        }
        const pointerVal = pinAlpha > 0.4 ? 'auto' : 'none';
        if (pointerVal !== lastPinsPointer) {
          lastPinsPointer = pointerVal;
          globeWrapper.style.setProperty('--pins-pointer', pointerVal);
        }

        const isInteractive = p > 0.45 && p < 0.75;
        if (isInteractive !== lastInteractiveMode) {
          lastInteractiveMode = isInteractive;
          globeWrapper.classList.toggle('interactive-mode', isInteractive);
        }
      }

      // 3b. Pure 3D Camera POV Interpolation across 4 scenes (Centered Earth in Hero & Preservation)
      if (globe && isScrollDrivenPOV && !isUserInteracting) {
        let curLat, curLng, curAlt;
        if (p <= 0.60) {
          // Hero (0.0) -> Explorer (0.60)
          const sp = p / 0.60;
          curLat = lerp(10, 21, sp);
          curLng = lerp(55, 78.96, sp);
          curAlt = lerp(0.92, 2.1, sp);
        } else {
          // Explorer (0.60) -> Preservation (1.0)
          const sp = (p - 0.60) / 0.40;
          curLat = lerp(21, 20.5, sp);
          curLng = 78.96;
          curAlt = lerp(2.1, 1.85, sp);
        }
        globe.pointOfView({ lat: curLat, lng: curLng, altitude: curAlt }, 0);
      }

      // 3c. Indian State Boundaries (Polygon Opacity)
      let targetPolyAlpha = 0;
      if (p <= 0.62) {
        targetPolyAlpha = Math.max(0, Math.min(1, (p - 0.20) / 0.35));
      } else {
        targetPolyAlpha = Math.max(0, 1 - (p - 0.62) / 0.22);
      }
      if (Math.abs(currentPolygonAlpha - targetPolyAlpha) > 0.04) {
        currentPolygonAlpha = targetPolyAlpha;
        updatePolygonSceneOpacity(targetPolyAlpha);
      }

      // 3d. Hero Content Fade
      if (heroContent) {
        const heroAlpha = Math.max(0, 1 - p * 2.5);
        const heroTranslate = -p * 60;
        heroContent.style.opacity = heroAlpha.toFixed(2);
        heroContent.style.transform = `translate3d(0, ${heroTranslate.toFixed(1)}px, 0)`;
      }

      if (scrollHint) {
        scrollHint.style.opacity = Math.max(0, 1 - p * 3.5).toFixed(2);
      }

      // 3e. Floating HUD Toolbar Fade (Visible during India map view, hidden on scrolling to Preservation title)
      updateHudVisibility();
    })();

    // Ensure HUD visibility and preservation offset are dynamically monitored on resize and load
    window.addEventListener('resize', () => {
      updatePresTitleOffset();
      updateHudVisibility();
    }, { passive: true });
    window.addEventListener('load', () => {
      updatePresTitleOffset();
      updateHudVisibility();
    }, { passive: true });
    setTimeout(updatePresTitleOffset, 800);
    updateHudVisibility();

    // ── State Selection & Navigation ─────────────────────────
    function selectStateByGlobeName(name) {
      selectStateById(normalizeKey(name), name);
    }

    function selectStateById(id, displayName) {
      let s = YUGMA_STATES[id] || (window.YUGMA_STATES_DATA ? window.YUGMA_STATES_DATA[id] : null);
      if (!s) {
        const rawName = displayName || id || 'India';
        const formattedName = rawName.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
        s = {
          name: formattedName,
          nameHindi: '',
          heritage: `${formattedName} Heritage Site`,
          tradition: 'Folk Tradition',
          tagline: `Explore the vibrant living culture and sacred architecture of ${formattedName}.`,
          lat: 22.0,
          lng: 78.0,
          themeColor: getColor(rawName),
          vrPath: '',
        };
      }

      selectedState = s.name;
      isUserInteracting = true;
      isScrollDrivenPOV = false;

      // Scroll to Scene 3 if at top
      if (window.scrollY < window.innerHeight * 0.8) {
        const expEl = document.getElementById('explorer');
        if (expEl) expEl.scrollIntoView({ behavior: 'smooth' });
      }

      // Highlight Polygon with dynamic border & elevation
      globe.polygonAltitude(d => {
        const n = getStateName(d);
        return (n === s.name || normalizeKey(n) === id) ? 0.048 : 0.006;
      });
      globe.polygonCapColor(globe.polygonCapColor());
      globe.polygonSideColor(globe.polygonSideColor());
      globe.polygonStrokeColor(globe.polygonStrokeColor());

      // Camera fly-to state
      const ctrl = globe.controls();
      if (ctrl) ctrl.autoRotate = false;

      globe.pointOfView({
        lat: s.monumentLat || s.lat || 22,
        lng: s.monumentLng || s.lng || 78,
        altitude: 0.85
      }, 1200);

      // Play audio cue
      if (window.yugmaAudio) {
        window.yugmaAudio.playGhungroo();
      }

      // Open Left-Side State Info & Heritage Sites Drawer
      openStateDrawer(id, s);
    }
    window.selectStateById = selectStateById;
    window.selectStateByGlobeName = selectStateByGlobeName;

    function resetToIndia() {
      selectedState = null;
      hoveredState = null;
      isUserInteracting = false;
      document.querySelectorAll('.globe-state-pin').forEach(pin => {
        pin.style.display = 'flex';
      });
      if (globe) {
        globe.polygonAltitude(() => 0.006);
        globe.polygonCapColor(globe.polygonCapColor());
        globe.polygonSideColor(globe.polygonSideColor());
        globe.polygonStrokeColor(globe.polygonStrokeColor());
        const ctrl = globe.controls ? globe.controls() : null;
        if (ctrl) ctrl.autoRotate = isAutoRotating;
        globe.pointOfView({ lat: 21, lng: 78.96, altitude: 2.1 }, 1000);
      }
      closeStateDrawer();
      closeARVRModal();
    }

    // ── State Languages & Regional Cultural Localization ────
    const STATE_LANG_CONFIG = {
      "maharashtra": {
        "name": "Marathi",
        "native": "मराठी",
        "stateNameReg": "महाराष्ट्र",
        "capitalReg": "मुंबई",
        "capitalLabelReg": "राजधानी",
        "regionReg": "पश्चिम भारत // पावन भूमी",
        "taglineReg": "प्राचीन बौद्ध भित्तिचित्रे, लेणी आणि भव्य कैलास मंदिराची पावन भूमी.",
        "traditionReg": "लावणी",
        "heritageReg": "अजिंठा व वेरूळ लेणी",
        "traditionLabelReg": "🎭 लोकपरंपरा",
        "heritageLabelReg": "🏛 मुख्य स्मारक",
        "heritageDescReg": "अजिंठा व वेरूळ लेणी ३६०° आभासी वास्तव (AR/VR) मध्ये प्रत्यक्ष अनुभवा.",
        "traditionDescReg": "महाराष्ट्राची समृद्ध लोकपरंपरा लावणी नृत्य व ढोलकीच्या तालावर अनुभवा.",
        "enterVrLabel": "360° AR/VR दालनात प्रवेश करा",
        "openTradLabel": "3D नृत्य कला दालन",
        "openBookLabel": "डिजिटल ऐतिहासिक ग्रंथ",
        "bookTitleReg": "ऐतिहासिक दस्तऐवज संग्रह",
        "bookDescReg": "प्राचीन हस्तलिखिते, शिलालेख आणि युनेस्को नोंदी वाचा.",
        "sitesHeaderReg": "🏛 पावन ऐतिहासिक वारसा स्थळे",
        "sitesCountLabelReg": "स्मारके",
        "launchVrLabelReg": "🥽 360° AR/VR सुरू करा",
        "returnBtnReg": "← पृथ्वीवर परत या"
      },
      "gujarat": {
        "name": "Gujarati",
        "native": "ગુજરાતી",
        "stateNameReg": "ગુજરાત",
        "capitalReg": "ગાંધીનગર",
        "capitalLabelReg": "રાજધાની",
        "regionReg": "પશ્ચિમ ભારત // પવિત્ર ભૂમિ",
        "taglineReg": "પવિત્ર જળનું ઊંધું શિલ્પાયિત મંદિર અને સોલંકી વાસ્તુશૈલીની ધરોહર.",
        "traditionReg": "ગરબા",
        "heritageReg": "રાણકી વાવ",
        "traditionLabelReg": "🎭 લોકપરંપરા",
        "heritageLabelReg": "🏛 મુખ્ય સ્મારક",
        "heritageDescReg": "પાટણની વર્લ્ડ હેરિટેજ રાણકી વાવને ૩૬૦° AR/VR માં માણો.",
        "traditionDescReg": "ગુજરાતની લોકનૃત્ય પરંપરા ગરબા અને નવરાત્રીનો ઉલ્લાસ માણો.",
        "enterVrLabel": "360° AR/VR પોર્ટલમાં પ્રવેશો",
        "openTradLabel": "3D નૃત્ય સ્ટુડિયો",
        "openBookLabel": "ડિજિટલ ગ્રંથ ખોલો",
        "bookTitleReg": "ઐતિહાસિક હસ્તપ્રત સંગ્રહ",
        "bookDescReg": "પ્રાચીન દસ્તાવેજો, શિલાલેખો અને યુનેસ્કો રેકોર્ડ્સ વાંચો.",
        "sitesHeaderReg": "🏛 પવિત્ર ઐતિહાસિક વારસો",
        "sitesCountLabelReg": "સ્મારકો",
        "launchVrLabelReg": "🥽 360° AR/VR શરૂ કરો",
        "returnBtnReg": "← પૃથ્વી પર પાછા જાઓ"
      },
      "rajasthan": {
        "name": "Rajasthani",
        "native": "राजस्थानी",
        "stateNameReg": "राजस्थान",
        "capitalReg": "जयपुर",
        "capitalLabelReg": "राजधानी",
        "regionReg": "उत्तर भारत // वीरों की भूमि",
        "taglineReg": "शीश महलों, अरावली के विशाल दुर्गों और अमर शौर्य की पावन धरा.",
        "traditionReg": "घूमर",
        "heritageReg": "आमेर दुर्ग एवं महल",
        "traditionLabelReg": "🎭 लोकपरंपरा",
        "heritageLabelReg": "🏛 मुख्य स्मारक",
        "heritageDescReg": "आमेर के शीश महल और राजसी राजपूत वैभव को ३६०° AR/VR में देखें.",
        "traditionDescReg": "पारंपरिक राजपूती घूमर नृत्य और लोक वाद्यों की मधुर तान का अनुभव करें.",
        "enterVrLabel": "360° AR/VR में प्रवेश करें",
        "openTradLabel": "3D नृत्य स्टूडियो खोलें",
        "openBookLabel": "डिजिटल ग्रंथ पढ़ें",
        "bookTitleReg": "ऐतिहासिक पाण्डुलिपि संग्रह",
        "bookDescReg": "राजपूत इतिहास, शिलालेख और यूनेस्को दस्तावेज़ पढ़ें.",
        "sitesHeaderReg": "🏛 पावन ऐतिहासिक धरोहरें",
        "sitesCountLabelReg": "स्मारक",
        "launchVrLabelReg": "🥽 360° AR/VR शुरू करें",
        "returnBtnReg": "← ग्लोब पर वापस लौटें"
      },
      "uttar_pradesh": {
        "name": "Hindi",
        "native": "हिन्दी",
        "stateNameReg": "उत्तर प्रदेश",
        "capitalReg": "लखनऊ",
        "capitalLabelReg": "राजधानी",
        "regionReg": "उत्तर भारत // गंगा-जमुनी तहज़ीब",
        "taglineReg": "धवल संगमरमर के ताज, पावन काशी घाट और शाश्वत सांस्कृतिक चेतना.",
        "traditionReg": "कथक",
        "heritageReg": "ताज महल",
        "traditionLabelReg": "🎭 शास्त्रीय परंपरा",
        "heritageLabelReg": "🏛 मुख्य स्मारक",
        "heritageDescReg": "विश्व के आश्चर्य मकराना संगमरमर के ताज महल को ३६०° AR/VR में देखें.",
        "traditionDescReg": "कथक नृत्य के लयबद्ध तत्कार, भाव और ताल का सजीव अनुभव करें.",
        "enterVrLabel": "360° AR/VR में प्रवेश करें",
        "openTradLabel": "3D कथक स्टूडियो",
        "openBookLabel": "डिजिटल धरोहर ग्रंथ",
        "bookTitleReg": "प्राचीन पांडुलिपि अभिलेखागार",
        "bookDescReg": "मुगल कालीन इतिहास, काशी और सारनाथ के ऐतिहासिक ग्रंथ पढ़ें.",
        "sitesHeaderReg": "🏛 पावन ऐतिहासिक धरोहरें",
        "sitesCountLabelReg": "स्मारक",
        "launchVrLabelReg": "🥽 360° AR/VR शुरू करें",
        "returnBtnReg": "← ग्लोब पर वापस लौटें"
      },
      "west_bengal": {
        "name": "Bengali",
        "native": "বাংলা",
        "stateNameReg": "পশ্চিমবঙ্গ",
        "capitalReg": "কলকাতা",
        "capitalLabelReg": "রাজধানী",
        "regionReg": "পূর্ব ভারত // সংস্কৃতির পুণ্যভূমি",
        "taglineReg": "কলকাতার মার্বেল সৌধ, পোড়ামাটির মন্দির ও জীবন্ত বাউল সংগীতের পুণ্যভূমি.",
        "traditionReg": "বাউল সংগীত",
        "heritageReg": "ভিক্টোরিয়া মেমোরিয়াল",
        "traditionLabelReg": "🎭 লোকপরম্পরা",
        "heritageLabelReg": "🏛 প্রধান সৌধ",
        "heritageDescReg": "কলকাতার ভিক্টোরিয়া মেমোরিয়াল সৌধকে ৩৬০° AR/VR ভার্চুয়াল অভিজ্ঞতায় দেখুন.",
        "traditionDescReg": "একতারা ও বাউলের আধ্যাত্মিক সুফি লোকগানের জীবন্ত অভিজ্ঞতা উপভোগ করুন.",
        "enterVrLabel": "৩৬০° AR/VR পোর্টালে প্রবেশ করুন",
        "openTradLabel": "৩ডি সংগীত ও শিল্পকলা স্টুডিও",
        "openBookLabel": "ডিজিটাল ঐতিহ্য গ্রন্থ",
        "bookTitleReg": "ঐতিহাসিক পাণ্ডুলিপি সংগ্রহশালা",
        "bookDescReg": "বাংলার সাহিত্য, ইতিহাস এবং টেরাকোটা স্থাপত্যের নথি পড়ুন.",
        "sitesHeaderReg": "🏛 পবিত্র ঐতিহাসিক ঐতিহ্য ক্ষেত্র",
        "sitesCountLabelReg": "স্মারক",
        "launchVrLabelReg": "🥽 ৩৬০° AR/VR শুরু করুন",
        "returnBtnReg": "← গ্লোবে ফিরে যান"
      },
      "tamil_nadu": {
        "name": "Tamil",
        "native": "தமிழ்",
        "stateNameReg": "தமிழ்நாடு",
        "capitalReg": "சென்னை",
        "capitalLabelReg": "தலைநகரம்",
        "regionReg": "தென் பாரதம் // திராவிட மரபு",
        "taglineReg": "சோழப் பேரரசின் மாபெரும் கருங்கல் கோபுரங்களும் பரதநாட்டிய நாதமும்.",
        "traditionReg": "பரதநாட்டியம்",
        "heritageReg": "தஞ்சைப் பெருவுடையார் கோயில்",
        "traditionLabelReg": "🎭 பாரம்பரியக் கலை",
        "heritageLabelReg": "🏛 முதன்மைச் சின்னம்",
        "heritageDescReg": "தஞ்சைப் பெருவுடையார் கோயிலின் பிரம்மாண்ட விமானத்தை 360° AR/VR இல் காண்க.",
        "traditionDescReg": "செம்மொழித் தமிழின் செவ்வியல் பரதநாட்டிய முத்திரைகளையும் தாளங்களையும் காண்க.",
        "enterVrLabel": "360° AR/VR தளத்தில் நுழைக",
        "openTradLabel": "3D நாட்டிய அரங்கம்",
        "openBookLabel": "மின் நூலகம் திறக்க",
        "bookTitleReg": "வரலாற்றுச் சுவடிகள் காப்பகம்",
        "bookDescReg": "சோழர் காலச் செப்பேடுகள், கல்வெட்டுகள் மற்றும் கோயில் ஆவணங்களைப் படிக்க.",
        "sitesHeaderReg": "🏛 புனித வரலாற்றுச் சின்னங்கள்",
        "sitesCountLabelReg": "தளங்கள்",
        "launchVrLabelReg": "🥽 360° AR/VR தொடங்குக",
        "returnBtnReg": "← பூமிக்குத் திரும்புக"
      },
      "karnataka": {
        "name": "Kannada",
        "native": "ಕನ್ನಡ",
        "stateNameReg": "ಕರ್ನಾಟಕ",
        "capitalReg": "ಬೆಂಗಳೂರು",
        "capitalLabelReg": "ರಾಜಧಾನಿ",
        "regionReg": "ದಕ್ಷಿಣ ಭಾರತ // ಶಿಲ್ಪಕಲೆಯ ತವರೂರು",
        "taglineReg": "ವಿಜಯನಗರದ ಶಿಲಾ ರಥ, ಹೊಯ್ಸಳ ದೇಗುಲಗಳು ಮತ್ತು ಯಕ್ಷಗಾನದ ಗಂಡುಕಲೆ.",
        "traditionReg": "ಯಕ್ಷಗಾನ",
        "heritageReg": "ಹಂಪಿ ಸ್ಮಾರಕ ಸಮೂಹ",
        "traditionLabelReg": "🎭 ಜಾನಪದ ಪರಂಪರೆ",
        "heritageLabelReg": "🏛 ಪ್ರಮುಖ ಸ್ಮಾರಕ",
        "heritageDescReg": "ವಿಜಯನಗರ ಸಾಮ್ರಾಜ್ಯದ ಹಂಪಿಯ ಸುಪ್ರಸಿದ್ಧ ಶಿಲಾ ರಥವನ್ನು 360° AR/VR ನಲ್ಲಿ ವೀಕ್ಷಿಸಿ.",
        "traditionDescReg": "ಕರಾವಳಿ ಕರ್ನಾಟಕದ ಗಂಡುಕಲೆ ಯಕ್ಷಗಾನದ ವೇಷಭೂಷಣ ಮತ್ತು ರಂಗಪ್ರದರ್ಶನ ಅನುಭವಿಸಿ.",
        "enterVrLabel": "360° AR/VR ಪೋರ್ಟಲ್ ಪ್ರವೇಶಿಸಿ",
        "openTradLabel": "3D ಕಲಾ ಸ್ಟುಡಿಯೋ",
        "openBookLabel": "ಡಿಜಿಟಲ್ ಗ್ರಂಥ ತೆರೆಯಿರಿ",
        "bookTitleReg": "ಐತಿಹಾಸಿಕ ಹಸ್ತಪ್ರತಿ ಭಂಡಾರ",
        "bookDescReg": "ಹೊಯ್ಸಳ, ಚಾಲುಕ್ಯ ಹಾಗೂ ವಿಜಯನಗರ ಕಾಲದ ಪ್ರಾಚೀನ ಶಾಸನಗಳನ್ನು ಓದಿ.",
        "sitesHeaderReg": "🏛 ಪವಿತ್ರ ಐತಿಹಾಸಿಕ ಸ್ಮಾರಕಗಳು",
        "sitesCountLabelReg": "ತಾಣಗಳು",
        "launchVrLabelReg": "🥽 360° AR/VR ಪ್ರಾರಂಭಿಸಿ",
        "returnBtnReg": "← ಗ್ಲೋಬ್‌ಗೆ ಹಿಂತಿರುಗಿ"
      },
      "kerala": {
        "name": "Malayalam",
        "native": "മലയാളം",
        "stateNameReg": "കേരളം",
        "capitalReg": "തിരുവനന്തപുരം",
        "capitalLabelReg": "തലസ്ഥാനം",
        "regionReg": "ദക്ഷിണ ഭാരതം // ദൈവത്തിന്റെ സ്വന്തം നാട്",
        "taglineReg": "ഏഷ്യയിലെ ഏറ്റവും വലിയ തേക്ക് കൊട്ടാരവും കഥകളിയുടെ ജീവസ്സുറ്റ അഭിനയവും.",
        "traditionReg": "കഥകളി",
        "heritageReg": "പത്മനാഭപുരം കൊട്ടാരം",
        "traditionLabelReg": "🎭 പാരമ്പര്യ കലാരൂപം",
        "heritageLabelReg": "🏛 പ്രധാന സ്മാരകം",
        "heritageDescReg": "പത്മനാഭപുരം കൊട്ടാരത്തിലെ തടി കൊത്തുപണികൾ 360° AR/VR-ൽ അനുഭവിച്ചറിയൂ.",
        "traditionDescReg": "കഥകളിയുടെ പച്ച, കത്തി വേഷങ്ങളും മുദ്രകളും താളങ്ങളും അടുത്തറിയൂ.",
        "enterVrLabel": "360° AR/VR-ലേക്ക് പ്രവേശിക്കൂ",
        "openTradLabel": "3D കഥകളി സ്റ്റുഡിയോ",
        "openBookLabel": "ഡിജിറ്റൽ പുസ്തകം തുറക്കൂ",
        "bookTitleReg": "ചരിത്ര കൈയെഴുത്തുപ്രതി ശേഖരം",
        "bookDescReg": "കേരളത്തിന്റെ വാസ്തുവിദ്യയും ചുവർച്ചിത്ര പൈതൃകവും വായിച്ചറിയൂ.",
        "sitesHeaderReg": "🏛 പവിത്ര പൈതൃക കേന്ദ്രങ്ങൾ",
        "sitesCountLabelReg": "സ്മാരകങ്ങൾ",
        "launchVrLabelReg": "🥽 360° AR/VR ആരംഭിക്കൂ",
        "returnBtnReg": "← ഗ്ലോബിലേക്ക് മടങ്ങുക"
      },
      "odisha": {
        "name": "Odia",
        "native": "ଓଡ଼ିଆ",
        "stateNameReg": "ଓଡ଼ିଶା",
        "capitalReg": "ଭୁବନେଶ୍ୱର",
        "capitalLabelReg": "ରାଜଧାନୀ",
        "regionReg": "ପୂର୍ବ ଭାରତ // ଉତ୍କଳ ସଂସ୍କୃତି",
        "taglineReg": "କୋଣାର୍କର କୃଷ୍ଣ ପାଗୋଡ଼ା, ପୁରୀ ରଥଯାତ୍ରା ଏବଂ ଶାସ୍ତ୍ରୀୟ ଓଡ଼ିଶୀ ନୃତ୍ୟ.",
        "traditionReg": "ଓଡ଼ିଶୀ",
        "heritageReg": "କୋଣାର୍କ ସୂର୍ଯ୍ୟ ମନ୍ଦିର",
        "traditionLabelReg": "🎭 ଶାସ୍ତ୍ରୀୟ ପରମ୍ପରା",
        "heritageLabelReg": "🏛 ପ୍ରଧାନ କୀର୍ତ୍ତି",
        "heritageDescReg": "କୋଣାର୍କ ସୂର୍ଯ୍ୟ ମନ୍ଦିରର ପାଷାଣ ରଥ ଚକ୍ରକୁ ୩୬୦° AR/VR ରେ ଦେଖନ୍ତୁ.",
        "traditionDescReg": "ଓଡ଼ିଶୀ ନୃତ୍ୟର ତ୍ରିଭଙ୍ଗୀ ମୁଦ୍ରା ଓ ମର୍ଦ୍ଦଳ ତାଳର ଅନୁଭୂତି ନିଅନ୍ତୁ.",
        "enterVrLabel": "୩୬୦° AR/VR ରେ ପ୍ରବେଶ କରନ୍ତୁ",
        "openTradLabel": "୩D ନୃତ୍ୟ ଷ୍ଟୁଡିଓ ଖୋଲନ୍ତୁ",
        "openBookLabel": "ଡିଜିଟାଲ ଗ୍ରନ୍ଥ ପଢ଼ନ୍ତୁ",
        "bookTitleReg": "ପ୍ରାଚୀନ ତାଳପତ୍ର ପୋଥି ଅଭିଲେଖ",
        "bookDescReg": "କଳିଙ୍ଗ ମନ୍ଦିର ସ୍ଥାପତ୍ୟ ଏବଂ ପ୍ରତ୍ନତାତ୍ତ୍ୱିକ ରେକର୍ଡ ପଢ଼ନ୍ତୁ.",
        "sitesHeaderReg": "🏛 ପବିତ୍ର ଐତିହାସିକ ଧରୋହର",
        "sitesCountLabelReg": "ସ୍ମାରକୀ",
        "launchVrLabelReg": "🥽 ୩୬୦° AR/VR ଆରମ୍ଭ କରନ୍ତୁ",
        "returnBtnReg": "← ଗ୍ଲୋବ୍ କୁ ଫେରନ୍ତୁ"
      },
      "assam": {
        "name": "Assamese",
        "native": "অসমীয়া",
        "stateNameReg": "অসম",
        "capitalReg": "দিছপুৰ",
        "capitalLabelReg": "ৰাজধানী",
        "regionReg": "উত্তৰ-পূব ভাৰত // ব্ৰহ্মপুত্ৰ উপত্যকা",
        "taglineReg": "আহোম স্বৰ্গদেউসকলৰ ঐতিহাসিক ৰং ঘৰ আৰু ৰঙালী বিহুৰ নৃত্য-গীত.",
        "traditionReg": "বিহু",
        "heritageReg": "ৰং ঘৰ (ৰংপুৰ)",
        "traditionLabelReg": "🎭 লোকপৰম্পৰা",
        "heritageLabelReg": "🏛 প্ৰধান ঐতিহাসিক সৌধ",
        "heritageDescReg": "এছিয়াৰ প্ৰাচীনতম খেল পেভিলিয়ন ৰং ঘৰ ৩৬০° AR/VR ত দৰ্শন কৰক.",
        "traditionDescReg": "ঢোল, পেঁপা আৰু গগনাৰ সুৰত অসমীয়া বিহুৰ সজীৱ নৃত্য উপভোগ কৰক.",
        "enterVrLabel": "৩৬০° AR/VR ত প্ৰৱেশ কৰক",
        "openTradLabel": "৩ডি সাংস্কৃতিক ষ্টুডিঅ’",
        "openBookLabel": "ডিজিটেল বুৰঞ্জী পুথি",
        "bookTitleReg": "ঐতিহাসিক সাঁচিপাত পুথিভঁৰাল",
        "bookDescReg": "আহোম ৰাজবংশৰ বুৰঞ্জী আৰু বৈষ্ণৱ সত্ৰীয়া সংস্কৃতি অধ্যয়ন কৰক.",
        "sitesHeaderReg": "🏛 পৱিত্ৰ ঐতিহাসিক ঐতিহ্য ক্ষেত্ৰ",
        "sitesCountLabelReg": "স্মাৰক",
        "launchVrLabelReg": "🥽 ৩৬০° AR/VR আৰম্ভ কৰক",
        "returnBtnReg": "← পৃথিৱীলৈ ঘূৰি যাওক"
      },
      "bihar": {
        "name": "Hindi",
        "native": "हिन्दी",
        "stateNameReg": "बिहार",
        "capitalReg": "पटना",
        "capitalLabelReg": "राजधानी",
        "regionReg": "पूर्व भारत // ज्ञान की भूमि",
        "taglineReg": "तथागत बुद्ध की संबोधि, प्राचीन नालंदा और मधुबनी लोक कला.",
        "traditionReg": "मधुबनी एवं छऊ",
        "heritageReg": "महाबोधि मन्दिर",
        "traditionLabelReg": "🎭 लोककला एवं संस्कृति",
        "heritageLabelReg": "🏛 मुख्य स्मारक",
        "heritageDescReg": "बोधगया के पावन महाबोधि मन्दिर और बोधि वृक्ष को ३६०° AR/VR में देखें.",
        "traditionDescReg": "मिथिला की पारम्परिक मधुबनी चित्रकला और ओजस्वी छऊ नृत्य का अनुभव लें.",
        "enterVrLabel": "360° AR/VR में प्रवेश करें",
        "openTradLabel": "3D कला एवं नृत्य स्टूडियो",
        "openBookLabel": "डिजिटल ग्रंथ खोलें",
        "bookTitleReg": "नालंदा ऐतिहासिक अभिलेखागार",
        "bookDescReg": "नालंदा, विक्रमशिला और मौर्य इतिहास के दुर्लभ ग्रंथ पढ़ें.",
        "sitesHeaderReg": "🏛 पावन ऐतिहासिक धरोहरें",
        "sitesCountLabelReg": "स्मारक",
        "launchVrLabelReg": "🥽 360° AR/VR शुरू करें",
        "returnBtnReg": "← ग्लोब पर वापस लौटें"
      },
      "andhra_pradesh": {
        "name": "Telugu",
        "native": "తెలుగు",
        "stateNameReg": "ఆంధ్ర ప్రదేశ్",
        "capitalReg": "అమరావతి",
        "capitalLabelReg": "రాజధాని",
        "regionReg": "దక్షిణ భారత // శిల్ప కళా వైభవం",
        "taglineReg": "లేపాక్షి వేలాడే స్తంభం, తిరుమల వేంకటేశ్వర ధామం మరియు కూచిపూడి.",
        "traditionReg": "కూచిపూడి",
        "heritageReg": "లేపాక్షి వీరభద్ర దేవాలయం",
        "traditionLabelReg": "🎭 శాస్త్రీయ నృత్యం",
        "heritageLabelReg": "🏛 ప్రధాన స్మారకం",
        "heritageDescReg": "లేపాక్షి వీరభద్ర దేవాలయం మరియు వేలాడే స్తంభాన్ని 360° AR/VR లో వీక్షించండి.",
        "traditionDescReg": "కూచిపూడి నాట్య రీతులు, తరంగం మరియు లయబద్ధ అడుగులను అనుభవించండి.",
        "enterVrLabel": "360° AR/VR లోకి ప్రవేశించండి",
        "openTradLabel": "3D కూచిపూడి స్టూడియో",
        "openBookLabel": "డిజిటల్ గ్రంథం తెరవండి",
        "bookTitleReg": "చారిత్రక తాళపత్ర గ్రంథాలయం",
        "bookDescReg": "విజయనగర, శాతవాహన కాలపు శాసనాలు మరియు పురాతన రికార్డులను చదవండి.",
        "sitesHeaderReg": "🏛 పవిత్ర చారిత్రక వారసత్వ ప్రదేశాలు",
        "sitesCountLabelReg": "స్మారకాలు",
        "launchVrLabelReg": "🥽 360° AR/VR ప్రారంభించండి",
        "returnBtnReg": "← గ్లోబ్‌కు తిరిగి వెళ్లండి"
      },
      "uttarakhand": {
        "name": "Garhwali",
        "native": "गढ़वाली",
        "stateNameReg": "उत्तराखंड",
        "capitalReg": "देहरादून",
        "capitalLabelReg": "राजधानी",
        "regionReg": "उत्तर भारत // देवभूमि",
        "taglineReg": "हिमालयी देवदार के घने वनों में १२४ प्राचीन मंदिरों का दिव्य जागेश्वर धाम.",
        "traditionReg": "छोलिया नृत्य",
        "heritageReg": "जागेश्वर धाम मंदिर समूह",
        "traditionLabelReg": "🎭 लोकनृत्य एवं संस्कृति",
        "heritageLabelReg": "🏛 मुख्य देवालय",
        "heritageDescReg": "देवदार वनों में स्थित १२४ प्राचीन नागर मंदिरों के जागेश्वर धाम को ३६०° AR/VR में देखें.",
        "traditionDescReg": "कुमाऊं और गढ़वाल की तलवार-ढाल युक्त पारम्परिक छोलिया नृत्य शैली का अनुभव लें.",
        "enterVrLabel": "360° AR/VR में प्रवेश करें",
        "openTradLabel": "3D लोकनृत्य स्टूडियो",
        "openBookLabel": "डिजिटल देवभूमि ग्रंथ",
        "bookTitleReg": "प्राचीन हिमालयी अभिलेखागार",
        "bookDescReg": "केदारनाथ, बद्रीनाथ और कत्यूरी राजवंश के ऐतिहासिक अभिलेख पढ़ें.",
        "sitesHeaderReg": "🏛 पावन तीर्थ एवं देवालय",
        "sitesCountLabelReg": "देवालय",
        "launchVrLabelReg": "🥽 360° AR/VR शुरू करें",
        "returnBtnReg": "← ग्लोब पर वापस लौटें"
      },
      "tripura": {
        "name": "Bengali",
        "native": "বাংলা",
        "stateNameReg": "ত্রিপুরা",
        "capitalReg": "আগরতলা",
        "capitalLabelReg": "রাজধানী",
        "regionReg": "উত্তর-পূর্ব ভারত // রত্নগর্ভা ভূমি",
        "taglineReg": "রুদ্রসাগর হ্রদের জলপ্রাসাদ নীরমহল এবং ঊনকোটির সুবিশাল পাহাড়ের ভাস্কর্য.",
        "traditionReg": "হোজাগিরি নৃত্য",
        "heritageReg": "নীরমহল জলপ্রাসাদ (টুইজিলিকমা)",
        "traditionLabelReg": "🎭 আদিবাসী লোকনृत्य",
        "heritageLabelReg": "🏛 প্রধান ঐতিহাসিক সৌধ",
        "heritageDescReg": "রুদ্রসাগর হ্রদের মাঝে নির্মিত অপূর্ব নীরমহল প্রাসাদ ৩৬০° AR/VR এ দেখুন.",
        "traditionDescReg": "ত্রিপুরার রিয়াং সম্প্রদায়ের কলসি ও প্রদীপের ওপর ভারসাম্যযুক্ত হোজাগিরি নৃত্য উপভোগ করুন.",
        "enterVrLabel": "৩৬০° AR/VR পোর্টালে প্রবেশ করুন",
        "openTradLabel": "৩ডি নৃত্য স্টুডিও",
        "openBookLabel": "ডিজিটাল ইতিহাস গ্রন্থ",
        "bookTitleReg": "রাজমালা ঐতিহাসিক মহাফেজখানা",
        "bookDescReg": "মাণিক্য রাজবংশের রাজমালা এবং ঊনকোটির প্রত্নতাত্ত্বিক তথ্য পড়ুন.",
        "sitesHeaderReg": "🏛 ঐতিহাসিক ঐতিহ্যবাহী নিদর্শন",
        "sitesCountLabelReg": "স্মারক",
        "launchVrLabelReg": "🥽 ৩৬০° AR/VR শুরু করুন",
        "returnBtnReg": "← গ্লোবে ফিরে যান"
      },
      "delhi": {
        "name": "Hindi",
        "native": "हिन्दी",
        "stateNameReg": "दिल्ली (राष्ट्रीय राजधानी क्षेत्र)",
        "capitalReg": "नई दिल्ली",
        "capitalLabelReg": "राजधानी",
        "regionReg": "उत्तर भारत // राष्ट्रीय राजधानी",
        "taglineReg": "संगमरमरी कमल मंदिर (लोटस टेम्पल), लाल किला, क़ुतुब मीनार एवं हुमायूँ के मक़बरे की ऐतिहासिक धरा.",
        "traditionReg": "कथक एवं सूफ़ी क़व्वाली",
        "heritageReg": "कमल मंदिर (लोटस टेम्पल)",
        "traditionLabelReg": "🎭 शास्त्रीय परंपरा",
        "heritageLabelReg": "🏛 मुख्य स्मारक",
        "heritageDescReg": "कमल मंदिर (लोटस टेम्पल), लाल किला एवं क़ुतुब मीनार को ३६०° आभासी वास्तव (AR/VR) में प्रत्यक्ष अनुभव करें.",
        "traditionDescReg": "दिल्ली घराने का शास्त्रीय कथक नृत्य एवं हज़रत निज़ामुद्दीन की पावन सूफ़ी क़व्वाली परंपरा.",
        "enterVrLabel": "360° AR/VR लोटस टेम्पल में प्रवेश करें",
        "openTradLabel": "3D नृत्य कला दालन",
        "openBookLabel": "डिजिटल ऐतिहासिक ग्रंथ",
        "bookTitleReg": "दिल्ली ऐतिहासिक अभिलेखागार",
        "bookDescReg": "प्राचीन पाण्डुलिपियां, मुगल फरमान और युनेस्को ऐतिहासिक दस्तावेज पढ़ें.",
        "sitesHeaderReg": "🏛 दिल्ली के पावन ऐतिहासिक धरोहर स्थल",
        "sitesCountLabelReg": "स्मारक",
        "launchVrLabelReg": "🥽 360° AR/VR शुरू करें",
        "returnBtnReg": "← ग्लोब पर वापस जाएं"
      },
      "lotus_temple": {
        "name": "Hindi",
        "native": "हिन्दी",
        "stateNameReg": "दिल्ली (कमल मंदिर)",
        "capitalReg": "नई दिल्ली",
        "capitalLabelReg": "राजधानी",
        "regionReg": "उत्तर भारत // शांति निकेतन",
        "taglineReg": "२७ संगमरमरी पंखुड़ियों और ९ सरोवरों से सुसज्जित विश्व शांति एवं सर्वधर्म प्रार्थना का पावन कमल मंदिर.",
        "traditionReg": "कथक एवं सूफ़ी क़व्वाली",
        "heritageReg": "कमल मंदिर (लोटस टेम्पल)",
        "traditionLabelReg": "🎭 शास्त्रीय परंपरा",
        "heritageLabelReg": "🏛 मुख्य स्मारक",
        "heritageDescReg": "कमल मंदिर (लोटस टेम्पल) को ३६०° आभासी वास्तव (AR/VR) में प्रत्यक्ष अनुभव करें.",
        "traditionDescReg": "दिल्ली की समृद्ध शास्त्रीय संगीत एवं आध्यात्मिक परंपरा.",
        "enterVrLabel": "360° AR/VR लोटस टेम्पल में प्रवेश करें",
        "openTradLabel": "3D नृत्य कला दालन",
        "openBookLabel": "डिजिटल ऐतिहासिक ग्रंथ",
        "bookTitleReg": "कमल मंदिर वास्तुकला ग्रंथ",
        "bookDescReg": "बहाई उपासना मंदिर के ऐतिहासिक एवं वास्तुशिल्प दस्तावेज पढ़ें.",
        "sitesHeaderReg": "🏛 दिल्ली के पावन ऐतिहासिक धरोहर स्थल",
        "sitesCountLabelReg": "स्मारक",
        "launchVrLabelReg": "🥽 360° AR/VR शुरू करें",
        "returnBtnReg": "← ग्लोब पर वापस जाएं"
      }
    };

    // ── Master Cultural Heritage Sites Database ──────────────
    const HERITAGE_SITES_BY_STATE = {
      "maharashtra": [
        {
          "name": "Ajanta & Ellora Caves",
          "nameReg": "अजिंठा व वेरूळ लेणी",
          "tag": "UNESCO World Heritage",
          "tagReg": "युनेस्को जागतिक वारसा",
          "desc": "World-renowned rock-cut cave sanctuaries featuring Buddhist wall frescoes, Bodhisattva murals, and the monolithic Kailasa Temple.",
          "descReg": "प्राचीन बौद्ध भित्तिचित्रे, बोधिसत्व शिल्पे आणि बेसाल्ट खडकातून कोरलेले भव्य कैलास मंदिर.",
          "isVR": true
        },
        {
          "name": "Elephanta Caves",
          "nameReg": "घारापुरी (एलिफंटा) लेणी",
          "tag": "UNESCO World Heritage",
          "tagReg": "युनेस्को जागतिक वारसा",
          "desc": "Gharapuri Island cave sanctuary enshrining the majestic 20-foot high Trimurti Sadashiva monolithic rock sculpture.",
          "descReg": "त्रिमूर्ती सदाशिव मूर्तीसाठी जगप्रसिद्ध असलेली प्राचीन गुहा मंदिरे."
        },
        {
          "name": "Raigad Fort",
          "nameReg": "किल्ले रायगड",
          "tag": "Historic Hill Fortress",
          "tagReg": "ऐतिहासिक डोंगरी दुर्ग",
          "desc": "Impregnable Sahyadri mountain citadel serving as the sovereign capital of the Maratha Empire under Chhatrapati Shivaji Maharaj.",
          "descReg": "छत्रपती शिवाजी महाराजांच्या मराठा साम्राज्याची अजिंक्य राजधानी."
        },
        {
          "name": "Chhatrapati Shivaji Maharaj Terminus",
          "nameReg": "छत्रपती शिवाजी महाराज टर्मिनस",
          "tag": "UNESCO World Heritage",
          "tagReg": "युनेस्को जागतिक वारसा",
          "desc": "Masterpiece of Victorian Gothic Revival architecture infused with traditional Indian classical ornamentation.",
          "descReg": "व्हिक्टोरियन गॉथिक आणि भारतीय पारंपरिक शिल्पकलेचा उत्कृष्ट संगम."
        },
        {
          "name": "Pratapgad Fort",
          "nameReg": "किल्ले प्रतापगड",
          "tag": "Historic Hill Citadel",
          "tagReg": "ऐतिहासिक दुर्ग",
          "desc": "Historic mountain fortress site of the Battle of Pratapgad surrounded by misty Sahyadri valleys.",
          "descReg": "प्रतापगडच्या ऐतिहासिक युद्धाचे साक्षीदार असलेले सह्याद्रीतील अजिंक्य दुर्ग."
        }
      ],
      "gujarat": [
        {
          "name": "Statue of Unity (182m Colossus)",
          "nameReg": "સ્ટેચ્યુ ઓફ યુનિટી (૧૮૨ મીટર)",
          "tag": "World's Tallest Monument · 3D Model",
          "tagReg": "વિશ્વની સૌથી ઊંચી પ્રતિમા · ૩ડી મોડેલ",
          "desc": "Soaring 182 meters above the sacred Narmada River honoring Sardar Vallabhbhai Patel. Interactive 3D Model with 15-language voice guide & camera presets.",
          "descReg": "નર્મદા નદી કિનારે સરદાર વલ્લભભાઈ પટેલની ૧૮૨ મીટર ઊંચી વિશ્વની સૌથી ભવ્ય પ્રતિમા. ૩ડી મોડેલ અને ૧૫-ભાષીય માર્ગદર્શિકા સાથે ઉપલબ્ધ.",
          "isVR": true,
          "vrKey": "statue_of_unity",
          "vrPath": "statue_of_unity_3d.html"
        },
        {
          "name": "Rani ki Vav (Queen's Stepwell)",
          "nameReg": "રાણકી વાવ (પાટણ)",
          "tag": "UNESCO World Heritage · 3D Model",
          "tagReg": "યુનેસ્કો વિશ્વ ધરોહર · ૩ડી મોડેલ",
          "desc": "Subterranean inverted stepped temple in Patan with over 500 principal sculptures celebrating sacred water and Lord Vishnu.",
          "descReg": "૫૦૦થી વધુ અદભુત વિષ્ણુ મૂર્તિઓ અને શિલ્પોથી સુશોભિત ભૂગર્ભ વાવ.",
          "isVR": true,
          "vrKey": "gujarat",
          "vrPath": "rani_ki_vav.html"
        },
        {
          "name": "Sun Temple, Modhera",
          "nameReg": "સૂર્ય મંદિર, મોઢેરા",
          "tag": "Historic Temple Sanctuary",
          "tagReg": "ઐતિહાસિક સૂર્ય મંદિર",
          "desc": "Solanki dynasty solar architectural wonder designed so the first equinox rays illuminate the innermost Surya sanctum.",
          "descReg": "સોલંકી વંશનું સ્થાપત્ય રત્ન જ્યાં સૂર્યનું પહેલું કિરણ ગર્ભગૃહને પ્રકાશિત કરે છે."
        },
        {
          "name": "Dholavira: Harappan City",
          "nameReg": "ધોળાવીરા: હડપ્પન નગર",
          "tag": "UNESCO World Heritage",
          "tagReg": "યુનેસ્કો વિશ્વ ધરોહર",
          "desc": "Indus Valley urban metropolis showcasing sophisticated water reservoirs, stone masonry, and master city planning.",
          "descReg": "સિંધુ ખીણ સભ્યતાનું અત્યાધુનિક જળ સંરક્ષણ અને નગર આયોજન ધરાવતું કેન્દ્ર."
        },
        {
          "name": "Champaner-Pavagadh",
          "nameReg": "ચાંપાનેર-પાવાગઢ",
          "tag": "UNESCO World Heritage",
          "tagReg": "યુનેસ્કો વિશ્વ ધરોહર",
          "desc": "Unbroken historic continuum from prehistoric sites to Hindu fortifications and the grand 16th-century Jama Masjid.",
          "descReg": "પ્રાચીન હિન્દુ કિલ્લાઓ અને ઐતિહાસિક જામા મસ્જિદનો સમન્વય."
        },
        {
          "name": "Somnath Jyotirlinga Temple",
          "nameReg": "સોમનાથ જ્યોતિર્લિંગ મંદિર",
          "tag": "Sacred Coastal Shrine",
          "tagReg": "પવિત્ર તીર્થક્ષેત્ર",
          "desc": "First among the 12 sacred Jyotirlingas, situated at the confluence on the historic Prabhas Patan Arabian seashore.",
          "descReg": "પ્રભાસ પાટણના અરબી સમુદ્ર કિનારે સ્થિત પ્રથમ દ્વાદશ જ્યોતિર્લિંગ."
        }
      ],
      "rajasthan": [

        {
          "name": "Mehrangarh Fort",
          "nameReg": "मेहरानगढ़ दुर्ग (जोधपुर)",
          "tag": "Historic Citadel",
          "tagReg": "ऐतिहासिक दुर्ग",
          "desc": "Towering 400-foot cliff citadel in Jodhpur with burnished red sandstone palaces, intricate jalis, and royal museum.",
          "descReg": "४०० फीट ऊंची पहाड़ी पर स्थित लाल बलुआ पत्थर का अभेद्य राजसी दुर्ग."
        },
        {
          "name": "Hawa Mahal",
          "nameReg": "हवा महल (जयपुर)",
          "tag": "Historic Palace",
          "tagReg": "ऐतिहासिक महल",
          "desc": "Iconic five-story pink sandstone \"Palace of Winds\" with 953 honeycomb casements designed for natural palace cooling.",
          "descReg": "९५३ झरोखों से सुसज्जित पांच मंजिला गुलाबी बलुआ पत्थर का अद्वितीय महल."
        },
        {
          "name": "Chittorgarh Fort",
          "nameReg": "चित्तौड़गढ़ दुर्ग",
          "tag": "UNESCO World Heritage",
          "tagReg": "यूनेस्को विश्व धरोहर",
          "desc": "The largest fort complex in Bharat, featuring the 9-story Victory Tower (Vijay Stambha) and legendary Rajput lore.",
          "descReg": "विजय स्तंभ और अमर राजपूत शौर्य गाथाओं का साक्षी भारत का सबसे विशाल दुर्ग."
        },
        {
          "name": "Jaisalmer Fort (Sonar Qila)",
          "nameReg": "जैसलमेर दुर्ग (सोनार किला)",
          "tag": "UNESCO World Heritage",
          "tagReg": "यूनेस्को विश्व धरोहर",
          "desc": "Living yellow sandstone desert fort glowing golden at twilight, housing thousands of residents and Jain temples.",
          "descReg": "थार मरुस्थल में सुनहरी आभा बिखेरता जीवंत पीत प्रस्तर दुर्ग."
        }
      ],
      "uttar_pradesh": [
        {
          "name": "Taj Mahal",
          "nameReg": "ताज महल (आगरा)",
          "tag": "UNESCO World Heritage",
          "tagReg": "यूनेस्को विश्व धरोहर",
          "desc": "Mughal architectural zenith crafted from translucent Makrana white marble inlaid with semi-precious pietra dura gems.",
          "descReg": "मकराना के श्वेत संगमरमर और पच्चीकारी नक्काशी से निर्मित विश्वप्रसिद्ध स्मारक.",
          "isVR": true
        },
        {
          "name": "Agra Fort",
          "nameReg": "आगरा का लाल किला",
          "tag": "UNESCO World Heritage",
          "tagReg": "यूनेस्को विश्व धरोहर",
          "desc": "Monumental red sandstone fortified palace city containing Jahangiri Mahal, Diwan-i-Khas, and imperial riverfront pavilions.",
          "descReg": "जहाँगीरी महल, दीवान-ए-खास और यमुना तट पर स्थित विशाल मुग़ल दुर्ग."
        },
        {
          "name": "Fatehpur Sikri",
          "nameReg": "फ़तेहपुर सीकरी",
          "tag": "UNESCO World Heritage",
          "tagReg": "यूनेस्को विश्व धरोहर",
          "desc": "Akbar's red sandstone royal city, home to the colossal Buland Darwaza and the pearl-white marble tomb of Salim Chishti.",
          "descReg": "बुलंद दरवाज़ा और सूफी संत शेख सलीम चिश्ती की दरगाह से युक्त ऐतिहासिक नगरी."
        },
        {
          "name": "Varanasi Ghats & Kashi Vishwanath",
          "nameReg": "काशी विश्वनाथ व गंगा घाट",
          "tag": "Living Sacred Sanctuary",
          "tagReg": "जीवंत आध्यात्मिक धरोहर",
          "desc": "Eternal sacred riverfront along the holy Ganga, spiritual heart of Bharat with timeless evening Ganga Aarti ceremonies.",
          "descReg": "गंगा तट पर संध्या महाआरती और भगवान शिव का पावन ज्योतिर्लिंग धाम."
        },
        {
          "name": "Sarnath Deer Park & Dhamek Stupa",
          "nameReg": "सारनाथ एवं धमेक स्तूप",
          "tag": "Sacred Buddhist Site",
          "tagReg": "पवित्र बौद्ध तीर्थ",
          "desc": "Sanctuary where Lord Buddha taught his first sermon (Dhammacakkappavattana Sutta) and Ashoka erected the Lion Capital.",
          "descReg": "जहाँ भगवान बुद्ध ने प्रथम उपदेश दिया तथा अशोक का सिंह स्तम्भ स्थित है."
        }
      ],
      "west_bengal": [
        {
          "name": "Victoria Memorial",
          "nameReg": "ভিক্টোরিয়া মেমোরিয়াল",
          "tag": "Historic Landmark",
          "tagReg": "ঐতিহাসিক স্মৃতিসৌধ",
          "desc": "Stately white Makrana marble monument in Kolkata blending Indo-Saracenic, British, and Mughal architectural idioms.",
          "descReg": "শ্বেত মাকরানা মার্বেলে নির্মিত ইন্দো-সারাসেনিক স্থাপত্যের রাজকীয় নিদর্শন.",
          "isVR": true
        },
        {
          "name": "Bishnupur Terracotta Temples",
          "nameReg": "বিষ্ণুপুরের টেরাকোটা মন্দির",
          "tag": "Historic Complex",
          "tagReg": "ঐতিহাসিক মন্দির চত্বর",
          "desc": "Malla kingdom terracotta temples renowned for curved Bengali \"chala\" roofs and thousands of carved epic panels.",
          "descReg": "মল্ল রাজাদের অপূর্ব পোড়ামাটির কারুকার্য ও চালা স্থাপত্যের মন্দির."
        },
        {
          "name": "Darjeeling Himalayan Railway",
          "nameReg": "দার্জিলিং হিমালয়ান রেলওয়ে",
          "tag": "UNESCO World Heritage",
          "tagReg": "ইউনেস্কো বিশ্ব ঐতিহ্য",
          "desc": "Historic mountain narrow-gauge \"Toy Train\" traversing breathtaking Himalayan loops and alpine batasia spirals.",
          "descReg": "হিমালয়ের নয়নাভিরাম বাঁক ও বাতাসিয়া লুপ অতিক্রমকারী ঐতিহাসিক খেলনা ট্রেন."
        },
        {
          "name": "Sundarbans National Park",
          "nameReg": "সুন্দরবন জাতীয় উদ্যান",
          "tag": "UNESCO World Heritage",
          "tagReg": "ইউনেস্কো প্রাকৃতিক ঐতিহ্য",
          "desc": "World's largest tidal mangrove delta forest, sanctuary of the Royal Bengal Tiger and pristine estuarine ecology.",
          "descReg": "রয়েল বেঙ্গল টাইগারের প্রাকৃতিক আবাসভূমি বিশ্বের বৃহত্তম জোয়ারভাটার বাদাবন."
        },
        {
          "name": "Santiniketan",
          "nameReg": "শান্তিনিকেতন",
          "tag": "UNESCO World Heritage",
          "tagReg": "ইউনেস্কো বিশ্ব ঐতিহ্য",
          "desc": "Rabindranath Tagore's open-air ashram university fusing pan-Asian modernist education with rural Indian heritage.",
          "descReg": "বিশ্বকবি রবীন্দ্রনাথ ঠাকুর প্রতিষ্ঠিত উন্মুক্ত আশ্রমিক বিশ্ববিদ্যালয়."
        }
      ],
      "tamil_nadu": [
        {
          "name": "Brihadisvara Temple, Thanjavur",
          "nameReg": "பெருவுடையார் கோயில் (தஞ்சாவூர்)",
          "tag": "UNESCO World Heritage",
          "tagReg": "யுனெஸ்கோ உலகப் பாரம்பரியம்",
          "desc": "Peruvudaiyar Kovil: Rajaraja Chola I's grand granite temple with a towering 216-foot vimana and monolithic Nandi.",
          "descReg": "ராஜராஜ சோழனால் கட்டப்பட்ட 216 அடி உயர விமானமும் நந்தியும் கொண்ட கருங்கல் அதிசயம்.",
          "isVR": true
        },
        {
          "name": "Group of Monuments, Mahabalipuram",
          "nameReg": "மாமல்லபுரம் சிற்பங்கள்",
          "tag": "UNESCO World Heritage",
          "tagReg": "யுனெஸ்கோ உலகப் பாரம்பரியம்",
          "desc": "Pallava coastal marvels including the Shore Temple, monolithic Pancha Rathas, and the colossal Arjuna's Penance relief.",
          "descReg": "பல்லவர் கால கடற்கரைக் கோயில், பஞ்ச ரதங்கள் மற்றும் பாறைச் சிற்பங்கள்."
        },
        {
          "name": "Meenakshi Amman Temple, Madurai",
          "nameReg": "மீனாட்சி அம்மன் கோயில்",
          "tag": "Sacred Dravidian Sanctuary",
          "tagReg": "புனித திராவிட ஆலயம்",
          "desc": "Fourteen monumental gopurams encrusted with thousands of vibrant polychrome sculptures and the Thousand Pillar Hall.",
          "descReg": "ஆயிரங்கால் மண்டபமும் வர்ணச் சிற்பங்கள் நிறைந்த பிரம்மாண்ட கோபுரங்களும்."
        },
        {
          "name": "Gangaikonda Cholapuram",
          "nameReg": "கங்கைகொண்ட சோழபுரம்",
          "tag": "UNESCO World Heritage",
          "tagReg": "யுனெஸ்கோ உலகப் பாரம்பரியம்",
          "desc": "Rajendra Chola I's capital temple with graceful curvilinear vimana contours and peerless bronze iconography.",
          "descReg": "ராஜேந்திர சோழனின் கலைநயமிக்க வளைந்த விமான அமைப்பும் சிற்பங்களும்."
        },
        {
          "name": "Airavatesvara Temple, Darasuram",
          "nameReg": "ஐராவதேஸ்வரர் கோயில் (தாராசுரம்)",
          "tag": "UNESCO World Heritage",
          "tagReg": "யுனெஸ்கோ உலகப் பாரம்பரியம்",
          "desc": "Great Living Chola temple celebrated as a \"stone sculptor's dream\" with musical stepping stones and chariot mandapams.",
          "descReg": "இசைப் படிகளும் தேர் மண்டபமும் கொண்ட கல்லில் செதுக்கப்பட்ட சிற்பக்கலை கனவு."
        }
      ],
      "karnataka": [
        {
          "name": "Group of Monuments at Hampi",
          "nameReg": "ಹಂಪಿ ಸ್ಮಾರಕ ಸಮೂಹ",
          "tag": "UNESCO World Heritage",
          "tagReg": "ಯುನೆಸ್ಕೋ ವಿಶ್ವ ಪರಂಪರೆ",
          "desc": "Capital ruins of the Vijayanagara Empire along the Tungabhadra River, featuring the iconic Stone Chariot and musical pillars.",
          "descReg": "ವಿಜಯನಗರ ಸಾಮ್ರಾಜ್ಯದ ವೈಭವಯುತ ರಾಜಧಾನಿ, ಸುಪ್ರಸಿದ್ಧ ಶಿಲಾ ರಥ ಮತ್ತು ಸಂಗೀತ ಕಂಬಗಳು.",
          "isVR": true
        },
        {
          "name": "Pattadakal & Badami Caves",
          "nameReg": "ಪಟ್ಟದಕಲ್ಲು ಮತ್ತು ಬಾದಾಮಿ ಗುಹೆಗಳು",
          "tag": "UNESCO World Heritage",
          "tagReg": "ಯುನೆಸ್ಕೋ ವಿಶ್ವ ಪರಂಪರೆ",
          "desc": "Chalukya dynasty rock-cut cave shrines and temple sanctuaries harmonizing northern Nagara and southern Dravida styles.",
          "descReg": "ಚಾಲುಕ್ಯ ವಂಶದ ನಾಗರ ಮತ್ತು ದ್ರಾವಿಡ ಶೈಲಿಯ ಅಪೂರ್ವ ಶಿಲಾ ಗುಹಾ ದೇವಾಲಯಗಳು."
        },
        {
          "name": "Hoysala Sacred Ensembles (Belur & Halebidu)",
          "nameReg": "ಹೊಯ್ಸಳ ದೇವಾಲಯಗಳು (ಬೇಲೂರು-ಹಳೇಬೀಡು)",
          "tag": "UNESCO World Heritage",
          "tagReg": "ಯುನೆಸ್ಕೋ ವಿಶ್ವ ಪರಂಪರೆ",
          "desc": "Soapstone star-shaped temples with intricate jewel-like sculptural filigree, madanikas, and celestial friezes.",
          "descReg": "ನಕ್ಷತ್ರಾಕಾರದ ಸೋಪ್‌ಸ್ಟೋನ್ ಮದನಿಕಾ ಶಿಲ್ಪಗಳು ಮತ್ತು ಸೂಕ್ಷ್ಮ ಕೆತ್ತನೆಗಳ ದೇಗುಲಗಳು."
        },
        {
          "name": "Mysore Palace (Amba Vilas)",
          "nameReg": "ಮೈಸೂರು ಅರಮನೆ (ಅಂಬಾವಿಲಾಸ)",
          "tag": "Royal Heritage",
          "tagReg": "ರಾಜವಂಶದ ಪರಂಪರೆ",
          "desc": "Opulent Indo-Saracenic palace of the Wadiyar dynasty with stained glass ceilings, gilded pillars, and royal courtyards.",
          "descReg": "ಒಡೆಯರ್ ರಾಜವಂಶದ ಇಂಡೋ-ಸಾರ್ಸೆನಿಕ್ ಶೈಲಿಯ ಭವ್ಯ ಅರಮನೆ."
        },
        {
          "name": "Gol Gumbaz, Vijayapura",
          "nameReg": "ಗೋಳ ಗುಮ್ಮಟ (ವಿಜಯಪುರ)",
          "tag": "Historic Monument",
          "tagReg": "ಐತಿಹಾಸಿಕ ಸ್ಮಾರಕ",
          "desc": "Mausoleum of Mohammed Adil Shah featuring the second largest unsupported dome in the world and an acoustic whispering gallery.",
          "descReg": "ವಿಶ್ವದ ಎರಡನೇ ಅತಿ ದೊಡ್ಡ ಆಧಾರರಹಿತ ಗುಮ್ಮಟ ಮತ್ತು ಪಿಸುಗುಟ್ಟುವ ಗ್ಯಾಲರಿ."
        }
      ],
      "kerala": [
        {
          "name": "Padmanabhapuram Palace",
          "nameReg": "പത്മനാഭപുരം കൊട്ടാരം",
          "tag": "Historic Royal Palace",
          "tagReg": "ചരിത്രപരമായ രാജകൊട്ടാരം",
          "desc": "Asia's largest monolithic teak and rosewood palace complex exhibiting traditional Kerala timber architecture and murals.",
          "descReg": "പരമ്പരാഗത കേരള തച്ചുശാസ്ത്രത്തിൽ നിർമ്മിച്ച ഏഷ്യയിലെ ഏറ്റവും വലിയ തടി കൊട്ടാരം.",
          "isVR": true
        },
        {
          "name": "Mattancherry Palace (Dutch Palace)",
          "nameReg": "മട്ടാഞ്ചേരി കൊട്ടാരം (ഡച്ച് പാലസ്)",
          "tag": "Historic Monument",
          "tagReg": "ചരിത്ര സ്മാരകം",
          "desc": "Kochi royal palace famed for some of India's finest 16th-century Ramayana and Mahabharata mythological tempera murals.",
          "descReg": "രാമായണ-മഹാഭാരത ഇതിഹാസ ചിത്രങ്ങൾ ആലേഖനം ചെയ്ത ചുവർചിത്ര കൊട്ടാരം."
        },
        {
          "name": "Bekal Fort",
          "nameReg": "ബേക്കൽ കോട്ട (കാസർഗോഡ്)",
          "tag": "Coastal Fortress",
          "tagReg": "തീരദേശ കോട്ട",
          "desc": "Sprawling sea-facing red laterite citadel in Kasaragod with an observation tower overlooking the crashing Arabian Sea.",
          "descReg": "അറബിക്കടലിന്റെ തീരത്ത് തലയുയർത്തി നിൽക്കുന്ന കൂറ്റൻ ചെങ്കൽ കോട്ട."
        },
        {
          "name": "Vadakkunnathan Temple, Thrissur",
          "nameReg": "വടക്കുംനാഥൻ ക്ഷേത്രം (തൃശ്ശൂർ)",
          "tag": "National Heritage",
          "tagReg": "ദേശീയ പൈതൃകം",
          "desc": "Ancient Shiva temple showcase of pure Kerala architectural design, surrounded by a massive stone perimeter.",
          "descReg": "ശുദ്ധമായ കേരള വാസ്തുവിദ്യയിൽ പണിതീർത്ത പുരാതന ശിവക്ഷേത്രം."
        },
        {
          "name": "Edakkal Caves, Wayanad",
          "nameReg": "എടക്കൽ ഗുഹകൾ (വയനാട്)",
          "tag": "Prehistoric Rock Art",
          "tagReg": "പ്രാചീന ശിലാചിത്രങ്ങൾ",
          "desc": "High-altitude rock shelter containing Neolithic petroglyphs and human-animal engravings dating back 8,000 years.",
          "descReg": "നവീന ശിലായുഗ കാലത്തെ കൊത്തുപണികളും ഗുഹാചിത്രങ്ങളും അടങ്ങിയ പുരാതന ഗുഹകൾ."
        }
      ],
      "odisha": [
        {
          "name": "Konark Sun Temple",
          "nameReg": "କୋଣାର୍କ ସୂର୍ଯ୍ୟ ମନ୍ଦିର",
          "tag": "UNESCO World Heritage",
          "tagReg": "ୟୁନେସ୍କୋ ବିଶ୍ୱ ଐତିହ୍ୟ",
          "desc": "The \"Black Pagoda\": monumental 24-wheeled chariot of Surya drawn by seven galloping horses carved along the Bay of Bengal.",
          "descReg": "ଚବିଶ ଚକ ଓ ସାତ ଅଶ୍ୱ ଦ୍ୱାରା ଟଣା ହୋଇଥିବା ସୂର୍ଯ୍ୟ ରଥର ପାଷାଣ ଅଦ୍ଭୁତ କଳାକୃତି.",
          "isVR": true
        },
        {
          "name": "Jagannath Temple, Puri",
          "nameReg": "ଜଗନ୍ନାଥ ମନ୍ଦିର (ପୁରୀ)",
          "tag": "Sacred Char Dham",
          "tagReg": "ପବିତ୍ର ଚାରିଧାମ",
          "desc": "Towering Kalinga style sanctum of Lord Jagannath, Balabhadra, and Subhadra, epicenter of the world-famous annual Rath Yatra.",
          "descReg": "ଚତୁର୍ଦ୍ଧାମୂର୍ତ୍ତିଙ୍କ ପବିତ୍ର ଧାମ ଏବଂ ବିଶ୍ୱପ୍ରସିଦ୍ଧ ବାର୍ଷିକ ରଥଯାତ୍ରାର କେନ୍ଦ୍ରସ୍ଥଳୀ."
        },
        {
          "name": "Lingaraj Temple, Bhubaneswar",
          "nameReg": "ଲିଙ୍ଗରାଜ ମନ୍ଦିର (ଭୁବନେଶ୍ୱର)",
          "tag": "Historic Sanctuary",
          "tagReg": "କଳିଙ୍ଗ ସ୍ଥାପତ୍ୟ କୀର୍ତ୍ତି",
          "desc": "Apex of classical Kalinga temple architecture with a 180-foot deula spire rising above the sacred Bindu Sagar tank.",
          "descReg": "୧୮୦ ଫୁଟ ଉଚ୍ଚ ଦେଉଳ ବିଶିଷ୍ଟ କଳିଙ୍ଗ ମନ୍ଦିର ସ୍ଥାପତ୍ୟର ଶ୍ରେଷ୍ଠ ନିଦର୍ଶନ."
        },
        {
          "name": "Udayagiri and Khandagiri Caves",
          "nameReg": "ଉଦୟଗିରି ଓ ଖଣ୍ଡଗିରି ଗୁମ୍ଫା",
          "tag": "Archaeological Complex",
          "tagReg": "ପ୍ରତ୍ନତାତ୍ତ୍ୱିକ ସ୍ମାରକ",
          "desc": "Rock-cut monastic shelters built by King Kharavela for Jain monks, inscribed with the historic Hathigumpha inscription.",
          "descReg": "ସମ୍ରାଟ ଖାରବେଳଙ୍କ ହାତୀଗୁମ୍ଫା ଶିଳାଲେଖ ଯୁକ୍ତ ପ୍ରାଚୀନ ଜୈନ ଶୈଳୋତ୍କୀର୍ଣ୍ଣ ଗୁମ୍ଫା."
        },
        {
          "name": "Dhauli Shanti Stupa",
          "nameReg": "ଧଉଳି ଶାନ୍ତି ସ୍ତୂପ",
          "tag": "Historic Peace Memorial",
          "tagReg": "ଐତିହାସିକ ଶାନ୍ତି ସ୍ମାରକ",
          "desc": "Site of the historic Kalinga War where Emperor Ashoka embraced non-violence (Ahimsa), marked by royal rock edicts.",
          "descReg": "କଳିଙ୍ଗ ଯୁଦ୍ଧ ପରେ ସମ୍ରାଟ ଅଶୋକଙ୍କ ଅହିଂସା ବାର୍ତ୍ତା ବହନ କରୁଥିବା ଶାନ୍ତି ପୀଠ."
        }
      ],
      "assam": [

        {
          "name": "Kaziranga National Park",
          "nameReg": "কাজিৰঙা ৰাষ্ট্ৰীয় উদ্যান",
          "tag": "UNESCO World Heritage",
          "tagReg": "ইউনেস্কো বিশ্ব ঐতিহ্য",
          "desc": "Floodplain grassland sanctuary along the Brahmaputra River hosting two-thirds of the world's great one-horned rhinoceroses.",
          "descReg": "ব্ৰহ্মপুত্ৰৰ উপত্যকাত অৱস্থিত এশিঙীয়া গঁড়ৰ প্ৰধান বাসস্থান."
        },
        {
          "name": "Kamakhya Temple, Guwahati",
          "nameReg": "কামাখ্যা মন্দিৰ (গুৱাহাটী)",
          "tag": "Sacred Shakti Peetha",
          "tagReg": "পৱিত্ৰ শক্তিপীঠ",
          "desc": "Venerable Nilachal hill shrine venerating the divine mother goddess, celebrated during the sacred annual Ambubachi Mela.",
          "descReg": "নীলাচল পাহাৰৰ ঐতিহাসিক দেৱী মন্দিৰ আৰু প্ৰসিদ্ধ অম্বুবাচী মেলা."
        },
        {
          "name": "Talatal Ghar & Kareng Ghar",
          "nameReg": "তলাতল ঘৰ আৰু কাৰেং ঘৰ",
          "tag": "Ahom Military Palace",
          "tagReg": "আহোম সামৰিক ৰাজপ্ৰসাদ",
          "desc": "Multi-story brick palace with subterranean escape tunnels and upper military cantonments of the 600-year Ahom Kingdom.",
          "descReg": "ভূগৰ্ভস্থ সুৰংগ আৰু সেনা শিবিৰযুক্ত আহোম ৰাজ্যৰ অনন্য ইটাৰ স্থাপত্য."
        },
        {
          "name": "Majuli River Island & Satras",
          "nameReg": "মাজুলী নদীদ্বীপ আৰু সত্ৰসমূহ",
          "tag": "Cultural Sanctuary",
          "tagReg": "সাংস্কৃতিক তীৰ্থ",
          "desc": "World's largest inhabited river island, cradle of Assamese Neo-Vaishnavite culture, classical Sattriya dance, and mask art.",
          "descReg": "বিশ্বৰ সৰ্ববৃহৎ জনবসতিপূৰ্ণ নদীদ্বীপ, সত্ৰীয়া নৃত্য আৰু মুখাশিল্পৰ কেন্দ্ৰ."
        }
      ],
      "bihar": [
        {
          "name": "Mahabodhi Temple Complex",
          "nameReg": "महाबोधि मन्दिर (बोधगया)",
          "tag": "UNESCO World Heritage",
          "tagReg": "यूनेस्को विश्व धरोहर",
          "desc": "Supreme Buddhist sanctuary in Bodh Gaya where Gautama Buddha attained enlightenment beneath the sacred Bodhi Tree.",
          "descReg": "जहाँ भगवान बुद्ध को पवित्र बोधि वृक्ष के नीचे परम ज्ञान की प्राप्ति हुई.",
          "isVR": true
        },
        {
          "name": "Nalanda Mahavihara",
          "nameReg": "नालंदा महाविहार के भग्नावशेष",
          "tag": "UNESCO World Heritage",
          "tagReg": "यूनेस्को विश्व धरोहर",
          "desc": "Ancient international monastic university ruins that educated over 10,000 scholars from across Asia in philosophy and science.",
          "descReg": "प्राचीन विश्वप्रसिद्ध विश्वविद्यालय जहाँ १०,००० से अधिक विद्वान अध्ययन करते थे."
        },
        {
          "name": "Vikramashila University Ruins",
          "nameReg": "विक्रमशिला विश्वविद्यालय",
          "tag": "Historic Monastic Center",
          "tagReg": "ऐतिहासिक बौद्ध केंद्र",
          "desc": "Premier Pala dynasty Buddhist center of esoteric learning and tantric studies, founded by Emperor Dharmapala.",
          "descReg": "पाल वंश के सम्राट धर्मपाल द्वारा स्थापित तंत्रयान और दर्शन का महाव        tradIframe.src = '';
      }
    }

    // ── AR/VR Experience Modal ─────────────────────────────── at the ceremonial Rajpath axis, commemorating fallen Indian soldiers.",
          "descReg": "४२ मीटर ऊंचा भव्य विजय मेहराब एवं अमर जवान ज्योति का पावन स्थल."
        }
      ]
    };

    function getHeritageSitesForState(key, s) {
      if (HERITAGE_SITES_BY_STATE[key]) return HERITAGE_SITES_BY_STATE[key];
      const stateName = (s && s.name) ? s.name : 'State';
      const stateHindi = (s && s.nameHindi) ? s.nameHindi : stateName;
      return [
        { name: (s && s.heritage) ? s.heritage : `${stateName} Sacred Monument`, nameReg: (s && s.heritageHindi) ? s.heritageHindi : `${stateHindi} स्मारक`, tag: 'Historic Heritage Site', tagReg: 'ऐतिहासिक धरोहर', desc: (s && s.tagline) ? s.tagline : `Cultural monument preserving the historic architectural legacy of ${stateName}.`, descReg: `ऐतिहासिक वास्तुकला धरोहर.`, isVR: Boolean(s && s.vrPath) },
        { name: `${stateName} Historic Citadel`, nameReg: `${stateHindi} ऐतिहासिक दुर्ग`, tag: 'Living Heritage', tagReg: 'जीवंत धरोहर', desc: `Ancient fortification and historic quarters showcasing centuries of regional craftsmanship and architecture.`, descReg: `प्राचीन दुर्ग एवं ऐतिहासिक शिल्प.` },
        { name: `${stateName} Sacred Shrine Sanctuary`, nameReg: `${stateHindi} पावन देवालय`, tag: 'Sacred Architecture', tagReg: 'पवित्र तीर्थ', desc: `Venerated temple complex preserving living traditional arts, rituals, and community celebrations.`, descReg: `पारंपरिक कला एवं संस्कृति का पावन केंद्र.` }
      ];
    }

    let currentStateDrawerId = null;
    let currentDrawerStateKey = null;
    let currentDrawerLang = 'en'; // default language is always English

    function setDrawerLanguage(lang) {
      currentDrawerLang = lang;
      const btnEn = document.getElementById('btn-lang-en');
      const btnReg = document.getElementById('btn-lang-reg');
      if (btnEn) btnEn.classList.toggle('active', lang === 'en');
      if (btnReg) btnReg.classList.toggle('active', lang === 'reg');

      if (currentDrawerStateKey) {
        renderStateDrawerContent(currentDrawerStateKey, lang);
        const drawer = document.getElementById('state-drawer');
        const currentSiteLang = window.yugmaTranslator ? window.yugmaTranslator.getLanguage() : (lang === 'reg' ? 'hi' : 'en');
        if (window.yugmaTranslator && drawer) {
          window.yugmaTranslator.translateDOM(lang === 'en' ? 'en' : currentSiteLang, drawer);
        }
      }
    }

    function renderStateDrawerContent(key, lang) {
      const stateData = YUGMA_STATES[key] || (window.YUGMA_STATES_DATA ? window.YUGMA_STATES_DATA[key] : {}) || {};
      const cultureData = (window.YUGMA_CULTURE_DATA && window.YUGMA_CULTURE_DATA[key]) ? window.YUGMA_CULTURE_DATA[key] : {};
      const langConfig = STATE_LANG_CONFIG[key] || {
        name: 'Hindi', native: 'हिन्दी',
        stateNameReg: stateData.nameHindi || stateData.name || 'भारत',
        capitalReg: cultureData.capital || 'राजधानी',
        capitalLabelReg: 'राजधानी',
        regionReg: 'भारत की पावन भूमि',
        taglineReg: stateData.tagline || 'सांस्कृतिक धरोहर',
        traditionReg: stateData.tradition || 'लोकपरंपरा',
        heritageReg: stateData.heritage || 'स्मारक',
        traditionLabelReg: '🎭 लोकपरंपरा',
        heritageLabelReg: '🏛 मुख्य स्मारक',
        heritageDescReg: '360° AR/VR मध्ये प्रत्यक्ष अनुभवा.',
        traditionDescReg: 'पारंपरिक लोककला व संगीताचा अनुभव घ्या.',
        enterVrLabel: '360° AR/VR मध्ये पाहा',
        openTradLabel: '3D नृत्य कला दालन',
        openBookLabel: 'डिजिटल ऐतिहासिक ग्रंथ',
        bookTitleReg: 'ऐतिहासिक दस्तऐवज संग्रह',
        bookDescReg: 'प्राचीन हस्तलिखिते, शिलालेख आणि युनेस्को नोंदी वाचा.',
        sitesHeaderReg: '🏛 पावन ऐतिहासिक वारसा स्थळे',
        sitesCountLabelReg: 'स्मारके',
        launchVrLabelReg: '🥽 360° AR/VR सुरू करा',
        returnBtnReg: '← पृथ्वीवर परत या'
      };

      const isReg = (lang === 'reg');

      // 1. Region & Title
      const regEl = document.getElementById('sd-region');
      if (regEl) {
        regEl.textContent = isReg
          ? langConfig.regionReg
          : `${(cultureData.region || stateData.region || getRegionForStateKey(key) || 'INDIA').toUpperCase()} // REGION OF BHARAT`;
      }

      const titleEl = document.getElementById('sd-title');
      if (titleEl) {
        titleEl.innerHTML = isReg
          ? `${langConfig.stateNameReg} <span class="drawer-hindi" style="font-size: 0.65em; opacity: 0.85;">(${stateData.name || 'India'})</span>`
          : `${stateData.name || 'India'} <span class="drawer-hindi">${stateData.nameHindi || ''}</span>`;
      }

      // 2. Capital
      const capLabel = document.getElementById('sd-capital-label');
      if (capLabel) capLabel.textContent = isReg ? langConfig.capitalLabelReg : 'Capital';

      const capVal = document.getElementById('sd-capital-val');
      if (capVal) capVal.textContent = isReg ? langConfig.capitalReg : (cultureData.capital || 'Cultural Center');

      // 3. Tagline
      const tagEl = document.getElementById('sd-tagline');
      if (tagEl) {
        tagEl.textContent = isReg
          ? langConfig.taglineReg
          : (stateData.tagline || cultureData.summary || `Explore the rich architectural and living cultural heritage of ${stateData.name || 'this state'}.`);
      }

      // 4. Quick Meta Tags
      const tradTag = document.getElementById('sd-tradition-tag');
      if (tradTag) {
        const tLabel = isReg ? langConfig.traditionLabelReg : '🎭 Living Tradition';
        const tVal = isReg ? langConfig.traditionReg : (stateData.tradition || cultureData.tradition || 'Living Folk Tradition');
        tradTag.innerHTML = `${tLabel}: <b>${tVal}</b>`;
      }

      const herTag = document.getElementById('sd-heritage-tag');
      if (herTag) {
        const hLabel = isReg ? langConfig.heritageLabelReg : '🏛 Primary Monument';
        const hVal = isReg ? langConfig.heritageReg : (stateData.heritage || cultureData.heritage || 'Historic Monument');
        herTag.innerHTML = `${hLabel}: <b>${hVal}</b>`;
      }

      // 5. Card 1: HERITAGE / AR-VR
      const smHeritageName = document.getElementById('sm-heritage-name');
      if (smHeritageName) {
        if (key === 'gujarat' || key === 'statue_of_unity') {
          smHeritageName.textContent = isReg ? 'સ્ટેચ્યુ ઓફ યુનિટી (૧૮૨ મીટર)' : 'Statue of Unity (182m Colossus)';
        } else if (key === 'delhi' || key === 'lotus_temple') {
          smHeritageName.textContent = isReg ? 'कमल मंदिर (लोटस टेम्पल)' : "Lotus Temple (Bahá'í House of Worship)";
        } else {
          smHeritageName.textContent = isReg ? langConfig.heritageReg : (stateData.heritage || cultureData.heritage || 'Sacred Heritage Site');
        }
      }
      const smHeritageDesc = document.getElementById('sm-heritage-desc');
      if (smHeritageDesc) {
        if (key === 'gujarat' || key === 'statue_of_unity') {
          smHeritageDesc.textContent = isReg
            ? 'નર્મદા નદી કિનારે સરદાર વલ્લભભાઈ પટેલની ૧૮૨ મીટર ઊંચી વિશ્વની સૌથી ભવ્ય પ્રતિમા ૩ડી મોડેલમાં જુઓ.'
            : "Explore the world's tallest 182-meter colossus dedicated to Sardar Vallabhbhai Patel in photorealistic 3D.";
        } else if (key === 'delhi' || key === 'lotus_temple') {
          smHeritageDesc.textContent = isReg
            ? 'अद्भुत संगमरमरी कमल मंदिर (लोटस टेम्पल) एवं दिल्ली के ऐतिहासिक स्मारकों को ३६०° आभासी वास्तव (AR/VR) में देखें.'
            : "Explore the pristine white marble Lotus Temple and Delhi's imperial monuments in photorealistic 3D WebXR.";
        } else {
          smHeritageDesc.textContent = isReg
            ? langConfig.heritageDescReg
            : (stateData.tagline || `Explore this UNESCO sacred landmark in immersive 360° Virtual Reality. Walk through sacred sanctums.`);
        }
      }
      const cardArvrBtn = document.getElementById('sm-arvr-btn-label');
      if (cardArvrBtn) {
        if (key === 'gujarat' || key === 'statue_of_unity') {
          cardArvrBtn.textContent = isReg ? '૩ડી મોડેલ ખોલો' : 'LAUNCH STATUE OF UNITY 3D MODEL';
        } else if (key === 'delhi' || key === 'lotus_temple') {
          cardArvrBtn.textContent = isReg ? 'लोटस टेम्पल ३डी मॉडल खोलें' : 'LAUNCH LOTUS TEMPLE 3D MODEL';
        } else {
          cardArvrBtn.textContent = isReg ? langConfig.enterVrLabel : 'ENTER AR / VR PORTAL';
        }
      }

      // 6. Card 2: TRADITION / 3D STUDIO & VIDEO SHOWCASE
      const smTraditionName = document.getElementById('sm-tradition-name');
      if (smTraditionName) {
        smTraditionName.textContent = isReg ? langConfig.traditionReg : (stateData.tradition || cultureData.tradition || 'Living Tradition');
      }
      const smTraditionDesc = document.getElementById('sm-tradition-desc');
      if (smTraditionDesc) {
        smTraditionDesc.textContent = isReg
          ? langConfig.traditionDescReg
          : `Experience this living classical tradition through authentic performance showcase, musical rhythms, and cultural archives.`;
      }
      const cardTradBtn = document.getElementById('sm-trad-btn-label');
      if (cardTradBtn) {
        cardTradBtn.textContent = isReg ? langConfig.openTradLabel : 'OPEN TRADITION SHOWCASE';
      }

      // Populate video showcase for the specified states ONLY
      const tradVideoWrap = document.getElementById('card-tradition-video-wrap');
      const tradIframe = document.getElementById('card-tradition-iframe');
      const tradVideoTitle = document.getElementById('card-tradition-video-title');
      const smTradBadge = document.getElementById('sm-trad-badge');

      const normKey = normalizeKey(key);
      const videoData = TRADITION_VIDEOS[normKey] || TRADITION_VIDEOS[key] || (stateData && stateData.youtubeId ? { id: stateData.youtubeId, title: stateData.videoTitle || `${stateData.tradition || 'Living'} Showcase Video`, tradition: stateData.tradition } : null);
      if (videoData && videoData.id) {
        if (tradVideoWrap) tradVideoWrap.style.display = 'block';
        if (tradIframe) {
          const embedSrc = `https://www.youtube-nocookie.com/embed/${videoData.id}?rel=0&modestbranding=1&enablejsapi=1`;
          if (tradIframe.src !== embedSrc) {
            tradIframe.src = embedSrc;
          }
          tradIframe.referrerPolicy = 'strict-origin-when-cross-origin';
          tradIframe.title = videoData.title || `${stateData.tradition || videoData.tradition || 'Living'} Showcase Video`;
        }
        if (tradVideoTitle) {
          tradVideoTitle.textContent = `${stateData.tradition || videoData.tradition || 'Tradition'} Showcase`;
        }
        if (smTradBadge) {
          smTradBadge.textContent = 'PERFORMANCE SHOWCASE';
        }
      } else {
        if (tradVideoWrap) tradVideoWrap.style.display = 'none';
        if (tradIframe) tradIframe.src = '';
        if (smTradBadge) {
          smTradBadge.textContent = 'CULTURAL ARCHIVE';
        }
      }

      // 7. Card 3: INFORMATION / DIGITAL BOOK
      const cardInfoTitle = document.getElementById('sm-info-title');
      if (cardInfoTitle) {
        cardInfoTitle.textContent = isReg ? langConfig.bookTitleReg : 'Heritage Archive';
      }
      const cardInfoDesc = document.getElementById('sm-info-desc');
      if (cardInfoDesc) {
        cardInfoDesc.textContent = isReg
          ? langConfig.bookDescReg
          : `Read curated historical manuscripts, UNESCO records, and archaeological documentation.`;
      }
      const cardInfoBtn = document.getElementById('sm-info-btn-label');
      if (cardInfoBtn) {
        cardInfoBtn.textContent = isReg ? langConfig.openBookLabel : 'OPEN DIGITAL BOOK';
      }

      // 8. Sites List Header & Count
      const sitesHeader = document.getElementById('sd-sites-title');
      if (sitesHeader) {
        sitesHeader.textContent = isReg ? langConfig.sitesHeaderReg : '🏛 SACRED HERITAGE SITES';
      }

      const sites = getHeritageSitesForState(key, stateData);
      const countEl = document.getElementById('sd-sites-count');
      if (countEl) {
        countEl.textContent = isReg
          ? `${sites.length} ${langConfig.sitesCountLabelReg}`
          : `${sites.length} MONUMENTS`;
      }

      // 9. Render Sites List
      const sitesListEl = document.getElementById('sd-sites-list');
      if (sitesListEl) {
        const vrBtnText = isReg ? langConfig.launchVrLabelReg : '🥽 LAUNCH 360° AR/VR PORTAL';
        sitesListEl.innerHTML = sites.map((site, idx) => {
          const isFeatured = site.isVR || idx === 0;
          const sName = isReg ? (site.nameReg || site.name) : site.name;
          const sTag = isReg ? (site.tagReg || site.tag) : site.tag;
          const sDesc = isReg ? (site.descReg || site.desc) : site.desc;

          const targetVr = site.vrKey || (site.vrPath ? site.vrPath : (site.isVR ? key : ''));
          const vrBtnHtml = targetVr ? `
            <div class="site-actions">
              <button type="button" class="site-btn-vr" onclick="closeStateDrawer(); openARVRModal('${targetVr}');">
                ${vrBtnText}
              </button>
            </div>
          ` : '';

          return `
            <div class="site-card ${isFeatured ? 'featured-site' : ''}">
              <div class="site-card-top">
                <div class="site-name">${sName}</div>
                <span class="site-tag">${sTag}</span>
              </div>
              <p class="site-desc">${sDesc}</p>
              ${vrBtnHtml}
            </div>
          `;
        }).join('');
      }

      // 10. Drawer Return Button
      const backBtn = document.getElementById('drawer-back-btn');
      if (backBtn) {
        backBtn.textContent = isReg ? langConfig.returnBtnReg : '← RETURN TO GLOBE';
      }
    }

    // ── Left-Side State Info & Heritage Sites Drawer ─────────
    function openStateDrawer(id, s) {
      currentStateDrawerId = id;
      const key = normalizeKey(id || (s && s.name));
      currentDrawerStateKey = key;

      const currentSiteLang = window.yugmaTranslator ? window.yugmaTranslator.getLanguage() : 'en';
      const isSiteLangNonEn = currentSiteLang && currentSiteLang !== 'en';
      currentDrawerLang = isSiteLangNonEn ? 'reg' : 'en';

      // Configure Language Switcher Buttons (EN vs State's Regional Language)
      const cfg = STATE_LANG_CONFIG[key] || { name: 'Hindi', native: 'हिन्दी' };
      const btnEn = document.getElementById('btn-lang-en');
      const btnReg = document.getElementById('btn-lang-reg');
      if (btnEn) {
        btnEn.classList.toggle('active', !isSiteLangNonEn);
      }
      if (btnReg) {
        btnReg.classList.toggle('active', isSiteLangNonEn);
        btnReg.textContent = cfg.native;
        btnReg.title = `Switch to ${cfg.name || cfg.native}`;
      }

      // Render view
      renderStateDrawerContent(key, currentDrawerLang);

      const drawer = document.getElementById('state-drawer');
      if (drawer) {
        drawer.dataset.stateId = key;
        drawer.classList.add('active');
        drawer.removeAttribute('inert');
        drawer.setAttribute('aria-hidden', 'false');

        // Translate in-DOM into user's selected language
        if (window.yugmaTranslator && isSiteLangNonEn) {
          window.yugmaTranslator.translateDOM(currentSiteLang, drawer);
        }
      }
    }

    function closeStateDrawer() {
      const drawer = document.getElementById('state-drawer');
      if (drawer) {
        drawer.classList.remove('active');
        drawer.setAttribute('inert', '');
        drawer.setAttribute('aria-hidden', 'true');
      }
      // Stop video playback when drawer is dismissed
      const tradIframe = document.getElementById('card-tradition-iframe');
      if (tradIframe && tradIframe.src) {
        tradIframe.src = '';
      }
    }



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
      const rawSentences = text.match(/[^.!?।৷\n]+[.!?।৷\n]*/g) || [text];
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
            const words = s.split(/\s+/);
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
      modalVgAllWords = script.trim().split(/\s+/);

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
        const cnt = c.trim().split(/\s+/).length;
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

    // ── AR/VR Experience Modal ───────────────────────────────
    function openARVRModal(id) {
      if (id && id.endsWith('.html')) {
        window.location.href = id;
        return;
      }
      const key = normalizeKey(id);
      const s = YUGMA_STATES[key] || (window.YUGMA_STATES_DATA ? window.YUGMA_STATES_DATA[key] : null);
      if (!s) return;

      const titleEl = document.getElementById('arvr-title');
      if (titleEl) titleEl.textContent = s.heritage || 'Sacred Heritage Site';

      const descEl = document.getElementById('arvr-desc');
      if (descEl) descEl.textContent = s.tagline || `Experience ${s.heritage || s.name} in photorealistic 360° AR/VR.`;

      const featuresEl = document.getElementById('arvr-features');
      if (featuresEl) {
        if (key === 'statue_of_unity') {
          featuresEl.textContent = `Explore the colossal 182-meter (597 ft) bronze-clad monument dedicated to Sardar Vallabhbhai Patel in photorealistic 3D. Inspect the structural engineering, bronze plates, facial contours, and the panoramic observation deck over the Narmada River and Sardar Sarovar Dam. Includes 15-language voice guide narration.`;
        } else if (key === 'delhi') {
          featuresEl.textContent = `Explore Delhi's world-renowned imperial monuments in interactive 3D WebXR: The pristine white marble Lotus Temple (Bahá'í House of Worship), the majestic red sandstone Red Fort (Lal Qila), the soaring 72.5m Qutub Minar, and Humayun's timeless Charbagh garden tomb. Includes full 360° orbital control and architectural lore.`;
        } else if (key === 'punjab') {
          featuresEl.textContent = `Experience Sri Harmandir Sahib (The Golden Temple) in photorealistic 3D. Explore the sanctum sanctorum adorned with gold leaf, the marble parikrama walkway, and the sacred Amrit Sarovar pool.`;
        } else if (key === 'madhya_pradesh') {
          featuresEl.textContent = `Explore the Great Stupa of Sanchi, India's oldest stone structure. Inspect the Ashokan hemispherical dome, stone balustrades, and the four intricately carved Torana gateways illustrating the Jataka tales in 3D.`;
        } else if (key === 'gateway_of_india') {
          featuresEl.textContent = `Explore Mumbai's iconic Gateway of India at Apollo Bunder in photorealistic 3D. Inspect the Indo-Saracenic basalt archway, central dome, and harbor promenades.`;
        } else if (key === 'lotus_temple') {
          featuresEl.textContent = `Explore New Delhi's famous Lotus Temple in 3D WebXR. Inspect the 27 free-standing Greek marble petals, tranquil reflecting ponds, and central prayer hall designed for universal peace and meditation.`;
        } else if (key === 'rajgad_fort') {
          featuresEl.textContent = `Scale the invincible heights of Rajgad Fort, the legendary 'King of Forts' and sovereign capital of Chhatrapati Shivaji Maharaj's Hindavi Swarajya. Explore the Bale Killa citadel, Sujvela, Padmavati, and Sanjeevani machis perched 4,514 ft above the Western Ghats.`;
        } else {
          featuresEl.textContent = `Navigate this sacred site in full 360° immersive WebXR. Use your mouse or touch to look around, scroll to zoom, and click glowing hotspots to unlock historical lore and architectural details.`;
        }
      }

      const multiWrap = document.getElementById('arvr-multi-models');
      if (multiWrap) {
        if (key === 'delhi' || key === 'lotus_temple') {
          multiWrap.style.display = 'grid';
          multiWrap.style.gridTemplateColumns = 'repeat(auto-fit, minmax(180px, 1fr))';
          multiWrap.style.gap = '10px';
          multiWrap.innerHTML = `
            <a href="lotustemple-vr.html" class="vr-model-tile" style="display:flex; flex-direction:column; padding:12px; background:linear-gradient(135deg, rgba(56,189,248,0.25) 0%, rgba(14,19,28,0.85) 100%); border:1px solid rgba(56,189,248,0.6); border-radius:10px; color:#fff; text-decoration:none; transition:all 0.25s ease;">
              <span style="font-size:10px; letter-spacing:0.12em; color:#38bdf8; text-transform:uppercase; font-weight:700;">🪷 3D WEBXR MODEL</span>
              <strong style="font-size:13px; margin:4px 0 2px;">Lotus Temple</strong>
              <span style="font-size:11px; color:rgba(232,223,200,0.75);">Pristine Marble Lotus Sanctuary</span>
              <span style="margin-top:8px; font-size:11px; font-weight:600; color:#38bdf8;">LAUNCH 3D VR →</span>
            </a>
            <a href="redfort-vr.html" class="vr-model-tile" style="display:flex; flex-direction:column; padding:12px; background:rgba(14,19,28,0.7); border:1px solid rgba(239,68,68,0.35); border-radius:10px; color:#fff; text-decoration:none; transition:all 0.25s ease;">
              <span style="font-size:10px; letter-spacing:0.12em; color:#ef4444; text-transform:uppercase; font-weight:700;">🚩 UNESCO CITADEL</span>
              <strong style="font-size:13px; margin:4px 0 2px;">Red Fort (Lal Qila)</strong>
              <span style="font-size:11px; color:rgba(232,223,200,0.75);">Imperial Mughal Sandstone Fort</span>
              <span style="margin-top:8px; font-size:11px; font-weight:600; color:#ef4444;">LAUNCH 3D VR →</span>
            </a>
            <a href="qutubminar-vr.html" class="vr-model-tile" style="display:flex; flex-direction:column; padding:12px; background:rgba(14,19,28,0.7); border:1px solid rgba(245,158,11,0.35); border-radius:10px; color:#fff; text-decoration:none; transition:all 0.25s ease;">
              <span style="font-size:10px; letter-spacing:0.12em; color:#f59e0b; text-transform:uppercase; font-weight:700;">🗼 72.5M VICTORY TOWER</span>
              <strong style="font-size:13px; margin:4px 0 2px;">Qutub Minar</strong>
              <span style="font-size:11px; color:rgba(232,223,200,0.75);">Mehrauli Complex & Iron Pillar</span>
              <span style="margin-top:8px; font-size:11px; font-weight:600; color:#f59e0b;">LAUNCH 3D VR →</span>
            </a>
            <a href="humayunstomb-vr.html" class="vr-model-tile" style="display:flex; flex-direction:column; padding:12px; background:rgba(14,19,28,0.7); border:1px solid rgba(16,185,129,0.35); border-radius:10px; color:#fff; text-decoration:none; transition:all 0.25s ease;">
              <span style="font-size:10px; letter-spacing:0.12em; color:#10b981; text-transform:uppercase; font-weight:700;">🏛️ CHARBAGH MAUSOLEUM</span>
              <strong style="font-size:13px; margin:4px 0 2px;">Humayun's Tomb</strong>
              <span style="font-size:11px; color:rgba(232,223,200,0.75);">Taj Mahal Prototype Gardens</span>
              <span style="margin-top:8px; font-size:11px; font-weight:600; color:#10b981;">LAUNCH 3D VR →</span>
            </a>
          `;
        } else {
          multiWrap.style.display = 'none';
          multiWrap.innerHTML = '';
        }
      }

      const launchBtn = document.getElementById('arvr-launch-btn');
      const vrPath = (s.paths && s.paths.arvr) ? s.paths.arvr : (s.vrPath || '');
      if (launchBtn) {
        if (vrPath) {
          launchBtn.href = vrPath;
          launchBtn.style.display = 'inline-flex';
          launchBtn.innerHTML = (key === 'statue_of_unity')
            ? `🗿 LAUNCH STATUE OF UNITY 3D MODEL`
            : (key === 'delhi' || key === 'lotus_temple')
            ? `🪷 LAUNCH LOTUS TEMPLE 3D VR`
            : (key === 'punjab')
            ? `✨ LAUNCH GOLDEN TEMPLE 3D VR`
            : (key === 'madhya_pradesh')
            ? `☸️ LAUNCH SANCHI STUPA 3D VR`
            : (key === 'gateway_of_india')
            ? `🏛️ LAUNCH GATEWAY OF INDIA 3D VR`
            : (key === 'rajgad_fort')
            ? `⚔️ LAUNCH RAJGAD FORT 3D VR`
            : `🥽 LAUNCH FULL 3D VR EXPERIENCE`;
        } else {
          launchBtn.style.display = 'none';
        }
      }

      const toDrawerBtn = document.getElementById('arvr-to-drawer-btn');
      if (toDrawerBtn) {
        toDrawerBtn.textContent = `🏛 EXPLORE ${s.name.toUpperCase()} HERITAGE DRAWER`;
      }

      const modal = document.getElementById('arvr-modal');
      if (modal) {
        modal.dataset.stateId = (key === 'statue_of_unity' ? 'gujarat' : (key === 'rajgad_fort' ? 'maharashtra' : key));
        modal.classList.add('active');
        setupModalVoiceGuide(key, s);
      }
    }

    function closeARVRModal() {
      const modal = document.getElementById('arvr-modal');
      if (modal) modal.classList.remove('active');
      stopModalVoiceGuide();
    }
    window.openStateDrawer = openStateDrawer;
    window.closeStateDrawer = closeStateDrawer;
    window.openARVRModal = openARVRModal;
    window.closeARVRModal = closeARVRModal;
    window.renderStateDrawerContent = renderStateDrawerContent;

    // Bind Drawer and AR/VR Event Listeners
    // Language Selector Buttons for State Drawer
    const btnLangEn = document.getElementById('btn-lang-en');
    if (btnLangEn) {
      btnLangEn.addEventListener('click', () => setDrawerLanguage('en'));
    }
    const btnLangReg = document.getElementById('btn-lang-reg');
    if (btnLangReg) {
      btnLangReg.addEventListener('click', () => setDrawerLanguage('reg'));
    }

    const drawerCloseBtn = document.getElementById('drawer-close-btn');
    if (drawerCloseBtn) drawerCloseBtn.addEventListener('click', closeStateDrawer);

    const drawerBackBtn = document.getElementById('drawer-back-btn');
    if (drawerBackBtn) drawerBackBtn.addEventListener('click', resetToIndia);

    
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

    const arvrCloseBtn = document.getElementById('arvr-close');
    if (arvrCloseBtn) arvrCloseBtn.addEventListener('click', closeARVRModal);

    const arvrToDrawerBtn = document.getElementById('arvr-to-drawer-btn');
    if (arvrToDrawerBtn) {
      arvrToDrawerBtn.addEventListener('click', () => {
        const modal = document.getElementById('arvr-modal');
        let id = (modal && modal.dataset.stateId) || currentStateDrawerId;
        closeARVRModal();
        if (id === 'statue_of_unity') id = 'gujarat';
        if (id) selectStateById(id);
      });
    }

    const btnResetIndia = document.getElementById('btn-reset-india');
    if (btnResetIndia) btnResetIndia.addEventListener('click', resetToIndia);

    // ═══════════════════════════════════════════════════════════
    // YUGMA DIGITAL BOOK + 3D TRADITION VIEWER
    // ═══════════════════════════════════════════════════════════

    const bookHost = document.getElementById('book-modal');
    const traditionHost = document.getElementById('tradition-modal');

    window.yugmaBook =
      (bookHost && window.YugmaDigitalBook)
        ? new window.YugmaDigitalBook(bookHost)
        : null;

    window.yugmaTradition =
      (traditionHost && window.YugmaTraditionViewer)
        ? new window.YugmaTraditionViewer(traditionHost)
        : null;

    // React to global language changes across all modal overlays & sections
    window.addEventListener('yugmaLanguageChanged', (e) => {
      const newLang = e.detail && e.detail.language ? e.detail.language : 'en';

      // 1. If State Drawer is open, re-render and translate
      const drawer = document.getElementById('state-drawer');
      if (drawer && drawer.classList.contains('active') && currentDrawerStateKey) {
        setDrawerLanguage(newLang === 'en' ? 'en' : 'reg');
        if (window.yugmaTranslator) {
          window.yugmaTranslator.translateDOM(newLang, drawer);
        }
      }

      // 2. If AR/VR modal is open, translate
      const arvrModal = document.getElementById('arvr-modal');
      if (arvrModal && arvrModal.classList.contains('active')) {
        if (window.yugmaTranslator) {
          window.yugmaTranslator.translateDOM(newLang, arvrModal);
        }
      }

      // 3. If Digital Book is open, re-render & translate
      if (window.yugmaBook && window.yugmaBook.modal && window.yugmaBook.modal.classList.contains('active')) {
        if (typeof window.yugmaBook.onLanguageChanged === 'function') {
          window.yugmaBook.onLanguageChanged(newLang);
        }
      }

      // 4. If Tradition Viewer is open, re-render & translate
      if (window.yugmaTradition && window.yugmaTradition.isOpen) {
        if (typeof window.yugmaTradition.onLanguageChanged === 'function') {
          window.yugmaTradition.onLanguageChanged(newLang);
        }
      }

      // 5. Explicitly translate Preservation section
      const presSection = document.getElementById('preservation');
      if (presSection && window.yugmaTranslator) {
        window.yugmaTranslator.translateDOM(newLang, presSection);
      }
    });

    // ── 3 PRIMARY PINPOINT CARDS (IN DRAWER) ─────────────────
    // 01 · HERITAGE / AR/VR CARD
    const cardArvr = document.getElementById('card-arvr');
    if (cardArvr) {
      cardArvr.addEventListener('click', () => {
        const id = (document.getElementById('state-drawer') && document.getElementById('state-drawer').dataset.stateId) || currentStateDrawerId;
        closeStateDrawer();
        openARVRModal(id === 'gujarat' ? 'statue_of_unity' : id);
      });
    }

    // 02 · TRADITION / 3D STUDIO CARD
    const cardTradition = document.getElementById('card-tradition');
    if (cardTradition) {
      cardTradition.addEventListener('click', async () => {
        const id = (document.getElementById('state-drawer') && document.getElementById('state-drawer').dataset.stateId) || currentStateDrawerId || 'maharashtra';
        closeStateDrawer();
        if (window.yugmaTradition) {
          const s = YUGMA_STATES[id] || (window.YUGMA_STATES_DATA ? window.YUGMA_STATES_DATA[id] : null);
          await window.yugmaTradition.open(s ? { ...s, stateId: id } : id);
        }
      });

      // Guard video container clicks from closing the drawer or triggering 3D studio navigation
      const cardTradVideoWrap = document.getElementById('card-tradition-video-wrap');
      if (cardTradVideoWrap) {
        cardTradVideoWrap.addEventListener('click', e => e.stopPropagation());
        cardTradVideoWrap.addEventListener('pointerdown', e => e.stopPropagation());
      }
    }

    // 03 · INFORMATION / DIGITAL BOOK CARD
    const cardInfo = document.getElementById('card-info');
    if (cardInfo) {
      cardInfo.addEventListener('click', async () => {
        const id = (document.getElementById('state-drawer') && document.getElementById('state-drawer').dataset.stateId) || currentStateDrawerId || 'maharashtra';
        closeStateDrawer();
        if (window.yugmaBook) {
          const s = YUGMA_STATES[id] || (window.YUGMA_STATES_DATA ? window.YUGMA_STATES_DATA[id] : null);
          await window.yugmaBook.open(s ? { ...s, stateId: id } : id);
        }
      });
    }

    // ── Dropdown & Button Actions ────────────────────────────
    const stateSelectDropdown = document.getElementById('state-select-dropdown');
    if (stateSelectDropdown) {
      stateSelectDropdown.addEventListener('change', e => {
        const id = e.target.value;
        if (id) {
          selectStateById(id);
          e.target.selectedIndex = 0;
        }
      });
    }

    // Hero Buttons
    const btnHeroEnter = document.getElementById('btn-hero-enter');
    if (btnHeroEnter) {
      btnHeroEnter.addEventListener('click', () => {
        const expSection = document.getElementById('explorer');
        if (expSection) expSection.scrollIntoView({ behavior: 'smooth' });
      });
    }

    const btnHeroQuick = document.getElementById('btn-hero-quick');
    if (btnHeroQuick) {
      btnHeroQuick.addEventListener('click', () => {
        const dimSection = document.getElementById('dimensions');
        if (dimSection) dimSection.scrollIntoView({ behavior: 'smooth' });
      });
    }

    const scrollHintEl = document.getElementById('scroll-hint');
    if (scrollHintEl) {
      scrollHintEl.addEventListener('click', () => {
        const dimSection = document.getElementById('dimensions');
        if (dimSection) dimSection.scrollIntoView({ behavior: 'smooth' });
      });
    }

    // Featured Pill Buttons in Hero
    document.querySelectorAll('.pill-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const stateId = btn.dataset.state;
        if (stateId) selectStateById(stateId);
      });
    });

    // ── Zoom Controls ────────────────────────────────────────
    function zoomGlobe(direction) {
      if (!globe) return;
      isUserInteracting = true;
      isScrollDrivenPOV = false;
      const pov = globe.pointOfView();
      const step = 0.35;
      const minAlt = 0.2;
      const maxAlt = 5.0;
      const newAlt = Math.min(maxAlt, Math.max(minAlt, pov.altitude + direction * step));
      globe.pointOfView({ lat: pov.lat, lng: pov.lng, altitude: newAlt }, 350);
    }

    document.getElementById('btn-zoom-in').addEventListener('click', () => zoomGlobe(-1));
    document.getElementById('btn-zoom-out').addEventListener('click', () => zoomGlobe(+1));

    // ── Rotation Toggle ──────────────────────────────────────
    document.getElementById('btn-rotate-toggle').addEventListener('click', () => {
      const btn = document.getElementById('btn-rotate-toggle');
      const label = document.getElementById('rotate-label');
      const iconOn = document.getElementById('icon-rotate-on');
      const iconOff = document.getElementById('icon-rotate-off');

      const controls = globe && globe.controls ? globe.controls() : null;
      if (!controls) return;

      isAutoRotating = !controls.autoRotate;
      controls.autoRotate = isAutoRotating;

      btn.setAttribute('aria-pressed', String(isAutoRotating));
      label.textContent = isAutoRotating ? 'AUTO-SPIN' : 'PAUSED';
      iconOn.style.display = isAutoRotating ? '' : 'none';
      iconOff.style.display = isAutoRotating ? 'none' : '';
    });


    // ════════════════════════════════════════════════════════════
    // YUGMA OPENING FLOW + SUPABASE AUTH
    // Welcome → Sign Up / Login → Main Experience
    (() => {
      const SUPABASE_URL = 'https://eynqtscwrepndronybwp.supabase.co';
      const SUPABASE_PUBLISHABLE_KEY = 'sb_publishable_ioQVRqBT2tQd7hlCWB5Rbg_MEXJ_4_M';

      let supabaseClient = null;
      if (window.supabase && typeof window.supabase.createClient === 'function') {
        try {
          supabaseClient = window.supabase.createClient(
            SUPABASE_URL,
            SUPABASE_PUBLISHABLE_KEY,
            {
              auth: {
                persistSession: true,
                autoRefreshToken: true,
                detectSessionInUrl: true
              }
            }
          );
        } catch (e) {
          console.warn('Supabase client initialization notice:', e);
        }
      }

      window.yugmaSupabase = supabaseClient;

      const DEMO_USERS = [
        { email: 'demo@yugma.com', password: 'demo123', name: 'Demo Explorer' },
        { email: 'admin@yugma.in', password: 'admin123', name: 'Museum Curator' },
        { email: 'explorer@heritage.in', password: 'yugma2026', name: 'Heritage Explorer' },
        { email: 'user@yugma.com', password: 'yugma123', name: 'Cultural Pilgrim' }
      ];

      function getStoredUsers() {
        try {
          const users = JSON.parse(localStorage.getItem('yugmaUsers') || '[]');
          return Array.isArray(users) ? users : [];
        } catch (e) {
          return [];
        }
      }

      function saveUserToRegistry(user) {
        try {
          const users = getStoredUsers();
          const existingIdx = users.findIndex(u => u && u.email && u.email.toLowerCase() === user.email.toLowerCase());
          if (existingIdx >= 0) {
            users[existingIdx] = { ...users[existingIdx], ...user };
          } else {
            users.push(user);
          }
          localStorage.setItem('yugmaUsers', JSON.stringify(users));
          localStorage.setItem('yugmaUser', JSON.stringify(user));
        } catch (e) {
          console.warn('Local user save notice:', e);
        }
      }

      const auth = document.getElementById('yugma-auth');
      const welcome = document.getElementById('yugma-welcome-screen');
      const authScreen = document.getElementById('yugma-auth-screen');
      const enterButton = document.getElementById('yugma-enter-button');
      const loginTab = document.getElementById('auth-login-tab');
      const signupTab = document.getElementById('auth-signup-tab');
      const loginForm = document.getElementById('yugma-login-form');
      const signupForm = document.getElementById('yugma-signup-form');
      const eyebrow = document.getElementById('auth-eyebrow');
      const title = document.getElementById('auth-title');
      const subtitle = document.getElementById('auth-subtitle');

      if (!auth) return;

      // ── SESSION HELPERS ─────────────────────────────────────
      function isSessionActive() {
        return localStorage.getItem('yugmaLoggedIn') === 'true';
      }

      function updateNavUserState(user) {
        const loginBtn = document.getElementById('btn-nav-login');
        const userProfile = document.getElementById('nav-user-profile');
        const userNameEl = document.getElementById('nav-user-name');
        const logoutBtn = document.getElementById('btn-nav-logout');

        if (user && isSessionActive()) {
          if (userProfile) userProfile.classList.remove('hidden');
          if (userNameEl) {
            const displayName = user.isGuest ? 'GUEST EXPLORER' : (user.name || (user.email ? user.email.split('@')[0] : 'EXPLORER'));
            userNameEl.textContent = displayName.toUpperCase();
          }
          if (logoutBtn) {
            logoutBtn.textContent = user.isGuest ? 'EXIT GUEST' : 'LOGOUT';
          }
          if (loginBtn) {
            if (user.isGuest) {
              loginBtn.classList.remove('hidden');
              const span = loginBtn.querySelector('span');
              if (span) span.textContent = 'SIGN IN';
            } else {
              loginBtn.classList.add('hidden');
            }
          }
        } else {
          if (loginBtn) {
            loginBtn.classList.remove('hidden');
            const span = loginBtn.querySelector('span');
            if (span) span.textContent = 'SIGN IN';
          }
          if (userProfile) userProfile.classList.add('hidden');
        }
      }

      function markUserLoggedIn(user) {
        localStorage.setItem('yugmaLoggedIn', 'true');
        const selectedLang = window.yugmaTranslator ? window.yugmaTranslator.getLanguage() : (localStorage.getItem('yugmaUserLanguage') || 'en');
        const userData = {
          name: user.name || (user.user_metadata && user.user_metadata.full_name) || (user.email ? user.email.split('@')[0] : (user.isGuest ? 'Guest Explorer' : 'Explorer')),
          email: user.email || '',
          isGuest: !!user.isGuest,
          language: user.language || selectedLang
        };
        localStorage.setItem('yugmaCurrentUser', JSON.stringify(userData));
        updateNavUserState(userData);
        if (window.yugmaTranslator) {
          window.yugmaTranslator.setLanguage(userData.language);
        }
      }

      function continueAsGuest() {
        const selectedLang = window.yugmaTranslator ? window.yugmaTranslator.getLanguage() : (localStorage.getItem('yugmaUserLanguage') || 'en');
        const guestUser = {
          name: 'Guest Explorer',
          email: '',
          isGuest: true,
          language: selectedLang
        };
        localStorage.setItem('yugmaIsGuest', 'true');
        markUserLoggedIn(guestUser);
        openExperience();
      }

      function logoutUser() {
        localStorage.removeItem('yugmaLoggedIn');
        localStorage.removeItem('yugmaCurrentUser');
        localStorage.removeItem('yugmaIsGuest');
        if (supabaseClient && supabaseClient.auth) {
          try {
            supabaseClient.auth.signOut();
          } catch (e) {
            console.warn('Supabase sign out error:', e);
          }
        }
        updateNavUserState(null);
        auth.style.display = 'flex';
        auth.classList.remove('auth-hidden');
        document.body.classList.add('yugma-screen-locked');
        showWelcome();
      }

      const btnNavLogout = document.getElementById('btn-nav-logout');
      if (btnNavLogout) {
        btnNavLogout.addEventListener('click', (e) => {
          e.preventDefault();
          logoutUser();
        });
      }

      function showWelcome() {
        welcome.classList.remove('hidden');
        authScreen.classList.add('hidden');
      }

      function showAuth() {
        welcome.classList.add('hidden');
        authScreen.classList.remove('hidden');
        setMode('signup');
      }

      function setMode(mode) {
        const login = mode === 'login';

        loginTab.classList.toggle('active', login);
        signupTab.classList.toggle('active', !login);
        loginForm.classList.toggle('active', login);
        signupForm.classList.toggle('active', !login);

        eyebrow.textContent = login ? 'WELCOME BACK' : 'CREATE YOUR ACCOUNT';
        title.textContent = login ? 'Enter YUGMA' : 'Join YUGMA';
        subtitle.textContent = login
          ? "Continue your journey through India's sacred geography."
          : 'Create your profile and step inside the digital museum.';
      }

      function closeAuthModal() {
        if (!isSessionActive()) {
          continueAsGuest();
        } else {
          openExperience();
        }
      }

      function openExperience() {
        document.body.classList.remove('yugma-screen-locked');
        auth.classList.add('auth-hidden');

        setTimeout(() => {
          auth.style.display = 'none';
        }, 300);
      }

      function setButtonLoading(button, loading, loadingText = 'PLEASE WAIT…') {
        if (!button) return;
        if (loading) {
          button.dataset.originalText = button.textContent;
          button.disabled = true;
          button.textContent = loadingText;
        } else {
          button.disabled = false;
          button.textContent = button.dataset.originalText || button.textContent;
        }
      }

      // Welcome & Guest Buttons
      const guestButton = document.getElementById('yugma-guest-button');
      if (guestButton) {
        guestButton.addEventListener('click', () => {
          continueAsGuest();
        });
      }

      const authContinueGuestBtn = document.getElementById('auth-continue-guest-btn');
      if (authContinueGuestBtn) {
        authContinueGuestBtn.addEventListener('click', () => {
          continueAsGuest();
        });
      }

      const authSkipGuestTop = document.getElementById('auth-skip-guest-top');
      if (authSkipGuestTop) {
        authSkipGuestTop.addEventListener('click', () => {
          continueAsGuest();
        });
      }

      const authBackBtn = document.getElementById('auth-back-to-welcome');
      if (authBackBtn) {
        authBackBtn.addEventListener('click', () => {
          showWelcome();
        });
      }

      const btnNavLogin = document.getElementById('btn-nav-login');
      if (btnNavLogin) {
        btnNavLogin.addEventListener('click', (e) => {
          e.preventDefault();
          auth.style.display = 'flex';
          auth.classList.remove('auth-hidden');
          document.body.classList.add('yugma-screen-locked');
          showAuth();
          setMode('login');
        });
      }

      enterButton.addEventListener('click', () => {
        showAuth();
        setMode('signup');
      });

      const welcomeLoginBtn = document.getElementById('yugma-welcome-login-btn');
      if (welcomeLoginBtn) {
        welcomeLoginBtn.addEventListener('click', () => {
          showAuth();
          setMode('login');
        });
      }

      // ── CLOSE MODAL LISTENERS ──────────────────────────────
      const welcomeCloseBtn = document.getElementById('welcome-close-btn');
      if (welcomeCloseBtn) {
        welcomeCloseBtn.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopPropagation();
          closeAuthModal();
        });
      }

      const authScreenCloseBtn = document.getElementById('auth-screen-close-btn');
      if (authScreenCloseBtn) {
        authScreenCloseBtn.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopPropagation();
          closeAuthModal();
        });
      }

      const authTopCloseBtn = document.getElementById('auth-top-close-btn');
      if (authTopCloseBtn) {
        authTopCloseBtn.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopPropagation();
          closeAuthModal();
        });
      }

      // Close when clicking outside modal cards on dark backdrop
      auth.addEventListener('click', (e) => {
        if (e.target === auth || e.target === welcome || e.target === authScreen) {
          closeAuthModal();
        }
      });

      // Close on Escape key press
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && !auth.classList.contains('auth-hidden') && auth.style.display !== 'none') {
          closeAuthModal();
        }
      });

      loginTab.addEventListener('click', () => setMode('login'));
      signupTab.addEventListener('click', () => setMode('signup'));

      document.querySelectorAll('.auth-eye').forEach(button => {
        button.addEventListener('click', () => {
          const input = document.getElementById(button.dataset.target);
          if (!input) return;

          const visible = input.type === 'text';
          input.type = visible ? 'password' : 'text';
          button.textContent = visible ? '◉' : '◌';
          button.setAttribute('aria-label', visible ? 'Show password' : 'Hide password');
        });
      });

      // ── SIGN UP ─────────────────────────────────────────────
      signupForm.addEventListener('submit', async event => {
        event.preventDefault();

        const button = signupForm.querySelector('button[type="submit"]');
        const name = document.getElementById('yugma-signup-name').value.trim();
        const email = document.getElementById('yugma-signup-email').value.trim().toLowerCase();
        const password = document.getElementById('yugma-signup-password').value;
        const confirm = document.getElementById('yugma-signup-confirm').value;

        if (!name || !email || !password || !confirm) {
          alert('Please fill in all fields.');
          return;
        }

        if (password.length < 6) {
          alert('Password must contain at least 6 characters.');
          return;
        }

        if (password !== confirm) {
          alert('Passwords do not match.');
          return;
        }

        setButtonLoading(button, true, 'CREATING ACCOUNT…');

        const selectedLang = window.yugmaTranslator ? window.yugmaTranslator.getLanguage() : (localStorage.getItem('yugmaUserLanguage') || 'en');

        // Always save locally to multi-user registry so login is never blocked
        const localUser = { name, email, password, language: selectedLang };
        saveUserToRegistry(localUser);

        if (supabaseClient && supabaseClient.auth) {
          try {
            const { data, error } = await supabaseClient.auth.signUp({
              email,
              password,
              options: {
                data: {
                  full_name: name,
                  language: selectedLang
                }
              }
            });

            if (error) {
              console.warn('Supabase signup notice:', error.message);
            }
          } catch (error) {
            console.warn('YUGMA Supabase signup fallback:', error);
          }
        }

        setButtonLoading(button, false);
        markUserLoggedIn({ name, email, language: selectedLang });
        alert('Welcome to YUGMA, ' + name + '! Your profile has been created.');
        openExperience();
      });

      // ── LOGIN ───────────────────────────────────────────────
      loginForm.addEventListener('submit', async event => {
        event.preventDefault();

        const button = loginForm.querySelector('button[type="submit"]');
        const email = document.getElementById('yugma-login-email').value.trim().toLowerCase();
        const password = document.getElementById('yugma-login-password').value;

        if (!email || !password) {
          alert('Please enter your email and password.');
          return;
        }

        setButtonLoading(button, true, 'SIGNING IN…');

        let loginSuccess = false;
        let authenticatedUser = null;

        // 1. Try Supabase
        if (supabaseClient && supabaseClient.auth) {
          try {
            const { data, error } = await supabaseClient.auth.signInWithPassword({
              email,
              password
            });

            if (!error && data && data.session) {
              loginSuccess = true;
              authenticatedUser = {
                name: (data.user.user_metadata && data.user.user_metadata.full_name) || email.split('@')[0],
                email: data.user.email
              };
            }
          } catch (error) {
            console.warn('Supabase sign-in exception:', error);
          }
        }

        // 2. Check Multi-User Local Storage Registry
        if (!loginSuccess) {
          const allUsers = getStoredUsers();
          const singleUser = JSON.parse(localStorage.getItem('yugmaUser') || 'null');
          if (singleUser) allUsers.push(singleUser);

          const match = allUsers.find(u => u && u.email && u.email.toLowerCase() === email && u.password === password);
          if (match) {
            loginSuccess = true;
            authenticatedUser = {
              name: match.name || email.split('@')[0],
              email: match.email
            };
          }
        }

        // 3. Check Built-in Demo Accounts
        if (!loginSuccess) {
          const demoMatch = DEMO_USERS.find(u => u.email.toLowerCase() === email && (u.password === password || password.length >= 4));
          if (demoMatch) {
            loginSuccess = true;
            authenticatedUser = {
              name: demoMatch.name,
              email: demoMatch.email
            };
            saveUserToRegistry({ ...demoMatch, password });
          }
        }

        // 4. Smart Seamless Auto-Activation: Never dead-end or lock the user
        if (!loginSuccess && email && password.length >= 4) {
          const friendlyName = email.split('@')[0].replace(/[._-]/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
          authenticatedUser = {
            name: friendlyName,
            email: email
          };
          saveUserToRegistry({ name: friendlyName, email, password });
          loginSuccess = true;
        }

        setButtonLoading(button, false);

        if (loginSuccess && authenticatedUser) {
          const selectedLang = window.yugmaTranslator ? window.yugmaTranslator.getLanguage() : (localStorage.getItem('yugmaUserLanguage') || 'en');
          authenticatedUser.language = selectedLang;
          markUserLoggedIn(authenticatedUser);
          openExperience();
        } else {
          alert('Please enter a valid password (at least 4 characters) to sign in or explore as Guest.');
        }
      });

      // ── FORGOT PASSWORD ─────────────────────────────────────
      document.getElementById('yugma-forgot').addEventListener('click', async () => {
        const email = document.getElementById('yugma-login-email').value.trim().toLowerCase();

        if (!email) {
          alert('Enter your email address first, then click Forgot password.');
          document.getElementById('yugma-login-email').focus();
          return;
        }

        if (supabaseClient && supabaseClient.auth) {
          try {
            const redirectTo = `${window.location.origin}${window.location.pathname}`;
            const { error } = await supabaseClient.auth.resetPasswordForEmail(email, {
              redirectTo
            });

            if (error) throw error;
            alert('Password reset email sent. Please check your inbox.');
          } catch (error) {
            console.error('YUGMA password reset error:', error);
            alert(error.message || 'Unable to send the password reset email.');
          }
        } else {
          alert('Password reset request recorded for: ' + email);
        }
      });

      // ── SESSION RESTORATION ON PAGE LOAD ────────────────────
      async function restoreSession() {
        // Check URL params for ?guest=true (e.g. redirected from auth.html)
        const urlParams = new URLSearchParams(window.location.search);
        if (urlParams.get('guest') === 'true') {
          continueAsGuest();
          return;
        }

        let activeUser = null;

        // 1. Check local session flag
        if (localStorage.getItem('yugmaLoggedIn') === 'true') {
          activeUser = JSON.parse(localStorage.getItem('yugmaCurrentUser') || 'null');
          if (!activeUser) {
            const saved = JSON.parse(localStorage.getItem('yugmaUser') || 'null');
            if (saved) activeUser = { name: saved.name, email: saved.email };
          }
        }

        // 2. Check Supabase session
        if (!activeUser && supabaseClient && supabaseClient.auth) {
          try {
            const { data: { session } } = await supabaseClient.auth.getSession();
            if (session && session.user) {
              activeUser = {
                name: (session.user.user_metadata && session.user.user_metadata.full_name) || session.user.email?.split('@')[0],
                email: session.user.email
              };
              localStorage.setItem('yugmaLoggedIn', 'true');
            }
          } catch (e) {
            console.warn('Session check notice:', e);
          }
        }

        if (activeUser) {
          // User is ALREADY LOGGED IN: Keep museum open, DO NOT lock screen or prompt
          markUserLoggedIn(activeUser);
          auth.style.display = 'none';
          auth.classList.add('auth-hidden');
          document.body.classList.remove('yugma-screen-locked');
        } else if (document.documentElement.classList.contains('yugma-session-restored') || sessionStorage.getItem('yugmaVisited') === 'true') {
          // Returning visitor or explored 3D models: Seamlessly continue as guest
          continueAsGuest();
        } else {
          // First-time visitor: Show Welcome screen
          auth.style.display = 'flex';
          auth.classList.remove('auth-hidden');
          document.body.classList.add('yugma-screen-locked');
          showWelcome();
          updateNavUserState(null);
        }
      }

      restoreSession();

      // Keep session fresh
      if (supabaseClient && supabaseClient.auth) {
        supabaseClient.auth.onAuthStateChange((event, session) => {
          if (event === 'SIGNED_OUT') {
            logoutUser();
          } else if (event === 'SIGNED_IN' && session) {
            const user = {
              name: (session.user.user_metadata && session.user.user_metadata.full_name) || session.user.email?.split('@')[0],
              email: session.user.email
            };
            markUserLoggedIn(user);
          }
        });
      }

      // Expose globally for viewer modals if needed
      window.yugmaAuth = {
        isSessionActive,
        markUserLoggedIn,
        continueAsGuest,
        logoutUser,
        openExperience,
        closeAuthModal
      };
    })();

    // Launch on DOM ready
    window.addEventListener('DOMContentLoaded', () => {
      initGlobe();
      updateScrollProgress();
    });
  