const fs = require('fs');

const index = fs.readFileSync('index.html', 'utf8');

const sIdx = index.indexOf('// ── SIGN UP ─────────────────────────────────────────────');
const eIdx = index.indexOf('// ── LOGIN ───────────────────────────────────────────────', sIdx);
console.log('signupForm:\n', index.substring(sIdx, eIdx));

const sIdx2 = index.indexOf('// ── LOGIN ───────────────────────────────────────────────');
const eIdx2 = index.indexOf('// ── FORGOT PASSWORD ─────────────────────────────────────', sIdx2);
console.log('loginForm:\n', index.substring(sIdx2, eIdx2));

