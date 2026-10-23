with open('scratch/integrate_index_modal_voice_guide.py', 'r', encoding='utf-8') as f:
    c = f.read()

import re
matches = re.findall(r'[\'"]([a-z_]+)[\'"]\s*:\s*\{[\s\n]*[\'"]en[\'"]', c)
print("Monuments in integrate_index_modal_voice_guide.py:", matches)
