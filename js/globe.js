/**
 * YUGMA - 3D Earth Globe & Indian Heritage Geospatial Engine
 * Globe.gl powered with proper dimension handling and error recovery.
 */

class YugmaGlobe {
  constructor(containerEl, onStateSelectCallback) {
    this.container = containerEl;
    this.onStateSelect = onStateSelectCallback;

    this.globe = null;
    this.allFeatures = [];
    this.activeHoveredState = null;
    this.activeSelectedState = null;

    this.STATE_COLORS = [
      '#e0231c', '#c9a24a', '#ff5a3c', '#38bdf8', '#818cf8',
      '#fbbf24', '#34d399', '#f43f5e', '#a855f7', '#059669',
      '#0d9488', '#9333ea', '#16a34a', '#dc2626', '#7c3aed'
    ];

    this.stateColorMap = new Map();
    this.colorIndex = 0;

    this._initWhenReady();
  }

  _initWhenReady() {
    // Ensure container is in DOM and has size
    if (typeof Globe === 'undefined') {
      console.warn('[YUGMA Globe] Globe.gl not loaded yet, retrying in 500ms...');
      setTimeout(() => this._initWhenReady(), 500);
      return;
    }
    this._init();
  }

  getStateColor(name) {
    if (!name) return '#c9a24a';
    if (!this.stateColorMap.has(name)) {
      this.stateColorMap.set(name, this.STATE_COLORS[this.colorIndex % this.STATE_COLORS.length]);
      this.colorIndex++;
    }
    return this.stateColorMap.get(name);
  }

  getStateName(feat) {
    if (!feat) return '';
    const p = feat.properties || {};
    return p.NAME_1 || p.name || p.NAME || p.st_nm || p.state || p.ST_NM || p.dtname || 'Region';
  }

  hexToRgba(hex, alpha) {
    if (!hex || hex[0] !== '#') return `rgba(201, 162, 74, ${alpha})`;
    const r = parseInt(hex.slice(1, 3), 16) || 201;
    const g = parseInt(hex.slice(3, 5), 16) || 162;
    const b = parseInt(hex.slice(5, 7), 16) || 74;
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }

  _init() {
    const W = this.container.clientWidth || window.innerWidth;
    const H = this.container.clientHeight || window.innerHeight;

    console.log(`[YUGMA Globe] Initializing Globe.gl — container: ${W}×${H}`);

    try {
      this.globe = Globe({ animateIn: false })(this.container)
        .width(W)
        .height(H)
        .globeImageUrl('https://unpkg.com/three-globe/example/img/earth-blue-marble.jpg')
        .bumpImageUrl('https://unpkg.com/three-globe/example/img/earth-topology.png')
        .backgroundImageUrl('https://unpkg.com/three-globe/example/img/night-sky.png')
        .showAtmosphere(true)
        .atmosphereColor('rgba(56, 189, 248, 0.35)')
        .atmosphereAltitude(0.22)
        .polygonAltitude(feat => {
          const name = this.getStateName(feat);
          if (name === this.activeSelectedState) return 0.048;
          if (name === this.activeHoveredState) return 0.038;
          return 0.006;
        })
        .polygonCapColor(feat => {
          const name = this.getStateName(feat);
          const baseColor = this.getStateColor(name);
          if (name === this.activeSelectedState) return this.hexToRgba(baseColor, 0.22);
          if (name === this.activeHoveredState) return this.hexToRgba(baseColor, 0.14);
          return 'rgba(0, 0, 0, 0)'; // Transparent: No solid color overlay on states
        })
        .polygonSideColor(feat => {
          const name = this.getStateName(feat);
          const baseColor = this.getStateColor(name);
          if (name === this.activeSelectedState) return this.hexToRgba(baseColor, 0.6);
          if (name === this.activeHoveredState) return this.hexToRgba(baseColor, 0.45);
          return 'rgba(255, 255, 255, 0.02)';
        })
        .polygonStrokeColor(feat => {
          const name = this.getStateName(feat);
          if (name === this.activeSelectedState) return '#ffffff';
          if (name === this.activeHoveredState) return '#ffd700'; // Dynamic bright gold border highlight on drag/hover
          return 'rgba(255, 255, 255, 0.35)'; // Clean subtle border
        })
        .polygonLabel(feat => {
          const name = this.getStateName(feat);
          const color = this.getStateColor(name);
          const stateKey = this.normalizeStateKey(name);
          const meta = (window.YUGMA_STATES_DATA || {})[stateKey];
          const monument = meta ? meta.heritage : 'Cultural Heritage Region';
          const tradition = meta ? meta.tradition : 'Living Tradition';

          return `
            <div style="
              background: rgba(6,10,20,0.92);
              border: 1px solid ${color};
              border-radius: 12px;
              padding: 10px 16px;
              backdrop-filter: blur(16px);
              color: #e8dfc8;
              font-family: 'Onest', sans-serif;
              min-width: 160px;
              pointer-events: none;
            ">
              <div style="display:flex;align-items:center;gap:8px;margin-bottom:6px;border-bottom:1px solid rgba(255,255,255,0.1);padding-bottom:5px;">
                <span style="width:9px;height:9px;border-radius:3px;background:${color};display:inline-block;"></span>
                <span style="font-size:13px;font-weight:600;color:#fff;">${name}</span>
              </div>
              <div style="font-size:11px;color:rgba(232,223,200,0.7);">🏛️ <b style="color:#e8dfc8;">${monument}</b></div>
              <div style="font-size:11px;color:rgba(232,223,200,0.7);margin-top:3px;">🎭 <b style="color:#e8dfc8;">${tradition}</b></div>
            </div>
          `;
        })
        .onPolygonHover(hoverD => {
          const prev = this.activeHoveredState;
          this.activeHoveredState = hoverD ? this.getStateName(hoverD) : null;
          if (prev !== this.activeHoveredState) {
            this.globe.polygonAltitude(this.globe.polygonAltitude());
            this.globe.polygonCapColor(this.globe.polygonCapColor());
            this.globe.polygonSideColor(this.globe.polygonSideColor());
            this.globe.polygonStrokeColor(this.globe.polygonStrokeColor());
          }
        })
        .onPolygonClick(feat => {
          if (!feat) return;
          const name = this.getStateName(feat);
          this.selectStateByName(name);
        });

      // Controls
      const controls = this.globe.controls();
      if (controls) {
        controls.autoRotate = true;
        controls.autoRotateSpeed = -0.6;
        controls.enableDamping = true;
        controls.dampingFactor = 0.08;
        controls.zoomSpeed = 0.9;
        controls.minDistance = 110;
        controls.maxDistance = 900;
      }

      // Start focused on India
      this.globe.pointOfView({ lat: 21, lng: 78.96, altitude: 2.1 }, 0);

      // Load boundaries then build pins
      this._loadBoundaries().then(() => {
        this._buildStatePinpoints();
      });

      // Resize handler
      window.addEventListener('resize', () => {
        if (this.globe && this.container) {
          this.globe
            .width(this.container.clientWidth || window.innerWidth)
            .height(this.container.clientHeight || window.innerHeight);
        }
      });

      console.log('[YUGMA Globe] Globe.gl initialized successfully.');

    } catch (err) {
      console.error('[YUGMA Globe] Globe.gl initialization failed:', err);
    }
  }

