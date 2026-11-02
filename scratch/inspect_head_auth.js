const fs = require('fs');

const index = fs.readFileSync('index.html', 'utf8');

const headEnd = index.indexOf('</head>');
const headContent = index.substring(0, headEnd);

const matches = [];
let re = /yugma-session-restored|#yugma-auth/g;
let m;
while ((m = re.exec(headContent)) !== null) {
  matches.push({
    index: m.index,
    snippet: headContent.substring(Math.max(0, m.index - 50), Math.min(headContent.length, m.index + 150))
  });
}
console.log('Matches in head:', matches);

