const fs = require('fs');

const index = fs.readFileSync('index.html', 'utf8');

// Find marker click in index.html
const mIdx = index.indexOf('onHtmlElementClick');
if (mIdx !== -1) {
  console.log(index.substring(mIdx - 100, mIdx + 500));
} else {
  // search for htmlElement
  const re = /htmlElement/g;
  let m;
  while ((m = re.exec(index)) !== null) {
    console.log(index.substring(m.index, m.index + 200));
  }
}

