import glob, os

for f in glob.glob('scratch/*.py'):
    with open(f, 'r', encoding='utf-8', errors='ignore') as fp:
        c = fp.read()
    if 'qutub' in c.lower() or 'rajgad' in c.lower() or 'humayun' in c.lower():
        print(f"Found references in: {f}")
