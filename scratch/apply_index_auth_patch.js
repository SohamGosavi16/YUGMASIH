const fs = require('fs');

let index = fs.readFileSync('index.html', 'utf8');

function replaceBetween(content, startMarker, endMarker, newBlock, label) {
  const sIdx = content.indexOf(startMarker);
  if (sIdx === -1) {
    console.error(`[FAIL] Could not find startMarker: "${startMarker}" for ${label}`);
    return content;
  }
  const eIdx = content.indexOf(endMarker, sIdx);
  if (eIdx === -1) {
    console.error(`[FAIL] Could not find endMarker: "${endMarker}" for ${label}`);
    return content;
  }
  console.log(`[OK] Replaced ${label} (pos ${sIdx} to ${eIdx})`);
  return content.substring(0, sIdx) + newBlock + content.substring(eIdx);
}

// 1. Update markUserLoggedIn
const newMarkUser = `function markUserLoggedIn(user) {
        localStorage.setItem('yugmaLoggedIn', 'true');
        const selectedLang = window.yugmaTranslator ? window.yugmaTranslator.getLanguage() : (localStorage.getItem('yugmaUserLanguage') || 'en');
        const userData = {
          name: user.name || (user.user_metadata && user.user_metadata.full_name) || (user.email ? user.email.split('@')[0] : (user.isGuest ? 'Guest Explorer' : 'Explorer')),
          email: user.email || '',
          isGuest: !!user.isGuest,
          language: user.language || selectedLang
        };
        localStorage.setItem('yugmaCurrentUser', JSON.stringify(userData));
        updateNavUserState(userData);
        if (window.yugmaTranslator) {
          window.yugmaTranslator.setLanguage(userData.language);
        }

        if (!userData.isGuest && window.YugmaVoiceGuideAccess) {
          window.YugmaVoiceGuideAccess._setVerifiedUser(userData);
          window.YugmaVoiceGuideAccess.savePreferredLanguage(userData.language);
          const modal = document.getElementById('arvr-modal');
          if (modal && modal.dataset.currentMonument) {
            window.YugmaVoiceGuideAccess.updateUIElements(modal, modal.dataset.currentMonument);
            setupModalVoiceGuide(modal.dataset.currentMonument);
          }
        }
      }

      `;

index = replaceBetween(index, 'function markUserLoggedIn(user) {', 'function continueAsGuest() {', newMarkUser, 'markUserLoggedIn');

// 2. Update logoutUser
const newLogout = `function logoutUser() {
        localStorage.removeItem('yugmaLoggedIn');
        localStorage.removeItem('yugmaCurrentUser');
        localStorage.removeItem('yugmaIsGuest');
        if (supabaseClient && supabaseClient.auth) {
          try {
            supabaseClient.auth.signOut();
          } catch (e) {
            console.warn('Supabase sign out error:', e);
          }
        }
        if (window.YugmaVoiceGuideAccess) {
          window.YugmaVoiceGuideAccess._setGuestUser();
          const modal = document.getElementById('arvr-modal');
          if (modal && modal.dataset.currentMonument) {
            window.YugmaVoiceGuideAccess.updateUIElements(modal, modal.dataset.currentMonument);
            setupModalVoiceGuide(modal.dataset.currentMonument);
          }
        }
        updateNavUserState(null);
        auth.style.display = 'flex';
        auth.classList.remove('auth-hidden');
        document.body.classList.add('yugma-screen-locked');
        showWelcome();
      }

      `;

index = replaceBetween(index, 'function logoutUser() {', 'const btnNavLogout = document.getElementById(\'btn-nav-logout\');', newLogout, 'logoutUser');

// 3. Update window.yugmaAuth
const newAuthExport = `window.yugmaAuth = {
        isSessionActive,
        markUserLoggedIn,
        continueAsGuest,
        logoutUser,
        openExperience,
        closeAuthModal,
        openSignup: () => {
          auth.style.display = 'flex';
          auth.classList.remove('auth-hidden');
          document.body.classList.add('yugma-screen-locked');
          showAuth();
          setMode('signup');
        },
        openLogin: () => {
          auth.style.display = 'flex';
          auth.classList.remove('auth-hidden');
          document.body.classList.add('yugma-screen-locked');
          showAuth();
          setMode('login');
        }
      };`;

