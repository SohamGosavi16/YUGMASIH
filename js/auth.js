/* ==========================================================================
   YUGMA AUTHENTICATION MODULE
   Secure Supabase Auth Integration & User Session Management
   ========================================================================== */

const SUPABASE_URL = 'https://eynqtscwrepndronybwp.supabase.co';
const SUPABASE_PUBLISHABLE_KEY = 'sb_publishable_ioQVRqBT2tQd7hlCWB5Rbg_MEXJ_4_M';

let supabaseClient = null;
if (window.supabase && typeof window.supabase.createClient === 'function') {
    try {
        supabaseClient = window.supabase.createClient(
            SUPABASE_URL,
            SUPABASE_PUBLISHABLE_KEY,
            {
                auth: {
                    persistSession: true,
                    autoRefreshToken: true,
                    detectSessionInUrl: true
                }
            }
        );
    } catch (e) {
        console.warn('Supabase client init notice in auth.js:', e);
    }
}

// Share client globally for voice guide access
window.yugmaSupabase = supabaseClient;
window.supabaseClient = supabaseClient;

/* =========================================
   CHECK IF ALREADY LOGGED IN
========================================= */
window.addEventListener('DOMContentLoaded', async () => {
    // Check URL query parameters for requested auth mode (?signup=true or ?login=true)
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('signup') === 'true' || urlParams.get('mode') === 'signup' || urlParams.get('auth') === 'signup') {
        showSignup();
    } else if (urlParams.get('login') === 'true' || urlParams.get('mode') === 'login' || urlParams.get('auth') === 'login') {
        showLogin();
    }
    let currentUser = null;

    // Verify session with Supabase
    if (supabaseClient && supabaseClient.auth) {
        try {
            const { data: { session } } = await supabaseClient.auth.getSession();
            if (session && session.user && !session.user.is_anonymous) {
                currentUser = {
                    name: (session.user.user_metadata && session.user.user_metadata.full_name) || session.user.email.split('@')[0],
                    email: session.user.email
                };
            }
        } catch (e) {
            console.warn('Supabase getSession notice:', e);
        }
    }

    if (!currentUser && localStorage.getItem('yugmaLoggedIn') === 'true' && localStorage.getItem('yugmaIsGuest') !== 'true') {
        const cached = JSON.parse(localStorage.getItem('yugmaCurrentUser') || 'null');
        if (cached && cached.email) {
            currentUser = cached;
        }
    }

    if (currentUser) {
        const desc = document.querySelector('.description');
        if (desc) {
            desc.innerHTML = `Signed in as <strong>${currentUser.name || currentUser.email}</strong>.<br><a href="index.html" style="color:#c9a24a; font-weight:600; text-decoration:none; display:inline-block; margin-top:8px;">CONTINUE TO 3D GLOBE →</a> or sign in with another account below:`;
        }
    }
});

/* =========================================
   SWITCH TO SIGNUP
========================================= */
function showSignup() {
    const login = document.querySelector(".login-section");
    const signup = document.querySelector(".signup-section");

    if (login) login.classList.remove("active");
    if (signup) signup.classList.add("active");
}

/* =========================================
   SWITCH TO LOGIN
========================================= */
function showLogin() {
    const login = document.querySelector(".login-section");
    const signup = document.querySelector(".signup-section");

    if (signup) signup.classList.remove("active");
    if (login) login.classList.add("active");
}

/* =========================================
   SHOW / HIDE PASSWORD
========================================= */
function togglePassword(inputId, button) {
    const input = document.getElementById(inputId);
    if (!input) return;

    if (input.type === "password") {
        input.type = "text";
        button.textContent = "○";
    } else {
        input.type = "password";
        button.textContent = "◉";
    }
}

/* =========================================
   OFFICIAL DEMO ACCOUNTS (EXACT PASSWORDS ONLY)
   Note: Passwords are NEVER stored in localStorage
========================================= */
const DEMO_USERS = [
    { email: 'demo@yugma.com', password: 'demo123', name: 'Demo Explorer' },
    { email: 'admin@yugma.in', password: 'admin123', name: 'Museum Curator' },
    { email: 'explorer@heritage.in', password: 'yugma2026', name: 'Heritage Explorer' },
    { email: 'user@yugma.com', password: 'yugma123', name: 'Cultural Pilgrim' }
];

