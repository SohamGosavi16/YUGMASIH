import json
import sys
sys.stdout.reconfigure(encoding='utf-8')

with open('scratch/monument_scripts_data.json', 'r', encoding='utf-8') as f:
    scripts = json.load(f)

# Also check jageshwar, neermahal, lepakshi, statue of unity, victoria memorial
# Do they have scripts in their respective files?
target_keys = [
    'taj_mahal', 'ajanta_caves', 'rani_ki_vav', 'amber_fort', 'brihadisvara',
    'hampi_chariot', 'konark_sun', 'rang_ghar', 'padmanabhaswamy', 'mahabodhi',
    'lakshmana_temple', 'bom_jesus', 'gateway_of_india', 'golden_temple',
    'temple_gopuram', 'lotus_temple', 'red_fort', 'red_fort_glory',
    'qutub_minar', 'humayun_tomb', 'rajgad_fort', 'sanchi_stupa'
]

print("Verifying target keys in scripts:")
for k in target_keys:
    script_key = 'south_indian_gopuram' if k == 'temple_gopuram' else k
    if script_key in scripts:
        item = scripts[script_key]
        print(f"  [OK] {k:20} -> '{item['title']}' ({len(item)} keys)")
    else:
        print(f"  [MISSING] {k}")
