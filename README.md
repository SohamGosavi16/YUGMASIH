# 🏛️ YUGMA (युग्म) — Indian Cultural Heritage & Digital Museum

> **" ज्ञानं संस्कृतिश्च शाश्वती "**  
> *Knowledge and culture are eternal.*

**YUGMA** is an immersive digital museum, 3D geospatial platform, and intelligent multi-agent heritage companion that preserves, visualizes, and celebrates the sacred architectural marvels, living classical traditions, and ancient manuscripts of India. Built with 3D geospatial rendering, photorealistic 360° AR/VR portals, Google Gemini-powered multi-agent AI, and smart trip planning — developed for **Smart India Hackathon (SIH) 2026**.

**Live Deployment:** [https://yugmaa.netlify.app](https://yugmaa.netlify.app)

---

## 🎯 Problem Statement & Vision

India's extraordinary civilizational heritage faces challenges of digital accessibility, fragmented historical context, and global outreach. YUGMA bridges this divide through:
1. **Interactive Geospatial Exploration**: Interactive 3D orbital globe and 2D high-resolution cartographic routing.
2. **Photorealistic Monument Experiences**: 360° AR/VR portals and precision 3D architectural models.
3. **Multi-Agent Heritage Intelligence**: Specialized AI personas (Historian, Architect, Mythologist, Travel Curator) with live audio-reactive voice visualization.
4. **Smart Heritage Journey Planner**: Geospatially clustered, multi-stop personalized expedition planning.

---

## ✨ Key Features

### 🤖 1. YUGMA Multi-Agent AI Heritage Companion & Audio Visualizer
An intelligent, multi-agent virtual heritage guide featuring real-time generative intelligence, synchronized voice narration, and an audio-reactive golden orb visualizer.

- **5 Specialized AI Personas**:
  - 🏛️ **Itihasa (Chief Historian)**: Unveils dynastic lineages (Cholas, Mughals, Vijayanagara, Guptas, Marathas, Rajputs), rock edicts, copper-plate epigraphy, and chronological timelines.
  - 📐 **Sthapatya (Master Architect)**: Analyzes Vastu Shastra geometry, acoustic whispering galleries, mortar-free interlocking granite, shadow sundials, and subterranean stepwell hydraulics.
  - 🕉️ **Katha (Sacred Lore & Traditions)**: Narrates temple sthalam puranas, deity iconography, celestial alignments, sacred folklore, and living festival rituals.
  - 🧭 **Yatra (Expedition Curator)**: Recommends optimal visiting hours, golden-hour photography vantage points, temple sanctum dress codes, and heritage circuits.
  - ✨ **All-Rounder (Civilizational Harmonizer)**: Delivers holistic, multi-perspective synthesis balancing all domains.
- **Dual-Engine Intelligence (Hybrid Live AI + Curated Offline Engine)**:
  - **Live AI Mode**: Powered by **Google Gemini** via a secure **Netlify Serverless Function** (`/.netlify/functions/gemini` / `/api/gemini`). The API key is stored server-side in Netlify environment variables (`GEMINI_API_KEY`) and is never exposed in browser code, client network requests, or repository commits.
  - **Curated Knowledge Engine**: Comprehensive offline multi-agent dossier covering all **22 monuments** with instant fallback on zero latency.
- **4-State Golden AI Orb Visualizer**:
  - High-performance HTML5 Canvas 2D orb rendering with concentric rotating architectural rings, pulsing auras, and a 28-bar radial audio spectrum.
  - States: `✦ IDLE // READY`, `✦ DELIBERATING ARCHIVE...`, `✦ AGENT SPEAKING...`, and `✦ SPEECH PAUSED`.
  - **Web Speech API Cadence Synchronization**: Word-boundary phonetic energy modulation simulating realistic speech dynamics.
- **Full Narration Playback Suite**:
  - **Positioned in Right-Side AI Chat Panel & Directly Below Visualizer**: Narration playback controls are prominently integrated both directly beneath the golden orb visualizer and inside the right-side chat panel under the response viewport (without overlapping chat messages or input).
  - **6 Dedicated Controls**: **Play** (start narration), **Pause** (suspend narration), **Resume** (continue from paused character/word), **Stop** (terminate narration & reset progress to 0%), **Replay** (restart from the very beginning), and **Volume Control** (slider + live percentage).
  - **6 Synchronized Playback Statuses**: Clear real-time status reporting (`Ready to play.`, `Currently speaking.`, `Paused.`, `Finished.`, `Stopped.`, `Audio unavailable.`).
  - **Zero Viewport Clutter**: No floating controls at the bottom-left corner of the website; all controls are cleanly self-contained within the AI Companion modal.
- **Top-Right Visualizer Launcher**: Compact, non-intrusive glowing golden orb launcher with dynamic state animations.

---

### 🗺️ 2. Smart Heritage Journey Planner (`journey-planner.html`)
An intelligent travel itinerary builder allowing travelers to plan personalized cultural expeditions across India.

- **22 Heritage Destinations**: Filter by Geographic Zone (North, South, East, West, Central, North-East) or Category (Forts, Temples, Caves, Colonial, Sacred, Modern Colossus).
- **Interactive CARTO Leaflet Map**:
  - Official CARTO Voyager, Dark Matter, and Positron tile sets with smooth zoom and monument pinpoint markers.
  - Real-time geodesic polyline route rendering connecting selected destinations.
- **Intelligent Geospatial Clustering**:
  - Automatic shortest-path optimization using the **Haversine formula**.
  - Pacing estimation (Express, Balanced, In-Depth), travel duration, and budget calculators.
- **Export & Synchronization**:
  - Direct 1-click **Google Maps multi-stop route export**.
  - Print & PDF travel itinerary generator with packing checklists, cultural etiquette, and emergency contacts.
  - Itinerary persistence in **Supabase** (`user_journeys` table) with guest `localStorage` fallback.

---

### 🌍 3. Scroll-Driven 3D Orbital Globe Engine
- **Orbital Hero View**: Photorealistic Earth rendered from low-Earth orbit with continuous auto-rotation.
- **Damped 60FPS Scroll Interpolation**: Smoothly transitions, scales, and tilts the globe as the user navigates.
- **Geospatial Subcontinent Reveal**: Precise Indian state boundaries and pulsating radar monument markers.
- **State Click Drawers**: Opens AR/VR portals, 3D tradition studios, and digital heritage books per state.

---

### 🥽 4. Photorealistic 360° AR/VR Portals (25+ Destinations)

| # | Monument | State | Architectural Category |
|---|----------|-------|------------------------|
| 1 | Taj Mahal | Uttar Pradesh | Mughal Marble Symphony |
| 2 | Konark Sun Temple | Odisha | Kalinga Cosmic Stone Chariot |
| 3 | Ajanta & Ellora Caves (Kailasa) | Maharashtra | Monolithic Basalt Excavation |
| 4 | Rani ki Vav | Gujarat | Subterranean Inverted Stepwell |
| 5 | Hampi (Vittala Temple) | Karnataka | Vijayanagara Granite Architecture |
| 6 | Brihadisvara Temple | Tamil Nadu | Great Living Chola Granite Vimana |
| 7 | Sri Harmandir Sahib (Golden Temple) | Punjab | Gilded Sikh Sacred Architecture |
| 8 | Statue of Unity | Gujarat | 182-Meter Modern Colossus |
| 9 | Amber Fort | Rajasthan | Rajput-Mughal Hilltop Fortress |
| 10 | Victoria Memorial | West Bengal | Indo-Saracenic Marble Monument |
| 11 | Basilica of Bom Jesus | Goa | Baroque Laterite Sanctuary |
| 12 | Khajuraho (Lakshmana Temple) | Madhya Pradesh | Chandela Nagara Sandstone Temple |
| 13 | Meenakshi Amman Temple | Tamil Nadu | Dravidian Gopuram Metropolis |
| 14 | Lepakshi Veerabhadra Temple | Andhra Pradesh | Hanging Pillar & Vijayanagara Murals |
| 15 | Great Stupa of Sanchi | Madhya Pradesh | Ashokan Buddhist Monolithic Reliquary |
| 16 | Mahabodhi Temple | Bihar | Sacred Axis of Buddhist Enlightenment |
| 17 | Golconda Fort | Telangana | Acoustic Citadel & Diamond Marketplace |
| 18 | Jantar Mantar | Rajasthan | 18th-Century Stone Astronomical Complex |
| 19 | Qutub Minar | Delhi | Fluted Red Sandstone Minaret |
| 20 | Hawa Mahal | Rajasthan | Honeycomb Palace of Winds |
| 21 | Nalanda Mahavihara | Bihar | Ancient Residential Buddhist University |
| 22 | Red Fort (Lal Qila) | Delhi | Imperial Mughal Citadel |
| 23 | Padmanabhapuram Palace | Kerala | Traditional Wooden Architecture |
| 24 | Rang Ghar | Assam | Ahom Royal Amphitheatre |
| 25 | Jageshwar Dham | Uttarakhand | Himalayan Stone Temple Cluster |

---

### 🎭 5. Living Classical Traditions & 3D Studios

| Tradition | State | Performance Style & Rhythm |
|-----------|-------|----------------------------|
| Lavani | Maharashtra | Fast Dholki Taal |
| Garba | Gujarat | Teen-Taali Synchronized Clap |
| Ghoomar | Rajasthan | Royal Circular Dholak |
| Kathak | Uttar Pradesh | Tatkar Footwork & Chakkars |
| Baul Music | West Bengal | Mystic Ektara Folk |
| Bharatanatyam | Tamil Nadu | Classical Adavus & Abhinaya |
| Yakshagana | Karnataka | Dramatic Coastal Mythological Theatre |
| Kathakali | Kerala | Mudras & Expressive Facial Drama |
| Odissi | Odisha | Sculptural Tribhanga Postures |
| Bihu | Assam | Energetic Spring Harvest Beats |
| Chholiya | Uttarakhand | Kumaoni Martial Sword Dance |
| Hojagiri | Tripura | Reang Balancing Acrobatics |

---

### 🔐 6. Authentication & User Journey Management
- **Supabase Auth v2**: Secure email/password login, registration, and session management.
- **Guest Explorer Mode**: Unrestricted exploration for casual visitors with no sign-up wall.
- **Dedicated Password Reset**: Standalone `reset-password.html` with secure recovery link handling via `supabase.auth.updateUser()`.
- **Local Session Logout**: Clean sign-out ensuring seamless return to Guest Explorer mode without session conflicts.
- **User Journey Persistence**: Cloud synchronization for custom travel routes with Row Level Security (RLS).

---

### 🎵 7. Procedural Cultural Soundscapes
- **Web Audio API** synthesizer delivering meditative Indian Tanpura acoustic drones, Ghungroo ankle bells, and rhythmic cues with zero external audio assets.

---

### 🌐 8. Multi-Language Inclusivity
- Integrated translation engine supporting Hindi, Bengali, Tamil, Telugu, Marathi, Gujarati, Kannada, Malayalam, Odia, Punjabi, and international languages.

---

## 📂 Project Structure

```
new sih/
├── index.html                       # Master landing page (3D globe + auth + AI companion)
├── journey-planner.html             # Smart Heritage Journey Planner with CARTO map
├── all_3d_models.html               # 3D Monument interactive catalog hub
├── reset-password.html              # Standalone password recovery & reset portal
├── auth.html                        # Standalone authentication gateway
│
├── Heritage Portals (25+ Destinations)
├── ajanta-ellora-caves.html         # Ajanta & Ellora Caves 360 AR/VR
├── amberfort-vr.html                # Amber Fort 360 AR/VR
├── bom_jesus_vr.html                # Basilica of Bom Jesus AR/VR
├── brihadisvara-vr.html             # Brihadisvara Temple AR/VR
├── gateway_of_india_3d.html         # Gateway of India 3D
├── goldentemple-vr.html             # Golden Temple 360 AR/VR
├── hampi_precise.html               # Hampi Stone Chariot Precision 3D
├── humayunstomb-vr.html             # Humayun's Tomb AR/VR
├── jageshwar-vr.html                # Jageshwar Dham AR/VR
├── konark_3d.html                   # Konark Sun Temple 3D
├── lepakshi_temple_3d.html          # Lepakshi Temple 3D
├── lotustemple-vr.html              # Lotus Temple AR/VR
├── mahabodhi_explorer.html          # Mahabodhi Temple 3D
├── neermahal-vr.html                # Neermahal Palace AR/VR
├── padmanabhapuram-vr.html          # Padmanabhapuram Palace AR/VR
├── qutubminar-vr.html               # Qutub Minar AR/VR
├── rajgadfort-vr.html               # Rajgad Fort AR/VR
├── rang_ghar_precision.html         # Rang Ghar Precision 3D
├── rani_ki_vav.html                 # Rani ki Vav Subterranean 3D
├── redfort-vr.html                  # Red Fort AR/VR
├── sanchistupa-vr.html              # Sanchi Stupa AR/VR
├── statue_of_unity_3d.html          # Statue of Unity 3D
├── taj_mahal_3d.html                # Taj Mahal Interactive 3D
├── templegopuram-vr.html            # Temple Gopuram AR/VR
├── victoriamemorial-vr.html         # Victoria Memorial AR/VR
│
├── netlify/
│   └── functions/
│       └── gemini.js                # Secure Netlify serverless proxy for Gemini API
├── netlify.toml                     # Netlify build configuration & clean API redirects
├── .env.example                     # Environment variable template (GEMINI_API_KEY)
├── .gitignore                       # Git security ignore list (protects .env and secrets)
│
├── css/
│   ├── aiVisualizer.css             # Golden AI Orb visualizer & multi-agent modal
│   ├── journeyPlanner.css           # Journey planner responsive interface & route drawer
│   ├── kage-theme.css               # Design tokens, typography, dark heritage palettes
│   ├── main.css                     # Core platform layout and global UI
│   ├── arvr.css                     # 360° panorama & AR/VR styling
│   ├── auth.css                     # Supabase authentication modal styles
│   ├── tradition.css                # 3D tradition studio layout
│   ├── book.css                     # Digital manuscript archive styling
│   └── voiceGuideAccess.css         # Voice guide drawer controls
│
├── js/
│   ├── aiVisualizer.js              # Multi-Agent engine (5 agents, Gemini 3.8, Orb Canvas)
│   ├── journeyPlanner.js            # Leaflet CARTO map, Haversine clustering, export
│   ├── app.js                       # Application lifecycle & global modal manager
│   ├── globe.js                     # Globe.gl 3D orbital rendering & boundary loader
│   ├── stateData.js                 # Monument coordinates, historical metadata
│   ├── culturedata.js               # Extended cultural dataset for all 28 states & 8 UTs
│   ├── indiaGeoJSON.js              # State boundary polygon definitions
│   ├── audioEngine.js               # Procedural Web Audio Tanpura & Ghungroo
│   ├── arvrViewer.js                # WebXR 360° panorama viewport
│   ├── traditionViewer.js           # 3D classical dance tradition studio
│   ├── digitalBook.js               # Manuscript and archival document reader
│   ├── stateMenu.js                 # State selection menu logic
│   ├── auth.js                      # Supabase authentication & session handling
│   └── translator.js                # Multi-language translation engine
│
├── supabase/
│   ├── migrations/                  # SQL schema migrations (user_journeys, RLS)
│   └── supabase_schema.sql          # Master Supabase database definitions
│
├── data/states/                     # 3D GLB models, textures & metadata
└── images/                          # Visual assets, photographs & iconography
```

---

## 🚀 Quick Start & Local Setup

### Prerequisites
- Any modern browser with **WebGL** support (Chrome, Edge, Firefox, Safari).
- A local HTTP server (required for loading GLB models and ES modules).

### Option 1: Python
```bash
python -m http.server 8080
```

### Option 2: Node.js
```bash
npx http-server -p 8080
```

### Option 3: VS Code Live Server
Right-click `index.html` → **"Open with Live Server"**

### Open in Browser
Visit `http://localhost:8080` in your web browser.

---

## 🎮 Interactive Controls & Navigation

| Interaction | Action |
| --- | --- |
| **Scroll Down / Up** | Transitions 3D globe between low-Earth orbit and centered India view |
| **Left Click + Drag** | Rotates the 3D Earth globe |
| **Mouse Wheel / Pinch** | Zooms into or out of the subcontinent |
| **Click State / Pinpoint** | Opens state modal with 360° AR/VR portal, 3D Studio, and Heritage Book |
| **Top-Right Golden Orb** | Launches the **YUGMA AI Heritage Companion & Audio Visualizer** |
| **Agent Selector Pills** | Switches active AI agent (`All-Rounder`, `Historian`, `Architect`, `Lore`, `Travel`) |
| **Plan Your Journey** | Opens the **Smart Heritage Journey Planner** (`journey-planner.html`) |
| **Audio Icon** | Toggles procedural ambient Tanpura soundscape |
| **Language Dropdown** | Switches UI language across 10+ Indian & international languages |

---

## 🛠️ Technology Stack

| Component | Technology | Description |
|---|---|---|
| **3D Orbital Globe** | Globe.gl v2.46.2 | Scroll-driven orbital Earth and subcontinent focus |
| **3D Rendering** | Three.js v0.180.0 | GLTF/GLB loader, PBR materials, WebGL pipelines |
| **AR / VR Portals** | WebXR API / HTML5 Canvas | 360° equirectangular panoramas & immersive viewports |
| **Generative AI** | Google Gemini (Serverless Proxy) | Secure Netlify Function (`GEMINI_API_KEY`) protecting credentials |
| **Audio Visualizer** | HTML5 Canvas 2D | 60FPS golden orb with concentric rings & radial spectrum |
| **Voice Narration** | Web Speech API | `SpeechSynthesis` with phonetic cadence synchronization |
| **Mapping & Routing** | Leaflet.js + CARTO Voyager | Geospatial monument mapping & multi-stop route clustering |
| **Authentication & DB** | Supabase Auth v2 & PostgreSQL | User authentication, RLS, and cloud journey storage |
| **Procedural Audio** | Web Audio API | Algorithmic Tanpura drone and rhythm synthesizers |
| **Styling & Design** | Vanilla CSS3 + Kage Theme | Cosmic dark luxury aesthetic (`#c9a24a` gold accents) |
| **Typography** | Google Fonts | Cinzel, Cormorant Garamond, Outfit, Noto Serif Devanagari |
| **Geodata** | GeoJSON | Vector boundary polygons for all 28 States & 8 UTs |

---

## 🗺️ Coverage

YUGMA provides comprehensive cultural coverage for all **28 States and 8 Union Territories** of India:
- **25+ Photorealistic 3D & AR/VR Portals**
- **12 Classical & Folk Dance Studios**
- **22 Curated Destinations in the Journey Planner**
- **5 Specialized AI Personas covering 22+ Archaeological Wonders**
- **10+ Supported Languages**

---

## 👥 Team — YUGMA SIH 2026

- **Project**: Smart India Hackathon (SIH) 2026  
- **Theme**: Heritage & Cultural Preservation with Cutting-Edge Digital Technology  
- **Repository**: YUGMA Cultural Heritage Initiative  

---

## 📜 License

Created for national heritage preservation, cultural education, and public access under the **YUGMA** Cultural Initiative.

> Built with reverence for India's timeless heritage — SIH 2026.
