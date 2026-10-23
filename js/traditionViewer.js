/**
 * ============================================================
 * YUGMA — 3D CULTURAL TRADITION STUDIO
 * ============================================================
 *
 * Master 3D Cultural Experience for all 14 Indian States & Traditions:
 *  1. Maharashtra → Lavani
 *  2. Gujarat → Garba
 *  3. Rajasthan → Kalbelia
 *  4. Uttar Pradesh → Kathak
 *  5. West Bengal → Baul
 *  6. Tamil Nadu → Bharatanatyam
 *  7. Karnataka → Yakshagana
 *  8. Kerala → Theyyam
 *  9. Odisha → Odissi
 * 10. Assam → Bihu
 * 11. Andhra Pradesh → Kuchipudi
 * 12. Bihar → Madhubani / Mithila Art
 * 13. Goa → Fugdi
 * 14. Chhattisgarh → Panthi
 *
 * Features:
 *  • Hero 60/40 Split: 60% 3D Viewport, 40% Rich Cultural Archive Panel
 *  • Dynamic State JS Data Loading (No Page Reload)
 *  • In-Studio 14-State Selector
 *  • Three.js High-Fidelity Rendering: PBR Materials, Soft Shadows, Subtle Gold Lighting
 *  • Auto Bounding-Box Centering & Dynamic Camera Auto-Framing
 *  • Smooth Orbit Controls (Drag to Rotate, Scroll to Zoom, Pinch, Pan)
 *  • "3D MODEL COMING SOON" Pipeline Card for Missing/Null Models
 *  • Procedural 3D Cultural Mandala / Motif Fallback (Never a Blank Canvas)
 *  • Full Experience Bar: ROTATE | ZOOM | RESET | AUTO | FULLSCREEN
 *
 * ============================================================
 */

class YugmaTraditionViewer {
  constructor(container) {
    this.container = container;

    // Three.js Core
    this.scene = null;
    this.camera = null;
    this.renderer = null;
    this.model = null;
    this.particles = null;
    this.floor = null;
    this.lights = [];
    this.clock = null;
    this.animId = null;

    // Interaction & Camera State
    this.isOpen = false;
    this.isDragging = false;
    this.isPanning = false;
    this.pointerStart = { x: 0, y: 0 };
    this.pointerPrev = { x: 0, y: 0 };
    this.rotation = { x: 0.15, y: -0.4 };
    this.targetRotation = { x: 0.15, y: -0.4 };
    this.cameraTarget = { x: 0, y: 0, z: 0 };
    this.targetCameraTarget = { x: 0, y: 0, z: 0 };
    this.zoom = 6.5;
    this.targetZoom = 6.5;
    this.minZoom = 2.0;
    this.maxZoom = 18.0;
    this.autoRotate = true;
    this.autoRotateSpeed = 0.005;

    // Active State Data
    this.currentStateKey = 'maharashtra';
    this.currentStateData = null;
    this.loadedModel = false;
    this.modelLoader = null;

    // DOM Caches
    this.dom = {};
    this.resizeObserver = null;

    // Registry of all 14 states (with living tradition showcase videos for specified states)
    this.STATE_MAP = {
      maharashtra: { id: "state_01", file: "data/states/state_01_maharashtra.js", name: "Maharashtra", tradition: "Lavani", color: "#e0231c", secondary: "#f59e0b", youtubeId: "Kh4MU4EonkI", videoUrl: "https://www.youtube-nocookie.com/embed/Kh4MU4EonkI" },
      gujarat: { id: "state_02", file: "data/states/state_02_gujarat.js", name: "Gujarat", tradition: "Garba", color: "#c9a24a", secondary: "#fde047", youtubeId: "gZjNpNuaPLw", videoUrl: "https://www.youtube-nocookie.com/embed/gZjNpNuaPLw" },
      rajasthan: { id: "state_03", file: "data/states/state_03_rajasthan.js", name: "Rajasthan", tradition: "Kalbelia", color: "#ff5a3c", secondary: "#f97316", youtubeId: "22p2YfSt3ZU", videoUrl: "https://www.youtube-nocookie.com/embed/22p2YfSt3ZU" },
      uttar_pradesh: { id: "state_04", file: "data/states/state_04_uttar_pradesh.js", name: "Uttar Pradesh", tradition: "Kathak", color: "#38bdf8", secondary: "#818cf8", youtubeId: "hpKtU21PVu0", videoUrl: "https://www.youtube-nocookie.com/embed/hpKtU21PVu0" },
      west_bengal: { id: "state_05", file: "data/states/state_05_west_bengal.js", name: "West Bengal", tradition: "Baul", color: "#818cf8", secondary: "#c084fc", youtubeId: "QqJU_YpGeNs", videoUrl: "https://www.youtube-nocookie.com/embed/QqJU_YpGeNs" },
      tamil_nadu: { id: "state_06", file: "data/states/state_06_tamil_nadu.js", name: "Tamil Nadu", tradition: "Bharatanatyam", color: "#fbbf24", secondary: "#f59e0b", youtubeId: "2-9Lt01xY-k", videoUrl: "https://www.youtube-nocookie.com/embed/2-9Lt01xY-k" },
      karnataka: { id: "state_07", file: "data/states/state_07_karnataka.js", name: "Karnataka", tradition: "Yakshagana", color: "#34d399", secondary: "#10b981", youtubeId: "qUYWZXHL8JU", videoUrl: "https://www.youtube-nocookie.com/embed/qUYWZXHL8JU" },
      kerala: { id: "state_08", file: "data/states/state_08_kerala.js", name: "Kerala", tradition: "Theyyam", color: "#f43f5e", secondary: "#fb7185", youtubeId: "lnNieCUG4G4", videoUrl: "https://www.youtube-nocookie.com/embed/lnNieCUG4G4" },
      odisha: { id: "state_09", file: "data/states/state_09_odisha.js", name: "Odisha", tradition: "Odissi", color: "#a855f7", secondary: "#c084fc", youtubeId: "Uqmc0891L2U", videoUrl: "https://www.youtube-nocookie.com/embed/Uqmc0891L2U" },
      assam: { id: "state_10", file: "data/states/state_10_assam.js", name: "Assam", tradition: "Bihu", color: "#d4a347", secondary: "#fde047", youtubeId: "4buWapbwT0E", videoUrl: "https://www.youtube-nocookie.com/embed/4buWapbwT0E" },
      andhra_pradesh: { id: "state_11", file: "data/states/state_11_andhra_pradesh.js", name: "Andhra Pradesh", tradition: "Kuchipudi", color: "#c99a3d", secondary: "#eab308", youtubeId: "ko5sKNuSLbs", videoUrl: "https://www.youtube-nocookie.com/embed/ko5sKNuSLbs" },
      bihar: { id: "state_12", file: "data/states/state_12_bihar.js", name: "Bihar", tradition: "Madhubani / Mithila Art", color: "#d8b25a", secondary: "#f59e0b", youtubeId: "FhvLY9ZnbzI", videoUrl: "https://www.youtube-nocookie.com/embed/FhvLY9ZnbzI" },
      goa: { id: "state_13", file: "data/states/state_13_goa.js", name: "Goa", tradition: "Fugdi", color: "#06b6d4", secondary: "#22d3ee", youtubeId: "EokuS_QbkEM", videoUrl: "https://www.youtube-nocookie.com/embed/EokuS_QbkEM" },
      chhattisgarh: { id: "state_14", file: "data/states/state_14_chhattisgarh.js", name: "Chhattisgarh", tradition: "Panthi", color: "#e2e8f0", secondary: "#c9a24a", youtubeId: "Qe6_Vy2hleg", videoUrl: "https://www.youtube-nocookie.com/embed/Qe6_Vy2hleg" }
    };

    // Aliases for state_01 through state_14
    this.STATE_MAP["state_01"] = this.STATE_MAP.maharashtra;
    this.STATE_MAP["state_02"] = this.STATE_MAP.gujarat;
    this.STATE_MAP["state_03"] = this.STATE_MAP.rajasthan;
    this.STATE_MAP["state_04"] = this.STATE_MAP.uttar_pradesh;
    this.STATE_MAP["state_05"] = this.STATE_MAP.west_bengal;
    this.STATE_MAP["state_06"] = this.STATE_MAP.tamil_nadu;
    this.STATE_MAP["state_07"] = this.STATE_MAP.karnataka;
    this.STATE_MAP["state_08"] = this.STATE_MAP.kerala;
    this.STATE_MAP["state_09"] = this.STATE_MAP.odisha;
    this.STATE_MAP["state_10"] = this.STATE_MAP.assam;
    this.STATE_MAP["state_11"] = this.STATE_MAP.andhra_pradesh;
    this.STATE_MAP["state_12"] = this.STATE_MAP.bihar;
    this.STATE_MAP["state_13"] = this.STATE_MAP.goa;
    this.STATE_MAP["state_14"] = this.STATE_MAP.chhattisgarh;

    this.init();
  }

