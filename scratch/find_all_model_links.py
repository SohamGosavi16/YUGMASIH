import re

files_to_check = ['all_3d_models.html', 'models_hub.html', 'india_3d_map.html', 'index.html']
all_model_links = set()

for fn in files_to_check:
    with open(fn, 'r', encoding='utf-8', errors='ignore') as f:
        c = f.read()
    links = re.findall(r'href=[\'"]([^\'"]+\.html[^\'"]*)[\'"]', c)
    for l in links:
        base = l.split('?')[0].split('#')[0]
        if base and base not in ['index.html', 'auth.html', 'all_3d_models.html', 'models_hub.html', 'india_3d_map.html']:
            all_model_links.add(base)

print(f"Total Unique Model Pages linked across hub pages: {len(all_model_links)}")
for l in sorted(all_model_links):
    print('-', l)
