# -*- coding: utf-8 -*-
import re

for fname in ['statue_of_unity_3d.html', 'victoriamemorial-vr.html', 'lepakshi_temple_3d.html']:
    with open(fname, 'r', encoding='utf-8') as f:
        c = f.read()
    
    scripts = re.findall(r'<script[^>]*>(.*?)</script>', c, re.DOTALL)
    print(f"=== {fname} ===")
    print("  Total scripts:", len(scripts))
    print("  Iframe present:", ('<iframe' in c))
    print("  Shield top left:", ('brand-shield-top-left' in c))
    print("  Shield bottom left:", ('brand-shield-bottom-left' in c))
    print("  Voice guide trigger:", ('id="btn-voice-guide"' in c))
    print("  Voice guide panel:", ('id="voice-guide-panel"' in c))
    print("  Voice guide hud:", ('id="vg-subtitle-hud"' in c))
    print("  Voice guide engine:", ('id="vg-engine-script"' in c))
    print("  Closed HTML:", ('</html>' in c and '</body>' in c))
