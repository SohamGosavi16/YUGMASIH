import sys, re
sys.stdout.reconfigure(encoding='utf-8')

with open('index.html', 'r', encoding='utf-8', errors='ignore') as f:
    text = f.read()

m = re.search(r'const HERITAGE_SITES_BY_STATE = \{(.*?)\n    \};', text, re.DOTALL)
if m:
    raw = m.group(1)
    states = re.findall(r'^\s*["\']?([a-z0-9_]+)["\']?\s*:\s*\[(.*?)\]\s*(?:,|\n|$)', raw, re.DOTALL | re.MULTILINE)
    for st, body in states:
        # find sites
        sites = re.findall(r'name["\']?\s*:\s*["\']([^"\']+)["\']', body)
        isvr = re.findall(r'isVR["\']?\s*:\s*(true|false)', body)
        vrkeys = re.findall(r'vrKey["\']?\s*:\s*["\']([^"\']+)["\']', body)
        vrpaths = re.findall(r'vrPath["\']?\s*:\s*["\']([^"\']+)["\']', body)
        print(f"State: {st} -> {len(sites)} sites | isVR: {len(isvr)} | vrKeys: {vrkeys} | vrPaths: {vrpaths}")
