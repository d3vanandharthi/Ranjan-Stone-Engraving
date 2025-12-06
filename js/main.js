// Main JavaScript - Vanilla JS (No jQuery)

document.addEventListener('DOMContentLoaded', function () {
    // Mobile Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger) {
        hamburger.addEventListener('click', function () {
            navLinks.classList.toggle('active');
            const icon = this.querySelector('i');
            if (navLinks.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }

    // Close mobile menu when a link is clicked
    const navLinkItems = document.querySelectorAll('.nav-links a');
    navLinkItems.forEach(link => {
        link.addEventListener('click', function () {
            if (window.innerWidth <= 768) {
                navLinks.classList.remove('active');
                const icon = hamburger.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    });

    // Active Link Highlight
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    navLinkItems.forEach(link => {
        if (link.getAttribute('href') === currentPath) {
            link.classList.add('active');
        }
    });

    // Smooth Scroll (for home page anchors)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (event) {
            const hash = this.hash;
            if (hash !== "") {
                event.preventDefault();
                const target = document.querySelector(hash);
                if (target) {
                    const offsetTop = target.offsetTop - 80;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // WhatsApp Button
    const whatsappButton = document.createElement('a');
    whatsappButton.href = 'https://wa.me/919822581297';
    whatsappButton.className = 'whatsapp-float';
    whatsappButton.target = '_blank';
    whatsappButton.setAttribute('aria-label', 'Contact us on WhatsApp');
    whatsappButton.innerHTML = '<i class="fab fa-whatsapp whatsapp-icon"></i>';
    document.body.appendChild(whatsappButton);

    // Scroll to Top Button
    const scrollTopBtn = document.createElement('button');
    scrollTopBtn.id = 'scrollTopBtn';
    scrollTopBtn.title = 'Go to top';
    scrollTopBtn.setAttribute('aria-label', 'Scroll to top');
    scrollTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    document.body.appendChild(scrollTopBtn);

    // Show/hide scroll button on scroll
    window.addEventListener('scroll', function () {
        if (window.pageYOffset > 300) {
            scrollTopBtn.style.display = 'block';
        } else {
            scrollTopBtn.style.display = 'none';
        }
    });

    // Scroll to top when button clicked
    scrollTopBtn.addEventListener('click', function () {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
        return false;
    });

    // Gallery Lightbox
    const galleryGrid = document.querySelector('.gallery-grid');
    if (galleryGrid) {
        // Create lightbox HTML
        const lightboxHTML = `
            <div id="lightbox" class="lightbox">
                <span class="close-lightbox">&times;</span>
                <img class="lightbox-content" id="lightbox-img">
                <div id="lightbox-caption"></div>
            </div>
        `;
        document.body.insertAdjacentHTML('beforeend', lightboxHTML);

        const lightbox = document.getElementById('lightbox');
        const lightboxImg = document.getElementById('lightbox-img');
        const lightboxCaption = document.getElementById('lightbox-caption');
        const closeLightbox = document.querySelector('.close-lightbox');

        // Event delegation for dynamically added gallery items
        document.addEventListener('click', function (e) {
            if (e.target.matches('.gallery-item img')) {
                lightbox.style.display = 'block';
                lightboxImg.src = e.target.src;
                lightboxCaption.textContent = e.target.alt;
            }
        });

        // Close lightbox
        closeLightbox.addEventListener('click', function () {
            lightbox.style.display = 'none';
        });

        lightbox.addEventListener('click', function (e) {
            if (e.target !== lightboxImg) {
                lightbox.style.display = 'none';
            }
        });
    }
});
