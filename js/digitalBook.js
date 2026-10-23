/**
 * ============================================================
 * YUGMA — DIGITAL HERITAGE MANUSCRIPT & BOOKLET ENGINE
 * ============================================================
 *
 * Exhaustive 16-Page Digital Museum Catalogue Monograph:
 *  • Page 01: State Identity & Sacred Geography
 *  • Page 02: Through the Ages (Chronological Historical Timeline)
 *  • Page 03: Sacred Heritage (Major Monument Dossiers)
 *  • Page 04: Architectural Identity & Stone Engineering
 *  • Page 05: Living Traditions & Community Rituals
 *  • Page 06: Festivals of Season, Spirit & Commerce
 *  • Page 07: Arts & Performance (Classical, Folk, Drums)
 *  • Page 08: Crafts & Textiles (Master Weavers & Artisans)
 *  • Page 09: Culinary Heritage (Savory, Spiced, Sacred Flavors)
 *  • Page 10: People & Communities (Indigenous Roots & Social Mosaic)
 *  • Page 11: Language & Literature (Classical Script & Drama)
 *  • Page 12: Natural Heritage (Basalt, Rivers & Meteor Lakes)
 *  • Page 13: Cultural Symbols (Ten-Point Embodied Grid)
 *  • Page 14: Did You Know? (Ten Verified Historical Facts)
 *  • Page 15: YUGMA Immersive Heritage (AR/VR, 3D & Digital Story)
 *  • Page 16: Preserving the Future (Editorial Conservation Manifesto)
 *
 * Features:
 *  • Sanskrit manuscript framing with red-gold ruled guidelines (ref design)
 *  • Marginal folio notation (पत्र ०१, म-६६) & Vedic invocation accents
 *  • 3D directional page-turn animations (pageTurnNext3D & pageTurnPrev3D)
 *  • Text-to-Speech (TTS) narration engine
 *  • 16-chapter slide-out Table of Contents drawer
 *  • Full keyboard navigation (Arrows / PageUp / PageDown / Escape)
 *
 * ============================================================
 */

class YugmaDigitalBook {
  constructor(modalContainerEl) {
    this.modal = modalContainerEl;
    this.bookData = null;
    this.currentPage = 0;
    this.totalPages = 17;
    this.turnDirection = 'next';
    this.isTTSPlaying = false;
    this.speechSynth = 'speechSynthesis' in window ? window.speechSynthesis : null;
    this.currentTheme = 'manuscript';
    this.initDOM();
  }

  /* ==========================================================
     CREATE BOOK DOM CONTAINER
     ========================================================== */
  initDOM() {
    if (!this.modal) return;

    this.modal.innerHTML = `
      <!-- BACKDROP -->
      <div class="book-modal-backdrop"></div>

      <!-- BOOK WINDOW -->
      <div class="book-modal-window">
        <!-- HEADER -->
        <header class="book-modal-header">
          <div class="book-header-left">
            <span class="book-badge">YUGMA // DIGITAL HERITAGE MANUSCRIPT</span>
            <h2 id="book-header-title">HERITAGE ARCHIVE</h2>
          </div>

          <div class="book-header-controls">
            <!-- MANUSCRIPT / DARK VIEW THEME SWITCHER -->
            <button class="kage-btn" id="btn-book-theme" title="Toggle Manuscript / Dark View" type="button">
              <span id="book-theme-icon">📜</span>
              <span id="book-theme-label">MANUSCRIPT</span>
            </button>

            <!-- READ ALOUD -->
            <button class="kage-btn" id="btn-book-tts" title="Read Aloud Narration" type="button">
              <svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor">
                <polygon points="5 3 19 12 5 21 5 3"/>
              </svg>
              <span id="book-tts-label">READ ALOUD</span>
            </button>

            <!-- TABLE OF CONTENTS -->
            <button class="kage-btn" id="btn-book-toc" title="Table of Contents" type="button">
              <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="1.5">
                <line x1="8" y1="6" x2="21" y2="6"/>
                <line x1="8" y1="12" x2="21" y2="12"/>
                <line x1="8" y1="18" x2="21" y2="18"/>
                <line x1="3" y1="6" x2="3.01" y2="6"/>
                <line x1="3" y1="12" x2="3.01" y2="12"/>
                <line x1="3" y1="18" x2="3.01" y2="18"/>
              </svg>
              <span>17 FOLIOS</span>
            </button>

            <!-- CLOSE SYMBOL -->
            <button class="book-close-btn btn-close-book-trigger" id="btn-close-book" title="Close Booklet (Esc)" type="button" aria-label="Close Booklet">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>
        </header>

        <!-- BOOK STAGE -->
        <div class="book-stage">
          <!-- PREVIOUS ARROW -->
          <button class="book-nav-arrow arrow-prev" id="btn-page-prev" title="Previous Page (Left Arrow)" type="button">
            <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="1.5">
              <polyline points="15 18 9 12 15 6"/>
            </svg>
          </button>

          <!-- BOOK BINDER & FOLIO -->
          <div class="book-binder" id="book-binder">
            <!-- Binder Corner Close Symbol -->
            <button class="book-binder-close btn-close-book-trigger" title="Close Booklet (Esc)" type="button" aria-label="Close Booklet">
              <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
            <div class="book-page page-turn-next" id="book-page-content">
              <!-- Rendered page content inserted here -->
            </div>
          </div>

          <!-- NEXT ARROW -->
          <button class="book-nav-arrow arrow-next" id="btn-page-next" title="Next Page (Right Arrow)" type="button">
            <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="1.5">
              <polyline points="9 18 15 12 9 6"/>
            </svg>
          </button>
        </div>

        <!-- FOOTER PROGRESS SCRUBBER -->
        <footer class="book-footer">
          <div class="book-progress-bar">
            <div class="book-progress-fill" id="book-progress-fill"></div>
          </div>
          <div class="book-page-indicator">
            <span>
              FOLIO <b id="book-current-folio">1</b> OF <b id="book-total-folios">17</b>
            </span>
            <span class="book-era-tag" id="book-era-tag">Cultural Heritage Monograph</span>
          </div>
        </footer>

        <!-- TABLE OF CONTENTS SLIDE DRAWER -->
        <div class="book-toc-drawer" id="book-toc-drawer">
          <div class="toc-header">
            <h3>17 ARCHIVAL FOLIOS</h3>
            <button class="btn-close-toc" id="btn-close-toc" type="button" aria-label="Close Table of Contents">✕</button>
          </div>
          <ul class="toc-list" id="toc-items-list">
            <!-- Chapters generated dynamically -->
          </ul>
        </div>
      </div>
    `;

    this.bindDOMEvents();
  }

  /* ==========================================================
     EVENT HANDLERS
     ========================================================== */
  bindDOMEvents() {
    const closeBtns = this.modal.querySelectorAll('#btn-close-book, .btn-close-book-trigger');
    const prevBtn = document.getElementById('btn-page-prev');
    const nextBtn = document.getElementById('btn-page-next');
    const ttsBtn = document.getElementById('btn-book-tts');
    const tocBtn = document.getElementById('btn-book-toc');
    const themeBtn = document.getElementById('btn-book-theme');
    const tocDrawer = document.getElementById('book-toc-drawer');
    const closeTocBtn = document.getElementById('btn-close-toc');

    closeBtns.forEach(btn => btn.addEventListener('click', () => this.close()));
    if (prevBtn) prevBtn.addEventListener('click', () => this.prevPage());
    if (nextBtn) nextBtn.addEventListener('click', () => this.nextPage());
    if (ttsBtn) ttsBtn.addEventListener('click', () => this.toggleTTS());
    if (themeBtn) themeBtn.addEventListener('click', () => this.toggleTheme());

    if (tocBtn && tocDrawer) {
      tocBtn.addEventListener('click', () => tocDrawer.classList.toggle('active'));
    }
    if (closeTocBtn && tocDrawer) {
      closeTocBtn.addEventListener('click', () => tocDrawer.classList.remove('active'));
    }

    const backdrop = this.modal.querySelector('.book-modal-backdrop');
    if (backdrop) backdrop.addEventListener('click', () => this.close());

    // Keyboard navigation
    window.addEventListener('keydown', e => {
      if (!this.modal || !this.modal.classList.contains('active')) return;
      if (e.key === 'ArrowRight' || e.key === 'PageDown') {
        e.preventDefault();
        this.nextPage();
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        e.preventDefault();
        this.prevPage();
      } else if (e.key === 'Escape') {
        e.preventDefault();
        this.close();
      }
    });
  }

  /* ==========================================================
     OPEN BOOK
     ========================================================== */
  async open(stateData) {
    if (!stateData) return;
    this.modal.classList.add('active');
    this.currentPage = 0;
    this.turnDirection = 'next';
    this.stopTTS();

    const stateId = typeof stateData === 'string' ? stateData : (stateData.stateId || stateData.id || 'maharashtra');
    const normKey = String(stateId).toLowerCase().replace(/[\s-]+/g, '_');

    const registryData = (window.YUGMA_STATES && window.YUGMA_STATES[normKey]) ||
      (window.YUGMA_STATES_DATA && window.YUGMA_STATES_DATA[normKey]) ||
      (typeof stateData === 'object' ? stateData : {});

    const culture = (window.YUGMA_CULTURE_DATA && window.YUGMA_CULTURE_DATA[normKey]) ||
      (window.YUGMA_CULTURE_DATA && window.YUGMA_CULTURE_DATA.maharashtra);

    this.bookData = this.buildBookDataFromCulture(culture, registryData, normKey);
    this.totalPages = this.bookData.pages.length;

    // Apply default authentic manuscript theme
    const binder = document.getElementById('book-binder');
    if (binder) {
      binder.classList.add('theme-manuscript');
      binder.classList.remove('theme-dark');
    }
    this.currentTheme = 'manuscript';
    const themeLabel = document.getElementById('book-theme-label');
    const themeIcon = document.getElementById('book-theme-icon');
    if (themeLabel) themeLabel.textContent = 'MANUSCRIPT';
    if (themeIcon) themeIcon.textContent = '📜';

    const headerTitle = document.getElementById('book-header-title');
    if (headerTitle) {
      headerTitle.textContent = `${this.bookData.stateName.toUpperCase()} // HERITAGE MONOGRAPH`;
    }

    const totalFoliosEl = document.getElementById('book-total-folios');
    if (totalFoliosEl) totalFoliosEl.textContent = this.totalPages;

    this.renderTOC();
    this.renderPage(0);

    if (window.yugmaAudio && typeof window.yugmaAudio.playPageTurn === 'function') {
      window.yugmaAudio.playPageTurn();
    }
  }

  close() {
    if (!this.modal) return;
    this.modal.classList.remove('active');
    this.stopTTS();
    const tocDrawer = document.getElementById('book-toc-drawer');
    if (tocDrawer) tocDrawer.classList.remove('active');
    this.bookData = null;
  }

  toggleTheme() {
    const binder = document.getElementById('book-binder');
    const label = document.getElementById('book-theme-label');
    const icon = document.getElementById('book-theme-icon');
    this.currentTheme = (this.currentTheme === 'manuscript') ? 'dark' : 'manuscript';

    if (binder) {
      binder.classList.toggle('theme-dark', this.currentTheme === 'dark');
      binder.classList.toggle('theme-manuscript', this.currentTheme === 'manuscript');
    }
    if (label) {
      label.textContent = (this.currentTheme === 'manuscript') ? 'MANUSCRIPT' : 'DARK VIEW';
    }
    if (icon) {
      icon.textContent = (this.currentTheme === 'manuscript') ? '📜' : '🌙';
    }
  }

