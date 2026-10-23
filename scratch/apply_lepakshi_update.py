import os
import re
import shutil

workspace_dir = r"c:\Users\LENOVO\Downloads\new sih-20260903T160606Z-1-001\new sih"

# 1. Back up lepakshi_temple_3d.html
src_file = os.path.join(workspace_dir, "lepakshi_temple_3d.html")
backup_file = os.path.join(workspace_dir, "lepakshi_temple_3d_procedural_backup.html")
if not os.path.exists(backup_file):
    shutil.copyfile(src_file, backup_file)
    print(f"[OK] Backed up original procedural file to {backup_file}")

# 2. Read orig lepakshi_temple_3d.html to extract the voice guide styles and engine
with open(src_file, "r", encoding="utf-8") as f:
    orig_html = f.read()

style_match = re.search(r'(<style id="vg-master-styles">.*?</style>)', orig_html, re.DOTALL)
if not style_match:
    raise Exception("Could not find vg-master-styles in original lepakshi file")
vg_styles = style_match.group(1)

vg_body_match = re.search(r'(<!-- ══ VOICE GUIDE TRIGGER.*)', orig_html, re.DOTALL)
if not vg_body_match:
    raise Exception("Could not find voice guide trigger in original lepakshi file")
vg_body = vg_body_match.group(1)

# 3. Read brihadisvara_3d.html to extract the exact standalone HTML skeleton
with open(os.path.join(workspace_dir, "brihadisvara_3d.html"), "r", encoding="utf-8") as f:
    brihad_html = f.read()

# Let's verify brihadisvara structure
# Split brihad_html to get the template before vg-master-styles and the body before vg trigger
head_part = brihad_html.split('<style id="vg-master-styles">')[0]
# From head_part to </head><body>... up to <!-- ══ VOICE GUIDE TRIGGER
body_part = brihad_html.split('</style>\n</head>')[1].split('<!-- ══ VOICE GUIDE TRIGGER')[0]

print(f"[OK] Read Brihadisvara template components successfully")
