import json
import sys
sys.stdout.reconfigure(encoding='utf-8')

with open('scratch/monument_scripts_data.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

taj = data['taj_mahal']
print(f"Title: {taj['title']}")
print(f"English: {taj['en'][:120]}...")
print(f"Hindi: {taj['hi'][:120]}...")
print(f"All keys: {list(taj.keys())}")
