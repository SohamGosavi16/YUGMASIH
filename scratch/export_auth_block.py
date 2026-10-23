import sys
sys.stdout.reconfigure(encoding='utf-8')

with open('index.html', 'r', encoding='utf-8', errors='ignore') as f:
    lines = f.readlines()

with open('scratch/index_auth_block.js', 'w', encoding='utf-8') as f_out:
    for i in range(7420, len(lines)):
        f_out.write(f"/* {i+1} */ {lines[i]}")

print("Written lines 7421 to end to scratch/index_auth_block.js")
