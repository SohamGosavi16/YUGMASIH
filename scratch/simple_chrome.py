import subprocess, time, json, requests

chrome_path = r"C:\Program Files\Google\Chrome\Application\chrome.exe"

proc = subprocess.Popen([
    chrome_path,
    "--headless=new",
    "--remote-debugging-port=9222",
    "--disable-gpu",
    "--no-sandbox",
    "http://localhost:8080/index.html"
])

print("Waiting for page load in Chrome...")
time.sleep(5)

try:
    res = requests.get("http://localhost:9222/json")
    targets = res.json()
    print("Targets found:", len(targets))
    for t in targets:
        print("Target:", t.get('type'), t.get('url'))
finally:
    proc.terminate()
