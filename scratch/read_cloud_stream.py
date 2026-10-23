with open('scratch/apply_master_fix.py', 'r', encoding='utf-8') as f:
    c = f.read()

idx = c.find('function playCloudStream')
print(c[idx:idx+1200].encode('ascii', errors='replace').decode('ascii'))
