/* =============================================================================
   YUGMA SMART HERITAGE JOURNEY PLANNER - ENGINE
   Comprehensive Geospatial Itinerary Generator & Master 22 Monuments Registry
   ============================================================================= */

(function () {
  'use strict';

  // ── 1. SUPABASE CREDENTIALS & INITIALIZATION ──────────────────────────────
  const SUPABASE_URL = 'https://eynqtscwrepndronybwp.supabase.co';
  const SUPABASE_PUBLISHABLE_KEY = 'sb_publishable_ioQVRqBT2tQd7hlCWB5Rbg_MEXJ_4_M';
  let supabase = null;

  if (window.supabase && typeof window.supabase.createClient === 'function') {
    try {
      supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
        auth: {
          persistSession: true,
          autoRefreshToken: true
        }
      });
    } catch (e) {
      console.warn('[YUGMA Planner] Supabase client init warning:', e);
    }
  }

  // ── 2. MASTER 22 HERITAGE DESTINATIONS DATASET ────────────────────────────
  const YUGMA_22_MONUMENTS = [
    {
      id: "taj_mahal",
      name: "Taj Mahal",
      nameHindi: "ताज महल",
      city: "Agra",
      state: "Uttar Pradesh",
      region: "North",
      lat: 27.1751,
      lng: 78.0421,
      category: "UNESCO World Heritage",
      style: "Mughal Imperial Architecture",
      era: "1632–1653 CE",
      whomMade: "Empress Mumtaz Mahal & Emperor Shah Jahan",
      visitHours: 3.0,
      bestTime: "Sunrise / Early Morning",
      viewerUrl: "taj_mahal_3d.html",
      voiceKey: "taj_mahal",
      thumb: "https://media.sketchfab.com/models/7b43e635cbfb47719d5a124302b78579/thumbnails/eaaa828910514951b184ca1e361958bb/2efe8e3aefbb4104b0ce7f8dfdae0d71.jpeg",
      tags: ["unesco", "architecture", "palace_fort", "monumental"],
      desc: "A symmetrical wonder of translucent Makrana white marble, four outward-canted minarets, central dome, and Pietra Dura semiprecious stone inlays on the sacred Yamuna riverbank."
    },
    {
      id: "amber_fort",
      name: "Amber Fort",
      nameHindi: "आमेर क़िला",
      city: "Jaipur",
      state: "Rajasthan",
      region: "North",
      lat: 26.9855,
      lng: 75.8513,
      category: "UNESCO Hill Forts",
      style: "Rajput-Mughal Fortification",
      era: "1592 CE",
      whomMade: "Raja Man Singh I (Kachwaha Rajputs)",
      visitHours: 3.0,
      bestTime: "Morning",
      viewerUrl: "amberfort-vr.html",
      voiceKey: "amber_fort",
      thumb: "amber_fort_tripo_thumb.jpg",
      tags: ["unesco", "palace_fort", "architecture"],
      desc: "Perched dramatically above Maota Lake in the rugged Aravalli hills, blending martial fortifications with opulent courtyards, Sheesh Mahal mirror mosaics, and the grand Ganesh Pol."
    },
    {
      id: "ajanta_caves",
      name: "Ajanta & Ellora Caves",
      nameHindi: "अजिंठा व वेरूळ लेणी",
      city: "Chhatrapati Sambhajinagar",
      state: "Maharashtra",
      region: "West",
      lat: 20.5519,
      lng: 75.7033,
      category: "UNESCO World Heritage",
      style: "Ancient Rock-Cut Architecture",
      era: "2nd C. BCE – 10th C. CE",
      whomMade: "Vakataka & Rashtrakuta Dynasties",
      visitHours: 4.0,
      bestTime: "Full Day Exploration",
      viewerUrl: "ajanta-ellora-caves.html",
      voiceKey: "ajanta_caves",
      thumb: "https://media.sketchfab.com/models/d916f1bc949c4284ab3fe56ddbfe660d/thumbnails/a278abf7fae242a5adb34bc61b4b433f/b44638751fe24bef9d921fe34ce7cb33.jpeg",
      tags: ["unesco", "spiritual", "rock_cut", "architecture"],
      desc: "Thirty rock-cut caves carved into volcanic basalt cliffs containing timeless Buddhist frescoes and the world's largest monolithic rock excavation: the Kailasa Temple."
    },
    {
      id: "rani_ki_vav",
      name: "Rani Ki Vav",
      nameHindi: "રાણકી વાવ",
      city: "Patan",
      state: "Gujarat",
      region: "West",
      lat: 23.8589,
      lng: 72.1016,
      category: "UNESCO World Heritage",
      style: "Maru-Gurjara Subterranean Architecture",
      era: "11th Century CE",
      whomMade: "Queen Udayamati (Solanki / Chaulukya Dynasty)",
      visitHours: 2.0,
      bestTime: "Morning / Afternoon",
      viewerUrl: "rani_ki_vav.html",
      voiceKey: "rani_ki_vav",
      thumb: "https://media.sketchfab.com/models/1a4fee746a4449c9b67c833fefbf7f98/thumbnails/dc001e4a58f64c6d9c62ab1532c64fc3/67b86eb5ad1a4812ba4128eb701850c5.jpeg",
      tags: ["unesco", "rock_cut", "architecture", "spiritual"],
      desc: "An inverted subterranean temple descending into seven levels of stepped terraces adorned with over 500 intricate sculptures honoring Lord Vishnu and Dasavatara."
    },
    {
      id: "brihadisvara",
      name: "Brihadisvara Temple",
      nameHindi: "बृहदीश्वर मन्दिर",
      city: "Thanjavur",
      state: "Tamil Nadu",
      region: "South",
      lat: 10.7828,
      lng: 79.1318,
      category: "UNESCO Great Living Chola Temples",
      style: "Dravidian Temple Architecture",
      era: "1010 CE",
      whomMade: "Emperor Rajaraja Chola I",
      visitHours: 2.5,
      bestTime: "Late Afternoon / Golden Hour",
      viewerUrl: "brihadisvara-vr.html",
      voiceKey: "brihadisvara",
      thumb: "https://media.sketchfab.com/models/3028fae929f94ca4b344eebfc859da5d/thumbnails/b0a43063467645d19fbef75b3c5a6109/67635c0cf375498a9c33306d86db49db.jpeg",
      tags: ["unesco", "spiritual", "architecture"],
      desc: "An all-granite monumental temple rising 66 meters into the sky, crowned by an 80-tonne monolithic cupola and a massive monolithic Nandi bull facing the inner sanctum."
    },
    {
      id: "victoria_memorial",
      name: "Victoria Memorial",
      nameHindi: "ভিক্টোরিয়া মেমোরিয়াল",
      city: "Kolkata",
      state: "West Bengal",
      region: "East",
      lat: 22.5448,
      lng: 88.3426,
      category: "Colonial Heritage Monument",
      style: "Indo-Saracenic & British Classical",
      era: "1906–1921 CE",
      whomMade: "Architect William Emerson (Commissioned by Lord Curzon)",
      visitHours: 2.5,
      bestTime: "Afternoon / Evening",
      viewerUrl: "victoriamemorial-vr.html",
      voiceKey: "victoria_memorial",
      thumb: "https://media.sketchfab.com/models/1b3ec6a1a07949d08221f718fd1919d4/thumbnails/66c5ae5978394509b7af1c5314b94e03/694cac71125248fea49b1d690ed192fb.jpeg",
      tags: ["architecture", "monumental"],
      desc: "Built of white Makrana marble across 64 acres of landscaped gardens, crowned by a 16-foot rotating bronze Angel of Victory and housing rare royal paintings and archives."
    },
    {
      id: "hampi_chariot",
      name: "Hampi (Stone Chariot & Ruins)",
      nameHindi: "हम्पी (प्रस्तर रथ)",
      city: "Vijayanagara",
      state: "Karnataka",
      region: "South",
      lat: 15.3350,
      lng: 76.4600,
      category: "UNESCO World Heritage",
      style: "Vijayanagara Imperial Architecture",
      era: "14th–16th Century CE",
      whomMade: "Vijayanagara Kings (King Krishnadevaraya)",
      visitHours: 4.0,
      bestTime: "Early Morning / Sunset",
      viewerUrl: "hampi_precise.html",
      voiceKey: "hampi_chariot",
      thumb: "https://media.sketchfab.com/models/ba4ce0e4b3064e43be4c4e7fb7da5587/thumbnails/ec91b29a27864f1997d8bcf5c3fc80d6/25cfd430a7d94f279fe5387498c47d63.jpeg",
      tags: ["unesco", "architecture", "spiritual", "rock_cut"],
      desc: "The boulder-strewn capital of the Vijayanagara Empire, featuring the iconic Stone Chariot of Vittala Temple, musical pillars, and expansive royal and spiritual complexes."
    },
    {
      id: "konark_sun",
      name: "Konark Sun Temple",
      nameHindi: "कोणार्क सूर्य मंदिर",
      city: "Puri",
      state: "Odisha",
      region: "East",
      lat: 19.8876,
      lng: 86.0945,
      category: "UNESCO World Heritage",
      style: "Kalinga Temple Architecture",
      era: "1250 CE",
      whomMade: "King Narasimhadeva I (Eastern Ganga Dynasty)",
      visitHours: 2.5,
      bestTime: "Morning / Sunrise",
      viewerUrl: "odisha_precise.html",
      voiceKey: "konark_sun",
      thumb: "https://media.sketchfab.com/models/c68fa816e87d498fa64efc91c062fbdf/thumbnails/4462cb3c206d4e5f98cfba5e6302e2c0/c5be1441857948a28795da1f1e31db72.jpeg",
      tags: ["unesco", "spiritual", "architecture"],
      desc: "Conceived as a cosmic chariot for Surya the Sun God with 24 carved stone sundial wheels pulled by seven horses, sculpted out of Khondalite stone near the Bay of Bengal."
    },
    {
      id: "padmanabhapuram",
      name: "Padmanabhapuram Palace",
      nameHindi: "पद्मनाभपुरम महल",
      city: "Thuckalay",
      state: "Kerala",
      region: "South",
      lat: 8.2508,
      lng: 77.3271,
      category: "Royal Heritage Palace",
      style: "Traditional Kerala Wooden Architecture",
      era: "1601 CE",
      whomMade: "Travancore Royal Dynasty (Iravi Varma Kulasekhara Perumal)",
      visitHours: 2.5,
      bestTime: "Morning",
      viewerUrl: "padmanabhapuram-vr.html",
      voiceKey: "padmanabhaswamy",
      thumb: "https://media.sketchfab.com/models/0d75a133d1e1494883bbfa85cb0a6e35/thumbnails/2665be53fef342f0a1738fc9f12d8a43/e80ba62ef8ea457cb192fb71c7d21d60.jpeg",
      tags: ["palace_fort", "architecture"],
      desc: "Asia's largest monolithic teak and rosewood palace complex, renowned for carved floral ceilings, Belgian glass mirrors, secret escape tunnels, and medicinal herbs."
    },
    {
      id: "rang_ghar",
      name: "Rang Ghar Amphitheater",
      nameHindi: "রং ঘৰ",
      city: "Sivasagar",
      state: "Assam",
      region: "Northeast",
      lat: 26.9657,
      lng: 94.6222,
      category: "Ahom Royal Monument",
      style: "Ahom Kingdom Royal Architecture",
      era: "1744–1751 CE",
      whomMade: "Swargadeo Pramatta Singha (Ahom Dynasty)",
      visitHours: 1.5,
      bestTime: "Morning / Afternoon",
      viewerUrl: "rang_ghar_precision.html",
      voiceKey: "rang_ghar",
      thumb: "https://media.sketchfab.com/models/f5cff554c5ee49bda050ff592ef8805f/thumbnails/fbf705c755be4ca1a56658dfa7322d7a/dd8f85f57ff847528e19c0cb80f8f9e6.jpeg",
      tags: ["architecture", "palace_fort"],
      desc: "Asia's oldest surviving royal amphitheater, built with indigenous bricks bonded by sticky rice paste and duck eggs, where Ahom royals watched traditional buffalo fights and Bihu dance."
    },
    {
      id: "mahabodhi",
      name: "Mahabodhi Temple",
      nameHindi: "महाबोधि मंदिर",
      city: "Bodh Gaya",
      state: "Bihar",
      region: "East",
      lat: 24.6960,
      lng: 84.9913,
      category: "UNESCO World Heritage",
      style: "Ancient Brick Buddhist Architecture",
      era: "3rd C. BCE – 5th C. CE",
      whomMade: "Emperor Ashoka (Later renovated by Gupta Kings)",
      visitHours: 3.0,
      bestTime: "Early Morning / Evening Meditation",
      viewerUrl: "mahabodhi_explorer.html",
      voiceKey: "mahabodhi",
      thumb: "https://media.sketchfab.com/models/dfa74dca766f4370a599187ec7e8aa69/thumbnails/00ecbcf68aa74ba18bb2c2a9a7b9319e/63897b2d56a34491959828d57d76ec1f.jpeg",
      tags: ["unesco", "spiritual", "architecture"],
      desc: "The supreme holy sanctuary marking the spot where Siddhartha Gautama attained supreme Enlightenment under the sacred Bodhi Tree, anchored by a 55-meter pyramidal tower."
    },
    {
      id: "lakshmana_temple",
      name: "Lakshmana Temple",
      nameHindi: "लक्ष्मण मंदिर",
      city: "Sirpur",
      state: "Chhattisgarh",
      region: "Central",
      lat: 21.3418,
      lng: 82.1788,
      category: "Ancient Monument",
      style: "Early Nagara Brick Architecture",
      era: "7th Century CE (625–650 CE)",
      whomMade: "Queen Vasata (Somavamsi Dynasty)",
      visitHours: 2.0,
      bestTime: "Morning",
      viewerUrl: "lakshmana_temple_3d.html",
      voiceKey: "lakshmana_temple",
      thumb: "https://media.sketchfab.com/models/2c206fa104b248a394ec562c5750d4ad/thumbnails/d533ea986bba46c59218671fbb7d63a8/d8e3d6411dd74308a0d7a0be4f346513.jpeg",
      tags: ["spiritual", "architecture"],
      desc: "One of India's finest surviving ancient brick temples, built with red stone and carved bricks dedicated to Lord Vishnu, featuring exquisite Krishna-lila reliefs and ornate torana portals."
    },
    {
      id: "bom_jesus",
      name: "Basilica of Bom Jesus",
      nameHindi: "बोम जिजस बेसिलिका",
      city: "Old Goa",
      state: "Goa",
      region: "West",
      lat: 15.5009,
      lng: 73.9116,
      category: "UNESCO World Heritage",
      style: "Baroque & Mannerist Architecture",
      era: "1594–1605 CE",
      whomMade: "Jesuit Order of Goa",
      visitHours: 2.0,
      bestTime: "Morning / Late Afternoon",
      viewerUrl: "bom_jesus_3d.html",
      voiceKey: "bom_jesus",
      thumb: "https://media.sketchfab.com/models/b51a0ccbf0e74c3c8a929f03008c3f84/thumbnails/ac75a0e5e2704a3b8622614afb568e1b/9d50ad9980064c9a9c328ea40e7c42b6.jpeg",
      tags: ["unesco", "spiritual", "architecture"],
      desc: "A masterpiece of Baroque architecture built of unplastered red laterite stone and Basalt. Houses the sacred relics of St. Francis Xavier inside a silver casket in a Florentine marble mausoleum."
    },
    {
      id: "lepakshi_temple",
      name: "Lepakshi Veerabhadra Temple",
      nameHindi: "లేపాక్షి వీరభద్ర దేవాలయం",
      city: "Lepakshi",
      state: "Andhra Pradesh",
      region: "South",
      lat: 13.8041,
      lng: 77.6074,
      category: "Historic Vijayanagara Sanctuary",
      style: "Vijayanagara Rock Temple",
      era: "1530 CE",
      whomMade: "Virupanna & Viranna under Emperor Achyuta Deva Raya",
      visitHours: 2.5,
      bestTime: "Morning",
      viewerUrl: "lepakshi_temple_3d.html",
      voiceKey: "lepakshi_temple",
      thumb: "https://media.sketchfab.com/models/e9e1e5ebbd61447dacee4949a5b60eeb/thumbnails/01ec1364007742feb32edafaa567d3af/481c778d95e247d7ac886e1e522b8128.jpeg",
      tags: ["spiritual", "architecture", "rock_cut"],
      desc: "Celebrated for its gravity-defying hanging pillar, the colossal monolithic Basavanna Nandi bull, seven-hooded Nagalinga carved from rock, and vibrant 16th-century Puranic ceiling frescoes."
    },
    {
      id: "statue_of_unity",
      name: "Statue of Unity",
      nameHindi: "સ્ટેચ્યુ ઓફ યુનિટી",
      city: "Kevadia (Narmada)",
      state: "Gujarat",
      region: "West",
      lat: 21.8380,
      lng: 73.7191,
      category: "World's Tallest Colossus (182m)",
      style: "Modern Monumental Engineering",
      era: "2013–2018 CE",
      whomMade: "Sculptor Ram V. Sutar (Honoring Sardar Vallabhbhai Patel)",
      visitHours: 3.5,
      bestTime: "Morning / Sunset Light Show",
      viewerUrl: "statue_of_unity_3d.html",
      voiceKey: "statue_of_unity",
      thumb: "https://media.sketchfab.com/models/2221e03866f24817972a16f3ad17c168/thumbnails/fc8cfb9bc06e4815a5d1fbfe29c43aa5/b1b0ae9f83c84516bf4b047c6b945325.jpeg",
      tags: ["monumental", "architecture"],
      desc: "Soaring 182 meters (597 feet) above the sacred Narmada River facing Sardar Sarovar Dam, honoring Sardar Vallabhbhai Patel, the 'Iron Man of India' who unified 562 princely states."
    },
    {
      id: "jageshwar_dham",
      name: "Jageshwar Dham Temple Cluster",
      nameHindi: "जागेश्वर धाम",
      city: "Almora",
      state: "Uttarakhand",
      region: "North",
      lat: 29.6417,
      lng: 79.8519,
      category: "Himalayan Sacred Cluster",
      style: "Kumaon Nagara Architecture",
      era: "8th–12th Century CE",
      whomMade: "Katyuri & Chand Dynasties",
      visitHours: 2.5,
      bestTime: "Morning / Early Afternoon",
      viewerUrl: "jageshwar-vr.html",
      voiceKey: "jageshwar",
      thumb: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/Jageshwar_Temple_Complex.jpg/640px-Jageshwar_Temple_Complex.jpg",
      tags: ["spiritual", "architecture"],
      desc: "A cluster of over 100 Latina stone Nagara temples nestled among towering Deodar cedar forests in the Jata Ganga valley, housing the ancient Maha Mrityunjaya Mahadev shrine."
    },
    {
      id: "neermahal_palace",
      name: "Neermahal Water Palace",
      nameHindi: "নীরমহল",
      city: "Melaghar",
      state: "Tripura",
      region: "Northeast",
      lat: 23.4984,
      lng: 91.3183,
      category: "Royal Water Palace",
      style: "Hindu-Islamic Fusion",
      era: "1930–1938 CE",
      whomMade: "Maharaja Bir Bikram Kishore Manikya",
      visitHours: 2.5,
      bestTime: "Afternoon / Sunset Boat Ride",
      viewerUrl: "neermahal-vr.html",
      voiceKey: "neermahal",
      thumb: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/Neermahal_Tripura.jpg/640px-Neermahal_Tripura.jpg",
      tags: ["palace_fort", "architecture"],
      desc: "Floating jewel of the Manikya kings built in the center of Rudrasagar Lake, fusing Hindu and Mughal pavilions with motorboat landing docks and royal water gardens."
    },
    {
      id: "golden_temple",
      name: "Golden Temple (Sri Harmandir Sahib)",
      nameHindi: "ਸ੍ਰੀ ਹਰਿਮੰਦਰ ਸਾਹਿਬ",
      city: "Amritsar",
      state: "Punjab",
      region: "North",
      lat: 31.6200,
      lng: 74.8765,
      category: "Sacred Sikh Sanctuary",
      style: "Sikh Architecture & Gold Gilding",
      era: "1581–1604 CE",
      whomMade: "Guru Arjan Dev Ji (Gilded by Maharaja Ranjit Singh)",
      visitHours: 3.0,
      bestTime: "Early Morning / Night Illumination",
      viewerUrl: "goldentemple-vr.html",
      voiceKey: "golden_temple",
      thumb: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/94/The_Golden_Temple_of_Amritsar_7.jpg/640px-The_Golden_Temple_of_Amritsar_7.jpg",
      tags: ["spiritual", "architecture", "monumental"],
      desc: "The celestial gilded sanctum resting serenely in the sacred Amrit Sarovar (Pool of Nectar), featuring four open doorways welcoming people of all faiths, backgrounds, and walks of life."
    },
    {
      id: "sanchi_stupa",
      name: "Great Stupa of Sanchi",
      nameHindi: "साँची का महान स्तूप",
      city: "Sanchi",
      state: "Madhya Pradesh",
      region: "Central",
      lat: 23.4795,
      lng: 77.7397,
      category: "UNESCO World Heritage",
      style: "Ancient Buddhist Monumental Architecture",
      era: "3rd C. BCE – 1st C. CE",
      whomMade: "Emperor Ashoka the Great (Toranas added by Satavahanas)",
      visitHours: 2.5,
      bestTime: "Morning / Golden Afternoon",
      viewerUrl: "sanchistupa-vr.html",
      voiceKey: "sanchi_stupa",
      thumb: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/07/Sanchi_Stupa_from_Eastern_gate%2C_Madhya_Pradesh.jpg/640px-Sanchi_Stupa_from_Eastern_gate%2C_Madhya_Pradesh.jpg",
      tags: ["unesco", "spiritual", "architecture"],
      desc: "The oldest stone structure in India, crowned by the harmika and chhatra, surrounded by four magnificent carved ceremonial Torana gateways illustrating Jataka tales and Ashokan edicts."
    },
    {
      id: "gateway_of_india",
      name: "Gateway of India",
      nameHindi: "गेटवे ऑफ़ इंडिया",
      city: "Mumbai",
      state: "Maharashtra",
      region: "West",
      lat: 18.9220,
      lng: 72.8347,
      category: "Historic Harbor Monument",
      style: "Indo-Saracenic Basalt Architecture",
      era: "1911–1924 CE",
      whomMade: "Architect George Wittet",
      visitHours: 1.5,
      bestTime: "Sunset / Evening Sea Breeze",
      viewerUrl: "gatewayofindia-vr.html",
      voiceKey: "gateway_of_india",
      thumb: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Mumbai_03-2016_30_Gateway_of_India.jpg/640px-Mumbai_03-2016_30_Gateway_of_India.jpg",
      tags: ["architecture", "monumental"],
      desc: "Triumphal basalt arch standing at Apollo Bunder overlooking the Arabian Sea, blending 16th-century Gujarati architecture with European triumphal arches."
    },
    {
      id: "rajgad_fort",
      name: "Rajgad Fort",
      nameHindi: "राजगड किल्ला",
      city: "Pune",
      state: "Maharashtra",
      region: "West",
      lat: 18.2562,
      lng: 73.6828,
      category: "Maratha Imperial Fort",
      style: "Hill Fort Architecture",
      era: "1647 CE",
      whomMade: "Chhatrapati Shivaji Maharaj",
      visitHours: 4.0,
      bestTime: "Early Morning Trek",
      viewerUrl: "rajgadfort-vr.html",
      voiceKey: "rajgad_fort",
      thumb: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Rajgad_Fort_view.jpg/640px-Rajgad_Fort_view.jpg",
      tags: ["palace_fort", "architecture"],
      desc: "Perched at 1,376 meters in the Sahyadri mountains, the first sovereign capital of the Maratha Empire, famed for its impregnable Suvela and Sanjivani machis and the central Bale Killa citadel."
    },
    {
      id: "humayun_tomb",
      name: "Humayun's Tomb & Delhi Heritage",
      nameHindi: "हुमायूँ का मक़बरा",
      city: "New Delhi",
      state: "Delhi",
      region: "North",
      lat: 28.5933,
      lng: 77.2507,
      category: "UNESCO World Heritage",
      style: "Mughal Charbagh Garden Tomb",
      era: "1565–1572 CE",
      whomMade: "Empress Bega Begum & Architect Mirak Mirza Ghiyas",
      visitHours: 2.5,
      bestTime: "Late Afternoon",
      viewerUrl: "humayunstomb-vr.html",
      voiceKey: "humayun_tomb",
      thumb: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/97/Humayun%27s_Tomb%2C_Delhi%2C_India.jpg/640px-Humayun%27s_Tomb%2C_Delhi%2C_India.jpg",
      tags: ["unesco", "palace_fort", "architecture"],
      desc: "The sublime prototype for the Taj Mahal, set within a quadrilateral Charbagh paradise garden, featuring red sandstone and white marble double dome with neighboring Qutub Minar & Lotus Temple."
    }
  ];

  // ── 3. ORIGIN HUBS PRESETS ────────────────────────────────────────────────
  const ORIGIN_HUBS = {
    delhi: { name: "New Delhi (DEL)", lat: 28.6139, lng: 77.2090 },
    mumbai: { name: "Mumbai (BOM)", lat: 18.9220, lng: 72.8347 },
    bengaluru: { name: "Bengaluru (BLR)", lat: 12.9716, lng: 77.5946 },
    kolkata: { name: "Kolkata (CCU)", lat: 22.5726, lng: 88.3639 },
    jaipur: { name: "Jaipur (JAI)", lat: 26.9124, lng: 75.7873 },
    chennai: { name: "Chennai (MAA)", lat: 13.0827, lng: 80.2707 },
    hyderabad: { name: "Hyderabad (HYD)", lat: 17.3850, lng: 78.4867 },
    ahmedabad: { name: "Ahmedabad (AMD)", lat: 23.0225, lng: 72.5714 },
    kochi: { name: "Kochi (COK)", lat: 9.9312, lng: 76.2673 },
    amritsar: { name: "Amritsar (ATQ)", lat: 31.6340, lng: 74.8723 },
    varanasi: { name: "Varanasi (VNS)", lat: 25.3176, lng: 82.9739 },
    pune: { name: "Pune (PNQ)", lat: 18.5204, lng: 73.8567 }
  };

  // Day Theme Color Palette
  const DAY_COLORS = [
    '#c9a24a', // Day 1: Gold
    '#e0231c', // Day 2: Vermilion
    '#38bdf8', // Day 3: Cyan
    '#10b981', // Day 4: Emerald
    '#a855f7', // Day 5: Amethyst
    '#f59e0b', // Day 6: Amber
    '#f43f5e', // Day 7: Rose
    '#06b6d4', // Day 8: Teal
    '#ec4899', // Day 9: Pink
    '#84cc16'  // Day 10+: Lime
  ];

    // ── CARTO OFFICIAL BASEMAP CONFIGURATION ──────────────────────────────────
  const CARTO_API_KEY = 'cb1_5306_1_b5051ead59e2e3d0fca373c9';
  const CARTO_BASEMAPS = {
    voyager: {
      name: 'CARTO Voyager',
      url: `https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}.png?key=${CARTO_API_KEY}`,
      vectorUrl: `https://basemaps.cartocdn.com/gl/voyager-gl-style/style.json?key=${CARTO_API_KEY}`,
      subdomains: 'abcd',
      maxZoom: 20,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/" target="_blank">CARTO</a>'
    },
    dark_matter: {
      name: 'CARTO Dark Matter',
      url: `https://{s}.basemaps.cartocdn.com/rastertiles/dark_all/{z}/{x}/{y}.png?key=${CARTO_API_KEY}`,
      subdomains: 'abcd',
      maxZoom: 20,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/" target="_blank">CARTO</a>'
    },
    positron: {
      name: 'CARTO Positron',
      url: `https://{s}.basemaps.cartocdn.com/rastertiles/light_all/{z}/{x}/{y}.png?key=${CARTO_API_KEY}`,
      subdomains: 'abcd',
      maxZoom: 20,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/" target="_blank">CARTO</a>'
    }
  };

  // ── 4. STATE STORE ────────────────────────────────────────────────────────
  const state = {
    currentUser: null,
    isRegistered: false,
    selectedMonumentIds: new Set(["taj_mahal", "amber_fort", "humayun_tomb"]),
    activePreset: "north",
    activeRegionFilter: "all",
    searchQuery: "",
    origin: { name: "New Delhi (DEL)", lat: 28.6139, lng: 77.2090 },
    durationDays: 3,
    pace: "balanced", // relaxed, balanced, intensive
    travelMode: "car", // car, transit, flight, walking
    currentItinerary: null,
    savedJourneys: [],
    map: null,
    mapMarkers: [],
    mapPolylines: [],
    activeDayFilter: "all",
    currentTileLayer: null,
    activeBasemapStyle: "voyager"
  };

  // ── 5. HAVERSINE DISTANCE FORMULA (KM) ────────────────────────────────────
  function haversineDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Earth's mean radius in km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return Math.round(R * c);
  }

  // ── 6. SMART ITINERARY GENERATOR ALGORITHM ─────────────────────────────────
  function generateSmartItinerary() {
    const selectedList = YUGMA_22_MONUMENTS.filter(m => state.selectedMonumentIds.has(m.id));
    if (selectedList.length === 0) {
      alert("Please select at least one monument to generate an itinerary.");
      return null;
    }

    const numDays = Math.max(1, parseInt(state.durationDays, 10) || 3);
    const pace = state.pace;
    const origin = state.origin;

    // 1. Sort / Cluster monuments by spatial proximity
    // Greedy Nearest-Neighbor clustering into days
    let unvisited = [...selectedList];
    let currentPoint = { lat: origin.lat, lng: origin.lng };
    let days = [];

    // Initialize days structure
    for (let d = 0; d < numDays; d++) {
      days.push({
        dayNumber: d + 1,
        color: DAY_COLORS[d % DAY_COLORS.length],
        title: `Day ${d + 1}`,
        regionFocus: "",
        stops: [],
        totalTravelKm: 0,
        totalEstHours: 0
      });
    }

    // Allocate stops across days smoothly according to trip duration and pace
    let dayIndex = 0;
    while (unvisited.length > 0 && dayIndex < numDays) {
      const remainingMonuments = unvisited.length;
      const remainingDays = numDays - dayIndex;
      // Target stops for today
      let targetForToday = Math.ceil(remainingMonuments / remainingDays);
      if (pace === 'relaxed' && targetForToday > 2 && remainingDays > 1) targetForToday = 2;
      if (pace === 'balanced' && targetForToday > 3 && remainingDays > 1) targetForToday = 3;
      if (pace === 'intensive' && targetForToday > 4 && remainingDays > 1) targetForToday = 4;

      while (days[dayIndex].stops.length < targetForToday && unvisited.length > 0) {
        // Find closest monument to currentPoint (minimize inter-stop transit)
        let bestIdx = 0;
        let minDistance = Infinity;
        for (let i = 0; i < unvisited.length; i++) {
          const dist = haversineDistance(currentPoint.lat, currentPoint.lng, unvisited[i].lat, unvisited[i].lng);
          if (dist < minDistance) {
            minDistance = dist;
            bestIdx = i;
          }
        }
        const nextMonument = unvisited.splice(bestIdx, 1)[0];
        days[dayIndex].stops.push(nextMonument);
        currentPoint = { lat: nextMonument.lat, lng: nextMonument.lng };
      }

      if (dayIndex < numDays - 1) {
        dayIndex++;
      } else {
        // On the final day, place any remaining monuments
        while (unvisited.length > 0) {
          days[dayIndex].stops.push(unvisited.shift());
        }
        break;
      }
    }

    // Remove empty trailing days if selected stops are fewer than days
    days = days.filter(d => d.stops.length > 0);

    // Compute times, distances, regions, and external route links
    let globalTotalKm = 0;
    let globalExplorationHours = 0;

    days.forEach((day, dIdx) => {
      let dayKm = 0;
      let dayHours = 0;
      const regionsInDay = new Set();

      // Starting time for the day
      let currentHour = 9.0; // 09:00 AM

      day.stops.forEach((stop, sIdx) => {
        regionsInDay.add(stop.state);

        // Previous point for distance calculation
        let prevPoint;
        if (sIdx === 0) {
          if (dIdx === 0) {
            prevPoint = origin;
          } else {
            // Distance from last stop of previous day
            const prevDayLastStop = days[dIdx - 1].stops[days[dIdx - 1].stops.length - 1];
            prevPoint = prevDayLastStop;
          }
        } else {
          prevPoint = day.stops[sIdx - 1];
        }

        const legDist = haversineDistance(prevPoint.lat, prevPoint.lng, stop.lat, stop.lng);
        dayKm += legDist;
        globalTotalKm += legDist;

        // Transit advice & duration
        let legTransitAdvice = "";
        let legDurationMin = 0;
        let transitIcon = "fa-car";

        if (legDist < 15) {
          legDurationMin = Math.round(legDist * 3) + 15;
          legTransitAdvice = `Local cab / taxi (~${legDurationMin} mins)`;
          transitIcon = "fa-car";
        } else if (legDist < 120) {
          legDurationMin = Math.round((legDist / 50) * 60);
          legTransitAdvice = `Scenic highway drive (~${Math.round(legDurationMin / 60)} hrs)`;
          transitIcon = "fa-car";
        } else if (legDist < 350) {
          legDurationMin = Math.round((legDist / 60) * 60);
          legTransitAdvice = `Intercity highway or express train (~${Math.round(legDurationMin / 60)} hrs)`;
          transitIcon = "fa-train";
        } else {
          legDurationMin = Math.round((legDist / 70) * 60);
          legTransitAdvice = `Long distance (${legDist} km): Recommended Vande Bharat Express or short domestic flight`;
          transitIcon = "fa-plane";
        }

        // Advance schedule time
        currentHour += (legDurationMin / 60);
        const startSlotStr = formatHourToTimeStr(currentHour);
        currentHour += stop.visitHours;
        const endSlotStr = formatHourToTimeStr(currentHour);
        dayHours += stop.visitHours;
        globalExplorationHours += stop.visitHours;

        // Buffer between stops for lunch / rest
        currentHour += 0.5;

        // Route URL: Google Maps Direction
        const gmapsUrl = `https://www.google.com/maps/dir/?api=1&origin=${prevPoint.lat},${prevPoint.lng}&destination=${stop.lat},${stop.lng}&travelmode=driving`;
        const osmUrl = `https://www.openstreetmap.org/directions?engine=fossgis_osrm_car&route=${prevPoint.lat}%2C${prevPoint.lng}%3B${stop.lat}%2C${stop.lng}`;

        stop.schedule = {
          timeSlot: `${startSlotStr} – ${endSlotStr}`,
          legDistanceKm: legDist,
          legDurationMin: legDurationMin,
          transitAdvice: legTransitAdvice,
          transitIcon: transitIcon,
          gmapsUrl: gmapsUrl,
          osmUrl: osmUrl,
          fromName: prevPoint.name || prevPoint.city || "Origin"
        };
      });

      day.totalTravelKm = dayKm;
      day.totalEstHours = Math.round(dayHours * 10) / 10;
      day.regionFocus = Array.from(regionsInDay).join(" & ");
      day.title = `Day ${day.dayNumber}: ${day.regionFocus} Heritage`;

      // Full day Google Maps multi-stop URL
      if (day.stops.length > 1) {
        const originStop = day.stops[0];
        const destStop = day.stops[day.stops.length - 1];
        const waypoints = day.stops.slice(1, -1).map(s => `${s.lat},${s.lng}`).join('|');
        day.fullDayGmapsUrl = `https://www.google.com/maps/dir/?api=1&origin=${originStop.lat},${originStop.lng}&destination=${destStop.lat},${destStop.lng}${waypoints ? `&waypoints=${waypoints}` : ''}&travelmode=driving`;
      } else {
        day.fullDayGmapsUrl = day.stops[0].schedule.gmapsUrl;
      }
    });

    const itineraryResult = {
      id: 'yg-journey-' + Date.now(),
      title: `${selectedList.length}-Site Indian Heritage Expedition`,
      createdAt: new Date().toISOString(),
      origin: origin,
      durationDays: days.length,
      pace: pace,
      travelMode: state.travelMode,
      totalSites: selectedList.length,
      totalTravelKm: globalTotalKm,
      totalExplorationHours: Math.round(globalExplorationHours * 10) / 10,
      days: days
    };

    state.currentItinerary = itineraryResult;
    saveDraftToLocalStorage();
    return itineraryResult;
  }

  function formatHourToTimeStr(decimalHour) {
    let hours = Math.floor(decimalHour);
    let minutes = Math.round((decimalHour - hours) * 60);
    if (minutes === 60) {
      hours += 1;
      minutes = 0;
    }
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const displayHours = hours % 12 === 0 ? 12 : hours % 12;
    const displayMinutes = minutes < 10 ? '0' + minutes : minutes;
    return `${displayHours}:${displayMinutes} ${ampm}`;
  }

  // ── 7. LEAFLET MAP INITIALIZATION & RENDERING ─────────────────────────────
  function initLeafletMap() {
    const mapContainer = document.getElementById('journey-leaflet-map');
    if (!mapContainer || state.map) return;

    // Center of India coordinates [21.5, 79.5]
    state.map = L.map('journey-leaflet-map', {
      center: [21.5, 79.5],
      zoom: 5,
      zoomControl: true,
      scrollWheelZoom: true
    });

    // Initialize with CARTO Voyager raster tiles authenticated via API key
    setBasemapStyle(state.activeBasemapStyle || 'voyager');
  }

  function setBasemapStyle(styleKey) {
    if (!state.map || !CARTO_BASEMAPS[styleKey]) return;
    const config = CARTO_BASEMAPS[styleKey];

    if (state.currentTileLayer) {
      state.map.removeLayer(state.currentTileLayer);
    }

    state.currentTileLayer = L.tileLayer(config.url, {
      attribution: config.attribution,
      subdomains: config.subdomains,
      maxZoom: config.maxZoom
    }).addTo(state.map);

    state.activeBasemapStyle = styleKey;
  }

  function renderMapItinerary(itinerary, filterDayNumber) {
    if (!state.map || !itinerary) return;

    // Clear existing markers and polylines
    clearMapLayers();

    const bounds = L.latLngBounds();
    const daysToRender = (filterDayNumber && filterDayNumber !== 'all')
      ? itinerary.days.filter(d => String(d.dayNumber) === String(filterDayNumber))
      : itinerary.days;

    daysToRender.forEach((day) => {
      const dayColor = day.color || '#c9a24a';
      const dayLatLngs = [];

      day.stops.forEach((stop, stopIdx) => {
        const latLng = [stop.lat, stop.lng];
        bounds.extend(latLng);
        dayLatLngs.push(latLng);

        // Custom HTML Marker with Day & Order tag
        const markerLabel = `D${day.dayNumber}-${stopIdx + 1}`;
        const markerHtml = `
          <div class="custom-gold-marker" style="--marker-color: ${dayColor};">
            <span>${markerLabel}</span>
          </div>
        `;

        const customIcon = L.divIcon({
          className: 'custom-leaflet-marker-wrapper',
          html: markerHtml,
          iconSize: [34, 34],
          iconAnchor: [17, 17],
          popupAnchor: [0, -18]
        });

        const marker = L.marker(latLng, { icon: customIcon }).addTo(state.map);

        // Rich Popup Content
        const popupContent = `
          <div class="map-popup-inner">
            <div class="popup-img-wrap">
              <img src="${stop.thumb}" alt="${stop.name}" class="popup-img" onerror="this.src='amber_fort_tripo_thumb.jpg'">
            </div>
            <div class="popup-title">${stop.name}</div>
            <div class="popup-sub">${stop.nameHindi || ''} • ${stop.city}, ${stop.state}</div>
            <div style="font-size:10px; color:#aab4ad; line-height:1.4;">${stop.category} (${stop.era})</div>
            <div style="font-size:10.5px; color:#c9a24a; font-weight:600; margin-top:2px;">
              ⏱ Suggested: ${stop.visitHours} hrs (${stop.schedule ? stop.schedule.timeSlot : ''})
            </div>
            <div class="popup-actions-row">
              <a href="${stop.viewerUrl}" target="_blank" class="btn-popup-action primary">
                <i class="fa-solid fa-cube"></i> 3D MODEL
              </a>
              <button type="button" class="btn-popup-action secondary" onclick="window.YugmaPlanner.playAudioSnippet('${stop.id}')">
                <i class="fa-solid fa-volume-high"></i> AUDIO
              </button>
            </div>
          </div>
        `;

        marker.bindPopup(popupContent);
        state.mapMarkers.push(marker);
      });

      // Render Polyline route for this day
      if (dayLatLngs.length > 1) {
        const polyline = L.polyline(dayLatLngs, {
          color: dayColor,
          weight: 3.5,
          opacity: 0.85,
          dashArray: '6, 8',
          lineCap: 'round'
        }).addTo(state.map);

        state.mapPolylines.push(polyline);
      }
    });

    // Fit map bounds to show all markers
    if (bounds.isValid()) {
      state.map.fitBounds(bounds, { padding: [50, 50], maxZoom: 14 });
    }
  }

  function clearMapLayers() {
    state.mapMarkers.forEach(m => state.map.removeLayer(m));
    state.mapPolylines.forEach(p => state.map.removeLayer(p));
    state.mapMarkers = [];
    state.mapPolylines = [];
  }

  // ── 8. DOM RENDERING FOR ITINERARY & MONUMENTS SELECTOR ────────────────────

  // Render Monument Checkboxes Grid
  function renderMonumentsSelector() {
    const grid = document.getElementById('monuments-selector-grid');
    if (!grid) return;

    grid.innerHTML = '';
    const query = (state.searchQuery || '').toLowerCase().trim();
    const region = state.activeRegionFilter;

    const filtered = YUGMA_22_MONUMENTS.filter(m => {
      const matchRegion = (region === 'all' || m.region.toLowerCase() === region.toLowerCase());
      const matchQuery = !query ||
        m.name.toLowerCase().includes(query) ||
        m.state.toLowerCase().includes(query) ||
        m.city.toLowerCase().includes(query) ||
        m.category.toLowerCase().includes(query);
      return matchRegion && matchQuery;
    });

    if (filtered.length === 0) {
      grid.innerHTML = `<div style="grid-column: 1/-1; text-align:center; padding:24px; color:#748077;">No heritage sites found matching "${query}".</div>`;
      return;
    }

    filtered.forEach(m => {
      const isSelected = state.selectedMonumentIds.has(m.id);
      const card = document.createElement('div');
      card.className = `monument-select-card ${isSelected ? 'selected' : ''}`;
      card.dataset.id = m.id;

      card.innerHTML = `
        <div class="monument-card-img-wrap">
          <img src="${m.thumb}" alt="${m.name}" class="monument-card-img" onerror="this.src='amber_fort_tripo_thumb.jpg'">
          <div class="card-check-indicator"><i class="fa-solid fa-check"></i></div>
          <div class="card-region-badge">${m.region}</div>
        </div>
        <div class="monument-card-body">
          <div class="monument-card-title">${m.name}</div>
          <div class="monument-card-subtitle">${m.city}, ${m.state}</div>
          <div class="monument-card-footer">
            <span>${m.category.split(' ')[0]}</span>
            <span><i class="fa-regular fa-clock"></i> ${m.visitHours}h</span>
          </div>
        </div>
      `;

      card.addEventListener('click', () => {
        toggleMonumentSelection(m.id);
      });

      grid.appendChild(card);
    });

    updateSelectedCounter();
  }

  function toggleMonumentSelection(id) {
    if (state.selectedMonumentIds.has(id)) {
      state.selectedMonumentIds.delete(id);
    } else {
      state.selectedMonumentIds.add(id);
    }
    renderMonumentsSelector();
  }

  function updateSelectedCounter() {
    const counterEl = document.getElementById('selected-counter-text');
    if (counterEl) {
      counterEl.textContent = `Selected: ${state.selectedMonumentIds.size} of 22 Destinations`;
    }
  }

  // Render Generated Itinerary Timeline
  function renderItineraryTimeline(itinerary) {
    const outputContainer = document.getElementById('itinerary-output-container');
    const daysContainer = document.getElementById('itinerary-days-container');
    const tabsContainer = document.getElementById('itinerary-day-tabs');
    const statSites = document.getElementById('stat-total-sites');
    const statDays = document.getElementById('stat-total-days');
    const statDist = document.getElementById('stat-total-distance');
    const statHours = document.getElementById('stat-total-hours');

    if (!outputContainer || !daysContainer) return;

    outputContainer.classList.add('active');

    // Update Hero Stats
    if (statSites) statSites.textContent = itinerary.totalSites;
    if (statDays) statDays.textContent = itinerary.durationDays + " Days";
    if (statDist) statDist.textContent = itinerary.totalTravelKm + " km";
    if (statHours) statHours.textContent = itinerary.totalExplorationHours + " hrs";

    // Day filter pills
    if (tabsContainer) {
      tabsContainer.innerHTML = `
        <button type="button" class="day-tab-pill ${state.activeDayFilter === 'all' ? 'active' : ''}" data-day="all">All Days (${itinerary.days.length})</button>
      `;
      itinerary.days.forEach(d => {
        tabsContainer.innerHTML += `
          <button type="button" class="day-tab-pill ${state.activeDayFilter === String(d.dayNumber) ? 'active' : ''}" data-day="${d.dayNumber}">
            Day ${d.dayNumber}
          </button>
        `;
      });

      tabsContainer.querySelectorAll('.day-tab-pill').forEach(btn => {
        btn.addEventListener('click', (e) => {
          const dayVal = e.currentTarget.dataset.day;
          state.activeDayFilter = dayVal;
          tabsContainer.querySelectorAll('.day-tab-pill').forEach(b => b.classList.remove('active'));
          e.currentTarget.classList.add('active');
          filterTimelineByDay(dayVal);
          renderMapItinerary(itinerary, dayVal);
        });
      });
    }

    // Days timeline markup
    daysContainer.innerHTML = '';
    itinerary.days.forEach(day => {
      const dayCard = document.createElement('div');
      dayCard.className = 'day-timeline-card';
      dayCard.dataset.day = day.dayNumber;

      let stopsMarkup = '';
      day.stops.forEach((stop, idx) => {
        const sched = stop.schedule || {};

        // Travel leg before stop
        let travelLegHtml = '';
        if (sched.legDistanceKm > 0) {
          travelLegHtml = `
            <div class="travel-leg-banner">
              <div class="travel-leg-info">
                <span><i class="fa-solid ${sched.transitIcon}"></i> ${sched.transitAdvice}</span>
                <span class="transit-type-tag">• ${sched.legDistanceKm} km</span>
              </div>
              <a href="${sched.gmapsUrl}" target="_blank" class="transit-gmaps-link" title="Open Google Maps Route">
                <i class="fa-solid fa-diamond-turn-right"></i> Navigate Leg
              </a>
            </div>
          `;
        }

        stopsMarkup += `
          ${travelLegHtml}
          <div class="stop-card" data-stop-id="${stop.id}">
            <div class="stop-thumb-box">
              <img src="${stop.thumb}" alt="${stop.name}" class="stop-thumb-img" onerror="this.src='amber_fort_tripo_thumb.jpg'">
              <span class="stop-order-tag">#${idx + 1}</span>
            </div>
            <div class="stop-info-body">
              <div class="stop-time-slot">
                <i class="fa-regular fa-clock"></i> ${sched.timeSlot} (${stop.visitHours} hrs)
              </div>
              <div class="stop-monument-name">
                ${stop.name}
                <span class="stop-hindi-name">${stop.nameHindi || ''}</span>
              </div>
              <div class="stop-location-desc">
                ${stop.city}, ${stop.state} • ${stop.category}
              </div>
              <div class="stop-actions-cluster">
                <a href="${stop.viewerUrl}" target="_blank" class="btn-stop-action btn-3d" title="Experience 3D Virtual Monument">
                  <i class="fa-solid fa-cube"></i> Explore 3D
                </a>
                <button type="button" class="btn-stop-action btn-voice" onclick="window.YugmaPlanner.playAudioSnippet('${stop.id}')" title="Listen to Voice Guide">
                  <i class="fa-solid fa-headphones"></i> Voice Guide
                </button>
                <button type="button" class="btn-stop-action" onclick="window.YugmaPlanner.showMonumentDetails('${stop.id}')" title="Read Historical Lore">
                  <i class="fa-solid fa-circle-info"></i> Lore
                </button>
              </div>
            </div>
            <div style="display:flex; flex-direction:column; gap:4px;">
              ${idx > 0 ? `<button type="button" class="btn-mini-tool" onclick="window.YugmaPlanner.moveStop(${day.dayNumber}, ${idx}, -1)" title="Move earlier"><i class="fa-solid fa-arrow-up"></i></button>` : ''}
              ${idx < day.stops.length - 1 ? `<button type="button" class="btn-mini-tool" onclick="window.YugmaPlanner.moveStop(${day.dayNumber}, ${idx}, 1)" title="Move later"><i class="fa-solid fa-arrow-down"></i></button>` : ''}
              <button type="button" class="btn-mini-tool" style="color:#ef4444;" onclick="window.YugmaPlanner.removeStop(${day.dayNumber}, ${idx})" title="Remove stop"><i class="fa-solid fa-xmark"></i></button>
            </div>
          </div>
        `;
      });

      dayCard.innerHTML = `
        <div class="day-card-header">
          <div class="day-badge-box">
            <div class="day-color-dot" style="background:${day.color};"></div>
            <div>
              <div class="day-title-text">${day.title}</div>
              <div class="day-region-sub">${day.stops.length} Heritage Stops • ${day.totalTravelKm} km travel • ${day.totalEstHours} hrs exploration</div>
            </div>
          </div>
          <div>
            <a href="${day.fullDayGmapsUrl}" target="_blank" class="btn-inline-action" style="text-decoration:none;">
              <i class="fa-solid fa-map-location-dot"></i> Day Route
            </a>
          </div>
        </div>
        <div class="day-stops-list">
          ${stopsMarkup}
        </div>
      `;

      daysContainer.appendChild(dayCard);
    });

    // Update map with full itinerary
    renderMapItinerary(itinerary, state.activeDayFilter);
  }

  function filterTimelineByDay(dayNumber) {
    const cards = document.querySelectorAll('.day-timeline-card');
    cards.forEach(card => {
      if (dayNumber === 'all' || card.dataset.day === String(dayNumber)) {
        card.style.display = 'block';
      } else {
        card.style.display = 'none';
      }
    });
  }

  // Move a stop up or down in the sequence
  function moveStop(dayNumber, stopIndex, direction) {
    if (!state.currentItinerary) return;
    const day = state.currentItinerary.days.find(d => d.dayNumber === dayNumber);
    if (!day) return;

    const targetIndex = stopIndex + direction;
    if (targetIndex < 0 || targetIndex >= day.stops.length) return;

    const temp = day.stops[stopIndex];
    day.stops[stopIndex] = day.stops[targetIndex];
    day.stops[targetIndex] = temp;

    // Recalculate schedule for that day
    recalculateItineraryDay(day);
    renderItineraryTimeline(state.currentItinerary);
  }

  function removeStop(dayNumber, stopIndex) {
    if (!state.currentItinerary) return;
    const day = state.currentItinerary.days.find(d => d.dayNumber === dayNumber);
    if (!day) return;

    const removed = day.stops.splice(stopIndex, 1)[0];
    if (removed) {
      state.selectedMonumentIds.delete(removed.id);
    }

    if (day.stops.length === 0) {
      state.currentItinerary.days = state.currentItinerary.days.filter(d => d.dayNumber !== dayNumber);
    } else {
      recalculateItineraryDay(day);
    }

    renderMonumentsSelector();
    renderItineraryTimeline(state.currentItinerary);
  }

  function recalculateItineraryDay(day) {
    let currentHour = 9.0;
    day.stops.forEach((stop, idx) => {
      const prev = idx === 0 ? state.origin : day.stops[idx - 1];
      const dist = haversineDistance(prev.lat, prev.lng, stop.lat, stop.lng);
      const legMin = dist < 20 ? 30 : Math.round((dist / 60) * 60);
      currentHour += (legMin / 60);
      const start = formatHourToTimeStr(currentHour);
      currentHour += stop.visitHours;
      const end = formatHourToTimeStr(currentHour);
      stop.schedule.timeSlot = `${start} – ${end}`;
      stop.schedule.legDistanceKm = dist;
      currentHour += 0.5;
    });
  }

  // ── 9. PRESETS HANDLER ───────────────────────────────────────────────────
  function applyPreset(presetKey) {
    state.activePreset = presetKey;
    state.selectedMonumentIds.clear();

    switch (presetKey) {
      case "all":
        YUGMA_22_MONUMENTS.forEach(m => state.selectedMonumentIds.add(m.id));
        break;
      case "unesco":
        YUGMA_22_MONUMENTS.filter(m => m.tags.includes("unesco")).forEach(m => state.selectedMonumentIds.add(m.id));
        break;
      case "north":
        YUGMA_22_MONUMENTS.filter(m => m.region === "North").forEach(m => state.selectedMonumentIds.add(m.id));
        break;
      case "south":
        YUGMA_22_MONUMENTS.filter(m => m.region === "South").forEach(m => state.selectedMonumentIds.add(m.id));
        break;
      case "west":
        YUGMA_22_MONUMENTS.filter(m => m.region === "West").forEach(m => state.selectedMonumentIds.add(m.id));
        break;
      case "east_northeast":
        YUGMA_22_MONUMENTS.filter(m => m.region === "East" || m.region === "Northeast").forEach(m => state.selectedMonumentIds.add(m.id));
        break;
      case "spiritual":
        YUGMA_22_MONUMENTS.filter(m => m.tags.includes("spiritual")).forEach(m => state.selectedMonumentIds.add(m.id));
        break;
      default:
        YUGMA_22_MONUMENTS.slice(0, 5).forEach(m => state.selectedMonumentIds.add(m.id));
    }

    renderMonumentsSelector();

    // Update preset pills active state
    document.querySelectorAll('.preset-chip').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.preset === presetKey);
    });
  }

  // ── 10. GEOLOCATION FOR STARTING POINT ───────────────────────────────────
  function requestCurrentLocation() {
    const btn = document.getElementById('btn-use-geolocation');
    const input = document.getElementById('origin-custom-input');
    const select = document.getElementById('origin-hub-select');

    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser.");
      return;
    }

    if (btn) {
      btn.disabled = true;
      btn.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> Locating...`;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const lat = pos.coords.latitude;
        const lng = pos.coords.longitude;
        state.origin = {
          name: "My GPS Location",
          lat: lat,
          lng: lng
        };
        if (input) input.value = `GPS: [${lat.toFixed(4)}, ${lng.toFixed(4)}]`;
        if (select) select.value = "custom";
        if (btn) {
          btn.disabled = false;
          btn.innerHTML = `<i class="fa-solid fa-location-crosshairs"></i> Located`;
        }
      },
      (err) => {
        console.warn("Geolocation error:", err);
        alert("Unable to acquire GPS coordinates. Please select an origin city from the dropdown.");
        if (btn) {
          btn.disabled = false;
          btn.innerHTML = `<i class="fa-solid fa-location-crosshairs"></i> Use GPS`;
        }
      },
      { timeout: 10000, enableHighAccuracy: true }
    );
  }

  // ── 11. MONUMENT DETAILS MODAL ───────────────────────────────────────────
  function showMonumentDetails(id) {
    const monument = YUGMA_22_MONUMENTS.find(m => m.id === id);
    if (!monument) return;

    const modal = document.getElementById('monument-lore-modal');
    const titleEl = document.getElementById('lore-modal-title');
    const bodyEl = document.getElementById('lore-modal-body');

    if (titleEl) titleEl.textContent = `${monument.name} (${monument.nameHindi || ''})`;
    if (bodyEl) {
      bodyEl.innerHTML = `
        <div style="width:100%; height:200px; border-radius:8px; overflow:hidden; margin-bottom:14px; background:#000;">
          <img src="${monument.thumb}" alt="${monument.name}" style="width:100%; height:100%; object-fit:cover;" onerror="this.src='amber_fort_tripo_thumb.jpg'">
        </div>
        <div style="display:flex; flex-wrap:wrap; gap:8px; margin-bottom:12px;">
          <span class="card-region-badge" style="position:static;">${monument.region}</span>
          <span style="font-size:11px; padding:3px 8px; border-radius:4px; background:rgba(201,162,74,0.15); color:#c9a24a; border:1px solid rgba(201,162,74,0.3);">
            ${monument.category}
          </span>
          <span style="font-size:11px; padding:3px 8px; border-radius:4px; background:rgba(255,255,255,0.08); color:#dfe7e0;">
            ${monument.era}
          </span>
        </div>
        <p style="font-size:13.5px; line-height:1.6; color:#dfe7e0; margin-bottom:14px;">${monument.desc}</p>
        <div style="background:rgba(10,14,20,0.8); border:1px solid rgba(201,162,74,0.2); border-radius:6px; padding:12px; font-size:12px; color:#aab4ad; line-height:1.5; margin-bottom:16px;">
          <div><strong style="color:#ffffff;">Patron / Dynasty:</strong> ${monument.whomMade}</div>
          <div><strong style="color:#ffffff;">Architectural Style:</strong> ${monument.style}</div>
          <div><strong style="color:#ffffff;">Location:</strong> ${monument.city}, ${monument.state} (${monument.lat}, ${monument.lng})</div>
          <div><strong style="color:#ffffff;">Recommended Visit Duration:</strong> ${monument.visitHours} Hours (${monument.bestTime})</div>
        </div>
        <div style="display:flex; gap:10px;">
          <a href="${monument.viewerUrl}" target="_blank" class="btn-action-primary" style="flex:1; text-align:center; text-decoration:none;">
            <i class="fa-solid fa-cube"></i> Open 3D Virtual Model
          </a>
          <button type="button" class="btn-action-secondary" onclick="window.YugmaPlanner.playAudioSnippet('${monument.id}')">
            <i class="fa-solid fa-volume-high"></i> Listen to Voice Guide
          </button>
        </div>
      `;
    }

    if (modal) modal.classList.add('active');
  }

  // ── 12. VOICE GUIDE INTEGRATION & ENTITLEMENTS ────────────────────────────
  function playAudioSnippet(monumentId) {
    const monument = YUGMA_22_MONUMENTS.find(m => m.id === monumentId);
    if (!monument) return;

    // Check Voice Guide entitlements using YugmaVoiceGuideAccess if present
    if (window.YugmaVoiceGuideAccess && typeof window.YugmaVoiceGuideAccess.canAccessMonument === 'function') {
      const accessCheck = window.YugmaVoiceGuideAccess.canAccessMonument(monument.voiceKey);
      if (!accessCheck.allowed) {
        alert(
          `Voice Guide Limit Reached: Guests receive 3 complete monument tours.\n\n` +
          `You have already toured 3 sites as a Guest Explorer.\n` +
          `Please sign in or create a free YUGMA account to unlock unlimited multilingual narration for all 22 sites!`
        );
        window.location.href = 'auth.html?mode=login';
        return;
      }
    }

    // Modal player / Audio narrative preview
    const audioModal = document.getElementById('voice-guide-player-modal');
    const audioTitle = document.getElementById('vg-modal-title');
    const audioBody = document.getElementById('vg-modal-body');

    if (audioTitle) audioTitle.textContent = `Voice Guide: ${monument.name}`;
    if (audioBody) {
      audioBody.innerHTML = `
        <div style="display:flex; align-items:center; gap:16px; margin-bottom:16px;">
          <img src="${monument.thumb}" alt="${monument.name}" style="width:70px; height:70px; border-radius:8px; object-fit:cover;" onerror="this.src='amber_fort_tripo_thumb.jpg'">
          <div>
            <h4 style="font-family:var(--jp-font-heading); color:#ffffff; font-size:16px;">${monument.name}</h4>
            <div style="font-size:11.5px; color:#c9a24a;">${monument.city}, ${monument.state} • ${monument.style}</div>
            <div style="font-size:10.5px; color:#aab4ad; margin-top:2px;">Multilingual Guided Heritage Narration</div>
          </div>
        </div>

        <div style="background:rgba(8,12,17,0.85); border:1px solid rgba(201,162,74,0.3); border-radius:8px; padding:16px; margin-bottom:16px; font-size:13px; line-height:1.7; color:#dfe7e0; max-height:220px; overflow-y:auto;">
          <p><i class="fa-solid fa-quote-left" style="color:#c9a24a; margin-right:6px;"></i> ${monument.desc} Designed and constructed during the ${monument.era}, this sacred monument encapsulates centuries of profound civilizational memory, cosmic proportion, and peerless devotion.</p>
        </div>

        <div style="display:flex; gap:10px;">
          <a href="${monument.viewerUrl}" target="_blank" class="btn-action-primary" style="flex:1; text-align:center; text-decoration:none;">
            <i class="fa-solid fa-headphones"></i> Launch Full 3D Voice Experience
          </a>
          <button type="button" class="btn-action-secondary" onclick="window.YugmaPlanner.speakNarration('${encodeURIComponent(monument.desc)}')">
            <i class="fa-solid fa-play"></i> Preview Audio
          </button>
        </div>
      `;
    }

    if (audioModal) audioModal.classList.add('active');
  }

  // Web Speech API fallback reader
  function speakNarration(encodedText) {
    if (!('speechSynthesis' in window)) {
      alert("Browser speech synthesis not supported.");
      return;
    }
    const text = decodeURIComponent(encodedText);
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.95;
    utterance.pitch = 1.0;
    window.speechSynthesis.speak(utterance);
  }

  // ── 13. GUEST & REGISTERED USER JOURNEY STORAGE ───────────────────────────
  function saveDraftToLocalStorage() {
    if (!state.currentItinerary) return;
    try {
      localStorage.setItem('yugma_journey_draft', JSON.stringify(state.currentItinerary));
    } catch (e) {
      console.warn("Storage save notice:", e);
    }
  }

  function loadDraftFromLocalStorage() {
    try {
      const draft = localStorage.getItem('yugma_journey_draft');
      if (draft) {
        state.currentItinerary = JSON.parse(draft);
        // Pre-select monuments from draft
        state.selectedMonumentIds.clear();
        state.currentItinerary.days.forEach(d => {
          d.stops.forEach(s => state.selectedMonumentIds.add(s.id));
        });
        return state.currentItinerary;
      }
    } catch (e) {
      console.warn("Storage draft read notice:", e);
    }
    return null;
  }

  // Save current itinerary to Supabase (or localStorage for guests)
  async function saveJourney() {
    if (!state.currentItinerary) {
      alert("Please generate an itinerary first before saving.");
      return;
    }

    const titlePrompt = prompt("Enter a name for this Heritage Journey:", state.currentItinerary.title);
    if (!titlePrompt || !titlePrompt.trim()) return;

    state.currentItinerary.title = titlePrompt.trim();

    // 1. If Registered User & Supabase client exists -> Save to Cloud
    if (state.isRegistered && state.currentUser && supabase) {
      try {
        const payload = {
          user_id: state.currentUser.id,
          title: state.currentItinerary.title,
          start_location: state.origin,
          duration_days: state.currentItinerary.durationDays,
          pace: state.pace,
          travel_mode: state.travelMode,
          selected_monuments: Array.from(state.selectedMonumentIds),
          itinerary_data: state.currentItinerary,
          is_public: false
        };

        const { data, error } = await supabase
          .from('user_journeys')
          .insert([payload])
          .select();

        if (error) {
          console.warn("Cloud save notice (falling back to local):", error);
          saveToLocalSavedJourneys(state.currentItinerary);
          alert(`Journey "${state.currentItinerary.title}" saved locally in your browser!`);
        } else {
          alert(`Journey "${state.currentItinerary.title}" successfully saved to your YUGMA cloud account!`);
        }
      } catch (err) {
        console.warn("Cloud save exception:", err);
        saveToLocalSavedJourneys(state.currentItinerary);
        alert(`Journey "${state.currentItinerary.title}" saved to local storage.`);
      }
    } else {
      // 2. Guest User -> Save to Local Saved Journeys
      saveToLocalSavedJourneys(state.currentItinerary);
      alert(
        `Journey "${state.currentItinerary.title}" saved in this browser.\n\n` +
        `Note: As a Guest Explorer, your journeys are saved in your current browser. ` +
        `Sign in or create a YUGMA account to sync and access your itineraries from any device!`
      );
    }

    updateSavedJourneysCountBadge();
  }

  function saveToLocalSavedJourneys(itinerary) {
    try {
      const existing = JSON.parse(localStorage.getItem('yugma_saved_journeys') || '[]');
      // Update if same ID or prepend new
      const index = existing.findIndex(j => j.id === itinerary.id);
      if (index >= 0) {
        existing[index] = itinerary;
      } else {
        existing.unshift(itinerary);
      }
      localStorage.setItem('yugma_saved_journeys', JSON.stringify(existing));
    } catch (e) {
      console.warn("Local saved journeys write notice:", e);
    }
  }

  // Load and display Saved Journeys drawer/modal
  async function openSavedJourneysModal() {
    const modal = document.getElementById('saved-journeys-modal');
    const listEl = document.getElementById('saved-journeys-list');
    if (!modal || !listEl) return;

    listEl.innerHTML = `<div style="text-align:center; padding:16px; color:#aab4ad;"><i class="fa-solid fa-spinner fa-spin"></i> Loading saved itineraries...</div>`;
    modal.classList.add('active');

    let journeys = [];

    // 1. Try fetching from Supabase if logged in
    if (state.isRegistered && state.currentUser && supabase) {
      try {
        const { data, error } = await supabase
          .from('user_journeys')
          .select('*')
          .order('created_at', { ascending: false });

        if (!error && data && data.length > 0) {
          journeys = data.map(row => ({
            id: row.id,
            title: row.title,
            createdAt: row.created_at,
            durationDays: row.duration_days,
            totalSites: (row.selected_monuments || []).length,
            isCloud: true,
            raw: row.itinerary_data
          }));
        }
      } catch (e) {
        console.warn("Cloud load notice:", e);
      }
    }

    // 2. Also merge local saved journeys
    try {
      const local = JSON.parse(localStorage.getItem('yugma_saved_journeys') || '[]');
      local.forEach(j => {
        if (!journeys.some(existing => existing.id === j.id)) {
          journeys.push({
            id: j.id,
            title: j.title,
            createdAt: j.createdAt,
            durationDays: j.durationDays,
            totalSites: j.totalSites,
            isCloud: false,
            raw: j
          });
        }
      });
    } catch (e) {}

    if (journeys.length === 0) {
      listEl.innerHTML = `
        <div style="text-align:center; padding:32px 16px; color:#748077;">
          <i class="fa-regular fa-compass" style="font-size:32px; margin-bottom:12px; color:#c9a24a;"></i>
          <p>No saved journeys found yet.</p>
          <p style="font-size:12px; margin-top:4px;">Configure your trip and click "Save Journey" to store your favorite heritage routes.</p>
        </div>
      `;
      return;
    }

    listEl.innerHTML = '';
    journeys.forEach(item => {
      const dateStr = item.createdAt ? new Date(item.createdAt).toLocaleDateString() : 'Draft';
      const itemEl = document.createElement('div');
      itemEl.className = 'saved-journey-item';
      itemEl.innerHTML = `
        <div class="saved-item-meta">
          <h4>${item.title}</h4>
          <p>
            ${item.durationDays} Days • ${item.totalSites} Sites • ${dateStr}
            ${item.isCloud ? '<span style="color:#10b981; margin-left:6px;"><i class="fa-solid fa-cloud"></i> Cloud</span>' : '<span style="color:#f59e0b; margin-left:6px;"><i class="fa-solid fa-laptop"></i> Local</span>'}
          </p>
        </div>
        <div class="saved-item-actions">
          <button type="button" class="btn-action-primary" style="padding:6px 12px; font-size:11px;" onclick="window.YugmaPlanner.loadSavedJourney('${item.id}')">
            <i class="fa-solid fa-folder-open"></i> Load
          </button>
          <button type="button" class="btn-mini-tool" style="color:#ef4444;" onclick="window.YugmaPlanner.deleteSavedJourney('${item.id}', ${item.isCloud})" title="Delete Journey">
            <i class="fa-solid fa-trash-can"></i>
          </button>
        </div>
      `;
      listEl.appendChild(itemEl);
    });
  }

  function loadSavedJourney(id) {
    // Check in local
    const local = JSON.parse(localStorage.getItem('yugma_saved_journeys') || '[]');
    let target = local.find(j => j.id === id);

    if (target) {
      applyLoadedItinerary(target);
      closeAllModals();
      return;
    }

    // Check in cloud if logged in
    if (state.isRegistered && supabase) {
      supabase.from('user_journeys').select('*').eq('id', id).single().then(({ data, error }) => {
        if (!error && data && data.itinerary_data) {
          applyLoadedItinerary(data.itinerary_data);
          closeAllModals();
        } else {
          alert("Unable to load the specified journey.");
        }
      });
    }
  }

  function applyLoadedItinerary(itinerary) {
    state.currentItinerary = itinerary;
    state.selectedMonumentIds.clear();
    itinerary.days.forEach(d => {
      d.stops.forEach(s => state.selectedMonumentIds.add(s.id));
    });

    renderMonumentsSelector();
    renderItineraryTimeline(itinerary);

    // Scroll to timeline
    const outputContainer = document.getElementById('itinerary-output-container');
    if (outputContainer) outputContainer.scrollIntoView({ behavior: 'smooth' });
  }

  async function deleteSavedJourney(id, isCloud) {
    if (!confirm("Are you sure you want to delete this saved journey?")) return;

    if (isCloud && state.isRegistered && supabase) {
      try {
        await supabase.from('user_journeys').delete().eq('id', id);
      } catch (e) {
        console.warn("Cloud delete error:", e);
      }
    }

    try {
      const local = JSON.parse(localStorage.getItem('yugma_saved_journeys') || '[]');
      const filtered = local.filter(j => j.id !== id);
      localStorage.setItem('yugma_saved_journeys', JSON.stringify(filtered));
    } catch (e) {}

    updateSavedJourneysCountBadge();
    openSavedJourneysModal(); // Refresh list
  }

  function updateSavedJourneysCountBadge() {
    const badge = document.getElementById('saved-journeys-count-badge');
    if (!badge) return;

    let count = 0;
    try {
      const local = JSON.parse(localStorage.getItem('yugma_saved_journeys') || '[]');
      count = local.length;
    } catch (e) {}

    badge.textContent = count;
    badge.style.display = count > 0 ? 'inline-block' : 'none';
  }

  // ── 14. EXPORT & PRINT HANDLERS ──────────────────────────────────────────
  function printItinerary() {
    if (!state.currentItinerary) {
      alert("Please generate an itinerary before printing.");
      return;
    }
    window.print();
  }

  function exportItineraryJSON() {
    if (!state.currentItinerary) {
      alert("Please generate an itinerary before exporting.");
      return;
    }
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(state.currentItinerary, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `yugma_heritage_journey_${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  }

  function closeAllModals() {
    document.querySelectorAll('.planner-modal-backdrop').forEach(m => m.classList.remove('active'));
  }

  // ── 15. AUTHENTICATION STATE & EVENTS ────────────────────────────────────
  async function checkAuthState() {
    const userBadgeName = document.getElementById('user-badge-name');
    const userStatusDot = document.getElementById('user-status-dot');

    if (!supabase || !supabase.auth) {
      // Guest mode
      state.isRegistered = false;
      state.currentUser = null;
      if (userBadgeName) userBadgeName.textContent = "GUEST EXPLORER";
      if (userStatusDot) userStatusDot.className = "user-status-dot guest";
      return;
    }

    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (session && session.user) {
        state.isRegistered = true;
        state.currentUser = session.user;
        const name = session.user.user_metadata?.full_name || session.user.email?.split('@')[0] || "MEMBER";
        if (userBadgeName) userBadgeName.textContent = name.toUpperCase();
        if (userStatusDot) userStatusDot.className = "user-status-dot";
      } else {
        state.isRegistered = false;
        state.currentUser = null;
        if (userBadgeName) userBadgeName.textContent = "GUEST EXPLORER";
        if (userStatusDot) userStatusDot.className = "user-status-dot guest";
      }
    } catch (e) {
      state.isRegistered = false;
      state.currentUser = null;
    }
  }

  // ── 16. EVENT LISTENERS INITIALIZATION ────────────────────────────────────
  function bindEventListeners() {
    // Generate Itinerary Button
    const btnGen = document.getElementById('btn-generate-itinerary');
    if (btnGen) {
      btnGen.addEventListener('click', () => {
        const itin = generateSmartItinerary();
        if (itin) {
          renderItineraryTimeline(itin);
          // Scroll smoothly to output
          const outEl = document.getElementById('itinerary-output-container');
          if (outEl) outEl.scrollIntoView({ behavior: 'smooth' });
        }
      });
    }

    // Starting Point Selector
    const originSelect = document.getElementById('origin-hub-select');
    const originInput = document.getElementById('origin-custom-input');
    if (originSelect) {
      originSelect.addEventListener('change', (e) => {
        const val = e.target.value;
        if (val === 'custom') {
          if (originInput) originInput.style.display = 'block';
        } else if (ORIGIN_HUBS[val]) {
          state.origin = ORIGIN_HUBS[val];
          if (originInput) {
            originInput.style.display = 'none';
            originInput.value = state.origin.name;
          }
        }
      });
    }

    if (originInput) {
      originInput.addEventListener('input', (e) => {
        state.origin = {
          name: e.target.value.trim() || "Custom Origin",
          lat: 28.6139,
          lng: 77.2090
        };
      });
    }

    // Geolocation button
    const btnGeo = document.getElementById('btn-use-geolocation');
    if (btnGeo) {
      btnGeo.addEventListener('click', requestCurrentLocation);
    }

    // Duration, Pace, and Travel Mode selects
    const durSelect = document.getElementById('trip-duration-select');
    if (durSelect) {
      durSelect.addEventListener('change', (e) => {
        state.durationDays = parseInt(e.target.value, 10) || 3;
      });
    }

    const paceSelect = document.getElementById('trip-pace-select');
    if (paceSelect) {
      paceSelect.addEventListener('change', (e) => {
        state.pace = e.target.value;
      });
    }

    const modeSelect = document.getElementById('trip-mode-select');
    if (modeSelect) {
      modeSelect.addEventListener('change', (e) => {
        state.travelMode = e.target.value;
      });
    }

    // Preset chips
    document.querySelectorAll('.preset-chip').forEach(btn => {
      btn.addEventListener('click', (e) => {
        applyPreset(e.currentTarget.dataset.preset);
      });
    });

    // Search Box
    const searchInput = document.getElementById('monuments-search-input');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        state.searchQuery = e.target.value;
        renderMonumentsSelector();
      });
    }

    // Select All / Clear All buttons
    const btnSelectAll = document.getElementById('btn-select-all-monuments');
    if (btnSelectAll) {
      btnSelectAll.addEventListener('click', () => {
        YUGMA_22_MONUMENTS.forEach(m => state.selectedMonumentIds.add(m.id));
        renderMonumentsSelector();
      });
    }

    const btnClearAll = document.getElementById('btn-clear-all-monuments');
    if (btnClearAll) {
      btnClearAll.addEventListener('click', () => {
        state.selectedMonumentIds.clear();
        renderMonumentsSelector();
      });
    }

    // Save Journey Button
    const btnSave = document.getElementById('btn-save-journey');
    if (btnSave) {
      btnSave.addEventListener('click', saveJourney);
    }

    // Open Saved Journeys Button
    const btnOpenSaved = document.getElementById('btn-open-saved-journeys');
    if (btnOpenSaved) {
      btnOpenSaved.addEventListener('click', openSavedJourneysModal);
    }

    // Export & Print Buttons
    const btnPrint = document.getElementById('btn-print-itinerary');
    if (btnPrint) btnPrint.addEventListener('click', printItinerary);

    const btnExportJson = document.getElementById('btn-export-json');
    if (btnExportJson) btnExportJson.addEventListener('click', exportItineraryJSON);

    // Map Controls
    const btnFitMap = document.getElementById('btn-map-fit-bounds');
    if (btnFitMap) {
      btnFitMap.addEventListener('click', () => {
        if (state.currentItinerary) {
          renderMapItinerary(state.currentItinerary, state.activeDayFilter);
        }
      });
    }

    // CARTO Basemap Style Selector
    const mapStyleSelect = document.getElementById('map-style-select');
    if (mapStyleSelect) {
      mapStyleSelect.addEventListener('change', (e) => {
        setBasemapStyle(e.target.value);
      });
    }

    // Close Modals
    document.querySelectorAll('.btn-modal-close').forEach(btn => {
      btn.addEventListener('click', closeAllModals);
    });

    document.querySelectorAll('.planner-modal-backdrop').forEach(backdrop => {
      backdrop.addEventListener('click', (e) => {
        if (e.target === backdrop) closeAllModals();
      });
    });

    // Mobile View Tabs switcher
    document.querySelectorAll('.mobile-tab-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const view = e.currentTarget.dataset.view;
        document.querySelectorAll('.mobile-tab-btn').forEach(b => b.classList.remove('active'));
        e.currentTarget.classList.add('active');

        const configCard = document.getElementById('step-config-card');
        const itinCard = document.getElementById('itinerary-output-container');
        const mapColumn = document.querySelector('.planner-map-column');

        if (view === 'builder') {
          if (configCard) configCard.style.display = 'block';
          if (itinCard) itinCard.style.display = 'none';
          if (mapColumn) mapColumn.style.display = 'none';
        } else if (view === 'schedule') {
          if (configCard) configCard.style.display = 'none';
          if (itinCard) itinCard.style.display = 'flex';
          if (mapColumn) mapColumn.style.display = 'none';
        } else if (view === 'map') {
          if (configCard) configCard.style.display = 'none';
          if (itinCard) itinCard.style.display = 'none';
          if (mapColumn) {
            mapColumn.style.display = 'flex';
            if (state.map) state.map.invalidateSize();
          }
        }
      });
    });
  }

  // ── 17. PUBLIC API EXPOSURE ──────────────────────────────────────────────
  window.YugmaPlanner = {
    monuments: YUGMA_22_MONUMENTS,
    state: state,
    generateItinerary: generateSmartItinerary,
    moveStop: moveStop,
    removeStop: removeStop,
    showMonumentDetails: showMonumentDetails,
    playAudioSnippet: playAudioSnippet,
    speakNarration: speakNarration,
    loadSavedJourney: loadSavedJourney,
    deleteSavedJourney: deleteSavedJourney,
    setBasemapStyle: setBasemapStyle,
    cartoConfig: { apiKey: CARTO_API_KEY, basemaps: CARTO_BASEMAPS }
  };

  // ── 18. INITIALIZE ON DOM CONTENT LOADED ──────────────────────────────────
  window.addEventListener('DOMContentLoaded', async () => {
    initLeafletMap();
    renderMonumentsSelector();
    bindEventListeners();
    await checkAuthState();
    updateSavedJourneysCountBadge();

    // Check if there was an existing draft in localStorage
    const draft = loadDraftFromLocalStorage();
    if (draft) {
      renderItineraryTimeline(draft);
    } else {
      // Auto-generate default 3-day itinerary
      const initialItin = generateSmartItinerary();
      if (initialItin) {
        renderItineraryTimeline(initialItin);
      }
    }
  });

})();
