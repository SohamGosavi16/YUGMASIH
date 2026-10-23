import glob
import os

files = sorted(glob.glob('*.html'))
print(f'Total HTML files: {len(files)}')

with_vg = []
without_vg = []

for f in files:
    with open(f, 'r', encoding='utf-8', errors='ignore') as fp:
        content = fp.read()
        has_panel = 'voice-guide-panel' in content
        has_engine = 'VG_SCRIPTS' in content or 'bulletproof' in content.lower()
        has_nav_btn = 'btn-nav-voice-guide' in content
        has_meta = 'name="referrer"' in content or "name='referrer'" in content
        
        if has_panel or has_engine:
            with_vg.append((f, has_panel, has_engine, has_nav_btn, has_meta))
        else:
            without_vg.append(f)

print(f'\n=== FILES WITH VOICE GUIDE ({len(with_vg)}) ===')
for f, p, e, nb, m in with_vg:
    print(f'  {f:40} | panel:{str(p):5} | engine:{str(e):5} | nav_btn:{str(nb):5} | meta:{str(m):5}')

print(f'\n=== FILES WITHOUT VOICE GUIDE ({len(without_vg)}) ===')
for f in without_vg:
    print(f'  {f}')