  /* ==========================================================
     INITIALIZATION & DOM CREATION
     ========================================================== */
  init() {
    if (!this.container) return;
    this.createDOM();
    this.cacheDOM();
    this.bindEvents();
  }

  createDOM() {
    this.container.innerHTML = `
      <div class="tradition-modal-backdrop" id="tradition-backdrop"></div>
      <div class="tradition-modal-window">
        <!-- ==============================================
             HEADER: BRAND, TITLES, STATE SELECTOR, ACTIONS
             ============================================== -->
        <header class="tradition-header">
          <div class="tradition-header-left">
            <div class="tradition-brand">
              <span class="tradition-badge">YUGMA LIVING TRADITIONS</span>
              <span class="tradition-divider">•</span>
              <span class="tradition-state-tag" id="tradition-header-state-tag">MAHARASHTRA</span>
            </div>
            <h2 id="tradition-header-title">LAVANI</h2>
            <p id="tradition-header-subtitle">MAHARASHTRA • LIVING PERFORMANCE & CULTURAL ARCHIVE</p>
          </div>

          <div class="tradition-header-actions">
            <!-- 14-State Selector -->
            <div class="tradition-state-selector-wrap">
              <label for="tradition-state-select" class="tradition-select-label">STATE</label>
              <select id="tradition-state-select" class="tradition-state-select" aria-label="Select Indian State">
                <option value="maharashtra">01 · MAHARASHTRA — Lavani</option>
                <option value="gujarat">02 · GUJARAT — Garba</option>
                <option value="rajasthan">03 · RAJASTHAN — Kalbelia</option>
                <option value="uttar_pradesh">04 · UTTAR PRADESH — Kathak</option>
                <option value="west_bengal">05 · WEST BENGAL — Baul</option>
                <option value="tamil_nadu">06 · TAMIL NADU — Bharatanatyam</option>
                <option value="karnataka">07 · KARNATAKA — Yakshagana</option>
                <option value="kerala">08 · KERALA — Theyyam</option>
                <option value="odisha">09 · ODISHA — Odissi</option>
                <option value="assam">10 · ASSAM — Bihu</option>
                <option value="andhra_pradesh">11 · ANDHRA PRADESH — Kuchipudi</option>
                <option value="bihar">12 · BIHAR — Madhubani</option>
                <option value="goa">13 · GOA — Fugdi</option>
                <option value="chhattisgarh">14 · CHHATTISGARH — Panthi</option>
              </select>
            </div>

            <button type="button" class="tradition-control-btn" id="tradition-fullscreen" title="Fullscreen">⛶ FULL</button>
            <button type="button" class="tradition-close-btn" id="tradition-close" title="Close">✕</button>
          </div>
        </header>

        <!-- ==============================================
             STAGE: 60% HERO LIVING PERFORMANCE SHOWCASE + 40% DETAILS PANEL
             ============================================== -->
        <main class="tradition-viewer-stage">
          <!-- 60% Hero Living Performance Showcase Area (Same size as original 3D box) -->
          <div class="tradition-canvas-wrap" id="tradition-canvas-wrap">
            <div class="tradition-showcase-box" id="tradition-showcase-box">
              <!-- Top Header Bar of Showcase Box -->
              <div class="showcase-header-bar">
                <div class="showcase-live-indicator">
                  <span class="pulse-dot"></span>
                  <span class="showcase-live-text">LIVING PERFORMANCE SHOWCASE</span>
                </div>
                <div class="showcase-tradition-badge" id="showcase-badge-text">
                  AUTHENTIC FOLK &amp; CLASSICAL HERITAGE
                </div>
              </div>

              <!-- Main Video Player Stage -->
              <div class="showcase-player-stage" id="showcase-player-stage">
                <div class="showcase-player-frame">
                  <iframe id="tradition-showcase-iframe" src="" title="Living Performance Showcase" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen loading="lazy"></iframe>
                </div>
              </div>

              <!-- Curation Placeholder (For states without provided videos yet) -->
              <div class="showcase-curation-box" id="showcase-curation-box" style="display: none;">
                <div class="curation-inner-card">
                  <div class="curation-glyph">🎭</div>
                  <span class="curation-pill">ARCHIVAL DIGITIZATION IN PROGRESS</span>
                  <h3 class="curation-title" id="curation-tradition-title">Tradition</h3>
                  <div class="curation-state" id="curation-state-name">STATE NAME</div>
                  <p class="curation-desc" id="curation-desc">
                    Master archival performance recordings for this sacred living tradition are currently being compiled into the National Heritage Registry.
                  </p>
                  <div class="curation-tags">
                    <span class="c-tag">✦ AUTHENTIC PERFORMANCE ARCHIVE</span>
                    <span class="c-tag">✦ LIVING FOLKLORE TRANSMISSION</span>
                  </div>
                </div>
              </div>

              <!-- Bottom Bar of Showcase Box -->
              <div class="showcase-footer-bar">
                <div class="showcase-note-area">
                  <span class="showcase-note-icon">🎵</span>
                  <span class="showcase-note-text" id="showcase-note-text">
                    Authentic performance showcasing classical footwork, traditional costumes, and cultural rhythms.
                  </span>
                </div>
                <div class="showcase-footer-meta">
                  <span class="meta-pill" id="showcase-meta-pill">AUTHENTIC TRADITION</span>
                </div>
              </div>
            </div>
          </div>

          <!-- 40% Rich Cultural Information Panel -->
          <aside class="tradition-info-panel" id="tradition-info-panel">
            <!-- Section 1: Hero & Description -->
            <div class="panel-section panel-hero">
              <div class="tradition-category-badge">LIVING CULTURAL TRADITION</div>
              <h3 class="tradition-name-large" id="tradition-name">Lavani</h3>
              <div class="tradition-state-sub" id="tradition-state-sub">MAHARASHTRA • WESTERN INDIA</div>
              <p class="tradition-description" id="tradition-description">Loading tradition details...</p>
            </div>

            <!-- Section 2: Cultural DNA Grid -->
            <div class="panel-section">
              <h4 class="section-title"><span class="dna-icon">🧬</span> CULTURAL DNA</h4>
              <div class="cultural-dna-grid">
                <div class="dna-card">
                  <span class="dna-label">ORIGIN</span>
                  <strong class="dna-val" id="dna-origin">—</strong>
                </div>
                <div class="dna-card">
                  <span class="dna-label">PERIOD</span>
                  <strong class="dna-val" id="dna-period">—</strong>
                </div>
                <div class="dna-card">
                  <span class="dna-label">REGION</span>
                  <strong class="dna-val" id="dna-region">—</strong>
                </div>
                <div class="dna-card">
                  <span class="dna-label">FESTIVAL</span>
                  <strong class="dna-val" id="dna-festival">—</strong>
                </div>
                <div class="dna-card">
                  <span class="dna-label">ART FORM</span>
                  <strong class="dna-val" id="dna-artform">—</strong>
                </div>
                <div class="dna-card">
                  <span class="dna-label">HERITAGE SITE</span>
                  <strong class="dna-val" id="dna-heritage">—</strong>
                </div>
              </div>
            </div>

            <!-- Section 3: Cultural Role -->
            <div class="panel-section">
              <h4 class="section-title"><span class="dna-icon">🎭</span> CULTURAL ROLE & COMMUNITY</h4>
              <p class="cultural-role-text" id="tradition-cultural-role">—</p>
            </div>

            <!-- Section 4: Heritage Connection -->
            <div class="panel-section">
              <h4 class="section-title"><span class="dna-icon">🏛️</span> HERITAGE CONNECTION</h4>
              <div class="heritage-conn-card">
                <strong class="heritage-conn-name" id="tradition-heritage-name">Ajanta & Ellora Caves</strong>
                <p class="heritage-conn-desc" id="tradition-heritage-desc">—</p>
              </div>
            </div>

            <!-- Section 5: Traditional Costume & Music -->
            <div class="panel-section">
              <h4 class="section-title"><span class="dna-icon">👗</span> ATTIRE & MUSICOLOGY</h4>
              <div class="costume-block">
                <div class="block-label">TRADITIONAL COSTUME & ORNAMENTS</div>
                <p class="block-text" id="tradition-costume-text">—</p>
              </div>
              <div class="music-block">
                <div class="block-label">MUSICAL STYLE & INSTRUMENTS</div>
                <p class="block-text" id="tradition-music-text">—</p>
                <div class="instruments-pills" id="tradition-instruments-pills"></div>
              </div>
            </div>

            <!-- Section 6: Did You Know? Facts -->
            <div class="panel-section">
              <h4 class="section-title"><span class="dna-icon">💡</span> DID YOU KNOW?</h4>
              <ul class="tradition-facts-list" id="tradition-facts-list"></ul>
            </div>

            <!-- Section 7: 3D Objects & AR/VR Potential -->
            <div class="panel-section">
              <h4 class="section-title"><span class="dna-icon">🥽</span> 3D OBJECTS & AR/VR SPATIAL TWIN</h4>
              <div class="objects-list-block" id="tradition-objects-block"></div>
              <div class="arvr-potential-card">
                <div class="arvr-tag">AR/VR SPATIAL ROADMAP</div>
                <p id="tradition-arvr-text">—</p>
              </div>
            </div>
          </aside>
        </main>

        <!-- ==============================================
             SIGNATURE LUXURY FOOTER
             ============================================== -->
        <footer class="tradition-footer">
          <div class="footer-left">
            <span class="footer-logo">YUGMA</span>
            <span class="footer-tagline">WHERE HERITAGE MEETS THE FUTURE</span>
          </div>
          <div class="footer-center">
            <span class="footer-status-pill">14 LIVING TRADITIONS • SACRED CULTURAL ARCHIVE</span>
          </div>
          <div class="footer-right">
            <span class="footer-copyright">MINISTRY OF CULTURE • SIH 2026</span>
          </div>
        </footer>
      </div>
    `;
  }

