import os
import re
import subprocess
import tempfile

workspace_dir = r"c:\Users\LENOVO\Downloads\new sih-20260903T160606Z-1-001\new sih"

files_to_check = [
    "statue_of_unity_3d.html",
    "victoria_memorial_3d.html",
    "lepakshi_temple_3d.html",
    "jageshwar_3d.html",
    "neermahal_3d.html",
    "india_3d_map.html"
]

for fn in files_to_check:
    fp = os.path.join(workspace_dir, fn)
    with open(fp, 'r', encoding='utf-8') as f:
        content = f.read()

    # Extract all inline scripts
    scripts = re.findall(r'<script(?![^>]*src=)[^>]*>(.*?)</script>', content, re.DOTALL)
    print(f"Checking {fn}: found {len(scripts)} inline script blocks")
    for i, s in enumerate(scripts):
        if not s.strip():
            continue
        with tempfile.NamedTemporaryFile(suffix='.js', delete=False, mode='w', encoding='utf-8') as tf:
            tf.write(s)
            tf_name = tf.name
        res = subprocess.run(['node', '-c', tf_name], capture_output=True, text=True)
        os.remove(tf_name)
        if res.returncode != 0:
            print(f"  [ERROR] Script #{i+1} in {fn} failed syntax check:\n{res.stderr[:300]}")
        else:
            print(f"  [OK] Script #{i+1} passed syntax check")

print("\nAll syntax checks complete!")
