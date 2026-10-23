import sys
sys.stdout.reconfigure(encoding='utf-8')

with open('scratch/lepakshi_vg_body.html', 'r', encoding='utf-8') as f:
    body = f.read()

script_idx = body.find('<script')
print(f"HTML before script (length {script_idx} chars):")
print(body[:script_idx])
