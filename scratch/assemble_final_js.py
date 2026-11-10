# -*- coding: utf-8 -*-
"""
Assemble production js/aiVisualizer.js without ANY client-side credentials.
Routes requests securely through Netlify Serverless Function: /.netlify/functions/gemini
The Gemini API key is stored only on the server in process.env.GEMINI_API_KEY.
"""

import os
import sys
import json

sys.path.append(os.path.dirname(os.path.abspath(__file__)))
from finish_builder import ALL_KNOWLEDGE, HERITAGE_AGENTS, AGENT_PROMPTS

JSON_AGENTS = json.dumps(HERITAGE_AGENTS, indent=2)
JSON_PROMPTS = json.dumps(AGENT_PROMPTS, indent=2)
JSON_KNOWLEDGE = json.dumps(ALL_KNOWLEDGE, indent=2)

TEMPLATE = """/**
 * YUGMA AI Heritage Companion & Audio Visualizer (Multi-Agent System)
 * Version: 2.8.0 (Optimized Single Narration Player Architecture)
 * 
 * Features:
 * - 5 Specialized Heritage AI Agents:
 *   1. All-Rounder (Civilizational Synthesis & Harmonizer)
 *   2. Chief Historian (Itihasa: Dynastic archives, timelines, epigraphy)
 *   3. Master Architect (Sthapatya: Vastu Shastra, acoustics, interlocking stone)
 *   4. Sacred Lore (Katha: Temple myths, deity iconography, living folklore)
 *   5. Travel Curator (Yatra: Viewpoints, golden hour photography, circuits)
 * - Single Unified AI Voice Narration Player directly below AI visualizer
 * - High-Contrast Inline SVG Controls (Play, Pause, Resume, Stop, Replay, Volume)
 * - 30 FPS Throttled Canvas Rendering with zero shadowBlur bottlenecks
 * - Smooth Speaking Progress Tracking with Boundary Sync
 * - Persistent Volume State across Session
 * - Secure Serverless Architecture (Gemini API via Netlify Functions)
 */

(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define([], function () { return factory(root); });
  } else if (typeof module === 'object' && module.exports) {
    module.exports = factory(root);
  } else {
    root.YugmaAIVisualizer = factory(root);
  }
}(typeof self !== 'undefined' ? self : (typeof window !== 'undefined' ? window : this), function (root) {
  'use strict';

  // ── 0. GLOBAL YUGMA AI CONFIGURATION ──────────────────────────────────────
  var YUGMA_AI_CONFIG = {
    API_ENDPOINT: "/.netlify/functions/gemini"
  };

  if (typeof window !== 'undefined') {
    window.YUGMA_AI_CONFIG = YUGMA_AI_CONFIG;
  }

  // ── 1. VISUALIZATION STATES ────────────────────────────────────────────────
  var STATES = {
    IDLE: 'idle',
    THINKING: 'thinking',
    SPEAKING: 'speaking',
    PAUSED: 'paused'
  };

  // ── 2. SPECIALIZED HERITAGE AI AGENTS ─────────────────────────────────────
  var HERITAGE_AGENTS = __REPLACE_AGENTS__;

  var AGENT_PROMPTS = __REPLACE_PROMPTS__;

  // ── 3. COMPREHENSIVE MULTI-AGENT KNOWLEDGE BASE (22 MONUMENTS + THEMES) ────
  var HERITAGE_KNOWLEDGE = __REPLACE_KNOWLEDGE__;

  // ── 4. VISUALIZER & MULTI-AGENT CONTROLLER ────────────────────────────────
  var AIVisualizer = {
    // Current State & Active Agent
    currentState: STATES.IDLE,
    selectedAgent: 'orchestrator',

    // Audio & Speech Playback State
    audioContext: null,
    analyserNode: null,
    activeUtterance: null,
    speechCadenceEnergy: 0.1,
    motionEnabled: true,
    volume: 0.9,
    lastNonZeroVolume: 90,
    speechRate: 0.95,
    lastSpokenText: "",
    lastSpokenTitle: "",
    charProgress: 0,
    totalChars: 0,
    isPaused: false,
    activeOffset: 0,
    currentPlaybackStatus: "Ready to play.",
    playbackStartTime: 0,
    playbackElapsed: 0,
    progressTimer: null,
    isModalOpen: false,

    // Canvas & Animation Loop (Optimized ~30 FPS, Zero CPU shadowBlur)
    canvas: null,
    ctx: null,
    animFrameId: null,
    lastFrameTime: 0,
    wavePhase: 0,
    pulseScale: 1.0,
    concentricAngle1: 0,
    concentricAngle2: 0,
    particles: [],

    // ── Initialization ──────────────────────────────────────────────────────
    init: function () {
      this.initDOM();
      this.initParticles();

      // Restore volume from sessionStorage if available
      var savedVol = 90;
      try {
        if (typeof sessionStorage !== 'undefined') {
          var stored = sessionStorage.getItem('yugma_ai_volume');
          if (stored !== null && !isNaN(parseInt(stored, 10))) {
            savedVol = parseInt(stored, 10);
          }
        }
      } catch (e) {}
      this.setVolume(savedVol);

      this.bindEvents();
      this.setAgent('orchestrator');
      this.setInitialText();
      this.drawIdleFrame();
    },

    // ── DOM & Modal Setup ───────────────────────────────────────────────────
    initDOM: function () {
      // 1. Create Top-Right Floating Icon Launcher if missing
      if (!document.getElementById('yugma-ai-fab')) {
        var fab = document.createElement('button');
        fab.type = 'button';
        fab.className = 'yugma-ai-fab';
        fab.id = 'yugma-ai-fab';
        fab.setAttribute('aria-label', 'Open YUGMA AI Heritage Companion');
        fab.setAttribute('title', 'AI Heritage Companion');
        fab.setAttribute('data-state', this.currentState || 'idle');
        fab.innerHTML = [
          '<div class="fab-orb-icon">',
          '  <div class="fab-orb-pulse"></div>',
          '  <div class="fab-orb-ring"></div>',
          '  <div class="fab-orb-core"></div>',
          '</div>'
        ].join('');
        document.body.appendChild(fab);
      }

      // 2. Create Modal Container if missing (Single unified narration player)
      if (!document.getElementById('ai-companion-modal-backdrop')) {
        var backdrop = document.createElement('div');
        backdrop.className = 'ai-companion-backdrop';
        backdrop.id = 'ai-companion-modal-backdrop';
        backdrop.setAttribute('role', 'dialog');
        backdrop.setAttribute('aria-modal', 'true');
        backdrop.innerHTML = [
          '<div class="ai-companion-modal">',
          '  <!-- Modal Header -->',
          '  <div class="ai-modal-header">',
          '    <div class="ai-header-brand">',
          '      <div class="ai-header-icon">',
          '        <svg viewBox="0 0 24 24" fill="none" stroke="#c9a24a" stroke-width="2">',
          '          <circle cx="12" cy="12" r="4" fill="#c9a24a" />',
          '          <path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.93 4.93l2.12 2.12M16.95 16.95l2.12 2.12" />',
          '        </svg>',
          '      </div>',
          '      <div class="ai-header-text">',
          '        <h3>YUGMA AI COMPANION</h3>',
          '        <span>MULTI-AGENT HERITAGE INTELLIGENCE // ज्ञानमित्रम्</span>',
          '      </div>',
          '    </div>',
          '    <div class="ai-header-controls">',
          '      <button type="button" class="btn-ai-header-action" id="btn-ai-toggle-motion" title="Toggle animation motion for accessibility">',
          '        <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block; vertical-align:middle; margin-right:4px;"><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/></svg>',
          '        <span>Motion: ON</span>',
          '      </button>',
          '      <button type="button" class="btn-ai-modal-close" id="btn-ai-modal-close" title="Close AI Companion">&times;</button>',
          '    </div>',
          '  </div>',
          '  <!-- Modal Body -->',
          '  <div class="ai-modal-body">',
          '    <!-- Left Column: Single Unified AI Visualizer & Narration Player -->',
          '    <div class="ai-visualizer-column">',
          '      <div class="ai-orb-stage">',
          '        <canvas class="ai-orb-canvas" id="ai-orb-canvas" width="280" height="280"></canvas>',
          '      </div>',
          '      <div class="ai-state-indicator idle" id="ai-state-indicator">',
          '        <span class="ai-state-dot"></span>',
          '        <span id="ai-state-label">✦ IDLE // READY</span>',
          '      </div>',
          '      <!-- Voice Control Panel directly below AI voice visualizer -->',
          '      <div class="ai-voice-control-panel">',
          '        <div class="voice-progress-box">',
          '          <div class="voice-progress-bar-wrap">',
          '            <div class="voice-progress-fill" id="ai-voice-progress-fill"></div>',
          '          </div>',
          '          <div class="voice-progress-meta">',
          '            <span id="ai-voice-status-text">Ready to play.</span>',
          '            <span id="ai-voice-progress-text">0%</span>',
          '          </div>',
          '        </div>',
          '        <div class="voice-buttons-cluster">',
          '          <button type="button" class="btn-voice-ctrl" id="btn-ai-stop" title="Stop narration" aria-label="Stop narration" disabled>',
          '            <svg class="voice-svg-icon" viewBox="0 0 24 24" width="15" height="15" fill="currentColor">',
          '              <rect x="5" y="5" width="14" height="14" rx="2" />',
          '            </svg>',
          '          </button>',
          '          <button type="button" class="btn-voice-ctrl" id="btn-ai-pause" title="Pause narration" aria-label="Pause narration" disabled>',
          '            <svg class="voice-svg-icon" viewBox="0 0 24 24" width="16" height="16" fill="currentColor">',
          '              <rect x="6" y="4" width="4" height="16" rx="1.5" />',
          '              <rect x="14" y="4" width="4" height="16" rx="1.5" />',
          '            </svg>',
          '          </button>',
          '          <button type="button" class="btn-voice-ctrl btn-main-play" id="btn-ai-play" title="Play narration" aria-label="Play narration">',
          '            <svg class="voice-svg-icon" viewBox="0 0 24 24" width="18" height="18" fill="currentColor">',
          '              <polygon points="6 4 20 12 6 20 6 4" />',
          '            </svg>',
          '          </button>',
          '          <button type="button" class="btn-voice-ctrl btn-main-play" id="btn-ai-resume" title="Resume narration" aria-label="Resume narration" style="display:none;">',
          '            <svg class="voice-svg-icon" viewBox="0 0 24 24" width="18" height="18" fill="currentColor">',
          '              <polygon points="6 4 20 12 6 20 6 4" />',
          '            </svg>',
          '          </button>',
          '          <button type="button" class="btn-voice-ctrl" id="btn-ai-replay" title="Replay narration from beginning" aria-label="Replay narration from beginning">',
          '            <svg class="voice-svg-icon" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">',
          '              <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />',
          '              <path d="M3 3v5h5" />',
          '            </svg>',
          '          </button>',
          '        </div>',
          '        <div class="voice-volume-box">',
          '          <button type="button" class="btn-ai-vol-mute" id="ai-volume-icon-wrap" title="Toggle audio mute" aria-label="Toggle audio mute">',
          '            <svg class="voice-svg-icon" id="ai-vol-svg" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">',
          '              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" fill="currentColor" />',
          '              <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />',
          '              <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />',
          '            </svg>',
          '          </button>',
          '          <input type="range" class="voice-volume-slider" id="ai-volume-slider" min="0" max="100" value="90" title="Adjust voice volume" aria-label="Adjust voice volume">',
          '          <span class="voice-volume-label" id="ai-volume-label">90%</span>',
          '        </div>',
          '      </div>',
          '    </div>',
          '    <!-- Right Column: Multi-Agent Selector, Prompts, Viewport & Input (NO DUPLICATE CONTROLS) -->',
          '    <div class="ai-dialog-column">',
          '      <!-- Multi-Agent Specialist Selector Bar -->',
          '      <div class="ai-agents-selector-wrap">',
          '        <div class="ai-agents-selector-label">',
          '          <span><i class="fa-solid fa-users-viewfinder"></i> SPECIALIZED HERITAGE AGENTS</span>',
          '          <span id="ai-active-agent-desc" style="font-weight:400; opacity:0.85; text-transform:none;">Universal synthesis</span>',
          '        </div>',
          '        <div class="ai-agents-pills-row" id="ai-agents-pills-row">',
          '          <button type="button" class="agent-pill active" data-agent="orchestrator" title="Universal Civilizational Guide">',
          '            <i class="fa-solid fa-sparkles"></i> <span>All-Rounder</span>',
          '          </button>',
          '          <button type="button" class="agent-pill" data-agent="historian" title="Chief Historian: Dynasties, timelines, inscriptions">',
          '            <i class="fa-solid fa-landmark-dome"></i> <span>Historian</span>',
          '          </button>',
          '          <button type="button" class="agent-pill" data-agent="architect" title="Master Architect: Acoustics, interlocking stone, geometry">',
          '            <i class="fa-solid fa-compass-drafting"></i> <span>Architect</span>',
          '          </button>',
          '          <button type="button" class="agent-pill" data-agent="lore" title="Sacred Lore: Temple myths, folklore, traditions">',
          '            <i class="fa-solid fa-om"></i> <span>Myth & Lore</span>',
          '          </button>',
          '          <button type="button" class="agent-pill" data-agent="travel" title="Expedition Curator: Best hours, viewpoints, circuits">',
          '            <i class="fa-solid fa-route"></i> <span>Travel Guide</span>',
          '          </button>',
          '        </div>',
          '      </div>',
          '      <!-- Dynamic Prompt Suggestions -->',
          '      <div class="ai-prompt-suggestions" id="ai-prompt-suggestions"></div>',
          '      <!-- Response Viewport -->',
          '      <div class="ai-response-viewport" id="ai-response-viewport">',
          '        <div class="response-header-tag">',
          '          <div style="display:flex; align-items:center; gap:8px;">',
          '            <span id="ai-agent-badge" class="ai-agent-badge"><i class="fa-solid fa-sparkles"></i> YUGMA ALL-ROUNDER</span>',
          '            <span id="ai-engine-source" class="ai-engine-source gemini-live">⚡ GEMINI LIVE</span>',
          '          </div>',
          '          <span id="ai-response-title" style="color:#c9a24a; font-weight:700;">CIVILIZATIONAL ARCHIVE</span>',
          '        </div>',
          '        <div class="response-text-body" id="ai-response-text"></div>',
          '      </div>',
          '      <!-- Input Form -->',
          '      <form class="ai-input-form" id="ai-chat-form">',
          '        <input type="text" class="ai-chat-input" id="ai-chat-input" placeholder="Ask YUGMA AI about Indian monuments, dynasties, architecture..." autocomplete="off">',
          '        <button type="submit" class="btn-ai-send" id="btn-ai-send">',
          '          <span>ASK AI</span>',
          '          <i class="fa-solid fa-arrow-right"></i>',
          '        </button>',
          '      </form>',
          '    </div>',
          '  </div>',
          '</div>'
        ].join('');
        document.body.appendChild(backdrop);
      }

      this.canvas = document.getElementById('ai-orb-canvas');
      if (this.canvas) {
        this.ctx = this.canvas.getContext('2d');
      }
    },

    // ── Particle System (Lightweight: 8 subtle particles) ───────────────────
    initParticles: function () {
      this.particles = [];
      for (var i = 0; i < 8; i++) {
        var angle = Math.random() * Math.PI * 2;
        var dist = 32 + Math.random() * 75;
        this.particles.push({
          angle: angle,
          baseDist: dist,
          speed: (Math.random() * 0.005 + 0.002) * (Math.random() > 0.5 ? 1 : -1),
          size: Math.random() * 1.8 + 0.8,
          alpha: Math.random() * 0.45 + 0.25
        });
      }
    },

    // ── Multi-Agent Switching ───────────────────────────────────────────────
    setAgent: function (agentId) {
      if (!HERITAGE_AGENTS[agentId]) agentId = 'orchestrator';
      this.selectedAgent = agentId;
      var agent = HERITAGE_AGENTS[agentId];

      var pills = document.querySelectorAll('.agent-pill');
      pills.forEach(function (pill) {
        if (pill.getAttribute('data-agent') === agentId) {
          pill.classList.add('active');
        } else {
          pill.classList.remove('active');
        }
      });

      var descEl = document.getElementById('ai-active-agent-desc');
      if (descEl) descEl.textContent = agent.desc;

      var badgeEl = document.getElementById('ai-agent-badge');
      if (badgeEl) {
        badgeEl.innerHTML = '<i class="' + agent.icon + '"></i> ' + agent.name.toUpperCase();
      }

      this.renderPromptSuggestions();
    },

    renderPromptSuggestions: function () {
      var container = document.getElementById('ai-prompt-suggestions');
      if (!container) return;

      var prompts = AGENT_PROMPTS[this.selectedAgent] || AGENT_PROMPTS.orchestrator;
      var html = prompts.map(function (p) {
        return '<button type="button" class="prompt-chip" data-topic="' + p.topic + '">' + p.label + '</button>';
      }).join('');

      container.innerHTML = html;

      var self = this;
      container.querySelectorAll('.prompt-chip').forEach(function (chip) {
        chip.addEventListener('click', function (e) {
          e.preventDefault();
          var topic = chip.getAttribute('data-topic');
          var text = chip.textContent.replace(/^[^a-zA-Z0-9]+/, '').trim();
          var input = document.getElementById('ai-chat-input');
          if (input) input.value = text;
          self.askAI(topic || text);
        });
      });
    },

    // ── Initial State Text ──────────────────────────────────────────────────
    setInitialText: function () {
      var agent = HERITAGE_AGENTS[this.selectedAgent] || HERITAGE_AGENTS.orchestrator;
      var general = HERITAGE_KNOWLEDGE.general || {};
      var intro = general[this.selectedAgent] || general.orchestrator || "Welcome to YUGMA AI Heritage Companion.";
      this.updateTranscript(general.title || "YUGMA Digital Heritage Archive", intro, 'curated');
    },

    updateTranscript: function (title, text, source) {
      var titleEl = document.getElementById('ai-response-title');
      var bodyEl = document.getElementById('ai-response-text');
      var engineSource = document.getElementById('ai-engine-source');
      var badgeEl = document.getElementById('ai-agent-badge');
      var agent = HERITAGE_AGENTS[this.selectedAgent] || HERITAGE_AGENTS.orchestrator;

      if (titleEl) titleEl.textContent = title;
      if (bodyEl) bodyEl.textContent = text;
      if (badgeEl) {
        badgeEl.innerHTML = '<i class="' + agent.icon + '"></i> ' + agent.name.toUpperCase();
      }

      if (engineSource) {
        if (source === 'gemini') {
          engineSource.className = 'ai-engine-source gemini-live';
          engineSource.textContent = '⚡ GEMINI LIVE';
        } else {
          engineSource.className = 'ai-engine-source';
          engineSource.textContent = '📚 CURATED ARCHIVE';
        }
      }

      this.lastSpokenText = text;
      this.lastSpokenTitle = title;
      this.charProgress = 0;
      this.activeOffset = 0;
      this.isPaused = false;
      this.playbackElapsed = 0;
      this.totalChars = text.length;
      this.updateProgressUI(0);
      this.setPlaybackStatus('Ready to play.');
      if (this.currentState === STATES.IDLE) {
        this.setState(STATES.IDLE, 'Ready to play.');
      }
    },

    // ── 5. OPTIMIZED CANVAS RENDERING ENGINE (~30 FPS, ZERO CPU BLUR) ───────
    startAnimation: function () {
      if (this.animFrameId) return; // Guarantee only one active animation loop
      var self = this;
      this.lastFrameTime = (typeof performance !== 'undefined' && performance.now) ? performance.now() : Date.now();

      function renderLoop(timestamp) {
        self.drawFrame(timestamp);
        if (self.animFrameId) {
          self.animFrameId = requestAnimationFrame(renderLoop);
        }
      }
      this.animFrameId = requestAnimationFrame(renderLoop);
    },

    stopAnimation: function () {
      if (this.animFrameId) {
        cancelAnimationFrame(this.animFrameId);
        this.animFrameId = null;
      }
    },

    drawFrame: function (timestamp) {
      if (!this.ctx || !this.canvas) return;

      // Throttle rendering to approximately 30 FPS for buttery smooth performance
      if (timestamp - this.lastFrameTime < 32) return;

      var dt = (timestamp - this.lastFrameTime) * 0.001;
      this.lastFrameTime = timestamp;
      if (!dt || dt > 0.1) dt = 0.033;

      var ctx = this.ctx;
      var w = this.canvas.width;
      var h = this.canvas.height;
      var cx = w / 2;
      var cy = h / 2;

      ctx.clearRect(0, 0, w, h);

      if (!this.motionEnabled) {
        this.speechCadenceEnergy = (this.currentState === STATES.SPEAKING) ? 0.3 : 0.08;
      }

      var speedMultiplier = 1.0;
      if (this.currentState === STATES.THINKING) speedMultiplier = 2.2;
      else if (this.currentState === STATES.SPEAKING) speedMultiplier = 1.4 + this.speechCadenceEnergy * 2.0;
      else if (this.currentState === STATES.PAUSED) speedMultiplier = 0.15;

      this.concentricAngle1 += 0.35 * dt * speedMultiplier;
      this.concentricAngle2 -= 0.45 * dt * speedMultiplier;
      this.wavePhase += 1.6 * dt * speedMultiplier;

      // 1. Soft Outer Radial Glow Aura (Hardware-accelerated gradient, 0 CPU shadowBlur)
      var auraRadius = 100 + Math.sin(this.wavePhase * 0.8) * 8 + this.speechCadenceEnergy * 24;
      var auraGrad = ctx.createRadialGradient(cx, cy, 18, cx, cy, auraRadius);
      auraGrad.addColorStop(0, 'rgba(201, 162, 74, 0.4)');
      auraGrad.addColorStop(0.4, 'rgba(223, 167, 83, 0.15)');
      auraGrad.addColorStop(0.7, 'rgba(201, 162, 74, 0.05)');
      auraGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = auraGrad;
      ctx.beginPath();
      ctx.arc(cx, cy, auraRadius, 0, Math.PI * 2);
      ctx.fill();

      // 2. Subtle Golden Particles (8 embers max)
      if (this.motionEnabled && this.particles.length > 0) {
        for (var i = 0; i < this.particles.length; i++) {
          var p = this.particles[i];
          p.angle += p.speed * dt * 50 * speedMultiplier;
          var curDist = p.baseDist + Math.sin(timestamp * 0.002 + i) * 6 + this.speechCadenceEnergy * 14;
          var px = cx + Math.cos(p.angle) * curDist;
          var py = cy + Math.sin(p.angle) * curDist;

          ctx.fillStyle = 'rgba(223, 167, 83, ' + p.alpha + ')';
          ctx.beginPath();
          ctx.arc(px, py, p.size, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // 3. Concentric Dashed Architectural Rings
      ctx.save();
      ctx.strokeStyle = 'rgba(201, 162, 74, 0.4)';
      ctx.lineWidth = 1.4;
      ctx.setLineDash([6, 12]);
      ctx.beginPath();
      ctx.arc(cx, cy, 88, this.concentricAngle1, this.concentricAngle1 + Math.PI * 2);
      ctx.stroke();

      ctx.strokeStyle = 'rgba(223, 167, 83, 0.3)';
      ctx.lineWidth = 1.0;
      ctx.setLineDash([4, 16]);
      ctx.beginPath();
      ctx.arc(cx, cy, 70, this.concentricAngle2, this.concentricAngle2 + Math.PI * 2);
      ctx.stroke();
      ctx.restore();

      // 4. Radial Audio Waveform (24 Bars) - Single Batched Path Stroke
      var barCount = 24;
      var baseR = 46;
      ctx.save();
      ctx.beginPath();
      ctx.strokeStyle = (this.currentState === STATES.SPEAKING)
        ? 'rgba(255, 213, 128, 0.75)'
        : 'rgba(201, 162, 74, 0.45)';
      ctx.lineWidth = 2.2;
      for (var b = 0; b < barCount; b++) {
        var barAngle = (b / barCount) * Math.PI * 2;
        var waveMod = Math.sin(this.wavePhase + b * 0.7) * 0.5 + 0.5;
        var barLen = 5 + waveMod * (this.speechCadenceEnergy * 24 + 6);
        if (this.currentState === STATES.THINKING) {
          barLen = 7 + Math.sin(timestamp * 0.008 + b) * 5;
        } else if (this.currentState === STATES.IDLE) {
          barLen = 3;
        }

        var x1 = cx + Math.cos(barAngle) * baseR;
        var y1 = cy + Math.sin(barAngle) * baseR;
        var x2 = cx + Math.cos(barAngle) * (baseR + barLen);
        var y2 = cy + Math.sin(barAngle) * (baseR + barLen);
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
      }
      ctx.stroke();
      ctx.restore();

      // 5. Central Golden Core with Ambient Halo (No software blur)
      var coreRadius = 36 + Math.sin(this.wavePhase * 1.2) * 2.0 + this.speechCadenceEnergy * 8;
      
      // Halo behind core
      var haloRadius = coreRadius * 1.5;
      var haloGrad = ctx.createRadialGradient(cx, cy, coreRadius * 0.5, cx, cy, haloRadius);
      haloGrad.addColorStop(0, (this.currentState === STATES.SPEAKING) ? 'rgba(255, 213, 128, 0.4)' : 'rgba(201, 162, 74, 0.25)');
      haloGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = haloGrad;
      ctx.beginPath();
      ctx.arc(cx, cy, haloRadius, 0, Math.PI * 2);
      ctx.fill();

      // Core sphere
      var coreGrad = ctx.createRadialGradient(cx - 6, cy - 6, 3, cx, cy, coreRadius);
      coreGrad.addColorStop(0, '#ffffff');
      coreGrad.addColorStop(0.2, '#fff4d6');
      coreGrad.addColorStop(0.55, '#dfa753');
      coreGrad.addColorStop(0.85, '#c9a24a');
      coreGrad.addColorStop(1, '#8b6914');
      ctx.fillStyle = coreGrad;
      ctx.beginPath();
      ctx.arc(cx, cy, coreRadius, 0, Math.PI * 2);
      ctx.fill();
    },

    // Static Serene Idle Frame (Drawn once when idle; eliminates constant background animation)
    drawIdleFrame: function () {
      if (!this.ctx || !this.canvas) return;
      var ctx = this.ctx;
      var w = this.canvas.width;
      var h = this.canvas.height;
      var cx = w / 2;
      var cy = h / 2;

      ctx.clearRect(0, 0, w, h);

      // Resting gentle aura
      var auraGrad = ctx.createRadialGradient(cx, cy, 14, cx, cy, 95);
      auraGrad.addColorStop(0, 'rgba(201, 162, 74, 0.3)');
      auraGrad.addColorStop(0.5, 'rgba(223, 167, 83, 0.08)');
      auraGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = auraGrad;
      ctx.beginPath();
      ctx.arc(cx, cy, 95, 0, Math.PI * 2);
      ctx.fill();

      // Resting architectural rings
      ctx.save();
      ctx.strokeStyle = 'rgba(201, 162, 74, 0.35)';
      ctx.lineWidth = 1.2;
      ctx.setLineDash([6, 12]);
      ctx.beginPath();
      ctx.arc(cx, cy, 88, 0, Math.PI * 2);
      ctx.stroke();

      ctx.strokeStyle = 'rgba(223, 167, 83, 0.25)';
      ctx.lineWidth = 1.0;
      ctx.setLineDash([4, 16]);
      ctx.beginPath();
      ctx.arc(cx, cy, 70, 0, Math.PI * 2);
      ctx.stroke();
      ctx.restore();

      // Resting waveform bars (batched)
      var barCount = 24;
      var baseR = 46;
      ctx.save();
      ctx.beginPath();
      ctx.strokeStyle = 'rgba(201, 162, 74, 0.35)';
      ctx.lineWidth = 1.8;
      for (var b = 0; b < barCount; b++) {
        var barAngle = (b / barCount) * Math.PI * 2;
        var x1 = cx + Math.cos(barAngle) * baseR;
        var y1 = cy + Math.sin(barAngle) * baseR;
        var x2 = cx + Math.cos(barAngle) * (baseR + 4);
        var y2 = cy + Math.sin(barAngle) * (baseR + 4);
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
      }
      ctx.stroke();
      ctx.restore();

      // Core sphere
      var coreRadius = 36;
      var coreGrad = ctx.createRadialGradient(cx - 6, cy - 6, 3, cx, cy, coreRadius);
      coreGrad.addColorStop(0, '#ffffff');
      coreGrad.addColorStop(0.2, '#fff4d6');
      coreGrad.addColorStop(0.55, '#dfa753');
      coreGrad.addColorStop(0.85, '#c9a24a');
      coreGrad.addColorStop(1, '#8b6914');
      ctx.fillStyle = coreGrad;
      ctx.beginPath();
      ctx.arc(cx, cy, coreRadius, 0, Math.PI * 2);
      ctx.fill();
    },

    // Static Paused Frame
    drawPausedFrame: function () {
      if (!this.ctx || !this.canvas) return;
      var ctx = this.ctx;
      var w = this.canvas.width;
      var h = this.canvas.height;
      var cx = w / 2;
      var cy = h / 2;

      ctx.clearRect(0, 0, w, h);

      // Amber paused halo
      var haloRadius = 60;
      var haloGrad = ctx.createRadialGradient(cx, cy, 20, cx, cy, haloRadius);
      haloGrad.addColorStop(0, 'rgba(245, 158, 11, 0.35)');
      haloGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = haloGrad;
      ctx.beginPath();
      ctx.arc(cx, cy, haloRadius, 0, Math.PI * 2);
      ctx.fill();

      // Paused core
      var coreRadius = 36;
      var coreGrad = ctx.createRadialGradient(cx - 6, cy - 6, 3, cx, cy, coreRadius);
      coreGrad.addColorStop(0, '#ffffff');
      coreGrad.addColorStop(0.3, '#fef3c7');
      coreGrad.addColorStop(0.7, '#d97706');
      coreGrad.addColorStop(1, '#78350f');
      ctx.fillStyle = coreGrad;
      ctx.beginPath();
      ctx.arc(cx, cy, coreRadius, 0, Math.PI * 2);
      ctx.fill();
    },

    // ── 6. STATE MACHINE & PLAYBACK STATUS HELPERS ──────────────────────────
    setPlaybackStatus: function (statusText) {
      this.currentPlaybackStatus = statusText;
      var statusEl = document.getElementById('ai-voice-status-text');
      if (statusEl) statusEl.textContent = statusText;
    },

    updateProgressUI: function (percent) {
      var p = Math.max(0, Math.min(100, Math.round(percent)));
      var fill = document.getElementById('ai-voice-progress-fill');
      var text = document.getElementById('ai-voice-progress-text');
      if (fill) fill.style.width = p + '%';
      if (text) text.textContent = p + '%';
    },

    startProgressTracking: function () {
      this.stopProgressTracking(false);
      this.playbackStartTime = Date.now();
      var self = this;
      var charsPerSec = 15 * (this.speechRate || 0.95);
      var totalSec = Math.max(1, this.totalChars / charsPerSec);

      this.progressTimer = setInterval(function () {
        if (self.currentState !== STATES.SPEAKING || self.isPaused) return;
        var sessionElapsed = (Date.now() - self.playbackStartTime) / 1000;
        var currentTotalElapsed = self.playbackElapsed + sessionElapsed;
        var calculatedPct = Math.min(99, Math.round((currentTotalElapsed / totalSec) * 100));

        // Use boundary progress or elapsed progress whichever is higher
        var boundaryPct = self.totalChars > 0 ? Math.round((self.charProgress / self.totalChars) * 100) : 0;
        var finalPct = Math.max(calculatedPct, boundaryPct);

        self.updateProgressUI(finalPct);
      }, 100);
    },

    stopProgressTracking: function (isPausing) {
      if (this.progressTimer) {
        clearInterval(this.progressTimer);
        this.progressTimer = null;
      }
      if (isPausing && this.playbackStartTime) {
        this.playbackElapsed += (Date.now() - this.playbackStartTime) / 1000;
        this.playbackStartTime = 0;
      }
    },

    setVolume: function (volPercent) {
      var v = Math.max(0, Math.min(100, parseInt(volPercent, 10) || 0));
      this.volume = v / 100;
      try {
        if (typeof sessionStorage !== 'undefined') {
          sessionStorage.setItem('yugma_ai_volume', v.toString());
        }
      } catch (e) {}

      var slider = document.getElementById('ai-volume-slider');
      var label = document.getElementById('ai-volume-label');
      var iconWrap = document.getElementById('ai-volume-icon-wrap');

      if (slider) slider.value = v;
      if (label) label.textContent = v + '%';

      // Dynamic High Contrast Volume SVG Icon (Mute / Low / High)
      if (iconWrap) {
        if (v === 0) {
          iconWrap.innerHTML = '<svg class="voice-svg-icon" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" fill="currentColor"/><line x1="23" y1="9" x2="17" y2="15"/><line x1="17" y1="9" x2="23" y2="15"/></svg>';
          iconWrap.setAttribute('title', 'Unmute audio');
          iconWrap.setAttribute('aria-label', 'Unmute audio');
        } else if (v < 50) {
          iconWrap.innerHTML = '<svg class="voice-svg-icon" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" fill="currentColor"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/></svg>';
          iconWrap.setAttribute('title', 'Mute audio');
          iconWrap.setAttribute('aria-label', 'Mute audio');
        } else {
          iconWrap.innerHTML = '<svg class="voice-svg-icon" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" fill="currentColor"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/></svg>';
          iconWrap.setAttribute('title', 'Mute audio');
          iconWrap.setAttribute('aria-label', 'Mute audio');
        }
      }

      if (this.activeUtterance) {
        this.activeUtterance.volume = this.volume;
      }
    },

    toggleMute: function () {
      if (this.volume > 0) {
        this.lastNonZeroVolume = Math.round(this.volume * 100) || 90;
        this.setVolume(0);
      } else {
        this.setVolume(this.lastNonZeroVolume || 90);
      }
    },

    setState: function (newState, statusOverride) {
      this.currentState = newState;

      var fab = document.getElementById('yugma-ai-fab');
      if (fab) fab.setAttribute('data-state', newState);

      var indicator = document.getElementById('ai-state-indicator');
      var label = document.getElementById('ai-state-label');
      if (indicator && label) {
        indicator.className = 'ai-state-indicator ' + newState;
      }

      var playBtn = document.getElementById('btn-ai-play');
      var pauseBtn = document.getElementById('btn-ai-pause');
      var resumeBtn = document.getElementById('btn-ai-resume');
      var stopBtn = document.getElementById('btn-ai-stop');
      var replayBtn = document.getElementById('btn-ai-replay');

      var hasText = !!(this.lastSpokenText && this.lastSpokenText.trim());

      switch (newState) {
        case STATES.IDLE:
          if (label) label.textContent = "✦ IDLE // READY";
          this.setPlaybackStatus(statusOverride || "Ready to play.");
          if (playBtn) { playBtn.style.display = 'inline-flex'; playBtn.disabled = !hasText; }
          if (pauseBtn) { pauseBtn.style.display = 'inline-flex'; pauseBtn.disabled = true; }
          if (resumeBtn) { resumeBtn.style.display = 'none'; resumeBtn.disabled = true; }
          if (stopBtn) stopBtn.disabled = true;
          if (replayBtn) replayBtn.disabled = !hasText;
          this.speechCadenceEnergy = 0.08;
          this.stopAnimation();
          this.drawIdleFrame();
          break;

        case STATES.THINKING:
          if (label) label.textContent = "✦ DELIBERATING ARCHIVE...";
          var agentName = (HERITAGE_AGENTS[this.selectedAgent] ? HERITAGE_AGENTS[this.selectedAgent].name : "Agent");
          this.setPlaybackStatus("Consulting " + agentName + "...");
          if (playBtn) playBtn.disabled = true;
          if (pauseBtn) playBtn.disabled = true;
          if (resumeBtn) resumeBtn.style.display = 'none';
          if (stopBtn) stopBtn.disabled = false;
          if (replayBtn) replayBtn.disabled = true;
          this.speechCadenceEnergy = 0.25;
          this.startAnimation();
          break;

        case STATES.SPEAKING:
          if (label) label.textContent = "✦ AGENT SPEAKING...";
          this.setPlaybackStatus("Currently speaking.");
          if (playBtn) playBtn.style.display = 'none';
          if (resumeBtn) resumeBtn.style.display = 'none';
          if (pauseBtn) { pauseBtn.style.display = 'inline-flex'; pauseBtn.disabled = false; }
          if (stopBtn) stopBtn.disabled = false;
          if (replayBtn) replayBtn.disabled = false;
          this.startAnimation();
          break;

        case STATES.PAUSED:
          if (label) label.textContent = "✦ SPEECH PAUSED";
          this.setPlaybackStatus("Paused.");
          if (playBtn) playBtn.style.display = 'none';
          if (pauseBtn) pauseBtn.style.display = 'none';
          if (resumeBtn) { resumeBtn.style.display = 'inline-flex'; resumeBtn.disabled = false; }
          if (stopBtn) stopBtn.disabled = false;
          if (replayBtn) replayBtn.disabled = false;
          this.speechCadenceEnergy = 0.05;
          this.stopAnimation();
          this.drawPausedFrame();
          break;
      }
    },

    // ── 7. SPEECH SYNTHESIS & VOICE CONTROL ─────────────────────────────────
    speakCurrentResponse: function (startIndex) {
      if (!this.lastSpokenText) return;
      var self = this;

      if (!('speechSynthesis' in window)) {
        console.warn('Web Speech API not supported in this browser.');
        self.setPlaybackStatus('Audio unavailable.');
        self.setState(STATES.IDLE, 'Audio unavailable.');
        return;
      }

      window.speechSynthesis.cancel();

      var offset = (typeof startIndex === 'number' && startIndex >= 0) ? startIndex : 0;
      if (offset >= this.lastSpokenText.length) {
        offset = 0;
      }
      this.activeOffset = offset;
      this.charProgress = offset;
      this.totalChars = this.lastSpokenText.length;

      var charsPerSec = 15 * (this.speechRate || 0.95);
      this.playbackElapsed = offset > 0 ? (offset / charsPerSec) : 0;

      var textSlice = (offset > 0) ? this.lastSpokenText.slice(offset) : this.lastSpokenText;
      var utterance = new SpeechSynthesisUtterance(textSlice);
      utterance.rate = this.speechRate;
      utterance.volume = this.volume;
      utterance.pitch = 1.0;

      // Select best voice (Indian English or British/Natural English preferred)
      var voices = window.speechSynthesis.getVoices();
      var preferredVoice = voices.find(function (v) {
        return v.lang.includes('en-IN') || v.name.includes('India') || v.name.includes('Rishi') || v.name.includes('Veena');
      }) || voices.find(function (v) {
        return v.lang.startsWith('en') && (v.name.includes('Natural') || v.name.includes('Google') || v.name.includes('Samantha'));
      });
      if (preferredVoice) utterance.voice = preferredVoice;

      utterance.onstart = function () {
        self.isPaused = false;
        self.setState(STATES.SPEAKING);
        self.startProgressTracking();
      };

      utterance.onboundary = function (e) {
        if (e.name === 'word') {
          var absoluteIndex = self.activeOffset + e.charIndex;
          self.charProgress = absoluteIndex;
          var percent = Math.min(99, Math.round((absoluteIndex / Math.max(1, self.totalChars)) * 100));
          self.updateProgressUI(percent);

          var word = self.lastSpokenText.substr(absoluteIndex, e.charLength || 5).toLowerCase();
          var vowels = (word.match(/[aeiou]/g) || []).length;
          self.speechCadenceEnergy = Math.min(1.0, 0.35 + vowels * 0.18);
          setTimeout(function () {
            self.speechCadenceEnergy = 0.15;
          }, 160);
        }
      };

      utterance.onpause = function () {
        self.isPaused = true;
        self.stopProgressTracking(true);
        self.setState(STATES.PAUSED);
      };

      utterance.onresume = function () {
        self.isPaused = false;
        self.setState(STATES.SPEAKING);
        self.startProgressTracking();
      };

      utterance.onend = function () {
        self.isPaused = false;
        self.stopProgressTracking(false);
        self.playbackElapsed = 0;
        self.charProgress = self.totalChars;
        self.updateProgressUI(100);
        self.setState(STATES.IDLE, 'Finished.');
      };

      utterance.onerror = function (err) {
        console.warn('SpeechSynthesis error:', err);
        self.isPaused = false;
        self.stopProgressTracking(false);
        self.setPlaybackStatus('Audio unavailable.');
        self.setState(STATES.IDLE, 'Audio unavailable.');
      };

      this.activeUtterance = utterance;
      window.speechSynthesis.speak(utterance);
    },

    pauseSpeech: function () {
      if ('speechSynthesis' in window && window.speechSynthesis.speaking) {
        this.isPaused = true;
        this.stopProgressTracking(true);
        window.speechSynthesis.pause();
        this.setState(STATES.PAUSED);
      }
    },

    resumeSpeech: function () {
      var self = this;
      this.isPaused = false;

      if ('speechSynthesis' in window && window.speechSynthesis.paused) {
        window.speechSynthesis.resume();
        this.setState(STATES.SPEAKING);
        this.startProgressTracking();

        // Safety fallback for browsers that fail to resume paused utterances
        setTimeout(function () {
          if ('speechSynthesis' in window && window.speechSynthesis.paused && self.currentState === STATES.SPEAKING) {
            window.speechSynthesis.cancel();
            self.speakCurrentResponse(self.charProgress || 0);
          }
        }, 220);
      } else if (this.lastSpokenText) {
        this.speakCurrentResponse(this.charProgress || 0);
      }
    },

    stopSpeech: function () {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
      this.isPaused = false;
      this.stopProgressTracking(false);
      this.playbackElapsed = 0;
      this.charProgress = 0;
      this.activeOffset = 0;
      this.updateProgressUI(0);
      this.setState(STATES.IDLE, 'Stopped.');
    },

    replaySpeech: function () {
      this.stopSpeech();
      this.speakCurrentResponse(0);
    },

    // ── 8. QUESTION ANSWERING PIPELINE & SECURE SERVERLESS GATEWAY ──────────
    askAI: function (query) {
      var self = this;
      if (!query || !query.trim()) return;

      var q = query.trim();
      self.stopSpeech();
      self.setState(STATES.THINKING);

      var activeAgent = HERITAGE_AGENTS[self.selectedAgent] || HERITAGE_AGENTS.orchestrator;
      self.callGeminiAPI(q, activeAgent);
    },

    callGeminiAPI: function (userQuery, agent) {
      var self = this;
      var endpoint = (typeof YUGMA_AI_CONFIG !== 'undefined' && YUGMA_AI_CONFIG.API_ENDPOINT)
        ? YUGMA_AI_CONFIG.API_ENDPOINT
        : '/.netlify/functions/gemini';

      var payload = {
        prompt: userQuery,
        agentId: agent.id,
        agentName: agent.name,
        agentTitle: agent.title,
        systemPrompt: agent.systemPrompt
      };

      fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })
      .then(function (res) {
        if (!res.ok) throw new Error('AI Serverless Gateway HTTP Error ' + res.status);
        return res.json();
      })
      .then(function (data) {
        if (!data || !data.text) {
          throw new Error('Empty response from AI gateway');
        }
        var title = "✦ " + agent.name.toUpperCase() + ": " + userQuery.substr(0, 38) + "...";
        self.updateTranscript(title, data.text, 'gemini');
        self.speakCurrentResponse();
      })
      .catch(function (err) {
        console.warn('AI Serverless Gateway call failed or server not active, seamlessly falling back to curated knowledge:', err);
        self.callCuratedKnowledge(userQuery, agent, true);
      });
    },

    callCuratedKnowledge: function (userQuery, agent, hadFallback) {
      var self = this;
      var q = userQuery.toLowerCase().trim();

      var matchedKey = 'general';
      for (var key in HERITAGE_KNOWLEDGE) {
        var item = HERITAGE_KNOWLEDGE[key];
        if (item.keywords) {
          for (var i = 0; i < item.keywords.length; i++) {
            if (q.includes(item.keywords[i])) {
              matchedKey = key;
              break;
            }
          }
        }
        if (matchedKey !== 'general') break;
      }

      var entry = HERITAGE_KNOWLEDGE[matchedKey] || HERITAGE_KNOWLEDGE.general;
      var responseText = entry[agent.id] || entry.orchestrator || entry.historian || "Here is information from the YUGMA Civilizational Archive.";

      setTimeout(function () {
        var title = entry.title || "YUGMA Heritage Archive";
        if (hadFallback) {
          title += " (Curated Offline Mode)";
        }
        self.updateTranscript(title, responseText, 'curated');
        self.speakCurrentResponse();
      }, 750);
    },

    // ── 9. EVENT BINDING ───────────────────────────────────────────────────
    bindEvents: function () {
      var self = this;

      // 1. FAB Launcher button (Top-Right)
      var fab = document.getElementById('yugma-ai-fab');
      if (fab) {
        fab.addEventListener('click', function () {
          self.openModal();
        });
      }

      // 2. Nav bar launcher button if present
      var navBtn = document.getElementById('btn-nav-ai-companion');
      if (navBtn) {
        navBtn.addEventListener('click', function (e) {
          e.preventDefault();
          self.openModal();
        });
      }

      // 3. Modal close button
      var closeBtn = document.getElementById('btn-ai-modal-close');
      if (closeBtn) {
        closeBtn.addEventListener('click', function () {
          self.closeModal();
        });
      }

      // 4. Backdrop click to close
      var backdrop = document.getElementById('ai-companion-modal-backdrop');
      if (backdrop) {
        backdrop.addEventListener('click', function (e) {
          if (e.target === backdrop) self.closeModal();
        });
      }

      // 5. Motion Toggle
      var motionBtn = document.getElementById('btn-ai-toggle-motion');
      if (motionBtn) {
        motionBtn.addEventListener('click', function () {
          self.motionEnabled = !self.motionEnabled;
          motionBtn.innerHTML = self.motionEnabled
            ? '<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block; vertical-align:middle; margin-right:4px;"><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/></svg><span>Motion: ON</span>'
            : '<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block; vertical-align:middle; margin-right:4px;"><circle cx="12" cy="12" r="9"/></svg><span>Motion: OFF</span>';
        });
      }

      // 6. Voice Control Buttons (Single component directly below visualizer)
      var playBtn = document.getElementById('btn-ai-play');
      if (playBtn) {
        playBtn.addEventListener('click', function () {
          if (self.currentState === STATES.PAUSED) {
            self.resumeSpeech();
          } else {
            self.speakCurrentResponse(0);
          }
        });
      }

      var pauseBtn = document.getElementById('btn-ai-pause');
      if (pauseBtn) {
        pauseBtn.addEventListener('click', function () { self.pauseSpeech(); });
      }

      var resumeBtn = document.getElementById('btn-ai-resume');
      if (resumeBtn) {
        resumeBtn.addEventListener('click', function () { self.resumeSpeech(); });
      }

      var stopBtn = document.getElementById('btn-ai-stop');
      if (stopBtn) {
        stopBtn.addEventListener('click', function () { self.stopSpeech(); });
      }

      var replayBtn = document.getElementById('btn-ai-replay');
      if (replayBtn) {
        replayBtn.addEventListener('click', function () { self.replaySpeech(); });
      }

      // Volume Slider & Mute Toggle
      var volSlider = document.getElementById('ai-volume-slider');
      if (volSlider) {
        volSlider.addEventListener('input', function (e) {
          self.setVolume(e.target.value);
        });
      }

      var muteWrap = document.getElementById('ai-volume-icon-wrap');
      if (muteWrap) {
        muteWrap.addEventListener('click', function () {
          self.toggleMute();
        });
      }

      // 7. Multi-Agent Selector Pills
      var agentPills = document.querySelectorAll('.agent-pill');
      agentPills.forEach(function (pill) {
        pill.addEventListener('click', function () {
          var agentId = pill.getAttribute('data-agent');
          self.setAgent(agentId);
        });
      });

      // 8. Chat Form Submit
      var form = document.getElementById('ai-chat-form');
      var input = document.getElementById('ai-chat-input');
      if (form) {
        form.addEventListener('submit', function (e) {
          e.preventDefault();
          if (input && input.value.trim()) {
            var query = input.value.trim();
            self.askAI(query);
            input.value = '';
          }
        });
      }

      // 9. Page visibility & escape key handlers (Pause audio & stop animation on tab switch)
      document.addEventListener('visibilitychange', function () {
        if (document.hidden) {
          self.stopAnimation();
          self.pauseSpeech();
        } else {
          var modal = document.getElementById('ai-companion-modal-backdrop');
          if (modal && modal.classList.contains('active')) {
            if (self.currentState === STATES.SPEAKING || self.currentState === STATES.THINKING) {
              self.startAnimation();
            } else {
              self.drawIdleFrame();
            }
          }
        }
      });

      document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') {
          self.closeModal();
        }
      });
    },

    openModal: function () {
      var backdrop = document.getElementById('ai-companion-modal-backdrop');
      if (backdrop) {
        backdrop.classList.add('active');
        this.isModalOpen = true;
        if (this.currentState === STATES.SPEAKING || this.currentState === STATES.THINKING) {
          this.startAnimation();
        } else {
          this.drawIdleFrame();
        }
      }
    },

    closeModal: function () {
      var backdrop = document.getElementById('ai-companion-modal-backdrop');
      if (backdrop) {
        backdrop.classList.remove('active');
        this.isModalOpen = false;
        this.stopSpeech();
        this.stopAnimation();
      }
    }
  };

  // Auto-initialize when DOM is ready
  if (typeof window !== 'undefined') {
    if (document.readyState === 'loading') {
      window.addEventListener('DOMContentLoaded', function () {
        AIVisualizer.init();
      });
    } else {
      AIVisualizer.init();
    }
  }

  return AIVisualizer;
}));
"""

code = TEMPLATE.replace('__REPLACE_AGENTS__', JSON_AGENTS)
code = code.replace('__REPLACE_PROMPTS__', JSON_PROMPTS)
code = code.replace('__REPLACE_KNOWLEDGE__', JSON_KNOWLEDGE)

target_path = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), 'js', 'aiVisualizer.js')
with open(target_path, 'w', encoding='utf-8') as f:
    f.write(code)

print("Successfully generated secure js/aiVisualizer.js! Size:", len(code), "Target:", target_path)
