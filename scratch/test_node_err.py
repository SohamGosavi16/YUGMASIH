import subprocess
import sys
sys.stdout.reconfigure(encoding='utf-8')

res = subprocess.run(['node', '--check', 'scratch/temp_index_auth.js'], capture_output=True, text=True, encoding='utf-8')
print(f"Node.js check return code: {res.returncode}")
if res.returncode == 0:
    print("[SUCCESS] index.html auth script is 100% syntactically valid!")
else:
    print("Node.js stderr:\n", res.stderr)
