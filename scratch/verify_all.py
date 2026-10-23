for fname in ['lepakshi_temple_3d.html', 'lepakshi_3d.html', 'models_hub.html', 'all_3d_models.html']:
    with open(fname, 'r', encoding='utf-8') as f:
        c = f.read()
    print(f'=== {fname} ({len(c)} bytes) ===')
    print('  Has UID e9e1e5ebbd61447dacee4949a5b60eeb:', 'e9e1e5ebbd61447dacee4949a5b60eeb' in c)
    print('  Has brand-shield-top-left:', 'brand-shield-top-left' in c)
    print('  Has brand-shield-bottom-left:', 'brand-shield-bottom-left' in c)
    print('  Has ui_infos=0:', 'ui_infos=0' in c)
    print('  Has ui_watermark=0:', 'ui_watermark=0' in c)
    if '3d.html' in fname:
        print('  Has voice guide trigger:', 'id="btn-voice-guide"' in c)
        print('  Has voice guide panel:', 'id="voice-guide-panel"' in c)
        print('  Has subtitle HUD:', 'id="vg-subtitle-hud"' in c)
        print('  Has vg-engine-script:', 'id="vg-engine-script"' in c)
        print('  Has Dravidian Style Hindu Temple credit:', 'Dravidian Style Hindu Temple' in c)
        print('  Has pruthweeshasa credit:', 'pruthweeshasa' in c)
