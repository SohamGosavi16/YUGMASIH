import sys
sys.stdout.reconfigure(encoding='utf-8')

with open('build_all_models.py', 'r', encoding='utf-8', errors='ignore') as f:
    lines = f.readlines()

for i, l in enumerate(lines):
    if l.startswith('def '):
        print(f"Line {i+1}: {l.strip()}")
