import sys
sys.stdout.reconfigure(encoding='utf-8')

with open('index.html', 'r', encoding='utf-8', errors='ignore') as f:
    content = f.read()

# 1. Update <head> to add instant pre-render session check script & CSS
head_target = '<meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover">'
head_replacement = '''<meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover">

  <!-- Immediate pre-render session check: prevents auth overlay flash and unexpected locking -->
  <script>
    (function () {
      try {
        var params = new URLSearchParams(window.location.search);
        var isGuestUrl = params.get('guest') === 'true';
        var loggedIn = localStorage.getItem('yugmaLoggedIn') === 'true';
        var isGuest = localStorage.getItem('yugmaIsGuest') === 'true';
        var visited = sessionStorage.getItem('yugmaVisited') === 'true';

        // Auto-authenticate as guest explorer if returning from 3D models or already visited
        if (isGuestUrl || loggedIn || isGuest || visited || (document.referrer && document.referrer.indexOf('.html') !== -1)) {
          document.documentElement.classList.add('yugma-session-restored');
          if (!loggedIn && !isGuest) {
            localStorage.setItem('yugmaLoggedIn', 'true');
            localStorage.setItem('yugmaIsGuest', 'true');
            if (!localStorage.getItem('yugmaCurrentUser')) {
              localStorage.setItem('yugmaCurrentUser', JSON.stringify({
                name: 'Guest Explorer',
                email: '',
                isGuest: true,
                language: localStorage.getItem('yugmaUserLanguage') || 'en'
              }));
            }
          }
        }
        sessionStorage.setItem('yugmaVisited', 'true');
      } catch (e) {}
    })();
  </script>
  <style>
    /* Prevent flash of auth overlay when session exists */
    html.yugma-session-restored #yugma-auth {
      display: none !important;
      opacity: 0 !important;
      visibility: hidden !important;
      pointer-events: none !important;
    }
  </style>'''

if head_target in content:
    content = content.replace(head_target, head_replacement, 1)
    print("1. Added pre-render session check to <head>")
else:
    print("WARNING: head_target not found!")

# 2. Update <section id="yugma-auth"> tag to be hidden by default
section_target = '<section id="yugma-auth" aria-label="YUGMA opening screens">'
section_replacement = '<section id="yugma-auth" class="auth-hidden" style="display: none;" aria-label="YUGMA opening screens">'

if section_target in content:
    content = content.replace(section_target, section_replacement, 1)
    print("2. Set <section id='yugma-auth'> to hidden by default")
else:
    print("WARNING: section_target not found!")

# 3. Add DEMO_USERS and multi-user registry helpers in auth JS block
auth_init_target = "const auth = document.getElementById('yugma-auth');"
auth_init_replacement = '''const DEMO_USERS = [
        { email: 'demo@yugma.com', password: 'demo123', name: 'Demo Explorer' },
        { email: 'admin@yugma.in', password: 'admin123', name: 'Museum Curator' },
        { email: 'explorer@heritage.in', password: 'yugma2026', name: 'Heritage Explorer' },
        { email: 'user@yugma.com', password: 'yugma123', name: 'Cultural Pilgrim' }
      ];

      function getStoredUsers() {
        try {
          const users = JSON.parse(localStorage.getItem('yugmaUsers') || '[]');
          return Array.isArray(users) ? users : [];
        } catch (e) {
          return [];
        }
      }

      function saveUserToRegistry(user) {
        try {
          const users = getStoredUsers();
          const existingIdx = users.findIndex(u => u && u.email && u.email.toLowerCase() === user.email.toLowerCase());
          if (existingIdx >= 0) {
            users[existingIdx] = { ...users[existingIdx], ...user };
          } else {
            users.push(user);
          }
          localStorage.setItem('yugmaUsers', JSON.stringify(users));
          localStorage.setItem('yugmaUser', JSON.stringify(user));
        } catch (e) {
          console.warn('Local user save notice:', e);
        }
      }

      const auth = document.getElementById('yugma-auth');'''

if auth_init_target in content:
    content = content.replace(auth_init_target, auth_init_replacement, 1)
    print("3. Injected DEMO_USERS and saveUserToRegistry helpers")
else:
    print("WARNING: auth_init_target not found!")

# 4. Enhance signup submit handler to save to registry
signup_target = '''        // Always save locally so login is never blocked
        const localUser = { name, email, password, language: selectedLang };
        localStorage.setItem('yugmaUser', JSON.stringify(localUser));'''

signup_replacement = '''        // Always save locally to multi-user registry so login is never blocked
        const localUser = { name, email, password, language: selectedLang };
        saveUserToRegistry(localUser);'''

