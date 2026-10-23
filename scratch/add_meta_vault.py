for fn in ['models_hub.html', 'all_3d_models.html']:
    with open(fn, 'r', encoding='utf-8') as f:
        c = f.read()
    if 'no-referrer' not in c:
        c = c.replace('<meta charset="UTF-8">', '<meta charset="UTF-8">\n  <meta name="referrer" content="no-referrer">', 1)
        with open(fn, 'w', encoding='utf-8') as f:
            f.write(c)
        print('Added no-referrer to', fn)
    else:
        print('Already had no-referrer:', fn)
