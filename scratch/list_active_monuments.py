import glob, os, re

files = sorted(glob.glob('*.html'))
non_monuments = {'auth.html', 'index.html', 'india_3d_map.html', 'models_hub.html', 'all_3d_models.html'}

monuments = {}
for f in files:
    if f in non_monuments:
        continue
    # skip backup files
    if '_backup' in f or '.bak' in f:
        continue
    with open(f, 'r', encoding='utf-8', errors='ignore') as fp:
        c = fp.read()
    title_m = re.search(r'<title>(.*?)</title>', c, re.IGNORECASE)
    title = title_m.group(1).strip() if title_m else f
    # clean title
    title = title.split('?')[0].split('|')[0].strip()
    uid_m = re.search(r'client\.init\([\'"]([a-zA-Z0-9_\-]+)[\'"]', c) or re.search(r'sketchfab\.com/models/([a-zA-Z0-9_\-]+)', c)
    uid = uid_m.group(1) if uid_m else 'N/A'
    has_vg = 'voice-guide-panel' in c or 'VG_SCRIPTS' in c
    monuments[f] = {'title': title, 'uid': uid, 'has_vg': has_vg}

print(f"Total Active Monument HTML Files: {len(monuments)}")
for f, info in sorted(monuments.items()):
    print(f"{f:32} | VG:{str(info['has_vg']):5} | UID: {info['uid']:32} | {info['title']}")
