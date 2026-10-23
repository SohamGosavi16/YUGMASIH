import re

with open('scratch/model_script_0b9be45a.txt', 'r', encoding='utf-8') as f:
    s = f.read()

print('Script length:', len(s))
s_un = s.replace('\\u002F', '/')

urls = re.findall(r'https?://[^\s"\'<>]+', s_un)
print(f'Found URLs: {len(urls)}')
for u in set(urls):
    if any(k in u.lower() for k in ['glb', 'gltf', 'tripo-data', 'model', '0b9be45a', 'project', 'download', 'mesh']):
        print('  URL:', u[:140])

for m in re.finditer(r'0b9be45a', s_un):
    idx = m.start()
    print('Context around 0b9be45a:')
    print(s_un[max(0, idx-100):min(len(s_un), idx+200)])
    print('---')