  /* ==========================================================
     BUILD 16-PAGE MONOGRAPH DATA
     ========================================================== */
  buildBookDataFromCulture(culture, registryData = {}, stateKey = 'maharashtra') {
    const sName = culture?.name || registryData.name || this.formatStateName(stateKey) || 'Maharashtra';
    const sEra = culture?.heritagePeriod || registryData.heritagePeriod || 'Cultural Heritage';

    // If authoritative sixteenPages object is present
    if (culture && culture.sixteenPages) {
      const sp = culture.sixteenPages;
      const pages = [
        { pageType: 'identity', title: sp.page01_identity.title, data: sp.page01_identity, sanskrit: sp.page01_identity.sanskrit, folioStamp: sp.page01_identity.folioStamp },
        { pageType: 'timeline', title: sp.page02_timeline.title, data: sp.page02_timeline, sanskrit: "॥ कालो हि बलवान् प्रभुः ॥", folioStamp: sp.page02_timeline.folioStamp },
        { pageType: 'heritage', title: sp.page03_heritage.title, data: sp.page03_heritage, sanskrit: "॥ शैलशिखरेषु कीर्तिस्तम्भाः ॥", folioStamp: sp.page03_heritage.folioStamp },
        { pageType: 'architecture', title: sp.page04_architecture.title, data: sp.page04_architecture, sanskrit: "॥ वास्तुशास्त्रं परं शिल्पम् ॥", folioStamp: sp.page04_architecture.folioStamp },
        { pageType: 'traditions', title: sp.page05_traditions.title, data: sp.page05_traditions, sanskrit: "॥ परम्परा धर्मस्य मूलम् ॥", folioStamp: sp.page05_traditions.folioStamp },
        { pageType: 'festivals', title: sp.page06_festivals.title, data: sp.page06_festivals, sanskrit: "॥ उत्सवप्रियाः खलु मानवाः ॥", folioStamp: sp.page06_festivals.folioStamp },
        { pageType: 'arts', title: sp.page07_arts.title, data: sp.page07_arts, sanskrit: "॥ नादब्रह्म रसानुभूतिः ॥", folioStamp: sp.page07_arts.folioStamp },
        { pageType: 'crafts', title: sp.page08_crafts.title, data: sp.page08_crafts, sanskrit: "॥ हस्तशिल्पं लोकोपकारकम् ॥", folioStamp: sp.page08_crafts.folioStamp },
        { pageType: 'cuisine', title: sp.page09_cuisine.title, data: sp.page09_cuisine, sanskrit: "॥ अन्नं वै प्राणाः ॥", folioStamp: sp.page09_cuisine.folioStamp },
        { pageType: 'people', title: sp.page10_people.title, data: sp.page10_people, sanskrit: "॥ वसुधैव कुटुम्बकम् ॥", folioStamp: sp.page10_people.folioStamp },
        { pageType: 'literature', title: sp.page11_literature.title, data: sp.page11_literature, sanskrit: "॥ वाग् वै ब्रह्म ॥", folioStamp: sp.page11_literature.folioStamp },
        { pageType: 'nature', title: sp.page12_nature.title, data: sp.page12_nature, sanskrit: "॥ माता भूमिः पुत्रोऽहं पृथिव्याः ॥", folioStamp: sp.page12_nature.folioStamp },
        { pageType: 'symbols', title: sp.page13_symbols.title, data: sp.page13_symbols, sanskrit: "॥ प्रतीकेषु तिष्ठति संस्कृतिः ॥", folioStamp: sp.page13_symbols.folioStamp },
        { pageType: 'facts', title: sp.page14_facts.title, data: sp.page14_facts, sanskrit: "॥ सत्यमेव जयते नानृतम् ॥", folioStamp: sp.page14_facts.folioStamp },
        { pageType: 'yugma', title: sp.page15_yugma.title, data: sp.page15_yugma, sanskrit: "॥ दृष्टिर्यत्र दृश्यं तत्र ॥", folioStamp: sp.page15_yugma.folioStamp },
        { pageType: 'preservation', title: sp.page16_preservation.title, data: sp.page16_preservation, sanskrit: "॥ अतीतात् भविष्यस्य निर्माणम् ॥", folioStamp: sp.page16_preservation.folioStamp },
        { pageType: 'tradition_showcase', title: 'TRADITION SHOWCASE', data: this.buildTraditionShowcaseData(stateKey, sName, culture, registryData), sanskrit: "॥ परम्परायाः प्रत्यक्षदर्शनम् ॥", folioStamp: '१७' }
      ];

      return {
        stateId: stateKey,
        stateName: sName,
        era: sEra,
        pages
      };
    }

    // Fallback generator for other states using synthesized 17-page structure
    return this.generateFallbackBookData(stateKey, registryData, culture);
  }

  generateFallbackBookData(stateId, registryData = {}, culture = {}) {
    const name = culture?.name || registryData.name || this.formatStateName(stateId) || 'India';
    const heritage = culture?.heritage || registryData.heritage || `${name} Heritage Site`;
    const tradition = culture?.tradition || registryData.tradition || 'Living Cultural Tradition';
    const era = culture?.heritagePeriod || registryData.heritagePeriod || 'Historical Heritage';

    const pages = [
      {
        pageType: 'identity',
        title: 'STATE IDENTITY',
        sanskrit: '॥ ॐ भूर्भुवः स्वः ॥',
        folioStamp: '१',
        data: {
          sub: `${name.toUpperCase()} // REGION OF BHARAT`,
          stateName: name,
          capital: culture?.capital || 'Regional Center',
          region: culture?.region || 'India',
          geography: culture?.geography || `Diverse landscape of ${name} supporting living culture and heritage.`,
          historicalIdentity: culture?.history || `Ancient kingdoms and continuous cultural traditions of ${name}.`,
          culturalSignificance: `${name} preserves unique temple architectures, folk forms, and historical literature.`,
          introduction: culture?.summary || `${name} possesses an extraordinary cultural heritage forged through centuries of artistry, architecture, and living community practices.`,
          metrics: [
            { label: 'Primary Heritage', val: heritage },
            { label: 'Tradition', val: tradition },
            { label: 'Region', val: culture?.region || 'India' },
            { label: 'Era', val: era }
          ]
        }
      },
      {
        pageType: 'timeline',
        title: 'THROUGH THE AGES',
        sanskrit: '॥ कालो हि बलवान् ॥',
        folioStamp: '२',
        data: {
          sub: 'HISTORICAL CHRONOLOGY',
          intro: `Historical milestones that defined the civilizational arc of ${name}.`,
          milestones: [
            { period: 'Ancient Period', era: 'Early Settlements', desc: `Foundational agrarian settlements, rock art, and early spiritual shrines in ${name}.` },
            { period: 'Medieval Classical Era', era: 'Royal Dynasties', desc: `Monumental stone architecture, classical languages, and temple patronage.` },
            { period: 'Pre-Modern Period', era: 'Regional Kingdoms', desc: `Fort building, maritime/inland commerce, and classical folk performance growth.` },
            { period: 'Modern Era', era: 'Statehood & Renaissance', desc: `Modern cultural institutions, democratic governance, and contemporary arts.` }
          ]
        }
      },
      {
        pageType: 'heritage',
        title: 'SACRED HERITAGE',
        sanskrit: '॥ शैलशिखरेषु कीर्तिः ॥',
        folioStamp: '३',
        data: {
          sub: 'MONUMENTAL ARCHAEOLOGY',
          intro: `Key architectural monuments and sacred sanctuaries of ${name}.`,
          sites: [
            {
              name: heritage,
              location: `${name}, India`,
              period: era,
              dynasty: 'Historical Patronage',
              architecture: culture?.architecture || `Distinctive regional stone masonry and classical Indian geometry.`,
              significance: `Cultural anchor for ${name}'s architectural legacy.`,
              verifiedFact: `Protected historical landmark preserved for future generations.`
            }
          ]
        }
      },
      {
        pageType: 'architecture',
        title: 'ARCHITECTURAL IDENTITY',
        sanskrit: '॥ वास्तुशास्त्रं परम् ॥',
        folioStamp: '४',
        data: {
          sub: 'REGIONAL TECHNIQUES & STYLES',
          intro: `Distinct architectural idioms and native construction techniques of ${name}.`,
          elements: [
            { title: 'Sacred Temple Architecture', sub: 'Stone & Stucco', desc: culture?.architecture || `Intricate stone carvings and regional shikhara towers.`, tech: 'Native quarry engineering' }
          ],
          materials: 'Native stone, seasoned timber, clay tiles, and lime mortar.',
          motifs: 'Lotus medallions, guardian figures, and regional floral reliefs.'
        }
      },
      {
        pageType: 'traditions',
        title: 'LIVING TRADITIONS',
        sanskrit: '॥ परम्परा धर्मस्य मूलम् ॥',
        folioStamp: '५',
        data: {
          sub: 'RITUALS & CUSTOMS',
          intro: `Living heritage practices, community rituals, and folklore transmitted across centuries in ${name}.`,
          traditions: [
            { name: tradition, type: 'Performing Tradition', desc: `${tradition} embodies the communal spirit, music, and dramatic expressions of ${name}.`, role: 'Communal celebration and heritage preservation.' }
          ]
        }
      },
      {
        pageType: 'festivals',
        title: 'FESTIVALS',
        sanskrit: '॥ उत्सवप्रियाः मानवाः ॥',
        folioStamp: '६',
        data: {
          sub: 'COMMUNAL CELEBRATIONS',
          intro: `Major annual festivals and sacred celebrations across ${name}.`,
          festivals: [
            { name: culture?.festivals || 'Regional Festivals', timing: 'Annual Cycle', rituals: 'Communal gatherings, temple prayers, folk dance, and celebratory feasts.', meaning: 'Celebrates harvest seasons, spiritual heritage, and communal solidarity.' }
          ]
        }
      },
      {
        pageType: 'arts',
        title: 'ARTS & PERFORMANCE',
        sanskrit: '॥ नादब्रह्म रसानुभूतिः ॥',
        folioStamp: '७',
        data: {
          sub: 'MUSIC, DANCE & DRAMA',
          intro: `The vibrant performing arts landscape of ${name}.`,
          forms: [
            { name: tradition, genre: 'Living Performance Art', desc: culture?.tradition || `${tradition} is a cornerstone of ${name}'s artistic identity.`, role: 'Transmits cultural memory and rhythm.' }
          ],
          instruments: [
            { name: 'Traditional Percussion', type: 'Handcrafted barrel drums providing driving rhythmic cadence.' },
            { name: 'Folk Melodic Instruments', type: 'Flutes and single-string resonators accompanying oral verse.' }
          ]
        }
      },
      {
        pageType: 'crafts',
        title: 'CRAFTS & TEXTILES',
        sanskrit: '॥ हस्तशिल्पं लोकोपकारकम् ॥',
        folioStamp: '८',
        data: {
          sub: 'INDIGENOUS ARTISANS',
          intro: `Master weavers, metal artisans, and traditional painters of ${name}.`,
          crafts: [
            { name: culture?.arts || 'Regional Handicrafts', hub: name, material: 'Native organic materials & silk/cotton threads', desc: 'Handcrafted artifacts embodying regional motifs and time-honored artisanal dexterity.', status: 'Celebrated cultural craft.' }
          ]
        }
      },
      {
        pageType: 'cuisine',
        title: 'CULINARY HERITAGE',
        sanskrit: '॥ अन्नं वै प्राणाः ॥',
        folioStamp: '९',
        data: {
          sub: 'FLAVORS & FOODWAYS',
          intro: `Traditional culinary heritage, indigenous grains, and festive foods of ${name}.`,
          dishes: [
            { name: culture?.cuisine || 'Regional Specialties', flavor: 'Aromatic & Balanced', ingredients: 'Native grains, seasonal produce, and hand-ground spices.', desc: 'Traditional culinary repertoire reflecting agro-climatic zones and local food wisdom.', festivals: 'Celebratory and everyday comfort.' }
          ]
        }
      },
      {
        pageType: 'people',
        title: 'PEOPLE & COMMUNITIES',
        sanskrit: '॥ वसुधैव कुटुम्बकम् ॥',
        folioStamp: '१०',
        data: {
          sub: 'COMMUNITY TAPESTRY',
          intro: `Diverse regional communities contributing to ${name}'s vibrant cultural mosaic.`,
          communities: [
            { name: culture?.communities || 'Regional Communities', role: 'Custodians of Culture', desc: `Diverse agrarian, craft, and urban communities that sustain ${name}'s cultural traditions.`, contribution: 'Generational transmission of intangible cultural heritage.' }
          ]
        }
      },
      {
        pageType: 'literature',
        title: 'LANGUAGE & LITERATURE',
        sanskrit: '॥ वाग् वै ब्रह्म ॥',
        folioStamp: '११',
        data: {
          sub: 'VERBAL & WRITTEN LORE',
          intro: `Linguistic traditions, folk poetry, and literary heritage of ${name}.`,
          aspects: [
            { title: 'Regional Languages', desc: culture?.languages || `Spoken languages and regional dialects of ${name}.`, fact: 'Rich tradition of written literature and oral folklore.' }
          ]
        }
      },
      {
        pageType: 'nature',
        title: 'NATURAL HERITAGE',
        sanskrit: '॥ माता भूमिः ॥',
        folioStamp: '१२',
        data: {
          sub: 'ECOLOGY & LANDSCAPES',
          intro: `Geological formations, river systems, and wildlife sanctuaries of ${name}.`,
          realms: [
            { name: 'Regional Ecology', type: 'Natural Landscape', desc: culture?.nature || `Rivers, mountains, and forests of ${name} that shaped local cultural history.`, eco: 'Biodiverse ecological habitat.' }
          ]
        }
      },
      {
        pageType: 'symbols',
        title: 'CULTURAL SYMBOLS',
        sanskrit: '॥ प्रतीकेषु संस्कृतिः ॥',
        folioStamp: '१३',
        data: {
          sub: 'EMBODIED ICONS',
          intro: `Ten cultural symbols representing the living heritage of ${name}.`,
          symbols: [
            { icon: '🏛️', category: 'Heritage', title: heritage, detail: 'The monumental stone architectural beacon.' },
            { icon: '🎭', category: 'Tradition', title: tradition, detail: 'Living performing arts and folklore tradition.' },
            { icon: '🥁', category: 'Instrument', title: 'Folk Drum', detail: 'The heartbeat of regional song and dance.' },
            { icon: '🧵', category: 'Craft', title: 'Traditional Textiles', detail: 'Handcrafted weaves and regional motifs.' },
            { icon: '🍲', category: 'Cuisine', title: 'Festive Food', detail: 'Sacred offerings and seasonal comfort foods.' },
            { icon: '🌳', category: 'Flora', title: 'Native Trees', detail: 'Indigenous flora defining local landscapes.' },
            { icon: '🐅', category: 'Fauna', title: 'Regional Wildlife', detail: 'Sanctuary species protected in natural habitats.' },
            { icon: '📜', category: 'Language', title: 'Vernacular Script', detail: 'Written literature and oral folk epics.' },
            { icon: '🎉', category: 'Festival', title: 'Major Celebration', detail: 'Annual festival uniting communities in joy.' },
            { icon: '🏺', category: 'Artisan', title: 'Handmade Artifacts', detail: 'Clay, metal, or wood heritage crafts.' }
          ]
        }
      },
      {
        pageType: 'facts',
        title: 'DID YOU KNOW?',
        sanskrit: '॥ सत्यमेव जयते ॥',
        folioStamp: '१४',
        data: {
          sub: 'FASCINATING HISTORICAL REVELATIONS',
          intro: `Surprising and verified facts about ${name}.`,
          facts: Array.isArray(culture?.facts) && culture.facts.length > 0
            ? culture.facts.map((f, i) => ({ num: String(i + 1).padStart(2, '0'), text: f }))
            : [
              { num: '01', text: `${name} is home to sacred monuments preserved across centuries.` },
              { num: '02', text: `${tradition} represents an unbroken lineage of master-disciple transmission.` }
            ]
        }
      },
      {
        pageType: 'yugma',
        title: 'YUGMA IMMERSIVE HERITAGE',
        sanskrit: '॥ दृष्टिर्यत्र दृश्यम् ॥',
        folioStamp: '१५',
        data: {
          sub: 'AR/VR, 3D & DIGITAL ARCHIVES',
          intro: `How YUGMA digitally preserves the heritage of ${name}.`,
          trio: [
            { icon: '🥽', title: 'HERITAGE / AR-VR', sub: 'Spatial Exploration', desc: `Explore ${heritage} in full 360° photogrammetric virtual reality, inspecting architectural details in 1:1 scale.` },
            { icon: '🎭', title: 'TRADITION / 3D', sub: 'Volumetric Reconstruction', desc: `Interact with 3D models of ${tradition} costumes, instruments, and artisanal objects with dynamic lighting.` },
            { icon: '📜', title: 'INFO / DIGITAL STORY', sub: 'Interactive Storytelling', desc: `Engage with high-resolution historical manuscripts, oral narrations, and animated geographic timelines.` }
          ],
          actionBadge: 'SCAN QR → EXPLORE IN 3D → EXPERIENCE IN AR/VR'
        }
      },
      {
        pageType: 'preservation',
        title: 'PRESERVING THE FUTURE',
        sanskrit: '॥ अतीतात् भविष्यम् ॥',
        folioStamp: '१६',
        data: {
          sub: 'AN EDITORIAL MANIFESTO FOR IMMERSIVE CONSERVATION',
          manifesto: {
            title: 'Safeguarding Cultural Memory',
            p1: `Heritage is the living identity of a people. Across ${name}, fragile historical monuments face environmental weathering and intangible folk traditions risk being lost without sustained documentation.`,
            p2: `By leveraging LiDAR photogrammetry, volumetric motion capture, and semantic archives, YUGMA creates permanent digital twins of vulnerable cultural assets, ensuring they are accessible across time and geography.`,
            p3: `Through interactive 3D, WebXR, and digital manuscripts, we empower youth worldwide to discover, celebrate, and preserve Indian heritage not as distant history, but as an inspiring, living experience.`,
            signature: '“YUGMA — Where Heritage Becomes an Experience.”'
          }
        }
      },
      {
        pageType: 'tradition_showcase',
        title: 'TRADITION SHOWCASE',
        sanskrit: '॥ परम्परायाः प्रत्यक्षदर्शनम् ॥',
        folioStamp: '१७',
        data: this.buildTraditionShowcaseData(stateId, name, culture, registryData)
      }
    ];

    return {
      stateId,
      stateName: name,
      era,
      pages
    };
  }

