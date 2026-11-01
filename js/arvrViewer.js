/**
 * YUGMA - AR/VR Heritage Exploration Engine
 * 360° Panoramic WebGL Virtual Reality Tour, WebXR Headset Support,
 * DeviceOrientation Gyroscope Controls, AR Camera Pass-Through & Spatial Hotspots.
 */

class YugmaARVRViewer {
  constructor(modalContainerEl) {
    this.modal = modalContainerEl;
    this.canvas = null;
    this.scene = null;
    this.camera = null;
    this.renderer = null;
    
    this.isVRActive = false;
    this.isARActive = false;
    this.isGyroActive = false;
    
    this.currentState = null;
    this.hotspots = [];
    this.activeLighting = 'torch';
    
    this.lon = 0;
    this.lat = 0;
    this.phi = 0;
    this.theta = 0;
    this.isUserInteracting = false;
    this.onPointerDownPointerX = 0;
    this.onPointerDownPointerY = 0;
    this.onPointerDownLon = 0;
    this.onPointerDownLat = 0;
    
    this.videoStream = null;
    this.speechSynth = window.speechSynthesis;
    
    this.initDOM();
  }

  initDOM() {
    if (!this.modal) return;
    this.modal.innerHTML = `
      <div class="arvr-modal-backdrop"></div>
      <div class="arvr-modal-window">
        <header class="arvr-modal-header">
          <div class="arvr-modal-title-group">
            <span class="arvr-tag">AR / VR IMMERSIVE EXPERIENCE</span>
            <h2 id="arvr-monument-title">AJANTA CAVES</h2>
            <span class="arvr-subtitle" id="arvr-state-subtitle">MAHARASHTRA // SACRED CAVE SANCTUARY</span>
          </div>

          <div class="arvr-toolbar">
            <a class="kage-btn" id="btn-open-vr-studio" href="#" target="_blank" title="Launch Fullscreen 3D WebXR Studio">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
              <span>FULL 3D VR</span>
            </a>
            <button class="kage-btn" id="btn-modal-vr" title="Toggle VR Headset View">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M4 7h16a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2h-4l-3-2-3 2H4a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2z"/><circle cx="8" cy="12" r="2"/><circle cx="16" cy="12" r="2"/></svg>
              <span>VR MODE</span>
            </button>
            <button class="kage-btn" id="btn-modal-ar" title="Toggle AR Camera View">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg>
              <span>AR CAMERA</span>
            </button>
            <button class="kage-btn" id="btn-modal-gyro" title="Toggle Gyroscope">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="9"/><path d="M12 3v18M3 12h18"/></svg>
              <span>GYRO</span>
            </button>
            <button class="kage-btn btn-close-modal" id="btn-close-arvr" title="Close AR/VR Portal">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
              <span>CLOSE</span>
            </button>
          </div>
        </header>

        <div class="arvr-viewport-container" id="arvr-viewport">
          <canvas id="arvr-webgl-canvas"></canvas>
          <video id="arvr-camera-video" autoplay playsinline muted style="display:none;"></video>
        </div>

        <div class="arvr-bottom-hud">
          <div class="hud-lighting-panel">
            <span class="lighting-label">LIGHTING ATMOSPHERE:</span>
            <div class="lighting-pills">
              <button class="light-pill active" data-light="torch">TORCHLIGHT</button>
              <button class="light-pill" data-light="daylight">DAWN LIGHT</button>
              <button class="light-pill" data-light="sunset">SUNSET WARMTH</button>
              <button class="light-pill" data-light="mystic">SACRED GLOW</button>
            </div>
          </div>

          <div class="hud-audio-guide">
            <button class="kage-btn btn-audio-narrate" id="btn-arvr-narrate">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg>
              <span id="arvr-narrate-label">PLAY MONUMENT AUDIO GUIDE</span>
            </button>
          </div>
        </div>

        <!-- Pop-up POI Hotspot Detail Box -->
        <div class="poi-popup" id="poi-detail-popup">
          <button class="btn-close-poi" id="btn-close-poi">✕</button>
          <h4 id="poi-popup-title">Monument Detail</h4>
          <p id="poi-popup-desc">Description of architectural detail.</p>
        </div>
      </div>
    `;

    this.bindDOMEvents();
  }

