const fs = require('fs');

const index = fs.readFileSync('index.html', 'utf8');

const authScriptIdx = index.indexOf('// ── AUTHENTICATION & LOGIN/SIGNUP ENGINE ──');
console.log('Auth script snippet in index.html:');
if (authScriptIdx !== -1) {
  console.log(index.substring(authScriptIdx, authScriptIdx + 3000));
} else {
  // search for yugmaAuth
  const ya = index.indexOf('window.yugmaAuth =');
  console.log(index.substring(ya - 2000, ya + 1000));
}

