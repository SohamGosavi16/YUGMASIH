import sys
sys.stdout.reconfigure(encoding='utf-8')

with open('build_all_models.py', 'r', encoding='utf-8', errors='ignore') as f:
    lines = f.readlines()

for i in range(2500, len(lines)):
    if "'''" in lines[i]:
        print(f"Line {i+1}: {lines[i].rstrip()}")
