import sys
sys.stdout.reconfigure(encoding='utf-8')

with open('scratch/lepakshi_vg_body.html', 'r', encoding='utf-8') as f:
    body = f.read()

idx = body.find('var VG_SCRIPTS = {')
print(body[idx:idx+1200])
