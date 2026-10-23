import os
import re
import shutil
import subprocess

workspace_dir = r"c:\Users\LENOVO\Downloads\new sih-20260903T160606Z-1-001\new sih"

# 1. Back up files
files_to_backup = [
    "build_all_models.py",
    "lepakshi_temple_3d.html",
    "lepakshi_3d.html",
    "models_hub.html",
    "all_3d_models.html"
]

for fname in files_to_backup:
    p = os.path.join(workspace_dir, fname)
    bp = os.path.join(workspace_dir, "scratch", fname + ".bak")
    if os.path.exists(p) and not os.path.exists(bp):
        shutil.copyfile(p, bp)
        print(f"Backed up {fname} to scratch/{fname}.bak")

# 2. Extract voice guide from current lepakshi_temple_3d.html
with open(os.path.join(workspace_dir, "lepakshi_temple_3d.html"), "r", encoding="utf-8") as f:
    orig_lepakshi = f.read()

style_match = re.search(r'(<style id="vg-master-styles">.*?</style>)', orig_lepakshi, re.DOTALL)
if not style_match:
    raise Exception("Could not find vg-master-styles")
lepakshi_vg_styles = style_match.group(1)

body_match = re.search(r'(<!-- ══ VOICE GUIDE TRIGGER.*)', orig_lepakshi, re.DOTALL)
if not body_match:
    raise Exception("Could not find voice guide trigger")
lepakshi_vg_body = body_match.group(1)

# Save voice guide assets to scratch for safety
with open(os.path.join(workspace_dir, "scratch", "lepakshi_vg_styles.html"), "w", encoding="utf-8") as f:
    f.write(lepakshi_vg_styles)
with open(os.path.join(workspace_dir, "scratch", "lepakshi_vg_body.html"), "w", encoding="utf-8") as f:
    f.write(lepakshi_vg_body)

print("[OK] Successfully extracted and saved Lepakshi voice guide assets")

# 3. Update build_all_models.py
build_script_path = os.path.join(workspace_dir, "build_all_models.py")
with open(build_script_path, "r", encoding="utf-8") as f:
    build_script = f.read()

lepakshi_sketchfab_entry = '''    {
        "id": "lepakshi_temple",
        "whom_made": "Lord Veerabhadra (Shiva) (Commissioned by Virupanna & Viranna)",
        "picked_from": "Lepakshi, Sri Sathya Sai District, Andhra Pradesh",
        "filename": "lepakshi_temple_3d.html",
        "alias_filename": "lepakshi_3d.html",
        "backup_filename": "lepakshi_temple_procedural_backup.html",
        "uid": "e9e1e5ebbd61447dacee4949a5b60eeb",
        "title": "Lepakshi Veerabhadra Temple",
        "hindi_title": "లేపాక్షి వీరభద్ర దేవాలయం",
        "state": "ANDHRA PRADESH",
        "region": "South",
        "location": "LEPAKSHI · 16th CENTURY CE (VIJAYANAGARA EMPIRE)",
        "subtitle": "Vijayanagara Architectural Wonder of Hanging Pillar & Monolithic Basavanna",
        "desc": "Built in 1530 CE by royal treasurers Virupanna and Viranna under Vijayanagara Emperor Achyuta Deva Raya. Globally celebrated for its gravity-defying hanging pillar, colossal monolithic Basavanna Nandi, seven-hooded Nagalinga, and vibrant Puranic frescoes.",
        "creator": "pruthweeshasa",
        "sketchfab_url": "https://sketchfab.com/3d-models/dravidian-style-hindu-temple-e9e1e5ebbd61447dacee4949a5b60eeb",
        "shortlink": "https://sketchfab.com/3d-models/dravidian-style-hindu-temple-e9e1e5ebbd61447dacee4949a5b60eeb",
        "thumb": "https://media.sketchfab.com/models/e9e1e5ebbd61447dacee4949a5b60eeb/thumbnails/01ec1364007742feb32edafaa567d3af/481c778d95e247d7ac886e1e522b8128.jpeg",
        "spec_polys": "Dravidian 3D",
        "spec_verts": "Granite Pillars",
        "spec_tex": "Vijayanagara PBR",
        "era": "1530 CE (16th Century)",
        "badge": "Hanging Pillar & Monolithic Nandi",
        "views": [
            {"id": "view-facade", "icon": "fa-monument", "label": "Main Gopuram", "toast": "Front Entrance Gopuram", "pos": [0, -110, 45], "target": [0, 0, 20]},
            {"id": "view-pillar", "icon": "fa-archway", "label": "Hanging Pillar", "toast": "Gravity-Defying Hanging Pillar", "pos": [25, -45, 18], "target": [0, 0, 15]},
            {"id": "view-nandi", "icon": "fa-shield-dog", "label": "Monolithic Nandi", "toast": "Colossal Monolithic Basavanna Nandi", "pos": [-40, -60, 25], "target": [0, 0, 15]},
            {"id": "view-nagalinga", "icon": "fa-om", "label": "Nagalinga", "toast": "Seven-Hooded Serpent Shiva Linga", "pos": [45, -30, 20], "target": [0, 0, 15]},
            {"id": "view-reset", "icon": "fa-arrows-rotate", "label": "Reset 360°", "toast": "Camera Reset"}
        ],
        "audio_name": "Vijayanagara Temple Resonance",
        "drone_freqs": [123.47, 185.00, 246.94, 370.00],
        "info_sections": [
            {"icon": "fa-archway", "title": "Gravity-Defying Hanging Pillar", "text": "Among the 70 carved granite pillars in the Mukha Mandapa, one famous central pillar does not touch the ground. A thin cloth or paper can be slid completely underneath from one side to the other without obstruction."},
            {"icon": "fa-shield-dog", "title": "Colossal Monolithic Basavanna (Nandi)", "text": "Located 200 meters from the temple complex, this 4.5-meter high and 8.2-meter long monolithic Nandi is carved from a single massive granite boulder, renowned as one of India's largest monolithic bull sculptures."},
            {"icon": "fa-palette", "title": "Vibrant Ceiling Murals of Vijayanagara", "text": "The ceilings of the Ardha Mandapa display breathtaking 16th-century fresco paintings using organic mineral pigments depicting 14 avatars of Lord Shiva, the Kiratarjuniya epic, and courtly ceremonies."},
            {"icon": "fa-cube", "title": "Monument Provenance & 3D Heritage Credits", "text": "This interactive 3D digital model showcases the living architectural heritage of <strong>Lepakshi Veerabhadra Temple</strong>, located in <strong>Lepakshi, Sri Sathya Sai District, Andhra Pradesh</strong> and built for <strong>Lord Veerabhadra (Shiva) (Commissioned by Virupanna & Viranna)</strong>. 3D Heritage Model: <em>Dravidian Style Hindu Temple</em> created by <strong>pruthweeshasa</strong> on Sketchfab."}
        ]
    },
'''

