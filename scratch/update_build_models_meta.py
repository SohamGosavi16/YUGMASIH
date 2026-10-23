with open('build_all_models.py', 'r', encoding='utf-8') as f:
    content = f.read()

# Add meta referrer in head of generate_standalone_html
old_head = """<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">"""

new_head = """<head>
  <meta charset="UTF-8">
  <meta name="referrer" content="no-referrer">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">"""

if old_head in content:
    content = content.replace(old_head, new_head, 1)
    print("1. Added meta referrer to generate_standalone_html in build_all_models.py")
else:
    print("Warning: old_head not found")

content = content.replace('<a href="index.html" class="badge-btn"', '<a href="index.html?guest=true" class="badge-btn"')
content = content.replace('<a href="index.html" class="nav-btn"', '<a href="index.html?guest=true" class="nav-btn"')
print("2. Updated index.html links to index.html?guest=true in build_all_models.py")

with open('build_all_models.py', 'w', encoding='utf-8') as f:
    f.write(content)
print("Updated build_all_models.py successfully!")
