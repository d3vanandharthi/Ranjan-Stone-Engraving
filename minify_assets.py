import os
import re

CSS_DIR = 'css'
JS_DIR = 'js'

def minify_css(content):
    # Remove comments
    content = re.sub(r'/\*[\s\S]*?\*/', '', content)
    # Remove whitespace
    content = re.sub(r'\s+', ' ', content)
    content = re.sub(r'\s?([:;{}])\s?', r'\1', content)
    content = content.replace(';}', '}')
    return content.strip()

def minify_js(content):
    # Basic JS minification (removing comments and whitespace)
    # Note: RegEx minification of JS is risky. 
    # Ideally use a library, but for this project's simple JS, we can do safe removals.
    
    lines = content.split('\n')
    minified_lines = []
    
    for line in lines:
        line = line.strip()
        if not line: continue
        if line.startswith('//'): continue
        if line.startswith('/*') and line.endswith('*/'): continue
        
        # Remove partial comments
        if '//' in line and not ("'" in line or '"' in line): # Simple heuristic 
             line = line.split('//')[0].strip()
             
        minified_lines.append(line)
        
    return ' '.join(minified_lines)

def process_file(filepath, minifier):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    minified = minifier(content)
    
    base, ext = os.path.splitext(filepath)
    new_path = base + '.min' + ext
    
    with open(new_path, 'w', encoding='utf-8') as f:
        f.write(minified)
    
    orig_size = len(content)
    min_size = len(minified)
    saved = orig_size - min_size
    print(f"Minified {filepath}: {orig_size/1024:.2f}KB -> {min_size/1024:.2f}KB (Saved {saved/1024:.2f}KB)")

def main():
    # CSS
    for f in os.listdir(CSS_DIR):
        if f.endswith('.css') and not f.endswith('.min.css'):
             process_file(os.path.join(CSS_DIR, f), minify_css)
             
    # JS
    for f in os.listdir(JS_DIR):
        if f.endswith('.js') and not f.endswith('.min.js'):
             # Skip admin.js? No, minify it too if used. 
             # But admin.js writes template strings that MUST preserve structure?
             # Actually, `admin.js` has `exportData` which contains a Template String.
             # If I remove newlines from the Template String, the exported file will be one long line.
             # Which is fine for code, but if it has `//` comments inside the template string, they will comment out the rest of the line!
             # My `minify_js` is rudimentary.
             # I will SKIP `admin.js` to be safe. It's only for the Admin (1 user), speed doesn't matter much.
             if 'admin' in f:
                 print(f"Skipping {f} (Admin Panel)")
                 continue
                 
             process_file(os.path.join(JS_DIR, f), minify_js)

if __name__ == "__main__":
    main()
