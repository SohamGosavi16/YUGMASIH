/**
 * YUGMA - Master Application Controller
 * Manages Cinematic Intro, 3D Globe, State Machine,
 * Dynamic State Menu, AR/VR, 3D Tradition Studio, and Digital Book.
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize Audio Engine & UI Elements
  const preloader = document.getElementById('preloader');
  const heroIntro = document.getElementById('hero-intro');
  const globeContainer = document.getElementById('globe-canvas-container');
  const audioToggleBtn = document.getElementById('btn-audio-toggle');
  
  // Modals & HUD Containers
  const stateMenuContainer = document.getElementById('state-menu-container');
  const arvrModalContainer = document.getElementById('arvr-modal-container');
  const traditionModalContainer = document.getElementById('tradition-modal-container');
  const bookModalContainer = document.getElementById('book-modal-container');
  const stateListDropdown = document.getElementById('state-select-dropdown');

  let globeInstance = null;
  let stateMenuInstance = null;
  let arvrInstance = null;
  let traditionInstance = null;
  let bookInstance = null;

  // 3. Audio Toggle Listener
  if (audioToggleBtn) {
    audioToggleBtn.addEventListener('click', () => {
      if (window.yugmaAudio) {
        const isSoundOn = window.yugmaAudio.toggleMute();
        audioToggleBtn.classList.toggle('active', isSoundOn);
        const label = audioToggleBtn.querySelector('.audio-label') || document.getElementById('audio-label');
        if (label) label.textContent = isSoundOn ? 'SOUND' : 'MUTED';
      }
    });
  }

  // 4. Initialize Modals & Engines
  arvrInstance = new YugmaARVRViewer(arvrModalContainer);
  traditionInstance = new YugmaTraditionViewer(traditionModalContainer);
  bookInstance = new YugmaDigitalBook(bookModalContainer);

  stateMenuInstance = new YugmaStateMenu(stateMenuContainer, {
    onOpenARVR: stateData => arvrInstance.open(stateData),
    onOpenTradition: stateData => traditionInstance.open(stateData),
    onOpenInfo: stateData => bookInstance.open(stateData),
    onBackToGlobe: () => {
      if (globeInstance) globeInstance.resetToIndia();
    }
  });

  // 5. Initialize 3D Globe
  globeInstance = new YugmaGlobe(globeContainer, stateData => {
    stateMenuInstance.show(stateData);
  });

  // 6. Quick State Switcher Select Menu
  if (stateListDropdown) {
    stateListDropdown.addEventListener('change', e => {
      const selectedId = e.target.value;
      if (selectedId && globeInstance) {
        globeInstance.focusOnState(selectedId);
        // Reset dropdown display
        stateListDropdown.selectedIndex = 0;
      }
    });
  }

  // 7. Cinematic Intro Sequence Handler
  const btnEnterApp = document.getElementById('btn-enter-yugma');
  if (btnEnterApp) {
    btnEnterApp.addEventListener('click', () => {
      // Start audio
      if (window.yugmaAudio) {
        window.yugmaAudio.init();
        window.yugmaAudio.toggleMute(); // un-mute & start tanpura
        if (audioToggleBtn) {
          audioToggleBtn.classList.add('active');
          const label = audioToggleBtn.querySelector('.audio-label') || document.getElementById('audio-label');
          if (label) label.textContent = 'SOUND';
        }
      }

      // Hide Hero Intro with Kage fade
      heroIntro.classList.add('fade-out');
      setTimeout(() => {
        heroIntro.style.display = 'none';
        globeContainer.classList.add('globe-active');
        if (globeInstance) {
          globeInstance.flyToSubcontinent();
        }
      }, 900);
    });
  }

  // 8. Preloader Complete
  setTimeout(() => {
    if (preloader) {
      preloader.classList.add('done');
      setTimeout(() => preloader.style.display = 'none', 800);
    }
  }, 600);
});
