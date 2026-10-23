"""
Master script to remove all Amber Fort (Rajasthan) and Rang Ghar (Assam) references
from the entire Indian Heritage 3D site.
"""
import re, os, json, sys

PROJECT = r"c:\Users\LENOVO\Downloads\new sih-20260903T160606Z-1-001\new sih"
os.chdir(PROJECT)

changes_log = []

def log(msg):
    changes_log.append(msg)
    print(msg)

# ───────────────────────────────────────────────────
# Helper: remove a JS object property line from a
# comma-separated object literal (state registry)
# ───────────────────────────────────────────────────

def remove_lines_matching(filepath, patterns, dry_run=False):
    """Remove entire lines matching any pattern (case-insensitive).
    Returns count of removed lines."""
    with open(filepath, 'r', encoding='utf-8') as f:
        lines = f.readlines()
    
    original_count = len(lines)
    kept = []
    removed = 0
    for line in lines:
        if any(re.search(p, line, re.IGNORECASE) for p in patterns):
            removed += 1
        else:
            kept.append(line)
    
    if removed > 0 and not dry_run:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.writelines(kept)
        log(f"  {filepath}: Removed {removed} lines")
    return removed


def remove_json_array_entry(text, array_key, entry_name_pattern):
    """Remove an entry from a JSON-like array in JS source.
    Finds the array by key, then removes the object containing entry_name_pattern."""
    # This is complex because the data is embedded in JS, not pure JSON.
    # We'll use a regex approach to find and remove the block.
    
    # Find the array start
    array_pat = re.compile(rf'"{array_key}"\s*:\s*\[', re.IGNORECASE)
    match = array_pat.search(text)
    if not match:
        return text, False
    
    start = match.end()
    
    # Find the entry within the array
    entry_pat = re.compile(entry_name_pattern, re.IGNORECASE)
    entry_match = entry_pat.search(text, start)
    if not entry_match:
        return text, False
    
    # Find the enclosing { ... } block
    # Walk backwards to find the opening {
    pos = entry_match.start()
    brace_start = text.rfind('{', start, pos)
    if brace_start == -1:
        return text, False
    
    # Walk forward to find the closing }
    depth = 0
    i = brace_start
    while i < len(text):
        if text[i] == '{':
            depth += 1
        elif text[i] == '}':
            depth -= 1
            if depth == 0:
                brace_end = i + 1
                break
        i += 1
    else:
        return text, False
    
    # Now remove the block including any trailing comma and whitespace
    # Check for leading comma (entry in middle/end of array)
    pre_start = brace_start
    while pre_start > 0 and text[pre_start - 1] in ' \t':
        pre_start -= 1
    if pre_start > 0 and text[pre_start - 1] == ',':
        pre_start -= 1
    # Also eat the newline before
    while pre_start > 0 and text[pre_start - 1] in ' \t\r\n':
        pre_start -= 1
    pre_start += 1  # keep one newline
    
    post_end = brace_end
    # Check for trailing comma
    while post_end < len(text) and text[post_end] in ' \t\r\n':
        post_end += 1
    if post_end < len(text) and text[post_end] == ',':
        post_end += 1
    
    text = text[:pre_start] + text[post_end:]
    return text, True


print("=" * 60)
print("REMOVING AMBER FORT (RAJASTHAN) AND RANG GHAR (ASSAM)")
print("=" * 60)

# ═══════════════════════════════════════════════════
# 1. index.html
# ═══════════════════════════════════════════════════
print("\n[1] Processing index.html...")
with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()

original_len = len(content)

# 1a. Remove rajasthan line from YUGMA_STATES
content = re.sub(
    r"^\s*rajasthan:\s*\{[^\n]*heritage:\s*'Amber Fort'[^\n]*\},?\s*\n",
    '', content, flags=re.MULTILINE
)
log("  Removed rajasthan entry from YUGMA_STATES")

# 1b. Remove assam line from YUGMA_STATES
content = re.sub(
    r"^\s*assam:\s*\{[^\n]*heritage:\s*'Rang Ghar[^\n]*\},?\s*\n",
    '', content, flags=re.MULTILINE
)
log("  Removed assam entry from YUGMA_STATES")

# 1c. Remove Amber Fort entry from rajasthan monument details array
content, ok = remove_json_array_entry(content, 'rajasthan', r'"name"\s*:\s*"Amber Fort')
if ok:
    log("  Removed Amber Fort from rajasthan monument details")
else:
    log("  WARNING: Could not find Amber Fort in rajasthan monument details")

# 1d. Remove Rang Ghar entry from assam monument details array
content, ok = remove_json_array_entry(content, 'assam', r'"name"\s*:\s*"Rang Ghar')
if ok:
    log("  Removed Rang Ghar from assam monument details")
else:
    log("  WARNING: Could not find Rang Ghar in assam monument details")

# 1e. Remove video data entries for rajasthan and assam
# These are in the YUGMA_FOLK_VIDEOS object
content = re.sub(
    r"^\s*rajasthan:\s*\{[^\n]*Kalbelia[^\n]*\},?\s*\n",
    '', content, flags=re.MULTILINE
)
content = re.sub(
    r"^\s*state_03:\s*\{[^\n]*Kalbelia[^\n]*\},?\s*\n",
    '', content, flags=re.MULTILINE
)
content = re.sub(
    r"^\s*assam:\s*\{[^\n]*Bihu[^\n]*\},?\s*\n",
    '', content, flags=re.MULTILINE
)
content = re.sub(
    r"^\s*state_10:\s*\{[^\n]*Bihu[^\n]*\},?\s*\n",
    '', content, flags=re.MULTILINE
)
log("  Removed rajasthan/assam folk video entries")

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(content)

