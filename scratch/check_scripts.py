with open('index.html', 'r', encoding='utf-8', errors='ignore') as f:
    text = f.read()

import re
scripts = re.findall(r'<script[^>]*src=["\']([^"\']+)["\']', text, re.I)
for s in scripts:
    print('Script src:', s)
