with open('scratch/integrate_index_modal_voice_guide.py', 'r', encoding='utf-8') as f:
    lines = f.readlines()

print("".join(lines[20:100]).encode('ascii', errors='replace').decode('ascii'))
