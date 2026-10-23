import os
import json
import re

workspace_dir = r"c:\Users\LENOVO\Downloads\new sih-20260903T160606Z-1-001\new sih"

# Load Lepakshi styles to reuse exact CSS structure
with open(os.path.join(workspace_dir, "scratch", "lepakshi_vg_styles.html"), "r", encoding="utf-8") as f:
    vg_styles_content = f.read()

# Load Lepakshi body template to extract the JS engine functions
with open(os.path.join(workspace_dir, "scratch", "lepakshi_vg_body.html"), "r", encoding="utf-8") as f:
    lepakshi_vg_body = f.read()

print("Loaded Lepakshi VG styles (len:", len(vg_styles_content), ") and body (len:", len(lepakshi_vg_body), ")")
