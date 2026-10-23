import os, re, json, shutil

workspace_dir = r"c:\Users\LENOVO\Downloads\new sih-20260903T160606Z-1-001\new sih"

print("1. Updating thumbnails and assets...")
# Ensure amber_fort_tripo_thumb.jpg exists and is copied to data directory if needed
thumb_path = os.path.join(workspace_dir, "amber_fort_tripo_thumb.jpg")
glb_path = os.path.join(workspace_dir, "amber_fort_tripo.glb")

state_3d_dir = os.path.join(workspace_dir, "data", "states", "Rajasthan", "Amber_Fort", "3D")
if os.path.exists(state_3d_dir):
    shutil.copy2(glb_path, os.path.join(state_3d_dir, "amber_fort_tripo.glb"))
    shutil.copy2(glb_path, os.path.join(state_3d_dir, "tradition.glb"))
    shutil.copy2(thumb_path, os.path.join(state_3d_dir, "thumbnail.jpg"))
    print("  Copied 3D assets to data/states/Rajasthan/Amber_Fort/3D/")

# 2. Update all_3d_models.html and models_hub.html
for fn in ["all_3d_models.html", "models_hub.html"]:
    fp = os.path.join(workspace_dir, fn)
    with open(fp, "r", encoding="utf-8") as f:
        content = f.read()
    
    # Replace old Sketchfab thumbnail for amber_fort card
    old_card_pattern = r'(<div class="model-card" data-id="amber_fort" data-region="North">\s*<img src=")[^"]+(" alt="Amber Fort" class="card-thumb">)'
    new_card_replace = r'\g<1>amber_fort_tripo_thumb.jpg\g<2>'
    content, n1 = re.subn(old_card_pattern, new_card_replace, content)
    
    # Update amber_fort desc in MONUMENTS array if needed
    old_desc = '"desc": "Rising dramatically above Maota Lake amidst the rugged Aravalli hills, Amer Fort unites martial Rajput fortification with opulent courtly elegance. Reconstructed with ultra-detailed AI photogrammetry 3D modeling."'
    new_desc = '"desc": "Amber Fort (Amer Fort) — Fortress with domed pavilions, courtyards, and crenellated sandstone walls rising amidst the rugged Aravalli hills above Maota Lake. Reconstructed with photorealistic Tripo3D PBR geometry."'
    if old_desc in content:
        content = content.replace(old_desc, new_desc)
        print(f"  Updated desc in {fn}")
    
    with open(fp, "w", encoding="utf-8") as f:
        f.write(content)
    print(f"  [OK] Updated {fn} (replaced {n1} thumb matches)")

# 3. Update build_all_models.py
bam_path = os.path.join(workspace_dir, "build_all_models.py")
with open(bam_path, "r", encoding="utf-8") as f:
    bam_content = f.read()

# Replace sketchfab info in build_all_models.py for amber_fort
old_sketchfab = '"sketchfab_url": "https://sketchfab.com/3d-models/amber-fort-tower-9c4ae1795b4b471b898ad1bfd51f88c8"'
new_sketchfab = '"sketchfab_url": "https://studio.tripo3d.ai/3d-model/amber-fort-fortress-with-domed-pavilions-and-crenellated-sandstone-wal-0b9be45a-26e8-4b24-bc78-be0793052d6d"'
old_shortlink = '"shortlink": "https://skfb.ly/6zYpT"'
new_shortlink = '"shortlink": "https://studio.tripo3d.ai/3d-model/amber-fort-fortress-with-domed-pavilions-and-crenellated-sandstone-wal-0b9be45a-26e8-4b24-bc78-be0793052d6d"'
old_thumb = '"thumb": "https://media.sketchfab.com/models/9c4ae1795b4b471b898ad1bfd51f88c8/thumbnails/ccdb8839816a46148b90d0e06d66ceb6/d0e214c973864274a832539446054ce7.jpeg"'
new_thumb = '"thumb": "amber_fort_tripo_thumb.jpg"'
old_creator = '"creator": "Aditya (@kratasz)"'
new_creator = '"creator": "Tripo 3D AI"'

if old_sketchfab in bam_content:
    bam_content = bam_content.replace(old_sketchfab, new_sketchfab)
    bam_content = bam_content.replace(old_shortlink, new_shortlink)
    bam_content = bam_content.replace(old_thumb, new_thumb)
    bam_content = bam_content.replace(old_creator, new_creator)
    with open(bam_path, "w", encoding="utf-8") as f:
        f.write(bam_content)
    print("  [OK] Updated build_all_models.py")
else:
    print("  build_all_models.py already updated or pattern not matched")

print("\nStep 1-3 Complete!")
