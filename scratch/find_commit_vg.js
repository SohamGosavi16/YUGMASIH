const { execSync } = require('child_process');

try {
  const commits = execSync('git log --oneline').toString().trim().split('\n');
  console.log('Commits:', commits);
  
  for (const line of commits) {
    const hash = line.split(' ')[0];
    try {
      const grepRes = execSync(`git grep -i -E "voice.*guide|voiceguide" ${hash} -- index.html`).toString();
      console.log(`\n=== Commit ${line} matches in index.html: ===`);
      console.log(grepRes.split('\n').slice(0, 10).join('\n'));
    } catch(e) {
      console.log(`Commit ${line} has no matches in index.html`);
    }
  }
} catch (e) {
  console.error(e);
}

