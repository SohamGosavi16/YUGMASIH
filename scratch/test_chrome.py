import subprocess, time, json, urllib.request, urllib.error

chrome_path = r"C:\Program Files\Google\Chrome\Application\chrome.exe"

# Launch headless Chrome with debugging port
proc = subprocess.Popen([
    chrome_path,
    "--headless=new",
    "--remote-debugging-port=9222",
    "--disable-gpu",
    "--no-sandbox"
])

print("Launched Chrome, waiting for port...")
time.sleep(2)

try:
    # Query targets
    req = urllib.request.urlopen("http://localhost:9222/json")
    targets = json.loads(req.read().decode())
    print("Chrome targets:", len(targets))
    
    # Create new page target pointing to index.html
    new_req = urllib.request.urlopen("http://localhost:9222/json/new?http://localhost:8080/index.html")
    page_target = json.loads(new_req.read().decode())
    print("Page target created:", page_target['id'])
    
    time.sleep(3)
    
finally:
    proc.terminate()
    print("Terminated Chrome")
