/**
 * YUGMA - Dynamic State Menu HUD Component
 * Renders the Kage-styled glassmorphic action cards:
 * [ HERITAGE : AR/VR ], [ TRADITION : 3D ], [ INFO : DIGITAL BOOK ]
 */

class YugmaStateMenu {
  constructor(menuContainerEl, callbacks = {}) {
    this.container = menuContainerEl;
    this.onOpenARVR = callbacks.onOpenARVR || (() => {});
    this.onOpenTradition = callbacks.onOpenTradition || (() => {});
    this.onOpenInfo = callbacks.onOpenInfo || (() => {});
    this.onBackToGlobe = callbacks.onBackToGlobe || (() => {});

    this.currentState = null;
    this.isVisible = false;

    this.initDOM();
  }

  initDOM() {
    this.container.innerHTML = `
      <div class="state-menu-backdrop"></div>
      <div class="state-menu-panel">
        <header class="state-menu-header">
          <div class="header-prelude">
            <span class="dot-indicator"></span>
            <span class="eyebrow" id="sm-state-number">SELECTED REGION // 01</span>
          </div>
          <h2 class="state-menu-title" id="sm-state-name">MAHARASHTRA <span class="state-hindi" id="sm-state-hindi">महाराष्ट्र</span></h2>
          <p class="state-menu-tagline" id="sm-state-tagline">Sanctuary of Ancient Buddhist Frescoes & Rock-Cut Viharas</p>
        </header>

        <div class="state-cards-grid">
          <!-- CARD 1: HERITAGE -> AR/VR -->
          <div class="kage-card card-heritage" id="btn-heritage-card" data-cursor>
            <div class="card-glass-glow"></div>
            <div class="card-eyebrow">
              <span class="card-tag">[ 01 · HERITAGE ]</span>
              <span class="card-badge">AR / VR</span>
            </div>
            <h3 class="card-main-title" id="sm-heritage-title">AJANTA CAVES</h3>
            <p class="card-action-label">IMMERSIVE 360° AR/VR SANCTUARY</p>
            <div class="card-footer-action">
              <span>EXPLORE MONUMENT</span>
              <span class="arrow-icon">→</span>
            </div>
          </div>

          <!-- CARD 2: TRADITION -> PERFORMANCE SHOWCASE -->
          <div class="kage-card card-tradition" id="btn-tradition-card" data-cursor>
            <div class="card-glass-glow"></div>
            <div class="card-eyebrow">
              <span class="card-tag">[ 02 · TRADITION ]</span>
              <span class="card-badge" id="sm-tradition-badge">PERFORMANCE SHOWCASE</span>
            </div>
            <h3 class="card-main-title" id="sm-tradition-title">LAVANI</h3>
            <p class="card-action-label">LIVING PERFORMANCE &amp; CULTURAL ARCHIVE</p>
            <div class="card-video-showcase" id="sm-tradition-video-wrap" style="display: none; margin: 8px 0 10px 0;">
              <div class="video-showcase-player-box">
                <iframe id="sm-tradition-iframe" src="" title="Tradition Performance Showcase" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen loading="lazy"></iframe>
              </div>
            </div>
            <div class="card-footer-action">
              <span>EXPLORE TRADITION</span>
              <span class="arrow-icon">→</span>
            </div>
          </div>

          <!-- CARD 3: INFO -> DIGITAL BOOK -->
          <div class="kage-card card-info" id="btn-info-card" data-cursor>
            <div class="card-glass-glow"></div>
            <div class="card-eyebrow">
              <span class="card-tag">[ 03 · INFO ]</span>
              <span class="card-badge">MANUSCRIPT</span>
            </div>
            <h3 class="card-main-title" id="sm-info-title">AJANTA CAVES</h3>
            <p class="card-action-label">8-PAGE DIGITAL HERITAGE BOOK</p>
            <div class="card-footer-action">
              <span>OPEN DIGITAL BOOK</span>
              <span class="arrow-icon">→</span>
            </div>
          </div>
        </div>

        <footer class="state-menu-footer">
          <button class="kage-btn btn-back-globe" id="btn-back-globe" data-cursor>
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
            <span>RETURN TO INDIA GLOBE</span>
          </button>
        </footer>
      </div>
    `;

    // Bind Button Click Events
    document.getElementById('btn-heritage-card').addEventListener('click', () => {
      if (this.currentState) {
        if (window.yugmaAudio) window.yugmaAudio.playBell(1.0);
        this.onOpenARVR(this.currentState);
      }
    });

    document.getElementById('btn-tradition-card').addEventListener('click', () => {
      if (this.currentState) {
        if (window.yugmaAudio) window.yugmaAudio.playGhungroo();
        this.onOpenTradition(this.currentState);
      }
    });

    // Prevent video clicks from triggering card navigation
    const smTradVideoWrap = document.getElementById('sm-tradition-video-wrap');
    if (smTradVideoWrap) {
      smTradVideoWrap.addEventListener('click', e => e.stopPropagation());
      smTradVideoWrap.addEventListener('pointerdown', e => e.stopPropagation());
    }

    document.getElementById('btn-info-card').addEventListener('click', () => {
      if (this.currentState) {
        if (window.yugmaAudio) window.yugmaAudio.playPageTurn();
        this.onOpenInfo(this.currentState);
      }
    });

    document.getElementById('btn-back-globe').addEventListener('click', () => {
      if (window.yugmaAudio) window.yugmaAudio.playClick();
      this.hide();
      this.onBackToGlobe();
    });
  }

