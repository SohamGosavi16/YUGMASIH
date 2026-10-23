with open('index.html', 'r', encoding='utf-8', errors='ignore') as f:
    text = f.read()

import re
match = re.search(r'const HERITAGE_SITES_BY_STATE = \{(.*?)\n    \};', text, re.DOTALL)
if match:
    keys = re.findall(r'^\s*["\']?([a-zA-Z0-9_]+)["\']?\s*:\s*\[', match.group(1), re.MULTILINE)
    print('States in HERITAGE_SITES_BY_STATE:', keys)
else:
    print('Not matched')
