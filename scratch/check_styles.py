with open('scratch/lepakshi_vg_styles.html', 'r', encoding='utf-8') as f:
    c = f.read()

print("Styles length:", len(c))
print("First 300 chars:")
print(c[:300].encode('ascii', errors='replace').decode('ascii'))
