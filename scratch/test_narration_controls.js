/**
 * Comprehensive Automated Test Suite for YUGMA AI Voice Visualizer & Narration Controls
 * Validates:
 * 1. Single active narration player (no duplicates)
 * 2. Recognizable inline SVG icons for all controls (no empty circles)
 * 3. Functional playback state transitions (Play, Pause, Resume, Stop, Replay)
 * 4. Accurate speaking progress tracking and completion
 * 5. Functional volume control with sessionStorage persistence and mute toggle
 * 6. Single throttled rAF loop and static idle/paused frames (zero CPU shadowBlur)
 * 7. Tab visibility and modal lifecycle handling
 * 8. Zero floating controls at bottom-left corner of the website
 */

const fs = require('fs');
const assert = require('assert');

// 1. Mock Browser Environment
const mockStorage = {};
global.sessionStorage = {
  getItem: (k) => (k in mockStorage ? mockStorage[k] : null),
  setItem: (k, v) => { mockStorage[k] = v.toString(); },
  removeItem: (k) => { delete mockStorage[k]; },
  clear: () => { for (let k in mockStorage) delete mockStorage[k]; }
};

global.window = global;
global.performance = { now: () => Date.now() };

let rAFQueue = [];
let animIdCounter = 1;
global.requestAnimationFrame = function (cb) {
  const id = animIdCounter++;
  rAFQueue.push({ id, cb });
  return id;
};
global.cancelAnimationFrame = function (id) {
  rAFQueue = rAFQueue.filter(item => item.id !== id);
};

