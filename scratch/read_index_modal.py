with open('scratch/integrate_index_modal_voice_guide.py', 'r', encoding='utf-8') as f:
    c = f.read()

print("Length of integrate_index_modal_voice_guide.py:", len(c))
print("First 800 chars:")
print(c[:800].encode('ascii', errors='replace').decode('ascii'))
