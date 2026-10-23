import re

with open('jageshwar_3d.html', 'r', encoding='utf-8') as f:
    text = f.read()

for marker in ['<style id="vg-master-styles">', 'id="btn-nav-voice-guide"', 'id="btn-voice-guide"', 'id="voice-guide-panel"', 'id="vg-subtitle-hud"', 'var VG_SCRIPTS']:
    idx = text.find(marker)
    print(f"{marker:35} -> position {idx}")
