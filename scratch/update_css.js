const fs = require('fs');

let css = fs.readFileSync('css/voiceGuideAccess.css', 'utf8');

const newStyles = `
/* ════ STANDALONE HERITAGE VOICE GUIDE SYSTEM ════ */
.yugma-standalone-vg-fab {
  position: fixed;
  bottom: 28px;
  right: 28px;
  min-width: 54px;
  height: 54px;
  padding: 0 20px 0 16px;
  border-radius: 27px;
  background: linear-gradient(135deg, #f59e0b, #d97706);
  border: 1.5px solid rgba(251, 191, 36, 0.85);
  color: #0b0f19;
  font-family: inherit;
  font-weight: 800;
  font-size: 0.82rem;
  letter-spacing: 0.05em;
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  box-shadow: 0 8px 28px rgba(245, 158, 11, 0.45), 0 0 20px rgba(245, 158, 11, 0.25);
  z-index: 10000;
  transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
}

.yugma-standalone-vg-fab:hover {
  transform: translateY(-2px) scale(1.04);
  box-shadow: 0 12px 34px rgba(245, 158, 11, 0.65), 0 0 26px rgba(245, 158, 11, 0.4);
}

.yugma-standalone-vg-fab:active {
  transform: scale(0.96);
}

.yugma-standalone-vg-fab .vg-fab-icon {
  font-size: 1.35rem;
  line-height: 1;
}

.yugma-standalone-vg-panel {
  position: fixed;
  bottom: 92px;
  right: 28px;
  width: min(92vw, 420px);
  max-height: 85vh;
  z-index: 10001;
  transform: translateY(20px) scale(0.96);
  opacity: 0;
  pointer-events: none;
  visibility: hidden;
  transition: all 0.28s cubic-bezier(0.16, 1, 0.3, 1);
}

.yugma-standalone-vg-panel.active {
  transform: translateY(0) scale(1);
  opacity: 1;
  pointer-events: auto;
  visibility: visible;
}

.modal-voice-guide-card.standalone {
  margin: 0 !important;
  padding: 18px 20px !important;
  background: linear-gradient(135deg, rgba(16, 22, 38, 0.98), rgba(9, 13, 24, 0.98)) !important;
  backdrop-filter: blur(24px) !important;
  -webkit-backdrop-filter: blur(24px) !important;
  border: 1.5px solid rgba(245, 158, 11, 0.55) !important;
  border-radius: 18px !important;
  box-shadow: 0 20px 48px rgba(0, 0, 0, 0.85), 0 0 30px rgba(245, 158, 11, 0.2) !important;
}

.standalone-vg-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
  flex-wrap: wrap;
  gap: 8px;
}

.vg-header-icon {
  font-size: 1.35rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  background: rgba(245, 158, 11, 0.18);
  border-radius: 50%;
  border: 1px solid rgba(245, 158, 11, 0.4);
}

.vg-header-title {
  font-size: 0.88rem;
  font-weight: 800;
  color: #ffd56b;
  letter-spacing: 0.06em;
  text-transform: uppercase;
}

.vg-header-status {
  font-size: 0.74rem;
  color: #94a3b8;
  font-weight: 500;
}

.vg-close-pill {
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.15);
  color: #cbd5e1;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  font-size: 0.85rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
}

.vg-close-pill:hover {
  background: rgba(239, 68, 68, 0.25);
  border-color: rgba(239, 68, 68, 0.5);
  color: #ffffff;
}

.vg-lang-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
  gap: 10px;
  flex-wrap: wrap;
}

.vg-lang-label {
  font-size: 0.74rem;
  color: #94a3b8;
  font-weight: 600;
}

.vg-lang-select {
  background: rgba(8, 12, 24, 0.95);
  border: 1px solid rgba(245, 158, 11, 0.45);
  color: #f1f5f9;
  padding: 6px 10px;
  border-radius: 8px;
  font-size: 0.8rem;
  font-weight: 600;
  cursor: pointer;
  outline: none;
  flex: 1;
  min-width: 160px;
}

.vg-play-button {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 11px 18px;
  background: linear-gradient(135deg, #f59e0b, #d97706);
  border: none;
  border-radius: 10px;
  color: #0b0f19;
  font-weight: 800;
  font-size: 0.88rem;
  cursor: pointer;
  box-shadow: 0 4px 16px rgba(245, 158, 11, 0.4);
  transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
}

.vg-play-button:hover {
  transform: translateY(-1px);
  box-shadow: 0 6px 20px rgba(245, 158, 11, 0.55);
}

.vg-stop-button {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 11px 16px;
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 10px;
  color: #cbd5e1;
  font-weight: 600;
  font-size: 0.86rem;
  cursor: pointer;
  transition: all 0.2s ease;
}

.vg-stop-button:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.vg-stop-button:not(:disabled):hover {
  background: rgba(239, 68, 68, 0.2);
  border-color: rgba(239, 68, 68, 0.5);
  color: #ffffff;
}

.vg-progress-bar-wrap {
  width: 100%;
  height: 4px;
  background: rgba(255, 255, 255, 0.08);
  border-radius: 2px;
  margin-bottom: 10px;
  overflow: hidden;
}

.vg-progress-bar-fill {
  width: 0%;
  height: 100%;
  background: linear-gradient(90deg, #f59e0b, #ffd56b);
  transition: width 0.15s ease;
}

.vg-subtitles-box {
  background: rgba(0, 0, 0, 0.5);
  border: 1px solid rgba(245, 158, 11, 0.25);
  border-radius: 8px;
  padding: 12px 14px;
  font-size: 0.86rem;
  line-height: 1.6;
  color: #e2e8f0;
  min-height: 58px;
  max-height: 110px;
  overflow-y: auto;
}

/* ── AUTH MODAL OVERRIDE WHEN ACTIVE ─────────────────────────────────────── */
#yugma-auth.auth-active {
  display: flex !important;
  opacity: 1 !important;
  visibility: visible !important;
  pointer-events: auto !important;
  z-index: 999999 !important;
}

@media (max-width: 640px) {
  .yugma-standalone-vg-fab {
    bottom: 18px;
    right: 18px;
    min-width: 48px;
    height: 48px;
    padding: 0 14px 0 12px;
    font-size: 0.74rem;
  }
  .yugma-standalone-vg-panel {
    right: 12px;
    bottom: 74px;
    width: calc(100vw - 24px);
    max-height: 80vh;
  }
}
`;

if (!css.includes('yugma-standalone-vg-fab')) {
  css += newStyles;
  fs.writeFileSync('css/voiceGuideAccess.css', css, 'utf8');
  console.log('Appended standalone voice guide styles to css/voiceGuideAccess.css');
} else {
  console.log('Styles already present in css/voiceGuideAccess.css');
}

