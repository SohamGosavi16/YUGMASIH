const fs = require('fs');

let vga = fs.readFileSync('js/voiceGuideAccess.js', 'utf8');

// 1. Update updateUIElements to always reach document badges
const oldUpdate = `updateUIElements: function (containerEl, monumentKey) {
      var rootEl = containerEl || (typeof document !== 'undefined' ? document : null);
      if (!rootEl) return;
      var key = monumentKey || inferMonumentKey();
      var badges = rootEl.querySelectorAll('[data-vg-badge], #arvr-vg-badge, #state-vg-badge, .yugma-vg-badge-mount');
      var badgeHtml = this.getBadgeHTML(key);
      for (var i = 0; i < badges.length; i++) {
        badges[i].innerHTML = badgeHtml;
      }
    },`;

const newUpdate = `updateUIElements: function (containerEl, monumentKey) {
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
    },`;

if (vga.includes(oldUpdate)) {
  vga = vga.replace(oldUpdate, newUpdate);
  console.log('Updated updateUIElements in js/voiceGuideAccess.js');
} else {
  console.log('oldUpdate not found exactly, checking substring...');
}

// 2. Update signupBtn and loginBtn event listeners in _injectRegistrationModal
const oldBtns = `      var signupBtn = document.getElementById('btn-vg-modal-signup');
      if (signupBtn) {
        signupBtn.addEventListener('click', function () {
          self.closeRegistrationModal();
          if (typeof window.yugmaAuth !== 'undefined' && typeof window.yugmaAuth.openSignup === 'function') {
            window.yugmaAuth.openSignup();
          } else {
            var auth = document.getElementById('yugma-auth');
            var welcome = document.getElementById('yugma-welcome-screen');
            var authScreen = document.getElementById('yugma-auth-screen');
            var signupTab = document.getElementById('auth-signup-tab');
            if (auth && authScreen) {
              auth.style.display = 'flex';
              auth.classList.remove('auth-hidden');
              document.body.classList.add('yugma-screen-locked');
              if (welcome) welcome.classList.add('hidden');
              authScreen.classList.remove('hidden');
              if (signupTab) signupTab.click();
            } else {
              window.location.href = 'auth.html?signup=true';
            }
          }
        });
      }

      var loginBtn = document.getElementById('btn-vg-modal-login');
      if (loginBtn) {
        loginBtn.addEventListener('click', function () {
          self.closeRegistrationModal();
          if (typeof window.yugmaAuth !== 'undefined' && typeof window.yugmaAuth.openLogin === 'function') {
            window.yugmaAuth.openLogin();
          } else {
            var auth = document.getElementById('yugma-auth');
            var welcome = document.getElementById('yugma-welcome-screen');
            var authScreen = document.getElementById('yugma-auth-screen');
            var loginTab = document.getElementById('auth-login-tab');
            if (auth && authScreen) {
              auth.style.display = 'flex';
              auth.classList.remove('auth-hidden');
              document.body.classList.add('yugma-screen-locked');
              if (welcome) welcome.classList.add('hidden');
              authScreen.classList.remove('hidden');
              if (loginTab) loginTab.click();
            } else {
              window.location.href = 'auth.html?login=true';
            }
          }
        });
      }`;

const newBtns = `      var signupBtn = document.getElementById('btn-vg-modal-signup');
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
      }`;

if (vga.includes(oldBtns)) {
  vga = vga.replace(oldBtns, newBtns);
  console.log('Updated registration modal buttons in js/voiceGuideAccess.js');
} else {
  console.log('oldBtns not found exactly, checking substring...');
}

fs.writeFileSync('js/voiceGuideAccess.js', vga, 'utf8');
console.log('Saved js/voiceGuideAccess.js successfully.');

