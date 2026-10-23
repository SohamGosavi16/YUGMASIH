with open('lepakshi_temple_3d.html', 'r', encoding='utf-8', errors='ignore') as f:
    for idx, line in enumerate(f):
        if 'btn-nav-voice-guide' in line:
            print(f"Found at line {idx+1}: {line.strip()}")
