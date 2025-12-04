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
    { id: 1, src: "images/granite.png", category: "Granite", title: "Granite Memorial" },
    { id: 2, src: "images/marble.png", category: "Marble", title: "Marble Relief" },
    { id: 3, src: "images/nameplate.png", category: "Name Plate", title: "Custom Name Plate" }
];

const DataManager = {
    init: function () {
        if (!localStorage.getItem('ranjan_blogs')) {
            localStorage.setItem('ranjan_blogs', JSON.stringify(DEFAULT_BLOGS));
        }
        if (!localStorage.getItem('ranjan_gallery')) {
            localStorage.setItem('ranjan_gallery', JSON.stringify(DEFAULT_GALLERY));
        }
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
    }
};

// Initialize on load
DataManager.init();
