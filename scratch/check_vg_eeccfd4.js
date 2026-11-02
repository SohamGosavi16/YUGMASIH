const { execSync } = require('child_process');

try {
  const res = execSync('git grep -l "Voice Guide" eeccfd4', { maxBuffer: 50 * 1024 * 1024 }).toString();
  console.log('Files with Voice Guide in eeccfd4:\n', res);
} catch (e) {
  console.error(e);
}

