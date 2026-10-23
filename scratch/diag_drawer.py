import subprocess, time, json, requests, websockets, asyncio, tempfile

async def run():
    temp_dir = tempfile.mkdtemp()
    url = f'http://localhost:8080/index.html?t={int(time.time())}'
    proc = subprocess.Popen([
        r'C:\Program Files\Google\Chrome\Application\chrome.exe',
        '--headless=new',
        '--remote-debugging-port=9446',
        f'--user-data-dir={temp_dir}',
        '--disable-gpu',
        '--no-sandbox',
        '--disable-cache',
        '--window-size=1920,1080',
        url
    ])
    await asyncio.sleep(4)
    try:
        res = requests.get('http://localhost:9446/json')
        target = next(t for t in res.json() if t.get('type') == 'page')
        async with websockets.connect(target['webSocketDebuggerUrl']) as ws:
            await ws.send(json.dumps({'id': 1, 'method': 'Runtime.enable'}))
            await ws.recv()
            
            req_id = 10
            async def eval_js(code):
                nonlocal req_id
                req_id += 1
                await ws.send(json.dumps({'id': req_id, 'method': 'Runtime.evaluate', 'params': {'expression': code, 'returnByValue': True}}))
                while True:
                    r = json.loads(await ws.recv())
                    if r.get('id') == req_id:
                        return r.get('result', {}).get('result', {}).get('value')
            
            # Call selectStateById
            print('Calling selectStateById...')
            await eval_js("window.selectStateById('maharashtra')")
            
            # Check immediately
            immed = await eval_js('''(() => {
                const el = document.getElementById('state-drawer');
                const cs = window.getComputedStyle(el);
                return {
                    class: el.className,
                    transform: cs.transform,
                    opacity: cs.opacity,
                    visibility: cs.visibility,
                    titleText: document.getElementById('sd-title').innerHTML
                };
            })()''')
            print('Immediate:', json.dumps(immed, indent=2))
            
            # Wait 1 second
            await asyncio.sleep(1.0)
            
            after_1s = await eval_js('''(() => {
                const el = document.getElementById('state-drawer');
                const cs = window.getComputedStyle(el);
                return {
                    class: el.className,
                    transform: cs.transform,
                    opacity: cs.opacity,
                    visibility: cs.visibility,
                    titleText: document.getElementById('sd-title').innerHTML
                };
            })()''')
            print('After 1s:', json.dumps(after_1s, indent=2))
    finally:
        proc.terminate()

asyncio.run(run())
