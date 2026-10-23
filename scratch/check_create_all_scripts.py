import sys
sys.stdout.reconfigure(encoding='utf-8')

try:
    import create_all_scripts
    print("create_all_scripts imported successfully!")
    print(f"Monuments defined in create_all_scripts: {list(getattr(create_all_scripts, 'ALL_MONUMENT_SCRIPTS', {}).keys())}")
except Exception as e:
    print(f"Error importing create_all_scripts: {e}")