  bindDOMEvents() {
    document.getElementById('btn-close-arvr').addEventListener('click', () => this.close());
    
    document.getElementById('btn-modal-vr').addEventListener('click', () => this.toggleVR());
    document.getElementById('btn-modal-ar').addEventListener('click', () => this.toggleAR());
    document.getElementById('btn-modal-gyro').addEventListener('click', () => this.toggleGyro());

    document.querySelectorAll('.light-pill').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.light-pill').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.setLighting(btn.dataset.light);
      });
    });

    document.getElementById('btn-arvr-narrate').addEventListener('click', () => this.toggleAudioGuide());
    document.getElementById('btn-close-poi').addEventListener('click', () => {
      document.getElementById('poi-detail-popup').classList.remove('active');
    });
  }

  open(stateData) {
    this.currentState = stateData;
    const fullData = window.YUGMA_STATES_DATA[stateData.stateId] || {};

    document.getElementById('arvr-monument-title').textContent = fullData.heritage || stateData.heritage;
    document.getElementById('arvr-state-subtitle').textContent = `${(fullData.name || stateData.stateName).toUpperCase()} // AR/VR EXPLORATION SANCTUARY`;

    const vrLinkBtn = document.getElementById('btn-open-vr-studio');
    if (vrLinkBtn) {
      const vrPath = (fullData.paths && fullData.paths.arvr) ? fullData.paths.arvr : 'jageshwar-vr.html';
      vrLinkBtn.href = vrPath;
    }

    this.modal.classList.add('active');
    this.initThreeScene();
    this.build360HeritageDome(stateData.stateId);
    this.buildHotspots(fullData.poi || []);

    if (window.yugmaAudio) {
      window.yugmaAudio.playBell(0.9);
    }
  }

  close() {
    this.modal.classList.remove('active');
    this.stopCameraStream();
    if (this.speechSynth) this.speechSynth.cancel();
    if (this.renderer) {
      this.renderer.dispose();
      this.renderer = null;
    }
    this.currentState = null;
  }

  initThreeScene() {
    const container = document.getElementById('arvr-viewport');
    this.canvas = document.getElementById('arvr-webgl-canvas');

    const width = container.clientWidth;
    const height = container.clientHeight;

    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(75, width / height, 1, 1100);
    this.camera.target = new THREE.Vector3(0, 0, 0);

    const isMobile = /Android|iPhone|iPad|iPod|webOS|Windows Phone/i.test(navigator.userAgent) || (window.innerWidth <= 768);
    const maxDpr = isMobile ? 1.25 : 2;

    this.renderer = new THREE.WebGLRenderer({ canvas: this.canvas, antialias: !isMobile, alpha: true, powerPreference: isMobile ? 'default' : 'high-performance' });
    this.renderer.setSize(width, height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, maxDpr));

    // Setup Lighting
    this.ambientLight = new THREE.AmbientLight(0x403020, 1.2);
    this.scene.add(this.ambientLight);

    this.torchLight = new THREE.PointLight(0xff7722, 2.5, 80);
    this.torchLight.position.set(0, 0, 0);
    this.scene.add(this.torchLight);

    this.setupInteractions();
    this.animate();
  }

  /**
   * Procedural High-Detail 360° Photorealistic Heritage Dome Canvas Texture
   */
  generateDomeTexture(stateId) {
    const canvas = document.createElement('canvas');
    canvas.width = 2048;
    canvas.height = 1024;
    const ctx = canvas.getContext('2d');

    const stateThemes = {
      maharashtra: { ceiling: '#120d09', stone: '#2c221a', glow: '#ff7722', pillars: 12, style: 'cave' },
      gujarat: { ceiling: '#0d161a', stone: '#202c33', glow: '#c9a24a', pillars: 16, style: 'stepwell' },
      rajasthan: { ceiling: '#1e140d', stone: '#3d2a1b', glow: '#ff5a3c', pillars: 14, style: 'mirrors' },
      uttar_pradesh: { ceiling: '#14181a', stone: '#e8edf0', glow: '#e0f7fa', pillars: 8, style: 'marble' },
      west_bengal: { ceiling: '#11171a', stone: '#dce5e8', glow: '#ffd54f', pillars: 10, style: 'rotunda' },
      tamil_nadu: { ceiling: '#140c0a', stone: '#2d1c18', glow: '#ff7043', pillars: 16, style: 'granite' },
      karnataka: { ceiling: '#17110e', stone: '#3b2c22', glow: '#ffa726', pillars: 14, style: 'boulders' },
      kerala: { ceiling: '#100a06', stone: '#2b1a10', glow: '#ffb74d', pillars: 12, style: 'wood' },
      odisha: { ceiling: '#140e0a', stone: '#36241a', glow: '#ff5722', pillars: 12, style: 'sundial' },
      assam: { ceiling: '#0d1410', stone: '#202e24', glow: '#ffd54f', pillars: 8, style: 'shikhara' }
    };

    const theme = stateThemes[stateId] || stateThemes.maharashtra;

    // 1. Base Gradient (Ceiling to Subterranean Floor)
    const bgGrad = ctx.createLinearGradient(0, 0, 0, canvas.height);
    bgGrad.addColorStop(0, theme.ceiling);
    bgGrad.addColorStop(0.4, theme.stone);
    bgGrad.addColorStop(0.7, '#070504');
    bgGrad.addColorStop(1, '#020101');
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // 2. Colonnaded Arches & Pillars
    const numPillars = theme.pillars;
    const pillarWidth = canvas.width / numPillars;
    for (let i = 0; i < numPillars; i++) {
      const x = i * pillarWidth;
      
      // Pillar Column
      const pGrad = ctx.createLinearGradient(x, 0, x + pillarWidth * 0.35, 0);
      pGrad.addColorStop(0, 'rgba(0,0,0,0.6)');
      pGrad.addColorStop(0.4, theme.stone);
      pGrad.addColorStop(0.7, 'rgba(255,255,255,0.08)');
      pGrad.addColorStop(1, 'rgba(0,0,0,0.7)');
      ctx.fillStyle = pGrad;
      ctx.fillRect(x + pillarWidth * 0.15, canvas.height * 0.35, pillarWidth * 0.35, canvas.height * 0.5);

      // Carved Capital / Arch
      ctx.fillStyle = theme.stone;
      ctx.beginPath();
      ctx.arc(x + pillarWidth * 0.325, canvas.height * 0.35, pillarWidth * 0.28, Math.PI, 0);
      ctx.fill();
    }

    // 3. Sacred Central Sanctum Light Glow
    const sanctumX = canvas.width * 0.5;
    const sanctumY = canvas.height * 0.5;
    const glowGrad = ctx.createRadialGradient(sanctumX, sanctumY, 20, sanctumX, sanctumY, 400);
    glowGrad.addColorStop(0, theme.glow);
    glowGrad.addColorStop(0.3, 'rgba(255, 120, 40, 0.25)');
    glowGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = glowGrad;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // 4. Fresco Textural Noise & Bas-Relief Grooves
    ctx.fillStyle = 'rgba(255,255,255,0.03)';
    for (let j = 0; j < 3000; j++) {
      const rx = Math.random() * canvas.width;
      const ry = canvas.height * 0.3 + Math.random() * canvas.height * 0.5;
      ctx.fillRect(rx, ry, Math.random() * 4, Math.random() * 4);
    }

    const texture = new THREE.CanvasTexture(canvas);
    return texture;
  }

  build360HeritageDome(stateId) {
    const domeGeo = new THREE.SphereGeometry(500, 60, 40);
    domeGeo.scale(-1, 1, 1); // Invert sphere to view from inside

    const texture = this.generateDomeTexture(stateId);
    const domeMat = new THREE.MeshBasicMaterial({ map: texture });

    this.domeMesh = new THREE.Mesh(domeGeo, domeMat);
    this.scene.add(this.domeMesh);
  }

  buildHotspots(poiList) {
    this.hotspots.forEach(h => this.scene.remove(h));
    this.hotspots = [];

    poiList.forEach((poi, index) => {
      const radius = 280;
      const x = poi.pos[0] * radius;
      const y = poi.pos[1] * radius;
      const z = poi.pos[2] * radius;

      const hotspotGeo = new THREE.SphereGeometry(7, 16, 16);
      const hotspotMat = new THREE.MeshBasicMaterial({
        color: 0xffd54f,
        transparent: true,
        opacity: 0.85
      });

      const hotspot = new THREE.Mesh(hotspotGeo, hotspotMat);
      hotspot.position.set(x, y, z);
      hotspot.userData = { poi: poi, index: index };
      
      this.scene.add(hotspot);
      this.hotspots.push(hotspot);
    });
  }

  setupInteractions() {
    const dom = this.canvas;

    const onPointerDown = e => {
      this.isUserInteracting = true;
      const clientX = e.clientX || (e.touches && e.touches[0].clientX);
      const clientY = e.clientY || (e.touches && e.touches[0].clientY);

      this.onPointerDownPointerX = clientX;
      this.onPointerDownPointerY = clientY;
      this.onPointerDownLon = this.lon;
      this.onPointerDownLat = this.lat;
    };

    const onPointerMove = e => {
      if (!this.isUserInteracting) return;
      const clientX = e.clientX || (e.touches && e.touches[0].clientX);
      const clientY = e.clientY || (e.touches && e.touches[0].clientY);

      this.lon = (this.onPointerDownPointerX - clientX) * 0.15 + this.onPointerDownLon;
      this.lat = (clientY - this.onPointerDownPointerY) * 0.15 + this.onPointerDownLat;
    };

    const onPointerUp = () => {
      this.isUserInteracting = false;
    };

    dom.addEventListener('mousedown', onPointerDown);
    dom.addEventListener('mousemove', onPointerMove);
    window.addEventListener('mouseup', onPointerUp);

    dom.addEventListener('touchstart', onPointerDown, { passive: true });
    dom.addEventListener('touchmove', onPointerMove, { passive: true });
    window.addEventListener('touchend', onPointerUp);

    // Raycast Hotspot Clicks
    dom.addEventListener('click', e => {
      const rect = dom.getBoundingClientRect();
      const mouse = new THREE.Vector2(
        ((e.clientX - rect.left) / rect.width) * 2 - 1,
        -((e.clientY - rect.top) / rect.height) * 2 + 1
      );

      const raycaster = new THREE.Raycaster();
      raycaster.setFromCamera(mouse, this.camera);
      const hits = raycaster.intersectObjects(this.hotspots);

      if (hits.length > 0) {
        const poi = hits[0].object.userData.poi;
        this.showPOIPopup(poi);
      }
    });

    window.addEventListener('resize', () => {
      const container = document.getElementById('arvr-viewport');
      if (!container || !this.renderer) return;
      this.camera.aspect = container.clientWidth / container.clientHeight;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(container.clientWidth, container.clientHeight);
    });
  }

  showPOIPopup(poi) {
    const popup = document.getElementById('poi-detail-popup');
    document.getElementById('poi-popup-title').textContent = poi.title;
    document.getElementById('poi-popup-desc').textContent = poi.desc;
    popup.classList.add('active');

    if (window.yugmaAudio) {
      window.yugmaAudio.playClick();
    }
  }

  setLighting(mode) {
    this.activeLighting = mode;
    if (!this.ambientLight || !this.torchLight) return;

    if (mode === 'torch') {
      this.ambientLight.color.setHex(0x402518);
      this.torchLight.color.setHex(0xff7722);
      this.torchLight.intensity = 2.8;
    } else if (mode === 'daylight') {
      this.ambientLight.color.setHex(0xd0e8f0);
      this.torchLight.color.setHex(0xfffaed);
      this.torchLight.intensity = 1.4;
    } else if (mode === 'sunset') {
      this.ambientLight.color.setHex(0x5c2b18);
      this.torchLight.color.setHex(0xff5722);
      this.torchLight.intensity = 3.2;
    } else if (mode === 'mystic') {
      this.ambientLight.color.setHex(0x1a2b3c);
      this.torchLight.color.setHex(0xffd54f);
      this.torchLight.intensity = 2.0;
    }
  }

  toggleVR() {
    this.isVRActive = !this.isVRActive;
    const btn = document.getElementById('btn-modal-vr');
    btn.classList.toggle('active', this.isVRActive);

    if (this.isVRActive) {
      this.camera.fov = 60;
      this.camera.updateProjectionMatrix();
      if (window.yugmaAudio) window.yugmaAudio.playBell(1.2);
    } else {
      this.camera.fov = 75;
      this.camera.updateProjectionMatrix();
    }
  }

  async toggleAR() {
    this.isARActive = !this.isARActive;
    const btn = document.getElementById('btn-modal-ar');
    const video = document.getElementById('arvr-camera-video');
    btn.classList.toggle('active', this.isARActive);

    if (this.isARActive) {
      try {
        this.videoStream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: 'environment' }
        });
        video.srcObject = this.videoStream;
        video.style.display = 'block';
        if (this.domeMesh) this.domeMesh.material.opacity = 0.45;
        this.domeMesh.material.transparent = true;
      } catch (err) {
        console.warn('Camera access not granted for AR pass-through', err);
        btn.classList.remove('active');
        this.isARActive = false;
      }
    } else {
      this.stopCameraStream();
      video.style.display = 'none';
      if (this.domeMesh) this.domeMesh.material.opacity = 1.0;
    }
  }

  stopCameraStream() {
    if (this.videoStream) {
      this.videoStream.getTracks().forEach(t => t.stop());
      this.videoStream = null;
    }
  }

  toggleGyro() {
    this.isGyroActive = !this.isGyroActive;
    const btn = document.getElementById('btn-modal-gyro');
    btn.classList.toggle('active', this.isGyroActive);

    if (this.isGyroActive && typeof DeviceOrientationEvent !== 'undefined') {
      if (typeof DeviceOrientationEvent.requestPermission === 'function') {
        DeviceOrientationEvent.requestPermission().then(state => {
          if (state === 'granted') {
            window.addEventListener('deviceorientation', e => this.handleGyro(e), { passive: true });
          }
        });
      } else {
        window.addEventListener('deviceorientation', e => this.handleGyro(e), { passive: true });
      }
    }
  }

  handleGyro(e) {
    if (!this.isGyroActive || !e.alpha) return;
    this.lon = e.alpha + (e.gamma || 0);
    this.lat = (e.beta || 0) - 90;
  }

  toggleAudioGuide() {
    if (!this.speechSynth || !this.currentState) return;
    
    if (this.speechSynth.speaking) {
      this.speechSynth.cancel();
      document.getElementById('arvr-narrate-label').textContent = 'PLAY MONUMENT AUDIO GUIDE';
      return;
    }

    const fullData = window.YUGMA_STATES_DATA[this.currentState.stateId] || {};
    const text = `Welcome to the AR VR exploration of ${fullData.heritage || this.currentState.heritage} in ${fullData.name || this.currentState.stateName}. ${fullData.tagline}. Look around in 360 degrees to explore sacred sanctums, rock-cut architecture, and ancient artistic masterworks.`;

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.95;
    utterance.pitch = 1.0;

    utterance.onend = () => {
      document.getElementById('arvr-narrate-label').textContent = 'PLAY MONUMENT AUDIO GUIDE';
    };

    document.getElementById('arvr-narrate-label').textContent = 'PAUSE AUDIO GUIDE';
    this.speechSynth.speak(utterance);
  }

  animate() {
    if (!this.modal.classList.contains('active')) return;
    requestAnimationFrame(() => this.animate());

    this.lat = Math.max(-85, Math.min(85, this.lat));
    this.phi = THREE.MathUtils.degToRad(90 - this.lat);
    this.theta = THREE.MathUtils.degToRad(this.lon);

    const targetX = 500 * Math.sin(this.phi) * Math.cos(this.theta);
    const targetY = 500 * Math.cos(this.phi);
    const targetZ = 500 * Math.sin(this.phi) * Math.sin(this.theta);

    this.camera.lookAt(targetX, targetY, targetZ);

    // Pulse Hotspots
    const time = Date.now() * 0.003;
    this.hotspots.forEach(h => {
      const s = 1 + Math.sin(time + h.userData.index) * 0.2;
      h.scale.set(s, s, s);
    });

    if (this.renderer && this.scene && this.camera) {
      this.renderer.render(this.scene, this.camera);
    }
  }
}