# 3a. Insert lepakshi_sketchfab_entry before the end of sketchfab_monuments
# sketchfab_monuments ends before '# ── 2. THREE.JS PROCEDURAL/WEBXR MONUMENTS IN PROJECT'
build_script = build_script.replace(
    '# ── 2. THREE.JS PROCEDURAL/WEBXR MONUMENTS IN PROJECT',
    lepakshi_sketchfab_entry + '# ── 2. THREE.JS PROCEDURAL/WEBXR MONUMENTS IN PROJECT'
)

# 3b. Remove lepakshi_temple from threejs_monuments
# The pattern for lepakshi in threejs_monuments:
lepakshi_threejs_pattern = re.compile(
    r'threejs_monuments\s*=\s*\[\s*\{\s*"id":\s*"lepakshi_temple",.*?\},\s*\{',
    re.DOTALL
)
build_script = lepakshi_threejs_pattern.sub('threejs_monuments = [\n    {', build_script)

# 3c. Update the section where standalone files are written so it preserves voice guides
old_build_section = '''# ── 4. BUILD ALL STANDALONE 3D FILES ──────────────────────────────────────
print("Building all 13 standalone Sketchfab models...")
for m in sketchfab_monuments:
    html = generate_standalone_html(m)
    p1 = os.path.join(workspace_dir, m["filename"])
    with open(p1, "w", encoding="utf-8") as f:
        f.write(html)
    
    if m.get("alias_filename"):
        p2 = os.path.join(workspace_dir, m["alias_filename"])
        with open(p2, "w", encoding="utf-8") as f:
            f.write(html)
    print(f" [OK] Built {m['filename']} (UID: {m['uid']})")'''

new_build_section = '''# ── 4. BUILD ALL STANDALONE 3D FILES ──────────────────────────────────────
print(f"Building all {len(sketchfab_monuments)} standalone Sketchfab models...")
for m in sketchfab_monuments:
    p1 = os.path.join(workspace_dir, m["filename"])
    existing_vg_styles = None
    existing_vg_body = None
    
    # Check if voice guide exists in file or alias
    check_paths = [p1]
    if m.get("alias_filename"):
        check_paths.append(os.path.join(workspace_dir, m["alias_filename"]))
    if m.get("backup_filename"):
        check_paths.append(os.path.join(workspace_dir, m["backup_filename"]))
        
    for cp in check_paths:
        if os.path.exists(cp):
            try:
                with open(cp, "r", encoding="utf-8") as ef:
                    c = ef.read()
                sm = re.search(r'(<style id="vg-master-styles">.*?</style>)', c, re.DOTALL)
                bm = re.search(r'(<!-- ══ VOICE GUIDE TRIGGER.*)', c, re.DOTALL)
                if sm and bm:
                    existing_vg_styles = sm.group(1)
                    existing_vg_body = bm.group(1)
                    break
            except Exception:
                pass

    html = generate_standalone_html(m)
    
    # Inject voice guide if present
    if existing_vg_styles and existing_vg_body:
        html = html.replace('</head>', f'{existing_vg_styles}\\n</head>')
        html = re.sub(r'</body>\\s*</html>\\s*$', lambda _: existing_vg_body, html)

    with open(p1, "w", encoding="utf-8") as f:
        f.write(html)
    
    if m.get("alias_filename"):
        p2 = os.path.join(workspace_dir, m["alias_filename"])
        with open(p2, "w", encoding="utf-8") as f:
            f.write(html)
    print(f" [OK] Built {m['filename']} (UID: {m['uid']})")'''

if old_build_section in build_script:
    build_script = build_script.replace(old_build_section, new_build_section)
    print("[OK] Patched standalone builder to preserve voice guides")
else:
    print("[WARN] Could not find exact old_build_section, checking alternative replace")

with open(build_script_path, "w", encoding="utf-8") as f:
    f.write(build_script)

print("[OK] Updated build_all_models.py successfully")
