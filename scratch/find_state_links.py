import re

with open('js/stateData.js', 'r', encoding='utf-8', errors='ignore') as f:
    c = f.read()

links = re.findall(r'[\'"]([a-zA-Z0-9_\-]+\.html)[\'"]', c)
print('Unique links in js/stateData.js:')
for l in sorted(set(links)):
    print('-', l)
