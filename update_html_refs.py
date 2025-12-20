import os
import glob

def update_refs():
    html_files = glob.glob('*.html')
    
    for fpath in html_files:
        with open(fpath, 'r', encoding='utf-8') as f:
            content = f.read()
            
        original_len = len(content)
        
        # Replace CSS
        content = content.replace('href="css/style.css"', 'href="css/style.min.css"')
        
        # Replace JS
        content = content.replace('src="js/data.js"', 'src="js/data.min.js"')
        content = content.replace('src="js/main.js"', 'src="js/main.min.js"')
        
        # Specific fix for Admin.html default value
        if 'admin.html' in fpath:
             content = content.replace('value="images/hero.png"', 'value="images/hero.webp"')
             # Handle version query string if present
             # regex or simple replace if I know the string
             # "js/data.js?v=3" -> "js/data.min.js?v=3"
             content = content.replace('src="js/data.js?v=3"', 'src="js/data.min.js?v=3"')

        if len(content) != original_len:
             # Length changes if 'min' added (longer)
             # But checks if replacement happened
             pass
        
        with open(fpath, 'w', encoding='utf-8') as f:
            f.write(content)
            
        print(f"Updated {fpath}")

if __name__ == "__main__":
    update_refs()
