import sys
sys.stdout.reconfigure(encoding='utf-8')

with open('build_all_models.py', 'r', encoding='utf-8', errors='ignore') as f:
    for idx, line in enumerate(f):
        if 'index.html' in line:
            print(f"Line {idx+1}: {line.strip()[:100]}")
