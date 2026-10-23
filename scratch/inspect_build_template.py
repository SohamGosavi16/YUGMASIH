import sys
sys.stdout.reconfigure(encoding='utf-8')

with open('build_all_models.py', 'r', encoding='utf-8', errors='ignore') as f:
    lines = f.readlines()

print("Lines 675 to 705:")
for i in range(674, 705):
    print(f"{i+1}: {lines[i].rstrip()[:100]}")

print("\nLines 2520 to 2542:")
for i in range(2519, 2542):
    print(f"{i+1}: {lines[i].rstrip()[:100]}")
