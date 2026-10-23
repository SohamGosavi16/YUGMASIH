import re
c = open('index.html', 'r', encoding='utf-8').read()
lines = c.split('\n')
for i, l in enumerate(lines):
    ll = l.lower()
    if 'amber' in ll or 'rang_ghar' in ll or 'rang ghar' in ll or 'rangghar' in ll:
        safe = l.strip()[:180].encode("ascii", errors="replace").decode("ascii")
        print(f"Line {i+1}: {safe}")
