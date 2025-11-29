/* ===== MODERN JAVASCRIPT FOR MANHATTAN LEGAL ASSOCIATES ===== */

class ManhattanLegalApp {
    constructor() {
        this.testimonialInterval = null;
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.setupNavigation();
        this.setupTestimonials();
        this.setupContactForm();
        this.setupScrollAnimations();
        this.setupAccessibility();
    }

    /* ===== EVENT LISTENERS ===== */
    setupEventListeners() {
        // Mobile nav toggle
        const navToggle = document.getElementById('navToggle');
        const navDrawer = document.getElementById('navDrawer');

        if (navToggle && navDrawer) {
            navToggle.addEventListener('click', () => {
                const open = navToggle.getAttribute('aria-expanded') === 'true';
                navToggle.setAttribute('aria-expanded', String(!open));
                navDrawer.classList.toggle('open');
            });

            document.querySelectorAll('#navDrawer .nav-link').forEach(link => {
                link.addEventListener('click', () => {
                    navDrawer.classList.remove('open');
                    navToggle.setAttribute('aria-expanded', 'false');
                });
            });
        }

        // Smooth scrolling
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                const targetID = anchor.getAttribute('href');
                if (!targetID || targetID === '#') return;

                const target = document.querySelector(targetID);
                if (target) {
                    e.preventDefault();
                    const offsetTop = target.offsetTop - 80;
                    window.scrollTo({ top: offsetTop, behavior: 'smooth' });
                }
            });
        });

        // Auto-close drawer on outside click
        document.addEventListener('click', (e) => {
            if (navDrawer && navToggle) {
                if (!navDrawer.contains(e.target) && !navToggle.contains(e.target)) {
                    navDrawer.classList.remove('open');
                    navToggle.setAttribute('aria-expanded', 'false');
                }
            }
        });

        // Escape closes drawer
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && navDrawer && navToggle) {
                navDrawer.classList.remove('open');
                navToggle.setAttribute('aria-expanded', 'false');
            }
        });
    }

    /* ===== NAVIGATION ===== */
    setupNavigation() {
        const navbar = document.getElementById('navbar');
        if (!navbar) return;

        let lastScroll = 0;

        window.addEventListener('scroll', () => {
            const scrolled = window.scrollY;

            navbar.classList.toggle('scrolled', scrolled > 100);

            if (scrolled > lastScroll && scrolled > 200) {
                navbar.style.transform = 'translateY(-100%)';
            } else {
                navbar.style.transform = 'translateY(0)';
            }

            lastScroll = scrolled;
        });

        // Highlight active section
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link');

        window.addEventListener('scroll', () => {
            let current = '';
            sections.forEach(section => {
                const start = section.offsetTop - 120;
                const end = start + section.offsetHeight;
                if (window.scrollY >= start && window.scrollY < end) {
                    current = section.id;
                }
            });

            navLinks.forEach(link => {
                link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
            });
        });
    }

    /* ===== TESTIMONIALS SLIDER ===== */
    setupTestimonials() {
        const cards = document.querySelectorAll('.testimonial-card');
        const dots = document.querySelectorAll('.dot');
        const prevBtn = document.querySelector('.prev-btn');
        const nextBtn = document.querySelector('.next-btn');
        let current = 0;

        if (cards.length === 0) return;

        const show = (i) => {
            cards.forEach((c, idx) => c.classList.toggle('active', idx === i));
            dots.forEach((d, idx) => d.classList.toggle('active', idx === i));
        };

        const next = () => {
            current = (current + 1) % cards.length;
            show(current);
        };

        const prev = () => {
            current = (current - 1 + cards.length) % cards.length;
            show(current);
        };

        nextBtn?.addEventListener('click', next);
        prevBtn?.addEventListener('click', prev);

        dots.forEach((dot, idx) => {
            dot.addEventListener('click', () => {
                current = idx;
                show(current);
            });
        });

        this.testimonialInterval = setInterval(next, 5000);

        const slider = document.querySelector('.testimonials-slider');

        if (slider) {
            slider.addEventListener('mouseenter', () => clearInterval(this.testimonialInterval));
            slider.addEventListener('mouseleave', () => {
                this.testimonialInterval = setInterval(next, 5000);
            });
        }
    }

    /* ===== CONTACT FORM ===== */
    setupContactForm() {
        const form = document.getElementById('contact-form');
        const status = document.getElementById('form-status');

        if (!form) return;

        form.addEventListener('submit', async (e) => {
            e.preventDefault();

            const data = Object.fromEntries(new FormData(form));
            if (!this.validateForm(data)) return;

            const btn = form.querySelector('button[type="submit"]');
            const original = btn.innerHTML;

            btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            btn.disabled = true;

            try {
                await this.simulateFormSubmission(data);
                this.showFormStatus('success', 'Thank you! Your message has been sent successfully.');
                form.reset();
            } catch {
                this.showFormStatus('error', 'Error sending message. Please try again.');
            } finally {
                btn.innerHTML = original;
                btn.disabled = false;
            }
        });

        form.querySelectorAll('input, textarea').forEach(input => {
            input.addEventListener('blur', () => this.validateField(input));
            input.addEventListener('input', () => this.clearFieldError(input));
        });
    }

    validateForm(data) {
        const required = ['name', 'email', 'message'];
        let valid = true;

        required.forEach(f => {
            const input = document.getElementById(f);
            if (!data[f]?.trim()) {
                this.showFieldError(input, 'Required field');
                valid = false;
            } else if (f === 'email' && !this.isValidEmail(data[f])) {
                this.showFieldError(input, 'Invalid email');
                valid = false;
            }
        });

        return valid;
    }

    validateField(input) {
        const value = input.value.trim();

        if (input.hasAttribute('required') && !value) {
            this.showFieldError(input, 'Required field');
            return false;
        }

        if (input.name === 'email' && value && !this.isValidEmail(value)) {
            this.showFieldError(input, 'Invalid email');
            return false;
        }

        this.clearFieldError(input);
        return true;
    }

    showFieldError(input, msg) {
        this.clearFieldError(input);
        input.classList.add('error');

        const div = document.createElement('div');
        div.className = 'field-error';
        div.textContent = msg;
        div.style.color = '#dc2626';
        div.style.fontSize = '.875rem';
        div.style.marginTop = '.25rem';

        input.parentNode.appendChild(div);
    }

    clearFieldError(input) {
        input.classList.remove('error');
        const err = input.parentNode.querySelector('.field-error');
        if (err) err.remove();
    }

    showFormStatus(type, msg) {
        const status = document.getElementById('form-status');
        if (!status) return;

        status.className = `form-status ${type}`;
        status.textContent = msg;
        status.style.display = 'block';

        setTimeout(() => {
            status.style.display = 'none';
        }, 5000);
    }

    isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    async simulateFormSubmission(data) {
        await new Promise(res => setTimeout(res, 1200));
        if (Math.random() < 0.05) throw new Error('fail');
        console.log('Form Submitted:', data);
    }

    /* ===== SCROLL ANIMATIONS ===== */
    setupScrollAnimations() {
        const targets = [
            '.service-card',
            '.testimonial-card',
            '.lawyer-profile',
            '.contact-form-container',
            '.info-card'
        ];

        targets.forEach(sel => {
            document.querySelectorAll(sel).forEach((el, i) => {
                el.classList.add('animate-on-scroll');
                el.style.animationDelay = `${i * 0.1}s`;
            });
        });

        const obs = new IntersectionObserver((entries) => {
            entries.forEach(e => e.isIntersecting && e.target.classList.add('animated'));
        }, { threshold: 0.1 });

        document.querySelectorAll('.animate-on-scroll')
            .forEach(el => obs.observe(el));
    }

    /* ===== ACCESSIBILITY ===== */
    setupAccessibility() {
        const skip = document.createElement('a');
        skip.href = '#main-content';
        skip.textContent = 'Skip to main content';
        skip.className = 'skip-link';

        skip.style.cssText = `
            position:absolute; top:-40px; left:6px;
            background:#000;color:#fff;padding:8px;
            text-decoration:none;z-index:1000;
            transition:top 0.3s;
        `;

        skip.addEventListener('focus', () => skip.style.top = '6px');
        skip.addEventListener('blur', () => skip.style.top = '-40px');

        document.body.prepend(skip);
    }
}

/* ===== INITIALIZATION ===== */
document.addEventListener('DOMContentLoaded', () => {
    new ManhattanLegalApp();

    const year = document.getElementById('current-year');
    if (year) year.textContent = new Date().getFullYear();

    document.body.classList.add('loaded');
});

/* ===== SERVICE WORKER ===== */
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(reg => console.log('SW registered:', reg))
            .catch(err => console.log('SW failed:', err));
    });
}

/* ===== PERFORMANCE ===== */
window.addEventListener('load', () => {
    if (performance && performance.timing) {
        const t = performance.timing;
        console.log(`Page load time: ${t.loadEventEnd - t.navigationStart}ms`);
    }
});

/* ===== GLOBAL ERROR LOGGING ===== */
window.addEventListener('error', (e) => {
    console.error('JS error:', e.error);
});

/* ===== EXPORT FOR TESTING ===== */
if (typeof module !== 'undefined') {
    module.exports = ManhattanLegalApp;
}
