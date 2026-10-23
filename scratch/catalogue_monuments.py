import sys, os
sys.path.insert(0, os.path.abspath('.'))
import build_all_models
from scratch import build_six_monuments

all_monuments = {}

for m in build_all_models.sketchfab_monuments:
    all_monuments[m['id']] = {
        'id': m['id'],
        'title': m['title'],
        'location': m.get('location', ''),
        'era': m.get('era', ''),
        'desc': m.get('desc', ''),
        'whom_made': m.get('whom_made', ''),
        'picked_from': m.get('picked_from', ''),
        'filename': m.get('filename', ''),
        'alias': m.get('alias_filename', ''),
        'info_sections': m.get('info_sections', [])
    }

for m in build_six_monuments.MONUMENT_DEFINITIONS:
    if m['id'] not in all_monuments:
        all_monuments[m['id']] = {
            'id': m['id'],
            'title': m['title'],
            'location': m.get('picked_from', ''),
            'era': m.get('era', ''),
            'desc': m.get('title', ''),
            'whom_made': m.get('whom_made', ''),
            'picked_from': m.get('picked_from', ''),
            'filename': m.get('file', ''),
            'alias': m.get('alias', ''),
            'info_sections': []
        }

print(f"Total monuments catalogued: {len(all_monuments)}")
for k, v in all_monuments.items():
    print(f"- {k:20}: {v['title']:35} | {v['filename']}")
