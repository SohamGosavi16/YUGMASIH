with open('jageshwar_3d.html', 'r', encoding='utf-8') as f:
    c = f.read()

idx = c.find('SUPPORTED_LANGS')
if idx != -1:
    print(c[idx:idx+800].encode('ascii', errors='replace').decode('ascii'))
