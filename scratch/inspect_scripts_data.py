import json
import sys
sys.stdout.reconfigure(encoding='utf-8')

with open('scratch/monument_scripts_data.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

print(f"Total monuments in monument_scripts_data.json: {len(data)}")
for k, v in data.items():
    print(f"  {k:20} -> {len(v)} languages: {list(v.keys())[:6]}...")