  /* ==========================================================
     TRADITION SHOWCASE: STATE-SPECIFIC PHOTO ARCHIVES
     ========================================================== */
  getStateTraditionPhotos(stateKey = '') {
    const key = String(stateKey || '').toLowerCase().trim();

    const registry = {
      gujarat: [
        {
          id: 'gujarat_dance',
          title: 'Navratri Raas & Dandiya Garba',
          category: 'dance',
          state: 'Gujarat',
          src: 'images/traditions/gujarat_dance.jpg',
          desc: 'Devotional circle dancing in mirrored chaniya cholis and embroidered kedias celebrating Goddess Amba with synchronized rhythmic clapping.'
        },
        {
          id: 'gujarat_food',
          title: 'Authentic Gujarati Thali & Farsan',
          category: 'food',
          state: 'Gujarat',
          src: 'images/traditions/gujarat_food.jpg',
          desc: 'A vibrant sweet-savory feast with khandvi, soft dhokla, thepla, ringna no olo, kadhi, and crispy fafda-jalebi.'
        },
        {
          id: 'gujarat_lifestyle',
          title: 'Kutch Artisanal Life & Pastoral Nomads',
          category: 'lifestyle',
          state: 'Gujarat',
          src: 'images/traditions/gujarat_lifestyle.jpg',
          desc: 'Living desert culture of Rabari and Ahir pastoralists renowned for traditional mirror-embroidery, mud-relief bhungas, and nomadic grace.'
        },
        {
          id: 'gujarat_tradition',
          title: 'Rani ki Vav Stepwell Sanctum & Aarti',
          category: 'tradition',
          state: 'Gujarat',
          src: 'images/traditions/gujarat_tradition.jpg',
          desc: 'Ancient water veneration rituals within the subterranean marvel of Patan, honoring sacred waters and multi-tiered deity shrines.'
        },
        {
          id: 'gujarat_culture',
          title: 'Patan Patola & Ajrakh Heritage Weaving',
          category: 'culture',
          state: 'Gujarat',
          src: 'images/traditions/gujarat_culture.jpg',
          desc: 'Centuries-old double-ikat silk weaving and natural-dye woodblock printing representing unparalleled geometric perfection.'
        }
      ],

      statue_of_unity: [
        {
          id: 'sou_garba',
          title: 'Unity Festival & Folk Celebrations',
          category: 'dance',
          state: 'Gujarat (Narmada)',
          src: 'images/traditions/gujarat_dance.jpg',
          desc: 'Vibrant cultural dances and national unity performances staged along the sacred banks of the Narmada River.'
        },
        {
          id: 'sou_food',
          title: 'Narmada Regional Gujarati Cuisine',
          category: 'food',
          state: 'Gujarat (Narmada)',
          src: 'images/traditions/gujarat_food.jpg',
          desc: 'Wholesome local dishes including spicy Sev Khamani, Handvo, Rotlo with Ringan Bharta, and fresh seasonal jaggery sweets.'
        },
        {
          id: 'sou_lifestyle',
          title: 'Tribal Artisans & Valley Livelihoods',
          category: 'lifestyle',
          state: 'Gujarat (Narmada)',
          src: 'images/traditions/gujarat_lifestyle.jpg',
          desc: 'Indigenous communities of Kevadia practicing sustainable organic farming, forest crafts, and eco-tourism hospitality.'
        },
        {
          id: 'sou_tradition',
          title: 'Maha Narmada River Arati',
          category: 'tradition',
          state: 'Gujarat (Narmada)',
          src: 'images/traditions/gujarat_tradition.jpg',
          desc: 'Grand evening brass lamp arati ceremony honoring the holy waters of Maa Narmada with Vedic chants and synchronized bells.'
        },
        {
          id: 'sou_culture',
          title: 'Colossal Bronze & Modern Sculptural Heritage',
          category: 'culture',
          state: 'Gujarat (Narmada)',
          src: 'images/traditions/gujarat_culture.jpg',
          desc: '182-meter architectural colossus dedicated to Sardar Vallabhbhai Patel, embodying national unity and engineering prowess.'
        }
      ],

      maharashtra: [
        {
          id: 'maharashtra_dance',
          title: 'Lavani & Dholki Folk Rhythms',
          category: 'dance',
          state: 'Maharashtra',
          src: 'images/traditions/maharashtra_dance.jpg',
          desc: 'High-octane folk dance in traditional nine-yard Nauvari sarees, driven by the resonant beats of the dholki and ankle ghungroos.'
        },
        {
          id: 'maharashtra_food',
          title: 'Fiery Misal Pav, Pithla Bhakri & Spices',
          category: 'food',
          state: 'Maharashtra',
          src: 'images/traditions/maharashtra_food.jpg',
          desc: 'Aromatic Konkani and Kolhapuri culinary arts: fiery sprouted bean misal, steamed puran poli, jowar bhakri, and fresh coconut curries.'
        },
        {
          id: 'maharashtra_lifestyle',
          title: 'Warkari Dindi Pilgrimage & Harmony',
          category: 'lifestyle',
          state: 'Maharashtra',
          src: 'images/traditions/maharashtra_lifestyle.jpg',
          desc: 'Centuries-old egalitarian walk to Pandharpur singing Tukaram and Dnyaneshwar abhangas with taal cymbals and saffron patakas.'
        },
        {
          id: 'maharashtra_tradition',
          title: 'Ganesh Chaturthi & Dhol Tasha Pathaks',
          category: 'tradition',
          state: 'Maharashtra',
          src: 'images/traditions/maharashtra_tradition.jpg',
          desc: 'Grand public festival established by Lokmanya Tilak, filled with majestic clay idols, modak offerings, and rhythmic dhol-tasha.'
        },
        {
          id: 'maharashtra_culture',
          title: 'Gateway of India, Forts & Warli Art',
          category: 'culture',
          state: 'Maharashtra',
          src: 'images/traditions/maharashtra_culture.jpg',
          desc: 'Historic basalt sea-gate monuments, formidable Sahyadri hill citadels of Shivaji Maharaj, and sacred tribal Warli wall art.'
        }
      ],

      rajasthan: [
        {
          id: 'rajasthan_dance',
          title: 'Ghoomar & Kalbelia Desert Dance',
          category: 'dance',
          state: 'Rajasthan',
          src: 'images/traditions/rajasthan_dance.jpg',
          desc: 'Graceful pirouettes in heavy mirrored ghagras accompanied by dholak rhythms and the serpentine acrobatics of Kalbelia dancers.'
        },
        {
          id: 'rajasthan_food',
          title: 'Dal Baati Churma & Royal Rajasthani Feast',
          category: 'food',
          state: 'Rajasthan',
          src: 'images/traditions/rajasthan_food.jpg',
          desc: 'Crisp baked baatis drowned in pure desi ghee, paired with spicy Panchmel dal, sweet churma, ker sangri, and gatte ki sabzi.'
        },
        {
          id: 'rajasthan_lifestyle',
          title: 'Udaipur Lake Palaces & Rajput Courtly Life',
          category: 'lifestyle',
          state: 'Rajasthan',
          src: 'images/traditions/rajasthan_lifestyle.jpg',
          desc: 'Serene marble palaces floating on Lake Pichola reflecting centuries of royal chivalry, courtyard music, and artistic patronage.'
        },
        {
          id: 'rajasthan_tradition',
          title: 'Pushkar Fair & Royal Gangaur Pageantry',
          category: 'tradition',
          state: 'Rajasthan',
          src: 'images/traditions/rajasthan_tradition.jpg',
          desc: 'Sacred holy lake dips, grand colorful camel gatherings in the dunes, and vibrant street processions honoring Gauri and Shiva.'
        },
        {
          id: 'rajasthan_culture',
          title: 'Amber Fort Citadels & Blue Pottery',
          category: 'culture',
          state: 'Rajasthan',
          src: 'images/traditions/rajasthan_culture.jpg',
          desc: 'Imposing red sandstone and marble fortifications, intricate mirror-mosaic Sheesh Mahals, and turquoise Egyptian-paste pottery.'
        }
      ],

      kerala: [
        {
          id: 'kerala_dance',
          title: 'Kathakali Classical Drama & Mudras',
          category: 'dance',
          state: 'Kerala',
          src: 'images/traditions/kerala_dance.jpg',
          desc: 'Grand theatrical dance-drama marked by green paccha facial makeup, magnificent headgear, and profound silent abhinaya of epic tales.'
        },
        {
          id: 'kerala_food',
          title: 'Traditional Onam Sadya & Spices',
          category: 'food',
          state: 'Kerala',
          src: 'images/traditions/kerala_food.jpg',
          desc: 'Multi-course vegetarian feast served upon a fresh plantain leaf: red matta rice, avial, sambar, payasam, and Malabar spices.'
        },
        {
          id: 'kerala_lifestyle',
          title: 'Alleppey Backwaters & Houseboat Life',
          category: 'lifestyle',
          state: 'Kerala',
          src: 'images/traditions/kerala_lifestyle.jpg',
          desc: 'Tranquil life along palm-fringed lagoons and paddy fields, where kettuvallam boats drift alongside village coir-making settlements.'
        },
        {
          id: 'kerala_tradition',
          title: 'Theyyam Sacred Fire Rituals',
          category: 'tradition',
          state: 'Kerala',
          src: 'images/traditions/kerala_tradition.jpg',
          desc: 'Ancient ritual dance where shamans embody ancestral spirits and guardian deities through fiery headdresses and sacred trance worship.'
        },
        {
          id: 'kerala_culture',
          title: 'Kathakali Masks & Kasavu Weaving',
          category: 'culture',
          state: 'Kerala',
          src: 'images/traditions/kerala_culture.jpg',
          desc: 'Pristine off-white cotton handlooms with genuine golden zari borders, wood-carved kathakali masks, and temple mural paintings.'
        }
      ],

      tamil_nadu: [
        {
          id: 'tamil_nadu_dance',
          title: 'Bharatanatyam Classical Temple Dance',
          category: 'dance',
          state: 'Tamil Nadu',
          src: 'images/traditions/tamil_nadu_dance.jpg',
          desc: 'Ancient dance form codified in the Natyashastra, defined by sculptural aramandi postures, geometric lines, and poetic abhinaya.'
        },
        {
          id: 'tamil_nadu_food',
          title: 'Crispy Ghee Podi Dosa & Filter Coffee',
          category: 'food',
          state: 'Tamil Nadu',
          src: 'images/traditions/tamil_nadu_food.jpg',
          desc: 'Fermented golden rice-lentil crepes roast in pure ghee with gun-powder spices, steaming sambar, coconut chutney, and frothy brass coffee.'
        },
        {
          id: 'tamil_nadu_lifestyle',
          title: 'Kanchipuram Master Silk Handlooms',
          category: 'lifestyle',
          state: 'Tamil Nadu',
          src: 'images/traditions/tamil_nadu_lifestyle.jpg',
          desc: 'Generational master weavers operating heavy handlooms, interlocking pure mulberry silk and silver-dipped golden zari motifs.'
        },
        {
          id: 'tamil_nadu_tradition',
          title: 'Sacred Brass Deepam & Temple Aarti',
          category: 'tradition',
          state: 'Tamil Nadu',
          src: 'images/traditions/tamil_nadu_tradition.jpg',
          desc: 'Sacred oil lamps ignited during sandhya deeparadhana in ancient stone sanctums, accompanied by the auspicious notes of the nadaswaram.'
        },
        {
          id: 'tamil_nadu_culture',
          title: 'Dravidian Temple Gopurams & Bronzes',
          category: 'culture',
          state: 'Tamil Nadu',
          src: 'images/traditions/tamil_nadu_culture.jpg',
          desc: 'Towering gopuram gateways sculpted with thousands of celestial figures, lost-wax Chola bronzes, and Thanjavur gold foil art.'
        }
      ],

      uttar_pradesh: [
        {
          id: 'uttar_pradesh_dance',
          title: 'Kathak Ghungroo Mastery & Chakkars',
          category: 'dance',
          state: 'Uttar Pradesh',
          src: 'images/traditions/uttar_pradesh_dance.jpg',
          desc: 'Classical court and temple dance originating in the Gangetic plains, renowned for rapid rhythmic footwork, chakkars, and delicate bhaav.'
        },
        {
          id: 'uttar_pradesh_food',
          title: 'Awadhi Dum Biryani & Royal Nawabi Feasts',
          category: 'food',
          state: 'Uttar Pradesh',
          src: 'images/traditions/uttar_pradesh_food.jpg',
          desc: 'Slow-simmered basmati rice infused with delicate saffron, ittar perfumes, and hand-ground spices in dough-sealed copper handis.'
        },
        {
          id: 'uttar_pradesh_lifestyle',
          title: 'Varanasi Ancient Ghats & Morning Boats',
          category: 'lifestyle',
          state: 'Uttar Pradesh',
          src: 'images/traditions/uttar_pradesh_lifestyle.jpg',
          desc: 'Subah-e-Banaras along eighty-four historic stone ghats where pilgrims, ascetics, and rowers greet the sunrise across the sacred Ganga.'
        },
        {
          id: 'uttar_pradesh_tradition',
          title: 'Maha Ganga Aarti at Dashashwamedh',
          category: 'tradition',
          state: 'Uttar Pradesh',
          src: 'images/traditions/uttar_pradesh_tradition.jpg',
          desc: 'Spectacular twilight ritual with multi-tiered brass oil lamps, resonant conch horns, and rhythmic chanting honoring Mother Ganga.'
        },
        {
          id: 'uttar_pradesh_culture',
          title: 'Taj Mahal Monument & Braj Holi',
          category: 'culture',
          state: 'Uttar Pradesh',
          src: 'images/traditions/uttar_pradesh_culture.jpg',
          desc: 'White marble UNESCO mausoleum of eternal love, vibrant Braj spring gulal festivities, and delicate Lakhnavi Chikankari embroidery.'
        }
      ],

      west_bengal: [
        {
          id: 'west_bengal_dance',
          title: 'Dhunuchi Naach & Baul Folk Mysticism',
          category: 'dance',
          state: 'West Bengal',
          src: 'images/traditions/west_bengal_dance.jpg',
          desc: 'Spirited festive dance balancing smoking clay burners of fragrant coconut husk and frankincense to the pulsating thunder of dhak drums.'
        },
        {
          id: 'west_bengal_food',
          title: 'Rosogolla, Sandesh & Bengali Sweets',
          category: 'food',
          state: 'West Bengal',
          src: 'images/traditions/west_bengal_food.jpg',
          desc: 'Pure chenna spongy rosogollas soaked in cardamom syrup, mishti doi in clay pots, and delicate shondesh crafted with date palm jaggery.'
        },
        {
          id: 'west_bengal_lifestyle',
          title: 'Kolkata Heritage, Howrah Bridge & Tramways',
          category: 'lifestyle',
          state: 'West Bengal',
          src: 'images/traditions/west_bengal_lifestyle.jpg',
          desc: 'Historic cantilever bridge connecting the metropolis across the Hooghly, vintage electric streetcars, and intellectual College Street addas.'
        },
        {
          id: 'west_bengal_tradition',
          title: 'Durga Puja Sharodotsav & Sindoor Khela',
          category: 'tradition',
          state: 'West Bengal',
          src: 'images/traditions/west_bengal_tradition.jpg',
          desc: 'UNESCO-inscribed monumental autumn festival where millions visit artistic clay pandals and women exchange sacred vermilion.'
        },
        {
          id: 'west_bengal_culture',
          title: 'Victoria Memorial & Terracotta Temples',
          category: 'culture',
          state: 'West Bengal',
          src: 'images/traditions/west_bengal_culture.jpg',
          desc: 'Magnificent white Makrana marble monument, Bishnupur burnt-clay temple friezes, and fine hand-stitched Kantha embroidery.'
        }
      ],

      karnataka: [
        {
          id: 'karnataka_dance',
          title: 'Yakshagana Classical Folk Theatre',
          category: 'dance',
          state: 'Karnataka',
          src: 'images/traditions/karnataka_dance.jpg',
          desc: 'Lively coastal performance tradition with elaborate headgear, vibrant makeup, rhythmic leaps, and high-energy dialogue from epics.'
        },
        {
          id: 'karnataka_food',
          title: 'Melt-in-Mouth Mysore Pak & Udupi Cuisine',
          category: 'food',
          state: 'Karnataka',
          src: 'images/traditions/karnataka_food.jpg',
          desc: 'Royal golden dessert made of chickpea flour and fragrant desi ghee, alongside savory bisi bele bath and crisp benne dosas.'
        },
        {
          id: 'karnataka_lifestyle',
          title: 'Coorg Coffee Estates & Malnad Life',
          category: 'lifestyle',
          state: 'Karnataka',
          src: 'images/traditions/karnataka_lifestyle.jpg',
          desc: 'Verdant hill plantations shrouded in mist, silver oaks, black pepper vines, and the valiant martial traditions of the Kodava people.'
        },
        {
          id: 'karnataka_tradition',
          title: 'Mysore Dasara Jumboo Savari',
          category: 'tradition',
          state: 'Karnataka',
          src: 'images/traditions/karnataka_tradition.jpg',
          desc: 'Centuries-old royal festival where the golden howdah of Goddess Chamundeshwari is paraded atop majestically adorned elephants.'
        },
        {
          id: 'karnataka_culture',
          title: 'Mysore Palace & Hampi Monumental Art',
          category: 'culture',
          state: 'Karnataka',
          src: 'images/traditions/karnataka_culture.jpg',
          desc: 'Indo-Saracenic royal palace glowing with 100,000 electric lamps, monolithic stone chariots of Vijayanagara, and sandalwood carving.'
        }
      ],

      assam: [
        {
          id: 'assam_dance',
          title: 'Rongali Bihu Spring Folk Dance',
          category: 'dance',
          state: 'Assam',
          src: 'images/traditions/assam_dance.jpg',
          desc: 'Joyous spring harvest dance featuring brisk hip movements, rapid hand clapping, and soulful melodies played on the buffalo-horn pepa.'
        },
        {
          id: 'assam_food',
          title: 'Assam Garden Tea & Festive Pitha',
          category: 'food',
          state: 'Assam',
          src: 'images/traditions/assam_food.jpg',
          desc: 'World-renowned brisk malty CTC tea, sweet rice-flour til pitha, coconut narikol laru, and alkali-infused traditional khar dishes.'
        },
        {
          id: 'assam_lifestyle',
          title: 'Brahmaputra Tea Estates & River Culture',
          category: 'lifestyle',
          state: 'Assam',
          src: 'images/traditions/assam_lifestyle.jpg',
          desc: 'Serene emerald tea bushes spanning undulating valleys along the mighty Brahmaputra and peaceful monastic life on Majuli river island.'
        },
        {
          id: 'assam_tradition',
          title: 'Bohag Bihu & Sacred Naamghar Chants',
          category: 'tradition',
          state: 'Assam',
          src: 'images/traditions/assam_tradition.jpg',
          desc: 'Auspicious New Year cattle bathing rites, offering of embroidered gamosa scarves, and devotional congregational singing.'
        },
        {
          id: 'assam_culture',
          title: 'Golden Muga Silk & Bamboo Craft',
          category: 'culture',
          state: 'Assam',
          src: 'images/traditions/assam_culture.jpg',
          desc: 'Wild natural golden-hued silk exclusive to Assam, lightweight cane bamboo homeware, and brass Bell-metal utensils of Sarthebari.'
        }
      ],

      odisha: [
        {
          id: 'odisha_dance',
          title: 'Odissi Classical Dance & Tribhanga',
          category: 'dance',
          state: 'Odisha',
          src: 'images/traditions/odisha_dance.jpg',
          desc: 'Temple dance form celebrated for its poetic grace, three-bend tribhanga posture, silver filigree head ornaments, and Geeta Govinda themes.'
        },
        {
          id: 'odisha_food',
          title: 'Chhena Poda & Jagannath Mahaprasad',
          category: 'food',
          state: 'Odisha',
          src: 'images/traditions/odisha_food.jpg',
          desc: 'Traditional slow-baked caramelized cottage cheese cake in sal leaves, alongside pure temple rice and dalma stew.'
        },
        {
          id: 'odisha_lifestyle',
          title: 'Chilika Lake Lagoon & Coastal Fisherfolk',
          category: 'lifestyle',
          state: 'Odisha',
          src: 'images/traditions/odisha_lifestyle.jpg',
          desc: 'Asia\'s largest brackish lagoon bustling with wooden fishing catamarans, Irrawaddy dolphins, and migratory flamingo sanctuaries.'
        },
        {
          id: 'odisha_tradition',
          title: 'Puri Rath Yatra Chariot Procession',
          category: 'tradition',
          state: 'Odisha',
          src: 'images/traditions/odisha_tradition.jpg',
          desc: 'World-famous pilgrimage where millions of devotees pull the towering wooden chariots of Lord Jagannath, Balabhadra, and Subhadra.'
        },
        {
          id: 'odisha_culture',
          title: 'Konark Sun Temple & Pattachitra Art',
          category: 'culture',
          state: 'Odisha',
          src: 'images/traditions/odisha_culture.jpg',
          desc: '13th-century chariot temple with twenty-four intricately carved stone wheels, palm-leaf etchings, and silver Tarakasi filigree.'
        }
      ],

      bihar: [
        {
          id: 'bihar_dance',
          title: 'Jat-Jatin & Bidesia Folk Theatre',
          category: 'dance',
          state: 'Bihar',
          src: 'images/traditions/bihar_dance.jpg',
          desc: 'Rural folk performance celebrating seasonal monsoon joys, domestic tales, and migrant stories through witty dialogues and song.'
        },
        {
          id: 'bihar_food',
          title: 'Rustic Litti Chokha with Desi Ghee',
          category: 'food',
          state: 'Bihar',
          src: 'images/traditions/bihar_food.jpg',
          desc: 'Charcoal-baked whole wheat balls stuffed with spiced roasted sattu, dipped in hot ghee, served with smoky roasted eggplant and tomato mash.'
        },
        {
          id: 'bihar_lifestyle',
          title: 'Mithila Courtyard Living & Rural Peace',
          category: 'lifestyle',
          state: 'Bihar',
          src: 'images/traditions/bihar_lifestyle.jpg',
          desc: 'Tranquil mud-plastered village homes where generations congregate in inner courtyards to share folklore and traditional handicrafts.'
        },
        {
          id: 'bihar_tradition',
          title: 'Chhath Puja Holy Riverbank Arghya',
          category: 'tradition',
          state: 'Bihar',
          src: 'images/traditions/bihar_tradition.jpg',
          desc: 'The most sacred Vedic festival in Bihar, offering gratitude to the setting and rising Sun God while standing waist-deep in holy rivers.'
        },
        {
          id: 'bihar_culture',
          title: 'Madhubani Painting & Ancient Nalanda',
          category: 'culture',
          state: 'Bihar',
          src: 'images/traditions/bihar_culture.jpg',
          desc: 'Intricate natural-pigment line art painted with twigs and fingers, alongside the monastic ruins of ancient Nalanda University.'
        }
      ],

      andhra_pradesh: [
        {
          id: 'andhra_pradesh_dance',
          title: 'Kuchipudi Classical Dance Drama',
          category: 'dance',
          state: 'Andhra Pradesh',
          src: 'images/traditions/andhra_pradesh_dance.jpg',
          desc: 'Exuberant classical dance form combining dramatic spoken dialogue, fast footwork, and tarangam dancing on the rim of a brass plate.'
        },
        {
          id: 'andhra_pradesh_food',
          title: 'Royal Biryani & Spicy Gongura Thali',
          category: 'food',
          state: 'Andhra Pradesh',
          src: 'images/traditions/andhra_pradesh_food.jpg',
          desc: 'Fragrant dum-cooked saffron rice, tangy gongura sorrel leaf pickle, spicy podis, Pappu stew, and rich ghee-laden sweets.'
        },
        {
          id: 'andhra_pradesh_lifestyle',
          title: 'Godavari Delta Weavers & Riverways',
          category: 'lifestyle',
          state: 'Andhra Pradesh',
          src: 'images/traditions/andhra_pradesh_lifestyle.jpg',
          desc: 'Lush agricultural expanses between the Krishna and Godavari rivers, celebrated for handloom weaver villages and temple town routines.'
        },
        {
          id: 'andhra_pradesh_tradition',
          title: 'Tirupati Venkateswara Brahmotsavam',
          category: 'tradition',
          state: 'Andhra Pradesh',
          src: 'images/traditions/andhra_pradesh_tradition.jpg',
          desc: 'Sacred nine-day celestial celebration with golden vahanas, devotional chanting, and the illumination of thousands of temple lamps.'
        },
        {
          id: 'andhra_pradesh_culture',
          title: 'Kalamkari Hand-Painting & Kondapalli Toys',
          category: 'culture',
          state: 'Andhra Pradesh',
          src: 'images/traditions/andhra_pradesh_culture.jpg',
          desc: 'Hand-drawn cotton tapestries dyed with natural indigo and madder root, alongside lightweight wooden folk toys and temple chariots.'
        }
      ],

      uttarakhand: [
        {
          id: 'uttarakhand_dance',
          title: 'Chholiya Himalayan Folk Sword Dance',
          category: 'dance',
          state: 'Uttarakhand',
          src: 'images/traditions/uttarakhand_dance.jpg',
          desc: 'Centuries-old martial dance of the Kumaon region, featuring brass horns (turi), dhol-damau percussion, and choreographed sword combat.'
        },
        {
          id: 'uttarakhand_food',
          title: 'Garhwali Kafuli, Bhatt Ki Churkani & Bal Mithai',
          category: 'food',
          state: 'Uttarakhand',
          src: 'images/traditions/uttarakhand_food.jpg',
          desc: 'Nutritious mountain cuisine made with iron-rich spinach, local pahadi black soybeans, chainsoo, and roasted khoya coated in sugar balls.'
        },
        {
          id: 'uttarakhand_lifestyle',
          title: 'High Himalayan Terrace Farming & Villages',
          category: 'lifestyle',
          state: 'Uttarakhand',
          src: 'images/traditions/uttarakhand_lifestyle.jpg',
          desc: 'Step-terraced hillsides overlooking snow-capped peaks, where pastoral communities tend mountain orchards and sacred deodar groves.'
        },
        {
          id: 'uttarakhand_tradition',
          title: 'Haridwar & Rishikesh Holy Ganga Aarti',
          category: 'tradition',
          state: 'Uttarakhand',
          src: 'images/traditions/uttarakhand_tradition.jpg',
          desc: 'Vibrant ritual lamps floating down the sacred crystal waters of the Himalayan foothills amidst resounding conch calls and hymns.'
        },
        {
          id: 'uttarakhand_culture',
          title: 'Aipan Floor Art & Koti Banal Architecture',
          category: 'culture',
          state: 'Uttarakhand',
          src: 'images/traditions/uttarakhand_culture.jpg',
          desc: 'Sacred red-ochre and rice-paste geometrical motifs, earthquake-resistant cedar-stone timber architecture, and Pahadi folk woodcraft.'
        }
      ],

      tripura: [
        {
          id: 'tripura_dance',
          title: 'Hojagiri Reang Balance Dance',
          category: 'dance',
          state: 'Tripura',
          src: 'images/traditions/tripura_dance.jpg',
          desc: 'Mesmerizing tribal acrobatic dance where young women balance bottles on their heads and earthen lamps on their hands while moving upon brass pitchers.'
        },
        {
          id: 'tripura_food',
          title: 'Mui Borok & Traditional Bamboo Delicacies',
          category: 'food',
          state: 'Tripura',
          src: 'images/traditions/tripura_food.jpg',
          desc: 'Traditional dishes cooked with fermented fish (berma), tender bamboo shoots, fresh mountain herbs, and steamed fragrant sticky rice.'
        },
        {
          id: 'tripura_lifestyle',
          title: 'Jhum Hill Cultivation & Community Life',
          category: 'lifestyle',
          state: 'Tripura',
          src: 'images/traditions/tripura_lifestyle.jpg',
          desc: 'Harmonious hill living across nineteen indigenous communities, living in elevated bamboo huts amidst lush tropical hills.'
        },
        {
          id: 'tripura_tradition',
          title: 'Kharchi Puja 14 Deities Celebration',
          category: 'tradition',
          state: 'Tripura',
          src: 'images/traditions/tripura_tradition.jpg',
          desc: 'Royal ancestral festival cleansing Mother Earth, uniting indigenous tribes and Bengali communities in joyous communal worship.'
        },
        {
          id: 'tripura_culture',
          title: 'Master Cane & Bamboo Handicrafts',
          category: 'culture',
          state: 'Tripura',
          src: 'images/traditions/tripura_culture.jpg',
          desc: 'Exceptional artisan craft turning natural muli bamboo into fine floor screens, furniture, musical flutes, and handloom rignai fabrics.'
        }
      ],

      delhi: [
        {
          id: 'delhi_dance',
          title: 'Kathak Courtly Arts & Sufi Qawwali',
          category: 'dance',
          state: 'Delhi',
          src: 'images/traditions/delhi_dance.jpg',
          desc: 'Historic classical performances echoing Mughal darbars and the ecstatic devotional Sufi music resonant at Hazrat Nizamuddin Dargah.'
        },
        {
          id: 'delhi_food',
          title: 'Chandni Chowk Chaat, Parathas & Kebabs',
          category: 'food',
          state: 'Delhi',
          src: 'images/traditions/delhi_food.jpg',
          desc: 'World-famous culinary lanes of Old Delhi: crispy aloo tikki, stuffed parathas at Paranthe Wali Gali, and rich rabri-faluda.'
        },
        {
          id: 'delhi_lifestyle',
          title: 'Old Delhi Bazaars & Heritage Walkways',
          category: 'lifestyle',
          state: 'Delhi',
          src: 'images/traditions/delhi_lifestyle.jpg',
          desc: 'Labyrinthine lanes of Khari Baoli Asia\'s largest spice market, cycle rickshaws, haveli courtyards, and vibrant neighborhood bazaars.'
        },
        {
          id: 'delhi_tradition',
          title: 'Phool Walon Ki Sair & Deepotsav',
          category: 'tradition',
          state: 'Delhi',
          src: 'images/traditions/delhi_tradition.jpg',
          desc: 'Historic communal harmony festival where floral fans (pankha) are offered at both Hindu temples and Sufi shrines, alongside glowing Diwali lamps.'
        },
        {
          id: 'delhi_culture',
          title: 'India Gate & Monumental Heritage',
          category: 'culture',
          state: 'Delhi',
          src: 'images/traditions/delhi_culture.jpg',
          desc: 'Majestic British-Raj ceremonial avenue arch, 12th-century Qutb Minar red sandstone tower, and timeless Mughal architectural landmarks.'
        }
      ],

      lotus_temple: [
        {
          id: 'lotus_dance',
          title: 'Sacred Meditative Dance & Chants',
          category: 'dance',
          state: 'Delhi (Lotus Temple)',
          src: 'images/traditions/delhi_dance.jpg',
          desc: 'Peaceful spiritual expressions and meditative chants celebrating unity of all faiths and universal brotherhood.'
        },
        {
          id: 'lotus_food',
          title: 'Cosmopolitan Capital Cuisines',
          category: 'food',
          state: 'Delhi (Lotus Temple)',
          src: 'images/traditions/delhi_food.jpg',
          desc: 'Rich multi-cultural dining featuring wholesome vegetarian thalis, saffron halwas, and seasonal herbal infusions.'
        },
        {
          id: 'lotus_lifestyle',
          title: 'Serene Gardens & Meditative Routine',
          category: 'lifestyle',
          state: 'Delhi (Lotus Temple)',
          src: 'images/traditions/delhi_lifestyle.jpg',
          desc: 'Twenty-six acres of pristine landscaped ponds and lawns offering quiet respite and contemplative living amidst city life.'
        },
        {
          id: 'lotus_tradition',
          title: 'Universal Interfaith Prayers',
          category: 'tradition',
          state: 'Delhi (Lotus Temple)',
          src: 'images/traditions/delhi_tradition.jpg',
          desc: 'Silent devotion open to people of all religions, creeds, and backgrounds without ritual barriers or religious sermons.'
        },
        {
          id: 'lotus_culture',
          title: 'Marble Petals & Modern Architectural Icon',
          category: 'culture',
          state: 'Delhi (Lotus Temple)',
          src: 'images/traditions/delhi_culture.jpg',
          desc: 'Twenty-seven free-standing petals crafted of pure Greek white Penteli marble, forming an architectural marvel of modern sacred design.'
        }
      ]
    };

    return registry[key] || registry['gujarat'] || [];
  }

