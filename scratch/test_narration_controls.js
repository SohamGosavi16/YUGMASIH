/**
 * Comprehensive Automated Test Suite for YUGMA AI Narration Playback Controls
 */

const fs = require('fs');
const assert = require('assert');

// 1. Mock Browser Environment
global.window = global;
global.document = {
  readyState: 'complete',
  elements: {},
  body: {
    appendChild: function (el) {
      if (el.id) global.document.elements[el.id] = el;
      // Also register elements inside child
      if (el.children) {
        function reg(parent) {
          (parent.children || []).forEach(c => {
            if (c.id) global.document.elements[c.id] = c;
            reg(c);
          });
        }
        reg(el);
      }
    }
  },
  createElement: function (tag) {
    const el = {
      tagName: tag.toUpperCase(),
      attributes: {},
      style: {},
      getContext: function() {
        return {
          arc: () => {},
          stroke: () => {},
          fill: () => {},
          save: () => {},
          restore: () => {},
          beginPath: () => {},
          moveTo: () => {},
          lineTo: () => {},
          clearRect: () => {},
          setLineDash: () => {},
          createRadialGradient: () => ({ addColorStop: () => {} })
        };
      },
      classList: {
        classes: new Set(),
        add: function (c) { this.classes.add(c); el.className = Array.from(this.classes).join(' '); },
        remove: function (c) { this.classes.delete(c); el.className = Array.from(this.classes).join(' '); },
        contains: function (c) { return this.classes.has(c); }
      },
      listeners: {},
      addEventListener: function (evt, fn) {
        if (!this.listeners[evt]) this.listeners[evt] = [];
        this.listeners[evt].push(fn);
      },
      dispatchEvent: function (evt) {
        if (this.listeners[evt.type]) {
          this.listeners[evt.type].forEach(fn => fn(evt));
        }
      },
      setAttribute: function (k, v) {
        this.attributes[k] = v;
        if (k === 'id') global.document.elements[v] = this;
      },
      getAttribute: function (k) { return this.attributes[k]; },
      children: [],
      set innerHTML(html) {
        this._html = html;
        // Simple parser to extract IDs and create element stubs
        const idMatches = html.matchAll(/id=["']([^"']+)["']/g);
        for (const m of idMatches) {
          const childId = m[1];
          const childEl = {
            id: childId,
            style: {},
            getContext: function() {
              return {
                arc: () => {},
                stroke: () => {},
                fill: () => {},
                save: () => {},
                restore: () => {},
                beginPath: () => {},
                moveTo: () => {},
                lineTo: () => {},
                clearRect: () => {},
                setLineDash: () => {},
                createRadialGradient: () => ({ addColorStop: () => {} })
              };
            },
            classList: {
              classes: new Set(),
              add: function (c) { this.classes.add(c); this.className = Array.from(this.classes).join(' '); },
              remove: function (c) { this.classes.delete(c); this.className = Array.from(this.classes).join(' '); },
              contains: function (c) { return this.classes.has(c); }
            },
            listeners: {},
            addEventListener: function (evt, fn) {
              if (!this.listeners[evt]) this.listeners[evt] = [];
              this.listeners[evt].push(fn);
            },
            dispatchEvent: function (evt) {
              if (this.listeners[evt.type]) {
                this.listeners[evt.type].forEach(fn => fn(evt));
              }
            },
            querySelectorAll: function() { return []; },
            setAttribute: function (k, v) { this[k] = v; },
            getAttribute: function (k) { return this[k]; },
            textContent: ''
          };
          global.document.elements[childId] = childEl;
        }
      },
      get innerHTML() { return this._html || ''; }
    };
    return el;
  },
  getElementById: function (id) {
    return this.elements[id] || null;
  },
  querySelectorAll: function () {
    return [];
  },
  addEventListener: function () {}
};

// Mock SpeechSynthesis
let activeUtterances = [];
let isSpeechPaused = false;
let isSpeaking = false;

global.SpeechSynthesisUtterance = function (text) {
  this.text = text;
  this.rate = 1;
  this.volume = 1;
  this.pitch = 1;
  this.voice = null;
  this.onstart = null;
  this.onboundary = null;
  this.onpause = null;
  this.onresume = null;
  this.onend = null;
  this.onerror = null;
};

