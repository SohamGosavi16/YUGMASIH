const fs = require('fs');
const path = require('path');

function patchFile(fileName) {
  const filePath = path.join(__dirname, '..', fileName);
  console.log('Patching:', fileName);
  let content = fs.readFileSync(filePath, 'utf8');

  // 1. Add CSS for loader
  const cssTarget = `#sketchfab-frame {
      position: absolute;
      top: -54px;
      left: 0;
      width: 100%;
      height: calc(100% + 108px);
      border: none;
      display: block;
    }`;

  const cssReplacement = `#sketchfab-frame {
      position: absolute;
      top: -54px;
      left: 0;
      width: 100%;
      height: calc(100% + 108px);
      border: none;
      display: block;
    }

    /* 3D Model Stage Loader Overlay */
    .stage-loader-overlay {
      position: absolute;
      inset: 0;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      background: radial-gradient(circle at 50% 50%, rgba(15, 23, 42, 0.88) 0%, rgba(4, 5, 7, 0.96) 100%);
      z-index: 4;
      pointer-events: none;
      opacity: 0;
      transition: opacity 0.35s ease;
    }
    .stage-loader-overlay.active {
      opacity: 1;
      pointer-events: auto;
    }
    .stage-loader-spinner {
      width: 42px;
      height: 42px;
      border: 3px solid rgba(223, 167, 83, 0.2);
      border-top-color: var(--gold-bright, #ffd56b);
      border-radius: 50%;
      animation: stageSpin 0.8s linear infinite;
      margin-bottom: 12px;
    }
    @keyframes stageSpin {
      to { transform: rotate(360deg); }
    }
    .stage-loader-label {
      font-size: 11px;
      font-weight: 700;
      letter-spacing: 2px;
      color: var(--gold-bright, #ffd56b);
      text-transform: uppercase;
      font-family: inherit;
    }`;

  // Handle both CRLF and LF
  if (content.includes(cssTarget)) {
    content = content.replace(cssTarget, cssReplacement);
  } else {
    const cssTargetLF = cssTarget.replace(/\r\n/g, '\n');
    const cssReplacementLF = cssReplacement.replace(/\r\n/g, '\n');
    content = content.replace(cssTargetLF, cssReplacementLF);
  }

  // 2. Add loader DOM inside #viewer-stage and change preload=1 to preload=0
  const stageTarget = `<div id="viewer-stage" class="atmos-noon">
    <iframe
      id="sketchfab-frame"
      title="3D Heritage Viewer"
      src="https://sketchfab.com/models/7b43e635cbfb47719d5a124302b78579/embed?autostart=1&internal=1&tracking=0&ui_ar=1&ui_infos=0&ui_snapshots=1&ui_stop=0&ui_theatre=1&ui_watermark=0&ui_theme=dark&camera=0&preload=1"`;

  const stageReplacement = `<div id="viewer-stage" class="atmos-noon">
    <!-- 3D Progressive Loading Indicator -->
    <div id="stage-loader" class="stage-loader-overlay active">
      <div class="stage-loader-spinner"></div>
      <div class="stage-loader-label" id="loader-monument-name">LOADING 3D TAJ MAHAL...</div>
    </div>
    <iframe
      id="sketchfab-frame"
      title="3D Heritage Viewer"
      src="https://sketchfab.com/models/7b43e635cbfb47719d5a124302b78579/embed?autostart=1&internal=1&tracking=0&ui_ar=1&ui_infos=0&ui_snapshots=1&ui_stop=0&ui_theatre=1&ui_watermark=0&ui_theme=dark&camera=0&preload=0"`;

  if (content.includes(stageTarget)) {
    content = content.replace(stageTarget, stageReplacement);
  } else {
    content = content.replace(stageTarget.replace(/\r\n/g, '\n'), stageReplacement.replace(/\r\n/g, '\n'));
  }

  // 3. Update JS in selectMonument and add loader logic
  const jsTarget = `        // Change iframe src
        if (m.type === 'sketchfab' && m.uid) {
          iframe.src = \`https://sketchfab.com/models/\${m.uid}/embed?autostart=1&internal=1&tracking=0&ui_ar=1&ui_infos=0&ui_snapshots=1&ui_stop=0&ui_theatre=1&ui_watermark=0&ui_theme=dark&camera=0&preload=1\`;
        } else {
          iframe.src = m.file;
        }`;

  const jsReplacement = `        // Progressive Loading & WebGL Resource Management
        showLoader(m.title.toUpperCase());

        // Dispose previous WebGL context before loading next model
        iframe.src = 'about:blank';
        setTimeout(() => {
          if (m.type === 'sketchfab' && m.uid) {
            iframe.src = \`https://sketchfab.com/models/\${m.uid}/embed?autostart=1&internal=1&tracking=0&ui_ar=1&ui_infos=0&ui_snapshots=1&ui_stop=0&ui_theatre=1&ui_watermark=0&ui_theme=dark&camera=0&preload=0\`;
          } else {
            iframe.src = m.file;
          }
        }, 50);`;

  if (content.includes(jsTarget)) {
    content = content.replace(jsTarget, jsReplacement);
  } else {
    content = content.replace(jsTarget.replace(/\r\n/g, '\n'), jsReplacement.replace(/\r\n/g, '\n'));
  }

  // 4. Add loader helper functions inside script
  const helperTarget = `      let currentModel = MONUMENTS[0];`;
  const helperReplacement = `      let currentModel = MONUMENTS[0];
      const stageLoader = document.getElementById('stage-loader');
      const loaderName = document.getElementById('loader-monument-name');
      let loaderTimeout = null;

      function showLoader(title) {
        if (!stageLoader) return;
        if (loaderName) loaderName.textContent = \`LOADING 3D \${title || 'MODEL'}...\`;
        stageLoader.classList.add('active');
        clearTimeout(loaderTimeout);
        loaderTimeout = setTimeout(hideLoader, 6500);
      }

      function hideLoader() {
        if (stageLoader) stageLoader.classList.remove('active');
        clearTimeout(loaderTimeout);
      }

      iframe.addEventListener('load', () => {
        if (iframe.src && !iframe.src.includes('about:blank')) {
          hideLoader();
        }
      });
      // Initial safety timeout to fade loader once started
      loaderTimeout = setTimeout(hideLoader, 5000);`;

  if (content.includes(helperTarget)) {
    content = content.replace(helperTarget, helperReplacement);
  } else {
    content = content.replace(helperTarget.replace(/\r\n/g, '\n'), helperReplacement.replace(/\r\n/g, '\n'));
  }

  // 5. Add loading="lazy" to card images
  content = content.replace(/class="card-thumb">/g, 'class="card-thumb" loading="lazy">');
  content = content.replace(/class="grid-card-img">/g, 'class="grid-card-img" loading="lazy">');

  fs.writeFileSync(filePath, content, 'utf8');
  console.log('Successfully patched:', fileName);
}

patchFile('all_3d_models.html');
patchFile('models_hub.html');

