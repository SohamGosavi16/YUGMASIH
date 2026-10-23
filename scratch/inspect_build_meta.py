import sys
sys.stdout.reconfigure(encoding='utf-8')

with open('build_all_models.py', 'r', encoding='utf-8', errors='ignore') as f:
    lines = f.readlines()

for i in range(680, 700):
    print(f"{i+1}: {lines[i].rstrip()[:100]}")

for i in range(700, 1100):
    if 'href="index.html"' in lines[i] or "href='index.html'" in lines[i]:
        print(f"Index link at line {i+1}: {lines[i].rstrip()[:100]}")
