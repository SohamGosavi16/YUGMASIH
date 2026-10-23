import sys
sys.stdout.reconfigure(encoding='utf-8')

with open('index.html', 'r', encoding='utf-8', errors='ignore') as f:
    lines = f.readlines()

for i, l in enumerate(lines):
    if 'tradIframe.src' in l or 'धर्मपाल' in l:
        print(f"Line {i+1}: {l.rstrip()}")
        for j in range(max(0, i-4), min(len(lines), i+6)):
            print(f"  {j+1}: {lines[j].rstrip()[:120]}")
        print("---")
