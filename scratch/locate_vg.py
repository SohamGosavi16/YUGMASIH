import sys
sys.stdout.reconfigure(encoding='utf-8')

with open('statue_of_unity_3d.html', 'r', encoding='utf-8') as f:
    text = f.read()

pos = text.find('id="btn-voice-guide"')
print("pos:", pos)
if pos != -1:
    print(text[pos-100:pos+300])
