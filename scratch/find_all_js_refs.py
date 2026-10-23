import re, glob

links = set()
for f in glob.glob('data/**/*.js', recursive=True) + glob.glob('js/*.js'):
    with open(f, 'r', encoding='utf-8', errors='ignore') as fp:
        c = fp.read()
    found = re.findall(r'[\'"]([a-zA-Z0-9_\-]+\.html)[\'"]', c)
    for fn in found:
        if fn not in ['index.html', 'auth.html', 'all_3d_models.html', 'models_hub.html', 'india_3d_map.html']:
            links.add(fn)

print(f"Total HTML files referenced in JS ({len(links)}):")
for l in sorted(links):
    print('-', l)
