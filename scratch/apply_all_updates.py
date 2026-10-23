# -*- coding: utf-8 -*-
import os
import re
import shutil
import subprocess

workspace_dir = r"c:\Users\LENOVO\Downloads\new sih-20260903T160606Z-1-001\new sih"
build_py_path = os.path.join(workspace_dir, "build_all_models.py")

with open(build_py_path, "r", encoding="utf-8") as f:
    content = f.read()

# Backup build_all_models.py
shutil.copyfile(build_py_path, os.path.join(workspace_dir, "scratch", "build_all_models.py.bak2"))
print("Backed up build_all_models.py to scratch/build_all_models.py.bak2")

# 1. Update Victoria Memorial entry in content
old_vm_pattern = re.compile(
    r'\{\s*"id":\s*"victoria_memorial",.*?\}\s*,\s*(?=\{\s*"id":\s*"brihadisvara")',
    re.DOTALL
)

new_vm_entry = '''{
        "id": "victoria_memorial",
        "whom_made": "Queen Victoria, Empress of India (Commissioned by Lord Curzon)",
        "picked_from": "Kolkata, West Bengal (Kolkata Maidan)",
        "filename": "victoriamemorial-vr.html",
        "alias_filename": "victoria_memorial_3d.html",
        "backup_filename": "victoriamemorial-vr_backup.html",
        "uid": "1b3ec6a1a07949d08221f718fd1919d4",
        "title": "Victoria Memorial",
        "hindi_title": "ভিক্টোরিয়া মেমোরিয়াল",
        "state": "WEST BENGAL",
        "region": "East",
        "location": "KOLKATA · 1906–1921 CE (LORD CURZON & WILLIAM EMERSON)",
        "subtitle": "Makrana Marble Indo-Saracenic Monument & Cultural Epicenter",
        "desc": "Dominating the Kolkata Maidan, this grand white marble monument blends British, Mughal, Venetian, and Egyptian architectural influences. Crowned by a 16-foot rotating bronze Angel of Victory and surrounded by 64 acres of manicured gardens.",
        "creator": "rd5471940",
        "sketchfab_url": "https://sketchfab.com/3d-models/victoria-memorial-kolkata-1b3ec6a1a07949d08221f718fd1919d4",
        "shortlink": "https://sketchfab.com/3d-models/victoria-memorial-kolkata-1b3ec6a1a07949d08221f718fd1919d4",
        "thumb": "https://media.sketchfab.com/models/1b3ec6a1a07949d08221f718fd1919d4/thumbnails/66c5ae5978394509b7af1c5314b94e03/694cac71125248fea49b1d690ed192fb.jpeg",
        "spec_polys": "Makrana 3D",
        "spec_verts": "Classical Columns",
        "spec_tex": "Marble PBR",
        "era": "1906–1921 CE",
        "badge": "Makrana Marble Monument",
        "views": [
            {"id": "view-facade", "icon": "fa-landmark", "label": "Grand Facade", "toast": "South Grand Facade Colonnade", "pos": [0, -120, 45], "target": [0, 0, 20]},
            {"id": "view-dome", "icon": "fa-archway", "label": "Main Dome", "toast": "Central Dome & Bronze Angel", "pos": [0, -60, 55], "target": [0, 0, 30]},
            {"id": "view-colonnade", "icon": "fa-columns", "label": "Colonnade", "toast": "Ionic Marble Porticos", "pos": [45, -70, 25], "target": [0, 0, 15]},
            {"id": "view-gardens", "icon": "fa-tree", "label": "Maidan Grounds", "toast": "Kolkata Maidan Garden Grounds", "pos": [-80, -100, 40], "target": [0, 0, 15]},
            {"id": "view-reset", "icon": "fa-arrows-rotate", "label": "Reset 360°", "toast": "Camera Reset"}
        ],
        "audio_name": "Calcutta Symphony Drone",
        "drone_freqs": [130.81, 196.00, 261.63, 329.63],
        "info_sections": [
            {"icon": "fa-gem", "title": "Makrana White Marble Quarry", "text": "Constructed with over 20,000 tonnes of pristine white marble transported across 1,500 km from the same Makrana quarries in Rajasthan that supplied the Taj Mahal three centuries earlier."},
            {"icon": "fa-wind", "title": "Rotating Bronze Angel of Victory", "text": "The central dome is topped by a 16-foot tall, three-tonne bronze figure of the Angel of Victory that rotates gracefully with the wind, acting as a functional weather vane."},
            {"icon": "fa-palette", "title": "Enormous Gallery of National Art", "text": "Houses 25 galleries containing rare oil paintings by Thomas and William Daniell, manuscript copies of Ain-i-Akbari, and extensive collections documenting the cultural history of the Bengal Renaissance."},
            {"icon": "fa-cube", "title": "Monument Provenance & 3D Heritage Credits", "text": "This interactive 3D digital model showcases the living architectural heritage of <strong>Victoria Memorial</strong>, located in <strong>Kolkata, West Bengal (Kolkata Maidan)</strong> and commissioned by <strong>Lord Curzon</strong> (designed by William Emerson). 3D Heritage Model: <em>victoria memorial kolkata</em> created by <strong>rd5471940</strong> on Sketchfab."}
        ]
    },
    '''

