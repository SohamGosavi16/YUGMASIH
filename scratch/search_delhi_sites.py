import sys
sys.stdout.reconfigure(encoding='utf-8')

with open('index.html', 'r', encoding='utf-8', errors='ignore') as f:
    for idx, line in enumerate(f):
        if 'delhi' in line.lower() and ('heritage' in line.lower() or 'qutub' in line.lower() or 'sites' in line.lower()):
            print(f"Line {idx+1}: {line.strip()[:100]}")
