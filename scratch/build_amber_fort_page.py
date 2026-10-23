import os, re, json

workspace_dir = r"c:\Users\LENOVO\Downloads\new sih-20260903T160606Z-1-001\new sih"

# 1. Load the multilingual scripts
with open(os.path.join(workspace_dir, "scratch", "test_amber_scripts.py"), "r", encoding="utf-8") as f:
    scripts_code = f.read()

local_env = {}
exec(scripts_code, local_env)
amber_scripts = local_env["amber_scripts"]

# 2. Load vg-master-styles and base vg-engine-script from lepakshi_temple_3d.html
with open(os.path.join(workspace_dir, "lepakshi_temple_3d.html"), "r", encoding="utf-8") as f:
    lep_html = f.read()

vg_styles = re.search(r'<style id="vg-master-styles">.*?</style>', lep_html, re.DOTALL).group(0)

vg_markup_match = re.search(r'(<!-- ══ VOICE GUIDE TRIGGER.*?<script id="vg-engine-script">)', lep_html, re.DOTALL)
vg_markup = vg_markup_match.group(1).replace("Lepakshi Veerabhadra Temple", "Amber Fort")

vg_script_match = re.search(r'<script id="vg-engine-script">(.*?)</script>', lep_html, re.DOTALL)
vg_script_body = vg_script_match.group(1)

# Replace SITE_NAME and VG_SCRIPTS in vg_script_body
vg_script_body = re.sub(
    r'var SITE_NAME = ".*?";',
    'var SITE_NAME = "Amber Fort";',
    vg_script_body
)

# Convert amber_scripts to JSON formatted for JS
# Ensure newlines in scripts are replaced with spaces or properly escaped so JS strings are clean
clean_amber_scripts = {k: " ".join(v.split()) for k, v in amber_scripts.items()}
json_scripts = json.dumps(clean_amber_scripts, ensure_ascii=False)
vg_script_body = re.sub(
    r'var VG_SCRIPTS = \{.*?\};',
    lambda m: f'var VG_SCRIPTS = {json_scripts};',
    vg_script_body,
    flags=re.DOTALL
)

complete_vg_block = f"""
{vg_markup}
{vg_script_body}
</script>
"""

# 3. Read clean base from scratch/clean_amber_base.html
base_source = os.path.join(workspace_dir, "scratch", "clean_amber_base.html")
with open(base_source, "r", encoding="utf-8") as f:
    amber_html = f.read()

# Update title and meta description
amber_html = re.sub(
    r'<title>.*?</title>',
    '<title>Amber Fort — Fortress with Domed Pavilions & Crenellated Sandstone Walls | YUGMA Indian Heritage</title>',
    amber_html
)

# Update Tripo link with full slug
full_slug_url = "https://studio.tripo3d.ai/3d-model/amber-fort-fortress-with-domed-pavilions-and-crenellated-sandstone-wal-0b9be45a-26e8-4b24-bc78-be0793052d6d?invite_code=TXXJMF"
amber_html = amber_html.replace(
    "https://studio.tripo3d.ai/3d-model/0b9be45a-26e8-4b24-bc78-be0793052d6d?invite_code=TXXJMF",
    full_slug_url
)

# Update subtitle on title card
old_sub = '<span class="monument-subtitle">UNESCO World Heritage Rajput Hill Fort & Mirror Palace Citadel</span>'
new_sub = '<span class="monument-subtitle">UNESCO World Heritage Rajput Hill Fort · Fortress with Domed Pavilions & Crenellated Walls</span>'
if old_sub in amber_html:
    amber_html = amber_html.replace(old_sub, new_sub)

# Insert Voice Guide button into top-nav nav-right before btn-info
vg_nav_btn = """      <button class="badge-btn" id="btn-voice-guide-nav" title="Launch Heritage Voice Guide" style="background: rgba(245, 158, 11, 0.2); border-color: #f59e0b; color: #fbbf24;">
        <i class="fa-solid fa-microphone-lines"></i>
        <span>VOICE GUIDE</span>
      </button>

"""
if 'id="btn-voice-guide-nav"' not in amber_html and 'id="btn-info"' in amber_html:
    amber_html = amber_html.replace('<button class="badge-btn" id="btn-info"', vg_nav_btn + '<button class="badge-btn" id="btn-info"')

# Add click event for btn-voice-guide-nav in script
nav_vg_js = """
      // Top nav voice guide button
      var vgNavBtn = document.getElementById('btn-voice-guide-nav');
      if (vgNavBtn) {
        vgNavBtn.addEventListener('click', function() {
          var vgFab = document.getElementById('btn-voice-guide');
          if (vgFab) vgFab.click();
        });
      }
"""
if 'btn-voice-guide-nav' in amber_html and 'var vgNavBtn' not in amber_html:
    amber_html = amber_html.replace("})();", nav_vg_js + "\n    })();")

# Inject vg_styles into <head>
if '<style id="vg-master-styles">' not in amber_html:
    amber_html = amber_html.replace('</head>', f'{vg_styles}\n</head>')

# Inject complete_vg_block before </body>
if 'id="vg-engine-script"' not in amber_html:
    amber_html = re.sub(r'</body>\s*</html>', lambda m: f'{complete_vg_block}\n</body>\n</html>', amber_html)

# Save both amberfort-vr.html and amber_fort_3d.html
with open(os.path.join(workspace_dir, "amberfort-vr.html"), "w", encoding="utf-8") as f:
    f.write(amber_html)

with open(os.path.join(workspace_dir, "amber_fort_3d.html"), "w", encoding="utf-8") as f:
    f.write(amber_html)

print("[OK] Generated and saved amberfort-vr.html and amber_fort_3d.html")
print(f"  Total size: {len(amber_html)} characters")
print("  Contains full slug URL:", full_slug_url in amber_html)
print("  Contains model-viewer with amber_fort_tripo.glb:", 'src="amber_fort_tripo.glb"' in amber_html)
print("  Contains vg-master-styles:", 'vg-master-styles' in amber_html)
print("  Contains voice guide fab:", 'id="btn-voice-guide"' in amber_html)
print("  Contains subtitle hud:", 'id="vg-subtitle-hud"' in amber_html)
print("  Contains 15 languages in script:", 'var VG_SCRIPTS' in amber_html and '"zh":' in amber_html)