if old_vm_pattern.search(content):
    content = old_vm_pattern.sub(new_vm_entry, content)
    print("[OK] Replaced Victoria Memorial entry in content")
else:
    print("[WARN] Could not match old Victoria Memorial entry")

# 2. Add Statue of Unity entry right after Lepakshi in sketchfab_monuments
statue_of_unity_entry = '''    {
        "id": "statue_of_unity",
        "whom_made": "Sardar Vallabhbhai Patel ('Iron Man of India') (Govt. of Gujarat / India)",
        "picked_from": "Sadhu Bet, Kevadia, Narmada District, Gujarat",
        "filename": "statue_of_unity_3d.html",
        "alias_filename": "statue_of_unity.html",
        "backup_filename": "statue_of_unity_vr.html",
        "uid": "2221e03866f24817972a16f3ad17c168",
        "title": "Statue of Unity",
        "hindi_title": "સ્ટેચ્યુ ઓફ યુનિટી",
        "state": "GUJARAT",
        "region": "West",
        "location": "KEVADIA · 2013–2018 CE (PADMA BHUSHAN RAM V. SUTAR)",
        "subtitle": "World's Tallest Monument (182m) Dedicated to Sardar Vallabhbhai Patel",
        "desc": "Soaring 182 meters (597 feet) above the sacred Narmada River facing the Sardar Sarovar Dam, this colossal bronze-clad colossus honors Sardar Vallabhbhai Patel, the 'Iron Man of India' who unified 562 princely states into one sovereign nation. Sculpted by master artist Ram V. Sutar.",
        "creator": "arshad irfan",
        "sketchfab_url": "https://sketchfab.com/3d-models/statue-of-unity-2221e03866f24817972a16f3ad17c168",
        "shortlink": "https://sketchfab.com/3d-models/statue-of-unity-2221e03866f24817972a16f3ad17c168",
        "thumb": "https://media.sketchfab.com/models/2221e03866f24817972a16f3ad17c168/thumbnails/fc8cfb9bc06e4815a5d1fbfe29c43aa5/b1b0ae9f83c84516bf4b047c6b945325.jpeg",
        "spec_polys": "182m Height",
        "spec_verts": "Bronze Clad",
        "spec_tex": "Micro-Engineered",
        "era": "2013–2018 CE",
        "badge": "World's Tallest Colossus (182m)",
        "views": [
            {"id": "view-facade", "icon": "fa-monument", "label": "Full Colossus", "toast": "Colossal 182-Meter Frontal Stance", "pos": [0, -130, 60], "target": [0, 0, 40]},
            {"id": "view-head", "icon": "fa-user-tie", "label": "Sardar Portrait", "toast": "Sculpted Head & Traditional Attire", "pos": [0, -45, 120], "target": [0, 0, 110]},
            {"id": "view-base", "icon": "fa-shoe-prints", "label": "Lotus Plinth", "toast": "Two-Tiered Geometric Plinth & Bronze Sandals", "pos": [30, -50, 20], "target": [0, 0, 10]},
            {"id": "view-narmada", "icon": "fa-water", "label": "Narmada Vista", "toast": "Panoramic Narmada River & Dam View", "pos": [-80, -90, 70], "target": [0, 0, 30]},
            {"id": "view-reset", "icon": "fa-arrows-rotate", "label": "Reset 360°", "toast": "Camera Reset"}
        ],
        "audio_name": "Narmada Unity Resonance",
        "drone_freqs": [146.83, 220.00, 293.66, 440.00],
        "info_sections": [
            {"icon": "fa-ruler-vertical", "title": "182-Meter Record-Breaking Scale", "text": "Rising 182 meters (597 feet) — precisely matching the 182 constituencies of the Gujarat Legislative Assembly — it stands almost four times taller than the Statue of Liberty (from base to torch) and twice the height of the Spring Temple Buddha."},
            {"icon": "fa-shield-halved", "title": "Seismic & Wind-Resistant Structural Core", "text": "Engineered with twin reinforced concrete cores surrounded by a steel space frame, wrapped in 6,500 individual cast bronze panels (1,700 tonnes of bronze). Designed to withstand wind speeds of 180 km/h and Zone VI earthquakes."},
            {"icon": "fa-handshake", "title": "Loha Campaign & Farmers' Contribution", "text": "The iron for the statue's base was contributed by over 100 million farmers from 169,000 villages across India who donated their used agricultural iron tools, symbolizing national unification."},
            {"icon": "fa-cube", "title": "Monument Provenance & 3D Heritage Credits", "text": "This interactive 3D digital model showcases the living architectural heritage of <strong>Statue of Unity</strong>, located in <strong>Sadhu Bet, Kevadia, Narmada District, Gujarat</strong> and built for <strong>Sardar Vallabhbhai Patel ('Iron Man of India')</strong>. 3D Heritage Model: <em>Statue of Unity</em> created by <strong>arshad irfan</strong> on Sketchfab."}
        ]
    },
'''