  buildTraditionShowcaseData(stateKey = '', stateName = '', culture = {}, registryData = {}) {
    const normKey = String(stateKey || '').toLowerCase().trim();
    const photos = this.getStateTraditionPhotos(normKey);
    const resolvedName = stateName || this.formatStateName(stateKey) || 'Heritage State';

    return {
      sub: `LIVING TRADITIONS, DANCES, CUISINES, LIFESTYLES & CRAFTS OF ${resolvedName.toUpperCase()}`,
      stateName: resolvedName,
      photos
    };
  }

  /* ==========================================================
     TABLE OF CONTENTS (17 CHAPTERS)
     ========================================================== */
  renderTOC() {
    if (!this.bookData) return;
    const list = document.getElementById('toc-items-list');
    if (!list) return;
    list.innerHTML = '';

    this.bookData.pages.forEach((page, index) => {
      const li = document.createElement('li');
      li.className = `toc-item ${index === this.currentPage ? 'active' : ''}`;
      li.innerHTML = `
        <span class="toc-num">FOLIO ${String(index + 1).padStart(2, '0')} // ${page.folioStamp || (index + 1)}</span>
        <span class="toc-title">${this.escapeHTML(page.title)}</span>
      `;
      li.addEventListener('click', () => {
        this.goToPage(index);
        const drawer = document.getElementById('book-toc-drawer');
        if (drawer) drawer.classList.remove('active');
      });
      list.appendChild(li);
    });

    const currentSiteLang = window.yugmaTranslator ? window.yugmaTranslator.getLanguage() : 'en';
    if (window.yugmaTranslator && currentSiteLang && currentSiteLang !== 'en') {
      window.yugmaTranslator.translateDOM(currentSiteLang, document.getElementById('book-toc-drawer'));
    }
  }

