import subprocess, time, json, requests, websockets, asyncio, tempfile

async def run():
    temp_dir = tempfile.mkdtemp()
    url = f'http://localhost:8080/index.html?t={int(time.time())}'
    proc = subprocess.Popen([
        r'C:\Program Files\Google\Chrome\Application\chrome.exe',
        '--headless=new',
        '--remote-debugging-port=9447',
        f'--user-data-dir={temp_dir}',
        '--disable-gpu',
        '--no-sandbox',
        '--disable-cache',
        '--window-size=1920,1080',
        url
    ])
    await asyncio.sleep(4)
    try:
        res = requests.get('http://localhost:9447/json')
        target = next(t for t in res.json() if t.get('type') == 'page')
        async with websockets.connect(target['webSocketDebuggerUrl']) as ws:
            await ws.send(json.dumps({'id': 1, 'method': 'Runtime.enable'}))
            await ws.recv()
            await ws.send(json.dumps({'id': 2, 'method': 'Console.enable'}))
            await ws.recv()
            
            req_id = 10
            exceptions = []
            async def eval_js(code):
                nonlocal req_id
                req_id += 1
                await ws.send(json.dumps({'id': req_id, 'method': 'Runtime.evaluate', 'params': {'expression': code, 'returnByValue': True}}))
                while True:
                    r = json.loads(await ws.recv())
                    if r.get("method") == "Runtime.exceptionThrown":
                        details = r["params"]["exceptionDetails"]
                        exceptions.append(details.get("text") + " " + str(details.get("exception", {}).get("description")))
                    elif r.get('id') == req_id:
                        return r.get('result', {}).get('result', {}).get('value')

            # 1. Test clicking Rajasthan pin on globe
            print("1. Clicking Rajasthan pin on globe...")
            click_raj = await eval_js('''(() => {
                const pin = document.querySelector('.globe-state-pin[data-id="rajasthan"]');
                if (!pin) return { error: "Rajasthan pin not found on globe" };
                pin.click();
                return { ok: true };
            })()''')
            print("  Result:", click_raj)
            await asyncio.sleep(1.0)
            
            drawer_raj = await eval_js('''(() => {
                const d = document.getElementById('state-drawer');
                const cs = window.getComputedStyle(d);
                return {
                    active: d.classList.contains('active'),
                    transform: cs.transform,
                    visibility: cs.visibility,
                    opacity: cs.opacity,
                    title: document.getElementById('sd-title').innerText,
                    region: document.getElementById('sd-region').innerText,
                    traditionTag: document.getElementById('sd-tradition-tag').innerText,
                    heritageTag: document.getElementById('sd-heritage-tag').innerText,
                    sitesCount: document.getElementById('sd-sites-count').innerText,
                    amberFortVRButton: Array.from(document.querySelectorAll('.site-btn-vr')).map(b => b.innerText)
                };
            })()''')
            print("  Drawer Info for Rajasthan:", json.dumps(drawer_raj, indent=2))

            # 2. Test clicking Card 1 (Heritage AR/VR Portal) in Rajasthan Drawer
            print("\n2. Clicking Card 1 (Heritage AR/VR Portal) in Rajasthan Drawer...")
            await eval_js("document.getElementById('card-arvr').click()")
            await asyncio.sleep(0.5)
            
            modal_raj = await eval_js('''(() => {
                const m = document.getElementById('arvr-modal');
                return {
                    modalActive: m.classList.contains('active'),
                    title: document.getElementById('arvr-title').innerText,
                    desc: document.getElementById('arvr-desc').innerText,
                    launchBtnText: document.getElementById('arvr-launch-btn').innerText,
                    launchBtnHref: document.getElementById('arvr-launch-btn').getAttribute('href'),
                    toDrawerBtnText: document.getElementById('arvr-to-drawer-btn').innerText
                };
            })()''')
            print("  Modal Info for Rajasthan:", json.dumps(modal_raj, indent=2))

            # 3. Test clicking 'arvr-to-drawer-btn' to return to Drawer
            print("\n3. Returning to Drawer via 'arvr-to-drawer-btn'...")
            await eval_js("document.getElementById('arvr-to-drawer-btn').click()")
            await asyncio.sleep(1.0)
            
            drawer_return = await eval_js('''(() => {
                const d = document.getElementById('state-drawer');
                return {
                    active: d.classList.contains('active'),
                    stateId: d.dataset.stateId,
                    title: document.getElementById('sd-title').innerText
                };
            })()''')
            print("  Drawer Return State:", json.dumps(drawer_return, indent=2))

            # 4. Test Assam via dropdown
            print("\n4. Selecting Assam via dropdown...")
            await eval_js('''(() => {
                const sel = document.getElementById('state-select-dropdown');
                sel.value = 'assam';
                sel.dispatchEvent(new Event('change'));
            })()''')
            await asyncio.sleep(1.0)
            
            drawer_assam = await eval_js('''(() => {
                const d = document.getElementById('state-drawer');
                return {
                    active: d.classList.contains('active'),
                    title: document.getElementById('sd-title').innerText,
                    traditionTag: document.getElementById('sd-tradition-tag').innerText,
                    sitesCount: document.getElementById('sd-sites-count').innerText,
                    firstVRBtn: document.querySelector('.site-btn-vr')?.innerText
                };
            })()''')
            print("  Drawer Info for Assam:", json.dumps(drawer_assam, indent=2))

            # 5. Test Close Drawer Button
            print("\n5. Testing Drawer Close Button...")
            await eval_js("document.getElementById('drawer-close-btn').click()")
            await asyncio.sleep(0.6)
            
            drawer_closed = await eval_js('''(() => {
                const d = document.getElementById('state-drawer');
                const cs = window.getComputedStyle(d);
                return {
                    active: d.classList.contains('active'),
                    inert: d.hasAttribute('inert'),
                    transform: cs.transform,
                    visibility: cs.visibility,
                    opacity: cs.opacity
                };
            })()''')
            print("  Drawer After Close:", json.dumps(drawer_closed, indent=2))
            
            # 6. Check for any runtime exceptions caught during all flows
            print("\n6. Checking for runtime exceptions across all interactions...")
            print("  Exceptions count:", len(exceptions))
            if exceptions:
                for e in exceptions:
                    print("  -", e)
            else:
                print("  ALL FLOWS EXECUTED PERFECTLY WITH ZERO EXCEPTIONS!")

    finally:
        proc.terminate()

asyncio.run(run())
