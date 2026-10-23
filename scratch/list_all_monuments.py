import sys, os
sys.path.insert(0, os.path.abspath('.'))
import build_all_models

print("=== SKETCHFAB MONUMENTS IN build_all_models.py ===")
for m in build_all_models.sketchfab_monuments:
    print(f"ID: {m['id']:20} | Title: {m['title']:30} | File: {m['filename']:25} | Alias: {m.get('alias_filename', '')}")
