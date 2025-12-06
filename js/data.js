/**
 * Data Management for Ranjan Stone Engravings
 * Uses localStorage to simulate a database.
 */

const DEFAULT_BLOGS = [
    {
        id: 1,
        title: "Granite vs. Marble: Which is Best for Your Home?",
        date: "2024-12-01",
        author: "Devanand",
        image: "images/granite.webp",
        content: `
            <p>When it comes to choosing natural stone for your home, the debate often settles on two giants: Granite and Marble. Both offer distinct beauty and advantages, but the right choice depends on your lifestyle and where the stone will be used.</p>
            <h3>Granite: The Durable Warrior</h3>
            <p>Granite is an igneous rock, formed from cooling magma. This makes it incredibly hard and durable. It is resistant to heat, scratches, and stains, making it the ideal choice for high-traffic areas like kitchen countertops and outdoor nameplates.</p>
            <h3>Marble: The Elegant Beauty</h3>
            <p>Marble is a metamorphic rock, known for its classic veins and smooth finish. It exudes luxury and sophistication. However, it is softer and more porous than granite, making it susceptible to etching from acidic substances. It is best suited for bathroom vanities, fireplace surrounds, and decorative flooring.</p>
            <h3>The Verdict</h3>
            <p>If you need a stone that can withstand the elements and heavy use, go with <strong>Granite</strong>. If you prioritize timeless elegance and are willing to provide a little extra care, <strong>Marble</strong> is unmatched.</p>
        `
    },
    {
        id: 2,
        title: "The History of Azulejos: Goa's Painted Tiles",
        date: "2024-11-25",
        author: "Ranjan Engraving",
        image: "images/memorial_azulejos.webp",
        content: `
            <p>Walk through the streets of Panjim or Old Goa, and you will see them everywhere—beautiful blue and white ceramic tiles adorning the walls. These are <strong>Azulejos</strong>, a legacy of the Portuguese era that has become an integral part of Goan identity.</p>
            <h3>Origins</h3>
            <p>The term 'Azulejo' comes from the Arabic word 'az-zulayj', meaning 'polished stone'. The Portuguese adopted this art form in the 15th century and brought it to Goa. Originally used to depict religious scenes and historical events, they evolved to include floral patterns and geometric designs.</p>
            <h3>Modern Application</h3>
            <p>Today, Azulejos are not just for churches. We create custom Azulejos nameplates and house numbers that blend this traditional art with modern aesthetics. They are weather-resistant and add a unique, cultural touch to any Goan home.</p>
        `
    },
    {
        id: 3,
        title: "Caring for Your Loved One's Tombstone",
        date: "2024-11-15",
        author: "Devanand",
        image: "images/memorial_tombstone.webp",
        content: `
            <p>A tombstone is a lasting tribute to a life well-lived. However, exposure to rain, sun, and dust can cause it to weather over time. Proper maintenance ensures that the memorial remains dignified and legible for generations.</p>
            <h3>Cleaning Tips</h3>
            <ul>
                <li><strong>Water is Best:</strong> Start with clean water and a soft brush. Avoid pressure washers, as they can damage the stone's surface.</li>
                <li><strong>Neutral Cleaners:</strong> If water isn't enough, use a pH-neutral cleaner specifically designed for stone. Avoid household detergents with acids or bleach.</li>
                <li><strong>Biological Growth:</strong> Moss and lichen can trap moisture. Gently scrape them off with a wooden or plastic scraper, never metal.</li>
            </ul>
            <h3>Restoration</h3>
            <p>If the inscription has faded, do not attempt to paint it yourself with standard paint. We offer professional re-gilding services using weather-resistant gold leaf paint that restores the original luster without harming the stone.</p>
        `
    },
    {
        id: 4,
        title: "Why Gold Leaf Engraving is the Gold Standard",
        date: "2024-11-05",
        author: "Ranjan Engraving",
        image: "images/business_foundation.webp",
        content: `
            <p>When you see a nameplate or foundation stone that gleams brilliantly even from a distance, it is likely finished with <strong>Gold Leaf</strong>. But what makes it superior to standard gold paint?</p>
            <h3>Real Gold</h3>
            <p>Gold leaf is made from hammering gold into extremely thin sheets. Unlike paint, which is merely colored pigment, gold leaf retains the non-tarnishing properties of the metal itself.</p>
            <h3>Longevity</h3>
            <p>Standard gold paint often turns black or fades within a few years, especially in Goa's humid climate. Gold leaf, when applied correctly with the right primer and size, can last for decades, maintaining its brilliance against the grey granite background.</p>
        `
    },
    {
        id: 5,
        title: "The Art of Hand-Carved vs. Laser Engraving",
        date: "2024-10-28",
        author: "Devanand",
        image: "images/niche_pet.webp",
        content: `
            <p>Technology has changed the stone industry, but has it replaced the artist? At Ranjan Stone Engravings, we use both hand-carving and laser technology, but for different purposes.</p>
            <h3>Hand-Carving</h3>
            <p>This is the traditional method using a chisel and mallet. It creates a deep, V-shaped groove that catches the light beautifully. It is ideal for large lettering and simple motifs where depth and character are paramount.</p>
            <h3>Laser Engraving</h3>
            <p>Laser allows for incredible precision. We can etch photorealistic portraits, intricate logos, and fine text that would be impossible by hand. It is perfect for black granite where the contrast between the polished surface and the etched grey stone creates a stunning image.</p>
            <h3>The Best of Both Worlds</h3>
            <p>We often combine these techniques—using hand-carving for the main name to give it depth, and laser etching for the portrait or decorative border.</p>
        `
    },
    {
        id: 6,
        title: "Designing the Perfect House Nameplate",
        date: "2024-10-15",
        author: "Ranjan Engraving",
        image: "images/home_nameplate.webp",
        content: `
            <p>Your nameplate is the handshake of your home. It welcomes guests and gives a hint of your style before they even step inside. Here are a few tips for designing the perfect one.</p>
            <h3>Visibility</h3>
            <p>Ensure the font size is large enough to be read from the street. High contrast is key—gold text on black granite is the most readable combination.</p>
            <h3>Style Match</h3>
            <p>If you have a modern villa, go for sleek lines and sans-serif fonts. For a Portuguese-style heritage home, an Azulejos tile or a granite slab with a classic serif font and a floral border fits perfectly.</p>
            <h3>Content</h3>
            <p>Keep it simple. The house name and the family name are essential. Adding the house number helps with delivery and navigation.</p>
        `
    }
];