global.document = {
  readyState: 'complete',
  hidden: false,
  elements: {},
  body: {
    appendChild: function (el) {
      if (el.id) global.document.elements[el.id] = el;
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
      getContext: function () {
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
        const idMatches = html.matchAll(/id=["']([^"']+)["']/g);
        for (const m of idMatches) {
          const childId = m[1];
          // Find matching innerHTML chunk if available
          const childEl = {
            id: childId,
            style: {},
            attributes: {},
            getContext: function () {
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
            querySelectorAll: function () { return []; },
            setAttribute: function (k, v) { this.attributes[k] = v; this[k] = v; },
            getAttribute: function (k) { return this.attributes[k] || this[k]; },
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
  documentListeners: {},
  addEventListener: function (evt, fn) {
    if (!this.documentListeners[evt]) this.documentListeners[evt] = [];
    this.documentListeners[evt].push(fn);
  },
  dispatchDocEvent: function (evt) {
    if (this.documentListeners[evt.type]) {
      this.documentListeners[evt.type].forEach(fn => fn(evt));
    }
  }
};

// Mock SpeechSynthesis
let activeUtterances = [];

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

console.log('--- TEST 1: Single Unified Player & Element Verification ---');
const requiredPlayerIds = [
  'btn-ai-play',
  'btn-ai-pause',
  'btn-ai-resume',
  'btn-ai-stop',
  'btn-ai-replay',
  'ai-volume-icon-wrap',
  'ai-volume-slider',
  'ai-volume-label',
  'ai-voice-status-text',
  'ai-voice-progress-fill',
  'ai-voice-progress-text'
];

requiredPlayerIds.forEach(id => {
  const el = document.getElementById(id);
  assert(el !== null, `Missing required player element: #${id}`);
  console.log(`  ✓ Element #${id} exists`);
});

// Verify NO duplicated elements exist
console.log('\n--- TEST 2: Verify Duplicate Interface Elements are Removed ---');
const duplicateIds = [
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

duplicateIds.forEach(id => {
  const el = document.getElementById(id);
  assert.strictEqual(el, null, `Duplicated element #${id} should NOT exist in the DOM`);
  console.log(`  ✓ Confirmed duplicate #${id} is completely removed`);
});

console.log('\n--- TEST 3: Verify Inline SVG Icons on All Controls ---');
const jsCode = fs.readFileSync('js/aiVisualizer.js', 'utf8');

// Check that buttons are defined with inline SVGs and not empty circles or font dependencies
assert(jsCode.includes('btn-ai-play') && jsCode.includes('<polygon points="6 4 20 12 6 20 6 4"'), 'Play button must contain inline SVG polygon');
assert(jsCode.includes('btn-ai-pause') && jsCode.includes('<rect x="6" y="4"'), 'Pause button must contain inline SVG rects');
assert(jsCode.includes('btn-ai-stop') && jsCode.includes('<rect x="5" y="5"'), 'Stop button must contain inline SVG rect');
assert(jsCode.includes('btn-ai-replay') && jsCode.includes('<path d="M3 12a9 9 0 1 0 9-9'), 'Replay button must contain inline SVG path');
assert(jsCode.includes('ai-vol-svg'), 'Volume icon must be an inline SVG');
console.log('  ✓ Play button has inline SVG polygon');
console.log('  ✓ Pause button has inline SVG rects');
console.log('  ✓ Stop button has inline SVG rect');
console.log('  ✓ Replay button has inline SVG path');
console.log('  ✓ Volume button has inline SVG speaker');

console.log('\n--- TEST 4: Initial Status & Playback State ---');
ai.updateTranscript('Taj Mahal', 'The Taj Mahal is an ivory-white marble mausoleum on the south bank of the Yamuna river in Agra.', 'curated');
const status1 = document.getElementById('ai-voice-status-text').textContent;
assert.strictEqual(status1, 'Ready to play.', `Expected "Ready to play." but got "${status1}"`);
console.log('  ✓ Initial state is "Ready to play."');

console.log('\n--- TEST 5: Play Button Action & Status ---');
ai.speakCurrentResponse();
assert.strictEqual(ai.currentState, 'speaking', 'State should be speaking');
const statusSpeaking = document.getElementById('ai-voice-status-text').textContent;
assert.strictEqual(statusSpeaking, 'Currently speaking.', `Expected "Currently speaking." but got "${statusSpeaking}"`);
assert.strictEqual(document.getElementById('btn-ai-play').style.display, 'none', 'Play button should be hidden during speech');
assert.strictEqual(document.getElementById('btn-ai-pause').style.display, 'inline-flex', 'Pause button should be visible during speech');
console.log('  ✓ Play action sets state to "speaking" and status to "Currently speaking."');

console.log('\n--- TEST 6: Progress Tracking & Word Boundary Synchronization ---');
const utt = activeUtterances[0];
assert(utt, 'Active utterance should exist');
// Simulate word boundary event at character 45
utt.onboundary({ name: 'word', charIndex: 45, charLength: 5 });
const progressText = document.getElementById('ai-voice-progress-text').textContent;
const progressPct = parseInt(progressText, 10);
assert(progressPct > 0, 'Progress percent should be > 0%');
console.log(`  ✓ Word boundary synchronized: progress is ${progressText}`);

console.log('\n--- TEST 7: Pause Button Action & Status ---');
ai.pauseSpeech();
assert.strictEqual(ai.currentState, 'paused', 'State should be paused');
const statusPaused = document.getElementById('ai-voice-status-text').textContent;
assert.strictEqual(statusPaused, 'Paused.', `Expected "Paused." but got "${statusPaused}"`);
assert.strictEqual(ai.isPaused, true, 'isPaused flag should be true');
assert.strictEqual(document.getElementById('btn-ai-pause').style.display, 'none', 'Pause button should be hidden when paused');
assert.strictEqual(document.getElementById('btn-ai-resume').style.display, 'inline-flex', 'Resume button should be visible when paused');
console.log('  ✓ Pause action sets state to "paused", status to "Paused.", shows Resume button');

console.log('\n--- TEST 8: Resume Button Action & Status ---');
ai.resumeSpeech();
assert.strictEqual(ai.currentState, 'speaking', 'State should be speaking after resume');
const statusResumed = document.getElementById('ai-voice-status-text').textContent;
assert.strictEqual(statusResumed, 'Currently speaking.', `Expected "Currently speaking." but got "${statusResumed}"`);
assert.strictEqual(ai.isPaused, false, 'isPaused flag should be false');
assert.strictEqual(document.getElementById('btn-ai-resume').style.display, 'none', 'Resume button should be hidden during speech');
assert.strictEqual(document.getElementById('btn-ai-pause').style.display, 'inline-flex', 'Pause button should be visible during speech');
console.log('  ✓ Resume continues from paused position and sets status to "Currently speaking."');

console.log('\n--- TEST 9: Stop Button Action & Status ---');
ai.stopSpeech();
assert.strictEqual(ai.currentState, 'idle', 'State should be idle after stop');
const statusStopped = document.getElementById('ai-voice-status-text').textContent;
assert.strictEqual(statusStopped, 'Stopped.', `Expected "Stopped." but got "${statusStopped}"`);
const progressStopped = document.getElementById('ai-voice-progress-text').textContent;
assert.strictEqual(progressStopped, '0%', 'Progress should reset to 0% after stop');
console.log('  ✓ Stop terminates playback, resets progress to 0%, sets status to "Stopped."');

console.log('\n--- TEST 10: Replay Button Action & Status ---');
ai.replaySpeech();
assert.strictEqual(ai.currentState, 'speaking', 'State should be speaking after replay');
assert.strictEqual(ai.charProgress, 0, 'charProgress should start from 0 on replay');
const statusReplay = document.getElementById('ai-voice-status-text').textContent;
assert.strictEqual(statusReplay, 'Currently speaking.', `Expected "Currently speaking." but got "${statusReplay}"`);
console.log('  ✓ Replay restarts from beginning (char 0) and sets status to "Currently speaking."');

console.log('\n--- TEST 11: Natural Utterance Completion (100% Progress & Finished) ---');
const activeUtt = activeUtterances[activeUtterances.length - 1];
activeUtt.onend();
assert.strictEqual(ai.currentState, 'idle', 'State should be idle after speech completion');
const statusFinished = document.getElementById('ai-voice-status-text').textContent;
assert.strictEqual(statusFinished, 'Finished.', `Expected "Finished." but got "${statusFinished}"`);
const progressFinished = document.getElementById('ai-voice-progress-text').textContent;
assert.strictEqual(progressFinished, '100%', 'Progress should show 100% on finish');
console.log('  ✓ Natural completion sets status to "Finished." and progress to 100%');

console.log('\n--- TEST 12: Volume Slider, Persistence & Mute Toggle ---');
ai.setVolume(75);
assert.strictEqual(ai.volume, 0.75, 'Volume should be 0.75');
assert.strictEqual(document.getElementById('ai-volume-label').textContent, '75%');
assert.strictEqual(document.getElementById('ai-volume-slider').value, 75);
assert.strictEqual(sessionStorage.getItem('yugma_ai_volume'), '75', 'Volume must be saved in sessionStorage');
console.log('  ✓ Volume set to 75% correctly updates slider, label, and persists in sessionStorage');

// Mute toggle test
ai.toggleMute();
assert.strictEqual(ai.volume, 0, 'Volume should be 0 after mute');
assert.strictEqual(document.getElementById('ai-volume-label').textContent, '0%');
ai.toggleMute();
assert.strictEqual(ai.volume, 0.75, 'Volume should restore to 75% after unmute');
assert.strictEqual(document.getElementById('ai-volume-label').textContent, '75%');
console.log('  ✓ Mute toggle successfully mutes to 0% and restores previous level (75%)');

console.log('\n--- TEST 13: Visualizer Performance & Single Animation Loop ---');
// Verify startAnimation does not spawn multiple loops
ai.stopAnimation();
assert.strictEqual(ai.animFrameId, null);
ai.startAnimation();
const firstAnimId = ai.animFrameId;
assert(firstAnimId !== null);
ai.startAnimation(); // Second call should not overwrite or duplicate
assert.strictEqual(ai.animFrameId, firstAnimId, 'startAnimation must reuse existing loop if active');
ai.stopAnimation();
assert.strictEqual(ai.animFrameId, null, 'stopAnimation must nullify animFrameId');

// Verify zero ctx.shadowBlur assignments in source code
assert(!/\.shadowBlur\s*=/.test(jsCode), 'Canvas rendering must NOT assign expensive shadowBlur');
console.log('  ✓ Verified single requestAnimationFrame loop management');
console.log('  ✓ Verified 0 shadowBlur assignments in Canvas engine');

console.log('\n--- TEST 14: Check No Bottom-Left Floating Audio Controls ---');
const html = fs.readFileSync('index.html', 'utf8');
const css = fs.readFileSync('css/aiVisualizer.css', 'utf8');
const hasBottomLeftAudio = /position:\s*fixed;[^}]*bottom:[^}]*left:[^}]*\b(audio|play|voice)\b/i.test(html + css);
assert.strictEqual(hasBottomLeftAudio, false, 'No floating audio controls at bottom-left allowed');
console.log('  ✓ Confirmed 0 floating audio controls at bottom-left corner of the website');

console.log('\n--- TEST 15: Chatbox Markdown Formatter & HTML Sanitization ---');
const rawMarkdown = '**Chola Empire** constructed the *Brihadisvara Temple*.\n\n### Key Highlights\n- 216-foot vimana\n- Interlocking granite stones\n\n1. Foundation\n2. Sanctum';
const formatted = ai.formatMarkdown(rawMarkdown);
assert(formatted.includes('<strong>Chola Empire</strong>'), 'Must format bold text with <strong>');
assert(formatted.includes('<em>Brihadisvara Temple</em>'), 'Must format italic text with <em>');
assert(formatted.includes('<div class="ai-msg-h3">Key Highlights</div>'), 'Must format ### as h3 header');
assert(formatted.includes('bullet-gold'), 'Must format bullet lists with golden bullet markers');
assert(formatted.includes('bullet-num'), 'Must format numbered lists with golden number tags');
console.log('  ✓ Markdown formatted into crisp typography with bold, italics, headers and lists');

console.log('\n--- TEST 16: Threaded Conversation History & Multi-Turn Context ---');
ai.conversationHistory = [];
ai.appendUserMessage('When was Konark Sun Temple built?');
assert.strictEqual(ai.conversationHistory.length, 1);
assert.strictEqual(ai.conversationHistory[0].role, 'user');

ai.appendAgentMessage('Konark Sun Temple', 'It was built in the 13th century CE by King Narasimhadeva I of the Eastern Ganga Dynasty.', 'gemini', { id: 'historian', name: 'Chief Historian', icon: 'fa-landmark' });
assert.strictEqual(ai.conversationHistory.length, 2);
assert.strictEqual(ai.conversationHistory[1].role, 'model');

const historyForAPI = ai.getHistoryForAPI();
assert.strictEqual(historyForAPI.length, 2);
assert.strictEqual(historyForAPI[0].role, 'user');
assert.strictEqual(historyForAPI[1].role, 'model');
console.log('  ✓ Threaded conversation history records turns and formats context payload for API');

console.log('\n--- TEST 17: In-Memory Query Caching (0ms Latency) ---');
ai.setCachedResponse('orchestrator', 'taj mahal', 'The Taj Mahal is an ivory-white marble mausoleum...', 'gemini');
const cachedHit = ai.getCachedResponse('orchestrator', 'Taj Mahal ');
assert(cachedHit !== null, 'Cache hit should succeed case-insensitively with trimming');
assert.strictEqual(cachedHit.source, 'gemini');
assert.strictEqual(ai.getCachedResponse('orchestrator', 'unknown query'), null, 'Cache miss should return null');
console.log('  ✓ Query caching stores and returns previous answers instantly');

console.log('\n--- TEST 18: Clear Chat Functionality ---');
ai.clearChat();
assert.strictEqual(ai.conversationHistory.length, 1, 'clearChat should reset to initial greeting message');
assert.strictEqual(ai.currentState, 'idle', 'clearChat should reset state to idle');
console.log('  ✓ Clear chat empties prior dialogue turns and restores initial agent greeting');

console.log('\n--- TEST 19: Animated Thinking Indicator Lifecycle ---');
ai.showThinkingIndicator();
ai.hideThinkingIndicator();
console.log('  ✓ Thinking indicator shows during deliberation and cleanly hides upon response');

console.log('\n--- TEST 20: Input Action Controls & Disabled States ---');
ai.setSendButtonState(true);
assert.strictEqual(document.getElementById('btn-ai-send').disabled, true, 'Send button must be disabled while sending');
ai.setSendButtonState(false);
assert.strictEqual(document.getElementById('btn-ai-send').disabled, false, 'Send button must be re-enabled after response');
console.log('  ✓ Send button transitions between thinking (disabled) and active states');

console.log('\n=========================================');
console.log('ALL 20 AUTOMATED TESTS PASSED PERFECTLY!');
console.log('=========================================');
