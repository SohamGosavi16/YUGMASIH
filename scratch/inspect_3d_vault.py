import re

for fname in ['all_3d_models.html', 'models_hub.html']:
    c = open(fname, 'r', encoding='utf-8').read()
    print(f"=== {fname} ===")
    
    # 1. model-card
    cards = re.findall(r'<div class="model-card"[^>]*data-id="(?:amber_fort|rang_ghar)"[^>]*>.*?</div>', c, flags=re.DOTALL)
    print(f"Found {len(cards)} sidebar model-cards")
    
    # 2. grid-card
    # Check what enclosing div grid-card has
    grid_matches = re.findall(r'<div class="grid-card"[^>]*>.*?data-id="(?:amber_fort|rang_ghar)".*?</div>\s*</div>', c, flags=re.DOTALL)
    print(f"Found {len(grid_matches)} grid cards")

    # 3. monuments array
    # Look for objects in MONUMENTS
    mon_matches = re.findall(r'\{\s*"id":\s*"(?:amber_fort|rang_ghar)".*?\n\s*\},?', c, flags=re.DOTALL)
    print(f"Found {len(mon_matches)} monuments in MONUMENTS array")
