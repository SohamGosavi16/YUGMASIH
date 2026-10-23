import sys
sys.stdout.reconfigure(encoding='utf-8')

with open('index.html', 'r', encoding='utf-8', errors='ignore') as f:
    lines = f.readlines()

for idx in [2360, 2815, 2910, 3290, 3645]:
    start = max(0, idx - 5)
    end = min(len(lines), idx + 25)
    print(f"\n--- Lines {start+1} to {end} ---")
    for j in range(start, end):
        print(f"{j+1}: {lines[j].rstrip()}")
