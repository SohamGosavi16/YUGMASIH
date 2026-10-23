import sys, re
sys.stdout.reconfigure(encoding='utf-8')
with open('india_3d_map.html', 'r', encoding='utf-8', errors='ignore') as f:
    text = f.read()

print('Length:', len(text))
headings = re.findall(r'<h[1-6][^>]*>.*?</h[1-6]>', text, re.I)
print('Headings:', headings[:10])

ids = re.findall(r'id=["\']([^"\']+)["\']', text)
print('IDs:', ids[:30])

classes = set(re.findall(r'class=["\']([^"\']+)["\']', text))
print('Some classes:', list(classes)[:20])
