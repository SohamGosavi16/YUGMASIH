import sys
sys.stdout.reconfigure(encoding='utf-8')

with open('index.html', 'r', encoding='utf-8', errors='ignore') as f:
    lines = f.readlines()

print("Line 7435 to 7465:")
for i in range(7434, 7465):
    print(f"{i+1}: {lines[i].rstrip()}")

print("\nLine 7770 to 7835:")
for i in range(7769, 7835):
    print(f"{i+1}: {lines[i].rstrip()}")

print("\nLine 7860 to 7920:")
for i in range(7859, 7920):
    print(f"{i+1}: {lines[i].rstrip()}")
