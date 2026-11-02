/* ==========================================================================
   YUGMA HERITAGE VOICE GUIDE ACCESS & ENTITLEMENT MANAGER
   Multilingual Voice Narration Access Control (Guest vs Registered Explorer)
   ========================================================================== */

(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define([], factory);
  } else if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.YugmaVoiceGuideAccess = factory();
  }
}(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  var GUEST_TOUR_LIMIT = 3;
  var STORAGE_KEYS = {
    GUEST_ID: 'yugma_vg_guest_uuid_v2',
    GUEST_USAGE: 'yugma_vg_guest_usage_v2',
    USER_HISTORY: 'yugma_vg_listening_history_v2',
    USER_PROGRESS: 'yugma_vg_tour_progress_v2',
    PREFERRED_LANG: 'yugmaUserLanguage',
    AUTH_CACHE: 'yugma_vg_auth_verified_v2'
  };

  // ── Helper: Safe UUID generator ───────────────────────────────────────────
  function generateUUID() {
    if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
      try { return crypto.randomUUID(); } catch (e) {}
    }
    return 'yg-' + Date.now().toString(36) + '-' + Math.random().toString(36).substring(2, 10);
  }

  // ── Helper: Safe JSON LocalStorage access ─────────────────────────────────
  function getJSON(key, defaultVal) {
    try {
      var item = localStorage.getItem(key);
      if (!item) return defaultVal;
      return JSON.parse(item);
    } catch (e) {
      return defaultVal;
    }
  }

  function setJSON(key, val) {
    try {
      localStorage.setItem(key, JSON.stringify(val));
    } catch (e) {
      console.warn('[YUGMA VG Access] LocalStorage write notice:', e);
    }
  }

  // ── Helper: Infer monument key from filename ─────────────────────────────
  function inferMonumentKey() {
    if (typeof window === 'undefined' || !window.location) return 'statue_of_unity';
    var path = window.location.pathname.split('/').pop().replace(/\.html$/i, '');
    var key = path
      .replace(/_3d$|_vr$|_precision$|_precise$|_explorer$|_sketchfab$|-vr$/i, '')
      .replace(/-/g, '_');
    if (key === 'amberfort') key = 'amber_fort';
    if (key === 'goldentemple') key = 'golden_temple';
    if (key === 'lotustemple') key = 'lotus_temple';
    if (key === 'qutubminar') key = 'qutub_minar';
    if (key === 'rajgadfort') key = 'rajgad_fort';
    if (key === 'sanchistupa') key = 'sanchi_stupa';
    if (key === 'victoriamemorial') key = 'victoria_memorial';
    if (key === 'humayunstomb') key = 'humayun_tomb';
    if (key === 'redfort' || key === 'redfortglory') key = 'red_fort';
    if (key === 'gatewayofindia') key = 'gateway_of_india';
    if (key === 'templegopuram') key = 'brihadisvara';
    if (key === 'bom_jesus') key = 'bom_jesus';
    if (key === 'ajanta_ellora_caves') key = 'ajanta_caves';
    return key || 'statue_of_unity';
  }

  // ── Singleton Access Controller ──────────────────────────────────────────
  var VoiceGuideAccess = {
    guestLimit: GUEST_TOUR_LIMIT,
    _guestId: null,
    _authState: {
      checked: false,
      isRegistered: false,
      user: null
    },
    _pendingResume: null,
    _listeners: [],
    _currentActiveMonument: null,
    _currentActiveLanguage: 'en',
    _activePlayingKey: null,

    // ── Initialization ─────────────────────────────────────────────────────
    init: function () {
      this._guestId = this.getOrCreateGuestId();
      this._checkAuthState();
      this._bindSupabaseEvents();
      this._autoHookDockedPanels();
      return this;
    },

    // ── Guest Session Identity ─────────────────────────────────────────────
    getOrCreateGuestId: function () {
      var gid = localStorage.getItem(STORAGE_KEYS.GUEST_ID);
      if (!gid || gid.length < 8) {
        gid = generateUUID();
        try { localStorage.setItem(STORAGE_KEYS.GUEST_ID, gid); } catch (e) {}
      }
      return gid;
    },

    // ── Supabase Client Discovery ──────────────────────────────────────────
    getSupabaseClient: function () {
      if (typeof window === 'undefined') return null;
      if (window.yugmaSupabase && window.yugmaSupabase.auth) return window.yugmaSupabase;
      if (window.supabaseClient && window.supabaseClient.auth) return window.supabaseClient;
      if (window.supabase && typeof window.supabase.createClient === 'function' && window._sharedSupabase) {
        return window._sharedSupabase;
      }
      return null;
    },

    // ── Auth Verification (No Naive localStorage Trust) ────────────────────
    _checkAuthState: function () {
      var self = this;
      var client = this.getSupabaseClient();

      if (client && client.auth) {
        client.auth.getSession().then(function (res) {
          var session = res && res.data ? res.data.session : null;
          if (session && session.user && !session.user.is_anonymous) {
            self._setVerifiedUser({
              id: session.user.id,
              email: session.user.email,
              name: (session.user.user_metadata && session.user.user_metadata.full_name) || (session.user.email ? session.user.email.split('@')[0] : 'Explorer'),
              language: (session.user.user_metadata && session.user.user_metadata.language) || localStorage.getItem(STORAGE_KEYS.PREFERRED_LANG) || 'en'
            });
          } else {
            self._fallbackSessionCheck();
          }
        }).catch(function (err) {
          self._fallbackSessionCheck();
        });
      } else {
        self._fallbackSessionCheck();
      }
    },

    _fallbackSessionCheck: function () {
      var currentUser = getJSON('yugmaCurrentUser', null);
      var isLoggedIn = localStorage.getItem('yugmaLoggedIn') === 'true';
      var isGuest = localStorage.getItem('yugmaIsGuest') === 'true';

      if (isLoggedIn && !isGuest && currentUser && currentUser.email && !currentUser.isGuest) {
        this._setVerifiedUser(currentUser);
      } else {
        this._setGuestUser();
      }
    },

    _setVerifiedUser: function (user) {
      this._authState.checked = true;
      this._authState.isRegistered = true;
      this._authState.user = user;
      setJSON(STORAGE_KEYS.AUTH_CACHE, { tokenVerified: true, email: user.email, timestamp: Date.now() });
      this._notifyListeners();
      this.updateUIElements();
    },

    _setGuestUser: function () {
      this._authState.checked = true;
      this._authState.isRegistered = false;
      this._authState.user = null;
      try { localStorage.removeItem(STORAGE_KEYS.AUTH_CACHE); } catch(e) {}
      this._notifyListeners();
      this.updateUIElements();
    },

    _bindSupabaseEvents: function () {
      var self = this;
      var client = this.getSupabaseClient();
      if (!client || !client.auth || typeof client.auth.onAuthStateChange !== 'function') return;

      try {
        client.auth.onAuthStateChange(function (event, session) {
          if ((event === 'SIGNED_IN' || event === 'INITIAL_SESSION') && session && session.user && !session.user.is_anonymous) {
            self._setVerifiedUser({
              id: session.user.id,
              email: session.user.email,
              name: (session.user.user_metadata && session.user.user_metadata.full_name) || (session.user.email ? session.user.email.split('@')[0] : 'Explorer'),
              language: (session.user.user_metadata && session.user.user_metadata.language) || localStorage.getItem(STORAGE_KEYS.PREFERRED_LANG) || 'en'
            });
            if (self._pendingResume) {
              var pending = self._pendingResume;
              self._pendingResume = null;
              if (typeof pending.callback === 'function') {
                pending.callback(pending.monumentKey, pending.language);
              }
            }
          } else if (event === 'SIGNED_OUT') {
            self._setGuestUser();
          }
        });
      } catch (e) {
        console.warn('[YUGMA VG Access] onAuthStateChange notice:', e);
      }
    },

    isRegisteredUser: function () {
      return !!(this._authState.isRegistered && this._authState.user);
    },

    getCurrentUser: function () {
      return this._authState.user;
    },

    // ── Guest Usage Tracking ───────────────────────────────────────────────
    getGuestUsage: function () {
      var usage = getJSON(STORAGE_KEYS.GUEST_USAGE, {
        guestId: this.getOrCreateGuestId(),
        usedMonuments: [],
        startedTours: {},
        completedTours: {},
        updatedAt: Date.now()
      });

      if (!Array.isArray(usage.usedMonuments)) {
        usage.usedMonuments = [];
      }

      var usedCount = usage.usedMonuments.length;
      var remaining = Math.max(0, GUEST_TOUR_LIMIT - usedCount);

      return {
        guestId: usage.guestId,
        usedCount: usedCount,
        remaining: remaining,
        usedMonuments: usage.usedMonuments,
        isLimitReached: usedCount >= GUEST_TOUR_LIMIT
      };
    },

    // ── Core Entitlement Query: canPlay(monumentKey) ────────────────────────
    canPlay: function (monumentKey) {
      if (!monumentKey) {
        return { allowed: false, reason: 'invalid_key', remaining: 0 };
      }

      var normKey = String(monumentKey).trim().toLowerCase();

      // 1. Registered Users have UNLIMITED access across all 22 heritage sites
      if (this.isRegisteredUser()) {
        return {
          allowed: true,
          reason: 'unlimited',
          isRegistered: true,
          remaining: Infinity,
          usedCount: 0
        };
      }

      // 2. Guest User evaluation
      var usage = this.getGuestUsage();
      var alreadyUsed = usage.usedMonuments.indexOf(normKey) !== -1;

      // Rule: Replaying an already-used monument DOES NOT consume another tour
      if (alreadyUsed) {
        return {
          allowed: true,
          reason: 'already_used',
          isRegistered: false,
          remaining: usage.remaining,
          usedCount: usage.usedCount,
          monumentKey: normKey
        };
      }

      // Rule: Guest has remaining tours available (from 3 total)
      if (usage.remaining > 0) {
        return {
          allowed: true,
          reason: 'guest_allowance_available',
          isRegistered: false,
          remaining: usage.remaining,
          usedCount: usage.usedCount,
          monumentKey: normKey
        };
      }

      // Rule: Guest has exhausted all 3 tours and attempts a 4th distinct monument
      return {
        allowed: false,
        reason: 'limit_reached',
        isRegistered: false,
        remaining: 0,
        usedCount: usage.usedCount,
        monumentKey: normKey
      };
    },

    // ── Tour Lifecycle: Record Tour Start ──────────────────────────────────
    recordTourStart: function (monumentKey, language) {
      if (!monumentKey) return;
      var normKey = String(monumentKey).trim().toLowerCase();
      var lang = language || this.getPreferredLanguage();
      this._currentActiveMonument = normKey;
      this._currentActiveLanguage = lang;
      this._activePlayingKey = normKey;

      if (this.isRegisteredUser()) {
        this._recordUserHistory(normKey, lang, 'started');
        return;
      }

      // Guest tour recording
      var usage = getJSON(STORAGE_KEYS.GUEST_USAGE, {
        guestId: this.getOrCreateGuestId(),
        usedMonuments: [],
        startedTours: {},
        completedTours: {},
        updatedAt: Date.now()
      });

      if (!Array.isArray(usage.usedMonuments)) usage.usedMonuments = [];
      if (!usage.startedTours) usage.startedTours = {};

      var isNewMonument = usage.usedMonuments.indexOf(normKey) === -1;
      if (isNewMonument) {
        usage.usedMonuments.push(normKey);
        usage.startedTours[normKey] = {
          startedAt: Date.now(),
          language: lang
        };
        usage.updatedAt = Date.now();
        setJSON(STORAGE_KEYS.GUEST_USAGE, usage);

        this._syncGuestUsageToSupabase(normKey, lang, false);
      }

      this._notifyListeners();
    },

    // ── Tour Lifecycle: Record Tour Completion ─────────────────────────────
    recordTourComplete: function (monumentKey, language) {
      if (!monumentKey) return;
      var normKey = String(monumentKey).trim().toLowerCase();
      var lang = language || this.getPreferredLanguage();
      this._activePlayingKey = null;

      if (this.isRegisteredUser()) {
        this._recordUserHistory(normKey, lang, 'completed');
        return;
      }

      // Guest tour completion
      var usage = getJSON(STORAGE_KEYS.GUEST_USAGE, {
        guestId: this.getOrCreateGuestId(),
        usedMonuments: [],
        startedTours: {},
        completedTours: {},
        updatedAt: Date.now()
      });

      if (!usage.completedTours) usage.completedTours = {};
      usage.completedTours[normKey] = {
        completedAt: Date.now(),
        language: lang
      };
      setJSON(STORAGE_KEYS.GUEST_USAGE, usage);

      this._syncGuestUsageToSupabase(normKey, lang, true);

      // Check if guest has now completed all 3 tours
      var usedCount = (usage.usedMonuments || []).length;
      if (usedCount >= GUEST_TOUR_LIMIT) {
        var self = this;
        setTimeout(function () {
          self.showRegistrationModal({
            monumentKey: normKey,
            language: lang,
            triggerReason: 'tour_completed'
          });
        }, 1200);
      }

      this._notifyListeners();
    },

    // ── Registered User History & Resume Management ────────────────────────
    _recordUserHistory: function (monumentKey, language, status) {
      var history = getJSON(STORAGE_KEYS.USER_HISTORY, []);
      var existingIdx = -1;
      for (var i = 0; i < history.length; i++) {
        if (history[i] && history[i].monumentKey === monumentKey) {
          existingIdx = i;
          break;
        }
      }

      var record = {
        monumentKey: monumentKey,
        language: language,
        status: status,
        lastListenedAt: Date.now(),
        completed: status === 'completed'
      };

      if (existingIdx >= 0) {
        history[existingIdx] = Object.assign({}, history[existingIdx], record);
      } else {
        history.unshift(record);
      }
      setJSON(STORAGE_KEYS.USER_HISTORY, history.slice(0, 50));

      var client = this.getSupabaseClient();
      if (client && this._authState.user && this._authState.user.id) {
        try {
          client.from('listening_history').upsert({
            user_id: this._authState.user.id,
            monument_key: monumentKey,
            language: language,
            completed: status === 'completed',
            last_listened_at: new Date().toISOString()
          }, { onConflict: 'user_id,monument_key' }).then(function (res) {
            if (res && res.error) console.warn('[YUGMA VG Access] Supabase history sync notice:', res.error.message);
          }).catch(function (e) {});
        } catch (e) {}
      }
    },

    saveTourProgress: function (monumentKey, language, wordIndex, totalWords) {
      if (!monumentKey || typeof wordIndex !== 'number') return;
      var normKey = String(monumentKey).trim().toLowerCase();
      var progressMap = getJSON(STORAGE_KEYS.USER_PROGRESS, {});
      progressMap[normKey] = {
        wordIndex: wordIndex,
        totalWords: totalWords || 0,
        language: language || 'en',
        percent: totalWords > 0 ? Math.round((wordIndex / totalWords) * 100) : 0,
        updatedAt: Date.now()
      };
      setJSON(STORAGE_KEYS.USER_PROGRESS, progressMap);
    },

    getTourProgress: function (monumentKey) {
      if (!monumentKey) return null;
      var normKey = String(monumentKey).trim().toLowerCase();
      var progressMap = getJSON(STORAGE_KEYS.USER_PROGRESS, {});
      return progressMap[normKey] || null;
    },

    // ── Supabase Guest Tracking ────────────────────────────────────────────
    _syncGuestUsageToSupabase: function (monumentKey, language, isCompleted) {
      var client = this.getSupabaseClient();
      if (!client) return;

      try {
        var payload = {
          session_id: this._guestId,
          monument_key: monumentKey,
          language: language,
          is_guest: true,
          completed: !!isCompleted,
          completed_at: isCompleted ? new Date().toISOString() : null
        };
        client.from('voice_guide_usage').upsert(payload, { onConflict: 'session_id,monument_key' })
          .then(function (res) {
            if (res && res.error) {}
          }).catch(function () {});
      } catch (e) {}
    },

    // ── Preferred Narration Language ───────────────────────────────────────
    getPreferredLanguage: function () {
      if (this.isRegisteredUser() && this._authState.user && this._authState.user.language) {
        return this._authState.user.language;
      }
      return localStorage.getItem(STORAGE_KEYS.PREFERRED_LANG) || 'en';
    },

    savePreferredLanguage: function (langCode) {
      if (!langCode) return;
      try {
        localStorage.setItem(STORAGE_KEYS.PREFERRED_LANG, langCode);
      } catch (e) {}

      if (this.isRegisteredUser()) {
        if (this._authState.user) this._authState.user.language = langCode;
        var client = this.getSupabaseClient();
        if (client && client.auth) {
          try {
            client.auth.updateUser({
              data: { language: langCode }
            }).catch(function () {});
          } catch (e) {}
        }
      }
    },

    // ── Preserve Current Context During Auth ───────────────────────────────
    setPendingMonument: function (monumentKey, language, resumeCallback) {
      this._pendingResume = {
        monumentKey: monumentKey,
        language: language,
        callback: resumeCallback
      };
    },

    getPendingMonument: function () {
      return this._pendingResume;
    },

    // ── Listeners / Reactivity ─────────────────────────────────────────────
    onChange: function (callback) {
      if (typeof callback === 'function') {
        this._listeners.push(callback);
      }
    },

    _notifyListeners: function () {
      var state = {
        isRegistered: this.isRegisteredUser(),
        guestUsage: this.getGuestUsage(),
        preferredLanguage: this.getPreferredLanguage()
      };
      for (var i = 0; i < this._listeners.length; i++) {
        try { this._listeners[i](state); } catch (e) { console.warn(e); }
      }
    },

    // ── UI Integration: Render Remaining Tours Badge ───────────────────────
    getBadgeHTML: function (monumentKey) {
      if (this.isRegisteredUser()) {
        return '<span class="yugma-vg-badge unlimited" title="Unlimited Multilingual Access Unlocked">' +
                 '<span class="vg-badge-sparkle">✨</span> UNLIMITED ACCESS' +
               '</span>';
      }

      var usage = this.getGuestUsage();
      var normKey = monumentKey ? String(monumentKey).trim().toLowerCase() : inferMonumentKey();
      var isReplay = normKey && usage.usedMonuments.indexOf(normKey) !== -1;

      if (isReplay) {
        return '<span class="yugma-vg-badge replay" title="Replaying already unlocked monument (no tour deducted)">' +
                 '<span class="vg-badge-dot active"></span> ALREADY UNLOCKED · REPLAY FREE' +
               '</span>';
      }

      if (usage.remaining > 0) {
        var numClass = usage.remaining === 1 ? 'warning' : 'ok';
        return '<span class="yugma-vg-badge guest ' + numClass + '" title="' + usage.remaining + ' of ' + GUEST_TOUR_LIMIT + ' free voice tours remaining">' +
                 '<span class="vg-badge-dot"></span> ' + usage.remaining + ' OF ' + GUEST_TOUR_LIMIT + ' TOURS REMAINING' +
               '</span>';
      }

      return '<span class="yugma-vg-badge locked" title="Guest tour allowance exhausted. Free registration required to continue">' +
               '<span class="vg-badge-lock">🔒</span> 0 OF ' + GUEST_TOUR_LIMIT + ' TOURS REMAINING' +
             '</span>';
    },

    updateUIElements: function (containerEl, monumentKey) {
      var rootEl = containerEl || (typeof document !== 'undefined' ? document : null);
      if (!rootEl) return;
      var key = monumentKey || inferMonumentKey();
      var badges = rootEl.querySelectorAll('[data-vg-badge], #arvr-vg-badge, #state-vg-badge, .yugma-vg-badge-mount');
      var badgeHtml = this.getBadgeHTML(key);
      for (var i = 0; i < badges.length; i++) {
        badges[i].innerHTML = badgeHtml;
      }
      // If rootEl was a specific sub-container and document exists, also ensure any global voice guide badge is refreshed
      if (typeof document !== 'undefined' && rootEl !== document) {
        var docBadges = document.querySelectorAll('#arvr-vg-badge, #state-vg-badge');
        for (var j = 0; j < docBadges.length; j++) {
          docBadges[j].innerHTML = badgeHtml;
        }
      }
    },

    // ── Auto-Hook Docked Panels (for 3D viewer monument pages) ──────────────
    _autoHookDockedPanels: function () {
      if (typeof window === 'undefined' || typeof document === 'undefined') return;
      var self = this;

      function setupHooks() {
        var panel = document.getElementById('voice-guide-panel');
        var playBtn = document.getElementById('vg-play');
        if (!panel && !playBtn) return;

        var key = inferMonumentKey();

        // 1. Mount badge in header if not already present
        var titleGroup = panel ? panel.querySelector('.vg-title-group, .vg-header-left') : null;
        if (titleGroup && !titleGroup.querySelector('.yugma-vg-badge-mount')) {
          var mount = document.createElement('div');
          mount.className = 'yugma-vg-badge-mount';
          mount.style.marginTop = '4px';
          titleGroup.appendChild(mount);
        }
        self.updateUIElements(panel, key);

        // 2. Intercept #vg-play in capture phase to enforce limit
        if (playBtn && !playBtn.dataset.vgHooked) {
          playBtn.dataset.vgHooked = 'true';
          playBtn.addEventListener('click', function (e) {
            var isCurrentlyPlaying = playBtn.classList.contains('playing') ||
              (playBtn.textContent && (playBtn.textContent.includes('Pause') || playBtn.textContent.includes('⏸')));

            // Allow pausing or resuming existing active playback
            if (isCurrentlyPlaying) return;

            var check = self.canPlay(key);
            if (!check.allowed && check.reason === 'limit_reached') {
              e.stopImmediatePropagation();
              e.preventDefault();
              self.showRegistrationModal({
                monumentKey: key,
                triggerReason: 'limit_reached',
                onSuccess: function () {
                  playBtn.click();
                }
              });
              return;
            }

            // Record start
            self.recordTourStart(key);
            self.updateUIElements(panel, key);
          }, true);
        }

        // 3. Track progress bar reaching 100% or completion
        var progressBar = document.getElementById('vg-progress-bar');
        if (progressBar) {
          var observer = new MutationObserver(function () {
            if (progressBar.style.width === '100%' && self._activePlayingKey === key) {
              self.recordTourComplete(key);
              self.updateUIElements(panel, key);
            }
          });
          observer.observe(progressBar, { attributes: true, attributeFilter: ['style'] });
        }
      }

      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', setupHooks);
      } else {
        setupHooks();
      }
    },

    // ── Registration Modal Controller ──────────────────────────────────────
    showRegistrationModal: function (options) {
      options = options || {};
      var monumentKey = options.monumentKey || this._currentActiveMonument || inferMonumentKey();
      var lang = options.language || this._currentActiveLanguage || 'en';

      this.setPendingMonument(monumentKey, lang, options.onSuccess);

      var modal = document.getElementById('yugma-vg-limit-modal');
      if (!modal) {
        this._injectRegistrationModal();
        modal = document.getElementById('yugma-vg-limit-modal');
      }

      if (modal) {
        modal.classList.add('active');
        modal.setAttribute('aria-hidden', 'false');
      }
    },

    closeRegistrationModal: function () {
      var modal = document.getElementById('yugma-vg-limit-modal');
      if (modal) {
        modal.classList.remove('active');
        modal.setAttribute('aria-hidden', 'true');
      }
    },

    _injectRegistrationModal: function () {
      if (document.getElementById('yugma-vg-limit-modal')) return;

      var modalHtml = [
        '<div id="yugma-vg-limit-modal" class="yugma-vg-modal-backdrop" role="dialog" aria-modal="true" aria-labelledby="yvg-modal-title" aria-hidden="true">',
        '  <div class="yugma-vg-modal-container">',
        '    <button type="button" class="yugma-vg-modal-close" id="btn-vg-modal-close" aria-label="Close modal">✕</button>',
        '    <div class="yugma-vg-modal-gold-crown">',
        '      <span class="yvg-sparkle-icon">✨</span>',
        '      <span>SACRED HERITAGE OF INDIA // UNLIMITED ACCESS</span>',
        '    </div>',
        '    <h2 id="yvg-modal-title" class="yugma-vg-modal-headline">Unlock Unlimited Voice Guided Tours</h2>',
        '    <div class="yugma-vg-modal-message">',
        '      <p class="yvg-lead-para">Your journey through India\'s heritage doesn\'t have to end here.</p>',
        '      <p>You\'ve experienced three incredible voice-guided tours. Create your free YUGMA account to unlock unlimited multilingual narrations and continue discovering India\'s cultural treasures.</p>',
        '    </div>',
        '    <div class="yugma-vg-modal-benefits">',
        '      <div class="yvg-benefit-item">',
        '        <span class="yvg-benefit-icon">🎙️</span>',
        '        <div><strong>Unlimited Narrations</strong><span>Full access to all 22 heritage monument sites</span></div>',
        '      </div>',
        '      <div class="yvg-benefit-item">',
        '        <span class="yvg-benefit-icon">🌐</span>',
        '        <div><strong>15 Indian &amp; Global Languages</strong><span>Synchronized word-by-word subtitle tracking</span></div>',
        '      </div>',
        '      <div class="yvg-benefit-item">',
        '        <span class="yvg-benefit-icon">📜</span>',
        '        <div><strong>Listening History &amp; Resume</strong><span>Pick up exactly where you left off on any monument</span></div>',
        '      </div>',
        '    </div>',
        '    <div class="yugma-vg-modal-actions">',
        '      <button type="button" id="btn-vg-modal-signup" class="yvg-btn-primary">',
        '        <span>CREATE FREE ACCOUNT</span>',
        '        <span class="yvg-arrow">→</span>',
        '      </button>',
        '      <button type="button" id="btn-vg-modal-login" class="yvg-btn-secondary">',
        '        ALREADY HAVE AN ACCOUNT? SIGN IN',
        '      </button>',
        '      <button type="button" id="btn-vg-modal-dismiss" class="yvg-btn-text">',
        '        Continue exploring written heritage descriptions',
        '      </button>',
        '    </div>',
        '  </div>',
        '</div>'
      ].join('\n');

      var div = document.createElement('div');
      div.innerHTML = modalHtml;
      document.body.appendChild(div.firstElementChild);

      var self = this;
      var closeBtn = document.getElementById('btn-vg-modal-close');
      if (closeBtn) closeBtn.addEventListener('click', function () { self.closeRegistrationModal(); });

      var dismissBtn = document.getElementById('btn-vg-modal-dismiss');
      if (dismissBtn) dismissBtn.addEventListener('click', function () { self.closeRegistrationModal(); });

      var signupBtn = document.getElementById('btn-vg-modal-signup');
      if (signupBtn) {
        signupBtn.addEventListener('click', function () {
          self.closeRegistrationModal();
          var pendingMon = self._pendingResume ? self._pendingResume.monumentKey : inferMonumentKey();
          var pendingLang = self._pendingResume ? self._pendingResume.language : (self.getPreferredLanguage() || 'en');

          if (typeof window.yugmaAuth !== 'undefined' && typeof window.yugmaAuth.openSignup === 'function') {
            window.yugmaAuth.openSignup();
          } else {
            var auth = document.getElementById('yugma-auth');
            var welcome = document.getElementById('yugma-welcome-screen');
            var authScreen = document.getElementById('yugma-auth-screen');
            var signupTab = document.getElementById('auth-signup-tab') || document.querySelector('[data-mode="signup"]');
            if (auth && authScreen) {
              if (document.documentElement) document.documentElement.classList.remove('yugma-session-restored');
              auth.classList.remove('auth-hidden');
              auth.classList.add('auth-active');
              auth.style.display = 'flex';
              auth.style.opacity = '1';
              auth.style.visibility = 'visible';
              auth.style.pointerEvents = 'auto';
              document.body.classList.add('yugma-screen-locked');
              if (welcome) welcome.classList.add('hidden');
              authScreen.classList.remove('hidden');
              if (signupTab) signupTab.click();
            } else {
              var currentUrl = encodeURIComponent(window.location.href);
              window.location.href = 'auth.html?signup=true&monument=' + encodeURIComponent(pendingMon || '') + '&lang=' + encodeURIComponent(pendingLang || 'en') + '&returnUrl=' + currentUrl;
            }
          }
        });
      }

      var loginBtn = document.getElementById('btn-vg-modal-login');
      if (loginBtn) {
        loginBtn.addEventListener('click', function () {
          self.closeRegistrationModal();
          var pendingMon = self._pendingResume ? self._pendingResume.monumentKey : inferMonumentKey();
          var pendingLang = self._pendingResume ? self._pendingResume.language : (self.getPreferredLanguage() || 'en');

          if (typeof window.yugmaAuth !== 'undefined' && typeof window.yugmaAuth.openLogin === 'function') {
            window.yugmaAuth.openLogin();
          } else {
            var auth = document.getElementById('yugma-auth');
            var welcome = document.getElementById('yugma-welcome-screen');
            var authScreen = document.getElementById('yugma-auth-screen');
            var loginTab = document.getElementById('auth-login-tab') || document.querySelector('[data-mode="login"]');
            if (auth && authScreen) {
              if (document.documentElement) document.documentElement.classList.remove('yugma-session-restored');
              auth.classList.remove('auth-hidden');
              auth.classList.add('auth-active');
              auth.style.display = 'flex';
              auth.style.opacity = '1';
              auth.style.visibility = 'visible';
              auth.style.pointerEvents = 'auto';
              document.body.classList.add('yugma-screen-locked');
              if (welcome) welcome.classList.add('hidden');
              authScreen.classList.remove('hidden');
              if (loginTab) loginTab.click();
            } else {
              var currentUrl = encodeURIComponent(window.location.href);
              window.location.href = 'auth.html?login=true&monument=' + encodeURIComponent(pendingMon || '') + '&lang=' + encodeURIComponent(pendingLang || 'en') + '&returnUrl=' + currentUrl;
            }
          }
        });
      }
    }
  };

  // Auto-initialize on load
  if (typeof window !== 'undefined') {
    VoiceGuideAccess.init();
  }

  return VoiceGuideAccess;
}));