/**
 * YUGMA - Standalone AR/VR Engine Controller
 * Automatically executes when a standalone state AR/VR page is loaded.
 */
class YugmaStandaloneARVR {
  constructor() {
    this.canvas = document.getElementById('arvr-canvas');
    if (!this.canvas) return;

    this.stateId = (document.body.dataset.state || this.inferStateFromURL()).toLowerCase();
    this.heritageName = document.body.dataset.heritage || 'Sacred Heritage Monument';

    this.scene = null;
    this.camera = null;
    this.renderer = null;
    this.domeMesh = null;
    this.hotspots = [];

    this.isVRActive = false;
    this.isARActive = false;
    this.isGyroActive = false;
    this.activeLighting = 'torch';

    this.lon = 0;
    this.lat = 0;
    this.phi = 0;
    this.theta = 0;
    this.isUserInteracting = false;
    this.onPointerDownPointerX = 0;
    this.onPointerDownPointerY = 0;
    this.onPointerDownLon = 0;
    this.onPointerDownLat = 0;

    this.videoStream = null;
    this.speechSynth = window.speechSynthesis;

    this.init();
  }

  inferStateFromURL() {
    const path = window.location.pathname.toLowerCase();
    if (path.includes('gujarat')) return 'gujarat';
    if (path.includes('maharashtra')) return 'maharashtra';
    if (path.includes('rajasthan')) return 'rajasthan';
    if (path.includes('uttar_pradesh')) return 'uttar_pradesh';
    if (path.includes('west_bengal')) return 'west_bengal';
    if (path.includes('tamil_nadu')) return 'tamil_nadu';
    if (path.includes('karnataka')) return 'karnataka';
    if (path.includes('kerala')) return 'kerala';
    if (path.includes('odisha')) return 'odisha';
    if (path.includes('assam')) return 'assam';
    if (path.includes('uttarakhand')) return 'uttarakhand';
    if (path.includes('tripura')) return 'tripura';
    return 'gujarat';
  }

