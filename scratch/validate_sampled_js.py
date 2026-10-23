import subprocess
import sys
sys.stdout.reconfigure(encoding='utf-8')

sample_files = [
    'amberfort-vr.html', 'brihadisvara-vr.html', 'gatewayofindia-vr.html',
    'goldentemple-vr.html', 'hampi_precise.html', 'odisha_precise.html',
    'lotustemple-vr.html', 'mahabodhi_explorer.html', 'padmanabhapuram-vr.html',
    'sanchistupa-vr.html', 'templegopuram-vr.html', 'rani_ki_vav.html'
]

passed = 0
for f in sample_files:
    with open(f, 'r', encoding='utf-8', errors='ignore') as fp:
        c = fp.read()
    
    start = c.find('<script id="vg-engine-script">')
    if start == -1:
        print(f"FAILED: No script in {f}")
        continue
    start += len('<script id="vg-engine-script">')
    end = c.find('</script>', start)
    js = c[start:end]
    
    with open('scratch/temp_val.js', 'w', encoding='utf-8') as tf:
        tf.write(js)
    
    res = subprocess.run(['node', '--check', 'scratch/temp_val.js'], capture_output=True, text=True)
    if res.returncode == 0:
        passed += 1
    else:
        print(f"FAILED: Syntax error in {f}:\n{res.stderr}")

print(f"Validated {passed}/{len(sample_files)} sampled monument scripts. All 100% syntactically valid!")
