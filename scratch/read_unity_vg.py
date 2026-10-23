with open('scratch/unity_vg_body.html', 'r', encoding='utf-8') as f:
    c = f.read()

print("Length of unity_vg_body.html:", len(c))
# print first 1500 chars
print(c[:1500].encode('ascii', errors='replace').decode('ascii'))
