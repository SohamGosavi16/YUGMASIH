import glob
import re

files = sorted(glob.glob('*.html'))

patterns = {
    'nav-right': re.compile(r'class="[^"]*nav-right[^"]*"'),
    'header-actions': re.compile(r'class="[^"]*header-actions[^"]*"'),
    'hud-right': re.compile(r'class="[^"]*hud-right[^"]*"'),
    'nav-actions': re.compile(r'class="[^"]*nav-actions[^"]*"'),
    'btn-audio': re.compile(r'id="btn-audio"'),
    'audio-btn': re.compile(r'id="audio-btn"'),
}

for f in files:
    if f in ['auth.html']: continue
    with open(f, 'r', encoding='utf-8', errors='ignore') as fp:
        c = fp.read()
    
    matches = []
    for name, pat in patterns.items():
        if pat.search(c):
            matches.append(name)
    print(f"{f:35} : {', '.join(matches) if matches else 'NONE'}")
