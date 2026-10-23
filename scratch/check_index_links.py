import glob
import re

files = sorted(glob.glob('*.html'))
links_map = {}

for f in files:
    if f == 'index.html': continue
    with open(f, 'r', encoding='utf-8', errors='ignore') as fp:
        content = fp.read()
        links = re.findall(r'href=["\'](index\.html[^"\']*)["\']', content)
        if links:
            links_map[f] = list(set(links))

print(f"Total files with links to index.html: {len(links_map)}")
for f, lks in list(links_map.items())[:25]:
    print(f"  {f:35} -> {lks}")
