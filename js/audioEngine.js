/**
 * YUGMA - Procedural Indian Heritage Audio Engine
 * Pure Web Audio API synthesis for Tanpura Drone, Temple Bells,
 * Ghungroo brass chimes, and traditional percussion rhythm generators.
 */

class HeritageAudioEngine {
  constructor() {
    this.ctx = null;
    this.isMuted = true;
    this.isInitialized = false;
    
    // Tanpura Drone Nodes
    this.tanpuraNodes = [];
    this.tanpuraGain = null;
    
    // Rhythm Engine Timer
    this.rhythmInterval = null;
    this.currentBeatIndex = 0;
    this.activeRhythm = null;
  }

  init() {
    if (this.isInitialized) return;
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioContext();
      
      // Master Gain
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(0.7, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);

      // Tanpura Sub-bus
      this.tanpuraGain = this.ctx.createGain();
      this.tanpuraGain.gain.setValueAtTime(0, this.ctx.currentTime);
      this.tanpuraGain.connect(this.masterGain);

      this.isInitialized = true;
      this.setupTanpuraDrone();
    } catch (e) {
      console.warn("Web Audio API not supported or blocked", e);
    }
  }

  resume() {
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  toggleMute() {
    if (!this.isInitialized) this.init();
    this.resume();
    this.isMuted = !this.isMuted;
    
    if (this.isMuted) {
      if (this.tanpuraGain) {
        this.tanpuraGain.gain.setTargetAtTime(0, this.ctx.currentTime, 0.5);
      }
      this.stopRhythm();
    } else {
      if (this.tanpuraGain) {
        this.tanpuraGain.gain.setTargetAtTime(0.22, this.ctx.currentTime, 1.5);
      }
      this.playBell();
    }
    return !this.isMuted;
  }

  /**
   * Continuous 4-string Tanpura Drone (Tuned to C# / D: 138.59 Hz, 185.00 Hz, 277.18 Hz)
   */
  setupTanpuraDrone() {
    if (!this.ctx) return;
    const freqs = [138.59, 138.9, 185.00, 277.18, 277.8]; // Root, harmonic Pa, Sa
    
    freqs.forEach((freq, idx) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const filter = this.ctx.createBiquadFilter();

      osc.type = idx % 2 === 0 ? 'sawtooth' : 'sine';
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
      
      // Warm low-pass filter to simulate seasoned gourd acoustics
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(650 + idx * 80, this.ctx.currentTime);
      filter.Q.setValueAtTime(2.5, this.ctx.currentTime);

      gain.gain.setValueAtTime(0.08 / (idx + 1), this.ctx.currentTime);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.tanpuraGain);

      osc.start();
      this.tanpuraNodes.push(osc);
    });
  }

  /**
   * Resonant Temple Bell Chime (Tibetan/Kashi Brass Bell)
   */
  playBell(pitchMultiplier = 1.0) {
    if (!this.ctx || this.isMuted) return;
    this.resume();
    const now = this.ctx.currentTime;
    const baseFreq = 587.33 * pitchMultiplier; // D5
    const partials = [1, 2.76, 5.4, 8.9, 11.2];
    const gains = [0.4, 0.25, 0.15, 0.08, 0.04];

    partials.forEach((part, i) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      
      osc.type = 'sine';
      osc.frequency.setValueAtTime(baseFreq * part, now);
      
      gain.gain.setValueAtTime(gains[i], now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 3.2 - (i * 0.3));
      
      osc.connect(gain);
      gain.connect(this.masterGain);
      
      osc.start(now);
      osc.stop(now + 3.5);
    });
  }

  /**
   * Ghungroo (Brass Ankle Bells Cluster)
   */
  playGhungroo() {
    if (!this.ctx || this.isMuted) return;
    this.resume();
    const now = this.ctx.currentTime;
    
    // Multi-bell metallic tinkle
    for (let i = 0; i < 4; i++) {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const delay = i * 0.015;
      
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(2400 + Math.random() * 800, now + delay);
      
      gain.gain.setValueAtTime(0.12, now + delay);
      gain.gain.exponentialRampToValueAtTime(0.001, now + delay + 0.12);
      
      osc.connect(gain);
      gain.connect(this.masterGain);
      
      osc.start(now + delay);
      osc.stop(now + delay + 0.15);
    }
  }

  /**
   * Traditional Percussion Synthesizer (Dhol, Mridangam, Chenda)
   */
  playDrumHit(isBass = false, isSlap = false) {
    if (!this.ctx || this.isMuted) return;
    const now = this.ctx.currentTime;
    
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    
    if (isBass) {
      // Dhol / Mridangam Bass (Bayan / Thoppi)
      osc.type = 'sine';
      osc.frequency.setValueAtTime(140, now);
      osc.frequency.exponentialRampToValueAtTime(55, now + 0.18);
      
      gain.gain.setValueAtTime(0.5, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
    } else if (isSlap) {
      // High Rim Shot / Chande Slap
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(420, now);
      osc.frequency.exponentialRampToValueAtTime(180, now + 0.08);
      
      gain.gain.setValueAtTime(0.3, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);
    } else {
      // Mid Tone (Dayan / Valanthala)
      osc.type = 'sine';
      osc.frequency.setValueAtTime(260, now);
      osc.frequency.exponentialRampToValueAtTime(120, now + 0.12);
      
      gain.gain.setValueAtTime(0.35, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.22);
    }
    
    osc.connect(gain);
    gain.connect(this.masterGain);
    
    osc.start(now);
    osc.stop(now + 0.4);
  }

  /**
   * Start Loop of Cultural Rhythm Pattern
   */
  startRhythm(rhythmData) {
    this.stopRhythm();
    if (!rhythmData || !this.ctx) return;
    this.activeRhythm = rhythmData;
    this.currentBeatIndex = 0;
    
    const beatDurationMs = (60 / (rhythmData.tempo || 120)) * 1000 / 2; // 8th note division
    
    this.rhythmInterval = setInterval(() => {
      if (this.isMuted) return;
      const pattern = this.activeRhythm.pattern;
      const hit = pattern[this.currentBeatIndex % pattern.length];
      
      if (hit === 1) {
        const isBass = this.currentBeatIndex % 4 === 0;
        const isSlap = (this.currentBeatIndex + 2) % 4 === 0;
        this.playDrumHit(isBass, isSlap);
        if (isSlap) this.playGhungroo();
      }
      
      this.currentBeatIndex = (this.currentBeatIndex + 1) % pattern.length;
    }, beatDurationMs);
  }

  stopRhythm() {
    if (this.rhythmInterval) {
      clearInterval(this.rhythmInterval);
      this.rhythmInterval = null;
    }
    this.activeRhythm = null;
    this.currentBeatIndex = 0;
  }

  /**
   * Tactile UI Page Flip Sound
   */
  playPageTurn() {
    if (!this.ctx || this.isMuted) return;
    this.resume();
    const now = this.ctx.currentTime;
    
    // Filtered noise burst simulating paper sliding
    const bufferSize = this.ctx.sampleRate * 0.15;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }
    
    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;
    
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(1800, now);
    filter.frequency.exponentialRampToValueAtTime(600, now + 0.14);
    filter.Q.setValueAtTime(1.5, now);
    
    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.18, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
    
    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);
    
    noise.start(now);
  }

  /**
   * Subtle UI Click Sound
   */
  playClick() {
    if (!this.ctx || this.isMuted) return;
    this.resume();
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    
    osc.type = 'sine';
    osc.frequency.setValueAtTime(880, now);
    osc.frequency.exponentialRampToValueAtTime(440, now + 0.03);
    
    gain.gain.setValueAtTime(0.08, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);
    
    osc.connect(gain);
    gain.connect(this.masterGain);
    
    osc.start(now);
    osc.stop(now + 0.05);
  }
}

window.yugmaAudio = new HeritageAudioEngine();
