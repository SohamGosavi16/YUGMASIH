import sys
sys.stdout.reconfigure(encoding='utf-8')

with open('index.html', 'r', encoding='utf-8', errors='ignore') as f:
    lines = f.readlines()

print("Lines 1 to 50 of index.html:")
for i in range(min(50, len(lines))):
    print(f"{i+1}: {lines[i].rstrip()}")
