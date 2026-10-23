import sys
sys.stdout.reconfigure(encoding='utf-8')

with open('build_all_models.py', 'r', encoding='utf-8', errors='ignore') as f:
    lines = f.readlines()

for i in range(1200, min(len(lines), 1350)):
    if 'return html' in lines[i] or lines[i].startswith('def '):
        print(f"Line {i+1}: {lines[i].rstrip()}")
        for j in range(max(1200, i-5), min(len(lines), i+8)):
            print(f"  {j+1}: {lines[j].rstrip()[:100]}")
        break
