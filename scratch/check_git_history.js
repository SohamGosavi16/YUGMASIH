const { execSync } = require('child_process');

try {
  // Let's check the commits that touched index.html
  const commits = execSync('git log --format="%h %s" index.html', { encoding: 'utf8' }).trim().split('\n');
  console.log('Commits touching index.html:', commits);

  // Check diffs for each commit touching index.html
  for (const c of commits) {
    const hash = c.split(' ')[0];
    const diff = execSync(`git show ${hash} -- index.html`, { encoding: 'utf8', maxBuffer: 10 * 1024 * 1024 });
    const hasVoice = /voice|speech|synth|audio-guide/i.test(diff);
    console.log(`Commit ${hash} hasVoice:`, hasVoice);
  }
} catch (e) {
  console.error(e.message);
}

