with open('scratch/build_six_monuments.py', 'r', encoding='utf-8') as f:
    c = f.read()

import re
matches = re.findall(r'(\w+)_en\s*=\s*"""([\s\S]*?)"""', c)
print(f"English scripts found in build_six_monuments.py ({len(matches)}):")
for name, text in matches:
    print(f"- {name}: {len(text.split())} words")
