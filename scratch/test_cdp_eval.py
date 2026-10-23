import sys
sys.stdout.reconfigure(encoding='utf-8')
import subprocess, time, json, requests, asyncio, websockets

chrome_path = r"C:\Program Files\Google\Chrome\Application\chrome.exe"

async def test():
    import tempfile
    temp_dir = tempfile.mkdtemp()
    url = f"http://localhost:8080/index.html?t={int(time.time())}"
    proc = subprocess.Popen([
        chrome_path,
        "--headless=new",
        "--remote-debugging-port=9444",
        f"--user-data-dir={temp_dir}",
        "--disable-gpu",
        "--no-sandbox",
        "--disable-cache",
        url
    ])
    
    await asyncio.sleep(4)
    
    try:
        res = requests.get("http://localhost:9444/json")
        targets = res.json()
        target = next(t for t in targets if t.get('type') == 'page')
        ws_url = target['webSocketDebuggerUrl']
        
        async with websockets.connect(ws_url) as ws:
            # Enable console
            await ws.send(json.dumps({"id": 1, "method": "Runtime.enable"}))
            await ws.send(json.dumps({"id": 2, "method": "Console.enable"}))
            
            # Helper to evaluate expression and get result
            curr_id = 10
            async def evaluate(expr):
                nonlocal curr_id
                curr_id += 1
                msg = {"id": curr_id, "method": "Runtime.evaluate", "params": {"expression": expr, "returnByValue": True}}
                await ws.send(json.dumps(msg))
                # read until response with this id
                while True:
                    resp = json.loads(await ws.recv())
                    if resp.get("method") == "Runtime.consoleAPICalled":
                        args = [a.get("value", a.get("description", "")) for a in resp["params"]["args"]]
                        print("CONSOLE:", " ".join(str(x) for x in args))
                    elif resp.get("method") == "Runtime.exceptionThrown":
                        details = resp["params"]["exceptionDetails"]
                        print("EXCEPTION:", details.get("text"), details.get("exception", {}).get("description"))
                    elif resp.get("id") == curr_id:
                        return resp.get("result", {}).get("result", {}).get("value")

            # Check initial drawer
            r = await evaluate("""(() => {
                const d = document.getElementById('state-drawer');
                return {
                    found: !!d,
                    className: d ? d.className : null,
                    inert: d ? d.hasAttribute('inert') : null,
                    transform: d ? window.getComputedStyle(d).transform : null,
                    visibility: d ? window.getComputedStyle(d).visibility : null,
                    opacity: d ? window.getComputedStyle(d).opacity : null,
                    zIndex: d ? window.getComputedStyle(d).zIndex : null
                };
            })()""")
            print("\nInitial drawer state:", json.dumps(r, indent=2))
            
            # Check what states are available in dropdown and pill buttons
            r_ui = await evaluate("""(() => {
                const pills = Array.from(document.querySelectorAll('.pill-btn')).map(b => ({ text: b.innerText, state: b.dataset.state }));
                const options = Array.from(document.querySelectorAll('#state-select-dropdown option')).map(o => ({ text: o.innerText, value: o.value }));
                return { pills, optionsCount: options.length };
            })()""")
            print("\nUI elements for opening states:", json.dumps(r_ui, indent=2))

            # Try selectStateById('maharashtra')
            print("\nCalling selectStateById('maharashtra')...")
            r_sel = await evaluate("""(() => {
                try {
                    window.selectStateById('maharashtra');
                    return { ok: true };
                } catch(e) {
                    return { error: e.stack || e.message };
                }
            })()""")
            print("selectStateById result:", json.dumps(r_sel, indent=2))
            
            # Check drawer state now
            r_after = await evaluate("""(() => {
                const d = document.getElementById('state-drawer');
                return {
                    found: !!d,
                    className: d ? d.className : null,
                    inert: d ? d.hasAttribute('inert') : null,
                    transform: d ? window.getComputedStyle(d).transform : null,
                    visibility: d ? window.getComputedStyle(d).visibility : null,
                    opacity: d ? window.getComputedStyle(d).opacity : null,
                    zIndex: d ? window.getComputedStyle(d).zIndex : null,
                    title: document.getElementById('sd-title')?.innerText,
                    sitesCount: document.getElementById('sd-sites-count')?.innerText,
                    sitesListLength: document.getElementById('sd-sites-list')?.children?.length
                };
            })()""")
            print("\nDrawer state after selectStateById:", json.dumps(r_after, indent=2))
            
            # Now let's test clicking on a pill button:
            print("\nClicking first pill button...")
            r_pill_click = await evaluate("""(() => {
                try {
                    const btn = document.querySelector('.pill-btn');
                    btn.click();
                    return { ok: true, state: btn.dataset.state };
                } catch(e) {
                    return { error: e.stack };
                }
            })()""")
            print("Pill click result:", json.dumps(r_pill_click, indent=2))
            
            # Now let's test clicking on a state pin on the globe!
            print("\nTesting what happens when clicking a pin on the globe...")
            r_pin = await evaluate("""(() => {
                const pin = document.querySelector('.globe-state-pin');
                if (!pin) return { error: 'No pins found on globe' };
                pin.click();
                const drawer = document.getElementById('state-drawer');
                const modal = document.getElementById('arvr-modal');
                return {
                    pinState: pin.dataset.id,
                    drawerHasActiveClass: drawer?.classList.contains('active'),
                    modalHasActiveClass: modal?.classList.contains('active'),
                    modalTitle: document.getElementById('arvr-title')?.innerText
                };
            })()""")
            print("Pin click result:", json.dumps(r_pin, indent=2))
            
            # Now let's test clicking the return to drawer button in the AR/VR modal
            print("\nTesting click on 'arvr-to-drawer-btn' inside AR/VR modal...")
            r_to_drawer = await evaluate("""(() => {
                const btn = document.getElementById('arvr-to-drawer-btn');
                if (!btn) return { error: 'arvr-to-drawer-btn not found' };
                btn.click();
                const drawer = document.getElementById('state-drawer');
                const modal = document.getElementById('arvr-modal');
                return {
                    drawerHasActiveClass: drawer?.classList.contains('active'),
                    modalHasActiveClass: modal?.classList.contains('active'),
                    drawerDataset: drawer?.dataset.stateId,
                    drawerTitle: document.getElementById('sd-title')?.innerText
                };
            })()""")
            print("arvr-to-drawer-btn click result:", json.dumps(r_to_drawer, indent=2))
            
            # Now let's test each state in YUGMA_STATES or dropdown
            print("\nTesting other states in drawer:")
            test_states = ['rajasthan', 'uttar_pradesh', 'delhi', 'gujarat', 'punjab', 'karnataka', 'tamil_nadu', 'kerala', 'odisha', 'bihar', 'goa', 'assam'];
            for st in test_states:
                r_st = await evaluate(f"""(() => {{
                    try {{
                        window.selectStateById('{st}');
                        const d = document.getElementById('state-drawer');
                        return {{
                            ok: true,
                            active: d?.classList.contains('active'),
                            title: document.getElementById('sd-title')?.innerText,
                            sitesCount: document.getElementById('sd-sites-count')?.innerText,
                            sitesListHTML: document.getElementById('sd-sites-list')?.innerHTML?.substring(0, 100)
                        }};
                    }} catch(e) {{
                        return {{ error: e.stack || e.message }};
                    }}
                }})()""")
                print(f"State '{st}':", r_st)

    finally:
        proc.terminate()

asyncio.run(test())