  getStatePOIs() {
    const poiDB = {
      gujarat: [
        { title: "Sheshashayi Vishnu Relief", desc: "Lord Vishnu reclining upon the thousand-headed serpent Shesha amidst the subterranean tiers.", pos: [0.0, -0.4, -0.9] },
        { title: "Apsara Shringar Panel", desc: "Celestial nymphs applying collyrium, adjusting earrings, and braiding pearl strands in intricate Solanki relief.", pos: [-0.8, 0.2, -0.5] },
        { title: "7th Tier Water Shaft", desc: "Deep circular well shaft lined with 500 principal sculptures and over a thousand minor ones.", pos: [0.7, -0.4, 0.6] }
      ],
      maharashtra: [
        { title: "Padmapani Bodhisattva", desc: "Master Cave 1 fresco depicting infinite compassion, holding a sacred blue lotus.", pos: [0.6, 0.2, -0.8] },
        { title: "Chaitya Stupa Vault", desc: "Monumental ribbed rock ceiling and central votive stupa.", pos: [-0.7, 0.4, -0.6] },
        { title: "Vihara Monastic Cells", desc: "Monolithic stone residential chambers carved directly out of the basalt cliffs.", pos: [0.8, -0.3, 0.5] }
      ],
      rajasthan: [
        { title: "Sheesh Mahal Mirrors", desc: "Vaulted ceiling inlaid with thousands of concave Belgian glass mirrors that glow with a single candle.", pos: [0.0, 0.6, -0.8] },
        { title: "Ganesh Pol Gateway", desc: "Multi-storied painted gateway leading into the private royal zenana.", pos: [-0.7, 0.3, -0.6] },
        { title: "Sukh Niwas Water Cascade", desc: "Subterranean marble channels designed for natural evaporative palace air conditioning.", pos: [0.6, -0.2, 0.7] }
      ],
      uttar_pradesh: [
        { title: "Marble Cenotaph Screen", desc: "Octagonal carved marble jali inlaid with 28 types of precious and semi-precious gems.", pos: [0.0, -0.2, -0.9] },
        { title: "Parchin Kari Floral Inlay", desc: "Intricate lapis lazuli, jade, and carnelian pietra dura work embedded into Makrana white marble.", pos: [-0.6, 0.4, -0.7] },
        { title: "Calligraphic Iwan Portal", desc: "Monumental Thuluth script Quranic inscriptions designed with optical perspective correction.", pos: [0.7, 0.5, 0.5] }
      ],
      west_bengal: [
        { title: "Central Rotunda Dome", desc: "Grand high-vaulted marble rotunda adorned with French historical fresco paintings.", pos: [0.0, 0.8, -0.6] },
        { title: "Royal Gallery Collection", desc: "Historic oil paintings and portraiture from the Bengal Renaissance.", pos: [-0.8, 0.1, -0.6] },
        { title: "Reflecting Pool Vista", desc: "Twin lakes mirroring the Indo-Saracenic Italian marble facade.", pos: [0.5, -0.4, 0.8] }
      ],
      tamil_nadu: [
        { title: "66m Dakshina Meru Vimana", desc: "Towering 16-tiered granite sanctuary crowned by an 81-tonne monolithic octagonal capstone.", pos: [0.0, 0.7, -0.7] },
        { title: "108 Karana Dance Reliefs", desc: "Ancient stone sculptures depicting the classical Natya Shastra Shiva dance postures.", pos: [-0.7, 0.2, -0.6] },
        { title: "Monolithic Nandi Pavilion", desc: "20-tonne sacred bull carved from a single massive granite boulder.", pos: [0.6, -0.3, 0.7] }
      ],
      karnataka: [
        { title: "Monolithic Stone Chariot", desc: "Iconic Vijaya Vittala temple shrine dedicated to Garuda with rotating stone wheels.", pos: [0.0, 0.1, -0.9] },
        { title: "56 Musical Pillars", desc: "Acoustic granite columns that emit distinct musical notes (Sa Re Ga Ma) when gently tapped.", pos: [-0.8, 0.3, -0.5] },
        { title: "Virupaksha Gopuram", desc: "50-meter ancient gateway tower rising over the sacred Tungabhadra River.", pos: [0.7, 0.5, 0.5] }
      ],
      kerala: [
        { title: "Black Herbal Mirror Floor", desc: "300-year-old glossy floor made with burnt coconut shells, egg whites, and 64 medicinal herbal extracts.", pos: [0.0, -0.6, -0.8] },
        { title: "Mantrasala Council Room", desc: "Carved teak wooden ceiling with 90 distinct botanical and floral motifs.", pos: [-0.7, 0.4, -0.6] },
        { title: "Upparika Malika Murals", desc: "41 sacred 18th-century Travancore temple fresco paintings depicting epic lore.", pos: [0.6, 0.5, 0.6] }
      ],
      odisha: [
        { title: "24 Astronomical Sundial Wheels", desc: "Intricately carved 3-meter wheels capable of measuring solar time down to the minute.", pos: [0.0, 0.0, -0.9] },
        { title: "Nata Mandira Dance Hall", desc: "Detached hypostyle pavilion covered with hundreds of celestial dancer friezes.", pos: [-0.8, 0.3, -0.5] },
        { title: "Green Chlorite Surya Idol", desc: "Master sculpture positioned to capture the direct first rays of dawn through the eastern portal.", pos: [0.7, 0.4, 0.6] }
      ],
      assam: [
        { title: "32m Nilachala Shikhara", desc: "Tallest historic stone spire in Northeast India built with sticky-rice and duck-egg mortar.", pos: [0.0, 0.8, -0.6] },
        { title: "8-Foot Pure Gold Kalash", desc: "Authentic 2.5-meter golden dome crowning the temple apex since 1734 CE.", pos: [0.0, 1.0, -0.4] },
        { title: "Borpukhuri Lake Bank", desc: "Vast 257-acre historic reservoir that has never dried in over 300 years.", pos: [0.8, -0.3, 0.5] }
      ]
    };

    return poiDB[this.stateId] || poiDB.gujarat;
  }

