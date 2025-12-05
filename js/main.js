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
});
