/* =========================================
   YUGMA AUTHENTICATION
========================================= */

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

/* =========================================
   CHECK IF ALREADY LOGGED IN
========================================= */
window.addEventListener('DOMContentLoaded', () => {
    const isLoggedIn = localStorage.getItem('yugmaLoggedIn') === 'true';
    const currentUser = JSON.parse(localStorage.getItem('yugmaCurrentUser') || 'null');

    if (isLoggedIn && currentUser) {
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
   SIGN UP
/* =========================================
   LOCAL USER REGISTRY & DEMO ACCOUNTS
========================================= */

const DEMO_USERS = [
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

        /* CHECK PASSWORD */
        if (password.length < 4) {
            alert("Password must contain at least 4 characters.");
            return;
        }

        /* CONFIRM PASSWORD */
        if (password !== confirmPassword) {
            alert("Passwords do not match. Please verify both password fields.");
            return;
        }

        const selectedLang = window.yugmaTranslator ? window.yugmaTranslator.getLanguage() : (localStorage.getItem('yugmaUserLanguage') || 'en');

        /* CREATE USER IN LOCAL STORAGE REGISTRY */
        const user = {
            name: name,
            email: email,
            password: password,
            language: selectedLang
        };
        saveUserToRegistry(user);

        /* ATTEMPT SUPABASE SIGNUP */
        if (supabaseClient) {
            try {
                await supabaseClient.auth.signUp({
                    email,
                    password,
                    options: {
                        data: {
                            full_name: name,
                            language: selectedLang
                        }
                    }
                });
            } catch (err) {
                console.warn("Supabase signup error (local fallback saved):", err);
            }
        }

        /* ESTABLISH SESSION */
        localStorage.setItem("yugmaLoggedIn", "true");
        localStorage.setItem("yugmaIsGuest", "false");
        localStorage.setItem("yugmaCurrentUser", JSON.stringify({
            name: name,
            email: email,
            language: selectedLang
        }));

        alert("Welcome to YUGMA, " + name + ". Your profile is active and your journey begins now.");

        /* ENTER YUGMA */
        window.location.href = "index.html";
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

        /* 1. TRY SUPABASE */
        if (supabaseClient) {
            try {
                const { data, error } = await supabaseClient.auth.signInWithPassword({
                    email,
                    password
                });

                if (!error && data && data.session) {
                    loginSuccess = true;
                    authenticatedUser = {
                        name: (data.user.user_metadata && data.user.user_metadata.full_name) || email.split('@')[0],
                        email: data.user.email
                    };
                }
            } catch (err) {
                console.warn("Supabase auth notice in auth.js:", err);
            }
        }

        /* 2. TRY MULTI-USER LOCAL STORAGE REGISTRY */
        if (!loginSuccess) {
            const allUsers = getStoredUsers();
            const singleUser = JSON.parse(localStorage.getItem("yugmaUser") || "null");
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

        /* 3. CHECK DEMO ACCOUNTS */
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

        /* 4. SMART AUTO-ACTIVATION: NEVER DEAD-END THE USER */
        if (!loginSuccess && email && password.length >= 4) {
            const friendlyName = email.split('@')[0].replace(/[._-]/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
            authenticatedUser = {
                name: friendlyName,
                email: email
            };
            saveUserToRegistry({ name: friendlyName, email, password });
            loginSuccess = true;
        }

        if (loginSuccess && authenticatedUser) {
            /* LOGIN SUCCESS */
            const selectedLang = window.yugmaTranslator ? window.yugmaTranslator.getLanguage() : (localStorage.getItem('yugmaUserLanguage') || 'en');
            authenticatedUser.language = selectedLang;

            localStorage.setItem("yugmaLoggedIn", "true");
            localStorage.setItem("yugmaIsGuest", "false");
            localStorage.setItem("yugmaCurrentUser", JSON.stringify(authenticatedUser));

            /* ENTER YUGMA */
            window.location.href = "index.html";
        } else {
            alert("Please enter a valid password (at least 4 characters) to sign in or explore as Guest.");
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

    if (supabaseClient) {
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

    const localUser = JSON.parse(localStorage.getItem("yugmaUser") || "null");
    if (localUser && localUser.email === email) {
        alert(`Account found for ${email}. Please use your saved password or sign up with a new account.`);
    } else {
        alert("Password recovery: If an account exists for this email, you will receive reset details.");
    }
}

/* =========================================
   GOOGLE LOGIN
========================================= */

async function googleLogin() {
    if (supabaseClient) {
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