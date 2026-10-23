import sys
sys.stdout.reconfigure(encoding='utf-8')

with open('build_all_models.py', 'r', encoding='utf-8', errors='ignore') as f:
    lines = f.readlines()

print(f"Total lines in build_all_models.py: {len(lines)}")

for i, l in enumerate(lines):
    if 'def generate_standalone_html' in l:
        print(f"Found generate_standalone_html at line {i+1}:")
        for j in range(i, min(len(lines), i + 40)):
            print(f"  {j+1}: {lines[j].rstrip()[:100]}")
        break
