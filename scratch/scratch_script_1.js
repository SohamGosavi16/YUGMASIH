
    (function () {
      "use strict";

      var stage = document.getElementById('viewer-stage');
      var iframe = document.getElementById('sketchfab-frame');
      var toast = document.getElementById('toast');
      var titleCard = document.getElementById('title-card');
      var collapseBtn = document.getElementById('btn-collapse');
      var infoModal = document.getElementById('info-modal');
      var infoBtn = document.getElementById('btn-info');
      var modalClose = document.getElementById('modal-close');
      var fullscreenBtn = document.getElementById('btn-fullscreen');
      var audioBtn = document.getElementById('btn-audio');
      var audioIcon = document.getElementById('audio-icon');
      var audioText = document.getElementById('audio-text');
      var sketchfabApi = null;

      function showToast(msg) {
        toast.textContent = msg;
        toast.classList.add('show');
        clearTimeout(toast._timer);
        toast._timer = setTimeout(function () {
          toast.classList.remove('show');
        }, 2200);
      }

      // Title Card Collapse Toggle
      collapseBtn.addEventListener('click', function () {
        titleCard.classList.toggle('collapsed');
        var isCollapsed = titleCard.classList.contains('collapsed');
        collapseBtn.innerHTML = isCollapsed ? '<i class="fa-solid fa-chevron-down"></i>' : '<i class="fa-solid fa-chevron-up"></i>';
      });

      // Info Modal Open / Close
      infoBtn.addEventListener('click', function () {
        infoModal.classList.add('active');
      });
      modalClose.addEventListener('click', function () {
        infoModal.classList.remove('active');
      });
      infoModal.addEventListener('click', function (e) {
        if (e.target === infoModal) infoModal.classList.remove('active');
      });

      // Atmosphere Lighting Filter Switching
      var atmosBtns = document.querySelectorAll('.atmos-btn');
      atmosBtns.forEach(function (btn) {
        btn.addEventListener('click', function () {
          atmosBtns.forEach(function (b) { b.classList.remove('active'); });
          btn.classList.add('active');
          var chosen = btn.getAttribute('data-atmos');
          stage.className = chosen;
          showToast(btn.textContent.trim() + " atmosphere activated");
        });
      });

      // Fullscreen Toggle
      fullscreenBtn.addEventListener('click', function () {
        if (!document.fullscreenElement) {
          document.documentElement.requestFullscreen().catch(function () {});
          fullscreenBtn.innerHTML = '<i class="fa-solid fa-compress"></i>';
          showToast('Entered Fullscreen');
        } else {
          document.exitFullscreen().catch(function () {});
          fullscreenBtn.innerHTML = '<i class="fa-solid fa-expand"></i>';
          showToast('Exited Fullscreen');
        }
      });

      // Procedural Web Audio Ambient Soundscape
      var audioCtx = null;
      var isAudioPlaying = false;
      var ambientNodes = [];

      function startAmbience() {
        try {
          var AudioContext = window.AudioContext || window.webkitAudioContext;
          if (!audioCtx) audioCtx = new AudioContext();
          if (audioCtx.state === 'suspended') audioCtx.resume();

          // Master Gain
          var masterGain = audioCtx.createGain();
          masterGain.gain.setValueAtTime(0.01, audioCtx.currentTime);
          masterGain.gain.exponentialRampToValueAtTime(0.18, audioCtx.currentTime + 2.5);
          masterGain.connect(audioCtx.destination);
          ambientNodes.push(masterGain);

          // Warm Harmonic Drone
          var baseFreqs = [146.83, 220.0, 293.66, 440.0];
          baseFreqs.forEach(function (f, idx) {
            var osc = audioCtx.createOscillator();
            var oscGain = audioCtx.createGain();
            osc.type = idx % 2 === 0 ? 'sine' : 'triangle';
            osc.frequency.setValueAtTime(f, audioCtx.currentTime);

            // Gentle LFO
            var lfo = audioCtx.createOscillator();
            lfo.frequency.setValueAtTime(0.2 + idx * 0.1, audioCtx.currentTime);
            var lfoGain = audioCtx.createGain();
            lfoGain.gain.setValueAtTime(1.5, audioCtx.currentTime);
            lfo.connect(lfoGain);
            lfoGain.connect(osc.frequency);
            lfo.start();

            oscGain.gain.setValueAtTime(0.04 / (idx + 1), audioCtx.currentTime);
            osc.connect(oscGain);
            oscGain.connect(masterGain);
            osc.start();
            ambientNodes.push(osc, lfo);
          });

          // Shimmer Air Filter
          var bufferSize = audioCtx.sampleRate * 2;
          var noiseBuffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
          var output = noiseBuffer.getChannelData(0);
          for (var i = 0; i < bufferSize; i++) {
            output[i] = Math.random() * 2 - 1;
          }
          var whiteNoise = audioCtx.createBufferSource();
          whiteNoise.buffer = noiseBuffer;
          whiteNoise.loop = true;

          var biquad = audioCtx.createBiquadFilter();
          biquad.type = 'bandpass';
          biquad.frequency.setValueAtTime(1100, audioCtx.currentTime);
          biquad.Q.setValueAtTime(1.4, audioCtx.currentTime);

          var noiseGain = audioCtx.createGain();
          noiseGain.gain.setValueAtTime(0.02, audioCtx.currentTime);

          whiteNoise.connect(biquad);
          biquad.connect(noiseGain);
          noiseGain.connect(masterGain);
          whiteNoise.start();
          ambientNodes.push(whiteNoise);

          isAudioPlaying = true;
          audioIcon.className = 'fa-solid fa-volume-high';
          audioText.textContent = 'SOUND ON';
          audioBtn.style.borderColor = 'var(--gold-bright)';
          audioBtn.style.color = 'var(--gold-bright)';
          showToast('Statue of Unity Soundscape Playing');
        } catch (e) {
          console.warn('Audio not supported or blocked:', e);
        }
      }

      function stopAmbience() {
        if (ambientNodes.length) {
          ambientNodes.forEach(function (n) {
            try {
              if (n.stop) n.stop();
              if (n.disconnect) n.disconnect();
            } catch (err) {}
          });
          ambientNodes = [];
        }
        isAudioPlaying = false;
        audioIcon.className = 'fa-solid fa-volume-xmark';
        audioText.textContent = 'MUTED';
        audioBtn.style.borderColor = 'var(--glass-border)';
        audioBtn.style.color = 'var(--marble-white)';
        showToast('Ambience Muted');
      }

      audioBtn.addEventListener('click', function () {
        if (!isAudioPlaying) {
          startAmbience();
        } else {
          stopAmbience();
        }
      });

      // Initialize Sketchfab Client API
      if (window.Sketchfab) {
        try {
          var client = new window.Sketchfab(iframe);
          client.init('2221e03866f24817972a16f3ad17c168', {
            success: function onSuccess(api) {
              sketchfabApi = api;
              api.start();
              api.addEventListener('viewerready', function () {
                console.log('Sketchfab Statue of Unity 3D Viewer Ready');
                showToast('Statue of Unity 3D Model Loaded');
              });
            },
            error: function onError() {
              console.warn('Sketchfab API init fallback to standard iframe embed.');
            },
            autostart: 1,
            ui_controls: 1,
            ui_infos: 0,
            ui_watermark: 0,
            ui_ar: 1,
            ui_vr: 1,
            ui_theatre: 1,
            preload: 1
          });
        } catch (err) {
          console.log('Sketchfab client initialized directly via iframe src.');
        }
      }

      // Dock Camera Presets
      var dockBtns = document.querySelectorAll('.dock-btn');
      function setDockActive(btn) {
        dockBtns.forEach(function (b) { b.classList.remove('active'); });
        if (btn) btn.classList.add('active');
      }

      var btn_view_facade = document.getElementById('view-facade');
      if (btn_view_facade) {
        btn_view_facade.addEventListener('click', function () {
          setDockActive(btn_view_facade);
          if (sketchfabApi && sketchfabApi.setCameraLookAt) {
            sketchfabApi.setCameraLookAt([0, -130, 60], [0, 0, 40], 1.8, function () {});
          }
          showToast('Colossal 182-Meter Frontal Stance');
        });
      }
      var btn_view_head = document.getElementById('view-head');
      if (btn_view_head) {
        btn_view_head.addEventListener('click', function () {
          setDockActive(btn_view_head);
          if (sketchfabApi && sketchfabApi.setCameraLookAt) {
            sketchfabApi.setCameraLookAt([0, -45, 120], [0, 0, 110], 1.8, function () {});
          }
          showToast('Sculpted Head & Traditional Attire');
        });
      }
      var btn_view_base = document.getElementById('view-base');
      if (btn_view_base) {
        btn_view_base.addEventListener('click', function () {
          setDockActive(btn_view_base);
          if (sketchfabApi && sketchfabApi.setCameraLookAt) {
            sketchfabApi.setCameraLookAt([30, -50, 20], [0, 0, 10], 1.8, function () {});
          }
          showToast('Two-Tiered Geometric Plinth & Bronze Sandals');
        });
      }
      var btn_view_narmada = document.getElementById('view-narmada');
      if (btn_view_narmada) {
        btn_view_narmada.addEventListener('click', function () {
          setDockActive(btn_view_narmada);
          if (sketchfabApi && sketchfabApi.setCameraLookAt) {
            sketchfabApi.setCameraLookAt([-80, -90, 70], [0, 0, 30], 1.8, function () {});
          }
          showToast('Panoramic Narmada River & Dam View');
        });
      }
      var btn_view_reset = document.getElementById('view-reset');
      if (btn_view_reset) {
        btn_view_reset.addEventListener('click', function () {
          setDockActive(btn_view_reset);
          if (sketchfabApi && sketchfabApi.recenterCamera) {
            sketchfabApi.recenterCamera(function () {});
          } else {
            iframe.src = iframe.src;
          }
          showToast('Camera Reset');
        });
      }

      // Fade out orbit hint after 8 seconds
      setTimeout(function () {
        var hint = document.getElementById('orbit-hint');
        if (hint) hint.style.opacity = '0';
      }, 8000);

    })();
  