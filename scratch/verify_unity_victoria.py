# -*- coding: utf-8 -*-
files_to_check = [
    'victoriamemorial-vr.html', 'victoria_memorial_3d.html',
    'statue_of_unity_3d.html', 'statue_of_unity.html', 'statue_of_unity_vr.html',
    'lepakshi_temple_3d.html', 'lepakshi_3d.html',
    'models_hub.html', 'all_3d_models.html'
]

for fname in files_to_check:
    try:
        with open(fname, 'r', encoding='utf-8') as f:
            c = f.read()
        print(f"=== {fname} ({len(c)} bytes) ===")
        print("  brand-shields:", ('brand-shield-top-left' in c and 'brand-shield-bottom-left' in c))
        print("  ui_infos=0:", ('ui_infos=0' in c))
        print("  voice guide trigger:", ('id="btn-voice-guide"' in c))
        print("  voice guide panel:", ('id="voice-guide-panel"' in c))
        print("  subtitle HUD:", ('id="vg-subtitle-hud"' in c))
        print("  vg-engine-script:", ('id="vg-engine-script"' in c))
        if 'victoria' in fname:
            print("  New UID 1b3ec6a1a07949d08221f718fd1919d4:", ('1b3ec6a1a07949d08221f718fd1919d4' in c))
            print("  Author rd5471940:", ('rd5471940' in c))
            print("  Old UID 1d0a3acd2df043288deef67b15763cbb absent:", ('1d0a3acd2df043288deef67b15763cbb' not in c))
        elif 'unity' in fname:
            print("  UID 2221e03866f24817972a16f3ad17c168:", ('2221e03866f24817972a16f3ad17c168' in c))
            print("  Author arshad irfan:", ('arshad irfan' in c))
        elif 'lepakshi' in fname:
            print("  UID e9e1e5ebbd61447dacee4949a5b60eeb:", ('e9e1e5ebbd61447dacee4949a5b60eeb' in c))
            print("  Author pruthweeshasa:", ('pruthweeshasa' in c))
    except Exception as e:
        print(f"=== {fname} ERROR: {e} ===")
