import sys
sys.stdout.reconfigure(encoding='utf-8')

with open('index.html', 'r', encoding='utf-8', errors='ignore') as f:
    lines = f.readlines()

for i, l in enumerate(lines):
    if 'id="yugma-auth"' in l:
        print(f"Line {i+1}: {l.rstrip()}")
        for j in range(max(0, i-3), min(len(lines), i+8)):
            print(f"   {j+1}: {lines[j].rstrip()}")
        break
