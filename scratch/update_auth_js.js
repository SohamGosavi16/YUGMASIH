const fs = require('fs');

let authJs = fs.readFileSync('js/auth.js', 'utf8');

// 1. Look for DOMContentLoaded in auth.js
const domTarget = `window.addEventListener('DOMContentLoaded', async () => {`;
const domReplacement = `window.addEventListener('DOMContentLoaded', async () => {
    // Check URL query parameters for requested auth mode (?signup=true or ?login=true)
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('signup') === 'true' || urlParams.get('mode') === 'signup' || urlParams.get('auth') === 'signup') {
        showSignup();
    } else if (urlParams.get('login') === 'true' || urlParams.get('mode') === 'login' || urlParams.get('auth') === 'login') {
        showLogin();
    }`;

if (authJs.includes(domTarget)) {
  authJs = authJs.replace(domTarget, domReplacement);
  console.log('Added URL parameter check to DOMContentLoaded in js/auth.js');
}

// 2. In signup submit handler, redirect back to returnUrl or monument
const signupTarget = `        // Return to 3D Globe
        window.location.href = "index.html";`;

const signupReplacement = `        // Return to monument or returnUrl
        const urlParams = new URLSearchParams(window.location.search);
        const returnUrl = urlParams.get('returnUrl');
        const monument = urlParams.get('monument');
        if (returnUrl) {
            window.location.href = decodeURIComponent(returnUrl);
        } else if (monument) {
            window.location.href = "index.html?monument=" + encodeURIComponent(monument);
        } else {
            window.location.href = "index.html";
        }`;

if (authJs.includes(signupTarget)) {
  authJs = authJs.replace(signupTarget, signupReplacement);
  console.log('Updated signup redirect in js/auth.js');
}

// 3. In login submit handler, redirect back to returnUrl or monument
const loginTarget = `            // Return to 3D Globe
            window.location.href = "index.html";`;

const loginReplacement = `            // Return to monument or returnUrl
            const urlParams = new URLSearchParams(window.location.search);
            const returnUrl = urlParams.get('returnUrl');
            const monument = urlParams.get('monument');
            if (returnUrl) {
                window.location.href = decodeURIComponent(returnUrl);
            } else if (monument) {
                window.location.href = "index.html?monument=" + encodeURIComponent(monument);
            } else {
                window.location.href = "index.html";
            }`;

if (authJs.includes(loginTarget)) {
  authJs = authJs.replace(loginTarget, loginReplacement);
  console.log('Updated login redirect in js/auth.js');
}

fs.writeFileSync('js/auth.js', authJs, 'utf8');
console.log('Saved js/auth.js successfully.');

