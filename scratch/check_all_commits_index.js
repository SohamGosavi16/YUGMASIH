const { execSync } = require('child_process');

const commits = execSync('git log --format="%H %s"').toString().trim().split('\n');
console.log('All commits:', commits);

for (const c of commits) {
  const hash = c.split(' ')[0];
  try {
    const text = execSync(`git show ${hash}:index.html`).toString();
    const hasCard = text.includes('arvr-vg-card');
    const hasPanel = text.includes('voice-guide-panel');
    const hasFab = text.includes('voice-guide-fab') || text.includes('btn-voice-guide');
    const hasStateVg = text.includes('state-vg');
    console.log(`Commit ${c.substring(0, 30)}: arvr-vg-card=${hasCard}, voice-guide-panel=${hasPanel}, fab=${hasFab}, state-vg=${hasStateVg}`);
  } catch (e) {
    console.log(`Error checking commit ${hash}:`, e.message);
  }
}