  onLanguageChanged(newLang) {
    if (!this.bookData) return;
    this.renderTOC();
    this.renderPage(this.currentPage);
    if (window.yugmaTranslator) {
      window.yugmaTranslator.translateDOM(newLang, this.modal);
    }
  }

  /* ==========================================================
     RENDER PAGE WITH 3D DIRECTIONAL ANIMATION & MANUSCRIPT FRAME
     ========================================================== */
  renderPage(pageIndex) {
    if (!this.bookData || !this.bookData.pages || !this.bookData.pages[pageIndex]) return;

    this.currentPage = pageIndex;
    const page = this.bookData.pages[pageIndex];
    const container = document.getElementById('book-page-content');
    if (!container) return;

    // Trigger directional 3D page-turn animation
    container.classList.remove('page-turn-next', 'page-turn-prev', 'page-turn-anim');
    void container.offsetWidth; // Force CSS reflow
    container.classList.add(`page-turn-${this.turnDirection || 'next'}`);

    // Render page body content
    const pageBodyHTML = this.renderPageBody(page, pageIndex);

    // Wrap in authentic Sanskrit Manuscript Pothi Folio (Exact match to reference image)
    container.innerHTML = `
      <div class="manuscript-pothi-folio">
        <!-- LEFT MARGIN (Outside Left Double Red Lines - from Reference Image) -->
        <aside class="manuscript-margin-col margin-left-col">
          <div class="manuscript-margin-top">
            <span class="manuscript-archive-id">म-६६</span>
            <span class="manuscript-archive-sub">${this.escapeHTML(this.bookData.stateName.toUpperCase())}</span>
          </div>
          <div class="manuscript-vert-label">
            <span>ऐतिहासिक • पाण्डुलिपि</span>
          </div>
          <div class="manuscript-margin-bottom">
            <span class="manuscript-leaf-glyph">ॐ</span>
          </div>
        </aside>

        <!-- LEFT DOUBLE RED RULING LINES (from Reference Image) -->
        <div class="manuscript-double-rule left-rule">
          <span class="rule-line"></span>
          <span class="rule-line"></span>
        </div>

        <!-- CENTER MANUSCRIPT SANCTUM -->
        <div class="manuscript-center-body">
          <!-- Top Vedic Sanskrit Shloka Banner with Svarita/Anudatta Accents -->
          <div class="manuscript-vedic-banner">
            <span class="vedic-danda">॥</span>
            <span class="vedic-shloka-text">${this.escapeHTML(page.sanskrit || '॥ ॐ भूर्भुवः स्वः तत्सवितुर्वरेण्यं भर्गो देवस्य धीमहि धियो यो नः प्रचोदयात् ॥')}</span>
            <span class="vedic-danda">॥</span>
          </div>

          <!-- Manuscript Chapter Header -->
          <div class="manuscript-chapter-header">
            <div class="manuscript-header-meta">
              <span class="manuscript-chapter-num">FOLIO ${String(pageIndex + 1).padStart(2, '0')}</span>
              <span class="manuscript-dot">•</span>
              <span class="manuscript-state-title">${this.escapeHTML(this.bookData.stateName.toUpperCase())}</span>
              <span class="manuscript-dot">•</span>
              <span class="manuscript-script-title">पत्रम् ${this.escapeHTML(page.folioStamp || String(pageIndex + 1))}</span>
            </div>
            <h1 class="manuscript-title-text">${this.escapeHTML(page.title)}</h1>
            ${page.data?.sub ? `<div class="manuscript-sub-text">${this.escapeHTML(page.data.sub)}</div>` : ''}
          </div>

          <!-- Manuscript Inner Content Flow -->
          <div class="manuscript-content-flow">
            ${pageBodyHTML}
          </div>

          <!-- Bottom Authentic Haritala Colophon Mark (matching reference image) -->
          <div class="manuscript-colophon-seal">
            <div class="haritala-paste-circle">
              <span class="haritala-glyph">क्तु॒</span>
              <span class="haritala-sub">॥ शुभं भवतु • परम्परा रक्षतु ॥</span>
            </div>
          </div>
        </div>

        <!-- RIGHT DOUBLE RED RULING LINES (from Reference Image) -->
        <div class="manuscript-double-rule right-rule">
          <span class="rule-line"></span>
          <span class="rule-line"></span>
        </div>

        <!-- RIGHT MARGIN (Outside Right Double Red Lines - from Reference Image) -->
        <aside class="manuscript-margin-col margin-right-col">
          <div class="manuscript-margin-top">
            <span class="manuscript-folio-digit">${this.escapeHTML(page.folioStamp || String(pageIndex + 1))}</span>
            <span class="manuscript-folio-word">पत्र ${pageIndex + 1}</span>
          </div>
          <div class="manuscript-vert-label">
            <span>संस्कृति • धरोहर</span>
          </div>
          <div class="manuscript-margin-bottom">
            <span class="manuscript-leaf-glyph">卐</span>
          </div>
        </aside>
      </div>
    `;

    // Update footer progress & folios
    const currentFolio = document.getElementById('book-current-folio');
    if (currentFolio) currentFolio.textContent = pageIndex + 1;

    const progress = document.getElementById('book-progress-fill');
    if (progress) {
      const pct = ((pageIndex + 1) / this.totalPages) * 100;
      progress.style.width = `${pct}%`;
    }

    const eraTag = document.getElementById('book-era-tag');
    if (eraTag) eraTag.textContent = page.title || 'Cultural Heritage';

    // Synchronize TOC active item
    document.querySelectorAll('.toc-item').forEach((item, idx) => {
      item.classList.toggle('active', idx === pageIndex);
    });

    // Update navigation arrows disabled states
    const prevBtn = document.getElementById('btn-page-prev');
    const nextBtn = document.getElementById('btn-page-next');
    if (prevBtn) prevBtn.disabled = (pageIndex === 0);
    if (nextBtn) nextBtn.disabled = (pageIndex === this.totalPages - 1);

    // Wire interactive filter chips if this is folio 17 (Tradition Showcase)
    if (page.pageType === 'tradition_showcase') {
      this.attachTraditionShowcaseEvents();
    }

    // In-DOM translation into user's selected language
    const currentSiteLang = window.yugmaTranslator ? window.yugmaTranslator.getLanguage() : 'en';
    if (window.yugmaTranslator && currentSiteLang && currentSiteLang !== 'en') {
      window.yugmaTranslator.translateDOM(currentSiteLang, this.modal);
    }
  }

