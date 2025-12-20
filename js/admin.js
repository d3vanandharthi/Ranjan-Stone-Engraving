// Admin Panel Logic

// Check if logged in
if (sessionStorage.getItem('admin_logged_in')) {
    showDashboard();
}

function login() {
    const user = $('#username').val();
    const pass = $('#password').val();

    if (user === 'admin' && pass === 'admin123') {
        sessionStorage.setItem('admin_logged_in', 'true');
        showDashboard();
    } else {
        $('#login-error').show();
    }
}

function logout() {
    sessionStorage.removeItem('admin_logged_in');
    location.reload();
}

function showDashboard() {
    $('#login-section').hide();
    $('#dashboard-section').show();
    loadBlogs();
    loadGallery();
}

function switchTab(tab) {
    $('.admin-nav-item').removeClass('active');
    $('.admin-section').removeClass('active');

    $(`.admin-nav-item:contains('${tab === 'blogs' ? 'Blogs' : 'Gallery'}')`).addClass('active');
    $(`#${tab}-tab`).addClass('active');
}

// Blog Management
function loadBlogs() {
    const blogs = DataManager.getBlogs();
    const tbody = $('#blog-table-body');
    tbody.empty();

    blogs.forEach(blog => {
        tbody.append(`
            <tr>
                <td>${blog.title}</td>
                <td>${blog.date}</td>
                <td>
                    <button class="action-btn btn-danger" onclick="deleteBlogPost(${blog.id})">Delete</button>
                </td>
            </tr>
        `);
    });
}

function handleBlogSubmit(e) {
    e.preventDefault();

    const newBlog = {
        title: $('#blog-title').val(),
        author: $('#blog-author').val(),
        image: $('#blog-image').val(),
        content: $('#blog-content').val()
    };

    DataManager.addBlog(newBlog);
    loadBlogs();
    $('#blog-form')[0].reset();
    alert('Blog post added locally! Remember to "Download Data" to publish.');
}

function deleteBlogPost(id) {
    if (confirm('Are you sure you want to delete this post?')) {
        DataManager.deleteBlog(id);
        loadBlogs();
    }
}

// Gallery Management
function loadGallery() {
    const gallery = DataManager.getGallery();
    const tbody = $('#gallery-table-body');
    tbody.empty();

    gallery.forEach(item => {
        tbody.append(`
            <tr>
                <td><img src="${item.src}" style="height: 50px;"></td>
                <td>${item.title}</td>
                <td>${item.category}</td>
                <td>
                    <button class="action-btn btn-danger" onclick="deleteGalleryItem(${item.id})">Delete</button>
                </td>
            </tr>
        `);
    });
}

function handleGallerySubmit(e) {
    e.preventDefault();

    const newItem = {
        title: $('#gallery-title').val(),
        category: $('#gallery-category').val(),
        src: $('#gallery-src').val()
    };

    DataManager.addToGallery(newItem);
    loadGallery();
    $('#gallery-form')[0].reset();
    alert('Image added locally! Remember to "Download Data" to publish.');
}

function deleteGalleryItem(id) {
    if (confirm('Delete this image?')) {
        let gallery = DataManager.getGallery();
        gallery = gallery.filter(item => item.id != id);
        localStorage.setItem('ranjan_gallery', JSON.stringify(gallery));
        loadGallery();
    }
}

// Export Data
function exportData() {
    const blogs = DataManager.getBlogs();
    const gallery = DataManager.getGallery();

    // Construct the file content
    const fileContent = `/**
 * Data Management for Ranjan Stone Engravings
 * Uses localStorage to simulate a database.
 */

const DEFAULT_BLOGS = ${JSON.stringify(blogs, null, 4)};

const DEFAULT_GALLERY = ${JSON.stringify(gallery, null, 4)};

const DataManager = {
    init: function () {
        if (!localStorage.getItem('ranjan_blogs_v2')) {
            localStorage.setItem('ranjan_blogs_v2', JSON.stringify(DEFAULT_BLOGS));
        }
        // Always update gallery with new images on init for this update
        localStorage.setItem('ranjan_gallery_v2', JSON.stringify(DEFAULT_GALLERY));
    },

    getBlogs: function () {
        return JSON.parse(localStorage.getItem('ranjan_blogs_v2')) || [];
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
        localStorage.setItem('ranjan_blogs_v2', JSON.stringify(blogs));
    },

    deleteBlog: function (id) {
        let blogs = this.getBlogs();
        blogs = blogs.filter(b => b.id != id);
        localStorage.setItem('ranjan_blogs_v2', JSON.stringify(blogs));
    },

    getGallery: function () {
        return JSON.parse(localStorage.getItem('ranjan_gallery_v2')) || [];
    },

    addToGallery: function (item) {
        const gallery = this.getGallery();
        item.id = Date.now();
        gallery.push(item);
        localStorage.setItem('ranjan_gallery_v2', JSON.stringify(gallery));
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
                title: "House Name Plates",
                icon: "fa-home",
                description: "Premium nameplates, gate signs, and Tulsi Vrindavan etching for your dream home.",
                category: "Home",
                image: "images/home_nameplate.webp"
            },
            {
                id: "foundation",
                title: "Foundation & Inauguration",
                icon: "fa-building",
                description: "Official Granite Foundation Stones (Shilanyas) and Inauguration Plaques for new buildings.",
                category: "Business",
                image: "images/business_foundation.webp"
            },
            {
                id: "religious",
                title: "Temple & Church Work",
                icon: "fa-place-of-worship",
                description: "Altar engravings, Donor Name Slabs, and religious scripture inscriptions.",
                category: "Business",
                image: "images/business_altar.webp"
            },
            {
                id: "pet",
                title: "Pet Memorials",
                icon: "fa-paw",
                description: "Loving stone tributes for your faithful dogs and cats.",
                category: "Niche",
                image: "images/niche_pet.webp"
            },
            {
                id: "commercial",
                title: "Commercial Signage",
                icon: "fa-hotel",
                description: "Rustic resort entrance rocks, hotel wayfinding, and durable office signage.",
                category: "Business",
                image: "images/business_resort.webp"
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
`;

    // Create download link
    const blob = new Blob([fileContent], { type: 'text/javascript' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'data.js';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}
