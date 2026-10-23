with open('index.html', 'r', encoding='utf-8', errors='ignore') as f:
    html = f.read()

ids = [
    'sd-region', 'sd-title', 'sd-capital-label', 'sd-capital-val', 'sd-tagline',
    'sd-tradition-tag', 'sd-heritage-tag', 'sm-heritage-name', 'sm-heritage-desc',
    'sm-arvr-btn-label', 'sm-tradition-name', 'sm-tradition-desc', 'sm-trad-btn-label',
    'card-tradition-video-wrap', 'card-tradition-iframe', 'card-tradition-video-title',
    'sm-trad-badge', 'sm-info-title', 'sm-info-desc', 'sm-info-btn-label',
    'sd-sites-title', 'sd-sites-count', 'sd-sites-list', 'drawer-back-btn',
    'state-drawer', 'drawer-close-btn', 'btn-lang-en', 'btn-lang-reg',
    'card-arvr', 'card-tradition', 'card-info'
]

for el_id in ids:
    found = f'id="{el_id}"' in html or f'id=\'{el_id}\'' in html
    if not found:
        print('MISSING ID:', el_id)
print('Check completed.')
