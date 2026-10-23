import subprocess
import sys
sys.stdout.reconfigure(encoding='utf-8')

with open('taj_mahal_3d.html', 'r', encoding='utf-8', errors='ignore') as f:
    content = f.read()

start = content.find('<script id="vg-engine-script">') + len('<script id="vg-engine-script">')
end = content.find('</script>', start)
js_code = content[start:end]

with open('scratch/test_taj_script.js', 'w', encoding='utf-8') as f:
    f.write(js_code)

res = subprocess.run(['node', '--check', 'scratch/test_taj_script.js'], capture_output=True, text=True)
print(f"Node.js check return code: {res.returncode}")
if res.returncode == 0:
    print("[SUCCESS] JavaScript syntax is 100% valid!")
else:
    print("Node.js stderr:\n", res.stderr)
