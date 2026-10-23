with open('scratch/apply_master_fix.py', 'r', encoding='utf-8') as f:
    c = f.read()

idx1 = c.find('ENGINE_JS = \'\'\'') + len('ENGINE_JS = \'\'\'')
idx2 = c.find('\'\'\'\n\ndef add_no_referrer_meta', idx1)

engine_code = c[idx1:idx2]
print("Engine JS length:", len(engine_code))
# check syntax by running node with a wrapper
test_wrapper = f"""
const window = {{
    speechSynthesis: {{
        speak: () => {{}},
        cancel: () => {{}},
        pause: () => {{}},
        resume: () => {{}},
        getVoices: () => [],
        addEventListener: () => {{}}
    }},
    location: {{ origin: 'http://localhost', pathname: '/test.html' }}
}};
const document = {{
    getElementById: () => null,
    querySelectorAll: () => [],
    createElement: () => ({{
        setAttribute: () => {{}},
        style: {{}},
        appendChild: () => {{}}
    }}),
    body: {{ appendChild: () => {{}} }},
    addEventListener: () => {{}}
}};
const SUPPORTED_LANGS = [{{ key: 'en', code: 'en-US', label: 'English', flag: 'EN' }}];
const VG_SCRIPTS = {{ en: 'Hello world test narrative.' }};

try {{
{engine_code}
console.log('Engine JS parsed successfully in Node.js!');
}} catch (e) {{
    console.error('Syntax error in Engine JS:', e);
}}
"""

with open('scratch/test_engine_syntax.js', 'w', encoding='utf-8') as f_out:
    f_out.write(test_wrapper)

print("Created scratch/test_engine_syntax.js")
