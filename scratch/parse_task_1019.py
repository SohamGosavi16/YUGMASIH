import re, json

log_path = 'C:/Users/LENOVO/.gemini/antigravity-ide/brain/abd8d439-8105-460e-986b-ab103f828655/.system_generated/tasks/task-1019.log'
with open(log_path, 'r', encoding='utf-8', errors='ignore') as f:
    text = f.read()

print('Length of task-1019.log:', len(text))

# Let's find all script tags
scripts = re.findall(r'<script[^>]*>([\s\S]*?)</script>', text)
print(f'Total script tags: {len(scripts)}')

for i, s in enumerate(scripts):
    if '0b9be45a' in s:
        print(f'Script {i} contains 0b9be45a, length={len(s)}')
        # write it out to inspect
        with open('scratch/model_script_0b9be45a.txt', 'w', encoding='utf-8') as out:
            out.write(s)

glbs = re.findall(r'https?://[^\s"\'<>]+\.glb[^\s"\'<>]*', text)
print('GLB URLs found in text:', len(glbs))
for g in set(glbs):
    print('  GLB:', g[:100])

webps = re.findall(r'https?://[^\s"\'<>]+\.webp[^\s"\'<>]*', text)
print('WebP URLs found in text:', len(webps))
for w in set(webps):
    print('  WebP:', w)
