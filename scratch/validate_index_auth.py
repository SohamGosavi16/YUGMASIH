import subprocess
import sys
sys.stdout.reconfigure(encoding='utf-8')

with open('index.html', 'r', encoding='utf-8', errors='ignore') as f:
    content = f.read()

# Find the auth script at the bottom of index.html
# It starts around `(function () {` and `SUPABASE_URL`
start_marker = "const SUPABASE_URL = 'https://eynqtscwrepndronybwp.supabase.co';"
start = content.find(start_marker)
if start == -1:
    print("Could not find start_marker in index.html")
    sys.exit(1)

# Find start of enclosing function or script
script_start = content.rfind('<script', 0, start)
script_tag_end = content.find('>', script_start) + 1
script_end = content.find('</script>', start)

js = content[script_tag_end:script_end]

with open('scratch/temp_index_auth.js', 'w', encoding='utf-8') as tf:
    tf.write(js)

res = subprocess.run(['node', '--check', 'scratch/temp_index_auth.js'], capture_output=True, text=True)
print(f"Node.js check return code for index.html auth script: {res.returncode}")
if res.returncode == 0:
    print("[SUCCESS] index.html auth script is 100% syntactically valid!")
else:
    print("Node.js stderr:\n", res.stderr)
