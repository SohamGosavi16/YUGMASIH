with open('scratch/expand_monument_scripts.py', 'r', encoding='utf-8') as f:
    c = f.read()

print("Length of expand_monument_scripts.py:", len(c))
print("First 500 chars:")
print(c[:500].encode('ascii', errors='replace').decode('ascii'))
