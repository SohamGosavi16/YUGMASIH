import sys, re, os
sys.stdout.reconfigure(encoding='utf-8')

with open('index.html', 'r', encoding='utf-8', errors='ignore') as f:
    text = f.read()

m = re.search(r'const YUGMA_STATES = \{(.*?)\n    \};', text, re.DOTALL)
yugma_keys = set(re.findall(r'^\s*([a-z0-9_]+):', m.group(1), re.MULTILINE)) if m else set()
print('YUGMA_STATES keys:', sorted(list(yugma_keys)))

state_files = sorted([f for f in os.listdir('data/states') if f.endswith('.js')])
for sf in state_files:
    with open(os.path.join('data/states', sf), 'r', encoding='utf-8', errors='ignore') as fp:
        c = fp.read()
        keys = re.findall(r'window\.YUGMA_STATES_DATA\["([a-z0-9_]+)"\]', c)
        for k in keys:
            if not k.startswith('state_'):
                print(f'{sf} -> key: "{k}", in YUGMA_STATES: {k in yugma_keys}')
