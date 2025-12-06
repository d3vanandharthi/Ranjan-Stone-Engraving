// Home page specific functionality
$(document).ready(function () {
    // Load Services
    const services = DataManager.getServices().slice(0, 3); // Show top 3
    const servicesContainer = $('#services-grid');
    services.forEach(s => {
        servicesContainer.append(`
            <div class="blog-card" onclick="window.location.href='service-detail.html?id=${s.id}'" style="cursor: pointer;">
                <div class="blog-content" style="text-align: center;">
                    <i class="fas ${s.icon}" style="font-size: 3rem; color: var(--primary-color); margin-bottom: 20px;"></i>
                    <h3>${s.title}</h3>
                    <p>${s.description}</p>
                </div>
            </div>
        `);
    });

    // Load Testimonials
    const testimonials = DataManager.getTestimonials();
    const testContainer = $('#testimonials-grid');
    testimonials.forEach(t => {
        testContainer.append(`
            <div class="blog-card" style="padding: 30px;">
                <div style="color: var(--primary-color); font-size: 1.5rem; margin-bottom: 15px;"><i class="fas fa-quote-left"></i></div>
                <p style="font-style: italic; margin-bottom: 20px;">"${t.text}"</p>
                <h4 style="font-size: 1rem;">${t.name}</h4>
                <span style="font-size: 0.8rem; color: var(--text-gray);">${t.role}</span>
            </div>
        `);
    });

    // Load FAQs
    const faqs = DataManager.getFAQs();
    const faqContainer = $('#faq-list');
    faqs.forEach((f, index) => {
        faqContainer.append(`
            <div class="faq-item" style="margin-bottom: 15px; background: var(--bg-card); border-radius: 5px; overflow: hidden;">
                <div class="faq-question" style="padding: 20px; cursor: pointer; display: flex; justify-content: space-between; align-items: center;">
                    <h3 style="font-size: 1.1rem; margin: 0;">${f.question}</h3>
                    <i class="fas fa-plus" style="color: var(--primary-color);"></i>
                </div>
                <div class="faq-answer" style="padding: 0 20px 20px; display: none; color: var(--text-gray);">
                    <p>${f.answer}</p>
                </div>
            </div>
        `);
    });

    // FAQ Toggle
    $('.faq-question').click(function () {
        const answer = $(this).next('.faq-answer');
        const icon = $(this).find('i');

        $('.faq-answer').not(answer).slideUp();
        $('.faq-question i').not(icon).removeClass('fa-minus').addClass('fa-plus');

        answer.slideToggle();
        if (icon.hasClass('fa-plus')) {
            icon.removeClass('fa-plus').addClass('fa-minus');
        } else {
            icon.removeClass('fa-minus').addClass('fa-plus');
        }
    });
});
