import sys, re
sys.stdout.reconfigure(encoding='utf-8')

with open('scratch/vg_engine_suffix.txt', 'r', encoding='utf-8') as f:
    suffix = f.read()

matches = [m.start() for m in re.finditer(r'VG_SCRIPTS', suffix)]
print(f"Found {len(matches)} occurrences of VG_SCRIPTS in suffix:")
for m in matches:
    print("---")
    print(suffix[max(0, m-20):min(len(suffix), m+100)])
