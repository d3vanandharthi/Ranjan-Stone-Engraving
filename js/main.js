// Main JavaScript

$(document).ready(function () {
    // Mobile Menu Toggle
    $('.hamburger').click(function () {
        $('.nav-links').toggleClass('active');
        const icon = $(this).find('i');
        if ($('.nav-links').hasClass('active')) {
            icon.removeClass('fa-bars').addClass('fa-times');
        } else {
            icon.removeClass('fa-times').addClass('fa-bars');
        }
    });

    // Close mobile menu when a link is clicked
    $('.nav-links a').click(function () {
        if ($(window).width() <= 768) {
            $('.nav-links').removeClass('active');
            $('.hamburger i').removeClass('fa-times').addClass('fa-bars');
        }
    });

    // Active Link Highlight
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    $('.nav-links a').each(function () {
        if ($(this).attr('href') === currentPath) {
            $(this).addClass('active');
        }
    });

    // Smooth Scroll (for home page anchors)
    $('a[href^="#"]').on('click', function (event) {
        if (this.hash !== "") {
            event.preventDefault();
            var hash = this.hash;
            $('html, body').animate({
                scrollTop: $(hash).offset().top - 80
            }, 800);
        }
    });

    // WhatsApp Button
    $('body').append('<a href="https://wa.me/919822581297" class="whatsapp-float" target="_blank"><i class="fab fa-whatsapp whatsapp-icon"></i></a>');

    // Scroll to Top Button
    $('body').append('<button id="scrollTopBtn" title="Go to top"><i class="fas fa-arrow-up"></i></button>');

    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('#scrollTopBtn').fadeIn();
        } else {
            $('#scrollTopBtn').fadeOut();
        }
    });

    $('#scrollTopBtn').click(function () {
        $('html, body').animate({ scrollTop: 0 }, 800);
        return false;
    });

    // Gallery Lightbox
    if ($('.gallery-grid').length) {
        $('body').append(`
            <div id="lightbox" class="lightbox">
                <span class="close-lightbox">&times;</span>
                <img class="lightbox-content" id="lightbox-img">
                <div id="lightbox-caption"></div>
            </div>
        `);

        // Use event delegation for dynamically added gallery items
        $(document).on('click', '.gallery-item img', function () {
            $('#lightbox').fadeIn();
            $('#lightbox-img').attr('src', $(this).attr('src'));
            $('#lightbox-caption').text($(this).attr('alt'));
        });

        $('.close-lightbox, #lightbox').click(function (e) {
            if (e.target !== document.getElementById('lightbox-img')) {
                $('#lightbox').fadeOut();
            }
        });
    }
});
