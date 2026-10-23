import asyncio
import json
import subprocess
import requests
import websockets

chrome_path = r"C:\Program Files\Google\Chrome\Application\chrome.exe"

async def run_cdp_test():
    proc = subprocess.Popen([
        chrome_path,
        "--headless=new",
        "--remote-debugging-port=9222",
        "--disable-gpu",
        "--no-sandbox"
    ])
    
    await asyncio.sleep(2)
    
    try:
        res = requests.get("http://localhost:9222/json")
        targets = res.json()
        target = next(t for t in targets if t['type'] == 'page')
        ws_url = target['webSocketDebuggerUrl']
        
        async with websockets.connect(ws_url) as ws:
            msg_id = 1
            callbacks = {}
            
            async def send(method, params=None):
                nonlocal msg_id
                m_id = msg_id
                msg_id += 1
                fut = asyncio.get_event_loop().create_future()
                callbacks[m_id] = fut
                payload = {"id": m_id, "method": method}
                if params: payload["params"] = params
                await ws.send(json.dumps(payload))
                return await fut

            async def listen():
                try:
                    while True:
                        msg = await ws.recv()
                        data = json.loads(msg)
                        if "id" in data and data["id"] in callbacks:
                            callbacks[data["id"]].set_result(data.get("result", data.get("error")))
                        elif data.get("method") == "Runtime.consoleAPICalled":
                            args = [a.get("value", a.get("description", "")) for a in data["params"]["args"]]
                            msg_type = data["params"]["type"]
                            print(f"CONSOLE [{msg_type}]:", " ".join(str(x) for x in args))
                        elif data.get("method") == "Runtime.exceptionThrown":
                            details = data["params"]["exceptionDetails"]
                            ex = details.get("exception", {}).get("description") or details.get("text")
                            print("EXCEPTION:", ex)
                except asyncio.CancelledError:
                    pass

            listen_task = asyncio.create_task(listen())

            await send("Console.enable")
            await send("Runtime.enable")
            await send("Page.enable")
            
            await send("Page.navigate", {"url": "http://localhost:8080/index.html"})
            await asyncio.sleep(4)
            
            check_eval = """
            (() => {
                const d = document.getElementById('state-drawer');
                if (!d) return { error: 'state-drawer not in DOM' };
                const comp = window.getComputedStyle(d);
                return {
                    className: d.className,
                    hasInert: d.hasAttribute('inert'),
                    ariaHidden: d.getAttribute('aria-hidden'),
                    transform: comp.transform,
                    visibility: comp.visibility,
                    opacity: comp.opacity,
                    zIndex: comp.zIndex,
                    datasetState: d.dataset.stateId,
                    title: document.getElementById('sd-title')?.innerText,
                    sitesCount: document.getElementById('sd-sites-count')?.innerText,
                    sitesListChildren: document.getElementById('sd-sites-list')?.children?.length
                };
            })()
            """
            
            r1 = await send("Runtime.evaluate", {"expression": check_eval, "returnByValue": True})
            print("\nInitial Drawer State:", json.dumps(r1.get("result", {}).get("value"), indent=2))
            
            # Now trigger state selection
            print("\nTriggering selectStateById('maharashtra')...")
            r_call = await send("Runtime.evaluate", {
                "expression": "(() => { try { window.selectStateById('maharashtra'); return { ok: true }; } catch(e) { return { err: e.stack || e.message }; } })()",
                "returnByValue": True
            })
            print("selectStateById result:", json.dumps(r_call.get("result", {}).get("value"), indent=2))
            
            await asyncio.sleep(1)
            
            r2 = await send("Runtime.evaluate", {"expression": check_eval, "returnByValue": True})
            print("\nDrawer State After selectStateById:", json.dumps(r2.get("result", {}).get("value"), indent=2))
            
            # Now let's test what happens when clicking card-arvr or a site button
            print("\nTesting click on card-arvr (Heritage 3D model card)...")
            r_card = await send("Runtime.evaluate", {
                "expression": "(() => { try { document.getElementById('card-arvr')?.click(); return { ok: true, arvrModalActive: document.getElementById('arvr-modal')?.classList.contains('active') }; } catch(e) { return { err: e.stack }; } })()",
                "returnByValue": True
            })
            print("card-arvr click result:", json.dumps(r_card.get("result", {}).get("value"), indent=2))
            
            # Now let's test what happens when clicking arvr-to-drawer-btn
            print("\nTesting click on arvr-to-drawer-btn (Return to Drawer from Modal)...")
            r_back = await send("Runtime.evaluate", {
                "expression": "(() => { try { document.getElementById('arvr-to-drawer-btn')?.click(); return { ok: true, drawerActive: document.getElementById('state-drawer')?.classList.contains('active'), modalActive: document.getElementById('arvr-modal')?.classList.contains('active') }; } catch(e) { return { err: e.stack }; } })()",
                "returnByValue": True
            })
            print("arvr-to-drawer-btn click result:", json.dumps(r_back.get("result", {}).get("value"), indent=2))

            # Now let's test pin click
            print("\nTesting pin click...")
            r_pin = await send("Runtime.evaluate", {
                "expression": "(() => { const p = document.querySelector('.globe-state-pin'); if (!p) return { error: 'no pins' }; p.click(); return { ok: true, modalActive: document.getElementById('arvr-modal')?.classList.contains('active'), drawerActive: document.getElementById('state-drawer')?.classList.contains('active') }; })()",
                "returnByValue": True
            })
            print("Pin click result:", json.dumps(r_pin.get("result", {}).get("value"), indent=2))

            listen_task.cancel()
    finally:
        proc.terminate()

if __name__ == "__main__":
    asyncio.run(run_cdp_test())
