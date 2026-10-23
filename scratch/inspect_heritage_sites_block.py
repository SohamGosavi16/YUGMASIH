import re
import sys
sys.stdout.reconfigure(encoding='utf-8')

with open('index.html', 'r', encoding='utf-8', errors='ignore') as f:
    content = f.read()

# Find start of HERITAGE_SITES_BY_STATE
start = content.find('const HERITAGE_SITES_BY_STATE')
end = content.find('function getHeritageSitesForState', start)

sites_block = content[start:end]
print(f"Length of HERITAGE_SITES_BY_STATE block: {len(sites_block)}")

# Find all keys in this block
keys = re.findall(r'"([a-z_]+)":\s*\[', sites_block)
print("Keys in HERITAGE_SITES_BY_STATE:", keys)

# Let's inspect the tail of sites_block
lines = sites_block.split('\n')
print("\nLast 25 lines of sites_block:")
for l in lines[-25:]:
    print(l)
