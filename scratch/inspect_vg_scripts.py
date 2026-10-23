import sys
sys.stdout.reconfigure(encoding='utf-8')

with open('scratch/lepakshi_vg_body.html', 'r', encoding='utf-8') as f:
    body = f.read()

# Find all script tags
import re
scripts = re.findall(r'<script.*?>.*?</script>', body, re.DOTALL)
print(f"Number of script tags in lepakshi_vg_body.html: {len(scripts)}")
for i, s in enumerate(scripts):
    print(f"\n--- Script {i+1} (length {len(s)} chars) ---")
    lines = s.split('\n')
    print("First 20 lines:")
    for l in lines[:20]:
        print(" ", l[:100])
    print("...")
    print("Last 20 lines:")
    for l in lines[-20:]:
        print(" ", l[:100])
