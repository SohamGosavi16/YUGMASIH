with open('scratch/build_six_monuments.py', 'r', encoding='utf-8') as f:
    c = f.read()

import re
matches = re.findall(r'(\w+)\s*=\s*"""([\s\S]*?)"""', c)
print(f"Triple-quoted strings found in build_six_monuments.py ({len(matches)}):")
for name, text in matches[:10]:
    print(f"- {name}: {len(text.split())} words")
