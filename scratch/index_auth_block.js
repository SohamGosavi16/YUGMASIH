/* 7421 */             SUPABASE_PUBLISHABLE_KEY,
/* 7422 */             {
/* 7423 */               auth: {
/* 7424 */                 persistSession: true,
/* 7425 */                 autoRefreshToken: true,
/* 7426 */                 detectSessionInUrl: true
/* 7427 */               }
/* 7428 */             }
/* 7429 */           );
/* 7430 */         } catch (e) {
/* 7431 */           console.warn('Supabase client initialization notice:', e);
/* 7432 */         }
/* 7433 */       }
/* 7434 */ 
/* 7435 */       window.yugmaSupabase = supabaseClient;
/* 7436 */ 
/* 7437 */       const auth = document.getElementById('yugma-auth');
/* 7438 */       const welcome = document.getElementById('yugma-welcome-screen');
/* 7439 */       const authScreen = document.getElementById('yugma-auth-screen');
/* 7440 */       const enterButton = document.getElementById('yugma-enter-button');
/* 7441 */       const loginTab = document.getElementById('auth-login-tab');
/* 7442 */       const signupTab = document.getElementById('auth-signup-tab');
/* 7443 */       const loginForm = document.getElementById('yugma-login-form');
/* 7444 */       const signupForm = document.getElementById('yugma-signup-form');
/* 7445 */       const eyebrow = document.getElementById('auth-eyebrow');
/* 7446 */       const title = document.getElementById('auth-title');
/* 7447 */       const subtitle = document.getElementById('auth-subtitle');
/* 7448 */ 
/* 7449 */       if (!auth) return;
/* 7450 */ 
/* 7451 */       // ── SESSION HELPERS ─────────────────────────────────────
/* 7452 */       function isSessionActive() {
/* 7453 */         return localStorage.getItem('yugmaLoggedIn') === 'true';
/* 7454 */       }
/* 7455 */ 
/* 7456 */       function updateNavUserState(user) {
/* 7457 */         const loginBtn = document.getElementById('btn-nav-login');
/* 7458 */         const userProfile = document.getElementById('nav-user-profile');
/* 7459 */         const userNameEl = document.getElementById('nav-user-name');
/* 7460 */         const logoutBtn = document.getElementById('btn-nav-logout');
/* 7461 */ 
/* 7462 */         if (user && isSessionActive()) {
/* 7463 */           if (userProfile) userProfile.classList.remove('hidden');
/* 7464 */           if (userNameEl) {
/* 7465 */             const displayName = user.isGuest ? 'GUEST EXPLORER' : (user.name || (user.email ? user.email.split('@')[0] : 'EXPLORER'));
/* 7466 */             userNameEl.textContent = displayName.toUpperCase();
/* 7467 */           }
/* 7468 */           if (logoutBtn) {
/* 7469 */             logoutBtn.textContent = user.isGuest ? 'EXIT GUEST' : 'LOGOUT';
/* 7470 */           }
/* 7471 */           if (loginBtn) {
/* 7472 */             if (user.isGuest) {
/* 7473 */               loginBtn.classList.remove('hidden');
/* 7474 */               const span = loginBtn.querySelector('span');
/* 7475 */               if (span) span.textContent = 'SIGN IN';
/* 7476 */             } else {
/* 7477 */               loginBtn.classList.add('hidden');
/* 7478 */             }
/* 7479 */           }
/* 7480 */         } else {
/* 7481 */           if (loginBtn) {
/* 7482 */             loginBtn.classList.remove('hidden');
/* 7483 */             const span = loginBtn.querySelector('span');
/* 7484 */             if (span) span.textContent = 'SIGN IN';
/* 7485 */           }
/* 7486 */           if (userProfile) userProfile.classList.add('hidden');
/* 7487 */         }
/* 7488 */       }
/* 7489 */ 
/* 7490 */       function markUserLoggedIn(user) {
/* 7491 */         localStorage.setItem('yugmaLoggedIn', 'true');
/* 7492 */         const selectedLang = window.yugmaTranslator ? window.yugmaTranslator.getLanguage() : (localStorage.getItem('yugmaUserLanguage') || 'en');
/* 7493 */         const userData = {
/* 7494 */           name: user.name || (user.user_metadata && user.user_metadata.full_name) || (user.email ? user.email.split('@')[0] : (user.isGuest ? 'Guest Explorer' : 'Explorer')),
/* 7495 */           email: user.email || '',
/* 7496 */           isGuest: !!user.isGuest,
/* 7497 */           language: user.language || selectedLang
/* 7498 */         };
/* 7499 */         localStorage.setItem('yugmaCurrentUser', JSON.stringify(userData));
/* 7500 */         updateNavUserState(userData);
/* 7501 */         if (window.yugmaTranslator) {
/* 7502 */           window.yugmaTranslator.setLanguage(userData.language);
/* 7503 */         }
/* 7504 */       }
/* 7505 */ 
/* 7506 */       function continueAsGuest() {
/* 7507 */         const selectedLang = window.yugmaTranslator ? window.yugmaTranslator.getLanguage() : (localStorage.getItem('yugmaUserLanguage') || 'en');
/* 7508 */         const guestUser = {
/* 7509 */           name: 'Guest Explorer',
/* 7510 */           email: '',
/* 7511 */           isGuest: true,
/* 7512 */           language: selectedLang
/* 7513 */         };
/* 7514 */         localStorage.setItem('yugmaIsGuest', 'true');
/* 7515 */         markUserLoggedIn(guestUser);
/* 7516 */         openExperience();
/* 7517 */       }
/* 7518 */ 
/* 7519 */       function logoutUser() {
/* 7520 */         localStorage.removeItem('yugmaLoggedIn');
/* 7521 */         localStorage.removeItem('yugmaCurrentUser');
/* 7522 */         localStorage.removeItem('yugmaIsGuest');
/* 7523 */         if (supabaseClient && supabaseClient.auth) {
/* 7524 */           try {
/* 7525 */             supabaseClient.auth.signOut();
/* 7526 */           } catch (e) {
/* 7527 */             console.warn('Supabase sign out error:', e);
/* 7528 */           }
/* 7529 */         }
/* 7530 */         updateNavUserState(null);
/* 7531 */         auth.style.display = 'flex';
/* 7532 */         auth.classList.remove('auth-hidden');
/* 7533 */         document.body.classList.add('yugma-screen-locked');
/* 7534 */         showWelcome();
/* 7535 */       }
/* 7536 */ 
/* 7537 */       const btnNavLogout = document.getElementById('btn-nav-logout');
/* 7538 */       if (btnNavLogout) {
/* 7539 */         btnNavLogout.addEventListener('click', (e) => {
/* 7540 */           e.preventDefault();
/* 7541 */           logoutUser();
/* 7542 */         });
/* 7543 */       }
/* 7544 */ 
/* 7545 */       function showWelcome() {
/* 7546 */         welcome.classList.remove('hidden');
/* 7547 */         authScreen.classList.add('hidden');
/* 7548 */       }
/* 7549 */ 
/* 7550 */       function showAuth() {
/* 7551 */         welcome.classList.add('hidden');
/* 7552 */         authScreen.classList.remove('hidden');
/* 7553 */         setMode('signup');
/* 7554 */       }
/* 7555 */ 
/* 7556 */       function setMode(mode) {
/* 7557 */         const login = mode === 'login';
/* 7558 */ 
/* 7559 */         loginTab.classList.toggle('active', login);
/* 7560 */         signupTab.classList.toggle('active', !login);
/* 7561 */         loginForm.classList.toggle('active', login);
/* 7562 */         signupForm.classList.toggle('active', !login);
/* 7563 */ 
/* 7564 */         eyebrow.textContent = login ? 'WELCOME BACK' : 'CREATE YOUR ACCOUNT';
/* 7565 */         title.textContent = login ? 'Enter YUGMA' : 'Join YUGMA';
/* 7566 */         subtitle.textContent = login
/* 7567 */           ? "Continue your journey through India's sacred geography."
/* 7568 */           : 'Create your profile and step inside the digital museum.';
/* 7569 */       }
/* 7570 */ 
/* 7571 */       function closeAuthModal() {
/* 7572 */         if (!isSessionActive()) {
/* 7573 */           continueAsGuest();
/* 7574 */         } else {
/* 7575 */           openExperience();
/* 7576 */         }
/* 7577 */       }
/* 7578 */ 
/* 7579 */       function openExperience() {
/* 7580 */         document.body.classList.remove('yugma-screen-locked');
/* 7581 */         auth.classList.add('auth-hidden');
/* 7582 */ 
/* 7583 */         setTimeout(() => {
/* 7584 */           auth.style.display = 'none';
/* 7585 */         }, 300);
/* 7586 */       }
/* 7587 */ 
/* 7588 */       function setButtonLoading(button, loading, loadingText = 'PLEASE WAIT…') {
/* 7589 */         if (!button) return;
/* 7590 */         if (loading) {
/* 7591 */           button.dataset.originalText = button.textContent;
/* 7592 */           button.disabled = true;
/* 7593 */           button.textContent = loadingText;
/* 7594 */         } else {
/* 7595 */           button.disabled = false;
/* 7596 */           button.textContent = button.dataset.originalText || button.textContent;
/* 7597 */         }
/* 7598 */       }
/* 7599 */ 
/* 7600 */       // Welcome & Guest Buttons
/* 7601 */       const guestButton = document.getElementById('yugma-guest-button');
/* 7602 */       if (guestButton) {
/* 7603 */         guestButton.addEventListener('click', () => {
/* 7604 */           continueAsGuest();
/* 7605 */         });
/* 7606 */       }
/* 7607 */ 
/* 7608 */       const authContinueGuestBtn = document.getElementById('auth-continue-guest-btn');
/* 7609 */       if (authContinueGuestBtn) {
/* 7610 */         authContinueGuestBtn.addEventListener('click', () => {
/* 7611 */           continueAsGuest();
/* 7612 */         });
/* 7613 */       }
/* 7614 */ 
/* 7615 */       const authSkipGuestTop = document.getElementById('auth-skip-guest-top');
/* 7616 */       if (authSkipGuestTop) {
/* 7617 */         authSkipGuestTop.addEventListener('click', () => {
/* 7618 */           continueAsGuest();
/* 7619 */         });
/* 7620 */       }
/* 7621 */ 
/* 7622 */       const authBackBtn = document.getElementById('auth-back-to-welcome');
/* 7623 */       if (authBackBtn) {
/* 7624 */         authBackBtn.addEventListener('click', () => {
/* 7625 */           showWelcome();
/* 7626 */         });
/* 7627 */       }
/* 7628 */ 
/* 7629 */       const btnNavLogin = document.getElementById('btn-nav-login');
/* 7630 */       if (btnNavLogin) {
/* 7631 */         btnNavLogin.addEventListener('click', (e) => {
/* 7632 */           e.preventDefault();
/* 7633 */           auth.style.display = 'flex';
/* 7634 */           auth.classList.remove('auth-hidden');
/* 7635 */           document.body.classList.add('yugma-screen-locked');
/* 7636 */           showAuth();
/* 7637 */           setMode('login');
/* 7638 */         });
/* 7639 */       }
/* 7640 */ 
/* 7641 */       enterButton.addEventListener('click', () => {
/* 7642 */         showAuth();
/* 7643 */         setMode('signup');
/* 7644 */       });
/* 7645 */ 
/* 7646 */       const welcomeLoginBtn = document.getElementById('yugma-welcome-login-btn');
/* 7647 */       if (welcomeLoginBtn) {
/* 7648 */         welcomeLoginBtn.addEventListener('click', () => {
/* 7649 */           showAuth();
/* 7650 */           setMode('login');
/* 7651 */         });
/* 7652 */       }
/* 7653 */ 
/* 7654 */       // ── CLOSE MODAL LISTENERS ──────────────────────────────
/* 7655 */       const welcomeCloseBtn = document.getElementById('welcome-close-btn');
/* 7656 */       if (welcomeCloseBtn) {
/* 7657 */         welcomeCloseBtn.addEventListener('click', (e) => {
/* 7658 */           e.preventDefault();
/* 7659 */           e.stopPropagation();
/* 7660 */           closeAuthModal();
/* 7661 */         });
/* 7662 */       }
/* 7663 */ 
/* 7664 */       const authScreenCloseBtn = document.getElementById('auth-screen-close-btn');
/* 7665 */       if (authScreenCloseBtn) {
/* 7666 */         authScreenCloseBtn.addEventListener('click', (e) => {
/* 7667 */           e.preventDefault();
/* 7668 */           e.stopPropagation();
/* 7669 */           closeAuthModal();
/* 7670 */         });
/* 7671 */       }
/* 7672 */ 
/* 7673 */       const authTopCloseBtn = document.getElementById('auth-top-close-btn');
/* 7674 */       if (authTopCloseBtn) {
/* 7675 */         authTopCloseBtn.addEventListener('click', (e) => {
/* 7676 */           e.preventDefault();
/* 7677 */           e.stopPropagation();
/* 7678 */           closeAuthModal();
/* 7679 */         });
/* 7680 */       }
/* 7681 */ 
/* 7682 */       // Close when clicking outside modal cards on dark backdrop
/* 7683 */       auth.addEventListener('click', (e) => {
/* 7684 */         if (e.target === auth || e.target === welcome || e.target === authScreen) {
/* 7685 */           closeAuthModal();
/* 7686 */         }
/* 7687 */       });
/* 7688 */ 
/* 7689 */       // Close on Escape key press
/* 7690 */       document.addEventListener('keydown', (e) => {
/* 7691 */         if (e.key === 'Escape' && !auth.classList.contains('auth-hidden') && auth.style.display !== 'none') {
/* 7692 */           closeAuthModal();
/* 7693 */         }
/* 7694 */       });
/* 7695 */ 
/* 7696 */       loginTab.addEventListener('click', () => setMode('login'));
/* 7697 */       signupTab.addEventListener('click', () => setMode('signup'));
/* 7698 */ 
/* 7699 */       document.querySelectorAll('.auth-eye').forEach(button => {
/* 7700 */         button.addEventListener('click', () => {
/* 7701 */           const input = document.getElementById(button.dataset.target);
/* 7702 */           if (!input) return;
/* 7703 */ 
/* 7704 */           const visible = input.type === 'text';
/* 7705 */           input.type = visible ? 'password' : 'text';
/* 7706 */           button.textContent = visible ? '◉' : '◌';
/* 7707 */           button.setAttribute('aria-label', visible ? 'Show password' : 'Hide password');
/* 7708 */         });
/* 7709 */       });
/* 7710 */ 
/* 7711 */       // ── SIGN UP ─────────────────────────────────────────────
/* 7712 */       signupForm.addEventListener('submit', async event => {
/* 7713 */         event.preventDefault();
/* 7714 */ 
/* 7715 */         const button = signupForm.querySelector('button[type="submit"]');
/* 7716 */         const name = document.getElementById('yugma-signup-name').value.trim();
/* 7717 */         const email = document.getElementById('yugma-signup-email').value.trim().toLowerCase();
/* 7718 */         const password = document.getElementById('yugma-signup-password').value;
/* 7719 */         const confirm = document.getElementById('yugma-signup-confirm').value;
/* 7720 */ 
/* 7721 */         if (!name || !email || !password || !confirm) {
/* 7722 */           alert('Please fill in all fields.');
/* 7723 */           return;
/* 7724 */         }
/* 7725 */ 
/* 7726 */         if (password.length < 6) {
/* 7727 */           alert('Password must contain at least 6 characters.');
/* 7728 */           return;
/* 7729 */         }
/* 7730 */ 
/* 7731 */         if (password !== confirm) {
/* 7732 */           alert('Passwords do not match.');
/* 7733 */           return;
/* 7734 */         }
/* 7735 */ 
/* 7736 */         setButtonLoading(button, true, 'CREATING ACCOUNT…');
/* 7737 */ 
/* 7738 */         const selectedLang = window.yugmaTranslator ? window.yugmaTranslator.getLanguage() : (localStorage.getItem('yugmaUserLanguage') || 'en');
/* 7739 */ 
/* 7740 */         // Always save locally so login is never blocked
/* 7741 */         const localUser = { name, email, password, language: selectedLang };
/* 7742 */         localStorage.setItem('yugmaUser', JSON.stringify(localUser));
/* 7743 */ 
/* 7744 */         if (supabaseClient && supabaseClient.auth) {
/* 7745 */           try {
/* 7746 */             const { data, error } = await supabaseClient.auth.signUp({
/* 7747 */               email,
/* 7748 */               password,
/* 7749 */               options: {
/* 7750 */                 data: {
/* 7751 */                   full_name: name,
/* 7752 */                   language: selectedLang
/* 7753 */                 }
/* 7754 */               }
/* 7755 */             });
/* 7756 */ 
/* 7757 */             if (error) {
/* 7758 */               console.warn('Supabase signup notice:', error.message);
/* 7759 */             }
/* 7760 */           } catch (error) {
/* 7761 */             console.warn('YUGMA Supabase signup fallback:', error);
/* 7762 */           }
/* 7763 */         }
/* 7764 */ 
/* 7765 */         setButtonLoading(button, false);
/* 7766 */         markUserLoggedIn({ name, email, language: selectedLang });
/* 7767 */         alert('Welcome to YUGMA, ' + name + '! Your profile has been created.');
/* 7768 */         openExperience();
/* 7769 */       });
/* 7770 */ 
/* 7771 */       // ── LOGIN ───────────────────────────────────────────────
/* 7772 */       loginForm.addEventListener('submit', async event => {
/* 7773 */         event.preventDefault();
/* 7774 */ 
/* 7775 */         const button = loginForm.querySelector('button[type="submit"]');
/* 7776 */         const email = document.getElementById('yugma-login-email').value.trim().toLowerCase();
/* 7777 */         const password = document.getElementById('yugma-login-password').value;
/* 7778 */ 
/* 7779 */         if (!email || !password) {
/* 7780 */           alert('Please enter your email and password.');
/* 7781 */           return;
/* 7782 */         }
/* 7783 */ 
/* 7784 */         setButtonLoading(button, true, 'SIGNING IN…');
/* 7785 */ 
/* 7786 */         let loginSuccess = false;
/* 7787 */         let authenticatedUser = null;
/* 7788 */ 
/* 7789 */         // 1. Try Supabase
/* 7790 */         if (supabaseClient && supabaseClient.auth) {
/* 7791 */           try {
/* 7792 */             const { data, error } = await supabaseClient.auth.signInWithPassword({
/* 7793 */               email,
/* 7794 */               password
/* 7795 */             });
/* 7796 */ 
/* 7797 */             if (!error && data && data.session) {
/* 7798 */               loginSuccess = true;
/* 7799 */               authenticatedUser = {
/* 7800 */                 name: (data.user.user_metadata && data.user.user_metadata.full_name) || email.split('@')[0],
/* 7801 */                 email: data.user.email
/* 7802 */               };
/* 7803 */             }
/* 7804 */           } catch (error) {
/* 7805 */             console.warn('Supabase sign-in exception:', error);
/* 7806 */           }
/* 7807 */         }
/* 7808 */ 
/* 7809 */         // 2. Check Local Storage fallback (e.g. created on auth.html or offline)
/* 7810 */         if (!loginSuccess) {
/* 7811 */           const localUser = JSON.parse(localStorage.getItem('yugmaUser') || 'null');
/* 7812 */           if (localUser && localUser.email === email && localUser.password === password) {
/* 7813 */             loginSuccess = true;
/* 7814 */             authenticatedUser = {
/* 7815 */               name: localUser.name,
/* 7816 */               email: localUser.email
/* 7817 */             };
/* 7818 */           }
/* 7819 */         }
/* 7820 */ 
/* 7821 */         setButtonLoading(button, false);
/* 7822 */ 
/* 7823 */         if (loginSuccess && authenticatedUser) {
/* 7824 */           const selectedLang = window.yugmaTranslator ? window.yugmaTranslator.getLanguage() : (localStorage.getItem('yugmaUserLanguage') || 'en');
/* 7825 */           authenticatedUser.language = selectedLang;
/* 7826 */           markUserLoggedIn(authenticatedUser);
/* 7827 */           openExperience();
/* 7828 */         } else {
/* 7829 */           alert('Incorrect email or password. Please verify your credentials or create an account.');
/* 7830 */         }
/* 7831 */       });
/* 7832 */ 
/* 7833 */       // ── FORGOT PASSWORD ─────────────────────────────────────
/* 7834 */       document.getElementById('yugma-forgot').addEventListener('click', async () => {
/* 7835 */         const email = document.getElementById('yugma-login-email').value.trim().toLowerCase();
/* 7836 */ 
/* 7837 */         if (!email) {
/* 7838 */           alert('Enter your email address first, then click Forgot password.');
/* 7839 */           document.getElementById('yugma-login-email').focus();
/* 7840 */           return;
/* 7841 */         }
/* 7842 */ 
/* 7843 */         if (supabaseClient && supabaseClient.auth) {
/* 7844 */           try {
/* 7845 */             const redirectTo = `${window.location.origin}${window.location.pathname}`;
/* 7846 */             const { error } = await supabaseClient.auth.resetPasswordForEmail(email, {
/* 7847 */               redirectTo
/* 7848 */             });
/* 7849 */ 
/* 7850 */             if (error) throw error;
/* 7851 */             alert('Password reset email sent. Please check your inbox.');
/* 7852 */           } catch (error) {
/* 7853 */             console.error('YUGMA password reset error:', error);
/* 7854 */             alert(error.message || 'Unable to send the password reset email.');
/* 7855 */           }
/* 7856 */         } else {
/* 7857 */           alert('Password reset request recorded for: ' + email);
/* 7858 */         }
/* 7859 */       });
/* 7860 */ 
/* 7861 */       // ── SESSION RESTORATION ON PAGE LOAD ────────────────────
/* 7862 */       async function restoreSession() {
/* 7863 */         // Check URL params for ?guest=true (e.g. redirected from auth.html)
/* 7864 */         const urlParams = new URLSearchParams(window.location.search);
/* 7865 */         if (urlParams.get('guest') === 'true') {
/* 7866 */           continueAsGuest();
/* 7867 */           return;
/* 7868 */         }
/* 7869 */ 
/* 7870 */         let activeUser = null;
/* 7871 */ 
/* 7872 */         // 1. Check local session flag
/* 7873 */         if (localStorage.getItem('yugmaLoggedIn') === 'true') {
/* 7874 */           activeUser = JSON.parse(localStorage.getItem('yugmaCurrentUser') || 'null');
/* 7875 */           if (!activeUser) {
/* 7876 */             const saved = JSON.parse(localStorage.getItem('yugmaUser') || 'null');
/* 7877 */             if (saved) activeUser = { name: saved.name, email: saved.email };
/* 7878 */           }
/* 7879 */         }
/* 7880 */ 
/* 7881 */         // 2. Check Supabase session
/* 7882 */         if (!activeUser && supabaseClient && supabaseClient.auth) {
/* 7883 */           try {
/* 7884 */             const { data: { session } } = await supabaseClient.auth.getSession();
/* 7885 */             if (session && session.user) {
/* 7886 */               activeUser = {
/* 7887 */                 name: (session.user.user_metadata && session.user.user_metadata.full_name) || session.user.email?.split('@')[0],
/* 7888 */                 email: session.user.email
/* 7889 */               };
/* 7890 */               localStorage.setItem('yugmaLoggedIn', 'true');
/* 7891 */             }
/* 7892 */           } catch (e) {
/* 7893 */             console.warn('Session check notice:', e);
/* 7894 */           }
/* 7895 */         }
/* 7896 */ 
/* 7897 */         if (activeUser) {
/* 7898 */           // User is ALREADY LOGGED IN: Keep museum open, DO NOT lock screen or prompt
/* 7899 */           markUserLoggedIn(activeUser);
/* 7900 */           auth.style.display = 'none';
/* 7901 */           auth.classList.add('auth-hidden');
/* 7902 */           document.body.classList.remove('yugma-screen-locked');
/* 7903 */         } else {
/* 7904 */           // User is NOT logged in: Show Welcome screen
/* 7905 */           auth.style.display = 'flex';
/* 7906 */           auth.classList.remove('auth-hidden');
/* 7907 */           document.body.classList.add('yugma-screen-locked');
/* 7908 */           showWelcome();
/* 7909 */           updateNavUserState(null);
/* 7910 */         }
/* 7911 */       }
/* 7912 */ 
/* 7913 */       restoreSession();
/* 7914 */ 
/* 7915 */       // Keep session fresh
/* 7916 */       if (supabaseClient && supabaseClient.auth) {
/* 7917 */         supabaseClient.auth.onAuthStateChange((event, session) => {
/* 7918 */           if (event === 'SIGNED_OUT') {
/* 7919 */             logoutUser();
/* 7920 */           } else if (event === 'SIGNED_IN' && session) {
/* 7921 */             const user = {
/* 7922 */               name: (session.user.user_metadata && session.user.user_metadata.full_name) || session.user.email?.split('@')[0],
/* 7923 */               email: session.user.email
/* 7924 */             };
/* 7925 */             markUserLoggedIn(user);
/* 7926 */           }
/* 7927 */         });
/* 7928 */       }
/* 7929 */ 
/* 7930 */       // Expose globally for viewer modals if needed
/* 7931 */       window.yugmaAuth = {
/* 7932 */         isSessionActive,
/* 7933 */         markUserLoggedIn,
/* 7934 */         continueAsGuest,
/* 7935 */         logoutUser,
/* 7936 */         openExperience,
/* 7937 */         closeAuthModal
/* 7938 */       };
/* 7939 */     })();
/* 7940 */ 
/* 7941 */     // Launch on DOM ready
/* 7942 */     window.addEventListener('DOMContentLoaded', () => {
/* 7943 */       initGlobe();
/* 7944 */       updateScrollProgress();
/* 7945 */     });
/* 7946 */   </script>
/* 7947 */ 
/* 7948 */ </body>
/* 7949 */ 
/* 7950 */ </html>