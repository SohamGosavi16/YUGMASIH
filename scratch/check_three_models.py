for fn in ['qutub_minar_3d.html', 'humayun_tomb_3d.html', 'rajgad_fort_3d.html']:
    with open(fn, 'r', encoding='utf-8', errors='ignore') as fp:
        lines = fp.readlines()
    print(f"=== {fn} ({len(lines)} lines) ===")
    print("".join(lines[:20]).encode('ascii', errors='replace').decode('ascii'))
