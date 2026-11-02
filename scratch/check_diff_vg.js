const { execSync } = require('child_process');

// Search for any commit where Voice Guide HTML or floating widget or panel was defined
try {
  const diff = execSync('git diff 901b4c6..HEAD -- "*.html"').toString();
  console.log('Diff size:', diff.length);
} catch (e) {
  console.error(e);
}

