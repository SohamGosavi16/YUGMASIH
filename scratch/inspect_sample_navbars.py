import sys, re
sys.stdout.reconfigure(encoding='utf-8')

sample_files = ['taj_mahal_3d.html', 'amberfort-vr.html', 'gatewayofindia-vr.html', 'lepakshi_temple_3d.html']

for f in sample_files:
    print(f"\n=== NAVBAR IN {f} ===")
    with open(f, 'r', encoding='utf-8', errors='ignore') as fp:
        content = fp.read()
    # Find nav or header
    match = re.search(r'<header.*?</header>|<nav.*?</nav>', content, re.DOTALL)
    if match:
        lines = match.group(0).split('\n')
        for l in lines[:15]:
            print(" ", l[:100])
        if len(lines) > 15:
            print("  ... and", len(lines) - 15, "more lines in header/nav")
    else:
        print("  No <header> or <nav> tag found. Searching for buttons:")
        btns = re.findall(r'<button[^>]*>.*?</button>', content[:5000], re.DOTALL)
        for b in btns[:5]:
            print("  BTN:", b.replace('\n', ' ')[:90])
