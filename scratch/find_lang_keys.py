with open('index.html', 'r', encoding='utf-8', errors='ignore') as f:
    text = f.read()

import re
m = re.search(r'const STATE_LANG_CONFIG = \{(.*?)\n    \};', text, re.DOTALL)
if m:
    keys = re.findall(r'^\s*"([a-z0-9_]+)"\s*:', m.group(1), re.MULTILINE)
    print('Keys in STATE_LANG_CONFIG:', keys)