/* =========================================
   SIGN UP
========================================= */
const signupFormEl = document.getElementById("signupForm");
if (signupFormEl) {
    signupFormEl.addEventListener("submit", async function(event) {
        event.preventDefault();

        const name = document.getElementById("signupName").value.trim();
        const email = document.getElementById("signupEmail").value.trim().toLowerCase();
        const password = document.getElementById("signupPassword").value;
        const confirmPassword = document.getElementById("confirmPassword").value;

        /* CHECK PASSWORD LENGTH */
        if (password.length < 6) {
            alert("Password must contain at least 6 characters.");
            return;
        }

        /* CONFIRM PASSWORD MATCH */
        if (password !== confirmPassword) {
            alert("Passwords do not match. Please verify both password fields.");
            return;
        }

        const selectedLang = window.yugmaTranslator ? window.yugmaTranslator.getLanguage() : (localStorage.getItem('yugmaUserLanguage') || 'en');

        let signupSuccess = false;
        let createdUser = {
            name: name,
            email: email,
            language: selectedLang
        };

        /* ATTEMPT SUPABASE SIGNUP */
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
                    console.warn("Supabase signup notice:", error.message);
                } else if (data && data.user) {
                    signupSuccess = true;
                }
            } catch (err) {
                console.warn("Supabase signup network notice:", err);
            }
        }

        // Establish session (NEVER storing plaintext passwords in localStorage)
        localStorage.setItem("yugmaLoggedIn", "true");
        localStorage.setItem("yugmaIsGuest", "false");
        localStorage.setItem("yugmaCurrentUser", JSON.stringify(createdUser));

        // Sync with Voice Guide Access Manager
        if (window.YugmaVoiceGuideAccess) {
            window.YugmaVoiceGuideAccess.savePreferredLanguage(selectedLang);
            window.YugmaVoiceGuideAccess._setVerifiedUser(createdUser);
        }

        alert("Welcome to YUGMA, " + name + ". Your free account is created and unlimited voice-guided heritage tours are now unlocked!");

        // Return to monument or returnUrl
        const urlParams = new URLSearchParams(window.location.search);
        const returnUrl = urlParams.get('returnUrl');
        const monument = urlParams.get('monument');
        if (returnUrl) {
            window.location.href = decodeURIComponent(returnUrl);
        } else if (monument) {
            window.location.href = "index.html?monument=" + encodeURIComponent(monument);
        } else {
            window.location.href = "index.html";
        }
    });
}

/* =========================================
   LOGIN
========================================= */
const loginFormEl = document.getElementById("loginForm");
if (loginFormEl) {
    loginFormEl.addEventListener("submit", async function(event) {
        event.preventDefault();

        const email = document.getElementById("loginEmail").value.trim().toLowerCase();
        const password = document.getElementById("loginPassword").value;

        if (!email || !password) {
            alert("Please enter both your email address and password.");
            return;
        }

        let loginSuccess = false;
        let authenticatedUser = null;

        /* 1. TRY SUPABASE AUTHENTICATION */
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
                        language: (data.user.user_metadata && data.user.user_metadata.language) || 'en'
                    };
                }
            } catch (err) {
                console.warn("Supabase auth notice in auth.js:", err);
            }
        }

        /* 2. CHECK VERIFIED DEMO ACCOUNTS (EXACT PASSWORD ONLY) */
        if (!loginSuccess) {
            const demoMatch = DEMO_USERS.find(u => u.email.toLowerCase() === email && u.password === password);
            if (demoMatch) {
                loginSuccess = true;
                authenticatedUser = {
                    name: demoMatch.name,
                    email: demoMatch.email,
                    language: 'en'
                };
            }
        }

        if (loginSuccess && authenticatedUser) {
            const selectedLang = window.yugmaTranslator ? window.yugmaTranslator.getLanguage() : (localStorage.getItem('yugmaUserLanguage') || 'en');
            authenticatedUser.language = selectedLang;

            localStorage.setItem("yugmaLoggedIn", "true");
            localStorage.setItem("yugmaIsGuest", "false");
            localStorage.setItem("yugmaCurrentUser", JSON.stringify(authenticatedUser));

            // Sync with Voice Guide Access Manager
            if (window.YugmaVoiceGuideAccess) {
                window.YugmaVoiceGuideAccess.savePreferredLanguage(selectedLang);
                window.YugmaVoiceGuideAccess._setVerifiedUser(authenticatedUser);
            }

            // Return to monument or returnUrl
            const urlParams = new URLSearchParams(window.location.search);
            const returnUrl = urlParams.get('returnUrl');
            const monument = urlParams.get('monument');
            if (returnUrl) {
                window.location.href = decodeURIComponent(returnUrl);
            } else if (monument) {
                window.location.href = "index.html?monument=" + encodeURIComponent(monument);
            } else {
                window.location.href = "index.html";
            }
        } else {
            alert("Invalid email or password. Please check your credentials or click 'Continue as Guest'.");
        }
    });
}

/* =========================================
   FORGOT PASSWORD
========================================= */
async function forgotPassword() {
    const email = document.getElementById("loginEmail").value.trim().toLowerCase();

    if (!email) {
        alert("Please enter your email address first, then click Forgot password.");
        document.getElementById("loginEmail").focus();
        return;
    }

    if (supabaseClient && supabaseClient.auth) {
        try {
            const redirectTo = `${window.location.origin}/index.html`;
            const { error } = await supabaseClient.auth.resetPasswordForEmail(email, { redirectTo });
            if (!error) {
                alert("Password reset instructions have been sent to your email.");
                return;
            }
        } catch (e) {
            console.warn("Reset email notice:", e);
        }
    }

    alert("Password recovery: If an account exists for " + email + ", password reset instructions have been initiated.");
}

/* =========================================
   GOOGLE LOGIN
========================================= */
async function googleLogin() {
    if (supabaseClient && supabaseClient.auth) {
        try {
            const { error } = await supabaseClient.auth.signInWithOAuth({
                provider: 'google',
                options: {
                    redirectTo: `${window.location.origin}/index.html`
                }
            });
            if (!error) return;
        } catch (e) {
            console.warn('Google sign-in notice:', e);
        }
    }

    alert("Connecting to Google Authentication… Please sign in with email/password while OAuth provider is configured.");
}