  cacheDOM() {
    this.dom = {
      backdrop: this.container.querySelector('#tradition-backdrop'),
      window: this.container.querySelector('.tradition-modal-window'),
      canvasWrap: this.container.querySelector('#tradition-canvas-wrap'),
      showcaseBox: this.container.querySelector('#tradition-showcase-box'),
      showcasePlayerStage: this.container.querySelector('#showcase-player-stage'),
      showcaseIframe: this.container.querySelector('#tradition-showcase-iframe'),
      showcaseCurationBox: this.container.querySelector('#showcase-curation-box'),
      curationTraditionTitle: this.container.querySelector('#curation-tradition-title'),
      curationStateName: this.container.querySelector('#curation-state-name'),
      curationDesc: this.container.querySelector('#curation-desc'),
      showcaseBadgeText: this.container.querySelector('#showcase-badge-text'),
      showcaseNoteText: this.container.querySelector('#showcase-note-text'),
      showcaseMetaPill: this.container.querySelector('#showcase-meta-pill'),
      stateSelect: this.container.querySelector('#tradition-state-select'),
      headerTitle: this.container.querySelector('#tradition-header-title'),
      headerSubtitle: this.container.querySelector('#tradition-header-subtitle'),
      headerStateTag: this.container.querySelector('#tradition-header-state-tag'),
      traditionName: this.container.querySelector('#tradition-name'),
      traditionStateSub: this.container.querySelector('#tradition-state-sub'),
      description: this.container.querySelector('#tradition-description'),
      culturalRole: this.container.querySelector('#tradition-cultural-role'),
      dnaOrigin: this.container.querySelector('#dna-origin'),
      dnaPeriod: this.container.querySelector('#dna-period'),
      dnaRegion: this.container.querySelector('#dna-region'),
      dnaFestival: this.container.querySelector('#dna-festival'),
      dnaArtform: this.container.querySelector('#dna-artform'),
      dnaHeritage: this.container.querySelector('#dna-heritage'),
      heritageName: this.container.querySelector('#tradition-heritage-name'),
      heritageDesc: this.container.querySelector('#tradition-heritage-desc'),
      costumeText: this.container.querySelector('#tradition-costume-text'),
      musicText: this.container.querySelector('#tradition-music-text'),
      instrumentsPills: this.container.querySelector('#tradition-instruments-pills'),
      factsList: this.container.querySelector('#tradition-facts-list'),
      objectsBlock: this.container.querySelector('#tradition-objects-block'),
      arvrText: this.container.querySelector('#tradition-arvr-text'),
      btnFullscreen: this.container.querySelector('#tradition-fullscreen'),
      btnClose: this.container.querySelector('#tradition-close')
    };
  }

  /* ==========================================================
     EVENT BINDINGS
     ========================================================== */
  bindEvents() {
    // Backdrop & Close
    if (this.dom.backdrop) this.dom.backdrop.addEventListener('click', () => this.close());
    if (this.dom.btnClose) this.dom.btnClose.addEventListener('click', () => this.close());

    // State Selector (Live switching without page reload)
    if (this.dom.stateSelect) {
      this.dom.stateSelect.addEventListener('change', async e => {
        const selectedKey = e.target.value;
        if (selectedKey) {
          await this.switchState(selectedKey);
        }
      });
    }

    // Header Fullscreen Control
    if (this.dom.btnFullscreen) this.dom.btnFullscreen.addEventListener('click', () => this.toggleFullscreen());

    // Keyboard shortcuts
    window.addEventListener('keydown', e => {
      if (!this.isOpen) return;
      if (e.key === 'Escape') this.close();
      if (e.key === 'f' || e.key === 'F') this.toggleFullscreen();
    });

    // Pointer Navigation (Safe orbit stub)
    this.bindPointerControls();
  }

