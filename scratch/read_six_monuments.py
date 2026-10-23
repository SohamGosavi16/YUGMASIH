with open('scratch/build_six_monuments.py', 'r', encoding='utf-8') as f:
    c = f.read()

import re
matches = re.findall(r'"id":\s*"([^"]+)",\s*"title":\s*"([^"]+)"', c)
print("Monuments in build_six_monuments.py:")
for m in matches:
    print(m)
