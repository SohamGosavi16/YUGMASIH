import glob
import re
import sys
sys.stdout.reconfigure(encoding='utf-8')

files = sorted(glob.glob('*.html'))

non_monuments = {'index.html', 'auth.html', 'all_3d_models.html', 'models_hub.html', 'india_3d_map.html'}
monument_files = [f for f in files if f not in non_monuments]

required_elements = [
    'btn-voice-guide',
    'voice-guide-panel',
    'vg-subtitle-hud',
    'btn-nav-voice-guide',
    'vg-play',
    'vg-stop',
    'vg-script-box',
    'vg-progress-bar',
    'vg-rate-btn',
    'vg-hud-toggle',
    'vg-close',
    'vg-master-styles',
    'vg-engine-script'
]

print(f"Verifying {len(monument_files)} monument HTML files:")
issues = []

for f in monument_files:
    with open(f, 'r', encoding='utf-8', errors='ignore') as fp:
        c = fp.read()
    
    missing = []
    for el in required_elements:
        if el not in c:
            missing.append(el)
    
    if 'name="referrer"' not in c and "name='referrer'" not in c:
        missing.append('meta-referrer')
    
    if missing:
        issues.append((f, missing))

if not issues:
    print(f"\n[ALL PASS] 100% of {len(monument_files)} monument files contain all {len(required_elements)} Voice Guide elements and meta tags!")
else:
    print(f"\n[WARNING] Found issues in {len(issues)} files:")
    for f, miss in issues:
        print(f"  {f}: missing {miss}")