log(f"  index.html: {original_len} -> {len(content)} bytes (removed {original_len - len(content)} bytes)")


# ═══════════════════════════════════════════════════
# 2. india_3d_map.html
# ═══════════════════════════════════════════════════
print("\n[2] Processing india_3d_map.html...")
with open('india_3d_map.html', 'r', encoding='utf-8') as f:
    content = f.read()

original_len = len(content)

# Remove rajasthan state entry
content = re.sub(
    r"^\s*rajasthan:\s*\{[^\n]*[Aa]mber[^\n]*\},?\s*\n",
    '', content, flags=re.MULTILINE
)
# Remove assam state entry
content = re.sub(
    r"^\s*assam:\s*\{[^\n]*[Rr]ang.?[Gg]har[^\n]*\},?\s*\n",
    '', content, flags=re.MULTILINE
)

with open('india_3d_map.html', 'w', encoding='utf-8') as f:
    f.write(content)

log(f"  india_3d_map.html: {original_len} -> {len(content)} bytes (removed {original_len - len(content)} bytes)")


# ═══════════════════════════════════════════════════
# 3. js/stateData.js
# ═══════════════════════════════════════════════════
print("\n[3] Processing js/stateData.js...")
with open('js/stateData.js', 'r', encoding='utf-8') as f:
    content = f.read()

original_len = len(content)

content = re.sub(
    r"^\s*rajasthan:\s*\{[^\n]*[Aa]mber[^\n]*\},?\s*\n",
    '', content, flags=re.MULTILINE
)
content = re.sub(
    r"^\s*assam:\s*\{[^\n]*[Rr]ang.?[Gg]har[^\n]*\},?\s*\n",
    '', content, flags=re.MULTILINE
)

with open('js/stateData.js', 'w', encoding='utf-8') as f:
    f.write(content)

log(f"  js/stateData.js: {original_len} -> {len(content)} bytes (removed {original_len - len(content)} bytes)")


# ═══════════════════════════════════════════════════
# 4. js/indiaGeoJSON.js  
# ═══════════════════════════════════════════════════
print("\n[4] Processing js/indiaGeoJSON.js...")
if os.path.exists('js/indiaGeoJSON.js'):
    with open('js/indiaGeoJSON.js', 'r', encoding='utf-8') as f:
        content = f.read()
    original_len = len(content)
    
    content = re.sub(
        r"^\s*rajasthan:\s*\{[^\n]*[Aa]mber[^\n]*\},?\s*\n",
        '', content, flags=re.MULTILINE
    )
    content = re.sub(
        r"^\s*assam:\s*\{[^\n]*[Rr]ang.?[Gg]har[^\n]*\},?\s*\n",
        '', content, flags=re.MULTILINE
    )
    
    with open('js/indiaGeoJSON.js', 'w', encoding='utf-8') as f:
        f.write(content)
    log(f"  js/indiaGeoJSON.js: {original_len} -> {len(content)} bytes")


# ═══════════════════════════════════════════════════
# 5. js/culturedata.js and data/cultureData.js
# ═══════════════════════════════════════════════════
print("\n[5] Processing cultureData files...")
for cdfile in ['js/culturedata.js', 'data/cultureData.js']:
    if os.path.exists(cdfile):
        with open(cdfile, 'r', encoding='utf-8') as f:
            content = f.read()
        original_len = len(content)
        
        content = re.sub(
            r"^\s*rajasthan:\s*\{[^\n]*[Aa]mber[^\n]*\},?\s*\n",
            '', content, flags=re.MULTILINE
        )
        content = re.sub(
            r"^\s*assam:\s*\{[^\n]*[Rr]ang.?[Gg]har[^\n]*\},?\s*\n",
            '', content, flags=re.MULTILINE
        )
        
        with open(cdfile, 'w', encoding='utf-8') as f:
            f.write(content)
        log(f"  {cdfile}: {original_len} -> {len(content)} bytes")


# ═══════════════════════════════════════════════════
# 6. data/states/state_03_rajasthan.js and state_10_assam.js
# ═══════════════════════════════════════════════════
print("\n[6] Processing state data files...")
for sf in ['data/states/state_03_rajasthan.js', 'data/states/state_10_assam.js']:
    if os.path.exists(sf):
        with open(sf, 'r', encoding='utf-8') as f:
            content = f.read()
        original_len = len(content)
        
        # These contain monument detail arrays - remove VR entries
        if 'rajasthan' in sf:
            content, ok = remove_json_array_entry(content, 'monuments', r'"name"\s*:\s*"Amber Fort')
            if not ok:
                # Try alternate structure
                content = re.sub(
                    r'\{[^{}]*"name"\s*:\s*"Amber Fort[^{}]*"isVR"\s*:\s*true[^{}]*\},?\s*',
                    '', content, flags=re.DOTALL
                )
        else:
            content, ok = remove_json_array_entry(content, 'monuments', r'"name"\s*:\s*"Rang Ghar')
            if not ok:
                content = re.sub(
                    r'\{[^{}]*"name"\s*:\s*"Rang Ghar[^{}]*"isVR"\s*:\s*true[^{}]*\},?\s*',
                    '', content, flags=re.DOTALL
                )
        
        with open(sf, 'w', encoding='utf-8') as f:
            f.write(content)
        log(f"  {sf}: {original_len} -> {len(content)} bytes")

print("\n" + "=" * 60)
print("PHASE 1 COMPLETE - Core data files updated")
print("=" * 60)

for msg in changes_log:
    pass  # already printed
