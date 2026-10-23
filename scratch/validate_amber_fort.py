import re, subprocess

with open('amberfort-vr.html', 'r', encoding='utf-8') as f:
    html = f.read()

# Extract script contents
scripts = re.findall(r'<script(?:\s+id="[^"]*")?>([\s\S]*?)</script>', html)
print(f'Total script blocks in amberfort-vr.html: {len(scripts)}')

for i, code in enumerate(scripts):
    code_stripped = code.strip()
    if not code_stripped:
        continue
    # write to temp js file and test syntax with node --check
    tmp_js = f'scratch/test_script_{i}.js'
    with open(tmp_js, 'w', encoding='utf-8') as out:
        out.write(code_stripped)
    res = subprocess.run(['node', '--check', tmp_js], capture_output=True, text=True)
    if res.returncode == 0:
        print(f'  Script {i} ({len(code_stripped)} chars): [OK] Valid JavaScript syntax!')
    else:
        print(f'  Script {i} ERROR:\n{res.stderr}')

print('\nChecking required HTML elements in amberfort-vr.html:')
checks = [
    ('Model-viewer tag', '<model-viewer'),
    ('Model src', 'amber_fort_tripo.glb'),
    ('Poster thumb', 'amber_fort_tripo_thumb.jpg'),
    ('Tripo URL with full slug', 'https://studio.tripo3d.ai/3d-model/amber-fort-fortress-with-domed-pavilions-and-crenellated-sandstone-wal-0b9be45a-26e8-4b24-bc78-be0793052d6d'),
    ('Brand shield badge', 'brand-shield-badge'),
    ('Atmosphere buttons', 'atmos-btn'),
    ('Dock buttons (views)', 'dock-btn'),
    ('Details modal', 'id="info-modal"'),
    ('Audio drone button', 'id="btn-audio"'),
    ('Voice guide fab', 'id="btn-voice-guide"'),
    ('Voice guide panel', 'id="voice-guide-panel"'),
    ('Subtitle HUD', 'id="vg-subtitle-hud"'),
    ('Voice guide master styles', 'id="vg-master-styles"'),
    ('Voice guide engine script', 'id="vg-engine-script"')
]

for name, needle in checks:
    print(f'  {name}: {"[OK]" if needle in html else "[FAIL]"}')