global.speechSynthesis = {
  speaking: false,
  paused: false,
  speak: function (utt) {
    this.speaking = true;
    this.paused = false;
    activeUtterances.push(utt);
    if (utt.onstart) utt.onstart();
  },
  pause: function () {
    this.paused = true;
    if (activeUtterances.length > 0 && activeUtterances[activeUtterances.length - 1].onpause) {
      activeUtterances[activeUtterances.length - 1].onpause();
    }
  },
  resume: function () {
    this.paused = false;
    this.speaking = true;
    if (activeUtterances.length > 0 && activeUtterances[activeUtterances.length - 1].onresume) {
      activeUtterances[activeUtterances.length - 1].onresume();
    }
  },
  cancel: function () {
    this.speaking = false;
    this.paused = false;
    activeUtterances = [];
  },
  getVoices: function () {
    return [
      { lang: 'en-IN', name: 'Rishi - Indian English' },
      { lang: 'en-US', name: 'Samantha' }
    ];
  }
};

// Load YugmaAIVisualizer
const ai = require('../js/aiVisualizer.js');
ai.init();

console.log('--- TEST 1: DOM Elements Verification ---');
const requiredIds = [
  // Visualizer column controls
  'btn-ai-play',
  'btn-ai-pause',
  'btn-ai-resume',
  'btn-ai-stop',
  'btn-ai-replay',
  'ai-volume-slider',
  'ai-volume-label',
  'ai-voice-status-text',
  'ai-voice-progress-fill',
  'ai-voice-progress-text',
  // Chat panel narration bar controls
  'ai-chat-narration-bar',
  'btn-ai-chat-play',
  'btn-ai-chat-pause',
  'btn-ai-chat-resume',
  'btn-ai-chat-stop',
  'btn-ai-chat-replay',
  'ai-chat-volume-slider',
  'ai-chat-volume-label',
  'ai-chat-status-text',
  'ai-chat-progress-fill',
  'ai-chat-progress-text'
];

requiredIds.forEach(id => {
  const el = document.getElementById(id);
  assert(el !== null, `Missing required element: ${id}`);
  console.log(`  ✓ Element #${id} exists`);
});

console.log('\n--- TEST 2: Initial Status & Playback State ---');
ai.updateTranscript('Taj Mahal', 'The Taj Mahal is an ivory-white marble mausoleum on the south bank of the Yamuna river.', 'curated');
const status1 = document.getElementById('ai-voice-status-text').textContent;
const chatStatus1 = document.getElementById('ai-chat-status-text').textContent;
assert.strictEqual(status1, 'Ready to play.', `Expected "Ready to play." but got "${status1}"`);
assert.strictEqual(chatStatus1, 'Ready to play.', `Expected "Ready to play." but got "${chatStatus1}"`);
console.log('  ✓ Initial state is "Ready to play."');

console.log('\n--- TEST 3: Play Button Functionality ---');
// Trigger play via button listener or speakCurrentResponse
ai.speakCurrentResponse();
assert.strictEqual(ai.currentState, 'speaking', 'State should be speaking');
const statusSpeaking = document.getElementById('ai-voice-status-text').textContent;
assert.strictEqual(statusSpeaking, 'Currently speaking.', `Expected "Currently speaking." but got "${statusSpeaking}"`);
console.log('  ✓ Play action sets state to "speaking" and status to "Currently speaking."');

console.log('\n--- TEST 4: Word Boundary Progress Tracking ---');
const utt = activeUtterances[0];
assert(utt, 'Active utterance should exist');
// Simulate boundary event at character 30
utt.onboundary({ name: 'word', charIndex: 30, charLength: 5 });
const progressText = document.getElementById('ai-voice-progress-text').textContent;
const chatProgressText = document.getElementById('ai-chat-progress-text').textContent;
console.log(`  ✓ Progress updated: ${progressText} (sync chat: ${chatProgressText})`);
assert(parseInt(progressText) > 0, 'Progress percent should be > 0%');
assert.strictEqual(progressText, chatProgressText, 'Progress should match across both panels');

console.log('\n--- TEST 5: Pause Button Functionality ---');
ai.pauseSpeech();
assert.strictEqual(ai.currentState, 'paused', 'State should be paused');
const statusPaused = document.getElementById('ai-voice-status-text').textContent;
assert.strictEqual(statusPaused, 'Paused.', `Expected "Paused." but got "${statusPaused}"`);
assert.strictEqual(ai.isPaused, true, 'isPaused flag should be true');
console.log('  ✓ Pause action sets state to "paused" and status to "Paused."');

