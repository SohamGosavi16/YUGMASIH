import glob
import re

files = sorted(glob.glob('*.html'))
print(f"Total HTML files: {len(files)}")

non_monuments = {'auth.html', 'index.html', 'india_3d_map.html', 'models_hub.html', 'all_3d_models.html'}
monuments = []

for f in files:
    if f in non_monuments:
        continue
    with open(f, 'r', encoding='utf-8', errors='ignore') as fp:
        c = fp.read()
    has_vg = 'voice-guide-panel' in c or 'VG_SCRIPTS' in c
    has_sketchfab = 'sketchfab' in c.lower() or 'sketchfab-viewer' in c
    has_three = 'three.js' in c.lower() or 'three.min.js' in c
    title_m = re.search(r'<title>(.*?)</title>', c, re.IGNORECASE)
    title = title_m.group(1).strip() if title_m else f
    monuments.append((f, has_vg, has_sketchfab, has_three, title))

print(f"{'Filename':40} | {'VoiceGuide':10} | {'Title'}")
print("-" * 80)
for f, vg, sk, th, t in monuments:
    print(f"{f:40} | {str(vg):10} | {t[:40]}")
