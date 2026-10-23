import sys
sys.stdout.reconfigure(encoding='utf-8')

with open('build_all_models.py', 'r', encoding='utf-8', errors='ignore') as f:
    lines = f.readlines()

for i in range(1200, 2540):
    if '</body>' in lines[i]:
        print(f"Line {i+1}: {lines[i].rstrip()}")
        for j in range(max(0, i-5), min(len(lines), i+5)):
            print(f"  {j+1}: {lines[j].rstrip()[:100]}")