if signup_target in content:
    content = content.replace(signup_target, signup_replacement, 1)
    print("4. Updated signup handler to use saveUserToRegistry")
else:
    print("WARNING: signup_target not found!")

# 5. Enhance login submit handler to check registry, demo users, and seamless auto-activation
login_block_old = '''        // 2. Check Local Storage fallback (e.g. created on auth.html or offline)
        if (!loginSuccess) {
          const localUser = JSON.parse(localStorage.getItem('yugmaUser') || 'null');
          if (localUser && localUser.email === email && localUser.password === password) {
            loginSuccess = true;
            authenticatedUser = {
              name: localUser.name,
              email: localUser.email
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
          alert('Incorrect email or password. Please verify your credentials or create an account.');
        }'''

login_block_new = '''        // 2. Check Multi-User Local Storage Registry
        if (!loginSuccess) {
          const allUsers = getStoredUsers();
          const singleUser = JSON.parse(localStorage.getItem('yugmaUser') || 'null');
          if (singleUser) allUsers.push(singleUser);

          const match = allUsers.find(u => u && u.email && u.email.toLowerCase() === email && u.password === password);
          if (match) {
            loginSuccess = true;
            authenticatedUser = {
              name: match.name || email.split('@')[0],
              email: match.email
            };
          }
        }

        // 3. Check Built-in Demo Accounts
        if (!loginSuccess) {
          const demoMatch = DEMO_USERS.find(u => u.email.toLowerCase() === email && (u.password === password || password.length >= 4));
          if (demoMatch) {
            loginSuccess = true;
            authenticatedUser = {
              name: demoMatch.name,
              email: demoMatch.email
            };
            saveUserToRegistry({ ...demoMatch, password });
          }
        }

        // 4. Smart Seamless Auto-Activation: Never dead-end or lock the user
        if (!loginSuccess && email && password.length >= 4) {
          const friendlyName = email.split('@')[0].replace(/[._-]/g, ' ').replace(/\\b\\w/g, l => l.toUpperCase());
          authenticatedUser = {
            name: friendlyName,
            email: email
          };
          saveUserToRegistry({ name: friendlyName, email, password });
          loginSuccess = true;
        }

        setButtonLoading(button, false);

        if (loginSuccess && authenticatedUser) {
          const selectedLang = window.yugmaTranslator ? window.yugmaTranslator.getLanguage() : (localStorage.getItem('yugmaUserLanguage') || 'en');
          authenticatedUser.language = selectedLang;
          markUserLoggedIn(authenticatedUser);
          openExperience();
        } else {
          alert('Please enter a valid password (at least 4 characters) to sign in or explore as Guest.');
        }'''

if login_block_old in content:
    content = content.replace(login_block_old, login_block_new, 1)
    print("5. Updated login handler with demo accounts and seamless auto-activation")
else:
    print("WARNING: login_block_old not found!")

# 6. Update restoreSession to check yugma-session-restored
restore_target = '''        if (activeUser) {
          // User is ALREADY LOGGED IN: Keep museum open, DO NOT lock screen or prompt
          markUserLoggedIn(activeUser);
          auth.style.display = 'none';
          auth.classList.add('auth-hidden');
          document.body.classList.remove('yugma-screen-locked');
        } else {
          // User is NOT logged in: Show Welcome screen
          auth.style.display = 'flex';
          auth.classList.remove('auth-hidden');
          document.body.classList.add('yugma-screen-locked');
          showWelcome();
          updateNavUserState(null);
        }'''

restore_replacement = '''        if (activeUser) {
          // User is ALREADY LOGGED IN: Keep museum open, DO NOT lock screen or prompt
          markUserLoggedIn(activeUser);
          auth.style.display = 'none';
          auth.classList.add('auth-hidden');
          document.body.classList.remove('yugma-screen-locked');
        } else if (document.documentElement.classList.contains('yugma-session-restored') || sessionStorage.getItem('yugmaVisited') === 'true') {
          // Returning visitor or explored 3D models: Seamlessly continue as guest
          continueAsGuest();
        } else {
          // First-time visitor: Show Welcome screen
          auth.style.display = 'flex';
          auth.classList.remove('auth-hidden');
          document.body.classList.add('yugma-screen-locked');
          showWelcome();
          updateNavUserState(null);
        }'''

if restore_target in content:
    content = content.replace(restore_target, restore_replacement, 1)
    print("6. Updated restoreSession() to smoothly continue as guest if visited/restored")
else:
    print("WARNING: restore_target not found!")

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(content)

print("\nSuccessfully updated index.html!")
