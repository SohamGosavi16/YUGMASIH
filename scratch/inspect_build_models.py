import sys, os
sys.path.insert(0, os.path.abspath('.'))
import build_all_models

print("Number of monuments in build_all_models:", len(build_all_models.sketchfab_monuments))
for m in build_all_models.sketchfab_monuments:
    print(f"- {m['id']}: {m['title']} | file: {m['filename']} | alias: {m.get('alias_filename')} | location: {m.get('location')}")