index = replaceBetween(index, 'window.yugmaAuth = {', '})();', newAuthExport + '\n    ', 'window.yugmaAuth');

// 4. Update signupForm and loginForm
const newForms = `// ── SIGN UP ─────────────────────────────────────────────
      signupForm.addEventListener('submit', async event => {
        event.preventDefault();

        const button = signupForm.querySelector('button[type="submit"]');
        const name = document.getElementById('yugma-signup-name').value.trim();
        const email = document.getElementById('yugma-signup-email').value.trim().toLowerCase();
        const password = document.getElementById('yugma-signup-password').value;
        const confirm = document.getElementById('yugma-signup-confirm').value;

        if (!name || !email || !password || !confirm) {
          alert('Please fill in all fields.');
          return;
        }

        if (password.length < 6) {
          alert('Password must contain at least 6 characters.');
          return;
        }

        if (password !== confirm) {
          alert('Passwords do not match.');
          return;
        }

        setButtonLoading(button, true, 'CREATING ACCOUNT…');

        const selectedLang = window.yugmaTranslator ? window.yugmaTranslator.getLanguage() : (localStorage.getItem('yugmaUserLanguage') || 'en');

        if (supabaseClient && supabaseClient.auth) {
          try {
            const { data, error } = await supabaseClient.auth.signUp({
              email,
              password,
              options: {
                data: {
                  full_name: name,
                  language: selectedLang
                }
              }
            });

            if (error) {
              console.warn('Supabase signup notice:', error.message);
            }
          } catch (error) {
            console.warn('YUGMA Supabase signup notice:', error);
          }
        }

        setButtonLoading(button, false);
        markUserLoggedIn({ name, email, language: selectedLang, isGuest: false });
        alert('Welcome to YUGMA, ' + name + '! Your free account is created and unlimited voice guided tours are unlocked.');
        openExperience();
      });

      // ── LOGIN ───────────────────────────────────────────────
      loginForm.addEventListener('submit', async event => {
        event.preventDefault();

        const button = loginForm.querySelector('button[type="submit"]');
        const email = document.getElementById('yugma-login-email').value.trim().toLowerCase();
        const password = document.getElementById('yugma-login-password').value;

        if (!email || !password) {
          alert('Please enter your email and password.');
          return;
        }

        setButtonLoading(button, true, 'SIGNING IN…');

        let loginSuccess = false;
        let authenticatedUser = null;

        // 1. Try Supabase
        if (supabaseClient && supabaseClient.auth) {
          try {
            const { data, error } = await supabaseClient.auth.signInWithPassword({
              email,
              password
            });

            if (!error && data && data.session) {
              loginSuccess = true;
              authenticatedUser = {
                name: (data.user.user_metadata && data.user.user_metadata.full_name) || email.split('@')[0],
                email: data.user.email,
                language: (data.user.user_metadata && data.user.user_metadata.language) || 'en',
                isGuest: false
              };
            }
          } catch (error) {
            console.warn('Supabase sign-in notice:', error);
          }
        }

        // 2. Check Built-in Demo Accounts (Strict Exact Password Match Only)
        if (!loginSuccess) {
          const demoMatch = DEMO_USERS.find(u => u.email.toLowerCase() === email && u.password === password);
          if (demoMatch) {
            loginSuccess = true;
            authenticatedUser = {
              name: demoMatch.name,
              email: demoMatch.email,
              language: 'en',
              isGuest: false
            };
          }
        }

        setButtonLoading(button, false);

        if (loginSuccess && authenticatedUser) {
          const selectedLang = window.yugmaTranslator ? window.yugmaTranslator.getLanguage() : (localStorage.getItem('yugmaUserLanguage') || 'en');
          authenticatedUser.language = selectedLang;
          markUserLoggedIn(authenticatedUser);
          openExperience();
        } else {
          alert('Invalid email or password. Please verify your credentials or click "Explore as Guest".');
        }
      });

      `;

index = replaceBetween(index, '// ── SIGN UP ─────────────────────────────────────────────', '// ── FORGOT PASSWORD ─────────────────────────────────────', newForms, 'signupForm and loginForm');

fs.writeFileSync('index.html', index, 'utf8');
console.log('Index auth patch applied successfully.');

