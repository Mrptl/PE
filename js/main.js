document.addEventListener('DOMContentLoaded', function () {
    const scrollTopBtn = document.getElementById('scrollTopBtn');

    // Smooth scroll to top with easing animation
    function smoothScrollToTop() {
        const startPosition = window.pageYOffset;
        const duration = 800; // Animation duration in ms
        let startTime = null;

        // Easing function for smooth deceleration
        function easeOutCubic(t) {
            return 1 - Math.pow(1 - t, 3);
        }

        function animation(currentTime) {
            if (startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const progress = Math.min(timeElapsed / duration, 1);
            const easeProgress = easeOutCubic(progress);

            window.scrollTo(0, startPosition * (1 - easeProgress));

            if (timeElapsed < duration) {
                requestAnimationFrame(animation);
            }
        }

        requestAnimationFrame(animation);
    }

    // Add click event to scroll button
    if (scrollTopBtn) {
        scrollTopBtn.addEventListener('click', function (e) {
            e.preventDefault();
            smoothScrollToTop();
        });
    }

    // Show/Hide button based on scroll position
    window.addEventListener('scroll', function () {
        if (window.scrollY > 300) {
            scrollTopBtn.classList.add('visible');
        } else {
            scrollTopBtn.classList.remove('visible');
        }
    });

    // --- Scroll Animations ---
    const observerOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, observerOptions);

    // Elements to animate
    const animatedElements = document.querySelectorAll('section, .card, .stats-bar, .section-header, .hero-content, .footer-grid, .top-bar');

    animatedElements.forEach(el => {
        el.classList.add('reveal-on-scroll');
        observer.observe(el);
    });
});

// Contact Form Handler
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const name = document.getElementById('formName').value;
        const email = document.getElementById('formEmail').value;
        const phone = document.getElementById('formPhone').value;
        const message = document.getElementById('formMessage').value;

        const subject = `New Inquiry from Website: ${name}`;
        const body = `Name: ${name}%0D%0AEmail: ${email}%0D%0APhone: ${phone}%0D%0A%0D%0AMessage:%0D%0A${message}`;

        window.location.href = `mailto:info@prayashengineering.com?subject=${encodeURIComponent(subject)}&body=${body}`;
    });
}
