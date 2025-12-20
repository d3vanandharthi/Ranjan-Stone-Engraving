import os

FILES_TO_DELETE = [
    'images/memorial_tombstone.png',
    'images/home_nameplate.png',
    'images/business_foundation.png',
    'images/niche_pet.png'
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
