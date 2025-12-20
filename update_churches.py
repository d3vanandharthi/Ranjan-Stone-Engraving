import re

# List of files to update
files = [
    r"c:\Users\d3van\OneDrive\Desktop\RanjanEngravings\anti\ranjan_stone_engravings\index.html",
    r"c:\Users\d3van\OneDrive\Desktop\RanjanEngravings\anti\ranjan_stone_engravings\about.html",
    r"c:\Users\d3van\OneDrive\Desktop\RanjanEngravings\anti\ranjan_stone_engravings\services.html",
    r"c:\Users\d3van\OneDrive\Desktop\RanjanEngravings\anti\ranjan_stone_engravings\gallery.html",
    r"c:\Users\d3van\OneDrive\Desktop\RanjanEngravings\anti\ranjan_stone_engravings\blog.html",
    r"c:\Users\d3van\OneDrive\Desktop\RanjanEngravings\anti\ranjan_stone_engravings\contact.html",
    r"c:\Users\d3van\OneDrive\Desktop\RanjanEngravings\anti\ranjan_stone_engravings\memorials-gravestones-goa.html",
    r"c:\Users\d3van\OneDrive\Desktop\RanjanEngravings\anti\ranjan_stone_engravings\name-plates-house-signs-goa.html",
    r"c:\Users\d3van\OneDrive\Desktop\RanjanEngravings\anti\ranjan_stone_engravings\nri-overseas-stone-services.html",
    r"c:\Users\d3van\OneDrive\Desktop\RanjanEngravings\anti\ranjan_stone_engravings\service-detail.html",
]

# New church content
new_churches = '''                        <!-- North Goa Churches -->
                        <div class="directory-category">
                            <strong>North Goa Parishes (Bardez, Pernem, Bicholim)</strong>
                            <p>St. Thomas (Aldona), St. Alex (Calangute), St. Jerome (Mapusa), St. Anthony (Siolim), Our Lady of Grace (Bicholim), St. Michael (Anjuna), St. Cajetan (Assagao), Our Lady of Hope (Candolim), St. Diogo (Guirim), St. Francis Xavier (Duler), Our Lady of Penha de Franca, Holy Family (Porvorim), St. Anne (Parra), St. Christopher (Tivim), Our Lady of Lourdes (Valpoi), St. Lawrence (Sinquerim), Holy Magi (Reis Magos), Our Lady of Remedios (Nerul), St. Cajetan (Bastora), St. Francis of Assisi (Colvale), St. Joseph (Pernem), Mt. Carmel (Arambol), St. Anthony (Vagator), Miracle Church (Sirsaim), St. Clara (Assonora), St. Rita (Camurlim), Our Lady of Victory (Revora).</p>
                        </div>

                        <!-- Central Churches -->
                        <div class="directory-category">
                            <strong>Panjim, Old Goa & Ponda Parishes</strong>
                            <p>Imm. Conception (Panjim), Basilica of Bom Jesus (Old Goa), Se Cathedral, St. Inez (Panjim), St. Sebastian (Fontainhas), Our Lady of Merces, St. Bartholomew (Ribandar), St. Cruz (Santa Cruz), St. Andre (Goa Velha), Our Lady of Pillar, St. Anne (Talaulim), St. Lawrence (Agassaim), St. John Baptist (Corlim), St. Anne (Ponda), St. Francis Xavier (Borim), St. Joseph (Shiroda), St. Francis Xavier (Usgao), St. Matthew (Azossim), St. Dominic (Bainguinim), St. Catherine (Old Goa).</p>
                        </div>

                        <!-- South Goa Churches -->
                        <div class="directory-category">
                            <strong>South Goa Parishes (Salcete, Vasco, Quepem)</strong>
                            <p>Holy Spirit (Margao), St. Andrew (Vasco), St. John Baptist (Benaulim), Our Lady of Rosary (Fatorda), St. Alex (Curtorim), Our Lady of Snows (Raia), Our Lady of Snows (Rachol), Holy Cross (Verna), Saviour of the World (Loutolim), Three Kings (Cansaulim), St. Thomas (Cansaulim), St. Francis Xavier (Dabolim), St. Andrew (Mormugao), Our Lady of Glory (Varca), Our Lady of Hope (Chinchinim), St. Michael (Orlim), Our Lady of Succour (Carmona), St. Anthony (Curchorem), St. Anne (Quepem), Guardian Angel (Sanvordem), St. Thérèse (Canacona), St. Anne (Agonda), St. Francis Xavier (Chicalim), Our Lady of Assumption (Dicarpale), Our Lady of Bethlehem (Chandor).</p>
                        </div>'''

# Pattern to match the old church section
pattern = re.compile(
    r'(\s*<!-- Church Landmarks -->.*?</div>)',
    re.DOTALL
)

for filepath in files:
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Replace the old church section
        new_content = pattern.sub(new_churches, content)
        
        if new_content != content:
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(new_content)
            print(f"✓ Updated: {filepath.split('\\\\')[-1]}")
        else:
            print(f"⚠ No match found in: {filepath.split('\\\\')[-1]}")
    except Exception as e:
        print(f"✗ Error in {filepath.split('\\\\')[-1]}: {e}")

print("\n✓ Church directory update complete!")
