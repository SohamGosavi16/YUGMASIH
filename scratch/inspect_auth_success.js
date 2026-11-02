const fs = require('fs');

const authJs = fs.readFileSync('js/auth.js', 'utf8');

const sIdx = authJs.indexOf('/* ATTEMPT SUPABASE SIGNUP */');
console.log(authJs.substring(sIdx, sIdx + 2000));