  bindPointerControls() {
    const canvas = this.dom.canvas;
    if (!canvas) return;

    canvas.addEventListener('pointerdown', e => {
      this.isDragging = true;
      this.isPanning = e.shiftKey || e.button === 2;
      this.pointerStart = { x: e.clientX, y: e.clientY };
      this.pointerPrev = { x: e.clientX, y: e.clientY };
      canvas.setPointerCapture(e.pointerId);
    });

    canvas.addEventListener('pointermove', e => {
      if (!this.isDragging) return;
      const dx = e.clientX - this.pointerPrev.x;
      const dy = e.clientY - this.pointerPrev.y;

      if (this.isPanning) {
        // Pan camera target
        const factor = this.zoom * 0.0015;
        this.targetCameraTarget.x -= dx * factor;
        this.targetCameraTarget.y += dy * factor;
      } else {
        // Orbit rotation
        this.targetRotation.y += dx * 0.007;
        this.targetRotation.x += dy * 0.007;
        // Clamp pitch so camera doesn't flip
        this.targetRotation.x = Math.max(-1.3, Math.min(1.3, this.targetRotation.x));
      }

      this.pointerPrev = { x: e.clientX, y: e.clientY };
    });

    const endDrag = e => {
      if (this.isDragging) {
        this.isDragging = false;
        this.isPanning = false;
        try { canvas.releasePointerCapture(e.pointerId); } catch (_) {}
      }
    };

    canvas.addEventListener('pointerup', endDrag);
    canvas.addEventListener('pointercancel', endDrag);

    // Scroll Zoom
    canvas.addEventListener('wheel', e => {
      e.preventDefault();
      const zoomDelta = e.deltaY * 0.006;
      this.targetZoom = Math.max(this.minZoom, Math.min(this.maxZoom, this.targetZoom + zoomDelta));
    }, { passive: false });

    // Context Menu disable on canvas for right-click panning
    canvas.addEventListener('contextmenu', e => e.preventDefault());
  }

  /* ==========================================================
     OPEN / CLOSE / STATE SWITCHING WORKFLOW
     ========================================================== */
  async open(stateInput) {
    let key = 'maharashtra';
    if (typeof stateInput === 'string') {
      key = this.normalizeStateKey(stateInput);
    } else if (stateInput && typeof stateInput === 'object') {
      key = this.normalizeStateKey(stateInput.stateId || stateInput.id || stateInput.name);
    }

    this.isOpen = true;
    this.container.classList.add('active');
    document.body.classList.add('tradition-open');

    // Switch to target state
    await this.switchState(key);
  }

  close() {
    this.isOpen = false;
    this.container.classList.remove('active');
    document.body.classList.remove('tradition-open');

    // Stop video playback on close
    if (this.dom.showcaseIframe) this.dom.showcaseIframe.src = '';
  }

  async switchState(stateKey) {
    const normKey = this.normalizeStateKey(stateKey);
    this.currentStateKey = normKey;

    // Synchronize state selector dropdown
    if (this.dom.stateSelect && this.dom.stateSelect.value !== normKey) {
      this.dom.stateSelect.value = normKey;
    }

    // 1. Load state JS data dynamically
    const stateData = await this.loadStateData(normKey);
    this.currentStateData = stateData;

    // 2. Update all Information Panel elements
    this.updateInformationPanel(normKey, stateData);

    // 3. Update Living Performance Showcase Box (in place of 3D box, same size)
    this.updateShowcaseBox(normKey, stateData);

    // 4. In-DOM translation into user's selected language
    const currentSiteLang = window.yugmaTranslator ? window.yugmaTranslator.getLanguage() : 'en';
    if (window.yugmaTranslator && currentSiteLang && currentSiteLang !== 'en') {
      window.yugmaTranslator.translateDOM(currentSiteLang, this.container);
    }
  }

  onLanguageChanged(newLang) {
    if (!this.isOpen) return;
    if (this.currentStateData) {
      this.updateInformationPanel(this.currentStateKey, this.currentStateData);
      this.updateShowcaseBox(this.currentStateKey, this.currentStateData);
    }
    if (window.yugmaTranslator) {
      window.yugmaTranslator.translateDOM(newLang, this.container);
    }
  }

  updateShowcaseBox(key, data) {
    const meta = this.STATE_MAP[key] || this.STATE_MAP.maharashtra;
    const tradition = data.tradition || meta.tradition;
    const stateName = data.state || meta.name;
    const videoId = data.youtubeId || meta.youtubeId || (this.STATE_MAP[key] ? this.STATE_MAP[key].youtubeId : null);

    if (this.dom.showcaseBadgeText) {
      this.dom.showcaseBadgeText.textContent = `${stateName.toUpperCase()} • ${data.category || 'LIVING TRADITION'}`;
    }

    if (videoId) {
      if (this.dom.showcasePlayerStage) this.dom.showcasePlayerStage.style.display = 'flex';
      if (this.dom.showcaseCurationBox) this.dom.showcaseCurationBox.style.display = 'none';
      if (this.dom.showcaseIframe) {
        const embedUrl = `https://www.youtube-nocookie.com/embed/${videoId}?rel=0&modestbranding=1&enablejsapi=1`;
        if (this.dom.showcaseIframe.src !== embedUrl) {
          this.dom.showcaseIframe.src = embedUrl;
        }
        this.dom.showcaseIframe.referrerPolicy = 'strict-origin-when-cross-origin';
        this.dom.showcaseIframe.title = `${tradition} Living Performance Showcase`;
      }
      if (this.dom.showcaseNoteText) {
        this.dom.showcaseNoteText.textContent = `Authentic ${tradition} performance showcasing classical footwork, traditional costumes, and cultural rhythms of ${stateName}.`;
      }
      if (this.dom.showcaseMetaPill) {
        this.dom.showcaseMetaPill.textContent = 'AUTHENTIC VIDEO RECORDING';
      }
    } else {
      if (this.dom.showcasePlayerStage) this.dom.showcasePlayerStage.style.display = 'none';
      if (this.dom.showcaseIframe) this.dom.showcaseIframe.src = '';
      if (this.dom.showcaseCurationBox) this.dom.showcaseCurationBox.style.display = 'flex';
      if (this.dom.curationTraditionTitle) this.dom.curationTraditionTitle.textContent = tradition;
      if (this.dom.curationStateName) this.dom.curationStateName.textContent = `${stateName.toUpperCase()} • ${data.region || 'INDIA'}`;
      if (this.dom.curationDesc) {
        this.dom.curationDesc.textContent = `High-fidelity archival video recordings for ${tradition} are currently being curated and will be integrated into the National Cultural Registry.`;
      }
      if (this.dom.showcaseNoteText) {
        this.dom.showcaseNoteText.textContent = `Archival performance documentation for ${tradition} (${stateName}) is currently in active curation.`;
      }
      if (this.dom.showcaseMetaPill) {
        this.dom.showcaseMetaPill.textContent = 'CURATION IN PROGRESS';
      }
    }
  }

  normalizeStateKey(key) {
    if (!key) return 'maharashtra';
    const str = String(key).toLowerCase().trim();
    if (str.startsWith('state_')) {
      const idx = parseInt(str.replace('state_', ''), 10);
      const keys = ['maharashtra', 'gujarat', 'rajasthan', 'uttar_pradesh', 'west_bengal', 'tamil_nadu', 'karnataka', 'kerala', 'odisha', 'assam', 'andhra_pradesh', 'bihar', 'goa', 'chhattisgarh'];
      if (idx >= 1 && idx <= keys.length) return keys[idx - 1];
    }
    const clean = str.replace(/[\s-]+/g, '_');
    if (this.STATE_MAP[clean]) return clean;
    if (clean.includes('maha')) return 'maharashtra';
    if (clean.includes('guja')) return 'gujarat';
    if (clean.includes('raja')) return 'rajasthan';
    if ((clean.includes('uttar') || clean.includes('uttar_p')) && !clean.includes('uttarakhand')) return 'uttar_pradesh';
    if (clean.includes('bengal')) return 'west_bengal';
    if (clean.includes('tamil')) return 'tamil_nadu';
    // Fallback fuzzy search
    for (const k of Object.keys(this.STATE_MAP)) {
      if (clean.includes(k) || k.includes(clean)) return k;
    }
    return 'maharashtra';
  }

