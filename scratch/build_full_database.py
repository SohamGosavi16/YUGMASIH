# -*- coding: utf-8 -*-
"""
Master Builder: Build Consolidated 15-Language Database and Inject into all 69 Monument HTML Files + index.html
"""

import os
import re
import sys
import json

# Ensure stdout handles UTF-8 on Windows
if sys.stdout.encoding != 'utf-8':
    try:
        sys.stdout.reconfigure(encoding='utf-8')
    except Exception:
        pass

workspace_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
translations_dir = os.path.join(workspace_dir, "scratch", "translations")
sys.path.insert(0, translations_dir)
sys.path.insert(0, os.path.join(workspace_dir, "scratch"))

# Import all translation modules
import site_01_ajanta
import site_02_brihadisvara
import site_03_victoria
import site_04_lepakshi
import site_05_hampi
import site_06_amber
import site_07_rani_ki_vav
import site_08_mahabodhi
import site_09_lakshmana
import site_10_padmanabhaswamy
import site_11_konark
import site_12_bom_jesus
import site_13_raigad
import site_14_gateway
import site_15_unity
import site_16_sanchi
import site_17_lotus
import site_18_golden
import site_19_redfort
import site_20_qutub
import site_21_humayun
import site_22_tajmahal
import site_extra

import group_monuments

REQUIRED_LANGS = ['en', 'hi', 'ta', 'te', 'bn', 'mr', 'gu', 'kn', 'ml', 'pa', 'fr', 'es', 'de', 'ja', 'zh']

# Complete 27-Monument Mapping
MONUMENT_MAP = {
    "ajanta_caves": site_01_ajanta.DATA,
    "brihadisvara": site_02_brihadisvara.DATA,
    "victoria_memorial": site_03_victoria.DATA,
    "lepakshi_temple": site_04_lepakshi.DATA,
    "hampi_chariot": site_05_hampi.DATA,
    "amber_fort": site_06_amber.DATA,
    "rani_ki_vav": site_07_rani_ki_vav.DATA,
    "mahabodhi": site_08_mahabodhi.DATA,
    "lakshmana_temple": site_09_lakshmana.DATA,
    "padmanabhaswamy": site_10_padmanabhaswamy.DATA,
    "konark_sun": site_11_konark.DATA,
    "bom_jesus": site_12_bom_jesus.DATA,
    "rajgad_fort": site_13_raigad.DATA,
    "gateway_of_india": site_14_gateway.DATA,
    "statue_of_unity": site_15_unity.DATA,
    "sanchi_stupa": site_16_sanchi.DATA,
    "lotus_temple": site_17_lotus.DATA,
    "golden_temple": site_18_golden.DATA,
    "red_fort": site_19_redfort.DATA,
    "qutub_minar": site_20_qutub.DATA,
    "humayun_tomb": site_21_humayun.DATA,
    "taj_mahal": site_22_tajmahal.DATA,
    "rang_ghar": site_extra.DATA_EXTRA["rang_ghar"],
    "neermahal": site_extra.DATA_EXTRA["neermahal"],
    "jageshwar": site_extra.DATA_EXTRA["jageshwar"],
    "temple_gopuram": site_extra.DATA_EXTRA["temple_gopuram"],
    "red_fort_glory": site_extra.DATA_EXTRA["red_fort_glory"],
}

print(f"Loaded {len(MONUMENT_MAP)} monument dataset definitions.")

# Validate all monuments have all 15 languages
for mon_key, data in MONUMENT_MAP.items():
    missing = [l for l in REQUIRED_LANGS if not data.get(l)]
    if missing:
        print(f" [ERROR] Monument {mon_key} missing languages: {missing}")
        sys.exit(1)

print(" [OK] All 27 monuments contain valid strings for all 15 required languages!")

# 1. Save consolidated monument_scripts_data.json
json_path = os.path.join(workspace_dir, "scratch", "monument_scripts_data.json")
with open(json_path, 'w', encoding='utf-8') as f:
    json.dump(MONUMENT_MAP, f, ensure_ascii=False, indent=2)

print(f" [OK] Saved consolidated database to {json_path}")

# 2. Iterate across all 69 HTML files in the 27 groups
total_updated = 0
total_skipped = 0
updated_files = []

# Get grouped files
all_html_files = [f for f in os.listdir(workspace_dir) if f.endswith('.html')]
pattern_vg = re.compile(r'var VG_SCRIPTS\s*=\s*(\{.*?\});', re.DOTALL)

