import glob
import re
import sys
sys.stdout.reconfigure(encoding='utf-8')

files = sorted(glob.glob('*.html'))
print(f"Total HTML files: {len(files)}")

# Exclude non-monument pages
non_monuments = {'index.html', 'auth.html', 'all_3d_models.html', 'models_hub.html', 'india_3d_map.html'}

monument_files = [f for f in files if f not in non_monuments]
print(f"Total monument files: {len(monument_files)}")

# Group files by monument
groups = {}
for f in monument_files:
    base = f.replace('_backup.html', '').replace('-vr.html', '').replace('_3d.html', '').replace('-vr', '').replace('_3d', '')
    # Normalize base
    if 'ajanta' in f: k = 'ajanta_caves'
    elif 'amber' in f: k = 'amber_fort'
    elif 'bom_jesus' in f: k = 'bom_jesus'
    elif 'brihadisvara' in f: k = 'brihadisvara'
    elif 'gateway' in f: k = 'gateway_of_india'
    elif 'golden' in f: k = 'golden_temple'
    elif 'hampi' in f: k = 'hampi_chariot'
    elif 'humayun' in f: k = 'humayun_tomb'
    elif 'jageshwar' in f: k = 'jageshwar'
    elif 'konark' in f or 'odisha' in f: k = 'konark_sun'
    elif 'lakshmana' in f or 'sirpur' in f: k = 'lakshmana_temple'
    elif 'lepakshi' in f: k = 'lepakshi_temple'
    elif 'lotus' in f: k = 'lotus_temple'
    elif 'mahabodhi' in f: k = 'mahabodhi'
    elif 'neermahal' in f: k = 'neermahal'
    elif 'padmanabh' in f: k = 'padmanabhaswamy'
    elif 'qutub' in f: k = 'qutub_minar'
    elif 'rajgad' in f: k = 'rajgad_fort'
    elif 'rang_ghar' in f: k = 'rang_ghar'
    elif 'rani_ki_vav' in f: k = 'rani_ki_vav'
    elif 'red_fort_glory' in f or 'redfortglory' in f: k = 'red_fort_glory'
    elif 'red_fort' in f or 'redfort' in f: k = 'red_fort'
    elif 'sanchi' in f: k = 'sanchi_stupa'
    elif 'statue_of_unity' in f: k = 'statue_of_unity'
    elif 'taj_mahal' in f: k = 'taj_mahal'
    elif 'temple_gopuram' in f or 'templegopuram' in f: k = 'temple_gopuram'
    elif 'victoria' in f: k = 'victoria_memorial'
    else: k = f
    
    if k not in groups:
        groups[k] = []
    groups[k].append(f)

print(f"\nTotal unique monument groups: {len(groups)}")
for k, flist in sorted(groups.items()):
    print(f"  {k:22} ({len(flist)} files): {', '.join(flist)}")