  normalizeStateKey(name) {
    if (!name) return 'maharashtra';
    const clean = name.toLowerCase().replace(/[^a-z]/g, '_');
    if (clean.includes('unity') || clean.includes('statue')) return 'statue_of_unity';
    if (clean.includes('maha')) return 'maharashtra';
    if (clean.includes('guja')) return 'gujarat';
    if (clean.includes('raja')) return 'rajasthan';
    if (clean.includes('uttar_p') || (clean.includes('uttar') && !clean.includes('uttara'))) return 'uttar_pradesh';
    if (clean.includes('bengal')) return 'west_bengal';
    if (clean.includes('tamil')) return 'tamil_nadu';
    if (clean.includes('karna')) return 'karnataka';
    if (clean.includes('keral')) return 'kerala';
    if (clean.includes('odis') || clean.includes('oris')) return 'odisha';
    if (clean.includes('assa')) return 'assam';
    if (clean.includes('bihar')) return 'bihar';
    if (clean.includes('andhra') || clean.includes('lepakshi')) return 'andhra_pradesh';
    if (clean.includes('uttarakhand') || clean.includes('uttaran')) return 'uttarakhand';
    if (clean.includes('tripura')) return 'tripura';
    return clean;
  }

  async _loadBoundaries() {
    const GEOJSON_URLS = [
      'https://raw.githubusercontent.com/geohacker/india/master/state/india_state.geojson',
      'https://raw.githubusercontent.com/Subhash9325/GeoJson-Data-of-Indian-States/master/Indian_States',
      'https://raw.githubusercontent.com/datameet/maps/master/States/states.geojson'
    ];

    let loaded = false;
    for (const url of GEOJSON_URLS) {
      try {
        const res = await fetch(url);
        if (!res.ok) continue;
        const data = await res.json();
        if (data && data.features && data.features.length > 0) {
          this.allFeatures = data.features;
          this.globe.polygonsData(this.allFeatures);
          loaded = true;
          console.log(`[YUGMA Globe] GeoJSON loaded from: ${url}`);
          break;
        }
      } catch (e) {
        console.warn(`[YUGMA Globe] Mirror failed (${url}):`, e.message);
      }
    }

    if (!loaded && window.INDIA_GEOJSON_DATA) {
      console.log('[YUGMA Globe] Using embedded GeoJSON fallback.');
      const localFeatures = Object.keys(window.INDIA_GEOJSON_DATA).map(key => {
        const item = window.INDIA_GEOJSON_DATA[key];
        return {
          type: 'Feature',
          properties: { name: item.name, id: key },
          geometry: { type: 'Polygon', coordinates: [item.coordinates] }
        };
      });
      this.allFeatures = localFeatures;
      this.globe.polygonsData(localFeatures);
    }

    if (!loaded && !window.INDIA_GEOJSON_DATA) {
      console.warn('[YUGMA Globe] No GeoJSON available — globe will show without state boundaries.');
    }
  }