for mon_key, target_files in group_monuments.groups.items():
    data = MONUMENT_MAP.get(mon_key)
    if not data:
        print(f" [WARN] No data mapped for group {mon_key}")
        continue

    # Only keep the 15 language keys for the client-side VG_SCRIPTS
    vg_payload = {lang: data[lang] for lang in REQUIRED_LANGS}
    json_str = json.dumps(vg_payload, ensure_ascii=False)
    
    for filename in target_files:
        filepath = os.path.join(workspace_dir, filename)
        if not os.path.exists(filepath):
            continue
            
        with open(filepath, 'r', encoding='utf-8', errors='ignore') as f:
            content = f.read()
            
        m = pattern_vg.search(content)
        if m:
            new_content = content[:m.start(1)] + json_str + content[m.end(1):]
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(new_content)
            total_updated += 1
            updated_files.append(filename)
            print(f" [UPDATED] {filename:35} -> {mon_key} ({len(json_str)} chars)")
        else:
            print(f" [NO MATCH] {filename} does not contain var VG_SCRIPTS")
            total_skipped += 1

print(f"\n==================================================")
print(f"Total HTML files updated: {total_updated}")
print(f"Total files skipped/unmatched: {total_skipped}")
print(f"==================================================")

# 3. Update index.html ARVR_MONUMENT_SCRIPTS
index_path = os.path.join(workspace_dir, "index.html")
if os.path.exists(index_path):
    with open(index_path, 'r', encoding='utf-8', errors='ignore') as f:
        idx_content = f.read()
    
    # Extract ARVR_MONUMENT_SCRIPTS block in index.html
    arvr_match = re.search(r'const ARVR_MONUMENT_SCRIPTS\s*=\s*(\{.*?\n\s*\});', idx_content, re.DOTALL)
    if arvr_match:
        # Build comprehensive multi-lingual scripts for all states/monuments
        # Supported modal keys:
        modal_scripts = {}
        for k, v in MONUMENT_MAP.items():
            modal_scripts[k] = {lang: v[lang] for lang in REQUIRED_LANGS}
        # Add regional aliases used in index.html
        modal_scripts["rajasthan"] = modal_scripts["amber_fort"]
        modal_scripts["gujarat"] = modal_scripts["statue_of_unity"]
        modal_scripts["delhi"] = modal_scripts["red_fort"]
        modal_scripts["punjab"] = modal_scripts["golden_temple"]
        modal_scripts["madhya_pradesh"] = modal_scripts["sanchi_stupa"]
        modal_scripts["maharashtra"] = modal_scripts["ajanta_caves"]
        modal_scripts["tamil_nadu"] = modal_scripts["brihadisvara"]
        modal_scripts["andhra_pradesh"] = modal_scripts["lepakshi_temple"]
        modal_scripts["karnataka"] = modal_scripts["hampi_chariot"]
        modal_scripts["kerala"] = modal_scripts["padmanabhaswamy"]
        modal_scripts["odisha"] = modal_scripts["konark_sun"]
        modal_scripts["west_bengal"] = modal_scripts["victoria_memorial"]
        modal_scripts["bihar"] = modal_scripts["mahabodhi"]
        modal_scripts["chhattisgarh"] = modal_scripts["lakshmana_temple"]
        modal_scripts["goa"] = modal_scripts["bom_jesus"]
        modal_scripts["assam"] = modal_scripts["rang_ghar"]
        modal_scripts["tripura"] = modal_scripts["neermahal"]
        modal_scripts["uttarakhand"] = modal_scripts["jageshwar"]
        modal_scripts["uttar_pradesh"] = modal_scripts["taj_mahal"]

        new_arvr_json = json.dumps(modal_scripts, ensure_ascii=False, indent=2)
        new_idx_content = idx_content[:arvr_match.start(1)] + new_arvr_json + idx_content[arvr_match.end(1):]
        with open(index_path, 'w', encoding='utf-8') as f:
            f.write(new_idx_content)
        print(" [OK] Successfully updated index.html ARVR_MONUMENT_SCRIPTS with all 15 languages for all regions!")
    else:
        print(" [INFO] ARVR_MONUMENT_SCRIPTS not found in index.html (already up-to-date or different pattern)")

print("\nAll database generation and HTML file updates complete!")
