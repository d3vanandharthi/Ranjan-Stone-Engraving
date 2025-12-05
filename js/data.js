/**
 * Data Management for Ranjan Stone Engravings
 * Uses localStorage to simulate a database.
 */

const DEFAULT_BLOGS = [
    {
        id: 1,
        title: "The Art of Granite Engraving: A Timeless Tribute",
        date: "2024-10-15",
        author: "Ranjan Engraving",
        image: "images/granite.png",
        content: `
            <p>Granite engraving is more than just a technical process; it is an art form that has preserved history for centuries. At Ranjan Stone Engravings, we believe that every stroke on a granite slab tells a story that deserves to last forever.</p>
            <h3>Why Choose Granite?</h3>
            <p>Granite is one of the hardest natural stones, making it the perfect choice for outdoor memorials and tombstones. It withstands harsh weather conditions, ensuring that the tribute to your loved ones remains pristine for generations.</p>
            <h3>Our Process</h3>
            <p>We combine traditional hand-carving techniques with modern laser technology. This allows us to achieve photorealistic details while maintaining the depth and character of traditional engraving.</p>
        `
    },
    {
        id: 2,
        title: "Choosing the Right Stone for Your Name Plate",
        date: "2024-11-02",
        author: "Ranjan Engraving",
        image: "images/nameplate.png",
        content: `
            <p>Your home's name plate is the first thing guests see. It sets the tone for your entire property. Choosing the right material is crucial for both aesthetics and durability.</p>
            <h3>Marble vs. Granite</h3>
            <p><strong>Marble</strong> offers a classic, soft elegance. It is perfect for intricate relief work and indoor signage. However, it requires more maintenance outdoors.</p>
            <p><strong>Granite</strong>, on the other hand, is bold and virtually indestructible. It comes in various colors, from deep blacks to rich reds, making it versatile for any architectural style.</p>
        `
    },
    {
        id: 3,
        title: "Preserving Memories: The Importance of Tombstone Maintenance",
        date: "2024-11-20",
        author: "Ranjan Engraving",
        image: "images/hero.png",
        content: `
            <p>A tombstone is a sacred marker. While stone is durable, it still needs care to look its best. Here are some tips for maintaining your loved one's memorial.</p>
            <ul>
                <li><strong>Regular Cleaning:</strong> Use soft water and a non-abrasive cloth. Avoid harsh chemicals that can damage the polish.</li>
                <li><strong>Inspection:</strong> Check for any cracks or chips annually. Early detection prevents major damage.</li>
                <li><strong>Professional Restoration:</strong> If the engraving has faded, our team can re-paint or re-engrave the lettering to restore its original glory.</li>
            </ul>
        `
    }
];

const DEFAULT_GALLERY = [
    { id: 1, src: "images/memorial_tombstone.png", category: "Memorials", title: "Granite Tombstone" },
    { id: 2, src: "images/memorial_azulejos.png", category: "Memorials", title: "Azulejos Tile Monument" },
    { id: 3, src: "images/memorial_restoration.png", category: "Memorials", title: "Grave Restoration" },
    { id: 4, src: "images/home_nameplate.png", category: "Home", title: "Granite Name Plate" },
    { id: 5, src: "images/home_gate_sign.png", category: "Home", title: "Gate Signage" },
    { id: 6, src: "images/home_tulsi.png", category: "Home", title: "Tulsi Vrindavan Etching" },
    { id: 7, src: "images/business_foundation.png", category: "Business", title: "Foundation Stone" },
    { id: 8, src: "images/business_altar.png", category: "Business", title: "Altar Engraving" },
    { id: 9, src: "images/business_resort.png", category: "Business", title: "Resort Entrance Rock" },
    { id: 10, src: "images/niche_pet.png", category: "Niche", title: "Pet Memorial" }
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
                image: "images/memorial_tombstone.png"
            },
            {
                id: "home",
                title: "For Home",
                icon: "fa-home",
                description: "Premium nameplates, gate signs, and Tulsi Vrindavan etching for your dream home.",
                category: "Home",
                image: "images/home_nameplate.png"
            },
            {
                id: "business",
                title: "Business & Church",
                icon: "fa-church",
                description: "Foundation stones, altar engravings, and resort signage for institutions and businesses.",
                category: "Business",
                image: "images/business_foundation.png"
            },
            {
                id: "niche",
                title: "Specialty & Artistic",
                icon: "fa-paw",
                description: "Pet memorials, bar countertops, and custom artistic engravings.",
                category: "Niche",
                image: "images/niche_pet.png"
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
