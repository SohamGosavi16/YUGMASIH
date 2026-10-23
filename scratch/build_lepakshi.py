import os
import re

workspace_dir = r"c:\Users\LENOVO\Downloads\new sih-20260903T160606Z-1-001\new sih"

# Extract existing voice guide from lepakshi_temple_3d.html
with open(os.path.join(workspace_dir, "lepakshi_temple_3d.html"), "r", encoding="utf-8") as f:
    orig_content = f.read()

# Extract vg-master-styles
style_match = re.search(r'(<style id="vg-master-styles">.*?</style>)', orig_content, re.DOTALL)
if not style_match:
    raise Exception("Could not find vg-master-styles")
vg_styles = style_match.group(1)

# Extract vg body elements and script
body_match = re.search(r'(<!-- ══ VOICE GUIDE TRIGGER.*)', orig_content, re.DOTALL)
if not body_match:
    raise Exception("Could not find voice guide trigger")
vg_body = body_match.group(1)

print(f"Extracted vg_styles ({len(vg_styles)} bytes) and vg_body ({len(vg_body)} bytes)")
