const fs = require('fs');
const vm = require('vm');

const content = fs.readFileSync('index.html', 'utf8');
const start = content.indexOf('const YUGMA_STATES = {');
const end = content.indexOf('const STATE_COLORS = {', start);
const code = content.substring(start, end);

const sandbox = {};
vm.createContext(sandbox);
vm.runInContext(code, sandbox);

const states = sandbox.YUGMA_STATES;
const keys = Object.keys(states);
console.log('Total YUGMA_STATES keys:', keys.length);
keys.forEach(k => {
  const s = states[k];
  const arvr = (s.paths && s.paths.arvr) || s.vrPath || '';
  console.log(`${k} -> heritage: "${s.heritage}", path: "${arvr}"`);
});