  async loadStateData(key) {
    // 1. Check if already registered globally
    const meta = this.STATE_MAP[key] || this.STATE_MAP.maharashtra;
    const globalData = window.YUGMA_STATES_DATA || {};
    if (globalData[meta.id]) return globalData[meta.id];
    if (globalData[key]) return globalData[key];

    // 2. Dynamically load script tag asynchronously
    if (meta && meta.file) {
      try {
        await this.loadScriptAsync(meta.file);
        const refreshed = window.YUGMA_STATES_DATA || {};
        if (refreshed[meta.id]) return refreshed[meta.id];
        if (refreshed[key]) return refreshed[key];
      } catch (err) {
        console.warn(`[YUGMA Living Studio] Dynamic load failed for ${meta.file}:`, err);
      }
    }

    // 3. Fallback to basic descriptor if file load failed
    return {
      id: meta.id,
      state: meta.name,
      tradition: meta.tradition,
      category: "Living Cultural Tradition",
      region: "India",
      origin: "Ancient Indian cultural tradition.",
      period: "Historical Heritage",
      description: `${meta.tradition} is a celebrated living cultural tradition of ${meta.name}.`,
      culturalRole: `Preserves the communal folklore, music, and ceremonial performance heritage of ${meta.name}.`,
      festivalConnection: "Regional cultural festivals",
      heritageConnection: "Sacred historical landmarks",
      costume: "Traditional regional attire with handloom fabrics and ceremonial ornaments.",
      music: "Folk and classical regional rhythms.",
      instruments: ["Dholak", "Flute", "Cymbals"],
      facts: [
        `${meta.tradition} has flourished for centuries in ${meta.name}.`,
        "Transmitted through dedicated master-disciple lineages.",
        "Reflects the architectural and spiritual heritage of the region."
      ],
      objects: ["Traditional costume", "Ceremonial percussion drum", "Handmade musical instrument"],
      thumbnail: "assets/thumbnails/default.jpg",
      arVrPotential: "Spatial volumetric capture for immersive WebXR interaction.",
      youtubeId: meta.youtubeId || null
    };
  }

  loadScriptAsync(src) {
    return new Promise((resolve, reject) => {
      // Check if already injected
      const existing = document.querySelector(`script[src="${src}"]`);
      if (existing) {
        resolve();
        return;
      }
      const script = document.createElement('script');
      script.src = src;
      script.async = true;
      script.onload = () => resolve();
      script.onerror = err => reject(err);
      document.head.appendChild(script);
    });
  }

  /* ==========================================================
     INFORMATION PANEL RENDERER
     ========================================================== */
  updateInformationPanel(key, data) {
    const meta = this.STATE_MAP[key] || this.STATE_MAP.maharashtra;
    const tradition = data.tradition || meta.tradition;
    const stateName = data.state || meta.name;
    const region = data.region || "India";

    // Header updates
    if (this.dom.headerTitle) this.dom.headerTitle.textContent = tradition.toUpperCase();
    if (this.dom.headerSubtitle) this.dom.headerSubtitle.textContent = `${stateName.toUpperCase()} • LIVING PERFORMANCE & CULTURAL ARCHIVE`;
    if (this.dom.headerStateTag) this.dom.headerStateTag.textContent = stateName.toUpperCase();

    // Panel Hero
    if (this.dom.traditionName) this.dom.traditionName.textContent = tradition;
    if (this.dom.traditionStateSub) this.dom.traditionStateSub.textContent = `${stateName.toUpperCase()} • ${region.toUpperCase()}`;
    if (this.dom.description) this.dom.description.textContent = data.description || '';

    // Cultural DNA Grid
    if (this.dom.dnaOrigin) this.dom.dnaOrigin.textContent = data.origin || 'Historical Lineage';
    if (this.dom.dnaPeriod) this.dom.dnaPeriod.textContent = data.period || 'Ancient to Present';
    if (this.dom.dnaRegion) this.dom.dnaRegion.textContent = region;
    if (this.dom.dnaFestival) this.dom.dnaFestival.textContent = data.festivalConnection || 'Regional Festivals';
    if (this.dom.dnaArtform) this.dom.dnaArtform.textContent = data.category || 'Living Cultural Tradition';
    if (this.dom.dnaHeritage) this.dom.dnaHeritage.textContent = data.heritageConnection ? data.heritageConnection.split('(')[0].trim() : 'Sacred Heritage Sites';

    // Cultural Role
    if (this.dom.culturalRole) this.dom.culturalRole.textContent = data.culturalRole || '';

    // Heritage Connection Card
    if (this.dom.heritageName) {
      this.dom.heritageName.textContent = data.heritageConnection ? data.heritageConnection.split('(')[0].trim() : `${stateName} Heritage`;
    }
    if (this.dom.heritageDesc) {
      this.dom.heritageDesc.textContent = data.heritageConnection || '';
    }

    // Costume & Music
    if (this.dom.costumeText) this.dom.costumeText.textContent = data.costume || '';
    if (this.dom.musicText) this.dom.musicText.textContent = data.music || '';

    // Instrument Pills
    if (this.dom.instrumentsPills) {
      this.dom.instrumentsPills.innerHTML = '';
      const insts = data.instruments || [];
      insts.forEach(inst => {
        const pill = document.createElement('span');
        pill.className = 'inst-pill';
        pill.textContent = `♪ ${inst}`;
        this.dom.instrumentsPills.appendChild(pill);
      });
    }

    // Did You Know? Facts List
    if (this.dom.factsList) {
      this.dom.factsList.innerHTML = '';
      const facts = data.facts || [];
      facts.slice(0, 7).forEach(fact => {
        const li = document.createElement('li');
        li.textContent = fact;
        this.dom.factsList.appendChild(li);
      });
    }

    // 3D Objects List
    if (this.dom.objectsBlock) {
      this.dom.objectsBlock.innerHTML = '';
      const objs = data.objects || [];
      objs.forEach(obj => {
        const item = document.createElement('div');
        item.className = 'object-item';
        item.innerHTML = `<span class="cube-icon">❖</span> <span>${obj}</span>`;
        this.dom.objectsBlock.appendChild(item);
      });
    }

    // AR/VR Potential
    if (this.dom.arvrText) this.dom.arvrText.textContent = data.arVrPotential || '';

    // Theme Variables
    this.container.style.setProperty('--tradition-primary', meta.color || '#c9a24a');
    this.container.style.setProperty('--tradition-secondary', meta.secondary || '#fde047');
  }

  // Safe stubs for any previous 3D lifecycle calls
  ensureThree() {}
  startAnimation() {}
  stopAnimation() {}
  disposeCurrentModel() {}
  showLoading() {}
  processModelLoading() {}
  resetView() {}
  toggleAutoRotate() {}
  toggleCinemaMode() {}

