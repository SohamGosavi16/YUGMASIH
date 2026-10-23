import sys
sys.stdout.reconfigure(encoding='utf-8')

with open('scratch/lepakshi_vg_body.html', 'r', encoding='utf-8') as f:
    body = f.read()

# Extract from <script id="vg-engine-script">
script_start = body.find('<script id="vg-engine-script">')
script_end = body.find('</script>', script_start) + len('</script>')
engine_script = body[script_start:script_end]

print(f"Engine script total length: {len(engine_script)} chars")

# Find VG_SCRIPTS in the script
idx_scripts = engine_script.find('var VG_SCRIPTS')
idx_after_scripts = engine_script.find('var currentLang', idx_scripts)

engine_prefix = engine_script[:idx_scripts]
engine_suffix = engine_script[idx_after_scripts:]

print(f"Prefix length: {len(engine_prefix)} chars")
print(f"Suffix length: {len(engine_suffix)} chars")
print("\nPrefix head:")
print(engine_prefix[:400])
print("\nSuffix head:")
print(engine_suffix[:400])

with open('scratch/vg_engine_prefix.txt', 'w', encoding='utf-8') as f:
    f.write(engine_prefix)
with open('scratch/vg_engine_suffix.txt', 'w', encoding='utf-8') as f:
    f.write(engine_suffix)
print("\nSaved engine prefix and suffix to scratch/")
