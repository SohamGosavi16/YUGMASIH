import re

for filename in ['jageshwar-vr.html', 'neermahal-vr.html', 'lepakshi_temple_3d.html']:
    print(f"=== {filename} ===")
    with open(filename, 'r', encoding='utf-8', errors='ignore') as f:
        text = f.read()
    titles = re.findall(r'<title>(.*?)</title>', text, re.IGNORECASE)
    print("  Title:", titles)
    ids = re.findall(r'<div\s+id=[\'"]([^\'"]+)[\'"]', text)
    print("  Div IDs:", ids[:10])
    h1s = re.findall(r'<h1[^>]*>(.*?)</h1>', text, re.IGNORECASE | re.DOTALL)
    print("  H1s:", h1s)