  /* ==========================================================
     3D MODEL LOADING & PROCEDURAL FALLBACK
     ========================================================== */
  async processModelLoading(key, stateData) {
    const meta = this.STATE_MAP[key] || this.STATE_MAP.maharashtra;
    let modelLoadedSuccessfully = false;

    // Check if modelPath is provided (non-null and non-empty)
    if (stateData.modelPath && typeof stateData.modelPath === 'string') {
      try {
        const gltf = await this.loadGLTFModel(stateData.modelPath);
        if (gltf && gltf.scene) {
          this.model = gltf.scene;
          this.normalizeAndCenterModel(this.model);
          this.scene.add(this.model);
          this.fitCameraToObject(this.model);
          modelLoadedSuccessfully = true;
        }
      } catch (err) {
        console.warn(`[YUGMA 3D Studio] Failed loading model at ${stateData.modelPath}:`, err);
      }
    }

    if (modelLoadedSuccessfully) {
      this.loadedModel = true;
      if (this.dom.comingSoon) this.dom.comingSoon.style.display = 'none';
    } else {
      // Model not provided or missing: Display "3D MODEL COMING SOON" badge
      this.loadedModel = false;
      if (this.dom.comingSoon) this.dom.comingSoon.style.display = 'block';

      // Create exquisite procedural cultural 3D motif (Never an empty black canvas!)
      this.createProceduralCulturalModel(key, stateData);
      this.fitCameraToObject(this.model, 1.4);
    }
  }

  async loadGLTFModel(url) {
    if (!this.modelLoader) {
      if (window.THREE && window.THREE.GLTFLoader) {
        this.modelLoader = new window.THREE.GLTFLoader();
      } else {
        try {
          // 1. Try standard importmap addon resolution
          const { GLTFLoader } = await import('three/addons/loaders/GLTFLoader.js');
          this.modelLoader = new GLTFLoader();
        } catch (e1) {
          try {
            // 2. Fallback to direct CDN import
            const module = await import('https://cdn.jsdelivr.net/npm/three@0.180.0/examples/jsm/loaders/GLTFLoader.js');
            this.modelLoader = new module.GLTFLoader();
          } catch (e2) {
            console.warn("[YUGMA 3D Studio] Could not initialize GLTFLoader:", e1, e2);
            return null;
          }
        }
      }
    }
    return new Promise((resolve, reject) => {
      this.modelLoader.load(
        url,
        gltf => {
          console.log(`[YUGMA 3D Studio] Successfully loaded 3D model from ${url}`);
          resolve(gltf);
        },
        xhr => {
          if (xhr.lengthComputable && xhr.total > 0) {
            const pct = Math.round((xhr.loaded / xhr.total) * 100);
            console.log(`[YUGMA 3D Studio] Loading ${url}: ${pct}%`);
          }
        },
        err => {
          console.warn(`[YUGMA 3D Studio] Error loading model from ${url}:`, err);
          reject(err);
        }
      );
    });
  }