  init() {
    if (typeof THREE === 'undefined') {
      console.warn('[YUGMA AR/VR] Three.js not loaded, retrying...');
      setTimeout(() => this.init(), 200);
      return;
    }

    const W = window.innerWidth;
    const H = window.innerHeight;

    // 1. Scene & Camera
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(75, W / H, 1, 1100);
    this.camera.target = new THREE.Vector3(0, 0, 0);

    // 2. Renderer with Adaptive Device Optimization
    const isMobile = /Android|iPhone|iPad|iPod|webOS|Windows Phone/i.test(navigator.userAgent) || (window.innerWidth <= 768);
    const maxDpr = isMobile ? 1.25 : 2;

    this.renderer = new THREE.WebGLRenderer({ canvas: this.canvas, antialias: !isMobile, alpha: true, powerPreference: isMobile ? 'default' : 'high-performance' });
    this.renderer.setSize(W, H);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, maxDpr));

    // 3. Lighting
    this.ambientLight = new THREE.AmbientLight(0x403020, 1.4);
    this.scene.add(this.ambientLight);

    this.torchLight = new THREE.PointLight(0xff7722, 2.8, 120);
    this.torchLight.position.set(0, 0, 0);
    this.scene.add(this.torchLight);

    // 4. Build 360 Panoramic Dome
    this.build360Dome();

    // 5. Build Hotspots
    this.buildHotspots();

    // 6. Setup Interactions & UI
    this.setupInteractions();
    this.setupUI();

    // 7. Render Loop
    this.animate();

    console.log(`[YUGMA AR/VR] Standalone AR/VR initialized successfully for ${this.stateId} (${this.heritageName})`);
  }

  generateDomeTexture() {
    const canvas = document.createElement('canvas');
    canvas.width = 2048;
    canvas.height = 1024;
    const ctx = canvas.getContext('2d');

    const stateThemes = {
      maharashtra: { ceiling: '#120d09', stone: '#2c221a', glow: '#ff7722', pillars: 12 },
      gujarat: { ceiling: '#0d161a', stone: '#202c33', glow: '#c9a24a', pillars: 16 },
      rajasthan: { ceiling: '#1e140d', stone: '#3d2a1b', glow: '#ff5a3c', pillars: 14 },
      uttar_pradesh: { ceiling: '#14181a', stone: '#e8edf0', glow: '#e0f7fa', pillars: 8 },
      west_bengal: { ceiling: '#11171a', stone: '#dce5e8', glow: '#ffd54f', pillars: 10 },
      tamil_nadu: { ceiling: '#140c0a', stone: '#2d1c18', glow: '#ff7043', pillars: 16 },
      karnataka: { ceiling: '#17110e', stone: '#3b2c22', glow: '#ffa726', pillars: 14 },
      kerala: { ceiling: '#100a06', stone: '#2b1a10', glow: '#ffb74d', pillars: 12 },
      odisha: { ceiling: '#140e0a', stone: '#36241a', glow: '#ff5722', pillars: 12 },
      assam: { ceiling: '#0d1410', stone: '#202e24', glow: '#ffd54f', pillars: 8 }
    };

    const theme = stateThemes[this.stateId] || stateThemes.gujarat;

    // 1. Base Gradient
    const bgGrad = ctx.createLinearGradient(0, 0, 0, canvas.height);
    bgGrad.addColorStop(0, theme.ceiling);
    bgGrad.addColorStop(0.35, theme.stone);
    bgGrad.addColorStop(0.7, '#070504');
    bgGrad.addColorStop(1, '#020101');
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // 2. Colonnaded Pillars & Vaulted Arches
    const numPillars = theme.pillars;
    const pillarWidth = canvas.width / numPillars;
    for (let i = 0; i < numPillars; i++) {
      const x = i * pillarWidth;
      
      const pGrad = ctx.createLinearGradient(x, 0, x + pillarWidth * 0.35, 0);
      pGrad.addColorStop(0, 'rgba(0,0,0,0.65)');
      pGrad.addColorStop(0.4, theme.stone);
      pGrad.addColorStop(0.7, 'rgba(255,255,255,0.1)');
      pGrad.addColorStop(1, 'rgba(0,0,0,0.75)');
      ctx.fillStyle = pGrad;
      ctx.fillRect(x + pillarWidth * 0.15, canvas.height * 0.32, pillarWidth * 0.35, canvas.height * 0.55);

      ctx.fillStyle = theme.stone;
      ctx.beginPath();
      ctx.arc(x + pillarWidth * 0.325, canvas.height * 0.32, pillarWidth * 0.28, Math.PI, 0);
      ctx.fill();
    }

    // 3. Sacred Central Sanctum Light Glow
    const sanctumX = canvas.width * 0.5;
    const sanctumY = canvas.height * 0.5;
    const glowGrad = ctx.createRadialGradient(sanctumX, sanctumY, 20, sanctumX, sanctumY, 420);
    glowGrad.addColorStop(0, theme.glow);
    glowGrad.addColorStop(0.3, 'rgba(255, 130, 40, 0.28)');
    glowGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = glowGrad;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // 4. Fresco Textural Noise & Relief Grooves
    ctx.fillStyle = 'rgba(255,255,255,0.035)';
    for (let j = 0; j < 3500; j++) {
      const rx = Math.random() * canvas.width;
      const ry = canvas.height * 0.25 + Math.random() * canvas.height * 0.6;
      ctx.fillRect(rx, ry, Math.random() * 4, Math.random() * 4);
    }

    return new THREE.CanvasTexture(canvas);
  }

  build360Dome() {
    const domeGeo = new THREE.SphereGeometry(500, 60, 40);
    domeGeo.scale(-1, 1, 1);

    const texture = this.generateDomeTexture();
    const domeMat = new THREE.MeshBasicMaterial({ map: texture });

    this.domeMesh = new THREE.Mesh(domeGeo, domeMat);
    this.scene.add(this.domeMesh);
  }

  buildHotspots() {
    const pois = this.getStatePOIs();
    pois.forEach((poi, index) => {
      const radius = 280;
      const x = poi.pos[0] * radius;
      const y = poi.pos[1] * radius;
      const z = poi.pos[2] * radius;

      const hotspotGeo = new THREE.SphereGeometry(8, 16, 16);
      const hotspotMat = new THREE.MeshBasicMaterial({
        color: 0xffd54f,
        transparent: true,
        opacity: 0.9
      });

      const hotspot = new THREE.Mesh(hotspotGeo, hotspotMat);
      hotspot.position.set(x, y, z);
      hotspot.userData = { poi: poi, index: index };

      this.scene.add(hotspot);
      this.hotspots.push(hotspot);
    });
  }

  setupInteractions() {
    const dom = this.canvas;

    const onPointerDown = e => {
      this.isUserInteracting = true;
      const clientX = e.clientX || (e.touches && e.touches[0].clientX);
      const clientY = e.clientY || (e.touches && e.touches[0].clientY);

      this.onPointerDownPointerX = clientX;
      this.onPointerDownPointerY = clientY;
      this.onPointerDownLon = this.lon;
      this.onPointerDownLat = this.lat;
    };

    const onPointerMove = e => {
      if (!this.isUserInteracting) return;
      const clientX = e.clientX || (e.touches && e.touches[0].clientX);
      const clientY = e.clientY || (e.touches && e.touches[0].clientY);

      this.lon = (this.onPointerDownPointerX - clientX) * 0.15 + this.onPointerDownLon;
      this.lat = (clientY - this.onPointerDownPointerY) * 0.15 + this.onPointerDownLat;
    };

    const onPointerUp = () => {
      this.isUserInteracting = false;
    };

    dom.addEventListener('mousedown', onPointerDown);
    dom.addEventListener('mousemove', onPointerMove);
    window.addEventListener('mouseup', onPointerUp);

    dom.addEventListener('touchstart', onPointerDown, { passive: true });
    dom.addEventListener('touchmove', onPointerMove, { passive: true });
    window.addEventListener('touchend', onPointerUp);

    // Zoom on wheel
    window.addEventListener('wheel', e => {
      this.camera.fov = Math.max(35, Math.min(95, this.camera.fov + e.deltaY * 0.05));
      this.camera.updateProjectionMatrix();
    }, { passive: true });

    // Click on Hotspots
    dom.addEventListener('click', e => {
      const rect = dom.getBoundingClientRect();
      const mouse = new THREE.Vector2(
        ((e.clientX - rect.left) / rect.width) * 2 - 1,
        -((e.clientY - rect.top) / rect.height) * 2 + 1
      );

      const raycaster = new THREE.Raycaster();
      raycaster.setFromCamera(mouse, this.camera);
      const hits = raycaster.intersectObjects(this.hotspots);

      if (hits.length > 0) {
        const poi = hits[0].object.userData.poi;
        this.showPOIPopup(poi);
      }
    });

    window.addEventListener('resize', () => {
      const W = window.innerWidth;
      const H = window.innerHeight;
      this.camera.aspect = W / H;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(W, H);
    });
  }

  showPOIPopup(poi) {
    let popup = document.getElementById('standalone-poi-card');
    if (!popup) {
      popup = document.createElement('div');
      popup.id = 'standalone-poi-card';
      popup.className = 'standalone-poi-card';
      popup.innerHTML = `
        <button class="btn-close-card" id="btn-close-standalone-poi">✕</button>
        <h4 id="standalone-poi-title">Hotspot</h4>
        <p id="standalone-poi-desc">Description</p>
      `;
      document.body.appendChild(popup);

      document.getElementById('btn-close-standalone-poi').addEventListener('click', () => {
        popup.classList.remove('active');
      });
    }

    document.getElementById('standalone-poi-title').textContent = poi.title;
    document.getElementById('standalone-poi-desc').textContent = poi.desc;
    popup.classList.add('active');
  }

  setupUI() {
    // 1. VR Headset Button
    const btnVR = document.getElementById('btn-mode-vr');
    if (btnVR) {
      btnVR.addEventListener('click', () => {
        this.isVRActive = !this.isVRActive;
        btnVR.classList.toggle('active', this.isVRActive);
        this.camera.fov = this.isVRActive ? 55 : 75;
        this.camera.updateProjectionMatrix();
      });
    }

    // 2. AR Camera Button
    const btnAR = document.getElementById('btn-mode-ar');
    const video = document.getElementById('ar-video');
    if (btnAR && video) {
      btnAR.addEventListener('click', async () => {
        this.isARActive = !this.isARActive;
        btnAR.classList.toggle('active', this.isARActive);

        if (this.isARActive) {
          try {
            this.videoStream = await navigator.mediaDevices.getUserMedia({
              video: { facingMode: 'environment' }
            });
            video.srcObject = this.videoStream;
            video.style.display = 'block';
            if (this.domeMesh) this.domeMesh.material.opacity = 0.45;
            this.domeMesh.material.transparent = true;
          } catch (err) {
            console.warn('Camera access unavailable:', err);
            btnAR.classList.remove('active');
            this.isARActive = false;
          }
        } else {
          if (this.videoStream) {
            this.videoStream.getTracks().forEach(t => t.stop());
            this.videoStream = null;
          }
          video.style.display = 'none';
          if (this.domeMesh) this.domeMesh.material.opacity = 1.0;
        }
      });
    }

    // 3. Gyroscope Button
    const btnGyro = document.getElementById('btn-gyro');
    if (btnGyro) {
      btnGyro.addEventListener('click', () => {
        this.isGyroActive = !this.isGyroActive;
        btnGyro.classList.toggle('active', this.isGyroActive);

        if (this.isGyroActive && typeof DeviceOrientationEvent !== 'undefined') {
          if (typeof DeviceOrientationEvent.requestPermission === 'function') {
            DeviceOrientationEvent.requestPermission().then(state => {
              if (state === 'granted') {
                window.addEventListener('deviceorientation', e => this.handleGyro(e), { passive: true });
              }
            });
          } else {
            window.addEventListener('deviceorientation', e => this.handleGyro(e), { passive: true });
          }
        }
      });
    }

    // 4. Lighting Presets
    document.querySelectorAll('.light-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.light-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.setLighting(btn.dataset.light);
      });
    });

    // 5. Audio Guide Button
    const btnAudio = document.getElementById('btn-audio-guide');
    if (btnAudio) {
      btnAudio.addEventListener('click', () => {
        if (!this.speechSynth) return;

        if (this.speechSynth.speaking) {
          this.speechSynth.cancel();
          btnAudio.classList.remove('speaking');
          btnAudio.querySelector('span').textContent = `AUDIO GUIDE: ${this.heritageName.toUpperCase()}`;
          return;
        }

        const text = `Welcome to the 360° virtual reality exploration of ${this.heritageName} in ${this.stateId.toUpperCase()}. Look around in all directions to immerse yourself in sacred architectural wonders, carved sandstone tiers, and ancient Indian art.`;
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = 0.92;
        utterance.pitch = 1.0;

        utterance.onend = () => {
          btnAudio.classList.remove('speaking');
          btnAudio.querySelector('span').textContent = `AUDIO GUIDE: ${this.heritageName.toUpperCase()}`;
        };

        btnAudio.classList.add('speaking');
        btnAudio.querySelector('span').textContent = 'PAUSE AUDIO GUIDE';
        this.speechSynth.speak(utterance);
      });
    }

    // 6. Return to 3D Globe Button in Header
    const headerControls = document.querySelector('.arvr-controls-top');
    if (headerControls && !document.getElementById('btn-back-globe-standalone')) {
      const returnBtn = document.createElement('a');
      returnBtn.id = 'btn-back-globe-standalone';
      returnBtn.className = 'kage-btn';
      returnBtn.href = '../../../../../index.html';
      returnBtn.title = 'Return to 3D Earth Globe';
      returnBtn.innerHTML = `
        <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.8"><polyline points="15 18 9 12 15 6"></polyline></svg>
        <span>GLOBE</span>
      `;
      headerControls.insertBefore(returnBtn, headerControls.firstChild);
    }
  }

  handleGyro(e) {
    if (!this.isGyroActive || !e.alpha) return;
    this.lon = e.alpha + (e.gamma || 0);
    this.lat = (e.beta || 0) - 90;
  }

  setLighting(mode) {
    this.activeLighting = mode;
    if (!this.ambientLight || !this.torchLight) return;

    if (mode === 'torch') {
      this.ambientLight.color.setHex(0x402518);
      this.torchLight.color.setHex(0xff7722);
      this.torchLight.intensity = 2.8;
    } else if (mode === 'daylight') {
      this.ambientLight.color.setHex(0xd0e8f0);
      this.torchLight.color.setHex(0xfffaed);
      this.torchLight.intensity = 1.6;
    } else if (mode === 'mystic') {
      this.ambientLight.color.setHex(0x1a2b3c);
      this.torchLight.color.setHex(0xffd54f);
      this.torchLight.intensity = 2.2;
    }
  }

  animate() {
    requestAnimationFrame(() => this.animate());

    this.lat = Math.max(-85, Math.min(85, this.lat));
    this.phi = THREE.MathUtils.degToRad(90 - this.lat);
    this.theta = THREE.MathUtils.degToRad(this.lon);

    const targetX = 500 * Math.sin(this.phi) * Math.cos(this.theta);
    const targetY = 500 * Math.cos(this.phi);
    const targetZ = 500 * Math.sin(this.phi) * Math.sin(this.theta);

    this.camera.lookAt(targetX, targetY, targetZ);

    // Pulse Hotspots
    const time = Date.now() * 0.003;
    this.hotspots.forEach(h => {
      const s = 1 + Math.sin(time + h.userData.index) * 0.2;
      h.scale.set(s, s, s);
    });

    if (this.renderer && this.scene && this.camera) {
      this.renderer.render(this.scene, this.camera);
    }
  }
}

// Auto-run if opened as a standalone AR/VR page
if (typeof window !== 'undefined') {
  window.YugmaARVRViewer = YugmaARVRViewer;
  window.YugmaStandaloneARVR = YugmaStandaloneARVR;

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      if (document.body && (document.body.classList.contains('arvr-standalone') || document.getElementById('arvr-canvas'))) {
        new YugmaStandaloneARVR();
      }
    });
  } else {
    if (document.body && (document.body.classList.contains('arvr-standalone') || document.getElementById('arvr-canvas'))) {
      new YugmaStandaloneARVR();
    }
  }
}