  /**
   * Display State Menu populated dynamically with the selected state's data
   */
  show(stateData) {
    this.currentState = stateData;
    const fullData = window.YUGMA_STATES_DATA[stateData.stateId] || {};

    // 1. Update State Headers
    document.getElementById('sm-state-name').innerHTML = `
      ${fullData.name || stateData.stateName} 
      <span class="state-hindi">${fullData.nameHindi || stateData.hindiName || ''}</span>
    `;
    document.getElementById('sm-state-tagline').textContent = fullData.tagline || 'Explore Cultural Marvels & Living Traditions';
    
    // 2. Dynamically Populate the 3 Action Cards
    document.getElementById('sm-heritage-title').textContent = fullData.heritage || stateData.heritage;
    document.getElementById('sm-tradition-title').textContent = fullData.tradition || stateData.tradition;
    document.getElementById('sm-info-title').textContent = fullData.heritage || stateData.heritage;

    // 3. Populate Video Showcase for States with provided videos
    const videoMap = {
      state_01: "Kh4MU4EonkI", maharashtra: "Kh4MU4EonkI",
      state_02: "gZjNpNuaPLw", gujarat: "gZjNpNuaPLw",
      state_03: "22p2YfSt3ZU", rajasthan: "22p2YfSt3ZU",
      state_04: "hpKtU21PVu0", uttar_pradesh: "hpKtU21PVu0",
      state_05: "QqJU_YpGeNs", west_bengal: "QqJU_YpGeNs",
      state_06: "2-9Lt01xY-k", tamil_nadu: "2-9Lt01xY-k",
      state_07: "qUYWZXHL8JU", karnataka: "qUYWZXHL8JU",
      state_08: "lnNieCUG4G4", kerala: "lnNieCUG4G4",
      state_09: "Uqmc0891L2U", odisha: "Uqmc0891L2U",
      state_10: "4buWapbwT0E", assam: "4buWapbwT0E",
      state_11: "ko5sKNuSLbs", andhra_pradesh: "ko5sKNuSLbs",
      state_12: "FhvLY9ZnbzI", bihar: "FhvLY9ZnbzI",
      state_13: "EokuS_QbkEM", goa: "EokuS_QbkEM",
      state_14: "Qe6_Vy2hleg", chhattisgarh: "Qe6_Vy2hleg"
    };
    const rawId = (stateData.stateId || stateData.id || stateData.stateName || stateData.name || '').toLowerCase().trim();
    const sId = rawId.replace(/[\s-]+/g, '_');
    const vidId = fullData.youtubeId || videoMap[sId] || (videoMap[stateData.stateId] || videoMap[stateData.id]);
    const vWrap = document.getElementById('sm-tradition-video-wrap');
    const vFrame = document.getElementById('sm-tradition-iframe');
    const vBadge = document.getElementById('sm-tradition-badge');
    if (vidId && vWrap && vFrame) {
      vWrap.style.display = 'block';
      const embedSrc = `https://www.youtube-nocookie.com/embed/${vidId}?rel=0&modestbranding=1`;
      if (vFrame.src !== embedSrc) vFrame.src = embedSrc;
      vFrame.referrerPolicy = 'strict-origin-when-cross-origin';
      if (vBadge) vBadge.textContent = 'PERFORMANCE SHOWCASE';
    } else {
      if (vWrap) vWrap.style.display = 'none';
      if (vFrame) vFrame.src = '';
      if (vBadge) vBadge.textContent = 'CULTURAL ARCHIVE';
    }

    // 4. Make visible with Kage animation
    this.container.classList.add('active');
    this.isVisible = true;
  }

  hide() {
    this.container.classList.remove('active');
    this.isVisible = false;
    this.currentState = null;
    const vFrame = document.getElementById('sm-tradition-iframe');
    if (vFrame) vFrame.src = '';
  }
}

window.YugmaStateMenu = YugmaStateMenu;