  normalizeAndCenterModel(object) {
    const box = new THREE.Box3().setFromObject(object);
    const size = box.getSize(new THREE.Vector3());
    const center = box.getCenter(new THREE.Vector3());
    const maxDim = Math.max(size.x, size.y, size.z);

    if (maxDim > 0) {
      const scale = 4.0 / maxDim;
      object.scale.setScalar(scale);
    }

    object.position.x = -center.x * object.scale.x;
    object.position.y = -center.y * object.scale.y;
    object.position.z = -center.z * object.scale.z;

    object.traverse(child => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
        if (child.material) {
          child.material.side = THREE.DoubleSide;
        }
      }
    });
  }

  /* ==========================================================
     PROCEDURAL CULTURAL 3D MOTIF (RICH HERITAGE MANDALA)
     ========================================================== */
  createProceduralCulturalModel(key, stateData) {
    const meta = this.STATE_MAP[key] || this.STATE_MAP.maharashtra;
    const primaryColor = new THREE.Color(meta.color || 0xc9a24a);
    const secondaryColor = new THREE.Color(meta.secondary || 0xfde047);
    const goldColor = new THREE.Color(0xc9a24a);

    const group = new THREE.Group();
    group.name = "YUGMA_PROCEDURAL_MOTIF";

    // 1. Multi-Tiered Sacred Pedestal
    const baseGeo = new THREE.CylinderGeometry(2.2, 2.5, 0.25, 64);
    const baseMat = new THREE.MeshStandardMaterial({
      color: 0x0f141e,
      roughness: 0.35,
      metalness: 0.85
    });
    const baseMesh = new THREE.Mesh(baseGeo, baseMat);
    baseMesh.position.y = -1.8;
    baseMesh.receiveShadow = true;
    baseMesh.castShadow = true;
    group.add(baseMesh);

    // Pedestal Gold Trim Ring
    const trimGeo = new THREE.TorusGeometry(2.35, 0.04, 16, 96);
    const trimMat = new THREE.MeshStandardMaterial({
      color: goldColor,
      emissive: goldColor,
      emissiveIntensity: 0.35,
      metalness: 0.95,
      roughness: 0.15
    });
    const trimMesh = new THREE.Mesh(trimGeo, trimMat);
    trimMesh.rotation.x = Math.PI / 2;
    trimMesh.position.y = -1.68;
    group.add(trimMesh);

    // 2. Central Cultural Emblem Core
    const coreGeo = new THREE.IcosahedronGeometry(1.05, 2);
    const coreMat = new THREE.MeshStandardMaterial({
      color: primaryColor,
      emissive: primaryColor,
      emissiveIntensity: 0.38,
      roughness: 0.25,
      metalness: 0.75,
      wireframe: false
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    coreMesh.position.y = 0.05;
    coreMesh.castShadow = true;
    coreMesh.receiveShadow = true;
    group.add(coreMesh);

    // Inner Wireframe Facets for Sacred Geometry
    const wireGeo = new THREE.IcosahedronGeometry(1.08, 1);
    const wireMat = new THREE.MeshBasicMaterial({
      color: secondaryColor,
      wireframe: true,
      transparent: true,
      opacity: 0.65
    });
    const wireMesh = new THREE.Mesh(wireGeo, wireMat);
    wireMesh.position.y = 0.05;
    group.add(wireMesh);

    // 3. Three Cosmic Orbital Rings
    for (let i = 0; i < 3; i++) {
      const radius = 1.45 + i * 0.32;
      const ringGeo = new THREE.TorusGeometry(radius, 0.02, 16, 96);
      const ringMat = new THREE.MeshStandardMaterial({
        color: i % 2 === 0 ? secondaryColor : goldColor,
        emissive: i % 2 === 0 ? secondaryColor : goldColor,
        emissiveIntensity: 0.45,
        metalness: 0.9,
        roughness: 0.2
      });
      const ring = new THREE.Mesh(ringGeo, ringMat);
      ring.rotation.x = (Math.PI / 2) + (i * 0.35);
      ring.rotation.y = i * 0.45;
      ring.position.y = 0.05;
      ring.name = `ORBIT_RING_${i}`;
      group.add(ring);
    }

    // 4. Floating Sacred Lotus Petals / Diamond Beacons
    const petalCount = 8;
    for (let i = 0; i < petalCount; i++) {
      const angle = (i / petalCount) * Math.PI * 2;
      const dist = 2.05;
      const petalGeo = new THREE.OctahedronGeometry(0.18, 0);
      const petalMat = new THREE.MeshStandardMaterial({
        color: i % 2 === 0 ? primaryColor : secondaryColor,
        emissive: i % 2 === 0 ? primaryColor : secondaryColor,
        emissiveIntensity: 0.5,
        metalness: 0.85,
        roughness: 0.2
      });
      const petal = new THREE.Mesh(petalGeo, petalMat);
      petal.position.set(Math.cos(angle) * dist, -0.25 + Math.sin(i * 1.5) * 0.35, Math.sin(angle) * dist);
      petal.castShadow = true;
      petal.userData = { baseY: petal.position.y, angle, speed: 1.2 + (i % 3) * 0.3 };
      petal.name = `PETAL_${i}`;
      group.add(petal);
    }

    // 5. Tradition Specific Silhouette Accent
    this.attachTraditionSpecificSilhouette(group, key, primaryColor, secondaryColor);

    this.model = group;
    this.scene.add(this.model);
  }

  attachTraditionSpecificSilhouette(group, key, pCol, sCol) {
    const matGold = new THREE.MeshStandardMaterial({
      color: 0xc9a24a,
      emissive: 0xc9a24a,
      emissiveIntensity: 0.4,
      metalness: 0.9,
      roughness: 0.15
    });

    switch (key) {
      case 'maharashtra': {
        // Lavani Dholki Silhouette
        const drumGeo = new THREE.CylinderGeometry(0.38, 0.48, 1.2, 32);
        const drum = new THREE.Mesh(drumGeo, matGold);
        drum.rotation.z = Math.PI / 2;
        drum.position.y = 1.45;
        group.add(drum);
        break;
      }
      case 'gujarat': {
        // Garba Diya / Deep Silhouette
        const bowlGeo = new THREE.CylinderGeometry(0.55, 0.25, 0.4, 32);
        const bowl = new THREE.Mesh(bowlGeo, matGold);
        bowl.position.y = 1.35;
        group.add(bowl);
        const flameGeo = new THREE.ConeGeometry(0.16, 0.45, 16);
        const flameMat = new THREE.MeshBasicMaterial({ color: 0xffa500 });
        const flame = new THREE.Mesh(flameGeo, flameMat);
        flame.position.y = 1.7;
        group.add(flame);
        break;
      }
      case 'rajasthan': {
        // Kalbelia Poongi (Been) Silhouette
        const gourdGeo = new THREE.SphereGeometry(0.35, 16, 16);
        const gourd = new THREE.Mesh(gourdGeo, matGold);
        gourd.position.y = 1.5;
        group.add(gourd);
        const pipeGeo = new THREE.CylinderGeometry(0.06, 0.07, 0.8, 16);
        const pipe = new THREE.Mesh(pipeGeo, matGold);
        pipe.position.y = 1.0;
        group.add(pipe);
        break;
      }
      case 'uttar_pradesh': {
        // Kathak Ghungroo Bell Arch
        const archGeo = new THREE.TorusGeometry(0.65, 0.08, 16, 48, Math.PI);
        const arch = new THREE.Mesh(archGeo, matGold);
        arch.position.y = 1.35;
        group.add(arch);
        break;
      }
      case 'west_bengal': {
        // Baul Ektara Silhouette
        const ektaraGeo = new THREE.CylinderGeometry(0.04, 0.04, 1.4, 16);
        const ektara = new THREE.Mesh(ektaraGeo, matGold);
        ektara.position.y = 1.5;
        group.add(ektara);
        break;
      }
      case 'tamil_nadu': {
        // Bharatanatyam Nataraja Ring of Fire
        const fireRingGeo = new THREE.TorusGeometry(0.85, 0.05, 16, 64);
        const fireRing = new THREE.Mesh(fireRingGeo, matGold);
        fireRing.position.y = 1.4;
        group.add(fireRing);
        break;
      }
      case 'karnataka': {
        // Yakshagana Pagade Headdress Crown
        const crownGeo = new THREE.ConeGeometry(0.65, 0.85, 8);
        const crown = new THREE.Mesh(crownGeo, matGold);
        crown.position.y = 1.5;
        group.add(crown);
        break;
      }
      case 'kerala': {
        // Theyyam Mudi Towering Crown
        const mudiGeo = new THREE.ConeGeometry(0.45, 1.35, 16);
        const mudi = new THREE.Mesh(mudiGeo, matGold);
        mudi.position.y = 1.6;
        group.add(mudi);
        break;
      }
      case 'odisha': {
        // Odissi Konark Wheel / Crown
        const wheelGeo = new THREE.TorusGeometry(0.7, 0.06, 16, 48);
        const wheel = new THREE.Mesh(wheelGeo, matGold);
        wheel.position.y = 1.4;
        group.add(wheel);
        break;
      }
      case 'assam': {
        // Bihu Buffalo Horn Pepa Curve
        const hornGeo = new THREE.TorusGeometry(0.55, 0.07, 16, 32, Math.PI * 0.7);
        const horn = new THREE.Mesh(hornGeo, matGold);
        horn.position.y = 1.4;
        horn.rotation.z = Math.PI / 4;
        group.add(horn);
        break;
      }
      case 'andhra_pradesh': {
        // Kuchipudi Tarangam Brass Plate
        const plateGeo = new THREE.CylinderGeometry(0.8, 0.8, 0.06, 48);
        const plate = new THREE.Mesh(plateGeo, matGold);
        plate.position.y = 1.35;
        group.add(plate);
        break;
      }
      case 'bihar': {
        // Madhubani Lotus Mandala
        const lotusGeo = new THREE.CylinderGeometry(0.75, 0.1, 0.18, 12);
        const lotus = new THREE.Mesh(lotusGeo, matGold);
        lotus.position.y = 1.4;
        group.add(lotus);
        break;
      }
      case 'goa': {
        // Fugdi Coconut Katti Castanets
        const shellGeo = new THREE.SphereGeometry(0.32, 16, 16, 0, Math.PI * 2, 0, Math.PI / 2);
        const shell = new THREE.Mesh(shellGeo, matGold);
        shell.rotation.x = Math.PI;
        shell.position.y = 1.4;
        group.add(shell);
        break;
      }
      case 'chhattisgarh': {
        // Panthi Jaitkham White Victory Pillar
        const pillarGeo = new THREE.CylinderGeometry(0.08, 0.12, 1.4, 16);
        const pillarMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.2, metalness: 0.5 });
        const pillar = new THREE.Mesh(pillarGeo, pillarMat);
        pillar.position.y = 1.5;
        group.add(pillar);
        break;
      }
      default:
        break;
    }
  }

  /* ==========================================================
     CAMERA AUTO-FRAMING & BOUNDING BOX CENTERING
     ========================================================== */
  fitCameraToObject(object, offset = 1.35) {
    if (!object || !this.camera) return;

    const box = new THREE.Box3().setFromObject(object);
    const size = box.getSize(new THREE.Vector3());
    const center = box.getCenter(new THREE.Vector3());
    const maxDim = Math.max(size.x, size.y, size.z);

    const fov = this.camera.fov * (Math.PI / 180);
    let cameraZ = Math.abs(maxDim / 2 / Math.tan(fov / 2)) * offset;
    cameraZ = Math.max(this.minZoom, Math.min(this.maxZoom, cameraZ));

    this.targetZoom = cameraZ;
    this.zoom = cameraZ;
    this.targetCameraTarget = { x: 0, y: center.y * 0.25, z: 0 };
    this.cameraTarget = { ...this.targetCameraTarget };

    this.targetRotation.x = 0.12;
    this.targetRotation.y = -0.35;
  }

  /* ==========================================================
     THREE.JS INITIALIZATION & SCENE GRAPH
     ========================================================== */
  ensureThree() {
    if (this.renderer) {
      this.resize();
      return;
    }

    if (typeof THREE === 'undefined') {
      console.error('[YUGMA 3D Studio] Three.js is not loaded.');
      return;
    }

    const canvas = this.dom.canvas;
    const wrap = this.dom.canvasWrap;
    if (!canvas || !wrap) return;

    // 1. Scene
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x06090e);

    // 2. Camera
    const aspect = wrap.clientWidth / wrap.clientHeight || 1;
    this.camera = new THREE.PerspectiveCamera(40, aspect, 0.1, 100);
    this.camera.position.set(0, 0.8, this.zoom);

    // 3. Renderer
    this.renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance'
    });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    this.clock = new THREE.Clock();

    // 4. Lighting Setup
    this.setupLighting();

    // 5. Floor Pedestal Disc
    this.setupFloor();

    // 6. Subtle Gold Dust Particles
    this.setupSubtleParticles();

    // 7. Resize Observer
    this.resize();
    this.resizeObserver = new ResizeObserver(() => this.resize());
    this.resizeObserver.observe(wrap);
  }

  setupLighting() {
    // Ambient Warm Light
    const ambient = new THREE.AmbientLight(0xfffaed, 2.2);
    this.scene.add(ambient);
    this.lights.push(ambient);

    // Key Directional Light with Soft Shadows
    const keyLight = new THREE.DirectionalLight(0xffeed0, 3.2);
    keyLight.position.set(5, 8, 6);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 2048;
    keyLight.shadow.mapSize.height = 2048;
    keyLight.shadow.camera.near = 0.5;
    keyLight.shadow.camera.far = 25;
    keyLight.shadow.bias = -0.0005;
    keyLight.shadow.radius = 4;
    this.scene.add(keyLight);
    this.lights.push(keyLight);

    // Fill Cool Light from Left Flank
    const fillLight = new THREE.DirectionalLight(0x88b0f0, 1.2);
    fillLight.position.set(-6, 4, -4);
    this.scene.add(fillLight);
    this.lights.push(fillLight);

    // Subtle Gold Warm Rim / Environment Glow
    const rimLight = new THREE.PointLight(0xc9a24a, 2.6, 20);
    rimLight.position.set(0, 3.5, -4);
    this.scene.add(rimLight);
    this.lights.push(rimLight);
  }

  setupFloor() {
    const geo = new THREE.CircleGeometry(5.0, 96);
    const mat = new THREE.MeshStandardMaterial({
      color: 0x070b12,
      roughness: 0.65,
      metalness: 0.4,
      transparent: true,
      opacity: 0.85
    });
    this.floor = new THREE.Mesh(geo, mat);
    this.floor.rotation.x = -Math.PI / 2;
    this.floor.position.y = -2.2;
    this.floor.receiveShadow = true;
    this.scene.add(this.floor);
  }

  setupSubtleParticles() {
    const count = 160;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const radius = 2.5 + Math.random() * 5.0;
      const angle = Math.random() * Math.PI * 2;
      positions[i * 3] = Math.cos(angle) * radius;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 6;
      positions[i * 3 + 2] = Math.sin(angle) * radius;
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const mat = new THREE.PointsMaterial({
      color: 0xc9a24a,
      size: 0.024,
      transparent: true,
      opacity: 0.55
    });
    this.particles = new THREE.Points(geo, mat);
    this.scene.add(this.particles);
  }

  /* ==========================================================
     RENDER LOOP & SMOOTH INTERPOLATION
     ========================================================== */
  startAnimation() {
    if (this.animId) return;
    const animate = () => {
      this.animId = requestAnimationFrame(animate);
      this.renderFrame();
    };
    this.animId = requestAnimationFrame(animate);
  }

  stopAnimation() {
    if (this.animId) {
      cancelAnimationFrame(this.animId);
      this.animId = null;
    }
  }

  renderFrame() {
    if (!this.renderer || !this.scene || !this.camera) return;

    const delta = this.clock ? this.clock.getDelta() : 0.016;

    // Auto-rotation handling
    if (this.autoRotate && !this.isDragging) {
      this.targetRotation.y += this.autoRotateSpeed;
    }

    // Smooth Damping for Rotation & Zoom
    this.rotation.x += (this.targetRotation.x - this.rotation.x) * 0.08;
    this.rotation.y += (this.targetRotation.y - this.rotation.y) * 0.08;
    this.zoom += (this.targetZoom - this.zoom) * 0.1;
    this.cameraTarget.x += (this.targetCameraTarget.x - this.cameraTarget.x) * 0.08;
    this.cameraTarget.y += (this.targetCameraTarget.y - this.cameraTarget.y) * 0.08;
    this.cameraTarget.z += (this.targetCameraTarget.z - this.cameraTarget.z) * 0.08;

    // Spherical Orbit Coordinates
    const cosPitch = Math.cos(this.rotation.x);
    this.camera.position.x = this.cameraTarget.x + this.zoom * Math.sin(this.rotation.y) * cosPitch;
    this.camera.position.y = this.cameraTarget.y + this.zoom * Math.sin(this.rotation.x);
    this.camera.position.z = this.cameraTarget.z + this.zoom * Math.cos(this.rotation.y) * cosPitch;
    this.camera.lookAt(this.cameraTarget.x, this.cameraTarget.y, this.cameraTarget.z);

    // Animate Procedural Lotus Petals & Rings if active
    if (!this.loadedModel && this.model) {
      const time = this.clock ? this.clock.getElapsedTime() : 0;
      this.model.traverse(child => {
        if (child.name.startsWith('PETAL_') && child.userData) {
          child.position.y = child.userData.baseY + Math.sin(time * child.userData.speed + child.userData.angle) * 0.15;
          child.rotation.y += 0.01;
        } else if (child.name.startsWith('ORBIT_RING_')) {
          child.rotation.z += 0.005;
        }
      });
    }

    // Subtle particle drifting
    if (this.particles) {
      this.particles.rotation.y += 0.0006;
    }

    this.renderer.render(this.scene, this.camera);
  }

  resize() {
    if (!this.renderer || !this.camera || !this.dom.canvasWrap) return;
    const width = this.dom.canvasWrap.clientWidth || 600;
    const height = this.dom.canvasWrap.clientHeight || 500;
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height, false);
  }

  /* ==========================================================
     CONTROLS: RESET, AUTO ROTATE, FULLSCREEN
     ========================================================== */
  resetView() {
    this.targetRotation.x = 0.15;
    this.targetRotation.y = -0.4;
    this.targetCameraTarget = { x: 0, y: 0, z: 0 };
    if (this.model) {
      this.fitCameraToObject(this.model, 1.35);
    } else {
      this.targetZoom = 6.5;
    }
  }

  toggleAutoRotate() {
    this.autoRotate = !this.autoRotate;
    if (this.dom.btnAuto) this.dom.btnAuto.classList.toggle('active', this.autoRotate);
    if (this.dom.hudAutoBtn) this.dom.hudAutoBtn.classList.toggle('active', this.autoRotate);
  }

  toggleFullscreen() {
    const el = this.dom.window || this.container;
    if (!document.fullscreenElement) {
      if (el.requestFullscreen) {
        el.requestFullscreen();
      } else if (el.webkitRequestFullscreen) {
        el.webkitRequestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  }

  showLoading(show) {
    if (this.dom.loading) {
      this.dom.loading.classList.toggle('active', Boolean(show));
    }
  }

  /* ==========================================================
     DISPOSAL & MEMORY CLEANUP
     ========================================================== */
  disposeCurrentModel() {
    if (!this.model || !this.scene) return;
    this.scene.remove(this.model);
    this.model.traverse(child => {
      if (child.isMesh) {
        if (child.geometry) child.geometry.dispose();
        if (child.material) {
          if (Array.isArray(child.material)) {
            child.material.forEach(m => this.disposeMaterial(m));
          } else {
            this.disposeMaterial(child.material);
          }
        }
      }
    });
    this.model = null;
  }

  disposeMaterial(material) {
    if (!material) return;
    material.dispose();
    ['map', 'lightMap', 'bumpMap', 'normalMap', 'specularMap', 'envMap', 'roughnessMap', 'metalnessMap', 'alphaMap', 'aoMap'].forEach(prop => {
      if (material[prop] && typeof material[prop].dispose === 'function') {
        material[prop].dispose();
      }
    });
  }
}

// Global Export for YUGMA
window.YugmaTraditionViewer = YugmaTraditionViewer;