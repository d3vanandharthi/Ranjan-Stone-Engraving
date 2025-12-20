import os

FILES_TO_DELETE = [
    'images/business_altar.png',
    'images/business_resort.png',
    'images/home_gate_sign.png',
    'images/home_tulsi.png',
    'images/marble.png',
    'images/marble.webp',
    'images/memorial_azulejos.png',
    'images/memorial_restoration.png'
]

for f in FILES_TO_DELETE:
    if os.path.exists(f):
        try:
            os.remove(f)
            print(f"Deleted {f}")
        except Exception as e:
            print(f"Error deleting {f}: {e}")
    else:
         print(f"File not found: {f}")
