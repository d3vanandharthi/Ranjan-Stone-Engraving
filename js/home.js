// Home page specific functionality - Vanilla JS (No jQuery)
document.addEventListener('DOMContentLoaded', function () {
    // Load Services
    const services = DataManager.getServices().slice(0, 3); // Show top 3
    const servicesContainer = document.getElementById('services-grid');
    services.forEach(s => {
        servicesContainer.insertAdjacentHTML('beforeend', `
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
    const testContainer = document.getElementById('testimonials-grid');
    testimonials.forEach(t => {
        testContainer.insertAdjacentHTML('beforeend', `
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
    const faqContainer = document.getElementById('faq-list');
    faqs.forEach((f, index) => {
        faqContainer.insertAdjacentHTML('beforeend', `
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
    document.querySelectorAll('.faq-question').forEach(question => {
        question.addEventListener('click', function () {
            const answer = this.nextElementSibling;
            const icon = this.querySelector('i');

            // Close all other answers
            document.querySelectorAll('.faq-answer').forEach(otherAnswer => {
                if (otherAnswer !== answer && otherAnswer.style.display === 'block') {
                    otherAnswer.style.display = 'none';
                }
            });

            // Reset all other icons
            document.querySelectorAll('.faq-question i').forEach(otherIcon => {
                if (otherIcon !== icon) {
                    otherIcon.classList.remove('fa-minus');
                    otherIcon.classList.add('fa-plus');
                }
            });

            // Toggle current answer
            if (answer.style.display === 'none' || !answer.style.display) {
                answer.style.display = 'block';
                icon.classList.remove('fa-plus');
                icon.classList.add('fa-minus');
            } else {
                answer.style.display = 'none';
                icon.classList.remove('fa-minus');
                icon.classList.add('fa-plus');
            }
        });
    });

    // Lazy Load Instagram Embed Script
    // Only loads the heavy Instagram script when the user scrolls down to the section
    const instagramGrid = document.querySelector('.instagram-grid');
    if (instagramGrid) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Create and append the script
                    const script = document.createElement('script');
                    script.src = "https://www.instagram.com/embed.js";
                    script.async = true;
                    document.body.appendChild(script);

                    // Stop observing once loaded
                    observer.unobserve(entry.target);
                    console.log('Instagram script loaded lazily');
                }
            });
        }, {
            rootMargin: '200px' // Start loading 200px before the element is visible
        });

        observer.observe(instagramGrid);
    }
});
