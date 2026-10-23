import sys
sys.stdout.reconfigure(encoding='utf-8')

with open('scratch/lepakshi_vg_styles.html', 'r', encoding='utf-8') as f:
    styles = f.read()
print(f"lepakshi_vg_styles.html length: {len(styles)} chars")
print("Styles sample:")
print(styles[:300])

with open('scratch/lepakshi_vg_body.html', 'r', encoding='utf-8') as f:
    body = f.read()
print(f"\nlepakshi_vg_body.html length: {len(body)} chars")
print("Body components:")
for marker in ['btn-voice-guide', 'voice-guide-panel', 'vg-subtitle-hud', 'VG_SCRIPTS', 'SUPPORTED_LANGS', 'class VoiceGuideEngine', 'voiceGuide = new VoiceGuideEngine']:
    print(f"  {marker:25} -> in body: {marker in body}")