# Check if statue_of_unity already in content
if '"id": "statue_of_unity"' not in content:
    # Insert before '# ── 2. THREE.JS PROCEDURAL/WEBXR MONUMENTS IN PROJECT'
    content = content.replace(
        '# ── 2. THREE.JS PROCEDURAL/WEBXR MONUMENTS IN PROJECT',
        statue_of_unity_entry + '# ── 2. THREE.JS PROCEDURAL/WEBXR MONUMENTS IN PROJECT'
    )
    print("[OK] Added Statue of Unity to sketchfab_monuments in build_all_models.py")
else:
    print("[INFO] statue_of_unity already exists in content")

# 3. Enhance standalone builder loop in build_all_models.py to inject voice guides for lepakshi, unity, victoria
old_loop_check = '''    if not (existing_vg_styles and existing_vg_body) and m.get("id") == "lepakshi_temple":
        vs_path = os.path.join(workspace_dir, "scratch", "lepakshi_vg_styles.html")
        vb_path = os.path.join(workspace_dir, "scratch", "lepakshi_vg_body.html")
        if os.path.exists(vs_path) and os.path.exists(vb_path):
            with open(vs_path, "r", encoding="utf-8") as vsf:
                existing_vg_styles = vsf.read()
            with open(vb_path, "r", encoding="utf-8") as vbf:
                existing_vg_body = vbf.read()'''

new_loop_check = '''    if not (existing_vg_styles and existing_vg_body):
        mid = m.get("id", "")
        vg_body_file = None
        if mid == "lepakshi_temple":
            vg_body_file = "lepakshi_vg_body.html"
        elif mid == "statue_of_unity":
            vg_body_file = "unity_vg_body.html"
        elif mid == "victoria_memorial":
            vg_body_file = "victoria_vg_body.html"

        if vg_body_file:
            vs_path = os.path.join(workspace_dir, "scratch", "lepakshi_vg_styles.html")
            vb_path = os.path.join(workspace_dir, "scratch", vg_body_file)
            if os.path.exists(vs_path) and os.path.exists(vb_path):
                with open(vs_path, "r", encoding="utf-8") as vsf:
                    existing_vg_styles = vsf.read()
                with open(vb_path, "r", encoding="utf-8") as vbf:
                    existing_vg_body = vbf.read()'''

if old_loop_check in content:
    content = content.replace(old_loop_check, new_loop_check)
    print("[OK] Enhanced voice guide injection in builder loop")
else:
    print("[WARN] old_loop_check not found directly, checking regex")

# Also ensure backup_filename alias is also written if present
old_alias_write = '''    if m.get("alias_filename"):
        p2 = os.path.join(workspace_dir, m["alias_filename"])
        with open(p2, "w", encoding="utf-8") as f:
            f.write(html)'''

new_alias_write = '''    aliases = []
    if m.get("alias_filename"):
        aliases.append(m["alias_filename"])
    if m.get("backup_filename"):
        aliases.append(m["backup_filename"])
    for af in aliases:
        p_alias = os.path.join(workspace_dir, af)
        with open(p_alias, "w", encoding="utf-8") as f:
            f.write(html)'''

if old_alias_write in content:
    content = content.replace(old_alias_write, new_alias_write)
    print("[OK] Enhanced alias writing in builder loop")

with open(build_py_path, "w", encoding="utf-8") as f:
    f.write(content)

print("[OK] Successfully updated build_all_models.py")