  /* ==========================================================
     PAGE BODY RENDERERS (ALL 16 DISTINCT LAYOUTS)
     ========================================================== */
  renderPageBody(page, pageIndex) {
    const d = page.data || {};
    const sub = d.sub || page.title;

    switch (page.pageType) {
      case 'identity':
        return `
          <div class="book-page-header-row">
            <span class="book-sec-num">01</span>
            <div>
              <div class="page-chapter-tag">${this.escapeHTML(sub)}</div>
              <h2 class="content-page-title">${this.escapeHTML(d.stateName || this.bookData.stateName)}</h2>
            </div>
          </div>
          <div class="ornamental-line"></div>
          <div class="book-intro-callout">“${this.escapeHTML(d.introduction)}”</div>
          <div class="book-grid-2" style="margin-bottom: 12px;">
            <div class="book-editorial-card">
              <div class="book-card-header">
                <h4 class="book-card-title">Geographic Character</h4>
                <span class="book-card-badge">LANDSCAPE</span>
              </div>
              <p class="book-card-body">${this.escapeHTML(d.geography)}</p>
            </div>
            <div class="book-editorial-card">
              <div class="book-card-header">
                <h4 class="book-card-title">Historical Identity</h4>
                <span class="book-card-badge">DYNASTIC</span>
              </div>
              <p class="book-card-body">${this.escapeHTML(d.historicalIdentity)}</p>
            </div>
          </div>
          <div class="book-editorial-card" style="margin-bottom: 12px;">
            <div class="book-card-header">
              <h4 class="book-card-title">Cultural Significance</h4>
              <span class="book-card-badge">SPIRIT & ARTS</span>
            </div>
            <p class="book-card-body">${this.escapeHTML(d.culturalSignificance)}</p>
          </div>
          ${d.metrics ? `
            <div class="book-grid-4">
              ${d.metrics.map(m => `
                <div class="book-editorial-card" style="padding: 10px; text-align: center;">
                  <div style="font-size: 8px; letter-spacing: 0.15em; color: #8a1f16; text-transform: uppercase; font-weight: 700;">${this.escapeHTML(m.label)}</div>
                  <div style="font-family: var(--font-heading); font-size: 11px; color: #0a0a0a; font-weight: 700; margin-top: 2px;">${this.escapeHTML(m.val)}</div>
                </div>
              `).join('')}
            </div>
          ` : ''}
        `;

      case 'timeline':
        return `
          <div class="book-page-header-row">
            <span class="book-sec-num">02</span>
            <div>
              <div class="page-chapter-tag">${this.escapeHTML(sub)}</div>
              <h2 class="content-page-title">${this.escapeHTML(page.title)}</h2>
            </div>
          </div>
          <div class="ornamental-line"></div>
          <p class="book-intro-desc">${this.escapeHTML(d.intro)}</p>
          <div class="timeline-stream">
            ${(d.milestones || []).map(m => `
              <div class="timeline-node">
                <div class="timeline-year">${this.escapeHTML(m.period)}</div>
                <div class="timeline-era">${this.escapeHTML(m.era)}</div>
                <p class="book-card-body">${this.escapeHTML(m.desc)}</p>
              </div>
            `).join('')}
          </div>
        `;

      case 'heritage':
        return `
          <div class="book-page-header-row">
            <span class="book-sec-num">03</span>
            <div>
              <div class="page-chapter-tag">${this.escapeHTML(sub)}</div>
              <h2 class="content-page-title">${this.escapeHTML(page.title)}</h2>
            </div>
          </div>
          <div class="ornamental-line"></div>
          <p class="book-intro-desc">${this.escapeHTML(d.intro)}</p>
          <div class="book-grid-2">
            ${(d.sites || []).map(s => `
              <div class="book-editorial-card">
                <div class="book-card-header">
                  <h4 class="book-card-title">${this.escapeHTML(s.name)}</h4>
                  <span class="book-card-badge">${this.escapeHTML(s.period)}</span>
                </div>
                <div style="font-size: 10px; color: #8a1f16; font-weight: 600; margin-bottom: 6px;">📍 ${this.escapeHTML(s.location)} • ${this.escapeHTML(s.dynasty)}</div>
                <p class="book-card-body" style="margin-bottom: 6px;">${this.escapeHTML(s.architecture)}</p>
                <div class="book-card-highlight" style="margin-bottom: 6px;"><b>Significance:</b> ${this.escapeHTML(s.significance)}</div>
                <div class="book-card-meta-row">
                  <span class="book-meta-chip">💡 <b>Fact:</b> ${this.escapeHTML(s.verifiedFact)}</span>
                </div>
              </div>
            `).join('')}
          </div>
        `;

      case 'architecture':
        return `
          <div class="book-page-header-row">
            <span class="book-sec-num">04</span>
            <div>
              <div class="page-chapter-tag">${this.escapeHTML(sub)}</div>
              <h2 class="content-page-title">${this.escapeHTML(page.title)}</h2>
            </div>
          </div>
          <div class="ornamental-line"></div>
          <p class="book-intro-desc">${this.escapeHTML(d.intro)}</p>
          <div class="book-grid-2" style="margin-bottom: 12px;">
            ${(d.elements || []).map(e => `
              <div class="book-editorial-card">
                <div class="book-card-header">
                  <h4 class="book-card-title">${this.escapeHTML(e.title)}</h4>
                  <span class="book-card-badge">${this.escapeHTML(e.sub)}</span>
                </div>
                <p class="book-card-body">${this.escapeHTML(e.desc)}</p>
                ${e.tech ? `<div class="book-card-highlight" style="margin-top: 6px;"><b>Engineering:</b> ${this.escapeHTML(e.tech)}</div>` : ''}
              </div>
            `).join('')}
          </div>
          <div class="book-grid-2">
            <div class="book-editorial-card">
              <div class="book-card-header">
                <h4 class="book-card-title">Construction Materials</h4>
                <span class="book-card-badge">GEOLOGY</span>
              </div>
              <p class="book-card-body">${this.escapeHTML(d.materials)}</p>
            </div>
            <div class="book-editorial-card">
              <div class="book-card-header">
                <h4 class="book-card-title">Decorative Motifs</h4>
                <span class="book-card-badge">ICONOGRAPHY</span>
              </div>
              <p class="book-card-body">${this.escapeHTML(d.motifs)}</p>
            </div>
          </div>
        `;

      case 'traditions':
        return `
          <div class="book-page-header-row">
            <span class="book-sec-num">05</span>
            <div>
              <div class="page-chapter-tag">${this.escapeHTML(sub)}</div>
              <h2 class="content-page-title">${this.escapeHTML(page.title)}</h2>
            </div>
          </div>
          <div class="ornamental-line"></div>
          <p class="book-intro-desc">${this.escapeHTML(d.intro)}</p>
          <div class="book-grid-2">
            ${(d.traditions || []).map(t => `
              <div class="book-editorial-card">
                <div class="book-card-header">
                  <h4 class="book-card-title">${this.escapeHTML(t.name)}</h4>
                  <span class="book-card-badge">${this.escapeHTML(t.type)}</span>
                </div>
                <p class="book-card-body" style="margin-bottom: 8px;">${this.escapeHTML(t.desc)}</p>
                <div class="book-card-highlight" style="border-top: 1px solid rgba(171, 43, 32, 0.15); padding-top: 6px;">
                  <b>Cultural Role:</b> ${this.escapeHTML(t.role)}
                </div>
              </div>
            `).join('')}
          </div>
        `;

      case 'festivals':
        return `
          <div class="book-page-header-row">
            <span class="book-sec-num">06</span>
            <div>
              <div class="page-chapter-tag">${this.escapeHTML(sub)}</div>
              <h2 class="content-page-title">${this.escapeHTML(page.title)}</h2>
            </div>
          </div>
          <div class="ornamental-line"></div>
          <p class="book-intro-desc">${this.escapeHTML(d.intro)}</p>
          <div class="book-grid-2">
            ${(d.festivals || []).map(f => `
              <div class="book-editorial-card">
                <div class="book-card-header">
                  <h4 class="book-card-title">${this.escapeHTML(f.name)}</h4>
                  <span class="book-card-badge">${this.escapeHTML(f.timing)}</span>
                </div>
                <p class="book-card-body" style="margin-bottom: 6px;"><b>Rituals:</b> ${this.escapeHTML(f.rituals)}</p>
                <div class="book-card-highlight"><b>Cultural Meaning:</b> ${this.escapeHTML(f.meaning)}</div>
              </div>
            `).join('')}
          </div>
        `;

      case 'arts':
        return `
          <div class="book-page-header-row">
            <span class="book-sec-num">07</span>
            <div>
              <div class="page-chapter-tag">${this.escapeHTML(sub)}</div>
              <h2 class="content-page-title">${this.escapeHTML(page.title)}</h2>
            </div>
          </div>
          <div class="ornamental-line"></div>
          <p class="book-intro-desc">${this.escapeHTML(d.intro)}</p>
          <div class="book-grid-2" style="margin-bottom: 12px;">
            ${(d.forms || []).map(a => `
              <div class="book-editorial-card">
                <div class="book-card-header">
                  <h4 class="book-card-title">${this.escapeHTML(a.name)}</h4>
                  <span class="book-card-badge">${this.escapeHTML(a.genre)}</span>
                </div>
                <p class="book-card-body" style="margin-bottom: 6px;">${this.escapeHTML(a.desc)}</p>
                <div class="book-card-highlight"><b>Role:</b> ${this.escapeHTML(a.role)}</div>
              </div>
            `).join('')}
          </div>
          <div class="book-editorial-card">
            <div class="book-card-header">
              <h4 class="book-card-title">Traditional Instruments</h4>
              <span class="book-card-badge">ACOUSTICS</span>
            </div>
            <div style="display: flex; flex-wrap: wrap; gap: 8px;">
              ${(d.instruments || []).map(inst => `
                <div class="book-inst-chip">
                  <b class="book-inst-name">${this.escapeHTML(inst.name)}:</b> <span class="book-inst-type">${this.escapeHTML(inst.type)}</span>
                </div>
              `).join('')}
            </div>
          </div>
        `;

      case 'crafts':
        return `
          <div class="book-page-header-row">
            <span class="book-sec-num">08</span>
            <div>
              <div class="page-chapter-tag">${this.escapeHTML(sub)}</div>
              <h2 class="content-page-title">${this.escapeHTML(page.title)}</h2>
            </div>
          </div>
          <div class="ornamental-line"></div>
          <p class="book-intro-desc">${this.escapeHTML(d.intro)}</p>
          <div class="book-grid-2">
            ${(d.crafts || []).map(c => `
              <div class="book-editorial-card">
                <div class="book-card-header">
                  <h4 class="book-card-title">${this.escapeHTML(c.name)}</h4>
                  <span class="book-card-badge">📍 ${this.escapeHTML(c.hub)}</span>
                </div>
                <div style="font-size: 10px; color: #8a1f16; font-weight: 600; margin-bottom: 6px;"><b>Material:</b> ${this.escapeHTML(c.material)}</div>
                <p class="book-card-body" style="margin-bottom: 6px;">${this.escapeHTML(c.desc)}</p>
                <div class="book-card-highlight"><b>Heritage Status:</b> ${this.escapeHTML(c.status)}</div>
              </div>
            `).join('')}
          </div>
        `;

      case 'cuisine':
        return `
          <div class="book-page-header-row">
            <span class="book-sec-num">09</span>
            <div>
              <div class="page-chapter-tag">${this.escapeHTML(sub)}</div>
              <h2 class="content-page-title">${this.escapeHTML(page.title)}</h2>
            </div>
          </div>
          <div class="ornamental-line"></div>
          <p class="book-intro-desc">${this.escapeHTML(d.intro)}</p>
          <div class="book-grid-2">
            ${(d.dishes || []).map(f => `
              <div class="book-editorial-card">
                <div class="book-card-header">
                  <h4 class="book-card-title">${this.escapeHTML(f.name)}</h4>
                  <span class="book-card-badge">${this.escapeHTML(f.flavor)}</span>
                </div>
                <div style="font-size: 10px; color: #8a1f16; font-weight: 600; margin-bottom: 6px;"><b>Ingredients:</b> ${this.escapeHTML(f.ingredients)}</div>
                <p class="book-card-body" style="margin-bottom: 6px;">${this.escapeHTML(f.desc)}</p>
                <div class="book-card-highlight"><b>Festival Association:</b> ${this.escapeHTML(f.festivals)}</div>
              </div>
            `).join('')}
          </div>
        `;

      case 'people':
        return `
          <div class="book-page-header-row">
            <span class="book-sec-num">10</span>
            <div>
              <div class="page-chapter-tag">${this.escapeHTML(sub)}</div>
              <h2 class="content-page-title">${this.escapeHTML(page.title)}</h2>
            </div>
          </div>
          <div class="ornamental-line"></div>
          <p class="book-intro-desc">${this.escapeHTML(d.intro)}</p>
          <div class="book-grid-2">
            ${(d.communities || []).map(c => `
              <div class="book-editorial-card">
                <div class="book-card-header">
                  <h4 class="book-card-title">${this.escapeHTML(c.name)}</h4>
                  <span class="book-card-badge">${this.escapeHTML(c.role)}</span>
                </div>
                <p class="book-card-body" style="margin-bottom: 6px;">${this.escapeHTML(c.desc)}</p>
                <div class="book-card-highlight"><b>Contribution:</b> ${this.escapeHTML(c.contribution)}</div>
              </div>
            `).join('')}
          </div>
        `;

      case 'literature':
        return `
          <div class="book-page-header-row">
            <span class="book-sec-num">11</span>
            <div>
              <div class="page-chapter-tag">${this.escapeHTML(sub)}</div>
              <h2 class="content-page-title">${this.escapeHTML(page.title)}</h2>
            </div>
          </div>
          <div class="ornamental-line"></div>
          <p class="book-intro-desc">${this.escapeHTML(d.intro)}</p>
          <div class="book-grid-2">
            ${(d.aspects || []).map(asp => `
              <div class="book-editorial-card">
                <div class="book-card-header">
                  <h4 class="book-card-title">${this.escapeHTML(asp.title)}</h4>
                  <span class="book-card-badge">LITERARY HERITAGE</span>
                </div>
                <p class="book-card-body" style="margin-bottom: 6px;">${this.escapeHTML(asp.desc)}</p>
                <div class="book-card-highlight">💡 <b>Verified Fact:</b> ${this.escapeHTML(asp.fact)}</div>
              </div>
            `).join('')}
          </div>
        `;

      case 'nature':
        return `
          <div class="book-page-header-row">
            <span class="book-sec-num">12</span>
            <div>
              <div class="page-chapter-tag">${this.escapeHTML(sub)}</div>
              <h2 class="content-page-title">${this.escapeHTML(page.title)}</h2>
            </div>
          </div>
          <div class="ornamental-line"></div>
          <p class="book-intro-desc">${this.escapeHTML(d.intro)}</p>
          <div class="book-grid-2">
            ${(d.realms || []).map(r => `
              <div class="book-editorial-card">
                <div class="book-card-header">
                  <h4 class="book-card-title">${this.escapeHTML(r.name)}</h4>
                  <span class="book-card-badge">${this.escapeHTML(r.type)}</span>
                </div>
                <p class="book-card-body" style="margin-bottom: 6px;">${this.escapeHTML(r.desc)}</p>
                <div class="book-card-highlight">🌿 <b>Ecology:</b> ${this.escapeHTML(r.eco)}</div>
              </div>
            `).join('')}
          </div>
        `;

      case 'symbols':
        return `
          <div class="book-page-header-row">
            <span class="book-sec-num">13</span>
            <div>
              <div class="page-chapter-tag">${this.escapeHTML(sub)}</div>
              <h2 class="content-page-title">${this.escapeHTML(page.title)}</h2>
            </div>
          </div>
          <div class="ornamental-line"></div>
          <p class="book-intro-desc">${this.escapeHTML(d.intro)}</p>
          <div class="symbols-grid-10">
            ${(d.symbols || []).map(sym => `
              <div class="symbol-card">
                <div class="symbol-icon">${sym.icon}</div>
                <div class="symbol-category">${this.escapeHTML(sym.category)}</div>
                <h5 class="symbol-title">${this.escapeHTML(sym.title)}</h5>
                <div class="symbol-detail">${this.escapeHTML(sym.detail)}</div>
              </div>
            `).join('')}
          </div>
        `;

      case 'facts':
        return `
          <div class="book-page-header-row">
            <span class="book-sec-num">14</span>
            <div>
              <div class="page-chapter-tag">${this.escapeHTML(sub)}</div>
              <h2 class="content-page-title">${this.escapeHTML(page.title)}</h2>
            </div>
          </div>
          <div class="ornamental-line"></div>
          <p class="book-intro-desc">${this.escapeHTML(d.intro)}</p>
          <div class="fact-grid">
            ${(d.facts || []).map(f => `
              <div class="fact-item-card">
                <div class="fact-num">FACT // ${this.escapeHTML(f.num)}</div>
                <div class="fact-text">${this.escapeHTML(f.text)}</div>
              </div>
            `).join('')}
          </div>
        `;

      case 'yugma':
        return `
          <div class="book-page-header-row">
            <span class="book-sec-num">15</span>
            <div>
              <div class="page-chapter-tag">${this.escapeHTML(sub)}</div>
              <h2 class="content-page-title">${this.escapeHTML(page.title)}</h2>
            </div>
          </div>
          <div class="ornamental-line"></div>
          <p class="book-intro-desc">${this.escapeHTML(d.intro)}</p>
          <div class="yugma-trio-grid">
            ${(d.trio || []).map(tr => `
              <div class="yugma-trio-card">
                <div class="yugma-trio-icon">${tr.icon}</div>
                <div class="yugma-trio-title">${this.escapeHTML(tr.title)}</div>
                <div style="font-size: 10px; letter-spacing: 0.15em; color: #8a1f16; font-weight: 700; text-transform: uppercase;">${this.escapeHTML(tr.sub)}</div>
                <div class="yugma-trio-desc">${this.escapeHTML(tr.desc)}</div>
              </div>
            `).join('')}
          </div>
          <div class="yugma-action-banner">
            <span>✨ ${this.escapeHTML(d.actionBadge || 'SCAN → EXPLORE → EXPERIENCE')}</span>
          </div>
        `;

      case 'preservation':
        const man = d.manifesto || {};
        return `
          <div class="book-page-header-row">
            <span class="book-sec-num">16</span>
            <div>
              <div class="page-chapter-tag">${this.escapeHTML(sub)}</div>
              <h2 class="content-page-title">${this.escapeHTML(page.title)}</h2>
            </div>
          </div>
          <div class="ornamental-line"></div>
          <div class="manifesto-container">
            <div class="manifesto-box">
              <h3 class="manifesto-title">${this.escapeHTML(man.title || 'Safeguarding Cultural Memory')}</h3>
              <p class="manifesto-text">${this.escapeHTML(man.p1 || '')}</p>
              <p class="manifesto-text">${this.escapeHTML(man.p2 || '')}</p>
              <p class="manifesto-text">${this.escapeHTML(man.p3 || '')}</p>
              <div class="manifesto-signature">${this.escapeHTML(man.signature || '“YUGMA — Where Heritage Becomes an Experience.”')}</div>
            </div>
          </div>
        `;

      case 'tradition_showcase':
        const photos = d.photos || [];
        const danceCount = photos.filter(p => p.category === 'dance').length;
        const foodCount = photos.filter(p => p.category === 'food').length;
        const lifestyleCount = photos.filter(p => p.category === 'lifestyle').length;
        const traditionCount = photos.filter(p => p.category === 'tradition').length;
        const cultureCount = photos.filter(p => p.category === 'culture').length;

        return `
          <div class="book-page-header-row">
            <span class="book-sec-num">17</span>
            <div>
              <div class="page-chapter-tag">${this.escapeHTML(sub || 'CULTURAL VISUAL ARCHIVE')}</div>
              <h2 class="content-page-title">${this.escapeHTML(page.title)} // ${this.escapeHTML(this.bookData.stateName.toUpperCase())}</h2>
            </div>
          </div>
          <div class="ornamental-line"></div>
          <div class="book-intro-callout">
            “Explore the living traditions, dance forms, culinary arts, community lifestyles, and heritage culture of ${this.escapeHTML(this.bookData.stateName)}.”
          </div>

          <!-- CATEGORY FILTER BAR -->
          <div class="tradition-photo-filter-bar" id="tradition-photo-filter-bar">
            <button class="photo-filter-chip active" data-filter="all" type="button">All ${this.escapeHTML(this.bookData.stateName)} (${photos.length})</button>
            ${danceCount > 0 ? `<button class="photo-filter-chip" data-filter="dance" type="button">💃 Dance (${danceCount})</button>` : ''}
            ${foodCount > 0 ? `<button class="photo-filter-chip" data-filter="food" type="button">🍲 Foods (${foodCount})</button>` : ''}
            ${lifestyleCount > 0 ? `<button class="photo-filter-chip" data-filter="lifestyle" type="button">🧵 Lifestyles (${lifestyleCount})</button>` : ''}
            ${traditionCount > 0 ? `<button class="photo-filter-chip" data-filter="tradition" type="button">🪔 Traditions (${traditionCount})</button>` : ''}
            ${cultureCount > 0 ? `<button class="photo-filter-chip" data-filter="culture" type="button">🎨 Culture & Crafts (${cultureCount})</button>` : ''}
          </div>

          <!-- PHOTO GRID -->
          <div class="tradition-photos-grid" id="tradition-photos-grid">
            ${photos.map((item) => `
              <article class="tradition-photo-card" data-category="${this.escapeHTML(item.category)}" data-state="${this.escapeHTML(item.state.toLowerCase())}">
                <div class="tradition-photo-frame">
                  <img src="${this.escapeHTML(item.src)}" alt="${this.escapeHTML(item.title)}" loading="lazy" />
                  <span class="tradition-photo-category-pill">${this.escapeHTML(item.category)}</span>
                </div>
                <div class="tradition-photo-meta">
                  <span class="tradition-photo-state-badge">📍 ${this.escapeHTML(item.state)}</span>
                  <h4 class="tradition-photo-name">${this.escapeHTML(item.title)}</h4>
                  <p class="tradition-photo-desc">${this.escapeHTML(item.desc)}</p>
                </div>
              </article>
            `).join('')}
          </div>
        `;

      default:
        return `<p>${this.escapeHTML(page.content || '')}</p>`;
    }
  }

