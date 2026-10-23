import sys
sys.stdout.reconfigure(encoding='utf-8')

with open('build_all_models.py', 'r', encoding='utf-8', errors='ignore') as f:
    lines = f.readlines()

for i in range(1730, 1785):
    print(f"{i+1}: {lines[i].rstrip()}")