const DEFAULT_GALLERY = [
    { id: 1, src: "images/memorial_tombstone.webp", category: "Memorials", title: "Granite Tombstone" },
    { id: 2, src: "images/memorial_azulejos.webp", category: "Memorials", title: "Azulejos Tile Monument" },
    { id: 3, src: "images/memorial_restoration.webp", category: "Memorials", title: "Grave Restoration" },
    { id: 4, src: "images/home_nameplate.webp", category: "Home", title: "Granite Name Plate" },
    { id: 5, src: "images/home_gate_sign.webp", category: "Home", title: "Gate Signage" },
    { id: 6, src: "images/home_tulsi.webp", category: "Home", title: "Tulsi Vrindavan Etching" },
    { id: 7, src: "images/business_foundation.webp", category: "Business", title: "Foundation Stone" },
    { id: 8, src: "images/business_altar.webp", category: "Business", title: "Altar Engraving" },
    { id: 9, src: "images/business_resort.webp", category: "Business", title: "Resort Entrance Rock" },
    { id: 10, src: "images/niche_pet.webp", category: "Niche", title: "Pet Memorial" }
];

const DataManager = {
    init: function () {
        if (!localStorage.getItem('ranjan_blogs')) {
            localStorage.setItem('ranjan_blogs', JSON.stringify(DEFAULT_BLOGS));
        }
        // Always update gallery with new images on init for this update
        localStorage.setItem('ranjan_gallery', JSON.stringify(DEFAULT_GALLERY));
    },

    getBlogs: function () {
        return JSON.parse(localStorage.getItem('ranjan_blogs')) || [];
    },

    getBlogById: function (id) {
        const blogs = this.getBlogs();
        return blogs.find(b => b.id == id);
    },

    addBlog: function (blog) {
        const blogs = this.getBlogs();
        blog.id = Date.now(); // Simple ID generation
        blog.date = new Date().toISOString().split('T')[0];
        blogs.unshift(blog);
        localStorage.setItem('ranjan_blogs', JSON.stringify(blogs));
    },

    deleteBlog: function (id) {
        let blogs = this.getBlogs();
        blogs = blogs.filter(b => b.id != id);
        localStorage.setItem('ranjan_blogs', JSON.stringify(blogs));
    },

    getGallery: function () {
        return JSON.parse(localStorage.getItem('ranjan_gallery')) || [];
    },

    addToGallery: function (item) {
        const gallery = this.getGallery();
        item.id = Date.now();
        gallery.push(item);
        localStorage.setItem('ranjan_gallery', JSON.stringify(gallery));
    },

    getServices: function () {
        return [
            {
                id: "memorials",
                title: "Memorials & Tombstones",
                icon: "fa-cross",
                description: "Granite tombstones, Azulejos tiles, and grave restoration for Catholic, Hindu, & Muslim communities.",
                category: "Memorials",
                image: "images/memorial_tombstone.webp"
            },
            {
                id: "home",
                title: "For Home",
                icon: "fa-home",
                description: "Premium nameplates, gate signs, and Tulsi Vrindavan etching for your dream home.",
                category: "Home",
                image: "images/home_nameplate.webp"
            },
            {
                id: "business",
                title: "Business & Church",
                icon: "fa-church",
                description: "Foundation stones, altar engravings, and resort signage for institutions and businesses.",
                category: "Business",
                image: "images/business_foundation.webp"
            },
            {
                id: "niche",
                title: "Specialty & Artistic",
                icon: "fa-paw",
                description: "Pet memorials, bar countertops, and custom artistic engravings.",
                category: "Niche",
                image: "images/niche_pet.webp"
            }
        ];
    },

    getTestimonials: function () {
        return [
            {
                name: "Norton Vaz",
                role: "Local Guide",
                text: "Phenomenal service and product finishing! I'm from Mumbai and have a house in Tivim, Goa. The 1st time I met Dev's family they were so kind... Absolutely fantastic!! Thank you Dev, for the fabulous stone work done."
            },
            {
                name: "David Pereira",
                role: "Client",
                text: "Really helped me with a Gravestone when one of my friends parents passed away. Devanand is really a Master at his craft. Positive: Responsiveness, Quality, Professionalism, Value."
            },
            {
                name: "Riya Paiginkar",
                role: "Client",
                text: "I would like to take this opportunity to thank Ranjan Engravings for the great service rendered to us and in particular Dev. You got me the best Design ever in just a few moments after I spoke to you."
            },
            {
                name: "Chase D'Souza",
                role: "Client",
                text: "I Liked their service and the quality of engraving they provide. beautiful and neat work, Thanks Dev for the beautiful Niche Stone."
            },
            {
                name: "Joline Almeida",
                role: "Client",
                text: "Very good work and very committed young man. A person with perfection."
            },
            {
                name: "Kynan Colaco",
                role: "Client",
                text: "Dev is very professional as compared to his competitors I came across. His work is flawless. Kudos to him and his team. Will definitely recommend him to others."
            }
        ];
    },

    getFAQs: function () {
        return [
            {
                question: "Do you offer restoration for old Portuguese graves?",
                answer: "Yes, we specialize in cleaning and re-gilding (repainting in gold) old faded lettering on ancient family graves in church cemeteries."
            },
            {
                question: "Are your nameplates weather-proof?",
                answer: "Absolutely. We use high-quality granite and weather-resistant gold leaf paint to ensure your nameplate withstands Goa's heavy monsoons."
            },
            {
                question: "Do you make temporary cross markers?",
                answer: "Yes, we provide simple marble or granite markers for immediate use after burial while the main tombstone is being prepared."
            },
            {
                question: "Can you engrave in Konkani or Portuguese?",
                answer: "Yes, we offer multilingual engraving in English, Konkani (Romimi script), and Portuguese, which is very important for many Goan families."
            },
            {
                question: "Do you do work for hotels and resorts?",
                answer: "Yes, we create rustic boulder signage, room number plaques, and wayfinding markers perfect for beach resorts and heritage hotels."
            }
        ];
    }
};

// Initialize on load
DataManager.init();
