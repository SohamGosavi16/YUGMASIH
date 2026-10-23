import sys
sys.stdout.reconfigure(encoding='utf-8')

with open('scratch/lepakshi_vg_body.html', 'r', encoding='utf-8') as f:
    body = f.read()

# Let's find where VG_SCRIPTS ends
idx = body.find('var VG_SCRIPTS')
idx2 = body.find('var currentLang', idx)
print(f"Code from 'var currentLang' onward (length {len(body) - idx2}):")
print(body[idx2:idx2+2500])