  _buildStatePinpoints() {
    const statesData = window.YUGMA_STATES_DATA || {};
    const pinpoints = Object.keys(statesData).map(key => {
      const s = statesData[key];
      return {
        id: key,
        name: s.name,
        heritage: s.heritage,
        lat: s.monumentLat || s.lat || (s.coordinates ? s.coordinates[0] : 22),
        lng: s.monumentLng || s.lng || (s.coordinates ? s.coordinates[1] : 78),
        color: s.themeColor || '#c9a24a',
      };
    });

    this.globe
      .htmlElementsData(pinpoints)
      .htmlElement(d => {
        const el = document.createElement('div');
        el.className = 'globe-state-pin';
        el.style.setProperty('--pin-color', d.color);
        el.innerHTML = `
          <div class="pin-card">
            <div class="pin-tag">SACRED MONUMENT</div>
            <div class="pin-monument">${d.heritage}</div>
            <div class="pin-state">${d.name.toUpperCase()}</div>
          </div>
          <div class="pin-beacon">
            <span class="pin-dot"></span>
            <span class="pin-wave"></span>
          </div>
        `;
        el.addEventListener('click', e => {
          e.stopPropagation();
          this.selectStateById(d.id);
        });
        return el;
      });
  }

  selectStateByName(name) {
    const stateKey = this.normalizeStateKey(name);
    this.selectStateById(stateKey, name);
  }

  selectStateById(stateId, displayName = null) {
    const sData = (window.YUGMA_STATES_DATA || {})[stateId] || {
      id: stateId,
      name: displayName || stateId,
      heritage: 'Monument Sanctuary',
      tradition: 'Folk Tradition',
      lat: 22, lng: 78
    };

    this.activeSelectedState = sData.name;

    // Highlight polygon with dynamic border & elevation
    this.globe.polygonAltitude(d => {
      const name = this.getStateName(d);
      const key = this.normalizeStateKey(name);
      return (name === this.activeSelectedState || key === stateId) ? 0.048 : 0.006;
    });
    this.globe.polygonCapColor(this.globe.polygonCapColor());
    this.globe.polygonSideColor(this.globe.polygonSideColor());
    this.globe.polygonStrokeColor(this.globe.polygonStrokeColor());

    // Camera fly-to
    const lat = sData.monumentLat || sData.lat || (sData.coordinates ? sData.coordinates[0] : 22);
    const lng = sData.monumentLng || sData.lng || (sData.coordinates ? sData.coordinates[1] : 78);

    // Stop auto-rotation during selection
    const controls = this.globe.controls();
    if (controls) controls.autoRotate = false;

    this.globe.pointOfView({ lat, lng, altitude: 0.9 }, 1200);

    // Re-enable rotation after 5 seconds
    setTimeout(() => {
      if (controls) controls.autoRotate = true;
    }, 5000);

    if (this.onStateSelect) {
      this.onStateSelect({
        stateId,
        stateName: sData.name,
        heritage: sData.heritage,
        tradition: sData.tradition,
        tagline: sData.tagline,
        rhythm: sData.rhythm
      });
    }

    if (window.yugmaAudio) {
      window.yugmaAudio.playGhungroo();
    }
  }

  focusOnState(stateId) {
    this.selectStateById(stateId);
  }

  resetToIndia() {
    this.activeSelectedState = null;
    this.activeHoveredState = null;
    this.globe.polygonAltitude(() => 0.006);
    this.globe.polygonCapColor(this.globe.polygonCapColor());
    this.globe.polygonSideColor(this.globe.polygonSideColor());
    this.globe.polygonStrokeColor(this.globe.polygonStrokeColor());

    const controls = this.globe.controls();
    if (controls) controls.autoRotate = true;

    this.globe.pointOfView({ lat: 21, lng: 78.96, altitude: 2.1 }, 1400);
  }

  flyToSubcontinent() {
    this.globe.pointOfView({ lat: 21, lng: 78.96, altitude: 1.65 }, 1400);
  }
}

window.YugmaGlobe = YugmaGlobe;
