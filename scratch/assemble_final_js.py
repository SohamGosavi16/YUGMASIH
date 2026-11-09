# -*- coding: utf-8 -*-
"""
Assemble production js/aiVisualizer.js without ANY client-side credentials.
Routes requests securely through Netlify Serverless Function: /.netlify/functions/gemini
The Gemini API key is stored only on the server in process.env.GEMINI_API_KEY.
"""

import os
import json
from finish_builder import ALL_KNOWLEDGE, HERITAGE_AGENTS, AGENT_PROMPTS

JSON_AGENTS = json.dumps(HERITAGE_AGENTS, indent=2)
JSON_PROMPTS = json.dumps(AGENT_PROMPTS, indent=2)
JSON_KNOWLEDGE = json.dumps(ALL_KNOWLEDGE, indent=2)

TEMPLATE = """/**
 * YUGMA AI Heritage Companion & Audio Visualizer (Multi-Agent System)
 * Version: 2.7.0 (Secure Serverless Architecture)
 * 
 * Features:
 * - 5 Specialized Heritage AI Agents:
 *   1. All-Rounder (Civilizational Synthesis & Harmonizer)
 *   2. Chief Historian (Itihasa: Dynastic archives, timelines, epigraphy)
 *   3. Master Architect (Sthapatya: Vastu Shastra, acoustics, interlocking stone)
 *   4. Sacred Lore (Katha: Temple myths, deity iconography, living folklore)
 *   5. Travel Curator (Yatra: Viewpoints, golden hour photography, circuits)
 * - Secure Serverless Architecture:
 *   Calls Netlify Serverless Function (/.netlify/functions/gemini)
 *   The Google Gemini API key is stored securely in Netlify environment variables (GEMINI_API_KEY)
 *   and is NEVER exposed to the browser, network URLs, or GitHub.
 * - Vastly Expanded Local Knowledge Base for all 22 YUGMA Heritage Monuments (Offline/Fallback)
 * - 4-State Golden AI Orb Visualizer with dynamic audio-reactive waveforms
 * - Web Speech API cadence synchronization & voice controls
 * - High accessibility (reduced motion toggle, keyboard shortcuts, mobile responsive)
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
  // The Gemini API key is securely managed on the server (Netlify Environment Variables)
  // and is never exposed in client-side code, network URLs, or GitHub.
  var YUGMA_AI_CONFIG = {
    // Relative endpoint for the Netlify serverless function (works on local netlify dev and production)
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

    // Audio & Speech
    audioContext: null,
    analyserNode: null,
    activeUtterance: null,
    speechCadenceEnergy: 0.1,
    motionEnabled: true,
    volume: 0.9,
    speechRate: 0.95,
    lastSpokenText: "",
    lastSpokenTitle: "",
    charProgress: 0,
    totalChars: 0,
    isPaused: false,
    activeOffset: 0,
    currentPlaybackStatus: "Ready to play.",

    // Canvas & Animation loop
    canvas: null,
    ctx: null,
    animFrameId: null,
    lastFrameTime: 0,
    wavePhase: 0,
    pulseScale: 1.0,
    concentricAngle1: 0,
    concentricAngle2: 0,
    concentricAngle3: 0,
    particles: [],

    // ── Initialization ──────────────────────────────────────────────────────
    init: function () {
      this.initDOM();
      this.initParticles();
      this.bindEvents();
      this.setAgent('orchestrator');
      this.setInitialText();
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

      // 2. Create Modal Container if missing (Clean UI: No API key prompts for end-users)
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
          '        <i class="fa-solid fa-wand-magic"></i> <span>Motion: ON</span>',
          '      </button>',
          '      <button type="button" class="btn-ai-modal-close" id="btn-ai-modal-close" title="Close AI Companion">&times;</button>',
          '    </div>',
          '  </div>',
          '  <!-- Modal Body -->',
          '  <div class="ai-modal-body">',
          '    <!-- Left Column: Golden Orb Visualizer & Voice Controls -->',
          '    <div class="ai-visualizer-column">',
          '      <div class="ai-orb-stage">',
          '        <canvas class="ai-orb-canvas" id="ai-orb-canvas" width="560" height="560"></canvas>',
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
          '            <i class="fa-solid fa-stop"></i>',
          '          </button>',
          '          <button type="button" class="btn-voice-ctrl" id="btn-ai-pause" title="Pause narration" aria-label="Pause narration" disabled>',
          '            <i class="fa-solid fa-pause"></i>',
          '          </button>',
          '          <button type="button" class="btn-voice-ctrl btn-main-play" id="btn-ai-play" title="Play narration" aria-label="Play narration">',
          '            <i class="fa-solid fa-play" id="ai-play-btn-icon"></i>',
          '          </button>',
          '          <button type="button" class="btn-voice-ctrl btn-main-play" id="btn-ai-resume" title="Resume narration" aria-label="Resume narration" style="display:none;">',
          '            <i class="fa-solid fa-play"></i>',
          '          </button>',
          '          <button type="button" class="btn-voice-ctrl" id="btn-ai-replay" title="Replay narration from beginning" aria-label="Replay narration from beginning">',
          '            <i class="fa-solid fa-rotate-left"></i>',
          '          </button>',
          '        </div>',
          '        <div class="voice-volume-box">',
          '          <i class="fa-solid fa-volume-high"></i>',
          '          <input type="range" class="voice-volume-slider" id="ai-volume-slider" min="0" max="100" value="90" title="Adjust voice volume" aria-label="Adjust voice volume">',
          '          <span class="voice-volume-label" id="ai-volume-label">90%</span>',
          '        </div>',
          '      </div>',
          '    </div>',
          '    <!-- Right Column: Multi-Agent Selector, Prompts, Viewport & Input -->',
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
          '      <!-- Dedicated Narration Playback Toolbar inside Right-Side Chat Panel -->',
          '      <div class="ai-chat-narration-bar" id="ai-chat-narration-bar">',
          '        <div class="chat-narration-meta-row">',
          '          <div class="chat-narration-status-wrap">',
          '            <span class="chat-narration-status-dot"></span>',
          '            <span class="chat-narration-status-text" id="ai-chat-status-text">Ready to play.</span>',
          '          </div>',
          '          <div class="chat-narration-progress-wrap">',
          '            <div class="chat-narration-progress-bar">',
          '              <div class="chat-narration-progress-fill" id="ai-chat-progress-fill"></div>',
          '            </div>',
          '            <span class="chat-narration-pct" id="ai-chat-progress-text">0%</span>',
          '          </div>',
          '        </div>',
          '        <div class="chat-narration-controls-row">',
          '          <div class="chat-narration-btn-group">',
          '            <button type="button" class="btn-narration-ctrl" id="btn-ai-chat-stop" title="Stop narration" aria-label="Stop narration" disabled>',
          '              <i class="fa-solid fa-stop"></i>',
          '            </button>',
          '            <button type="button" class="btn-narration-ctrl" id="btn-ai-chat-pause" title="Pause narration" aria-label="Pause narration" disabled>',
          '              <i class="fa-solid fa-pause"></i>',
          '            </button>',
          '            <button type="button" class="btn-narration-ctrl btn-narration-action" id="btn-ai-chat-play" title="Play narration" aria-label="Play narration">',
          '              <i class="fa-solid fa-play"></i>',
          '            </button>',
          '            <button type="button" class="btn-narration-ctrl btn-narration-action" id="btn-ai-chat-resume" title="Resume narration" aria-label="Resume narration" style="display:none;">',
          '              <i class="fa-solid fa-play"></i>',
          '            </button>',
          '            <button type="button" class="btn-narration-ctrl" id="btn-ai-chat-replay" title="Replay narration from beginning" aria-label="Replay narration from beginning">',
          '              <i class="fa-solid fa-rotate-left"></i>',
          '            </button>',
          '          </div>',
          '          <div class="chat-narration-volume-group">',
          '            <i class="fa-solid fa-volume-high" id="ai-chat-vol-icon"></i>',
          '            <input type="range" class="chat-narration-vol-slider" id="ai-chat-volume-slider" min="0" max="100" value="90" title="Adjust narration volume" aria-label="Adjust narration volume">',
          '            <span class="chat-narration-vol-label" id="ai-chat-volume-label">90%</span>',
          '          </div>',
          '        </div>',
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

    // ── Particle System ─────────────────────────────────────────────────────
    initParticles: function () {
      this.particles = [];
      for (var i = 0; i < 40; i++) {
        var angle = Math.random() * Math.PI * 2;
        var dist = 30 + Math.random() * 110;
        this.particles.push({
          x: Math.cos(angle) * dist,
          y: Math.sin(angle) * dist,
          baseDist: dist,
          angle: angle,
          speed: (Math.random() * 0.008 + 0.003) * (Math.random() > 0.5 ? 1 : -1),
          size: Math.random() * 2.2 + 0.8,
          alpha: Math.random() * 0.6 + 0.2,
          pulseSpeed: Math.random() * 0.03 + 0.015
        });
      }
    },

    // ── Multi-Agent Switching ───────────────────────────────────────────────
    setAgent: function (agentId) {
      if (!HERITAGE_AGENTS[agentId]) agentId = 'orchestrator';
      this.selectedAgent = agentId;
      var agent = HERITAGE_AGENTS[agentId];

      // Update active pill button
      var pills = document.querySelectorAll('.agent-pill');
      pills.forEach(function (pill) {
        if (pill.getAttribute('data-agent') === agentId) {
          pill.classList.add('active');
        } else {
          pill.classList.remove('active');
        }
      });

      // Update agent description label
      var descEl = document.getElementById('ai-active-agent-desc');
      if (descEl) {
        descEl.textContent = agent.desc;
      }

      // Update response badge
      var badgeEl = document.getElementById('ai-agent-badge');
      if (badgeEl) {
        badgeEl.innerHTML = '<i class="' + agent.icon + '"></i> ' + agent.name.toUpperCase();
      }

      // Refresh prompt suggestions for this agent
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

      // Rebind click events
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
      this.totalChars = text.length;
      this.updateProgressUI(0);
      this.setPlaybackStatus('Ready to play.');
      if (this.currentState === STATES.IDLE) {
        this.setState(STATES.IDLE, 'Ready to play.');
      }
    },

    // ── 5. VISUALIZATION CANVAS RENDERING ENGINE ────────────────────────────
    startAnimation: function () {
      if (this.animFrameId) return;
      var self = this;
      function renderLoop(timestamp) {
        self.drawFrame(timestamp);
        self.animFrameId = requestAnimationFrame(renderLoop);
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

      var ctx = this.ctx;
      var w = this.canvas.width;
      var h = this.canvas.height;
      var cx = w / 2;
      var cy = h / 2;

      ctx.clearRect(0, 0, w, h);

      var dt = (timestamp - this.lastFrameTime) * 0.001;
      this.lastFrameTime = timestamp;
      if (!dt || dt > 0.1) dt = 0.016;

      if (!this.motionEnabled) {
        this.speechCadenceEnergy = (this.currentState === STATES.SPEAKING) ? 0.35 : 0.08;
      }

      var speedMultiplier = 1.0;
      if (this.currentState === STATES.THINKING) speedMultiplier = 2.4;
      else if (this.currentState === STATES.SPEAKING) speedMultiplier = 1.6 + this.speechCadenceEnergy * 2.5;
      else if (this.currentState === STATES.PAUSED) speedMultiplier = 0.2;

      this.concentricAngle1 += 0.35 * dt * speedMultiplier;
      this.concentricAngle2 -= 0.55 * dt * speedMultiplier;
      this.concentricAngle3 += 0.22 * dt * speedMultiplier;
      this.wavePhase += 1.8 * dt * speedMultiplier;

      // Outer Radial Glow Aura
      var auraRadius = 140 + Math.sin(this.wavePhase * 0.8) * 12 + this.speechCadenceEnergy * 35;
      var auraGrad = ctx.createRadialGradient(cx, cy, 20, cx, cy, auraRadius);
      auraGrad.addColorStop(0, 'rgba(201, 162, 74, 0.45)');
      auraGrad.addColorStop(0.4, 'rgba(223, 167, 83, 0.18)');
      auraGrad.addColorStop(0.7, 'rgba(201, 162, 74, 0.06)');
      auraGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = auraGrad;
      ctx.beginPath();
      ctx.arc(cx, cy, auraRadius, 0, Math.PI * 2);
      ctx.fill();

      // Golden Particles
      if (this.motionEnabled) {
        for (var i = 0; i < this.particles.length; i++) {
          var p = this.particles[i];
          p.angle += p.speed * dt * 60 * speedMultiplier;
          var curDist = p.baseDist + Math.sin(timestamp * 0.002 + i) * 8 + this.speechCadenceEnergy * 20;
          var px = cx + Math.cos(p.angle) * curDist;
          var py = cy + Math.sin(p.angle) * curDist;

          ctx.fillStyle = 'rgba(223, 167, 83, ' + p.alpha + ')';
          ctx.beginPath();
          ctx.arc(px, py, p.size, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // Concentric Dashed Architectural Rings
      ctx.save();
      ctx.strokeStyle = 'rgba(201, 162, 74, 0.45)';
      ctx.lineWidth = 1.6;
      ctx.setLineDash([8, 14]);
      ctx.beginPath();
      ctx.arc(cx, cy, 115, this.concentricAngle1, this.concentricAngle1 + Math.PI * 2);
      ctx.stroke();

      ctx.strokeStyle = 'rgba(223, 167, 83, 0.35)';
      ctx.lineWidth = 1.2;
      ctx.setLineDash([4, 18]);
      ctx.beginPath();
      ctx.arc(cx, cy, 95, this.concentricAngle2, this.concentricAngle2 + Math.PI * 2);
      ctx.stroke();

      ctx.strokeStyle = 'rgba(201, 162, 74, 0.6)';
      ctx.lineWidth = 1.8;
      ctx.setLineDash([12, 10]);
      ctx.beginPath();
      ctx.arc(cx, cy, 75, this.concentricAngle3, this.concentricAngle3 + Math.PI * 2);
      ctx.stroke();
      ctx.restore();

      // Radial Audio Waveform (28 Bars)
      var barCount = 28;
      var baseR = 52;
      ctx.save();
      for (var b = 0; b < barCount; b++) {
        var barAngle = (b / barCount) * Math.PI * 2;
        var waveMod = Math.sin(this.wavePhase + b * 0.6) * 0.5 + 0.5;
        var barLen = 6 + waveMod * (this.speechCadenceEnergy * 32 + 8);
        if (this.currentState === STATES.THINKING) barLen = 8 + Math.sin(timestamp * 0.008 + b) * 6;
        else if (this.currentState === STATES.IDLE) barLen = 4 + Math.sin(timestamp * 0.002 + b) * 2;

        var x1 = cx + Math.cos(barAngle) * baseR;
        var y1 = cy + Math.sin(barAngle) * baseR;
        var x2 = cx + Math.cos(barAngle) * (baseR + barLen);
        var y2 = cy + Math.sin(barAngle) * (baseR + barLen);

        ctx.strokeStyle = 'rgba(223, 167, 83, ' + (0.35 + waveMod * 0.45) + ')';
        ctx.lineWidth = 2.4;
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
      }
      ctx.restore();

      // Central Golden Core
      var coreRadius = 42 + Math.sin(this.wavePhase * 1.2) * 2.5 + this.speechCadenceEnergy * 10;
      var coreGrad = ctx.createRadialGradient(cx - 8, cy - 8, 4, cx, cy, coreRadius);
      coreGrad.addColorStop(0, '#ffffff');
      coreGrad.addColorStop(0.2, '#fff4d6');
      coreGrad.addColorStop(0.55, '#dfa753');
      coreGrad.addColorStop(0.85, '#c9a24a');
      coreGrad.addColorStop(1, '#8b6914');

      ctx.fillStyle = coreGrad;
      ctx.shadowColor = '#dfa753';
      ctx.shadowBlur = (this.currentState === STATES.SPEAKING) ? 28 : 14;
      ctx.beginPath();
      ctx.arc(cx, cy, coreRadius, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;
    },

    // ── 6. STATE MACHINE & PLAYBACK STATUS HELPERS ──────────────────────────
    setPlaybackStatus: function (statusText) {
      this.currentPlaybackStatus = statusText;
      var el1 = document.getElementById('ai-voice-status-text');
      var el2 = document.getElementById('ai-chat-status-text');
      if (el1) el1.textContent = statusText;
      if (el2) el2.textContent = statusText;
    },

    updateProgressUI: function (percent) {
      var p = Math.max(0, Math.min(100, Math.round(percent)));
      var fill1 = document.getElementById('ai-voice-progress-fill');
      var text1 = document.getElementById('ai-voice-progress-text');
      var fill2 = document.getElementById('ai-chat-progress-fill');
      var text2 = document.getElementById('ai-chat-progress-text');
      if (fill1) fill1.style.width = p + '%';
      if (text1) text1.textContent = p + '%';
      if (fill2) fill2.style.width = p + '%';
      if (text2) text2.textContent = p + '%';
    },

    setVolume: function (volPercent) {
      var v = Math.max(0, Math.min(100, parseInt(volPercent, 10) || 0));
      this.volume = v / 100;
      var slider1 = document.getElementById('ai-volume-slider');
      var label1 = document.getElementById('ai-volume-label');
      var slider2 = document.getElementById('ai-chat-volume-slider');
      var label2 = document.getElementById('ai-chat-volume-label');
      if (slider1) slider1.value = v;
      if (label1) label1.textContent = v + '%';
      if (slider2) slider2.value = v;
      if (label2) label2.textContent = v + '%';
      if (this.activeUtterance) {
        this.activeUtterance.volume = this.volume;
      }
    },

    setState: function (newState, statusOverride) {
      this.currentState = newState;

      // Update Top-Right FAB attribute
      var fab = document.getElementById('yugma-ai-fab');
      if (fab) {
        fab.setAttribute('data-state', newState);
      }

      var indicator = document.getElementById('ai-state-indicator');
      var label = document.getElementById('ai-state-label');
      if (indicator && label) {
        indicator.className = 'ai-state-indicator ' + newState;
      }

      var playBtns = [document.getElementById('btn-ai-play'), document.getElementById('btn-ai-chat-play')];
      var pauseBtns = [document.getElementById('btn-ai-pause'), document.getElementById('btn-ai-chat-pause')];
      var resumeBtns = [document.getElementById('btn-ai-resume'), document.getElementById('btn-ai-chat-resume')];
      var stopBtns = [document.getElementById('btn-ai-stop'), document.getElementById('btn-ai-chat-stop')];
      var replayBtns = [document.getElementById('btn-ai-replay'), document.getElementById('btn-ai-chat-replay')];

      var hasText = !!(this.lastSpokenText && this.lastSpokenText.trim());

      switch (newState) {
        case STATES.IDLE:
          if (label) label.textContent = "✦ IDLE // READY";
          this.setPlaybackStatus(statusOverride || (hasText ? "Ready to play." : "Ready to play."));
          playBtns.forEach(function (btn) {
            if (btn) {
              btn.style.display = 'inline-flex';
              btn.disabled = !hasText;
            }
          });
          pauseBtns.forEach(function (btn) {
            if (btn) {
              btn.style.display = 'inline-flex';
              btn.disabled = true;
            }
          });
          resumeBtns.forEach(function (btn) {
            if (btn) {
              btn.style.display = 'none';
              btn.disabled = true;
            }
          });
          stopBtns.forEach(function (btn) {
            if (btn) btn.disabled = true;
          });
          replayBtns.forEach(function (btn) {
            if (btn) btn.disabled = !hasText;
          });
          this.speechCadenceEnergy = 0.08;
          break;

        case STATES.THINKING:
          if (label) label.textContent = "✦ DELIBERATING ARCHIVE...";
          var agentName = (HERITAGE_AGENTS[this.selectedAgent] ? HERITAGE_AGENTS[this.selectedAgent].name : "Agent");
          this.setPlaybackStatus("Consulting " + agentName + "...");
          playBtns.forEach(function (btn) { if (btn) btn.disabled = true; });
          pauseBtns.forEach(function (btn) { if (btn) btn.disabled = true; });
          resumeBtns.forEach(function (btn) { if (btn) btn.style.display = 'none'; });
          stopBtns.forEach(function (btn) { if (btn) btn.disabled = false; });
          replayBtns.forEach(function (btn) { if (btn) btn.disabled = true; });
          this.speechCadenceEnergy = 0.25;
          break;

        case STATES.SPEAKING:
          if (label) label.textContent = "✦ AGENT SPEAKING...";
          this.setPlaybackStatus("Currently speaking.");
          playBtns.forEach(function (btn) { if (btn) btn.style.display = 'none'; });
          resumeBtns.forEach(function (btn) { if (btn) btn.style.display = 'none'; });
          pauseBtns.forEach(function (btn) {
            if (btn) {
              btn.style.display = 'inline-flex';
              btn.disabled = false;
            }
          });
          stopBtns.forEach(function (btn) { if (btn) btn.disabled = false; });
          replayBtns.forEach(function (btn) { if (btn) btn.disabled = false; });
          break;

        case STATES.PAUSED:
          if (label) label.textContent = "✦ SPEECH PAUSED";
          this.setPlaybackStatus("Paused.");
          playBtns.forEach(function (btn) { if (btn) btn.style.display = 'none'; });
          pauseBtns.forEach(function (btn) { if (btn) btn.style.display = 'none'; });
          resumeBtns.forEach(function (btn) {
            if (btn) {
              btn.style.display = 'inline-flex';
              btn.disabled = false;
            }
          });
          stopBtns.forEach(function (btn) { if (btn) btn.disabled = false; });
          replayBtns.forEach(function (btn) { if (btn) btn.disabled = false; });
          this.speechCadenceEnergy = 0.05;
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
        var startPct = Math.min(100, Math.round((self.charProgress / Math.max(1, self.totalChars)) * 100));
        self.updateProgressUI(startPct);
      };

      utterance.onboundary = function (e) {
        if (e.name === 'word') {
          var absoluteIndex = self.activeOffset + e.charIndex;
          self.charProgress = absoluteIndex;
          var percent = Math.min(100, Math.round((absoluteIndex / Math.max(1, self.totalChars)) * 100));
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
        self.setState(STATES.PAUSED);
      };

      utterance.onresume = function () {
        self.isPaused = false;
        self.setState(STATES.SPEAKING);
      };

      utterance.onend = function () {
        self.isPaused = false;
        self.updateProgressUI(100);
        self.setState(STATES.IDLE, 'Finished.');
      };

      utterance.onerror = function (err) {
        console.warn('SpeechSynthesis error:', err);
        self.isPaused = false;
        self.setPlaybackStatus('Audio unavailable.');
        self.setState(STATES.IDLE, 'Audio unavailable.');
      };

      this.activeUtterance = utterance;
      window.speechSynthesis.speak(utterance);
    },

    pauseSpeech: function () {
      if ('speechSynthesis' in window && window.speechSynthesis.speaking) {
        this.isPaused = true;
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

      // Dispatch request to Netlify Serverless Function proxying Gemini securely
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
        // Fall back gracefully to the rich 22-monument multi-agent knowledge base
        self.callCuratedKnowledge(userQuery, agent, true);
      });
    },

    callCuratedKnowledge: function (userQuery, agent, hadFallback) {
      var self = this;
      var q = userQuery.toLowerCase().trim();

      // Scan all 22 monuments and themes for keyword matches
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

      // Realistic 800ms cognitive deliberation
      setTimeout(function () {
        var title = entry.title || "YUGMA Heritage Archive";
        if (hadFallback) {
          title += " (Curated Offline Mode)";
        }
        self.updateTranscript(title, responseText, 'curated');
        self.speakCurrentResponse();
      }, 800);
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
            ? '<i class="fa-solid fa-wand-magic"></i> <span>Motion: ON</span>'
            : '<i class="fa-solid fa-wand-magic-sparkles"></i> <span>Motion: OFF</span>';
        });
      }

      // 6. Voice Control Buttons (Visualizer & Right-Side Chat Panel)
      var playBtns = [document.getElementById('btn-ai-play'), document.getElementById('btn-ai-chat-play')];
      var pauseBtns = [document.getElementById('btn-ai-pause'), document.getElementById('btn-ai-chat-pause')];
      var resumeBtns = [document.getElementById('btn-ai-resume'), document.getElementById('btn-ai-chat-resume')];
      var stopBtns = [document.getElementById('btn-ai-stop'), document.getElementById('btn-ai-chat-stop')];
      var replayBtns = [document.getElementById('btn-ai-replay'), document.getElementById('btn-ai-chat-replay')];

      playBtns.forEach(function (btn) {
        if (btn) btn.addEventListener('click', function () {
          if (self.currentState === STATES.PAUSED) {
            self.resumeSpeech();
          } else {
            self.speakCurrentResponse(0);
          }
        });
      });

      pauseBtns.forEach(function (btn) {
        if (btn) btn.addEventListener('click', function () { self.pauseSpeech(); });
      });

      resumeBtns.forEach(function (btn) {
        if (btn) btn.addEventListener('click', function () { self.resumeSpeech(); });
      });

      stopBtns.forEach(function (btn) {
        if (btn) btn.addEventListener('click', function () { self.stopSpeech(); });
      });

      replayBtns.forEach(function (btn) {
        if (btn) btn.addEventListener('click', function () { self.replaySpeech(); });
      });

      // Volume Sliders (Synchronized)
      var volSliders = [document.getElementById('ai-volume-slider'), document.getElementById('ai-chat-volume-slider')];
      volSliders.forEach(function (slider) {
        if (slider) {
          slider.addEventListener('input', function (e) {
            self.setVolume(e.target.value);
          });
        }
      });

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

      // 9. Page visibility & escape key handlers
      document.addEventListener('visibilitychange', function () {
        if (document.hidden) {
          self.stopAnimation();
          self.pauseSpeech();
        } else {
          var modal = document.getElementById('ai-companion-modal-backdrop');
          if (modal && modal.classList.contains('active')) {
            self.startAnimation();
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
        this.startAnimation();
      }
    },

    closeModal: function () {
      var backdrop = document.getElementById('ai-companion-modal-backdrop');
      if (backdrop) {
        backdrop.classList.remove('active');
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

with open('js/aiVisualizer.js', 'w', encoding='utf-8') as f:
    f.write(code)

print("Successfully generated secure js/aiVisualizer.js! Size:", len(code))
