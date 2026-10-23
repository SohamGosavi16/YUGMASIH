import glob
import re
import sys, os
sys.stdout.reconfigure(encoding='utf-8')
sys.path.insert(0, os.path.abspath('scratch'))
import group_monuments

already_done = {'jageshwar', 'neermahal', 'lepakshi_temple', 'statue_of_unity', 'victoria_memorial'}

target_files = []
for k, flist in group_monuments.groups.items():
    if k not in already_done:
        target_files.extend([(k, f) for f in flist])

print(f"Total target files to update: {len(target_files)}")

nav_types = {}
for k, f in target_files:
    with open(f, 'r', encoding='utf-8', errors='ignore') as fp:
        c = fp.read()
    has_head = '</head>' in c
    has_body_end = '</body>' in c
    has_top_nav = 'class="top-nav"' in c or "class='top-nav'" in c
    has_top_hud = 'class="top-hud"' in c or "class='top-hud'" in c
    has_nav_right = 'class="nav-right"' in c or "class='nav-right'" in c
    has_hud_controls = 'class="hud-controls"' in c or "class='hud-controls'" in c
    
    t = f"nav_right:{has_nav_right} | hud_controls:{has_hud_controls} | head:{has_head} | body_end:{has_body_end}"
    if t not in nav_types:
        nav_types[t] = []
    nav_types[t].append(f)

print("\nNavbar/File Structure Patterns:")
for t, flist in nav_types.items():
    print(f"  [{t}] -> {len(flist)} files:")
    print(f"    Sample: {flist[:5]}")