console.log('\n--- TEST 6: Resume Button Functionality ---');
ai.resumeSpeech();
assert.strictEqual(ai.currentState, 'speaking', 'State should be speaking after resume');
const statusResumed = document.getElementById('ai-voice-status-text').textContent;
assert.strictEqual(statusResumed, 'Currently speaking.', `Expected "Currently speaking." but got "${statusResumed}"`);
assert.strictEqual(ai.isPaused, false, 'isPaused flag should be false');
console.log('  ✓ Resume continues from paused position and sets status to "Currently speaking."');

console.log('\n--- TEST 7: Stop Button Functionality ---');
ai.stopSpeech();
assert.strictEqual(ai.currentState, 'idle', 'State should be idle after stop');
const statusStopped = document.getElementById('ai-voice-status-text').textContent;
assert.strictEqual(statusStopped, 'Stopped.', `Expected "Stopped." but got "${statusStopped}"`);
const progressStopped = document.getElementById('ai-voice-progress-text').textContent;
assert.strictEqual(progressStopped, '0%', 'Progress should reset to 0% after stop');
console.log('  ✓ Stop terminates playback, resets progress to 0%, sets status to "Stopped."');

console.log('\n--- TEST 8: Replay Button Functionality ---');
ai.replaySpeech();
assert.strictEqual(ai.currentState, 'speaking', 'State should be speaking after replay');
assert.strictEqual(ai.charProgress, 0, 'charProgress should start from 0 on replay');
const statusReplay = document.getElementById('ai-voice-status-text').textContent;
assert.strictEqual(statusReplay, 'Currently speaking.', `Expected "Currently speaking." but got "${statusReplay}"`);
console.log('  ✓ Replay restarts from beginning (char 0) and sets status to "Currently speaking."');

console.log('\n--- TEST 9: Finished Status on Utterance Completion ---');
const activeUtt = activeUtterances[activeUtterances.length - 1];
activeUtt.onend();
assert.strictEqual(ai.currentState, 'idle', 'State should be idle after speech completion');
const statusFinished = document.getElementById('ai-voice-status-text').textContent;
assert.strictEqual(statusFinished, 'Finished.', `Expected "Finished." but got "${statusFinished}"`);
const progressFinished = document.getElementById('ai-voice-progress-text').textContent;
assert.strictEqual(progressFinished, '100%', 'Progress should show 100% on finish');
console.log('  ✓ Natural completion sets status to "Finished." and progress to 100%');

console.log('\n--- TEST 10: Audio Unavailable Status on Error ---');
ai.speakCurrentResponse();
const errUtt = activeUtterances[activeUtterances.length - 1];
errUtt.onerror({ error: 'audio-busy' });
assert.strictEqual(ai.currentState, 'idle', 'State should be idle after speech error');
const statusErr = document.getElementById('ai-voice-status-text').textContent;
assert.strictEqual(statusErr, 'Audio unavailable.', `Expected "Audio unavailable." but got "${statusErr}"`);
console.log('  ✓ Speech error gracefully sets status to "Audio unavailable."');

console.log('\n--- TEST 11: Volume Slider & Sync ---');
ai.setVolume(75);
assert.strictEqual(ai.volume, 0.75, 'Volume should be 0.75');
assert.strictEqual(document.getElementById('ai-volume-label').textContent, '75%');
assert.strictEqual(document.getElementById('ai-chat-volume-label').textContent, '75%');
assert.strictEqual(document.getElementById('ai-volume-slider').value, 75);
assert.strictEqual(document.getElementById('ai-chat-volume-slider').value, 75);
console.log('  ✓ Volume set to 75% correctly synchronized across both sliders and labels');

console.log('\n--- TEST 12: Check No Bottom-Left Floating Audio Controls ---');
const html = fs.readFileSync('index.html', 'utf8');
const css = fs.readFileSync('css/aiVisualizer.css', 'utf8');
const hasBottomLeftAudio = /position:\s*fixed;[^}]*bottom:[^}]*left:[^}]*\b(audio|play|voice)\b/i.test(html + css);
assert.strictEqual(hasBottomLeftAudio, false, 'No floating audio controls at bottom-left allowed');
console.log('  ✓ Confirmed 0 floating audio controls at bottom-left corner of the website');

console.log('\n=========================================');
console.log('ALL 12 TESTS PASSED PERFECTLY!');
console.log('=========================================');
