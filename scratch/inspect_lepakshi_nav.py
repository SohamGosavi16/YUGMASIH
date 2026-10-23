import sys
sys.stdout.reconfigure(encoding='utf-8')

with open('lepakshi_temple_3d.html', 'r', encoding='utf-8', errors='ignore') as f:
    lines = f.readlines()

for i, l in enumerate(lines[:100]):
    if 'btn-nav-voice-guide' in l or 'top-nav' in l or 'nav-right' in l:
        print(f"Line {i+1}: {l.strip()[:100]}")
        # print surrounding 5 lines
        for j in range(max(0, i-2), min(len(lines), i+5)):
            print(f"   {j+1}: {lines[j].rstrip()}")
        break
