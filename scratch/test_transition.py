import sys
sys.stdout.reconfigure(encoding='utf-8')
import subprocess, time, json, requests, asyncio, websockets, tempfile

chrome_path = r"C:\Program Files\Google\Chrome\Application\chrome.exe"

async def test():
    temp_dir = tempfile.mkdtemp()
    url = f"http://localhost:8080/index.html?t={int(time.time())}"
    proc = subprocess.Popen([
        chrome_path,
        "--headless=new",
        "--remote-debugging-port=9445",
        f"--user-data-dir={temp_dir}",
        "--disable-gpu",
        "--no-sandbox",
        "--disable-cache",
        url
    ])
    
    await asyncio.sleep(4)
    
    try:
        res = requests.get("http://localhost:9445/json")
        targets = res.json()
        target = next(t for t in targets if t.get('type') == 'page')
        ws_url = target['webSocketDebuggerUrl']
        
        async with websockets.connect(ws_url) as ws:
            await ws.send(json.dumps({"id": 1, "method": "Runtime.enable"}))
            
            curr_id = 10
            async def evaluate(expr):
                nonlocal curr_id
                curr_id += 1
                msg = {"id": curr_id, "method": "Runtime.evaluate", "params": {"expression": expr, "returnByValue": True}}
                await ws.send(json.dumps(msg))
                while True:
                    resp = json.loads(await ws.recv())
                    if resp.get("id") == curr_id:
                        return resp.get("result", {}).get("result", {}).get("value")

            # Call selectStateById
            await evaluate("window.selectStateById('maharashtra')")
            # Wait 500ms for CSS transition
            await asyncio.sleep(0.6)
            
            # Check computed styles now
            res_after = await evaluate("""(() => {
                const d = document.getElementById('state-drawer');
                const cs = window.getComputedStyle(d);
                return {
                    className: d.className,
                    transform: cs.transform,
                    visibility: cs.visibility,
                    opacity: cs.opacity,
                    title: document.getElementById('sd-title')?.innerText,
                    sitesCount: document.getElementById('sd-sites-count')?.innerText,
                    heritageBtnText: document.getElementById('sm-arvr-btn-label')?.innerText,
                    firstSiteVRBtn: document.querySelector('.site-btn-vr')?.innerText
                };
            })()""")
            print("Computed style after 600ms:", json.dumps(res_after, indent=2))
            
            # Test clicking on a site-btn-vr (e.g. Gateway of India VR)
            await evaluate("""(() => {
                const btn = document.querySelectorAll('.site-btn-vr')[1];
                btn.click();
            })()""")
            await asyncio.sleep(0.3)
            
            modal_state = await evaluate("""(() => {
                const modal = document.getElementById('arvr-modal');
                const cs = window.getComputedStyle(modal);
                return {
                    active: modal.classList.contains('active'),
                    visibility: cs.visibility,
                    opacity: cs.opacity,
                    title: document.getElementById('arvr-title')?.innerText,
                    launchBtn: document.getElementById('arvr-launch-btn')?.innerText,
                    launchHref: document.getElementById('arvr-launch-btn')?.getAttribute('href')
                };
            })()""")
            print("Modal state after clicking site VR button:", json.dumps(modal_state, indent=2))
            
            # Now click arvr-to-drawer-btn to return to the drawer
            await evaluate("document.getElementById('arvr-to-drawer-btn').click()")
            await asyncio.sleep(0.6)
            
            drawer_return = await evaluate("""(() => {
                const d = document.getElementById('state-drawer');
                const cs = window.getComputedStyle(d);
                return {
                    drawerActive: d.classList.contains('active'),
                    drawerTransform: cs.transform,
                    drawerVisibility: cs.visibility,
                    drawerTitle: document.getElementById('sd-title')?.innerText
                };
            })()""")
            print("Drawer state after returning from modal:", json.dumps(drawer_return, indent=2))
            
    finally:
        proc.terminate()

asyncio.run(test())