  attachTraditionShowcaseEvents() {
    if (!this.modal) return;
    const chips = this.modal.querySelectorAll('.photo-filter-chip');
    const cards = this.modal.querySelectorAll('.tradition-photo-card');
    if (!chips.length || !cards.length) return;

    chips.forEach(chip => {
      chip.addEventListener('click', (e) => {
        e.preventDefault();
        chips.forEach(c => c.classList.remove('active'));
        chip.classList.add('active');

        const filter = chip.getAttribute('data-filter');
        cards.forEach(card => {
          const cat = card.getAttribute('data-category');
          if (filter === 'all' || cat === filter) {
            card.style.display = 'flex';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }

  /* ==========================================================
     PAGE NAVIGATION
     ========================================================== */
  nextPage() {
    if (!this.bookData || this.currentPage >= this.totalPages - 1) return;
    this.turnDirection = 'next';
    if (window.yugmaAudio && typeof window.yugmaAudio.playPageTurn === 'function') {
      window.yugmaAudio.playPageTurn();
    }
    this.stopTTS();
    this.renderPage(this.currentPage + 1);
  }

  prevPage() {
    if (!this.bookData || this.currentPage <= 0) return;
    this.turnDirection = 'prev';
    if (window.yugmaAudio && typeof window.yugmaAudio.playPageTurn === 'function') {
      window.yugmaAudio.playPageTurn();
    }
    this.stopTTS();
    this.renderPage(this.currentPage - 1);
  }

  goToPage(index) {
    if (!this.bookData || index < 0 || index >= this.totalPages) return;
    this.turnDirection = index >= this.currentPage ? 'next' : 'prev';
    if (index !== this.currentPage && window.yugmaAudio && typeof window.yugmaAudio.playPageTurn === 'function') {
      window.yugmaAudio.playPageTurn();
    }
    this.stopTTS();
    this.renderPage(index);
  }

  /* ==========================================================
     TEXT TO SPEECH (NARRATION)
     ========================================================== */
  toggleTTS() {
    if (this.isTTSPlaying) this.stopTTS();
    else this.startTTS();
  }

  startTTS() {
    if (!this.speechSynth || !this.bookData) return;
    this.speechSynth.cancel();

    const page = this.bookData.pages[this.currentPage];
    if (!page) return;

    let textToRead = `${page.title}. `;
    const d = page.data;
    if (d) {
      if (d.introduction) textToRead += `${d.introduction} `;
      if (d.intro) textToRead += `${d.intro} `;
      if (d.photos) {
        textToRead += `Cultural visual archive featuring classical dances, royal and regional cuisines, community lifestyles, sacred rituals, and indigenous crafts. `;
      }
      if (d.manifesto) {
        textToRead += `${d.manifesto.p1} ${d.manifesto.p2} ${d.manifesto.p3} ${d.manifesto.signature}`;
      }
    }
    if (!textToRead.trim()) textToRead = `${page.title}. Comprehensive heritage documentation in YUGMA archive.`;

    const utterance = new SpeechSynthesisUtterance(textToRead);
    utterance.rate = 0.95;
    utterance.pitch = 0.98;
    utterance.volume = 1;
    utterance.onend = () => this.stopTTS();
    utterance.onerror = () => this.stopTTS();

    this.speechSynth.speak(utterance);
    this.isTTSPlaying = true;

    const label = document.getElementById('book-tts-label');
    const btn = document.getElementById('btn-book-tts');
    if (label) label.textContent = 'PAUSE';
    if (btn) btn.classList.add('active');
  }

  stopTTS() {
    if (this.speechSynth) this.speechSynth.cancel();
    this.isTTSPlaying = false;
    const label = document.getElementById('book-tts-label');
    const btn = document.getElementById('btn-book-tts');
    if (label) label.textContent = 'READ ALOUD';
    if (btn) btn.classList.remove('active');
  }

  /* ==========================================================
     UTILITIES
     ========================================================== */
  formatParagraphs(content) {
    if (!content) return '<p>Heritage information is being curated for this archive.</p>';
    return String(content)
      .split(/\n\s*\n/)
      .map(p => p.trim())
      .filter(Boolean)
      .map(p => `<p>${this.escapeHTML(p).replace(/\n/g, '<br>')}</p>`)
      .join('');
  }

  formatStateName(stateId) {
    if (!stateId) return '';
    return String(stateId).replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
  }

  escapeHTML(val) {
    if (val === null || val === undefined) return '';
    return String(val)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }
}

// Global export
window.YugmaDigitalBook = YugmaDigitalBook;