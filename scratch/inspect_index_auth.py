import sys
sys.stdout.reconfigure(encoding='utf-8')

with open('index.html', 'r', encoding='utf-8', errors='ignore') as f:
    lines = f.readlines()

print(f"Total lines in index.html: {len(lines)}")

# Look for auth overlay / section and auth scripts around line 7000 to end
for i in range(len(lines)):
    line = lines[i]
    if 'id="yugma-auth"' in line or 'class="yugma-auth' in line or 'yugma-auth' in line:
        print(f"Auth HTML element at line {i+1}: {line.strip()[:100]}")
    if 'function showAuthModal' in line or 'function restoreSession' in line or 'function closeAuthModal' in line or 'function checkAuth' in line or 'window.addEventListener' in line and i > 7500:
        print(f"Auth function at line {i+1}: {line.strip()[:100]}")
