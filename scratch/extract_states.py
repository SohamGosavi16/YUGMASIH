import re, json

with open('index.html', 'r', encoding='utf-8', errors='ignore') as f:
    text = f.read()

# Find YUGMA_STATES
match = re.search(r'const YUGMA_STATES = \{(.*?)\};\s*(?:const|let|function|window)', text, re.DOTALL)
if match:
    code = 'var YUGMA_STATES = {' + match.group(1) + '};'
    with open('scratch/yugma_states.js', 'w', encoding='utf-8') as out:
        out.write(code + '\nconsole.log(Object.keys(YUGMA_STATES));')
    print('Found YUGMA_STATES, length:', len(match.group(1)))
else:
    print('YUGMA_STATES not matched with regex')
