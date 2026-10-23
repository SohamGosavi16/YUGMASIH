with open('scratch/build_six_monuments.py', 'r', encoding='utf-8') as f:
    c = f.read()

print("Length of build_six_monuments.py:", len(c))
print("First 800 chars:")
print(c[:800].encode('ascii', errors='replace').decode('ascii'))
