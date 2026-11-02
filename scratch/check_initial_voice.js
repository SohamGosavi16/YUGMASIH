const { execSync } = require('child_process');

try {
  const content = execSync('git show 901b4c6:index.html', { encoding: 'utf8', maxBuffer: 20 * 1024 * 1024 });
  console.log('Total length in 901b4c6:', content.length);
  
  // Find occurrences of voice / speech / audio
  const re = /voice|speech|audio/gi;
  let m;
  const matches = [];
  while ((m = re.exec(content)) !== null) {
    matches.push({
      index: m.index,
      snippet: content.substring(Math.max(0, m.index - 80), Math.min(content.length, m.index + 120))
    });
  }
  console.log('Matches in 901b4c6 index.html:', matches.length);
  matches.forEach((item, i) => {
    console.log(`[Match ${i}] pos ${item.index}: ${JSON.stringify(item.snippet)}`);
  });
} catch (e) {
  console.error(e.message);
}

