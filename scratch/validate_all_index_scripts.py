import subprocess
import sys, re
sys.stdout.reconfigure(encoding='utf-8')

with open('index.html', 'r', encoding='utf-8', errors='ignore') as f:
    content = f.read()

# Find all script tags
scripts = list(re.finditer(r'<script([^>]*)>(.*?)</script>', content, re.DOTALL))
print(f"Total script tags in index.html: {len(scripts)}")

errors = 0
for idx, match in enumerate(scripts):
    attrs = match.group(1)
    body = match.group(2).strip()
    
    if 'src=' in attrs or 'type="importmap"' in attrs or not body:
        continue
    
    with open('scratch/temp_check_script.js', 'w', encoding='utf-8') as f:
        f.write(body)
    
    res = subprocess.run(['node', '--check', 'scratch/temp_check_script.js'], capture_output=True, text=True, encoding='utf-8')
    if res.returncode != 0:
        print(f"[ERROR] Script #{idx+1} failed node check:\n{res.stderr[:300]}")
        errors += 1
    else:
        print(f"[OK] Script #{idx+1} (length {len(body)} chars) passed syntax check.")

if errors == 0:
    print("\nALL INLINE SCRIPTS IN index.html ARE 100% SYNTACTICALLY VALID!")
else:
    print(f"\nFound {errors} syntax error(s) in index.html scripts.")
